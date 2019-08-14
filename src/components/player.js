import React, { useState, useEffect } from "react";

const useAudio = (url, play) => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(play);

    const toggle = () => setPlaying(!playing);

    useEffect(
        () => {
            playing ? audio.play() : audio.pause();
        },
        [playing]
    );

    return [playing, toggle];
};

const Player = ({ url, play }) => {
    const [playing, toggle] = useAudio(url, play);

    return (
        <div>
            <button className="buttons" onClick={toggle}>Play</button>
        </div>
    );
};

export default Player;