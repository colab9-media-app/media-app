import axios from "axios";
import ResultsInfo from "../../components/Search/ResultsInfo";
import DetailsCard from "../../components/Search/DetailsCard/DetailsCard";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/userContext";
import { getUserWatchedList, db } from "../../utils/firebase/firebase";

const Watchedlist = () => {
  const { currentUser } = useContext(UserContext);
  const [watchedlist, setWatchedlist] = useState([]);
  const [noWatchedlist, setNoWatchedlist] = useState(false);
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState([]);
  const [detailsError, setDetailsError] = useState(false);

  useEffect(() => {
    if (currentUser) {
      getUserWatchedList(currentUser.uid).then((res) => {
        setWatchedlist(res);
        if (res.length === 0) {
          setNoWatchedlist(true);
        }
      });
    }
  }, []);

  

  const runDetailsSearch = (id, index) => {
    if (watchedlist[index].media_type === "movie") {
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
            console.log(res.data);
          } else {
            throw Error();
          }
        })
        .catch(() => {
          setDetailsError(true);
        });
    } else if (watchedlist[index].media_type === "tv") {
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
            console.log(res.data);
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
      {noWatchedlist ? <h3>You currently don't have a watched list</h3> : null}
      <ul className="resultContainer">
        { show ? 
          <DetailsCard
            show={show}
            setShow={setShow}
            details={details}
            error={detailsError}
          />
        : null }
        {watchedlist.map((media, index) => {
          return (
            <li className="result" key={media.id}>
              <ResultsInfo media={watchedlist} />
              <div className="posterContainer">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                  alt={`Poster for ${media.original_title}`}
                />
              </div>
              {media.title ? <h3>{media.title}</h3> : <h3>{media.name}</h3>}
              <button className="detailsButton" onClick={() => {runDetailsSearch(media.id, index)}}>See Details</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Watchedlist;
