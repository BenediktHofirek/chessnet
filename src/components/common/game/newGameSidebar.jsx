import React, { Component } from 'react';

class NewGameSidebar extends Component {
    constructor(){
        super();
        this.state = {
            timeControlOptions: ["5:0","3+2","3:0"],
            preferedTimeControlOptions: ["shorter", "longer"],
            timeControl: ["5:0"],
            preferedTimeControl: "shorter",
            showDropdown: false
        }
    }

    handleShowDropdown = () =>{
        this.setState((prevState) => {
            return {
                showDropdown: !prevState.showDropdown
            }
        });
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

      handlePreferedTimeControlChange = (event) => {
        const tempo = event.target.name;
        this.setState({preferedTimeControl: tempo});
      }

      formatTimeControl = (timeControl, preferedTimeControl) => {
        if(preferedTimeControl === 'shorter'){
            
        }
      }
    

    render() { 
        const {showDropdown, 
            timeControl, 
            preferedTimeControl, 
            timeControlOptions, 
            preferedTimeControlOptions} = this.state;
        const {handleNewGame} = this.props;
        console.log(timeControl);
        return ( 
        <div className="newGameSidebar">
            <button onClick={handleNewGame(this.formatTimeControl(timeControl, preferedTimeControl))}>New Game</button>
            <div className="timeControl">
                <button onClick={this.handleShowDropdown}>Manage game tempo</button>
                <div className={showDropdown ? "timeControlDropdown show" : "timeControlDropdown"}>
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
                    <div>You prefer</div>
                    {preferedTimeControlOptions.map((option, index) => {
                    return <div className="form-check" key={index}>
                        <input 
                        name={option} 
                        onChange={this.handlePreferedTimeControlChange} 
                        checked={preferedTimeControl === option} 
                        className="form-check-input" 
                        type="checkbox" 
                        id={option}
                        disabled={timeControl.length > 1 ? false : true}
                        />
                        <label className="form-check-label" htmlFor={option}>
                            {option + " tempo"}
                        </label>
                    </div>
                    })}
                    <div>
                        <button onClick={this.handleShowDropdown}>Ok</button>
                    </div>
                </div>
            </div>
        </div> 
        );
    }
}
 
export default NewGameSidebar;