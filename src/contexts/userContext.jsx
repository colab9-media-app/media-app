import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getUser,
  getSearchHistory,
  db,
} from "../utils/firebase/firebase";
import axios from "axios";
import { doc, getDoc } from "firebase/firestore";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const getSearchHistory = async (userId) => {
    let movies = [];
    let searchTextsArray = [];
    const userHistoryRef = doc(db, "searchHistory", userId);
    const userHistorySnapshot = await getDoc(userHistoryRef);
    if (userHistorySnapshot.exists()) {
      searchTextsArray = userHistorySnapshot.data().searchTexts;
      await Promise.all(
        searchTextsArray.map(async (searchText) => {
          const { data } = await axios({
            url: `https://api.themoviedb.org/3/search/multi`,
            params: {
              api_key: process.env.REACT_APP_API_KEY,
              include_adult: false,
              original_language: "en",
              query: searchText,
            },
          });
          if (data.results.length > 0) {
            const filteredData = data.results.filter((content) => {
              if (content.poster_path !== null) {
                return (
                  content.media_type === "movie" || content.media_type === "tv"
                );
              }
            });
            movies.push(...filteredData.slice(0, 1));
          }
        })
      );
    }
    setState((prev) => ({
      ...prev,
      searchedMovies: movies,
    }));
  };

  const [state, setState] = useState({
    loadingUser: true,
    currentUser: null,
    authenticated: false,
    searchedMovies: [],
    fecthSearchedMovies: getSearchHistory,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
        setState({
          ...state,
          loadingUser: false,
          authenticated: true,
          currentUser: user,
        });
      } else {
        setState({
          ...state,
          loadingUser: false,
          authenticated: false,
          currentUser: null,
        });
      }
    });

    return unsubscribe();
  }, []);
  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};
