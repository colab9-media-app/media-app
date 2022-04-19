import MediaSearch from "../../components/Search/MediaSearch";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/userContext";
import "./homepage.scss";
import { signUserOut, getSearchHistory } from "../../utils/firebase/firebase";
import { useHistory } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import ToWatch from "../ToWatch/ToWatch";
import Watched from "../Watched/Watched";
import Logo from "../../components/Logo/logo";
import { async } from "@firebase/util";

const Homepage = () => {
  const [showSignOutButton, setShowSignOutButton] = useState(false);
  const [display, setDisplay] = useState("MediaSearch");
  const history = useHistory();
  const { currentUser, fecthSearchedMovies } = useContext(UserContext);

  const showButton = async () => {
    setShowSignOutButton(!showSignOutButton);
     
  };
  useEffect(() => {
    (async () => {
      await fecthSearchedMovies(currentUser.uid);
    })();
  }, []);

  return (
    <div className="homepage">
      <div className="header">
        <div className="logo">
          <Logo />
          {/* <img src={logo} alt="logo" /> */}
        </div>
        <div className="header-right">
          {display === "Watchlist" || display === "Watched" ? (
            <button
              className="watch-btn"
              onClick={() => setDisplay("MediaSearch")}
            >
              Back
            </button>
          ) : null}
          <button className="watch-btn" onClick={() => setDisplay("Watchlist")}>
            Watchlist
          </button>
          <button className="watch-btn" onClick={() => setDisplay("Watched")}>
            Watched
          </button>
          {currentUser && (
            <button id="user-text" onClick={showButton}>
              {" "}
              {currentUser.email.charAt(0).toUpperCase()}{" "}
            </button>
          )}
          <br />
          <div className="dropdown"  >
            {showSignOutButton && (
              <>
                 <button
                  className=" mobile-view"
                  onClick={() => setDisplay("Watchlist")}
                  data-aos="fade-left"
                >
                  Watchlist
                </button>
                <br />
                <button
                  className=" mobile-view"
                  onClick={() => setDisplay("Watched")}
                  data-aos="fade-left"
                >
                  Watched
                </button>
                <br />
                <button
                  className="sign-out"
                  onClick={() => signUserOut(history)}
                  data-aos="fade-left"
                >
                  Sign Out <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
               
              </>
            )}
          </div>
        </div>
      </div>
      <div className="wrapper">
        <h1>What are you looking for?</h1>
        {display === "MediaSearch" && <MediaSearch />}
        {display === "Watchlist" && <ToWatch />}
        {display === "Watched" && <Watched />}
      </div>
    </div>
  );
};

export default Homepage;
