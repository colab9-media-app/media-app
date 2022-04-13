import { Redirect, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./contexts/userContext";

const ProtectedRoute = ({ component: Component, ...restProp }) => {
  const { currentUser, loadingUser, authenticated } = useContext(UserContext);
  if (loadingUser) {
    return <div className="homepage"></div>;
  }
  if (authenticated) {
    return <Route {...restProp} render={(props) => <Component {...props} />} />;
  } else {
    return <Redirect to="/" />;
  }
};

export default ProtectedRoute;
