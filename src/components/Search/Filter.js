import { useState } from 'react';
import ResultsInfo from './ResultsInfo';

const Filter = (props) => {
  const [filteredResults, setFilteredResults] = useState([]);

  const showAll = () => {
    setFilteredResults(all);
    console.log(all, "all");
  }

  const showMovies = () => {
    setFilteredResults(movie);
    console.log(movie, "movies");
  }

  const showTv = () => {
    setFilteredResults(tv);
    console.log(tv, "series");
  }

  const all = props.result.filter((content) => {
    return content.media_type === "movie" || content.media_type === "tv";
  });

  const movie = props.result.filter((content) => {
    return content.media_type === "movie";
  });

  const tv = props.result.filter((content) => {
    return content.media_type === "tv";
  });


  return (
    <div className="filter">
      <h2>Search history</h2>
      <ul className="filterOptions">
        <li><button onClick={() => { showAll() }}>All</button></li>
        <li><button onClick={() => { showMovies() }}>Movies</button></li>
        <li><button onClick={() => { showTv() }}>Tv shows</button></li>
      </ul>

      {
        filteredResults.map((media) => {
          return (
            <li className="result" key={media.id}>
              <ResultsInfo rating={media.vote_average} />
              <img
                src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                alt={`Poster for ${media.original_title}`}
              />
              <h3>{media.title}</h3>
              <button>See Details</button>
            </li>
          )
        })
      }
    </div>
  )
}

export default Filter;