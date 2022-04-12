import "./styles/App.css"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Homepage from "./pages/homepage/homepage.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgetPassword from "./components/forgetPassword/forgetPassword";
import Signin from "./components/Authentication/Signin/signin";
import Signup from "./components/Authentication/Signup/signup";
import { UserContext } from "./contexts/userContext";
import { useContext, useEffect } from "react";
import NotFound from "./pages/NotFound";
import AOS from "aos";
import "aos/dist/aos.css";



function App() {
  useEffect(() => {
    AOS.init({ duration: 1500 });
    AOS.refresh();
  }, []);
  const { currentUser } = useContext(UserContext);
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-right" />
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/signin" component={Signin}/>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/homepage" component={Homepage} />      
          <Route exact path="/password-reset" component={ForgetPassword} />
          <Route path= "*" component={NotFound} />

        </Switch>

      </div>
      {/* <Footer/> */}
    </BrowserRouter>
  )

}

export default App;
