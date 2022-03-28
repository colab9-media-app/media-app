import Filter from './Filter';
import ResultsInfo from './ResultsInfo';

const Results = props => {
  return (
    <div className="resultsSection">
      <Filter result={props.result}/>
      <ul className="resultContainer">
        {
          props.result.map((media) => {
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
      </ul>
    </div>
  )
}

export default Results;