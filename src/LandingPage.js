/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import UserInfoRoomSelection from './UserInfoRoomSelection';
import logo from './dixit-logo.png';


const LandingPage = ({
    socket, rooms, setPlayerContext
}) => {


    return (
        <div style={{ padding: '8px', background: 'linear-gradient(166deg, rgba(255,152,0,1) 0%, rgba(254,248,128,1) 100%)', height:'97.6vh' }}>
          <img src={logo} style={{width:'80%', margin: 'auto', display:'block', marginTop:'4px', marginBottom:'8px',maxWidth:'200px'}}/>
          <UserInfoRoomSelection socket={socket} rooms={rooms} handlePlayer={setPlayerContext} />
        </div>
    );
}

export default LandingPage;