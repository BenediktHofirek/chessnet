import React, { Component } from "react";
import Notation from "../notation";
import Chessboard from "../chessboard";
import castling from "./chessGameFunctions/supportFunctions/castling";
import checkCheck from "./chessGameFunctions/supportFunctions/checkCheck";
import checkMove from "./chessGameFunctions/supportFunctions/checkMove";
import checkGameEnd from "./chessGameFunctions/gameEndFunctions/checkGameEnd";
import c from "../../others/c";
import generatePosition from "../../../tests/supportFunctions/generatePosition";

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      position: generatePosition([
        ["h1", "whiteKing"],
        ["h8", "blackKing"],
        ["a7", "blackBishop"],
        ["a3", "whiteBishop"]
      ]), //this.createStartingPosition("white"),
      playerColour: "",
      sideToMove: "white",
      gameRecord: [],
      castlingRights: ["a1", "h1", "a8", "h8"],
      mate: false,
      draw: false
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
      } else {
        this.handleMove(firstClickedField, secondClickedField);
      }
    }
  };

  handleMove = (firstClickedField, secondClickedField) => {
    const { castlingRights, position, sideToMove, gameRecord } = this.state;
    const castlingR = c(castlingRights);
    let newPosition = c(position);

    //true, false, or in special case "castling" (which means true and make castle)
    const moveAllowed = checkMove(
      firstClickedField,
      secondClickedField,
      position,
      castlingR
    );

    if (!moveAllowed) {
      return;
    }
    const moveIsWithoutCheck = this.makeMove(
      firstClickedField,
      secondClickedField,
      newPosition,
      moveAllowed,
      castlingR,
      sideToMove
    );

    if (!moveIsWithoutCheck) {
      return;
    } else {
      //gameResult = mate, draw
      //this function has still old value, so it must change them, because the position has changed
      const gameResult = checkGameEnd(
        c(newPosition),
        sideToMove === "white" ? "black" : "white",
        gameRecord
      );

      this.setState(state => {
        return {
          position: newPosition,
          sideToMove: state.sideToMove === "white" ? "black" : "white",
          castlingRights: castlingR,
          mate: gameResult === "mate" ? true : false,
          draw: gameResult === "draw" ? true : false
        };
      });
    }
  };

  makeMove = (
    firstClickedField,
    secondClickedField,
    newPosition,
    moveAllowed,
    castlingR,
    sideToMove
  ) => {
    //if the move is with the king and castling is allowed and was made, nothing else needs to be done
    if (moveAllowed === "castling") {
      castling(secondClickedField.coordinate, newPosition, castlingR);
    } else {
      const index = newPosition.findIndex(
        e => e.coordinate === secondClickedField.coordinate
      );
      newPosition[index].piece = firstClickedField.piece;
      if (firstClickedField.piece.includes("Pawn")) {
        this.promotion(newPosition);
      }
      newPosition[
        newPosition.findIndex(
          field => field.coordinate === firstClickedField.coordinate
        )
      ].piece = "";
    }

    const moveIsWithoutCheck = checkCheck(
      firstClickedField,
      secondClickedField,
      newPosition,
      moveAllowed,
      sideToMove
    );

    if (!moveIsWithoutCheck) {
      return false;
    }
    //reset clicked piece
    for (let x = 0; x < newPosition.length; x++) {
      newPosition[x].clicked = false;
    }

    return true;
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
