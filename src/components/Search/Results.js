import { useState } from 'react';
import ResultsInfo from './ResultsInfo';
import DetailsCard from './DetailsCard/DetailsCard.js';


const Results = props => {
  const [show, setShow] = useState(false);
  const [mediaID, setMediaID] = useState('');

  const openModal = (index) => {
    setShow(true);
    setMediaID(index);
  }


  return (
    <>

      {
        props.error ?
          <div className="errorMessage">
            <h3>Oops! No Results found.</h3>
            <p>No results found for your search, please search again.</p>
          </div> :


          <ul className="resultContainer">
            {
              show ?
                <DetailsCard
                  show={show}
                  setShow={setShow}
                  id={mediaID}
                  details={props.result[mediaID]}
                />
                : null
            }
            {
              props.result.map((media, index) => {
                return (
                  <li className="result" key={media.id}>
                    <ResultsInfo rating={media.vote_average} />
                    <div className="posterContainer">
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                        alt={`Poster for ${media.original_title}`}
                      />
                    </div>
                    <h3>{media.title}</h3>
                    <button onClick={() => openModal(index)}>See Details</button>
                  </li>
                )
              })
            }
          </ul>
      }
    </>
  )
}

export default Results;