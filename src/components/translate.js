import React, { Component } from "react";

class Translate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      src: "en",
      dest: 'es'
    }
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.submitMessage(e);
    }
  }

  _handleDropdownChange = (e) => {
    this.setState({ src: e.target.value });
  }

  _handleDropdownChange2 = (e) => {
    this.setState({ dest: e.target.value });
  }

  submitMessage = (e) => {
    e.preventDefault();
    this.props.submitMessage2(e, this.state.input, this.state.src, this.state.dest);
    this.setState({
      input: '', 
      src: "en",
      dest: 'es'
    });
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
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
          <select onChange={this._handleDropdownChange2}>
            <option value="es">Spanish</option>
            <option value="en">English</option>
          </select>
          <button className="buttons" onClick={e => this.submitMessage(e)} type="button">Speak</button>
        </div>
      </form >
    );
  }
}

export default Translate;