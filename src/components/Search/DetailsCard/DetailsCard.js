import './detailsCard.css';
import logoTMDB from '../../../assets/images/logoOneLineTMDB.svg';

const DetailsCard = ({ show, setShow, id, details }) => {
  return (
    !show ? null :

      <div className="modal" key={id}>
        <button onClick={() => setShow(false)}>X</button>
        <div className="cardLeft">
          <div className="poster">
            <img
              src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
              alt={`Poster for ${details.original_title}`}
            />
          </div>
          <div className="cardLogo">
            <img src={logoTMDB} alt="" />
            <p>{details.vote_average}</p>
          </div>
        </div>
        <div className="cardRight">
          {
            details.media_type === "movie" ?
              <h3>{details.title}</h3> :
              <h3>{details.name}</h3>
          }
          <p>{details.overview}</p>
          <h4>Genre</h4>
          
        </div>

        
      </div>
  )

}

export default DetailsCard;