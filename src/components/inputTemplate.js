import React, { Component } from "react";
import  GenderData from './gender';
const vs = GenderData;

const defaultNauranceAPI = ['Allison', 'Ava',
  // 'Carol',
  // 'Chloe', 
  // 'Ethan',
  //  'Evan', 
  //  'Evelyn', 
  //  'Nathan',
  // 'Nolan', 
  'Samantha', 'Susan', 'Tom',
  // 'Zoe'
];

const awsPollyVoices = [{
  lang: 'es-US',
  voices: ['Penelope', 'Miguel']
},
{
  lang: 'es-ES',
  voices: ['Lucia', 'Conchita', 'Enrique']
},
{
  lang: 'es-MX',
  voices: ['Mia']
},
{
  lang: 'en-GB',
  voices: ['Emma', 'Amy', 'Brian']
},
{
  lang: 'en-IN',
  voices: ['Raveena', 'Aditi']
},
{
  lang: 'en-US',
  voices: ['Salli', 'Kimberly', 'Kendra', 'Joanna', 'Ivy', 'Matthew', 'Justin', 'Joey'],
}
];

const nauranceAPIVoices = [
  {
    lang: 'es_AR',
    voices: ['Diego']
  },
  {
    lang: 'es_CL',
    voices: ['Francisca']
  },
  {
    lang: 'es_CO',
    voices: ['Carlos', 'Soledad'] // Ximena
  },
  {
    lang: 'es-ES',
    voices: [
      'Jorge',
      //'Marisol',
      'Monica'
    ]
  },
  {
    lang: 'es-MX',
    voices: [
      'Angelica',
      'Javier',
      'Juan',
      'Paulina'
    ]
  },
  {
    lang: 'en-IN',
    voices: [
      //'Rishi',
      'Sangeeta',
      'Veena'
    ]
  },
  {
    lang: 'en-US',
    voices: defaultNauranceAPI,
  }];

const gcloudVoices = [
  {
    lang: 'es-ES',
    voices: [
      'es-ES-Standard-A'
    ]
  },
  {
    lang: 'en-US',
    voices: [
      'en-US-Standard-B',
      'en-US-Standard-C',
      'en-US-Standard-D',
      'en-US-Standard-E'
    ]
  }
];

class InputTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      selectValue: "es-US",
      voice: props.API === 'AWS' ? 'Penelope' : (props.API === 'nuanceAPI' ? 'Diego' : 'es-ES-Standard-A'),
      voiceList: props.API === 'AWS' ? awsPollyVoices : (props.API === 'nuanceAPI' ? nauranceAPIVoices : gcloudVoices),
      voices: props.API === 'AWS' ? ['Penelope', 'Miguel'] : (props.API === 'nuanceAPI' ? ['Diego'] : ['es-ES-Standard-A'])
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.API !== this.props.API) {
      let selected = newProps.API === 'AWS' ? ['Penelope', 'Miguel'] : (newProps.API === 'nuanceAPI' ? ['Diego'] : ['es-ES-Standard-A']);
      this.setState({ voiceList: newProps.API === 'AWS' ? awsPollyVoices : (newProps.API === 'nuanceAPI' ? nauranceAPIVoices : gcloudVoices), voices: selected, voice: selected[0], selectValue: newProps.API === 'AWS' ? awsPollyVoices[0].lang : (newProps.API === 'nuanceAPI' ? nauranceAPIVoices[0].lang : gcloudVoices[0].lang) });
    }
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.submitMessage(e);
    }
  }

  _handleDropdownChange = (e) => {
    let vic = [];
    // console.log(e.target.value);
    let filteredData = this.state.voiceList.filter(s => s.lang === e.target.value);
    if (filteredData.length > 0)
      vic = filteredData[0].voices;
    this.setState({ selectValue: e.target.value, voices: vic, voice: vic[0] });
  }

  _handleDropdownChange2 = (e) => {
    this.setState({ voice: e.target.value });
  }

  submitMessage = (e) => {
    e.preventDefault();
    this.props.submitMessage(e, this.state.input, this.state.selectValue, this.state.voice);
    // this.setState({ input: '' });
  }

  onChange = (e) => {
    e.preventDefault();
    const input = e.target.value;
    this.setState({ input });
  }

  reset = () => {
    this.setState({ input: '' });
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
          <select onChange={this._handleDropdownChange} value={this.state.selectValue}>
            {this.props.API === 'AWS' && <option value="es-US">Spanish, US</option>}
            {this.props.API === 'nuanceAPI' && <option value="es_AR">Spanish Argentinian</option>}
            {this.props.API === 'nuanceAPI' && <option value="es_CO">Spanish Colombian</option>}
            {(this.props.API === 'nuanceAPI' || this.props.API === 'AWS') &&
              <React.Fragment> <option value="es-ES">Spanish, Castilian</option><option value="es-MX">Spanish, Mexican</option><option value="en-IN">English, Indian</option><option value="en-US">English, US</option> </React.Fragment>}
            {this.props.API === 'gcloudAPI' &&
              <React.Fragment>
                <option value="es-ES">Spanish (Spain)</option>
                <option value="en-US">English (US)</option>
              </React.Fragment>}
          </select>

          <label style={selfAlignn}>
            <span>Select Voice:</span>
          </label>
          <select onChange={this._handleDropdownChange2} value={this.state.voice}>
            {this.state.voices.map((op, kk) => {
              return <option key={kk} value={op}>{op} {vs.filter(v => v.name === op).length > 0 && " (" + vs.filter(v => v.name === op)[0].gender + ')'}</option>
            })}
          </select>
          <button className="buttons" type="submit">Submit</button>
          <button className="buttons-reset" type="button" onClick={this.reset}>Reset</button>
        </div>
      </form>
    );
  }
}

export default InputTemplate;