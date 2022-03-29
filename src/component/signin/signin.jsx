import Logo from "../logo/logo";
import "./signin.scss";
import FormInput from "../formInput/form-input";
import CustomButton from "../customButton/custom-button";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase";
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

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const logGoogleuser = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      resetFormField();
      console.log(response);
      toast.success("Welcome Back");
      history.push("./homepage");
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("User not found");
          break;
        case "auth/wrong-password":
          toast.error("Wrong Password");
          break;
        default:
          console.log(error);
          toast.error("Something went wrong");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="signin-container">
      <Logo />
      <div className="signin-signup-form">
        <form onSubmit={handleSubmit}>
          <FormInput
            name="email"
            type="email"
            label="Email*"
            value={email}
            onChange={handleChange}
            required
          />
          <FormInput
            name="password"
            type="password"
            label="Password*"
            value={password}
            onChange={handleChange}
            required
          />

          <div className="buttons">
            <div className="sign-button">
              <CustomButton>Sign in</CustomButton>
              <Link to="/signup">Sign up</Link>
            </div>

            <div className="forgotpassword">
              <button id="forgot-password">Forgot passowrd?</button>
            </div>
          </div>
          <CustomButton type="button" buttonType="google" onClick={logGoogleuser}>
            Sign in with Google
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default Signin;
