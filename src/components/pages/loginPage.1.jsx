import React, { Component } from "react";
import Header from "../common/header";
import { Link } from "react-router-dom";

class LoginPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Link to="/register">Register</Link>
      </div>
    );
  }
}

export default LoginPage;
