import axios from "axios";
import { useState, useContext } from "react";
import SearchInput from "./SearchInput";
import Results from "./Results";
import Filter from "./Filter";

import { UserContext } from "../../contexts/userContext";

const MediaSearch = () => {
  const [data, setData] = useState([]);
  const [mediaResult, setMediaResult] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [searchHeading, setSearchHeading] = useState(null);
  const { currentUser } = useContext(UserContext);

  const runSearch = () => {
    if (userInput !== "") {
      axios({
        url: `https://api.themoviedb.org/3/search/multi`,
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          include_adult: false,
          original_language: "en",
          query: userInput,
        },
      })
        .then((res) => {
          const data = res.data.results;

          // console.log(res);
          if (res.status === 200 && data.length > 0) {
            const filteredData = data.filter((content) => {
              if (content.poster_path !== null) {
                return (
                  content.media_type === "movie" || content.media_type === "tv"
                );
              }
            });
            setData(filteredData);
            setMediaResult(filteredData);
            console.log(mediaResult);
          } else {
            throw Error();
          }
        })
        .catch(() => {
          setErrorStatus(true);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorStatus(false);
    setMediaResult([]);
    setSearchHeading(userInput);
    runSearch();
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

 return (
    <div className="searchPage">
      <form className="search" action="" onSubmit={handleSubmit}>
        <SearchInput change={handleChange} value={userInput} />
      </form>
      <div className="resultsSection">
        <Filter
          rawData={data}
          setMediaResult={setMediaResult}
          heading={searchHeading}
        />
        <Results result={mediaResult} error={errorStatus} />
      </div>
    </div>
  );
};

export default MediaSearch;

