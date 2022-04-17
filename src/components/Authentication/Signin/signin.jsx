import Logo from "../../Logo/logo";
import google from "../../../assets/icons/google.svg";
import "./signin.scss";
import FormInput from "../FormInput/form-input";
import CustomButton from "../CustomButton/custom-button";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../contexts/userContext";
import { Link } from "react-router-dom";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../../utils/firebase/firebase";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";



const defaultFormFields = {
  email: "",
  password: "",
};

const Signin = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const history = useHistory();
  const [errormessage, setErrorMessage] = useState(false);
  const {authenticated} = useContext(UserContext);
  


  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const logGoogleuser = async () => {
    await signInWithGooglePopup();
    window.location.href="/homepage";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {user} = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      resetFormField();
      window.location.href="/homepage";
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("User not found");
          setErrorMessage("User not found");
          break;
        case "auth/wrong-password":
          toast.error("Wrong Password");
          setErrorMessage("Wrong Password");
          break;
        default:
          toast.error("Something went wrong");
          setErrorMessage("Something went wrong");
      }
    }
  };
 

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

useEffect(() => {
if (authenticated) {
  history.push("/homepage");
}
}, [authenticated]);

  return (
    <div className="signin-container">
      <Logo />
      <div className="signin-signup-form">
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            {errormessage ? (
              <FormInput
                name="email"
                type="email"
                label="Email*"
                value={email}
                onChange={handleChange}
                style={{ border: "1px solid red" }}
                required
              />
            ) : (
              <FormInput
                name="email"
                type="email"
                label="Email*"
                value={email}
                onChange={handleChange}
                required
              />
            )}
            <i className="fa-solid fa-at"></i>
            <span className="span-message" style={{ color: "crimson" }}>
              {errormessage}
            </span>
          </div>
          <div className="input-box">
            {errormessage ? (
              <FormInput
                name="password"
                type="password"
                label="Password*"
                value={password}
                onChange={handleChange}
                style={{ border: "1px solid red" }}
                required
              />
            ) : (
              <FormInput
                name="password"
                type="password"
                label="Password*"
                value={password}
                onChange={handleChange}
                required
              />
            )}
            <i className="fa-solid fa-lock"></i>
            <Link to="/password-reset" className="forgot-link">
              Forgot?
            </Link>
            <span className="span-message" style={{ color: "crimson" }}>
              {errormessage}
            </span>
          </div>
          <div className="buttons">
            <div className="sign-button">
              <CustomButton buttonType="signin">Sign in</CustomButton>
              <Link to="/signup" className="create-an-account">
                Create an Account
              </Link>
            </div>
            <div className="or-line">
              <div className="line"></div>
              Or
              <div className="line"></div>
            </div>
            <CustomButton
              type="button"
              buttonType="google"
              onClick={logGoogleuser}
            >
              <img src={google} alt="google-button" id="google-logo" /> Sign in
              with Google
            </CustomButton>
          </div>
        </form>
      </div>
     
    </div>
  );
};

export default Signin;
