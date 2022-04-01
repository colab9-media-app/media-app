import "./forgetPassword.scss";
import Logo from "../logo/logo";
import FormInput from "../formInput/form-input";
import { useState } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../customButton/custom-button";
import google from "../../asset/icons/google.svg";
import { forgetPassword } from "../../utils/firebase/firebase";
import { toast } from "react-toastify";
import PasswordResetModal from "../modal/passwordResetModal/passwordResetModal";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resType, setResType] = useState("");
  const [errMesg, setErrMesg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setShowModal(true);
      await forgetPassword(email);
      setLoading(false);
      setResType("success");
      toast.success("New link was sent to your email.");
      setEmail("");
    } catch (error) {
      setLoading(false);
      setResType("error");
      if (error.code === "auth/user-not-found") {
        setErrMesg("User not found");
        toast.error("User not found");
      } else if (error.code === "auth/invalid-email") {
        setErrMesg("Invalid email");
      } else {
        setErrMesg(error.message);
      }
    }
  };

  return (
    <div className="signin-container">
      <Logo />
      {showModal && (
        <PasswordResetModal
          resType={resType}
          loading={loading}
          open={true}
          errMesg={errMesg}
          resendLink={handleSubmit}
        />
      )}
      <div className="signin-signup-form">
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <FormInput
              name="email"
              type="email"
              label="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="fa-solid fa-at"></i>
          </div>
          <div className="buttons">
            <div className="sign-button">
              <CustomButton buttonType="signin">Recover Password</CustomButton>
              <Link to="/signin" className="create-an-account">
                Sign in
              </Link>
            </div>
            <div className="or-line">
              <div className="line"></div>
              Or
              <div className="line"></div>
            </div>
            <CustomButton type="button" buttonType="google">
              <img src={google} alt="google-button" id="google-logo" /> Sign in
              with Google
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
