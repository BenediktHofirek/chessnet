import React, { Component } from "react";
import Notation from "./notation";
import Chessboard from "./chessboard";

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      position: this.createStartingPosition("white"),
      playerColour: "white",
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
    return startingPosition;
  };

  handleFieldClick = (piece, index) => {
    const { position, playerColour } = this.state;
    const firstClickedField = position.find(e => e.clicked);

    if (!firstClickedField) {
      if (!playerColour || (piece && piece.includes(playerColour))) {
        const positionWithClick = position.map((field, i) => {
          field.clicked = index === i;
          return field;
        });
        this.setState({ position: positionWithClick });
      }
    } else {
      let moveAllowed = false;
      const secondClickedField = position[index];
      console.log(firstClickedField.piece.substring(5));
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
            position
          );
          break;
      }

      if (moveAllowed) {
        const newPosition = [...position];
        newPosition[newPosition.findIndex(secondClickedField)].piece =
          firstClickedField.piece;
        newPosition[newPosition.findIndex(firstClickedField)].piece = "";
        for (let x = 0; x < newPosition.length; x++) {
          newPosition[x].clicked = false;
        }

        this.setState({ position: newPosition });
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
  pawnMove = (firstF, secondF, position) => {
    return;
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
