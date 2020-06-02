import React, { useState } from 'react';
import { Button, Spin } from 'antd';
import soundfile from '../../assets/sound/Avengers.mp3';
import fileVideo from '../../assets/video/video.mp4';
import { Layout } from 'antd';
import MenuComponent from '../../core/components/menu/menu';

import './home.scss';

const { Header, Content, Footer } = Layout;
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

    if(video.currentTime >= 26.5) {
      console.log(video.currentTime)
      video.pause();
      setFinished(true);
    }
  }
  
  const render = () => {
    
    return (
      <div id="home-component"> 

          <Layout className="layout">
            <Header>
                <MenuComponent {...props}/>
            </Header>

            <Content>
              {!loading && 
                <div className="container-spin">
                  <Spin tip="Loading..." size="large"/>
                </div>
              }

              <audio id="audio-element" src={soundfile} loop autoPlay onLoadedData={onLoadedDataAudio}/>
              <video id="video-element" src={fileVideo} onLoadedData={onLoadedData} onTimeUpdateCapture={onTimeUpdateCapture} muted={true} onClick={handlerClickStart}></video>
              {finished && <Button className="button-start" onClick={handlerClickStart}>Bem vindo a Marvel!</Button> }
            </Content>

            <Footer style={{ textAlign: 'center' }}>
                &copy; 2020 by <a href="http://marvel.com/" target='_blank'>Marvel</a>
            </Footer>
          </Layout>

       
      </div>
    )
  }

  return(<>{render()}</>)  
  
}

export default Home;