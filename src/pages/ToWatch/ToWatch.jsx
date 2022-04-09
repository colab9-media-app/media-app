import "./ToWatch.scss"
import ResultsInfo from "../../components/Search/ResultsInfo";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/userContext";
import { getUserWatchList } from "../../utils/firebase/firebase";



const ToWatch = () => {
    const { currentUser } = useContext(UserContext);
    const [watchlist, setWatchlist] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        getUserWatchList(currentUser.uid).then(res=>{
          console.log(res);
          setWatchlist(res);
        })
      },[]);


    return ( 
        <>
            <ul className="resultContainer">
              {
                watchlist.map((media, index) => {
                  return (
                    <li className="result" key={media.id}>
                      <ResultsInfo media={watchlist} />
                      <div className="posterContainer">
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                          alt={`Poster for ${media.original_title}`}
                        />
                      </div>
                      {
                        media.title ?
                          <h3>{media.title}</h3>
                        : <h3>{media.name}</h3>
                      }
                      {/* <button className="detailsButton" onClick={() => {runDetailsSearch(media.id, index)}}>See Details</button> */}
                    </li>
                  )
                })
              }
            </ul>
      </>

     );
}
 
export default ToWatch;