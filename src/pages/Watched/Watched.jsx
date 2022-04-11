import ResultsInfo from "../../components/Search/ResultsInfo";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/userContext";
import { getUserWatchedList, db } from "../../utils/firebase/firebase";

const Watchedlist = () => {
  const { currentUser } = useContext(UserContext);
  const [watchedlist, setWatchedlist] = useState([]);
  const [noWatchedlist, setNoWatchedlist] = useState(false);

  useEffect(() => {
    if (currentUser) {
      getUserWatchedList(currentUser.uid).then((res) => {
        setWatchedlist(res);
        if (res.length === 0) {
          setNoWatchedlist(true);
        }
      });
    }
  }, []);

  return (
    <>
      {noWatchedlist ? <h3>You currently don't have a watched list</h3> : null}
      <ul className="resultContainer">
        {watchedlist.map((media, index) => {
          return (
            <li className="result" key={media.id}>
              <ResultsInfo media={watchedlist} />
              <div className="posterContainer">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                  alt={`Poster for ${media.original_title}`}
                />
              </div>
              {media.title ? <h3>{media.title}</h3> : <h3>{media.name}</h3>}
              {/* <button className="detailsButton" onClick={() => {runDetailsSearch(media.id, index)}}>See Details</button> */}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Watchedlist;
