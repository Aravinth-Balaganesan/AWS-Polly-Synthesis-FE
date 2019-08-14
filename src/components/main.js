import React, { Component } from "react";
import InputTemplate from './inputTemplate';
import Player from './player';
import "isomorphic-fetch";
import Translate from "./translate";
// const axios = require('axios');

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { recentSpeech: '', responseList: [], translatedResult: '' };
    }

    submitMessage = (e, input, lang, voice) => {
        e.preventDefault();
        if (input === '') return;
        // console.log(input);
        const url = 'https://0dgsxb4p16.execute-api.us-east-1.amazonaws.com/default/aravinth-polly-app';
        let that = this;

        let data = JSON.stringify({ text: input, LanguageCode: lang, voice : voice});

        let xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                // console.log(this.responseText);
                let _temp = JSON.parse(this.responseText);
                let newAudio = new Audio(_temp.url);
                newAudio.play();
                that.setState({
                    recentSpeech: _temp.url,
                    responseList: [...that.state.responseList, { url: _temp.url, data: input }]
                });

            }
        });

        xhr.open("POST", "https://0dgsxb4p16.execute-api.us-east-1.amazonaws.com/default/aravinth-polly-app");
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

        xhr.send(data);

        // axios(
        //     { url : url,
        //         method: 'post',
        //         body: JSON.stringify({ text: input, LanguageCode : lang})
        //     })
        //     .then(function (response) {
        //         return response.json();
        //     })
        //     .then(function (data) {
        //         console.log(data.url);
        //         that.setState({
        //             recentSpeech: data.url,
        //             responseList: [...that.state.responseList, { url: data.url, data: input }]
        //         });
        //        let newAudio =  new Audio(data.url);
        //        newAudio.play();
        //     })
        //     .catch(function (error) {
        //         that.setState({
        //             recentSpeech: ""
        //         });
        //         console.log('Request failed', error);
        //     });
    }


    submitMessage2 = (e, input, src, dest) => {
        e.preventDefault();
        if (input === '') return;
        // console.log(input);
        let that = this;

        let data = JSON.stringify({ text: input, SourceLanguageCode: src, TargetLanguageCode: dest });

        // var data = "text=sample32323&email=a2g.com&token=12&SourceLanguageCode=en&TargetLanguageCode=es";


        // let xhr = new XMLHttpRequest();
        // xhr.withCredentials = false;

        // xhr.addEventListener("readystatechange", function () {
        //     if (this.readyState === 4) {
        //         console.log(this.responseText);
        //         //  let _temp = JSON.parse(this.responseText);
        //         // that.setState({
        //         //     translatedResult : _temp.status.TranslatedText
        //         // });

        //     }
        // });

        // xhr.open("POST", "https://19ru18sf56.execute-api.us-east-1.amazonaws.com/api/translateApp");
        // xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

        // xhr.send(data);


  fetch('https://19ru18sf56.execute-api.us-east-1.amazonaws.com/api/translateApp',
            {  
                method: 'post',
             
                mode: 'no-cors',
                // headers:{
                //     'Access-Control-Allow-Origin':'*',
                //     'Content-Type': 'text/plain'
                //     },
                body:  (JSON.stringify({ text: input, SourceLanguageCode: src, TargetLanguageCode: dest })), //{ data : { text: input, SourceLanguageCode: src, TargetLanguageCode: dest }} ,
            })
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                
            })
            .catch(function (error) {
      
                console.log('Request failed', error);
            });

        // var data = "text=sample32323&email=a2g.com&token=12&SourceLanguageCode=en&TargetLanguageCode=es";

        // var xhr2 = new XMLHttpRequest();
        // // xhr2.withCredentials = false;

        // xhr2.addEventListener("readystatechange", function () {
        //     if (this.readyState === 4) {
        //         console.log(this.responseText);
        //     }
        // });

        // xhr2.open("POST", "https://5ff6i38jik.execute-api.us-east-1.amazonaws.com/api/translateApp");
        // xhr2.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        // xhr2.send(data);

    }
    
    play = (srcUrl) => {
        let x = document.getElementById("myAudio");
        document.getElementById("myAudio").setAttribute('src', srcUrl);
        setTimeout(x.play(), 500);
    }

    playAudio = () => {
        return this.state.responseList.length > 0 && <Player url={this.state.responseList[this.state.responseList.length - 1].url} play={true} />
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
                                <td><a className="tz-link" href={rl.url}>Download</a><br></br><span><Player url={rl.url} play={false} /></span></td>
                            </tr>
                        })}
                    </tbody>
                </table>}

                {/* <h1>AWS Translate Demo</h1>
                <div className="app">
                    <Translate submitMessage2={this.submitMessage2} />

                    {this.state.translatedResult !== '' && <div>{this.state.translatedResult}</div>}
                </div> */}
            </div>
        );
    }
}

export default Main;