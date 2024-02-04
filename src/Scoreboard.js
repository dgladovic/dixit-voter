import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, ListItem, List } from '@mui/material';
import { Star } from "@mui/icons-material";
import './Scoreboard.css';

function Scoreboard({ scoresUpdate, singlePlayer }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Listen for changes in the scoresUpdate prop
    setPlayers(scoresUpdate);
  }, [scoresUpdate]);

  // Sort the players array before rendering
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <>
      {players.length === 0 ? 
      <div style={{ margin:'auto', fontWeight:'bold', fontSize: '20px', textAlign:'center', marginTop:'64px'}}>
        Everyone is still asleep
      </div> : 
      <List className="score">
        {sortedPlayers.map((player, index) => (
          <ListItem xs={3} key={index}>
            <Card
              className="score-field"
              style={{
                color: player.color,
                borderColor: player.color
              }}>
              <Star style={{color: player.color}}/>
              <Typography variant="h12" style={{ textOverflow: 'ellipsis', overflow: 'hidden', marginLeft: '4px', textTransform: 'capitalize', fontWeight: 'bold' }}>{player.name} </Typography>
              <Typography variant="h12" style={{ whiteSpace: 'nowrap', fontWeight: 'bold', marginRight: '4px' }}>: {player.score}</Typography>
            </Card>
          </ListItem>
        ))}
      </List>
      }
    </>
  );
}

export default Scoreboard;
