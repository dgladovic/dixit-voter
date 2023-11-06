/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import VoteStatusMonitor from './VoteStatusMonitor';
import OwnerStatusMontior from './OwnerStatusMonitor';
import Scoreboard from './Scoreboard';
import StorytellerMessage from './StorytellerMessage';
import DixitCard from './DixitCard';
import { Grid, Button, Box } from '@mui/material';
import PlayerBanner from './PlayerBanner';
import TransitionMessage from './TransitionMessage';
import Footer from './Footer';

const TableTop = ({
    socket, player, storyTeller, voteStatus, ownershipStatus, scoresUpdate,
    checkStoryTeller, checkOwner, displayedCards, enableScore, showStartGame,
    currentRoom
}) => {

    const handleCardSelect = (event) => {
        const key = event; // Get the key from data-key attribute
        const playerSelection = {
          id: key,
          player: player.name,
          room: currentRoom
        };
        const stringSelection = JSON.stringify(playerSelection);
        socket.emit('cardVote', stringSelection);
      };
    
      const handleCardVote = (event) => {
        const key = event; // Get the key from data-key attribute
        const playerSelection = {
          id: key,
          player: player.name,
          room: currentRoom
        };
        const stringSelection = JSON.stringify(playerSelection);
        socket.emit('ownerVote', stringSelection);
      };
    
      const handleScore = () => {
        const objValue = { ...player, room: currentRoom }
        const storyTeller = JSON.stringify(objValue);
        console.log(storyTeller);
        socket.emit('votingResults', storyTeller);
        socket.emit('resetCards', currentRoom);
        const messageCont = {
          room: currentRoom
        };
        const message = JSON.stringify(messageCont);
        socket.emit('getstoryteller', message);
      }
    
      const startGame = () => {
        const messageCont = {
          room: currentRoom
        };
        const message = JSON.stringify(messageCont);
        socket.emit('startGame', message);
      }



    return (
        <div style={{ padding: '8px', background: 'linear-gradient(166deg, rgba(255,152,0,1) 0%, rgba(254,248,128,1) 100%)',height:'98.8%' }}>
        <PlayerBanner player={player} />
        <div>
          <div>
            {/* <div>
              {messagesRes.map((message, index) => (
                <div style={{ border: 'solid red 1px' }} key={index}>{message}</div>
              ))}
            </div> */}
            <StorytellerMessage key={storyTeller.name} storyteller={storyTeller} player={player} />
            {/* <Scoreboard scoresUpdate={scoresUpdate} singlePlayer={player} /> */}

            {!showStartGame && checkStoryTeller && !checkOwner &&
            <div style={{position:'fixed', top:'50%', left:'17%', backgroundColor: 'rgb(0,0,0,0.8)', color: 'white',
            padding: '10px 20px',
            borderRadius: '5px'}}>
              You are the storyteller ! SPEAK
            </div>
            }
            <Grid container spacing={2} padding={1} style={{maxHeight:'400px', overflow:'scroll'}}>
              {!checkStoryTeller && !checkOwner && displayedCards.map((key, index) => (
                <Grid item xs={4} key={index}>
                  <DixitCard
                    key={index}
                    id={index} // Set the data-key attribute
                    checkClick={() => handleCardSelect(index)} // No need to pass the key here
                  />
                </Grid>
              ))}
            </Grid>
            {checkOwner && <TransitionMessage key={checkOwner}/>}
            {/* Set Ownership of Cards */}
            <Grid container spacing={2} padding={1}>
              {checkOwner && displayedCards.map((key, index) => (
                <Grid item xs={4} key={index}>
                  <DixitCard
                    key={index}
                    id={index} // Set the data-key attribute
                    checkClick={() => handleCardVote(index)} // No need to pass the key here
                  />
                </Grid>
              ))}
            </Grid>

            {enableScore && checkStoryTeller && <Button
              onClick={handleScore} // No need to pass the key here
              style={{width:'100%', height:'50px', marginTop:'16px'}}
              variant="contained"
              color="primary"
            >
              Get Score Update
            </Button>}
            {showStartGame && (
              <Box display="flex" justifyContent="center" marginTop="16px">
                <Button
                  className="startgame"
                  onClick={startGame}
                  variant="contained"
                  color="primary"
                  style={{
                    position: 'absolute', // Set absolute positioning
                    left: '50%', // Center horizontally
                    top: '50%', // Center vertically
                    transform: 'translate(-50%, -50%)', // Center both horizontally and vertically
                    width: '200px',
                    height: '50px',
                    borderRadius: '50px',
                  }}
                >
                  Start Game
                </Button>
              </Box>
            )}
          </div>
          {/* {!checkOwner && <VoteStatusMonitor voteStatus={voteStatus} />} */}
          {/* {checkOwner && <OwnerStatusMontior voteStatus={ownershipStatus} />} */}
          <Footer scoresUpdate={scoresUpdate} player={player}/>
          {/* <div>
            {messages.map((message, index) => (
              <div key={index}>{message}</div>
            ))}
          </div> */}
        </div>
      </div>
    );
}

export default TableTop;