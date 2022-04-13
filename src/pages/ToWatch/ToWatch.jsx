import axios from "axios";
import ResultsInfo from "../../components/Search/ResultsInfo";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/userContext";
import {
  getUserWatchList,
  db,
  deleteMovieFromWatchList,
} from "../../utils/firebase/firebase";
import { collection, doc } from "firebase/firestore";
import DetailsCard from "../../components/Search/DetailsCard/DetailsCard";
import { toast } from "react-toastify";

const ToWatch = (props) => {
  const { currentUser } = useContext(UserContext);
  const [watchlist, setWatchlist] = useState([]);
  const [noWatchlist, setNoWatchlist] = useState(false);
  const [show, setShow] = useState(false);
  const userDocRef = doc(db, "users", currentUser.uid);
  const collectionRef = collection(userDocRef, "watchlist");
  const [details, setDetails] = useState([]);
  const [detailsError, setDetailsError] = useState(false);

  const handleFetchUserswatchlist = () => {
    getUserWatchList(currentUser.uid).then((res) => {
      setWatchlist(res);
      if (res.length === 0) {
        setNoWatchlist(true);
      }
    });
  };
  const handleDeleteMovie = async (media) => {
    await deleteMovieFromWatchList(media, currentUser.uid);
    toast.info("Movie removed from watchlist");
    await handleFetchUserswatchlist();
  };

  useEffect(() => {
    if (currentUser) {
      handleFetchUserswatchlist();
    }
  }, []);

  const runDetailsSearch = (id, index) => {
    if (watchlist[index].media_type === "movie") {
      axios({
        url: `https://api.themoviedb.org/3/movie/${id}`,
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          include_adult: false,
          original_language: "en",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            setDetails(res.data);
          } else {
            throw Error();
          }
        })
        .catch(() => {
          setDetailsError(true);
        });
    } else if (watchlist[index].media_type === "tv") {
      axios({
        url: `https://api.themoviedb.org/3/tv/${id}`,
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          include_adult: false,
          original_language: "en",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            setDetails(res.data);
          } else {
            throw Error();
          }
        })
        .catch(() => {
          setDetailsError(true);
        });
    }
    setShow(true);
  };

  return (
    <>
      {noWatchlist ? <h3>You currently don't have a watchlist</h3> : null}
      <ul className="resultContainer">
        {show ? (
          <DetailsCard
            show={show}
            setShow={setShow}
            details={details}
            error={detailsError}
          />
        ) : null}
        {watchlist?.map((media, index) => {
          return (
            <li className="result" key={media.id} data-aos="zoom-in">
              <ResultsInfo media={media} />
              <div className="posterContainer">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                  alt={`Poster for ${media.original_title}`}
                />
              </div>
              {media.title ? <h3>{media.title}</h3> : <h3>{media.name}</h3>}
              <div className="deet-delete-btn">
                <button
                  className="watchDetailsButton"
                  onClick={() => {
                    runDetailsSearch(media.id, index);
                  }}
                >
                  See Details
                </button>
                <button
                  className="deleteButton"
                  onClick={() => handleDeleteMovie(media)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ToWatch;
