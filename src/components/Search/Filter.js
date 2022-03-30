import { useState } from 'react';
import ResultsInfo from './ResultsInfo';

const Filter = (props) => {
  const all = props.result;

  const movie = props.result.filter((content) => {
    return content.media_type === "movie";
  });

  const tv = props.result.filter((content) => {
    return content.media_type === "tv";
  });

  const showAll = () => {
    props.setFilteredResults(all);
    console.log(all, "all");
    props.setDisplay([]);
  };

  const showMovies = () => {
    props.setFilteredResults(movie);
    console.log(movie, "movies");
    props.setDisplay([]);
  };

  const showTv = () => {
    props.setFilteredResults(tv);
    console.log(tv, "series");
    props.setDisplay([]);
  };


  return (
    <div className="filter">
      <div className="filterSelect">
        <h2>{props.heading}</h2>
        <ul className="filterOptions">
          <li><button onClick={() => { showAll() }}>All</button></li>
          <li><button onClick={() => { showMovies() }}>Movies</button></li>
          <li><button onClick={() => { showTv() }}>Tv shows</button></li>
        </ul>
      </div>
      {
        props.error ?
          <div className="errorMessage">
            <h3>Oops! No Results found.</h3>
            <p>No results found for your search, please search again.</p>
          </div> :
          <ul className="resultContainer">
            {
              props.filteredResults.map((media) => {
                return (
                  <li className="result" key={media.id}>
                    <ResultsInfo rating={media.vote_average} />
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                      alt={`Poster for ${media.original_title}`}
                    />
                    {
                      media.media_type === "movie" ?
                        <h3>{media.title}</h3> :
                        <h3>{media.name}</h3>
                    }
                    <button>See Details</button>
                  </li>
                )
              })
            }
          </ul>
      }
    </div>
  )
}

export default Filter;