import React, { Component } from "react";
import BoardField from "./boardField";

const Chessboard = ({ position }) => {
  const boardWithPieces = position.map((value, index) => (
    <BoardField
      color={index % 2 ? "black" : "white"}
      piece={value.piece}
      key={index}
    />
  ));

  return (
    <table>
      <tbody>
        {Array.apply(null, Array(8)).map((value, index) => (
          <tr key={index}>
            {boardWithPieces.slice(index * 8, index * 8 + 8).map(e => e)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Chessboard;
