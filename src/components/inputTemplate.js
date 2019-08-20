import React, { Component } from "react";

const defaultNauranceAPI = ['Allison', 'Ava', 'Carol', 'Chloe', 'Ethan', 'Evan', 'Evelyn', 'Nathan', 'Nolan', 'Samantha', 'Susan', 'Tom', 'Zoe'];

class InputTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      selectValue: "es-US",
      voice: props.API === 'AWS' ? 'Penelope' : 'Allison',
      voiceList: [{
        lang: 'es-US',
        voices: ['Penelope', 'Miguel'],
        nuranceVoices: defaultNauranceAPI
      },
      {
        lang: 'es-ES',
        voices: ['Lucia', 'Conchita', 'Enrique'],
        nuranceVoices: [
          'Jorge',
          'Marisol',
          'Monica'
        ]
      },
      {
        lang: 'es-MX',
        voices: ['Mia'],
        nuranceVoices: [
          'Angelica',
          'Javier',
          'Juan',
          'Paulina'
        ]
      },
      // {
      //   lang: 'en-GB',
      //   voices: ['Emma', 'Amy', 'Brian']
      // },
      {
        lang: 'en-IN',
        voices: ['Raveena', 'Aditi'],
        nuranceVoices: ['Rishi',
          'Sangeeta',
          'Veena'
        ]
      },
      {
        lang: 'en-US',
        voices: ['Salli', 'Kimberly', 'Kendra', 'Joanna', 'Ivy', 'Matthew', 'Justin', 'Joey'],
        nuranceVoices: defaultNauranceAPI
      }
      ],
      voices: props.API === 'AWS' ? ['Penelope', 'Miguel'] : defaultNauranceAPI
    }
  }

  componentWillReceiveProps(props) {
    let selected = props.API === 'AWS' ? ['Penelope', 'Miguel'] : defaultNauranceAPI;
    this.setState({ voices: selected, voice: selected[0] });
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.submitMessage(e);
    }
  }

  _handleDropdownChange = (e) => {
    let vic = [];
    if (this.props.API === 'AWS')
      vic = this.state.voiceList.filter(s => s.lang === e.target.value)[0].voices;
    else
      vic = this.state.voiceList.filter(s => s.lang === e.target.value)[0].nuranceVoices;
    this.setState({ selectValue: e.target.value, voices: vic, voice: vic[0] });
  }

  _handleDropdownChange2 = (e) => {
    this.setState({ voice: e.target.value });
  }

  submitMessage = (e) => {
    e.preventDefault();
    this.props.submitMessage(e, this.state.input, this.state.selectValue, this.state.voice);
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
    };
    const selfAlignn = {
      alignSelf: 'center'
    };

    return (
      <form onSubmit={e => this.submitMessage(e)} >
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
          <label style={selfAlignn}>
            <span>Select Language:</span>
          </label>
          <select onChange={this._handleDropdownChange}>
            <option value="es-US">Spanish, US</option>
            <option value="es-ES">Spanish, Castilian</option>
            <option value="es-MX">Spanish, Mexican</option>
            {/* <option value="en-GB">English, British</option> */}
            <option value="en-IN">English, Indian</option>
            <option value="en-US">English, US</option>
          </select>

          <label style={selfAlignn}>
            <span>Select Voice:</span>
          </label>
          <select onChange={this._handleDropdownChange2}>
            {this.state.voices.map((op, kk) => {
              return <option key={kk} value={op}>{op}</option>
            })}
          </select>
          <button className="buttons" type="submit">Submit</button>
        </div>
      </form>
    );
  }
}

export default InputTemplate;