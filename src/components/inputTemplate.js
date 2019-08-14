import React, { Component } from "react";

class InputTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      selectValue: "es-US",
      voice: 'Joanna'
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

  _handleDropdownChange2 = (e) => {
    this.setState({ voice: e.target.value });
  }

  submitMessage = (e) => {
    e.preventDefault();
    this.props.submitMessage(e, this.state.input, this.state.selectValue, this.state.voice);
    this.setState({ input: '', selectValue: "es-ES", voice: 'Joanna' });
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
    const selfAlignn = {
      alignSelf: 'center'
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
          <label style={selfAlignn}>
            <span>Select Language:</span>
          </label>
          <select onChange={this._handleDropdownChange}>
            <option value="es-US">Spanish, US</option>
            <option value="es-ES">Spanish, Castilian</option>
            <option value="es-MX">Spanish, Mexican</option>
            <option value="en-GB">English, British</option>
            <option value="en-IN">English, Indian</option>
            <option value="fr-CA">French, Canadian</option>
            <option value="de-DE">German</option>
            <option value="hi-IN">Hindi</option>
          </select>

          <label style={selfAlignn}>
            <span>Select Voice:</span>
          </label>
          <select onChange={this._handleDropdownChange2}>
            <option value="Joanna">Joanna</option>
            <option value="Aditi">Aditi</option>
            <option value="Amy">Amy</option>
            <option value="Astrid">Astrid</option>
            <option value="Bianca">Bianca</option>
            <option value="Brian">Brian</option>
            <option value="Carla">Carla</option>
            <option value="Carmen">Carmen</option>


            <option value="Celine">Celine</option>
            <option value="Chantal">Chantal</option>
            <option value="Conchita">Conchita</option>

            <option value="Cristiano">Cristiano</option>
            <option value="Dora">Dora</option>
            <option value="Emma">Emma</option>
            <option value="Enrique">Enrique</option>

            <option value="Ewa">Ewa</option>
            <option value="Filiz">Filiz</option>
            <option value="Geraint">Geraint</option>
            <option value="Gwyneth">Gwyneth</option>
            <option value="Ines">Ines</option>
            <option value="Hans">Hans</option>


            <option value="Ivy">Ivy</option>
            <option value="Jacek">Jacek</option>
            <option value="Jan">Jan</option>

            <option value="Joey">Joey</option>
            <option value="Justin">Justin</option>

            <option value="Karl">Karl</option>
            <option value="Kendra">Kendra</option>



            <option value="Lea">Lea</option>
            <option value="Liv">Liv</option>
            <option value="Lotte">Lotte</option>
            <option value="Mads">Mads</option>
            <option value="Maja">Maja</option>

            <option value="Marlene">Marlene</option>
            <option value="Mathieu">Mathieu</option>
            <option value="Matthew">Matthew</option>
            <option value="Nicole">Nicole</option>

            <option value="Seoyeon">Seoyeon</option>
            <option value="Salli">Salli</option>
            <option value="Vitoria">Vitoria</option>
            <option value="Vicki">Vicki</option>


            <option value="ZhiyuAditi">ZhiyuAditi</option>





          </select>

          <button className="buttons" onClick={e => this.submitMessage(e)} type="button">Submit</button>
        </div>
      </form >
    );
  }
}

export default InputTemplate;