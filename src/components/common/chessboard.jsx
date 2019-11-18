import React, { Component } from "react";
import startingPosition from "../others/startingPosition";
import { boardCoordinates } from "../others/boardCoordinates";

const Chessboard = ({ position, playerColour }) => {
  const boardCoordinatesByPlayerSide =
    playerColour === "white" ? boardCoordinates : boardCoordinates.reverse();
  console.log(boardCoordinatesByPlayerSide);
  return <div></div>;
};

export default Chessboard;
