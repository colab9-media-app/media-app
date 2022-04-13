import "./detailsCard.css";
import SaveButtons from "../../SaveButtons";
import logoTMDB from "../../../assets/images/logoOneLineTMDB.svg";
import {
  addMovieToWatchList,
  addMovieToWatchedList,
} from "../../../utils/firebase/firebase";
import moment from "moment";
import { useState, useContext } from "react";
import { UserContext } from "../../../contexts/userContext";

import { toast } from "react-toastify";

const DetailsCard = ({ show, setShow, details, detailsError }) => {
  const { currentUser } = useContext(UserContext);

  const bookmarkClick = async () => {
    await addMovieToWatchList(details, currentUser.uid);
    toast.success("Movie added to watchlist");
  };

  const watchedMovie = async () => {
    await addMovieToWatchedList(details, currentUser.uid);
    toast.success("Movie added to watched list");
  };

  return !show ? null : (
    <div className="modal">
      <button className="closeButton" onClick={() => setShow(false)}>
        X
      </button>
      <div className="cardInfo">
        <div className="cardLeft">
          <div className="poster">
            <div className="detailsSave">
              <SaveButtons />
            </div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
              alt={`Poster for ${details.original_title}`}
            />
          </div>
        </div>
        <div className="cardRight">
          {details.title ? (
            <h3>{details.title}</h3>
          ) : (
            <div className="tvTitle">
              <h3>{details.name}</h3>
              <p>{moment(details.first_air_date).format("YYYY")}</p>
            </div>
          )}
          <p>{details.overview}</p>
          <h4>Genres</h4>
          <ul className="genre">
            {details.genres?.map((genre) => {
              return <li key={genre.id}>{genre.name}</li>;
            })}
          </ul>
          {details.seasons ? (
            <div className="numberDetails">
              <div className="numOf">
                <div className="seasonNum">
                  <h4>N° of seasons</h4>
                  <p>{details.number_of_seasons}</p>
                </div>
                <div className="episodeNum">
                  <h4>N° of episodes</h4>
                  <p>{details.number_of_episodes}</p>
                </div>
              </div>
              {details.next_episode_to_air !== null ? (
                <div className="airdate">
                  <h4>Next episode airing</h4>
                  <p>
                    {moment(details.next_episode_to_air.air_date).format(
                      "MMM D, YYYY"
                    )}
                  </p>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="dateDetails">
              <h4>Release Date</h4>
              <p>{moment(details.release_date).format("MMM D, YYYY")}</p>
            </div>
          )}
        </div>
      </div>
      <div className="cardBottom">
        <div className="left">
          <div className="logoContainer">
            <img src={logoTMDB} alt="Logo for TMDB." />
          </div>
          <p>{details.vote_average}</p>
        </div>
        <div className="right">
          <button onClick={() => bookmarkClick()}>Add to Watchlist</button>
          <button onClick={() => watchedMovie()}>Already Watched</button>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
