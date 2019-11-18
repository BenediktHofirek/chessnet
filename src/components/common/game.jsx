import React, { Component } from "react";
import Notation from "./notation";
import Chessboard from "./chessboard";
import { createStartingPosition } from "../others/supportFunctions";

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      position: createStartingPosition("white"),
      gameRecord: []
    };
  }

  render() {
    const { position, gameRecord } = this.state;
    console.log(position);
    return (
      <div>
        <Chessboard position={position} />
        <Notation gameRecord={gameRecord} />
      </div>
    );
  }
}
