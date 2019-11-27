import React, { Component } from 'react';

class NewGameSidebar extends Component {
    constructor(){
        super();
        this.state = {
            timeControlOptions: ["5:0","3+2","3:0"],
            preferedTimeControlOptions: ["short", "long"],
            timeControl: ["5:0"],
            preferedTimeControl: ["short"]
        }
    }

    handleTimeControlChange = (event) => {
        const tempo = event.target.name;
        const oldTimeControl = [...this.state.timeControl];
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

      handleTimeControlChange = (event) => {
        const tempo = event.target.name;
        const oldPreferedTimeControl = [...this.state.preferedTimeControl];
        const newPreferedTimeControl = [];
        if(oldPreferedTimeControl.includes(tempo)){
            oldPreferedTimeControl.forEach(e => {
                if(e !== tempo){
                    newPreferedTimeControl.push(e);
                }
            });
        }
        else{
            oldPreferedTimeControl.forEach(e => {
                newPreferedTimeControl.push(e);
            });
            newPreferedTimeControl.push(tempo);
        }
        
        this.setState({preferedTimeControl: newPreferedTimeControl});
      }
    

    render() { 
        const {timeControl, preferedTimeControl, timeControlOptions, preferedTimeControlOptions} = this.state;
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
                    {timeControl.length > 2 && 
                    <React.Fragment>
                    <div>Prefered game tempo</div>
                        {preferedTimeControlOptions.map((option, index) => {
                        return <div className="form-check" key={index}>
                            <input 
                            name={option} 
                            onChange={this.handleTimeControlChange} 
                            checked={preferedTimeControl.includes(option)} 
                            className="form-check-input" 
                            type="checkbox" 
                            id={option}/>
                            <label className="form-check-label" htmlFor={option}>
                                {option}
                            </label>
                        </div>
                        })}
                    </React.Fragment>
                    }
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