import { faBookmark, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SaveButtons = ({
  watchedIcon,
  watchedMovie,
  bookmarkColor,
  bookmarkClick,
}) => {
  return (
    <div className="saveButtons">
      <button style={{ background: bookmarkColor }} onClick={bookmarkClick}>
        <FontAwesomeIcon icon={faBookmark} />
      </button>
      <button style={{ background: watchedIcon }} onClick={watchedMovie}>
        <FontAwesomeIcon icon={faEye} />
      </button>
    </div>
  );
};

export default SaveButtons;
