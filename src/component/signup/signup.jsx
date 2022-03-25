import { useState } from "react";
import FormInput from "../formInput/form-input";
import Logo from "../logo/logo";
import CustomButton from "../customButton/custom-button";
import { Link } from "react-router-dom";


const Signup = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
const userData = {
    email,
    username,
    password,
    confirmPassword
}

const handleSubmit = (e) => {
e.preventDefault();
console.log(userData)
}

    return ( 
        <div className="signin-container">
        <Logo/>
        <div className="signin-signup-form">
        <form onSubmit={handleSubmit}>
        <FormInput name='email' type='email'label='Email*' value={email} onChange={e => setEmail(e.target.value)} required />
        <FormInput name='username' type='text'label='Username*' value={username} onChange={e => setUsername(e.target.value)}  required />
        <FormInput name='password' type='password'label='Password*' value={password} onChange={e => setPassword(e.target.value)}  required />
        <FormInput name='confirm-password' type='password'label='Confirm Password*' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}  required />
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