// dependencies
import axios from 'axios';
// hooks
import { useEffect, useState } from 'react';
// components
import SearchInput from './SearchInput';
import Results from './Results';

//  User Story 2: User Media Search 
  // create text input for user query (required)

  // create inputs for other search params
    // media type: movie or tv (default movie)
    // language (default english)
    // actor, director ?

  // create submit button
    // pass input value into axios call on submit

  // make axios call to TMDB
    // search params: language, media (film/tv), query
    
  // render results of search to page


const MediaSearch = () => {
  const [mediaResult, setMediaResult] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleSubmit = e => {
    e.preventDefault();    
    runSearch();
  }

  const handleChange = e => {
    setUserInput(e.target.value);
    console.log(e.target.value);
  }

  const runSearch = () => {
    // remove defaults once inputs created
    const mediaType = 'movie';

    axios({
      url: `https://api.themoviedb.org/3/search/${mediaType}/`,
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        include_adult: false,
        original_language: 'en',
        query: userInput
      }
    }).then(res => {
      console.log(res.data);
      setMediaResult(res.data.results);
    })

    // add error handling for no results

  }
  
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <SearchInput 
          change={handleChange}
          value={userInput}
        />
        {/* Change 'movies' to 'series' when mediaType select changes */}
        <button>Find movies</button>
      </form>
      <Results result={mediaResult} />
    </>
  )
}

export default MediaSearch;