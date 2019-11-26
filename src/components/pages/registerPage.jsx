import React, { Component } from "react";
import Header from "../common/header";
import { Link } from "react-router-dom";
import login from "../others/login";

class RegisterPage extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    const { username, password, email } = this.state;
    event.preventDefault();
    const response = await fetch(
      // `http://127.0.0.1/service/register`,
      "http://localhost:8080?parameters=register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `username=${username}&password=${password}&email=${email}`
      }
    );
    const responseBody = await response.text();
    console.log(responseBody);
    if (response.status[0] === "2") {
      login();
    }
  }

  render() {
    const { username, password, email } = this.state;
    return (
      <div className="outer-div">
        <Header />
        <form onSubmit={this.handleSubmit}>
          <div className="item">
            <label>Username:</label>
            <input
              name="username"
              type="text"
              value={username}
              onChange={this.handleChange}
            />
          </div>
          <div className="item">
            <label>Password:</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <div className="item">
            <label>Email:</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
        <h3>Already registered?</h3>
        <Link to="/login">Login</Link>
      </div>
    );
  }
}

export default RegisterPage;
