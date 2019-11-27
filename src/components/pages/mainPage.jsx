import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFoundPage from "./notFoundPage";
import Header from "../common/header";
import Navigation from "../../components/common/navigation";
import HomeTab from "./mainPageTabs/homeTab";
import PlayTab from "./mainPageTabs/playTab";
export default class MainPage extends Component {
  constructor(){
    super();
    this.state = {
      username: ""
    }
  }

  async componentDidMount(){
    const response = await fetch(
      `http://127.0.0.1/service/getUsername`,
      {
        method: "GET",
        credentials: 'include'
      }
    );
    const username = await response.text();
    this.setState({username});
  }

  render() {
    const {username} = this.state;
    return (
      <div>
        <Header />
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <HomeTab username={username}/>
          </Route>
          <Route path="/play">
            <PlayTab />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    );
  }
}
