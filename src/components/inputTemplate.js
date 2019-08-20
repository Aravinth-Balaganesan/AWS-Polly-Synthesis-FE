import React, { Component } from "react";

const vs = [
  {
    name : 'Allison',
    gender : 'F'
  },
  {
    name : 'Ava',
    gender : 'F'
  },
  {
    name : 'Chloe',
    gender : 'F'
  },
  {
    name : 'Ethan',
    gender : 'M'
  },
  {
    name : 'Evan',
    gender : 'M'
  },
  {
    name : 'Evelyn',
    gender : 'F'
  },
  {
    name : 'Nathan',
    gender : 'M'
  },
  {
    name : 'Nolan',
    gender : 'M'
  },
  {
    name : 'Samantha',
    gender : 'F'
  },
  {
    name : 'Susan',
    gender : 'F'
  },

  {
    name : 'Tom',
    gender : 'M'
  },
  {
    name : 'Zoe',
    gender : 'F'
  },
  {
    name : 'Jorge',
    gender : 'M'
  },
  {
    name : 'Marisol',
    gender : 'F'
  },

   {
    name : 'Monica',
    gender : 'F'
  },

  {
    name : 'Carlos',
    gender : 'M'
  },
  {
    name : 'Soledad',
    gender : 'F'
  },
  {
    name : 'Ximena',
    gender : 'F'
  },
  {
    name : 'Angelica',
    gender : 'F'
  },

   {
    name : 'Javier',
    gender : 'M'
  },
   {
    name : 'Juan',
    gender : 'M'
  },
  {
    name : 'Paulina',
    gender : 'F'
  },
  {
    name : 'Tessa',
    gender : 'F'
  },
  {
    name : 'Diego',
    gender : 'M'
  },
  {
    name : 'Sangeeta',
    gender : 'F'
  },
  {
    name : 'Veena',
    gender : 'F'
  },

  // AWS 
  {
    name : 'Salli',
    gender : 'F'
  },
  {
    name : 'Joanna',
    gender : 'F'
  },
  {
    name : 'Ivy',
    gender : 'F'
  },
  {
    name : 'Kendra',
    gender : 'F'
  },
  {
    name : 'Kimberly',
    gender : 'F'
  },
  {
    name : 'Matthew',
    gender : 'M'
  },
  {
    name : 'Justin',
    gender : 'M'
  },
  {
    name : 'Joey',
    gender : 'M'
  },
  {
    name : 'Lucia',
    gender : 'F'
  },
  {
    name : 'Conchita',
    gender : 'F'
  },
  {
    name : 'Enrique',
    gender : 'M'
  },
  {
    name : 'Mia',
    gender : 'F'
  },

  {
    name : 'Penelope',
    gender : 'F'
  },
  {
    name : 'Miguel',
    gender : 'M'
  },
  {
    name : 'Raveena',
    gender : 'F'
  },

  {
    name : 'Aditi',
    gender : 'F'
  }
];


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
]


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
  }]

class InputTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      selectValue: "es-US",
      voice: props.API === 'AWS' ? 'Penelope' : 'Allison',
      voiceList: props.API === 'AWS' ? awsPollyVoices : nauranceAPIVoices,
      voices: props.API === 'AWS' ? ['Penelope', 'Miguel'] : ['Diego']
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.API !== this.props.API) {
      // console.log(newProps.API , '===' , this.props.API)
      let selected = newProps.API === 'AWS' ? ['Penelope', 'Miguel'] : ['Diego'];
      this.setState({ voiceList: newProps.API === 'AWS' ? awsPollyVoices : nauranceAPIVoices, voices: selected, voice: selected[0], selectValue: newProps.API === 'AWS' ? awsPollyVoices[0].lang : nauranceAPIVoices[0].lang });
    }
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.submitMessage(e);
    }
  }

  _handleDropdownChange = (e) => {
    let vic = [];
    vic = this.state.voiceList.filter(s => s.lang === e.target.value)[0].voices;
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
            {this.props.API !== 'AWS' && <option value="es_AR">Spanish Argentinian</option>}
            {/* {this.props.API !== 'AWS' && <option value="es_CL">Spanish Chilean (Not working)</option>} */}
            {this.props.API !== 'AWS' && <option value="es_CO">Spanish Colombian</option>}
            <option value="es-ES">Spanish, Castilian</option>
            <option value="es-MX">Spanish, Mexican</option>
            <option value="en-IN">English, Indian</option>
            <option value="en-US">English, US</option>
          </select>

          <label style={selfAlignn}>
            <span>Select Voice:</span>
          </label>
          <select onChange={this._handleDropdownChange2}>
            {this.state.voices.map((op, kk) => {
              return <option key={kk} value={op}>{op} {vs.filter(v=> v.name === op).length > 0 && " (" + vs.filter(v=> v.name === op)[0].gender + ')'}</option>
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