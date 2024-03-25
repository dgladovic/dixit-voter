/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useState, useEffect } from 'react';
import UserInfoRoomSelection from './UserInfoRoomSelection';
import logo from './dixit-logo.png';
import './LandingPage.css';
import { StarBorder } from '@mui/icons-material';


const Winner = ({
    winner
}) => {
    
  //   const [animationPhase, setAnimationPhase] = useState('appear');

  // useEffect(() => {
  //   // Initial appearance animation
  //   setTimeout(() => {
  //     setAnimationPhase('moveUp');
  //   }, 1000);
  // }, []);


    return (
        <div style={{display: 'flex', flexDirection:'column', margin:'auto', alignItems:'center',width:'100%'}}>
          {/* className={`animated-div ${animationPhase}`}
          onAnimationEnd={() => {
            if (animationPhase === 'appear') {
              // Wait for the 'appear' animation to complete before triggering 'moveUp'
              setAnimationPhase('moveUp');
            }
          }} */}
          <h3>We have a WINNER!</h3>
          <h1 style={{textTransform:'capitalize'}}>{winner.name}</h1>
          <StarBorder/>
          <h3>you are the best!</h3>
        <div style={{ display: 'flex', marginTop:'40px',width:'90%',justifyContent:'space-around' }}>
          <div style={{ border:'solid 2px black', height: '180px', width: '100px', flexDirection: 'column', display: 'flex', alignItems: 'center' }}>
            <h3>Dreamer</h3>
            <StarBorder/>
            <h3>Milica</h3>
          </div>
          <div style={{ border:'solid 2px black', height: '180px', width: '100px', flexDirection: 'column', display: 'flex', alignItems: 'center' }}>
            <h3>Talker</h3>
            <StarBorder/>
            <h3>Ana</h3>
          </div>
          <div style={{ border:'solid 2px black', height: '180px', width: '100px', flexDirection: 'column', display: 'flex', alignItems: 'center' }}>
            <h3>Guesser</h3>
            <StarBorder/>
            <h3>Isidora</h3>
          </div>
        </div>
        </div>
    );
}

export default Winner;