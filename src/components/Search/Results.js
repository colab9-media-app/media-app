import axios from 'axios';
import { useState } from 'react';
import ResultsInfo from './ResultsInfo';
import DetailsCard from './DetailsCard/DetailsCard.js';


const Results = props => {
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState('');
  const [mediaID, setMediaID] = useState('');
  const [details, setDetails] = useState([]);

  const runDetailsSearch = (id, index) => {

    if (props.result[index].media_type === 'movie') {
      axios({
        url: `https://api.themoviedb.org/3/movie/${id}`,
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          include_adult: false,
          original_language: 'en',
        }
      }).then(res => {
        // const data = res.data.results;
        console.log(res.data);
        // if (res.status === 200 && data.length > 0) {
        //   const filteredData = data.filter((content) => {
        //     if (content.poster_path !== null) {
        //       return content.media_type === "movie" || content.media_type === "tv";
        //     }
        //   });
        //   setData(filteredData);
        //   setMediaResult(filteredData);
        //   console.log(mediaResult);
        }) 
      //   else {
      //     throw Error();
      //   }
      // }).catch(() => {
      //   setErrorStatus(true);
      // })
    // } else {

    }
  }

  // const openModal = (index, id) => {
  //   setShow(true);
  //   setIndex(index);
  //   setMediaID(id)
  //   runDetailsSearch(index, mediaID);
  // }

  return (
    <>
      {
        props.error ?
          <div className="errorMessage">
            <h3>Oops! No Results found.</h3>
            <p>No results found for your search, please search again.</p>
          </div> :
          <ul className="resultContainer">
            {/* {
              show ?
                <DetailsCard
                  show={show}
                  setShow={setShow}
                  index={index}
                  id={mediaID}
                  details={props.result[mediaID]}
                />
                : null
            } */}
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
                    <button onClick={() => {runDetailsSearch(media.id, index)}}>See Details</button>
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