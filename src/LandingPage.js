/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useState, useEffect } from 'react';
import UserInfoRoomSelection from './UserInfoRoomSelection';
import logo from './dixit-logo.png';
import './LandingPage.css';


const LandingPage = ({
    socket, rooms, setPlayerContext
}) => {
    
    const [animationPhase, setAnimationPhase] = useState('appear');

  useEffect(() => {
    // Initial appearance animation
    setTimeout(() => {
      setAnimationPhase('moveUp');
    }, 1000);
  }, []);


    return (
        <div style={{ padding: '8px', background: 'linear-gradient(166deg, rgba(255,152,0,1) 0%, rgba(254,248,128,1) 100%)', height:'97.6vh' }}>
          <img src={logo} 
          className={`animated-div ${animationPhase}`}
          onAnimationEnd={() => {
            if (animationPhase === 'appear') {
              // Wait for the 'appear' animation to complete before triggering 'moveUp'
              setAnimationPhase('moveUp');
            }
          }}
/>
          <UserInfoRoomSelection socket={socket} rooms={rooms} handlePlayer={setPlayerContext} animationPhase={animationPhase}/>
        </div>
    );
}

export default LandingPage;