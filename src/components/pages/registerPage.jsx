import React, { Component } from "react";
import Header from "../common/header";
import { Link } from "react-router-dom";

class RegisterPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Link to="/login">Login</Link>
      </div>
    );
  }
}

export default RegisterPage;
