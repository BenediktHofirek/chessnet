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

    handlePreferedTimeControlChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
    }
    

    render() { 
        const {timeControl, preferedTimeControl} = this.state;
        const {handleNewGame} = this.props;
        return ( 
        <div className="newGameSidebar">
            <button onClick={handleNewGame(timeControl, preferedTimeControl)}>New Game</button>
            <div className="timeControl">
                <button>Manage Time Controls</button>
                <div className="timeControlDropdown">
                    <div>Choose Time control(s):</div>
                    <div class="form-check">
                        <input value="" class="form-check-input" type="checkbox" id="checkbox1"/>
                        <label class="form-check-label" for="checkbox1">
                            5min
                        </label>
                    </div>
                    <div class="form-check">
                        <input value="" class="form-check-input" type="checkbox" id="checkbox2"/>
                        <label class="form-check-label" for="checkbox2">
                            3min+2s
                        </label>
                    </div>
                    <div class="form-check">
                        <input value="" class="form-check-input" type="checkbox" id="checkbox3"/>
                        <label class="form-check-label" for="checkbox3">
                            3min
                        </label>
                    </div>
                    <div>
                        <button>Ok</button>
                    </div>
                </div>
            </div>
        </div> 
        );
    }
}
 
export default NewGameSidebar;