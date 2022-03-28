
import"./App.css"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "./pages/homepage/homepage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer/footer";
import Signin from "./components/Signin/signin";
import Signup from "./components/Signup/signup";
import { toast } from "react-toastify";



function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <ToastContainer position="top-center" />
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/homepage" component={Homepage} />
        </Switch>
        
        </div>
        {/* <Footer/> */}
        </BrowserRouter>
  )

}

export default App;
