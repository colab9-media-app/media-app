import { useState } from "react";
import FormInput from "../../Authentication/FormInput/form-input";
import Logo from "../../Logo/logo";
import CustomButton from "../../Authentication/CustomButton/custom-button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../../utils/firebase/firebase";



const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

const Signup = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const history = useHistory()

    const resetFormField = () => {
        setFormFields(defaultFormFields)
    }

const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        alert("your password does not match");
        return;
    }
    try{
        const {user} = await createAuthUserWithEmailAndPassword(email, password);
        await createUserDocumentFromAuth(user, {displayName})
        resetFormField();
        toast.success("Account Created")
        history.push("./")

    }catch (error) {
        if (error.code === "auth/email-already-in-use") {
            toast.error("Can not create User, email already exist")
        } else{
            console.error("there was an issue creating a profile", error)
        }
    }
   
}; 

    const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };


    return ( 
        <div className="signin-container">
        <Logo/>
        <div className="signin-signup-form">
        <form onSubmit={handleSubmit}>
        <FormInput name='displayName' type='text'label='Display Name*' value={displayName} onChange={handleChange}  required />
        <FormInput name='email' type='email'label='Email*' value={email} onChange={handleChange} required />
        <FormInput name='password' type='password'label='Password*' value={password} onChange={handleChange}  required />
        <FormInput name='confirmPassword' type='password'label='Confirm Password*' value={confirmPassword} onChange={handleChange}  required />
        <div className="buttons">
           <div className="sign-button">
           <Link to="/">Sign in</Link>
           <CustomButton>Sign up</CustomButton>
            
            
            </div>
            <div className="forgotpassword">
             <button id="forgot-password">Forgot passowrd?</button>   
            </div>
            </div>
            </form>
        </div>
        
        </div> 
     
     );
}
 
export default Signup;