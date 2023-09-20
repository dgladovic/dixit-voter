import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

function Scoreboard({ messagesRes, singlePlayer }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Listen for changes in the messagesRes prop
    setPlayers(messagesRes); // Assuming messagesRes is an array of players
    console.log(messagesRes,'receiver');
    // Optionally, you can add more logic here to process the messagesRes data
  }, [messagesRes]);

  return (
    <>
    <Grid container spacing={2} padding={1}>
      {players.map((player, index) => 
      singlePlayer.name !== player.name ? 
      (<Grid item xs={3} key={index}>
          <Card style={{backgroundColor: player.color,
          width:'fit-content',
          maxWidth:'80px',
          height:'40px',
          display:'flex',
          alignItems:'center',
          justifyContent:'flex-start',
          }}>
              <Typography variant="h12" style={{textOverflow: 'ellipsis', overflow:'hidden', marginLeft:'4px'}}>{player.name} </Typography>
              <Typography variant="h12" style={{whiteSpace:'nowrap', fontWeight:'bold', marginRight:'4px'}}>: {player.score}</Typography>
          </Card>
        </Grid>
      ): '')}
    </Grid>
    </>
  );
}

export default Scoreboard;
