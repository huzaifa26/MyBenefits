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
      <div className="btn-toolbar btn-group-vertical " role="toolbar" aria-label="Toolbar with button groups">
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
      <div className="btn-group justify-content-between" role="group">
          <PadBotton  value="4" className="btn btn-outline-default " onClick={this.addLetter}/>
          <PadBotton  value="3" className="btn btn-outline-default " onClick={this.addLetter}/>
          <PadBotton  value="2" className="btn btn-outline-default" onClick={this.addLetter}/>
          <PadBotton  value="1" className="btn btn-outline-default"  onClick={this.addLetter}/>
        </div>
        <div className="btn-group justify-content-between" role="group">
          <PadBotton  value="8" className="btn btn-outline-default" onClick={this.addLetter}/>
          <PadBotton  value="7" className="btn btn-outline-default" onClick={this.addLetter}/>
          <PadBotton  value="6" className="btn btn-outline-default" onClick={this.addLetter}/>
          <PadBotton  value="5" className="btn btn-outline-default" onClick={this.addLetter}/>
        </div>
        <div className="btn-group justify-content-between" role="group">
          <PadBotton value="0" className="btn btn-outline-default" onClick={this.addLetter}/>
          <PadBotton  value="9" className="btn btn-outline-defaulty" onClick={this.addLetter}/>
          <PadBotton  value="מחק ספרה" className="btn btn-outline-default"  onClick={this.removeOneLetter} />
          <PadBotton  value="מחק קוד" className="btn btn-outline-default"  onClick={this.clearLetters} />
        </div>
      </div>
    );
  }
}

class PadBotton extends React.Component {
constructor(props) {
  super(props);

  this.state = {
      color: props.color || "btn-light",
      action: props.onClick,
      value: props.value,
  };
}

render() {
  var {color, action, value} = this.state;
  return (
    <div className="button btn-lg col-md">
      <button type="button" className={"btn " + color} onClick={()=> action(value)} value={value}><h1>{value}</h1></button>
    </div>
  )
}
}


export { PadModalComp };
