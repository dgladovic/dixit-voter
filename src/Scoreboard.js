import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, ListItem, List } from '@mui/material';

function Scoreboard({ scoresUpdate, singlePlayer }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Listen for changes in the messagesRes prop
    setPlayers(scoresUpdate); // Assuming messagesRes is an array of players
    console.log(scoresUpdate,'receiver');
    // Optionally, you can add more logic here to process the messagesRes data
  }, [scoresUpdate]);

  return (
    <>
    <List>
      {players.map((player, index) => 
      singlePlayer.name !== player.name ? 
      (<ListItem xs={3} key={index}>
          <Card style={{backgroundColor: player.color,
          width:'fit-content',
          maxWidth:'160px',
          height:'40px',
          display:'flex',
          alignItems:'center',
          justifyContent:'flex-start',
          }}>
              <Typography variant="h12" style={{textOverflow: 'ellipsis', overflow:'hidden', marginLeft:'4px'}}>{player.name} </Typography>
              <Typography variant="h12" style={{whiteSpace:'nowrap', fontWeight:'bold', marginRight:'4px'}}>: {player.score}</Typography>
          </Card>
        </ListItem>
      ): '')}
    </List>
    </>
  );
}

// {!enableScore && <List class='carousel'>
// {!checkStoryTeller && !checkOwner && displayedCards.map((key, index) => (
//   <ListItem>
//     <DixitCard
//       key={index}
//       id={index} // Set the data-key attribute
//       checkClick={() => handleCardSelect(index)} // No need to pass the key here
//     />
//   </ListItem>
// ))}
// {checkOwner && displayedCards.map((key, index) => (
//   <ListItem>
//   <DixitCard
//       key={index}
//       id={index} // Set the data-key attribute
//       checkClick={() => handleCardVote(index)} // No need to pass the key here
//     />
//   </ListItem>
// ))}
// </List>}


export default Scoreboard;
