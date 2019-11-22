import React from "react";
import BoardField from "./boardField";

const Chessboard = ({ position, handleFieldClick }) => {
  const boardWithPieces = position.map((value, index) => (
    <BoardField
      index={index}
      piece={value.piece}
      key={index}
      handleFieldClick={handleFieldClick}
      clicked={!!value.clicked}
    />
  ));

  return (
    <table id="chessboard">
      <tbody className="board">
        {Array.apply(null, Array(8)).map((value, index) => (
          <tr key={index} className="board-row">
            {boardWithPieces.slice(index * 8, index * 8 + 8).map(e => e)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Chessboard;
