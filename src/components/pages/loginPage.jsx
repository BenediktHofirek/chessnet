import React, { Component } from "react";
import Header from "../common/header";
import { Link } from "react-router-dom";

class LoginPage extends Component {
  
  
  handleChange(event) {
    const name = event.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(event){
    event.preventDefault();
    fetch()
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
