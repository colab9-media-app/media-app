import { faBookmark, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoTMDB from '../../assets/images/logoTMDB.svg';
import { useState } from "react";

const ResultsInfo = props => {
  const [eyeColor, setEyeColor] = useState(null);
  const [bookmarkColor, setBookmarkColor] = useState(null);

  const eyeClick = () => {
    eyeColor !== '#1FA5FF' ?
    setEyeColor('#1FA5FF') :
    setEyeColor(null);
  };

  const bookmarkClick = () => {
    bookmarkColor !== '#1FA5FF' ?
    setBookmarkColor('#1FA5FF') :
    setBookmarkColor(null);
  };

  return (
    <div className="resultsInfo">
      <div className="saveButtons">
        <button style={{background: bookmarkColor}} onClick={() => {bookmarkClick()}}><FontAwesomeIcon icon={faBookmark} /></button>
        <button style={{background: eyeColor}} onClick={() => {eyeClick()}}><FontAwesomeIcon icon={faEye} /></button>
      </div>
      <div className="dbInfo">
        <div className="logoContainer">
          <img src={logoTMDB} alt="TMDB logo" />
        </div>
        <p>{props.rating}</p>
      </div>
    </div>
  )
};

export default ResultsInfo;