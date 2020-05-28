import React, { useState } from 'react';
import { Button, Spin } from 'antd';
import soundfile from '../../assets/sound/Avengers.mp3';
import fileVideo from '../../assets/video/video.mp4';

import './home.scss';

const Home = (props) => {
  const [finished, setFinished] = useState("");
  const [loading, setLoading] = useState("");
  const {history} = props;
  const {push} = history;

  const handlerClickStart = () => {
    if(finished)
      push('/characters');
  }

  const onLoadedData = () => {
    setLoading(true);
    document.getElementById("video-element").play();    
  }

  const onLoadedDataAudio =() => {
    document.getElementById("audio-element").play();
  }

  const onTimeUpdateCapture = ()=> {
    const video = document.getElementById("video-element");

    if(video.currentTime >= 26.88009) {
      video.pause();
      setFinished(true);
    }
  }
  
  const render = () => {
    
    return (
      <div id="home-component">
        {!loading && 
          <div className="container-spin">
            <Spin tip="Loading..." size="large"/>
          </div>
        }

        <audio id="audio-element" src={soundfile} loop autoPlay onLoadedData={onLoadedDataAudio}/>
        <video id="video-element" src={fileVideo} onLoadedData={onLoadedData} onTimeUpdateCapture={onTimeUpdateCapture} muted={true} onClick={handlerClickStart}></video>
        {finished && <Button className="button-start" onClick={handlerClickStart}>Bem vindo a Marvel!</Button> }
      </div>
    )
  }

  return(<>{render()}</>)  
  
}

export default Home;