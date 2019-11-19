import React, { Component } from "react";
import Notation from "./notation";
import Chessboard from "./chessboard";
import { pawnMove, promotion, anPassant } from "../pieceMoves/pawnMove";
import rookMove from "../pieceMoves/rookMove";
import bishopMove from "../pieceMoves/bishopMove";
import knightMove from "../pieceMoves/knightMove";
import { kingMove, castling } from "../pieceMoves/kingMove";

export default class Game extends Component {
  constructor() {
    super();
    this.promotion = promotion.bind(this);
    this.anPassant = anPassant.bind(this);
    this.castling = castling.bind(this);
    this.state = {
      position: this.createStartingPosition("white"),
      playerColour: "",
      sideToMove: "white",
      gameRecord: []
    };
  }

  createStartingPosition = playerColour => {
    const startingPosition = [];
    const charH = 104;
    for (let x = 1; x < 9; x++) {
      for (let y = charH; y > charH - 8; y--) {
        let piece = "";

        if (x === 1 || x === 2) {
          piece = piece + "white";
        } else if (x === 7 || x === 8) {
          piece = piece + "black";
        }

        if (x === 2 || x === 7) {
          piece = piece + "Pawn";
        } else if (
          piece &&
          (String.fromCharCode(y) === "a" || String.fromCharCode(y) === "h")
        ) {
          piece = piece + "Rook";
        } else if (
          piece &&
          (String.fromCharCode(y) === "b" || String.fromCharCode(y) === "g")
        ) {
          piece = piece + "Knight";
        } else if (
          piece &&
          (String.fromCharCode(y) === "c" || String.fromCharCode(y) === "f")
        ) {
          piece = piece + "Bishop";
        } else if (piece && String.fromCharCode(y) === "d") {
          piece = piece + "Queen";
        } else if (piece && String.fromCharCode(y) === "e") {
          piece = piece + "King";
        }

        startingPosition.push({
          coordinate: String.fromCharCode(y) + x.toString(),
          piece
        });
      }
    }

    if (playerColour === "white") {
      startingPosition.reverse();
    }
    return startingPosition;
  };

  handleFieldClick = (piece, index) => {
    const { position, playerColour, sideToMove } = this.state;
    const firstClickedField = position.find(e => e.clicked);

    //if player did not clicked to any piece yet
    if (!firstClickedField) {
      if (
        (!playerColour || (piece && piece.includes(playerColour))) &&
        piece.includes(sideToMove)
      ) {
        const positionWithClick = position.map((field, i) => {
          field.clicked = index === i;
          return field;
        });
        this.setState({ position: positionWithClick });
      }
      return;
    } else {
      let moveAllowed = false;
      const newPosition = [...position];
      const secondClickedField = position[index];

      //if player click to another own piece
      if (
        secondClickedField.piece.includes(sideToMove) &&
        firstClickedField.piece.includes(sideToMove)
      ) {
        newPosition.forEach((field, index) => {
          if (field.coordinate === secondClickedField.coordinate) {
            newPosition[index].clicked = true;
          } else if (field.clicked) {
            newPosition[index].clicked = false;
          }
        });
        this.setState({ position: newPosition });
        return;
      }

      // 5 because "white" and also "black" have both length 5
      switch (firstClickedField.piece.substring(5)) {
        case "Rook":
          moveAllowed = rookMove(
            firstClickedField,
            secondClickedField,
            position
          );
          break;
        case "Knight":
          moveAllowed = knightMove(
            firstClickedField,
            secondClickedField,
            position
          );
          break;
        case "Bishop":
          moveAllowed = bishopMove(
            firstClickedField,
            secondClickedField,
            position
          );
          break;
        case "Queen":
          moveAllowed =
            bishopMove(firstClickedField, secondClickedField, position) ||
            rookMove(firstClickedField, secondClickedField, position);
          break;
        case "King":
          moveAllowed = kingMove(
            firstClickedField,
            secondClickedField,
            position
          );
          break;
        case "Pawn":
          moveAllowed = pawnMove(
            firstClickedField,
            secondClickedField,
            position,
            sideToMove
          );
          break;
        default:
          break;
      }

      if (moveAllowed) {
        newPosition[index].piece = firstClickedField.piece;
        if (firstClickedField.piece.includes("Pawn")) {
          this.promotion(newPosition);
        }
        newPosition[
          newPosition.findIndex(
            field => field.coordinate === firstClickedField.coordinate
          )
        ].piece = "";
        for (let x = 0; x < newPosition.length; x++) {
          newPosition[x].clicked = false;
        }

        this.setState(state => {
          return {
            position: newPosition,
            sideToMove: state.sideToMove === "white" ? "black" : "white"
          };
        });
      }
    }
  };

  render() {
    const { position, gameRecord } = this.state;

    return (
      <div>
        <Chessboard
          position={position}
          handleFieldClick={this.handleFieldClick}
        />
        <Notation gameRecord={gameRecord} />
      </div>
    );
  }
}
