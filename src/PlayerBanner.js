import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import './PlayerBanner.css';
import {Star} from "@mui/icons-material";

function PlayerBanner({ player }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Listen for changes in the messagesRes prop
    setPlayers(player); // Assuming messagesRes is an array of players
    // Optionally, you can add more logic here to process the messagesRes data
  }, [player]);

  return (

          <div class='banner-container'>

            <div className="banner">
              <span id="capital" style={{ fontFamily: 'Dilana', fontSize: '38px', textTransform:'capitalize' }}>{player.name[0]}</span>
              <span id="capital-rest" style={{ fontFamily: 'Dilana', fontSize: '28px'}}>{player.name.slice(1)}</span>
            </div>
            
            <div style={{display:'flex', alignItems:'center', marginTop:'11px'}}>
            <Star />:
            <span style={{fontWeight:'bold'}}>{player.score}</span>
            </div>
          </div>


    
  );
}

export default PlayerBanner;
