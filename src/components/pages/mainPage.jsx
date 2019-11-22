import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NotFoundPage from "./notFoundPage";
import Header from "../common/header";
import Navigation from "../../components/common/navigation";
import HomeTab from "./mainPageTabs/homeTab";
import PlayTab from "./mainPageTabs/playTab";
export default class MainPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Navigation />
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/home">
              <HomeTab />
            </Route>
            <Route path="/play">
              <PlayTab />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
