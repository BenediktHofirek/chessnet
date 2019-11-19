import React, { Component } from "react";
import whiteRook from "../others/boardPieces/whiteRook.png";
import whiteKnight from "../others/boardPieces/whiteKnight.png";
import whiteBishop from "../others/boardPieces/whiteBishop.png";
import whiteQueen from "../others/boardPieces/whiteQueen.png";
import whiteKing from "../others/boardPieces/whiteKing.png";
import whitePawn from "../others/boardPieces/whitePawn.png";
import blackRook from "../others/boardPieces/blackRook.png";
import blackKnight from "../others/boardPieces/blackKnight.png";
import blackBishop from "../others/boardPieces/blackBishop.png";
import blackQueen from "../others/boardPieces/blackQueen.png";
import blackKing from "../others/boardPieces/blackKing.png";
import blackPawn from "../others/boardPieces/blackPawn.png";

const BoardField = ({ index, piece, handleFieldClick, clicked }) => {
  const selectPieceImage = () => {
    switch (piece) {
      case "blackRook":
        return blackRook;
      case "blackKnight":
        return blackKnight;
      case "blackBishop":
        return blackBishop;
      case "blackQueen":
        return blackQueen;
      case "blackKing":
        return blackKing;
      case "blackPawn":
        return blackPawn;
      case "whiteRook":
        return whiteRook;
      case "whiteKnight":
        return whiteKnight;
      case "whiteBishop":
        return whiteBishop;
      case "whiteQueen":
        return whiteQueen;
      case "whiteKing":
        return whiteKing;
      case "whitePawn":
        return whitePawn;
      default:
        break;
    }
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
      className={`board-row ${getColour()} ${clicked ? "clicked" : ""}`}
      onClick={() => handleFieldClick(piece, index)}
    >
      <img
        src={selectPieceImage(piece)}
        alt={piece}
        style={{ width: 30, height: 30 }}
      />
    </td>
  );
};

export default BoardField;
