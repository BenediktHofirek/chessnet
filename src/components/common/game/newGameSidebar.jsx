import React, { Component } from 'react';
import c from "../../others/c";

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
        const tempo = event.target.name;
        const oldTimeControl = c([...this.state.timeControl]);
        const newTimeControl = [];
        if(oldTimeControl.includes(tempo)){
            oldTimeControl.forEach(e => {
                if(e !== tempo){
                    newTimeControl.push(e);
                }
            });
        }
        else{
            oldTimeControl.forEach(e => {
                newTimeControl.push(e);
            });
            newTimeControl.push(tempo);
        }
        
        this.setState({timeControl: newTimeControl});
      }

    handlePreferedTimeControlChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }
    

    render() { 
        const {timeControl, preferedTimeControl, timeControlOptions} = this.state;
        const {handleNewGame} = this.props;
        console.log(timeControl);
        return ( 
        <div className="newGameSidebar">
            <button onClick={handleNewGame(timeControl, preferedTimeControl)}>New Game</button>
            <div className="timeControl">
                <button>Manage game tempo</button>
                <div className="timeControlDropdown">
                    <div>Choose time control(s):</div>
                    {timeControlOptions.map((option, index) => {
                    return <div className="form-check" key={index}>
                        <input 
                        name={option} 
                        onChange={this.handleTimeControlChange} 
                        checked={timeControl.includes(option)} 
                        className="form-check-input" 
                        type="checkbox" 
                        id={option}/>
                        <label className="form-check-label" htmlFor={option}>
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