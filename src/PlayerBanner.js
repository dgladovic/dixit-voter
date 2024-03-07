import React, { useEffect, useState } from 'react';
import { List, ListItem, Dialog, DialogTitle, DialogContent } from '@mui/material';
import './PlayerBanner.css';
import {Star, Settings} from "@mui/icons-material";

function PlayerBanner({ player }) {
  const [players, setPlayers] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const settingsOptions = [
    {
      title:'Change Room'
    },
    {
      title:'Change Player Data'
    }
  ]

  useEffect(() => {
    // Listen for changes in the messagesRes prop
    setPlayers(player); // Assuming messagesRes is an array of players
    // Optionally, you can add more logic here to process the messagesRes data
  }, [player]);

  return (

          <div className='banner-container'>

            <div style={{display:'flex', alignItems:'center', marginLeft:'16px', width:'42px'}}>
              <div style={{display:'inline-block', marginRight:'-16px', marginTop:'6px'}}>
                <Star style={{fontSize:'28px', color:'black',position:'relative', top:'0px',left:'0px'}}/>
                <Star style={{fontSize:'20px', color: player.color, position:'relative', top:'-4px',left:'-24px', zIndex:50}}/>
              </div>
              <span style={{fontWeight:'bold'}}>{player.score}</span>
            </div>

            <div className="banner">
              <span id="capital" style={{ fontFamily: 'Dilana', fontSize: '38px', textTransform:'capitalize' }}>{player.name[0]}</span>
              <span id="capital-rest" style={{ fontFamily: 'Dilana', fontSize: '28px'}}>{player.name.slice(1)}</span>
            </div>

            <div style={{display:'flex', alignItems:'center', marginRight:'16px', width:'42px', justifyContent:'flex-end'}}
            onClick={()=>setIsSettingsOpen(true)}>
              {/* <div style={{display:'inline-block', marginRight:'-16px', marginTop:'6px'}}> */}
                <Settings style={{fontSize:'28px', color:'black', position:'relative', top:'2px'}}/>
              {/* </div> */}
            </div>

            <Dialog
            open={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
          >
            <DialogTitle>Options</DialogTitle>
            <DialogContent>
              <List>
                {settingsOptions.map((option,id) => (
                  <ListItem
                    key={id}
                    button
                  >
                    {option.title}
                  </ListItem>
                ))}
              </List>
            </DialogContent>
          </Dialog>
            

          </div>
  );
}

export default PlayerBanner;
