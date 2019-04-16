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

    onClick(e) {
      const { value } = e.target;
      this.state.onClick(value);
    }

    render() {
        return (
          <div className="button-group-vertical" role="group" >
            <div className="btn-group">
              <PadBotton   value="3" class="btn" onClick={this.onClick}/>
              <PadBotton   value="2" class="btn" onClick={this.onClick}/>
              <PadBotton   value="1" class="btn"  onClick={this.onClick}/>
            </div>
            <div className="btn-group">
              <PadBotton  value="6" class="btn" onClick={this.onClick}/>
              <PadBotton  value="5" class="btn" onClick={this.onClick}/>
              <PadBotton  value="4" class="btn" onClick={this.onClick}/>
            </div>
            <div className="btn-group ">
              <PadBotton  value="9" class="btn" onClick={this.onClick}/>
              <PadBotton  value="8" class="btn" onClick={this.onClick}/>
              <PadBotton  value="7" class="btn" onClick={this.onClick}/>
            </div>
            <div className="btn-group">
              <PadBotton value="0" class="btn" onClick={this.onClick}/>
            </div>
            <div className="btn-group ustify-content-between">
              <PadBotton  type="button" value="מחק" class="btn btn-secondary"  onClick={this.state.onBackspace} />
              <PadBotton  type="button" value="מחק הכל"  class="btn btn-secondary" onClick={this.state.onClear} />
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
          <button type="button" className={"btn " + color} onClick={action} value={value}>{value}</button>
        </div>
      )
    }
}

export { PadComp };
