import React from 'react';
import { PadComp } from './index';

import { userService } from '../_services';

const ScannerActivationCode = "~&</>";
class PadModalComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      updateParentCodeFunc: props.updateCodeFunc,
        code:"",
    };

    this.addLetter = this.addLetter.bind(this);
    this.removeOneLetter = this.removeOneLetter.bind(this);
    this.clearLetters = this.clearLetters.bind(this);
}

addLetter(value) {
  var newcode = this.state.code + value;
  this.setState({ code: newcode });
  this.state.updateParentCodeFunc(newcode);
}
removeOneLetter(){
  var newcode = this.state.code.slice(0, -1);
  this.setState({ code: newcode });
  this.state.updateParentCodeFunc(newcode);
}
clearLetters(){
  var newcode = "";
  this.setState({ code: newcode });
  this.state.updateParentCodeFunc(newcode);
}

render() {
    return (
      <div className="btn-group-vertical mt-4 d-flex justify-content-center" role="group" aria-label="Toolbar with button groups">
        <div className="input-group">

<input
  id="insertCode"
  className="code form-control input-lg"
  name="code"
  value={this.state.code}
  // onChange={this.handleChange}
  // disabled={!buttons.check}
  type="number"
  placeholder ="הקלד קוד"
   onKeyDown={this._handleKeyDown}
/>

</div>
              <div className="btn-group">   
                <PadBotton  value="3" onClick={this.addLetter}/>
                <PadBotton  value="2" onClick={this.addLetter}/>
                <PadBotton  value="1" onClick={this.addLetter}/>
              </div>
              <div className="btn-group" role="group">
                <PadBotton  value="6" onClick={this.addLetter}/>
                <PadBotton  value="5" onClick={this.addLetter}/>
                <PadBotton  value="4" onClick={this.addLetter}/>
              </div>
              <div className="btn-group" role="group">
                <PadBotton  value="9" onClick={this.addLetter}/>
                <PadBotton  value="8" onClick={this.addLetter}/>
                <PadBotton  value="7" onClick={this.addLetter}/>
              </div>
              <div className="btn-group" role="group">
                <PadBotton value="0"  onClick={this.addLetter}/>
                <PadBotton icon="del" onClick={this.state.clearLetters} />
                <PadBotton color="btn-danger" icon="clear" onClick={this.state.removeOneLetter} />
              </div>
      </div>
    );
  }
}

class PadBotton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        color: props.color || "",
        action: props.onClick,
        value: props.value,
        icon:props.icon ,
    };
  }

  render() {
    var {color, action, value,icon} = this.state;
    return (
      
        <button
            type="button"
            className={"btn btn-outline-dark padButton " + color} 
            onClick={()=> action(value)} 
            value={value}
          >
            { !icon && value}
            { icon==="del" && 
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-backspace iconButton" viewBox="0 0 16 16">
              <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
              <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z"/>
            </svg>
            }
            { icon==="clear" && 
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-x-circle iconButton" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
            }
        
        </button>
    )
  }
}


export { PadModalComp };
