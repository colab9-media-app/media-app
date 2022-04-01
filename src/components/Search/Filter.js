const Filter = (props) => {
  

  const all = props.rawData;

  const movie = props.rawData.filter((content) => {
    return content.media_type === "movie";
  });

  const tv = props.rawData.filter((content) => {
    return content.media_type === "tv";
  });

  const showAll = () => {
    props.setMediaResult(props.rawData);
    console.log(all, "all");
    // props.setDisplay([]);
  };

  const showMovies = () => {
    props.setMediaResult(movie);
    console.log(movie, "movies");
    // props.setDisplay([]);
  };

  const showTv = () => {
    props.setMediaResult(tv);
    console.log(tv, "series");
    // props.setDisplay([]);
  };

  
  return (
    <>
      {/*  */}
      <div className="filter">
        <div className="filterSelect">
          {
            props.heading ?
              <h2 className="searchHeading">{props.heading}</h2> :
              <h2>Search history</h2>
          }
          <ul className="filterOptions">
            <li><button onClick={() => { showAll() }}>All</button></li>
            <li><button onClick={() => { showMovies() }}>Movies</button></li>
            <li><button onClick={() => { showTv() }}>Tv shows</button></li>
          </ul>
        </div>
        {/* {
          props.error ?
            <div className="errorMessage">
              <h3>Oops! No Results found.</h3>
              <p>No results found for your search, please search again.</p>
            </div> :
            <ul className="resultContainer">
              {
                props.filteredResults.map((media, index) => {
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
                      <button onClick={() => openModal(index)}>See Details</button>
                    </li>
                  )
                })
              }
            </ul>
        } */}
      </div>
    </>
  )
}

export default Filter;