import MediaSearch from '../../components/Search/MediaSearch';
import './homepage.css'

const Homepage = () => {

    return (
      <div className="wrapper">
        <h1>What are you looking for?</h1>
        <MediaSearch />
      </div>
    );
}
 
export default Homepage;