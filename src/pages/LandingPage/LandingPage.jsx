import { Link, useHistory } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import Logo from "../../components/Logo/logo";
import content from "../../assets/images/Content.png";
import "./LandingPage.scss";

const LandingPage = () => {
  const { authenticated } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (authenticated) {
      history.push("/homepage");
    }
  }, [authenticated]);

  return (
    <div className="landing">
      <div className="landing-content">
        <Logo />
        <div className="landing-row">
          <div className="landing-left" data-aos="fade-right">
            <h2>We are your personal multimedia track app.</h2>
            <p>Save what you love and share it with your friends.</p>
            <div className="landing-buttons">
              <Link to="/signup">Create Account</Link>
              <Link to="/signin">Sign in</Link>
            </div>
          </div>
          <div className="landing-right" data-aos="fade-left">
            <img src={content} alt="content_img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
