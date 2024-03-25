/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useState, useEffect } from 'react';
import UserInfoRoomSelection from './UserInfoRoomSelection';
import logo from './dixit-logo.png';
import './LandingPage.css';
import { StarBorder } from '@mui/icons-material';
import { Button } from '@mui/material';


const Winner = ({
  winner,achievements
}) => {

  //   const [animationPhase, setAnimationPhase] = useState('appear');

  // useEffect(() => {
  //   // Initial appearance animation
  //   setTimeout(() => {
  //     setAnimationPhase('moveUp');
  //   }, 1000);
  // }, []);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto', alignItems: 'center', width: '100%' }}>
      {/* className={`animated-div ${animationPhase}`}
          onAnimationEnd={() => {
            if (animationPhase === 'appear') {
              // Wait for the 'appear' animation to complete before triggering 'moveUp'
              setAnimationPhase('moveUp');
            }
          }} */}
      <h3>We have a WINNER!</h3>
      <h1 style={{ textTransform: 'capitalize' }}>{winner.name}</h1>
      <StarBorder />
      <h3>you are the best!</h3>
      {achievements && 
      <div style={{ display: 'flex', marginTop: '40px', width: '90%', justifyContent: 'space-around' }}>
        {achievements.realDeceiver && <div style={{ border: 'solid 2px black', height: '180px', width: '100px', flexDirection: 'column', display: 'flex', alignItems: 'center' }}>
          <h3>Deceiver</h3>
          <StarBorder />
          <h3>{achievements.realDeceiver.name}</h3>
        </div>}
        {achievements.realGuesser && <div style={{ border: 'solid 2px black', height: '180px', width: '100px', flexDirection: 'column', display: 'flex', alignItems: 'center' }}>
          <h3>Guesser</h3>
          <StarBorder />
          <h3>{achievements.realGuesser.name}</h3>
        </div>}
        {achievements.realDreamer && <div style={{ border: 'solid 2px black', height: '180px', width: '100px', flexDirection: 'column', display: 'flex', alignItems: 'center' }}>
          <h3>Dreamer</h3>
          <StarBorder />
          <h3>{achievements.realDreamer.name}</h3>
        </div>}
        {achievements.realRealist && <div style={{ border: 'solid 2px black', height: '180px', width: '100px', flexDirection: 'column', display: 'flex', alignItems: 'center' }}>
          <h3>Realist</h3>
          <StarBorder />
          <h3>{achievements.realRealist.name}</h3>
        </div>}
      </div>}
      <div style={{display:'flex', width:'90%',margin:'auto', marginTop:'16px'}}>
      <Button
          style={{ width: '48%', color: 'white', backgroundColor: '#06b306', height: '50px', margin:'auto', marginTop: '0px' }}
          variant="contained"
          // color="primary"
          // onClick={handleConfirmClick}
        >
          Play again
        </Button>
        <Button
          style={{ width: '48%', color: 'white', backgroundColor: 'black', height: '50px', margin:'auto', marginTop: '0px' }}
          variant="contained"
          // color="primary"
          // onClick={handleConfirmClick}
        >
          Change Mode
        </Button>
        </div>
    </div>
  );
}

export default Winner;