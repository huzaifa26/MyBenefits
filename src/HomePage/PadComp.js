import React from 'react';

class PadComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            onClick: props.onClick,
            onClear: props.onClear,
            onBackspace: props.onBackspace,
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick(value) {
      this.state.onClick(value);
    }

    render() {
        return (
          <div class="btn-toolbar btn-group-vertical " role="toolbar" aria-label="Toolbar with button groups">
          <div className="btn-group justify-content-between" role="group">
              <PadBotton  value="4" class="btn btn-outline-default " onClick={this.onClick}/>
              <PadBotton  value="3" class="btn btn-outline-default " onClick={this.onClick}/>
              <PadBotton  value="2" class="btn btn-outline-default" onClick={this.onClick}/>
              <PadBotton  value="1" class="btn btn-outline-default"  onClick={this.onClick}/>
            </div>
            <div className="btn-group justify-content-between" role="group">
              <PadBotton  value="8" class="btn btn-outline-default" onClick={this.onClick}/>
              <PadBotton  value="7" class="btn btn-outline-default" onClick={this.onClick}/>
              <PadBotton  value="6" class="btn btn-outline-default" onClick={this.onClick}/>
              <PadBotton  value="5" class="btn btn-outline-default" onClick={this.onClick}/>
            </div>
            <div className="btn-group justify-content-between" role="group">
              <PadBotton value="0" class="btn btn-outline-default" onClick={this.onClick}/>
              <PadBotton  value="9" class="btn btn-outline-defaulty" onClick={this.onClick}/>
              <PadBotton  value="מחק ספרה" class="btn btn-outline-default"  onClick={this.state.onBackspace} />
              <PadBotton  value="מחק קוד" class="btn btn-outline-default"  onClick={this.state.onClear} />
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

export { PadComp };
