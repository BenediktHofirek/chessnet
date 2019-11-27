import React, { Component } from 'react';

class NewGameSidebar extends Component {
    constructor(){
        super();
        this.state = {
            timeControl: ["5:0"],
            preferedTimeControl: "short"
        }
        // this.handleTimeControlChange = this.handleTimeControlChange.bind(this);
        // this.handlePreferedTimeControlChange = this.handlePreferedTimeControlChange.bind(this);
    }

    handleTimeControlChange = (event) => {
        console.log(event.target.name, event.target.value, this);
        // const name = event.target.name;
        // const value = ev ent.target.value;
        // this.setState({ [name]: value });
      }

    handleTimeControlChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
    }
    

    render() { 
        const {timeControl, preferedTimeControl} = this.state;
        const {handleNewGame} = this.props;
        return ( <div className="newGameSidebar">
            <button onClick={handleNewGame(timeControl, preferedTimeControl)}>New Game</button>
            <div className="timeControl">
                <button>Manage Time Controls</button>
                <div className="timeControlDropdown">
                    <form>
                        <label>
                        Choose Time control(s):
                        </label>
                            <option value="5:0">5</option>
                            <option value="3:2">3+2</option>
                            <option value="3:0">3</option>
                            <option value="1:0">1</option>
                        <label>
                        You prefer:
                        </label>
                        <select value={preferedTimeControl} onChange={this.handlePreferedTimeControlChange}>
                            <option value="short">Shorter time control</option>
                            <option value="long">Longer time control</option>
                        </select>
                    </form>
                    <button>Ok</button>
                </div>
            </div>
        </div> );
    }
}
 
export default NewGameSidebar;