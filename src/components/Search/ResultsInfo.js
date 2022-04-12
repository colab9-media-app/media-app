// import { faBookmark, faEye } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SaveButtons from "../SaveButtons";
import logoTMDB from "../../assets/images/logoTMDB.svg";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/userContext";
import {
  addMovieToWatchList,
  addMovieToWatchedList,
} from "../../utils/firebase/firebase";
import { toast } from "react-toastify";

const ResultsInfo = (props) => {
  const [eyeColor, setEyeColor] = useState(null);
  const [bookmarkColor, setBookmarkColor] = useState(null);
  const { currentUser } = useContext(UserContext);
  const [watchedIcon, setWatchedicon] = useState(null);

  const eyeClick = () => {
    eyeColor !== "#1FA5FF" ? setEyeColor("#1FA5FF") : setEyeColor(null);
  };
  // console.log(currentUser);
  const bookmarkClick = async () => {
    setBookmarkColor("#1FA5FF");
    await addMovieToWatchList(props.media, currentUser.uid);
  };

  const watchedMovie = async () => {
    setWatchedicon("#1FA5FF");
    await addMovieToWatchedList(props.media, currentUser.uid);
  };

  const { vote_average } = props.media;

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
