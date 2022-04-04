import './detailsCard.css';
import logoTMDB from '../../../assets/images/logoOneLineTMDB.svg';
import moment from 'moment';

const DetailsCard = ({ show, setShow, details, detailsError }) => {
  return (
    !show ? null :
      <div className="modal">
        <button className="closeButton" onClick={() => setShow(false)}>X</button>
        <div className="cardInfo">
          <div className="cardLeft">
            <div className="poster">
              <img
                src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
                alt={`Poster for ${details.original_title}`}
              />
            </div>
            
          </div>
          <div className="cardRight">
          {
            details.title ?
              <h3>{details.title}</h3>
            :
              <div className="tvTitle">
                <h3>{details.name}</h3>
                <p>{moment(details.first_air_date).format('YYYY')}</p>
              </div>
          }
          <p>{details.overview}</p>
          <h4>Genres</h4>
          <ul className="genre">
            {
              details.genres?.map((genre) => {
                return (
                  <li key={genre.id}>{genre.name}</li>
                )
              })
            }
          </ul>
          {
            details.seasons ?
              <div className="numberDetails">
                <div className="seasonNum">
                  <h4>N° of seasons</h4>
                  <p>{details.number_of_seasons}</p>
                </div>
                <div className="episodeNum">
                  <h4>N° of episodes</h4>
                  <p>{details.number_of_episodes}</p>
                </div>
                {
                  details.next_episode_to_air !== null ?
                    <div className="airDate">
                      <h4>Next episode airing</h4>
                      <p>{moment(details.next_episode_to_air.air_date).format('MMMM D, YYYY')}</p>
                    </div>
                  : null
                }
              </div>
            :
              <div className="dateDetails">
                <h4>Release Date</h4>
                <p>{moment(details.release_date).format('MMM D, YYYY')}</p>
              </div>


          }
        </div>
        </div>
        <div className="cardBottom">
          <img src={logoTMDB} alt="Logo for TMDB." />
          <p>{details.vote_average}</p>
        </div>
      </div>
  )
}

export default DetailsCard;