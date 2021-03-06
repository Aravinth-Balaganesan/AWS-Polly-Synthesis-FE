import React, { Component } from "react";
import InputTemplate from './inputTemplate';
import Player from './player';
import "isomorphic-fetch";
import GenderData from './gender';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { recentSpeech: '', responseList: [], translatedResult: '', API: 'nuanceAPI', loading: false };
    }

    submitMessage = (e, input, lang, voice) => {
        e.preventDefault();
        if (input === '') return;
        this.setState({
            loading: true
        });
        // console.log(input);
        let that = this;
        let payload = { text: input, LanguageCode: lang, voice: voice };

        if (this.state.API === 'nuanceAPI')
            payload['type'] = 'nuanceAPI';

        if (this.state.API === 'gcloudAPI')
            payload['type'] = 'gcloudAPI';

        let data = JSON.stringify(payload);

        let xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let _temp = JSON.parse(this.responseText);
                // let newAudio = new Audio(_temp.url);
                // newAudio.play();
                let _api = that.state.API === 'AWS' ? 'AWS Polly' : (that.state.API === 'nuanceAPI' ? 'Nuance' : 'Google');
                that.setState({
                    loading: false,
                    recentSpeech: _temp.url,
                    responseList: [...that.state.responseList, { url: _temp.url, data: input, API: _api, lang: lang, voice: voice }]
                });
                var audios = document.getElementsByTagName('audio');
                for (var i = 0, len = audios.length; i < len; i++) {
                    audios[i].pause();
                    if (audios.length - 1 === i)
                        audios[i].play();
                }
            } 
        });

        xhr.onerror = function () {
            console.log("** An error occurred during the transaction");
            that.setState({
                loading: false
            });
        };

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

    /*submitMessage2 = (e, input, src, dest) => {
        e.preventDefault();
        if (input === '') return;
        // let that = this;
        // let data = JSON.stringify({ text: input, SourceLanguageCode: src, TargetLanguageCode: dest });

        fetch('https://19ru18sf56.execute-api.us-east-1.amazonaws.com/api/translateApp',
            {
                method: 'post',
                mode: 'no-cors',
                // headers:{
                //     'Access-Control-Allow-Origin':'*',
                //     'Content-Type': 'text/plain'
                //     },
                body: (JSON.stringify({ text: input, SourceLanguageCode: src, TargetLanguageCode: dest })), //{ data : { text: input, SourceLanguageCode: src, TargetLanguageCode: dest }} ,
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
    }*/


    _handleAPIChenage = (e) => {
        this.setState({
            API: e.target.value
        });
    }

    play = (srcUrl) => {
        let x = document.getElementById("myAudio");
        document.getElementById("myAudio").setAttribute('src', srcUrl);
        setTimeout(x.play(), 500);
    }

    playAudio = () => {
        return this.state.responseList.length > 0 && <Player url={this.state.responseList[this.state.responseList.length - 1].url} play={true} />
    }

    check = (aud) => {
        // console.log(aud);
        var audios = document.getElementsByTagName('audio');
        for (var i = 0, len = audios.length; i < len; i++) {
            if (aud !== i)
                audios[i].pause();
        }
    }
    render() {
        const paddingStyle = {
            margin: '20px'
        };
        const hstyle = {
            height: '40px'
        }
        return (
            <div>
                {this.state.loading && <div className="loader"></div>}
                <div className="container">
                    <h1> {this.state.API === 'AWS' ? `AWS Polly Synthesis Demo` : (this.state.API === 'nuanceAPI' ? `Nuance API Synthesis Demo` : 'Google API Synthesis Demo')}</h1>
                    <div className="app">
                        <div style={paddingStyle}>
                            <label style={{ paddingRight: '50px' }}>
                                <span>Select API:   </span>
                            </label>
                            <select style={hstyle} onChange={this._handleAPIChenage} value={this.state.API}>
                                <option value="AWS">AWS Polly</option>
                                <option value="nuanceAPI">Nuance</option>
                                <option value="gcloudAPI">Google</option>
                            </select>
                        </div>
                        <InputTemplate API={this.state.API} submitMessage={this.submitMessage} />
                    </div>
                </div>
                {this.state.responseList.length > 0 && <div className="container2"><table>
                    <thead>
                        <tr>
                            <th>API</th>
                            <th>Language</th>
                            <th>Voice</th>
                            <th >Text</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.responseList.map((rl, i) => {
                            return <tr key={i}>
                                <td>{rl.API}</td>
                                <td>{rl.lang}</td>
                                <td>{rl.voice} {GenderData.filter(v => v.name === rl.voice).length > 0 && " (" + GenderData.filter(v => v.name === rl.voice)[0].gender + ')'} </td>
                                <td width="60%">{rl.data}</td>
                                <td>
                                    {/* <a className="tz-link" href={rl.url}>Download</a> */}
                                    {/* <br>
                                    </br> */}
                                    <span>
                                        {/* <Player loading={this.state.loading} url={rl.url} play={false} /> */}

                                        <audio controls controlsList="nodownload" onPlay={e => this.check(i)}>
                                            <source src={rl.url} />
                                        </audio>
                                    </span></td>
                            </tr>
                        })}
                    </tbody>
                </table></div>}
            </div>
        );
    }
}

export default Main;