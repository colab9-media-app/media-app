import"./App.scss"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "./pages/homepage/homepage";
import { ToastContainer } from 'react-toastify';
import Footer from "./component/footer/footer";
import Signin from "./component/signin/signin";
import Signup from "./component/signup/signup";



function App() {
  return (
    <BrowserRouter>
    <div className="App">
    {/* <ToastContainer position="top-center" /> */}
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/homepage" component={Homepage} />
             
        </Switch>
        </div>
        <Footer/>
        </BrowserRouter>
  )

}

export default App;
