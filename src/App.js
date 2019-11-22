import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainPage from "./components/pages/mainPage";
import LoginPage from './components/pages/loginPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/play" component>
      </Switch>
    </Router>
  );
}

export default App;
