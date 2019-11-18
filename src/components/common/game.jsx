import React, { Component } from "react";
import Notation from "./notation";
import Chessboard from "./chessboard";
import startingPosition from "../others/startingPosition";
import { whileStatement } from "@babel/types";

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      position: startingPosition,
      playerColour: "white",
      gameRecord: []
    };
  }
  render() {
    const { position, gameRecord, playerColour } = this.state;
    return (
      <div>
        <Chessboard 
        position={position} 
        playerColour={playerColour}
        />
        <Notation gameRecord={gameRecord} />
      </div>
    );
  }
}
