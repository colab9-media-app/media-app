const Results = props => {
  return (
    <ul>
        {
          props.result.map((media) => {
            return (
              <li key={media.id}>
                <img 
                  src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`} 
                  alt={`Poster for ${media.original_title}`} />
              </li>
            )
          })
        }
      </ul>
  )
}

export default Results;