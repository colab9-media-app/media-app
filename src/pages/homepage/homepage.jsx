import MediaSearch from '../../components/Search/MediaSearch';
import './homepage.css'

const Homepage = () => {

  return (
    <div className="homepage">

      <div className="wrapper">
        <h1>What are you looking for?</h1>
        <MediaSearch />
      </div>
    </div>
  );
}

export default Homepage;