import React, { Component } from "react";
import c from "../../others/c";
import Notation from "./notation";
import Chessboard from "./chessboard";
import checkMove from "./chessGameFunctions/supportFunctions/checkMove";
import checkGameEnd from "./chessGameFunctions/gameEndFunctions/checkGameEnd";
import makeMove from "./chessGameFunctions/supportFunctions/makeMove";
import moveRecord from "./chessGameFunctions/supportFunctions/moveRecord";
import Chat from './chat';
import GameDatabase from './gameDatabase';
import GameControlSidebar from "./gameControlSidebar";
import NewGameSidebar from './newGameSidebar';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      position: this.createStartingPosition("white"),
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
    const { castlingRights, position, sideToMove, gameRecord, webSocket } = this.state;
    const castlingR = c(castlingRights);
    const newPosition = c(position);
    const updatedGameRecord = c(gameRecord);

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
    const moveIsWithoutCheck = makeMove(
      firstClickedField,
      secondClickedField,
      newPosition,
      moveAllowed,
      castlingR,
      this
    );

    if (!moveIsWithoutCheck) {
      return;
    } else {
      //gameResult = mate, draw
      //this function has still old value, so it must change them, because the position has changed
      moveRecord(
        firstClickedField,
        secondClickedField,
        newPosition,
        updatedGameRecord
      );

      const gameResult = checkGameEnd(
        c(newPosition),
        sideToMove === "white" ? "black" : "white",
        updatedGameRecord
      );
      //indicate mate in notation
      if (gameResult === "mate") {
        updatedGameRecord[updatedGameRecord.length - 1] = `${
          updatedGameRecord[updatedGameRecord.length - 1]
        }#`;
      }

      this.setState(state => {
        return {
          position: newPosition,
          sideToMove: state.sideToMove === "white" ? "black" : "white",
          castlingRights: castlingR,
          mate: gameResult === "mate" ? true : false,
          draw: gameResult === "draw" ? true : false,
          gameRecord: updatedGameRecord
        };
      });

      webSocket.send(JSON.stringify({
        firstField: firstClickedField, 
          secondField: secondClickedField,
        moveRecord: c(updatedGameRecord).pop()
      }));
    }
  };

  handleNewGame = async(timeControl) => {
    const socket = new WebSocket('ws://localhost/service/playServer');
    socket.onopen(() => socket.send(JSON.stringify(timeControl)));
    socket.onmessage((event) => {
      const data = JSON.parse(event);
      switch(data.command){
        case "handleNewGame":
          this.setState(data);
          break;
        case "handleMove":
          this.makeMove(data.firstField, data.secondField);
        break;
          default: break;
      }
    });

    this.setState({webSocket: socket});
  }

  render() {
    const { position, gameRecord } = this.state;
    const {mode} = this.props;
    const childComponent = {
      play: <Chat/>,
      analyse: <GameDatabase/>
    }
    return (
      <div className={"game " + mode}>
        <div className="chessBoardWrapper">
        {mode === 'play' && <NewGameSidebar handleNewGame={this.handleNewGame}/>}
        <Chessboard
          position={position}
          handleFieldClick={this.handleFieldClick}
        />
        {mode === 'play' && <GameControlSidebar/>}
        </div>
        <Notation gameRecord={gameRecord} />
        {childComponent[mode]}
        </div>
    );
  }
}
