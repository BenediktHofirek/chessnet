import React, { Component } from "react";
import Game from "../common/game/game";
import Header from '../common/header';

export default class PlayPage extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Game />
      </div>
    );
  }
}
