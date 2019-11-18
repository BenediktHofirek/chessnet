import React, { Component } from "react";
import Notation from "./notation";
import Chessboard from "./chessboard";

export default class Game extends Component {
  render() {
    return (
      <div>
        <Chessboard />
        <Notation />
      </div>
    );
  }
}
