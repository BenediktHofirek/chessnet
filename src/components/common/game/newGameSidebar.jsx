import React, { Component } from 'react';

class NewGameSidebar extends Component {
    state = {  }
    render() { 
        const {timeControl, preferedTempo} = this.state;
        const {handleNewGame} = this.props;
        return ( <div className="newGameSidebar">
            <button onClick={handleNewGame(timeControl, preferedTempo)}>New Game</button>
            <form>
            <label>
            Select tempo:
            <select multiple={true} value={timeControl} onChange={this.handleTimeControlChange}>
                <option value="grapefruit">Grapefruit</option>
                <option value="lime">Lime</option>
                <option value="coconut">Coconut</option>
                <option value="mango">Mango</option>
            </select>
            </label>
            </form>
        </div> );
    }
}
 
export default NewGameSidebar;