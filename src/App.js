import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainPage from "./components/pages/mainPage";
import LoginPage from "./components/pages/loginPage";
import PrivateRoute from "./components/others/privateRoute";

function App() {
  return (
    <Router>
      <Switch>
      <Route path="/login" children={<LoginPage />} />
        <PrivateRoute path="/" children={<MainPage />} />
      </Switch>
    </Router>
  );
}

export default App;
