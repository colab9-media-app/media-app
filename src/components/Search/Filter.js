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
  };

  const showMovies = () => {
    props.setMediaResult(movie);
    console.log(movie, "movies");
  };

  const showTv = () => {
    props.setMediaResult(tv);
    console.log(tv, "series");
  };

  
  return (
    <>
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
      </div>
    </>
  )
}

export default Filter;