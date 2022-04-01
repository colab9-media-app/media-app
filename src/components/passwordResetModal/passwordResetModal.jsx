import "./passwordResetModal.scss";
import Modal from "react-modal";
import ButtonLoader from "../buttonLoader/buttonLoader";
import { Link } from "react-router-dom";

const PasswordResetModal = ({
  resType,
  loading,
  open,
  errMesg,
  resendLink,
}) => {
  return (
    <Modal
      id="reset-modal"
      isOpen={open}
      ariaHideApp={false}
      overlayClassName="modal-overlay"
    >
      <div className="modal-content">
        <h2>Forget password</h2>
        {loading ? (
          <div className="creatin">
            <ButtonLoader /> <p> Please wait...</p>
          </div>
        ) : resType === "success" ? (
          <div className="created">
            {<p>An email with a link to reset your password was sent</p>}
            <Link className="start-your-journey" to="/" onClick={resendLink}>
              Send a new link
            </Link>
            <div className="contact-help">
              <div className="line"></div>
              <p className="pls-contact">
                Please contact support if you have any issues.
              </p>
            </div>
          </div>
        ) : (
          <div className="created">
            {" "}
            <h5> {errMesg} </h5>{" "}
            <Link className="start-your-journey" to="/">
              Back
            </Link>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PasswordResetModal;
