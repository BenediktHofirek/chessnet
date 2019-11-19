import React, { Component } from "react";
import Notation from "./notation";
import Chessboard from "./chessboard";
import { breakStatement } from "@babel/types";

export default class Game extends Component {
  constructor() {
    super();
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
          moveAllowed = this.rookMove(
            firstClickedField,
            secondClickedField,
            position
          );
          break;
        case "Knight":
          moveAllowed = this.knightMove(
            firstClickedField,
            secondClickedField,
            position
          );
          break;
        case "Bishop":
          moveAllowed = this.bishopMove(
            firstClickedField,
            secondClickedField,
            position
          );
          break;
        case "Queen":
          moveAllowed = this.queenMove(
            firstClickedField,
            secondClickedField,
            position
          );
          break;
        case "King":
          moveAllowed = this.kingMove(
            firstClickedField,
            secondClickedField,
            position
          );
          break;
        case "Pawn":
          moveAllowed = this.pawnMove(
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

  rookMove = (firstF, secondF, position) => {
    return;
  };
  knightMove = (firstF, secondF, position) => {
    return;
  };
  bishopMove = (firstF, secondF, position) => {
    return;
  };
  queenMove = (firstF, secondF, position) => {
    return;
  };
  kingMove = (firstF, secondF, position) => {
    return;
  };
  pawnMove = (firstF, secondF, position, sideToMove) => {
    return (
      //move one step forward
      (Number(firstF.coordinate[1]) ===
        +secondF.coordinate[1] + (sideToMove === "white" ? -1 : 1) &&
        firstF.coordinate[0] === secondF.coordinate[0] &&
        !secondF.piece) ||
      //move two step forward from starting position
      (Number(firstF.coordinate[1]) === (sideToMove === "white" ? 2 : 7) &&
        Number(secondF.coordinate[1]) === (sideToMove === "white" ? 4 : 5) &&
        firstF.coordinate[0] === secondF.coordinate[0] &&
        !secondF.piece &&
        !position.find(
          f =>
            f.coordinate ===
            `${firstF.coordinate[0]}${+firstF.coordinate[1] +
              (sideToMove === "white" ? 1 : -1)}`
        ).piece) ||
      //take piece
      (Number(firstF.coordinate[1]) ===
        +secondF.coordinate[1] + (sideToMove === "white" ? -1 : 1) &&
        (String.fromCharCode(firstF.coordinate[0].charCodeAt(0) + 1) ===
          secondF.coordinate[0] ||
          String.fromCharCode(firstF.coordinate[0].charCodeAt(0) - 1) ===
            secondF.coordinate[0]) &&
        secondF.piece.includes(sideToMove === "white" ? "black" : "white"))
    );
    //WIP take an passant
  };

  promotion = newPosition => {
    //WIP promotion to other pieces
    for (let x = 0; x < newPosition.length; x++) {
      if (
        Number(newPosition[x].coordinate[1]) === 1 &&
        newPosition[x].piece === "blackPawn"
      ) {
        newPosition[x].piece = "blackQueen";
      } else if (
        Number(newPosition[x].coordinate[1]) === 8 &&
        newPosition[x].piece === "whitePawn"
      ) {
        newPosition[x].piece = "whiteQueen";
      }
    }
    console.log(newPosition);
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
