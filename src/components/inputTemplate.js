import React, { Component } from "react";

class InputTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      selectValue: "es-ES"
    }
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.submitMessage(e);
    }
  }

  _handleDropdownChange = (e) => {
    this.setState({ selectValue: e.target.value });
  }

  submitMessage = (e) => {
    e.preventDefault();
    this.props.submitMessage(e, this.state.input, this.state.selectValue);
    this.setState({ input: '', selectValue: "es-ES" });
  }

  onChange = (e) => {
    e.preventDefault();
    const input = e.target.value;
    this.setState({ input });
  }

  render() {
    const sty = {
      display: 'flex',
      justifyContent: 'space-between'
    }
    return (
      <form>
        <div className="input-single">
          <textarea rows="6"
            onKeyPress={this._handleKeyPress}
            onChange={this.onChange}
            value={this.state.input}
            placeholder="Enter text here...">
          </textarea>
        </div>

        <br></br>
        <div style={sty}>
          {/* <button className="buttons" onClick={e => this.submitMessage(e, 'es-ES')} type="button">Speak - Spanish, Mexican</button>
        <button className="buttons" onClick={e => this.submitMessage(e, 'es-MX')} type="button">Speak - Spanish, Castilian</button> */}
          <select onChange={this._handleDropdownChange}>
            <option value="es-ES">Spanish, Castilian</option>
            <option value="es-MX">Spanish, Mexican</option>
            <option value="en-GB">English, British</option>
            <option value="en-IN">English, Indian</option>
            <option value="fr-CA">French, Canadian</option>
            <option value="de-DE">German</option>
            <option value="hi-IN">Hindi</option>
          </select>
          <button className="buttons" onClick={e => this.submitMessage(e)} type="button">Submit</button>
        </div>
      </form >
    );
  }
}

export default InputTemplate;