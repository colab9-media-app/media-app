import axios from "axios";
import { useEffect, useState } from "react";


const Homepage = () => {
    const [mediaResult, setMediaResult] = useState([]);

    useEffect(() => {
      const apiKey = 'f1c158b29959cefb485425b266803ee6';
      const mediaSelect = 'movie';
      const languageSelect = 'en';
      const userInput = 'knives out';
  
      axios({
        url: `https://api.themoviedb.org/3/search/${mediaSelect}/`,
        params: {
          api_key: apiKey,
          include_adult: false,
          original_language: languageSelect,
          query: userInput
        }
      }).then(res => {
        console.log(res.data);
        setMediaResult(res.data.results);
      })
    }, []);
    return ( 

        <>
        <h1>Movies and Stuff</h1>
        <ul>
          {
            mediaResult.map((media) => {
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
      </>

     );
}
 
export default Homepage;