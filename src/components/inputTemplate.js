import React, { Component } from "react";

class InputTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.submitMessage(e);
    }
  }

  submitMessage = (e, lang) => {
    e.preventDefault();
    this.props.submitMessage(e, this.state.input, lang);
    this.setState({ input: '' });
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
        <button className="buttons" onClick={e => this.submitMessage(e, 'es-ES')} type="button">Speak - Spanish, Mexican</button>
        <button className="buttons" onClick={e => this.submitMessage(e, 'es-MX')} type="button">Speak - Spanish, Castilian</button>
        </div>
      </form >
    );
  }
}

export default InputTemplate;