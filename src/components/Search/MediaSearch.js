import axios from 'axios';
import { useState } from 'react';
import SearchInput from './SearchInput';
import Results from './Results';

const MediaSearch = () => {
  const [data, setData] = useState([]);
  const [mediaResult, setMediaResult] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [searchHeading, setSearchHeading] = useState('Search history');

  const handleSubmit = e => {
    e.preventDefault();    
    setSearchHeading(userInput);
    runSearch();
  }

  const handleChange = e => {
    setUserInput(e.target.value);
  }

  const runSearch = () => {
    axios({
      url: `https://api.themoviedb.org/3/search/multi`,
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        include_adult: false,
        original_language: 'en',
        query: userInput
      }
    }).then(res => {
      const data = res.data.results;
      setData(data);

      const filteredData = data.filter( (content) => {
        return content.media_type === "movie" || content.media_type === "tv";
      });
      setMediaResult(filteredData);
      console.log(mediaResult);
    })

    // add error handling for no results, no poster, typos, etc. 

  }
  
  return (
    <>
      <form className="search" action="" onSubmit={handleSubmit}>
        <SearchInput 
          change={handleChange}
          value={userInput}
        />
        <button>Search</button>
      </form>
      <Results 
        result={mediaResult} 
        heading={searchHeading} 
      />
    </>
  )
}

export default MediaSearch;