import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainPage from "./components/pages/mainPage";
import LoginPage from './components/pages/loginPage';
import PrivateRoute from './components/others/privateRoute';

function App() {
  return (
    <Router>
        <PrivateRoute path="/" children={<MainPage/>}/>
    </Router>
  );
}

export default App;
