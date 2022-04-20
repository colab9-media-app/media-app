import { getDoc, doc } from "firebase/firestore";
import SaveButtons from "../SaveButtons";
import logoTMDB from "../../assets/images/logoTMDB.svg";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/userContext";
import {
  addMovieToWatchList,
  addMovieToWatchedList,
  db,
  switchMovieToWatchedList,
  switchMovieToWatchList,
  getUserWatchList,
  getUserWatchedList
} from "../../utils/firebase/firebase";
import { toast } from "react-toastify";

const ResultsInfo = (props) => {
  const [eyeColor, setEyeColor] = useState(null);
  const [bookmarkColor, setBookmarkColor] = useState(null);
  const { currentUser } = useContext(UserContext);
  const [watchedIcon, setWatchedicon] = useState(null);

  const bookmarkClick = async () => {
    await addMovieToWatchList(props.media, currentUser.uid);
    await switchMovieToWatchList(props.media, currentUser.uid);
    setBookmarkColor("#1FA5FF");
    toast.success("Movie added to watchlist");
  };

 
  const isMovieInWatchList = async () => {
    const movieRef = doc(
      db,
      "users",
      `${currentUser.uid}/watchlist/${props.media.id}`
    );
    const movieSnapshot = await getDoc(movieRef);
    if (movieSnapshot.exists()) {
      setBookmarkColor("#1FA5FF");
    }
    return;
  };
  const watchedMovie = async () => {
    await addMovieToWatchedList(props.media, currentUser.uid);
    await switchMovieToWatchedList(props.media, currentUser.uid);
    setWatchedicon("#1FA5FF");
    await isMovieInWatchList();
    toast.success("Movie marked as watched");
  };
  const isMovieInWatchedList = async () => {
    const movieRef = doc(
      db,
      "users",
      `${currentUser.uid}/watchedlist/${props.media.id}`
    );
    const movieSnapshot = await getDoc(movieRef);
    if (movieSnapshot.exists()) {
      setWatchedicon("#1FA5FF");
    }
    return;
  };

  const { vote_average } = props.media;

  useEffect(() => {
    (async () => {
      await isMovieInWatchList();
      await isMovieInWatchedList();
    })();
  }, []);

  return (
    <div className="resultsInfo">
      <SaveButtons
        watchedIcon={watchedIcon}
        watchedMovie={watchedMovie}
        bookmarkColor={bookmarkColor}
        bookmarkClick={bookmarkClick}
      />
      <div className="dbInfo">
        <div className="logoContainer">
          <img src={logoTMDB} alt="TMDB logo" />
        </div>
        <p>{vote_average}</p>
      </div>
    </div>
  );
};

export default ResultsInfo;
