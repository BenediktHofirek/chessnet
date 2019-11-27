import React, { Component } from 'react';

class NewGameSidebar extends Component {
    constructor(){
        super();
        this.state = {
            timeControlOptions: ["5:0","3+2","3:0"],
            timeControl: ["5:0"],
            preferedTimeControl: "short"
        }
        // this.handleTimeControlChange = this.handleTimeControlChange.bind(this);
        // this.handlePreferedTimeControlChange = this.handlePreferedTimeControlChange.bind(this);
    }

    handleTimeControlChange = (event) => {
        console.log(event.target.name, this);
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
        const {timeControl, preferedTimeControl, timeControlOptions} = this.state;
        const {handleNewGame} = this.props;
        return ( 
        <div className="newGameSidebar">
            <button onClick={handleNewGame(timeControl, preferedTimeControl)}>New Game</button>
            <div className="timeControl">
                <button>Manage game tempo</button>
                <div className="timeControlDropdown">
                    <div>Choose time control(s):</div>
                    {timeControlOptions.map((option, index) => {
                    return <div class="form-check" key={index}>
                        <input name={option} onChange={this.handleTimeControlChange} checked={timeControl.includes(option)} class="form-check-input" type="checkbox" id={option}/>
                        <label class="form-check-label" or={option}>
                            {option[0] + "min" + (option[2] === "0" ? "" : "+" + option[2] + "s")}
                        </label>
                    </div>
                    })}
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