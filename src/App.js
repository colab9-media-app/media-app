
import "./styles/App.css"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "./pages/homepage/homepage.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgetPassword from "./components/forgetPassword/forgetPassword";
import Signin from "./components/Authentication/Signin/signin";
import Signup from "./components/Authentication/Signup/signup";



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/homepage" component={Homepage} />
          <Route exact path="/password-reset" component={ForgetPassword} />
        </Switch>

      </div>
      {/* <Footer/> */}
    </BrowserRouter>
  )

}

export default App;
