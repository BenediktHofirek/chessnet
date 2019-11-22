import React from "react";
import whiteRook from "../../others/boardPieces/whiteRook.png";
import whiteKnight from "../../others/boardPieces/whiteKnight.png";
import whiteBishop from "../../others/boardPieces/whiteBishop.png";
import whiteQueen from "../../others/boardPieces/whiteQueen.png";
import whiteKing from "../../others/boardPieces/whiteKing.png";
import whitePawn from "../../others/boardPieces/whitePawn.png";
import blackRook from "../../others/boardPieces/blackRook.png";
import blackKnight from "../../others/boardPieces/blackKnight.png";
import blackBishop from "../../others/boardPieces/blackBishop.png";
import blackQueen from "../../others/boardPieces/blackQueen.png";
import blackKing from "../../others/boardPieces/blackKing.png";
import blackPawn from "../../others/boardPieces/blackPawn.png";

const BoardField = ({ index, piece, handleFieldClick, clicked }) => {
  const pieceImage = {
    blackRook: blackRook,
    blackPawn: blackPawn,
    blackKnight: blackKnight,
    blackBishop: blackBishop,
    blackKing: blackKing,
    blackQueen: blackQueen,
    whiteRook: whiteRook,
    whitePawn: whitePawn,
    whiteKnight: whiteKnight,
    whiteBishop: whiteBishop,
    whiteKing: whiteKing,
    whiteQueen: whiteQueen
  };

  const getColour = () => {
    if (Math.trunc(index / 8) % 2) {
      return index % 2 ? "white" : "black";
    } else {
      return index % 2 ? "black" : "white";
    }
  };

  return (
    <td
      className={`board-field ${getColour()} ${clicked ? "clicked" : ""}`}
      onClick={() => handleFieldClick(piece, index)}
    >
      {pieceImage[piece] && <img src={pieceImage[piece]} alt={piece} className={"piece"} />}
    </td>
  );
};

export default BoardField;
