import React, { Component } from "react";

class HomeTab extends Component {
  constructor(){
    super();
    this.state = {
      username: ""
    }
  }

  async componentDidMount(){
    const response = await fetch(
      // `http://127.0.0.1/service/getUsername`,
      "http://localhost:8080?parameters=getUsername",
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
    return <div>{`Welcome to ChessNet ${username}!`}</div>;
  }
}

export default HomeTab;
