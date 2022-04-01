import { useState } from "react";
<<<<<<< HEAD:src/component/signup/signup.jsx
import "./signup.scss";
import FormInput from "../formInput/form-input";
import Logo from "../logo/logo";
import CustomButton from "../customButton/custom-button";
import { toast } from "react-toastify";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase";
import SignModal from "../modal/signModal/signModal";
=======
import FormInput from "../../Authentication/FormInput/form-input";
import Logo from "../../Logo/logo";
import CustomButton from "../../Authentication/CustomButton/custom-button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../../utils/firebase/firebase";
>>>>>>> main:src/components/Authentication/Signup/signup.jsx



const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  consent: false,
};

const Signup = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword, consent } = formFields;
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resType, setResType] = useState("");
  const [errMesg, setErrMesg] = useState("");
 

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("your password does not match");
      return;
    }

    if (consent) {
      try {
        setLoading(true);
        setShowModal(true);
        const { user } = await createAuthUserWithEmailAndPassword(
          email,
          password
        );
        await createUserDocumentFromAuth(user, { displayName: email.charAt(0).toUpperCase() });
        resetFormField();
        toast.success("Account Created");
        setLoading(false);
        setResType("success");
        // history.push("./");
      } catch (error) {
        setLoading(false);
        if (error.code === "auth/email-already-in-use") {
          toast.error("Can not create User, email already exist");
            setErrMesg("Can not create User, email already exist");
        } else {
          console.error("there was an issue creating a profile", error);
            toast.error("Something went wrong");
            setErrMesg("Something went wrong");
        }
      }
    } else {
      toast.warning("Please agree to the terms and conditions");
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="signin-container">
      <Logo />
      {showModal && 
          <SignModal
          resType={resType}
          loading={loading}
          errMesg={errMesg}
          open={true}
          />}
      <div className="signin-signup-form">
        <form onSubmit={handleSubmit}>
          <div className="input-box">
          <FormInput
            name="email"
            type="email"
            label="Email*"
            value={email}
            onChange={handleChange}
            required
          />
           <i className="fa-solid fa-at"></i>
          </div>
           <div className="input-box">
          <FormInput
            name="password"
            type="password"
            label="Password*"
            value={password}
            onChange={handleChange}
            required
          />
          <i className="fa-solid fa-lock"></i>
          </div>
           <div className="input-box">
          <FormInput
            name="confirmPassword"
            type="password"
            label="Confirm Password*"
            value={confirmPassword}
            onChange={handleChange}
            required
          />
          <i className="fa-solid fa-lock"></i>
          </div>
          <div className="buttons">
            <div className="sign-button">
              <CustomButton buttonType="signin">Sign up</CustomButton>
              <div className="agree">
                <input
                  type="checkbox"
                  name="consent"
                  id="terms"
                  checked={consent}
                  onChange={handleChange}
                />
                I agree to terms & conditions
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
