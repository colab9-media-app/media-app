import "./custom-button.scss"
export const BUTTON_TYPE_CLASSES = {
    signin: "signin",
    google: "google-sign-in",
  };
  

const CustomButton = ({children, buttonType, ...buttonProps}) => {
    return ( 
        <button className={`custom-button ${BUTTON_TYPE_CLASSES[buttonType]}`} {...buttonProps} >
            {children}
        </button>
     );
}
 
export default CustomButton;