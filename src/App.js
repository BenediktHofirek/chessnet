import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import MainPage from "./components/pages/mainPage";
import LoginPage from "./components/pages/loginPage";
import PrivateRoute from "./components/others/privateRoute";
import RegisterPage from "./components/pages/registerPage";
import PublicRoute from "./components/others/publicRoute";

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute path="/login" children={<LoginPage />} />
        <PublicRoute path="/register" children={<RegisterPage />} />
        <PrivateRoute path="/" children={<MainPage />} />
      </Switch>
    </Router>
  );
}

export default App;
