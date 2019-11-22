import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navigation extends Component {
  state = {};
  render() {
    return (
      <div>
        <Link to="/home">Home</Link>
        <Link to="/play">Play</Link>
      </div>
    );
  }
}

export default Navigation;
