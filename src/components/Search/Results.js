import axios from "axios";
import { useState } from "react";
import ResultsInfo from "./ResultsInfo";
import DetailsCard from "./DetailsCard/DetailsCard.js";

const Results = (props) => {
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState([]);
  const [detailsError, setDetailsError] = useState(false);

  const runDetailsSearch = (id, index) => {
    if (props.result[index].media_type === "movie") {
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
    } else if (props.result[index].media_type === "tv") {
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
      {props.error ? (
        <div className="errorMessage">
          <h3>Oops! No Results found.</h3>
          <p>No results found for your search, please search again.</p>
        </div>
      ) : (
        <ul className="resultContainer">
          { show ? 
            <DetailsCard
              show={show}
              setShow={setShow}
              details={details}
              error={detailsError}
            />
          : null }
          {props.result.map((media, index) => {
            return (
              <li className="result" key={media.id}>
                <ResultsInfo media={media} />
                <div className="posterContainer">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                    alt={`Poster for ${media.original_title}`}
                  />
                </div>
                {media.title ? <h3>{media.title}</h3> : <h3>{media.name}</h3>}
                <button
                  className="detailsButton"
                  onClick={() => {
                    runDetailsSearch(media.id, index);
                  }}
                >
                  See Details
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Results;
