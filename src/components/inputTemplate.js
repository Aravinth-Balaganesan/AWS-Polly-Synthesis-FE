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

  submitMessage = (e) => {
    e.preventDefault();
    this.props.submitMessage(e, this.state.input);
    this.setState({ input: '' });
  }

  onChange = (e) => {
    e.preventDefault();
    const input = e.target.value;
    this.setState({ input });
  }

  render() {
    return (
      <form onSubmit={e => this.submitMessage(e)}>
        <div className="input-single">
          <textarea rows="6"
            onKeyPress={this._handleKeyPress}
            onChange={this.onChange}
            value={this.state.input}
            placeholder="Enter text here...">
          </textarea>
        </div>
        <br></br>
        <button className="buttons" type="submit">Speak</button>
      </form>
    );
  }
}

export default InputTemplate;