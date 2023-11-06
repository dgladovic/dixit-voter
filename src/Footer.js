import React, { useEffect, useState } from 'react';
import { Grid, Card, Typography } from '@mui/material';
import Scoreboard from './Scoreboard';

function Footer({ scoresUpdate,player }) {
  const [playersNotVoted, setPlayersNotVoted] = useState([]);

  // useEffect(() => {
  //   // Filter players who haven't voted
  //   const notVotedPlayers = voteStatus.filter((player) => !player.votedOwnership);

  //   // Update the state with players who haven't voted
  //   setPlayersNotVoted(notVotedPlayers);
  // }, [voteStatus]);

  return (
    <div style={{position:'fixed', bottom:'0px', margin:'auto', marginTop:'12px', borderTop:'2px solid black', width:'96%'}}>
      {/* <h4 style={{}}>Check scores here!</h4> */}
      <Scoreboard scoresUpdate={scoresUpdate} singlePlayer={player} />
    </div>
  );
}

export default Footer;

