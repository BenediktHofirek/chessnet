import React, { Component } from "react";
import Header from "../common/header";

class LoginPage extends Component {
  constructor(){
    super();
    this.state = {
      login: true
    }
  }

  handleSwitch(tab){
      this.setState({switch: tab})
  }
  render() {
    const {login} = this.state;
    return (
      <div>
        <Header />
        {login ?}
      </div>
    );
  }
}

export default LoginPage;
