import React, { Component } from "react";
import InputTemplate from './inputTemplate';
import Player from './player';
import "isomorphic-fetch"

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { recentSpeech: '', responseList: [] };
    }

    submitMessage = (e, input, lang) => {
        e.preventDefault();
        if (input === '') return;
        // console.log(input);
        const url = 'https://0dgsxb4p16.execute-api.us-east-1.amazonaws.com/default/aravinth-polly-app';
        let that = this;
        fetch(url,
            {
                method: 'post',
                body: JSON.stringify({ text: input, LanguageCode : lang})
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data.url);
                that.setState({
                    recentSpeech: data.url,
                    responseList: [...that.state.responseList, { url: data.url, data: input }]
                });
               let newAudio =  new Audio(data.url);
               newAudio.play();
            })
            .catch(function (error) {
                that.setState({
                    recentSpeech: ""
                });
                console.log('Request failed', error);
            });
    }
    play = (srcUrl) => {
        let x = document.getElementById("myAudio");
        document.getElementById("myAudio").setAttribute('src', srcUrl);
        setTimeout(x.play(), 500);
    }

    playAudio = () => {
        return this.state.responseList.length > 0 && <Player url={this.state.responseList[this.state.responseList.length - 1].url} play={true}/>
    }

    render() {
        const dispStyle = {
            display: 'none'
        }
        return (
            <div className="container">
                
                    {/* <span style={dispStyle}>
                        {this.playAudio()}
                    </span> */}
                
                <h1>AWS Polly Synthesis Demo</h1>
                {/* <p className="page-description">A tiny app that allows you to take notes by recording your voice</p>
        <p><a className="tz-link" href="htt`ps://tutorialzine.com/2017/08/converting-from-speech-to-text-with-javascript">Read the full article on Tutorialzine »</a></p>
        <h3 className="no-browser-support">Sorry, Your Browser Doesn't Support the Web Speech API. Try Opening This Demo In Google Chrome.</h3> */}
                <div className="app">
                    {/* <h3>Type here</h3> */}
                    <InputTemplate submitMessage={this.submitMessage} />
                    {/* <p id="recording-instructions">Press the <strong>Start Recognition</strong> button and allow access.</p> */}

                    {/* <h3>My Notes</h3>
          <ul id="notes">
            <li>
              <p className="no-notes">You don't have any notes.</p>
            </li>
          </ul> */}
                </div>
                {this.state.responseList.length > 0 && <table>
                    <thead>
                        <tr>
                            <th>Text</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.responseList.map((rl, i) => {
                            return <tr key={i}>
                                <td>{rl.data}</td>
                                <td><a className="tz-link" href={rl.url}>Download</a><br></br><span><Player url={rl.url}play={false}/></span></td>
                            </tr>
                        })}
                    </tbody>
                </table>}
            </div>
        );
    }
}

export default Main;