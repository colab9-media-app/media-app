import "./signModal.scss";
import Modal from "react-modal";
import ButtonLoader from "../../buttonLoader/buttonLoader";
import { Link } from "react-router-dom";

const SignModal = ({ resType, loading, open, errMesg }) => {
  return (
      <Modal id="sign-modal" isOpen={open} overlayClassName="modal-overlay" ariaHideApp={false}>
        <div className="created">
          {loading ? (
            <div className="creatin">
              <ButtonLoader /> <p> Creating account...</p>
            </div>
          ) :
          resType === "success" ? (
            <div className="created">
              {" "}
              <h5> Account created</h5>{" "}
              <p>
                Everything is set, your account is ready and now you can start
                your journey.
              </p>
              <Link className="start-your-journey" to="/">
                start your journey
              </Link>
            </div>
          ) : (
            <div className="created">
              {" "}
              <h5> {errMesg} </h5>{" "}
              <Link className="start-your-journey" to="/">
                Back
              </Link>
            </div>
          ) }
          <div></div>
        </div>
      </Modal>
  );
};

export default SignModal;
