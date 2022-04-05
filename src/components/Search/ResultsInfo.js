import { faBookmark, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoTMDB from '../../assets/images/logoTMDB.svg';

const ResultsInfo = props => {
  return (
    <div className="resultsInfo">
      <div className="resultButtons">
        <button><FontAwesomeIcon className="icon" icon={faBookmark} /></button>
        <button><FontAwesomeIcon className="icon" icon={faEye} /></button>
      </div>
      <div className="dbInfo">
        <div className="imgContainer">
          <img src={logoTMDB} alt="TMDB logo" />
        </div>
        <p>{props.rating}</p>
      </div>
    </div>
  )
}

export default ResultsInfo;