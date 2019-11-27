import React, { Component } from "react";

class HomeTab extends Component {

  render() {
    const {username} = this.props;
    return <div>{`Welcome to ChessNet ${username}!`}</div>;
  }
}

export default HomeTab;
