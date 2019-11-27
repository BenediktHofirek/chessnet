import React, { Component } from "react";
import Game from "../../common/game/game";
import Chat from '../../common/chat';

class PlayTab extends Component {
  state = {};
  render() {
    return <div className="game">
      <Game />
      <Chat />
      </div>;
  }
}

export default PlayTab;
