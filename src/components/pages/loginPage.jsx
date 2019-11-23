import React, { Component } from "react";
import Header from "../common/header";
import { Link } from "react-router-dom";

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
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
    const {username, password} = this.state;
    event.preventDefault();
    const response = await fetch(`http://127.0.0.1/service/login?username=${username}&password=${password}`, {
      method: 'POST'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    });
  }

  render() {
    return (
      <div>
        <Header />
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Password:
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <h3>Not registered yet?</h3>
        <Link to="/register">Register</Link>
      </div>
    );
  }
}

export default LoginPage;
