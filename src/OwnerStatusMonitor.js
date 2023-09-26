import React, { useEffect, useState } from 'react';
import { Grid, Card, Typography } from '@mui/material'

function OwnerStatusMontior({ voteStatus }) {
  const [playersNotVoted, setPlayersNotVoted] = useState([]);

  useEffect(() => {
    // Filter players who haven't voted
    const notVotedPlayers = voteStatus.filter((player) => !player.votedOwnership);

    // Update the state with players who haven't voted
    setPlayersNotVoted(notVotedPlayers);
  }, [voteStatus]);

  return (
    <div style={{position:'absolute', bottom: '0px', width:'300px', left:'10px'}}>
      <h4 style={{ marginLeft: '8px', marginBottom:'8px'}}>Players Who Haven't Set Ownership:</h4>
      <Grid container spacing={2} padding={1}>
      {playersNotVoted.map((player, index) => 
      <Grid item xs={3} key={index}>
          <Card style={{backgroundColor: 'lightgray',
          width:'fit-content',
          maxWidth:'80px',
          height:'40px',
          display:'flex',
          alignItems:'center',
          justifyContent:'flex-start',
          }}>
              <Typography variant="h12" style={{textOverflow: 'ellipsis', overflow:'hidden', marginLeft:'8px', marginRight:'8px', fontWeight:'bold'}}>{player.name} </Typography>
          </Card>
        </Grid>
      )}
    </Grid>
    </div>
  );
}

export default OwnerStatusMontior;
