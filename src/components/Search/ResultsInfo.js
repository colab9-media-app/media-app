import { faBookmark, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoTMDB from "../../assets/images/logoTMDB.svg";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/userContext";
import {
  addMovieToWatchList,
  addMovieToWatchedList,
  getUserWatchedList,
  getUserWatchList,
  deleteMovieFromWatchList,
} from "../../utils/firebase/firebase";

const ResultsInfo = (props) => {
  const [eyeColor, setEyeColor] = useState(null);
  const [bookmarkColor, setBookmarkColor] = useState(null);
  const { currentUser } = useContext(UserContext);
  const [watchedicon, setWatchedicon] = useState(null);

  const eyeClick = () => {
    eyeColor !== "#1FA5FF" ? setEyeColor("#1FA5FF") : setEyeColor(null);
  };
  // console.log(currentUser);
  const bookmarkClick = async () => {
    bookmarkColor !== "#1FA5FF"
      ? setBookmarkColor("#1FA5FF")
      : setBookmarkColor(null);
    await addMovieToWatchList(props.media, currentUser.uid);
    console.log(props.media);
  };

  const watchedMovie = async () => {
    watchedicon !== "#1FA5FF"
      ? setWatchedicon("#1FA5FF")
      : setWatchedicon(null);
    await addMovieToWatchedList(props.media, currentUser.uid);
    console.log(props.media);
  };

  // const deleteMovie = async () => {
  //   await deleteMovieFromWatchList(props.media, currentUser.uid);
  //   console.log("deleted");
  // }

  const { vote_average } = props.media;

  return (
    <div className="resultsInfo">
      <div className="saveButtons">
        <button style={{ background: bookmarkColor }} onClick={bookmarkClick}>
          <FontAwesomeIcon icon={faBookmark} />
        </button>
        <button style={{ background: watchedicon }} onClick={watchedMovie}>
          <FontAwesomeIcon icon={faEye} />
        </button>
      </div>
      <div className="dbInfo">
        <div className="logoContainer">
          <img src={logoTMDB} alt="TMDB logo" />
        </div>
        <p>{vote_average}</p>
      </div>
      {/* <button onClick={deleteMovie}>delete</button> */}
    </div>
  );
};

export default ResultsInfo;
