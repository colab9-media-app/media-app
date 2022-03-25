import Logo from "../logo/logo";
import "./signin.scss"
import FormInput from "../formInput/form-input";
import CustomButton from "../customButton/custom-button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase";


const Signin = (props) => {

    const logGoogleuser = async () => {
        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
    }


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(email, password)
    }

    return ( 
        <div className="signin-container">
        <Logo/>
        <div className="signin-signup-form">
        <form onSubmit={handleSubmit}>
                <FormInput name='email' type='email'label='Email*' value={email} onChange={e => setEmail(e.target.value)} required />
                <FormInput name='password' type='password'label='Password*' value={password} onChange={e => setPassword(e.target.value)} required />
       
        <div className="buttons">
           <div className="sign-button">
           <CustomButton>Sign in</CustomButton>
           <Link to="/signup">Sign up</Link> 
            </div>
            
            <div className="forgotpassword">
             <button id="forgot-password">Forgot passowrd?</button>   
            </div>
            </div>
            <CustomButton buttonType="google" onClick={logGoogleuser}>Sign in with Google</CustomButton>
            </form>
        </div>
        </div>              
     );
}
 
export default Signin;