import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from "../common/header";
import Navigation from './components/common/navigation';
import HomeTab from './mainPageTabs/homeTab';
import PlayTab from './mainPageTabs/playTab';
export default class MainPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Navigation/>
        <Router>
          <Switch>
            <Route path="/play">
              <PlayTab />
            </Route>
            <Route path="/home">
              <HomeTab />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
