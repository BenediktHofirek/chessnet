import React, { Component } from "react";
import Header from "../common/header";
import { Link } from "react-router-dom";

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
      `http://127.0.0.1/service/register?username=${username}&password=${password}&email=${email}`,
      {
        method: "POST"
      }
    );
    console.log(response);
  }

  render() {
    const { username, password, email } = this.state;
    return (
      <div>
        <Header />
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              name="username"
              type="text"
              value={username}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Password:
            <input
              name="password"
              type="password"
              value={password}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Email:
            <input
              name="email"
              type="email"
              value={email}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <h3>Already registered?</h3>
        <Link to="/login">Login</Link>
      </div>
    );
  }
}

export default RegisterPage;
