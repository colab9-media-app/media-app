import './detailsCard.css'; 

const DetailsCard = ({ show, setShow, id, details }) => {
  return (
  !show ? null : 

    <div className="modal" key={id}>
      {
        details.media_type === "movie" ?
          <h3>{details.title}</h3> :
          <h3>{details.name}</h3>
      }
      <img
        src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
        alt={`Poster for ${details.original_title}`} />
      <button onClick={() => setShow(false)}>X</button>
    </div>
  )

}

export default DetailsCard;