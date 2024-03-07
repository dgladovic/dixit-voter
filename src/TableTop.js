/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import VoteStatusMonitor from './VoteStatusMonitor';
import OwnerStatusMontior from './OwnerStatusMonitor';
import Scoreboard from './Scoreboard';
import StorytellerMessage from './StorytellerMessage';
import DixitCard from './DixitCard';
import { Grid, Button, Box, List, Listitem, Stack, ListItem } from '@mui/material';
import PlayerBanner from './PlayerBanner';
import TransitionMessage from './TransitionMessage';
import Footer from './Footer';
import './TableTop.css';

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
        console.log('cardVote',stringSelection);
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
        console.log('ownerVote',stringSelection);
        socket.emit('ownerVote', stringSelection);
      };
    
      const handleScore = () => {
        const objValue = { ...player, room: currentRoom }
        const storyTeller = JSON.stringify(objValue);
        console.log(storyTeller);
        console.log('ownerVote',storyTeller);
        socket.emit('votingResults', storyTeller);
        console.log('resetCards',currentRoom);
        socket.emit('resetCards', currentRoom);
        const messageCont = {
          room: currentRoom
        };
        const message = JSON.stringify(messageCont);
        console.log('getstoryteller',message);
        socket.emit('getstoryteller', message);
      }
    
      const startGame = () => {
        const messageCont = {
          room: currentRoom
        };
        const message = JSON.stringify(messageCont);
        console.log('startGame',message);
        socket.emit('startGame', message);
      }

      const slideLeft = () => {
        var slider = document.getElementsByClassName('carousel')[0];
        slider.scrollLeft = slider.scrollLeft - 160;
      }

      const slideRight = () => {
        var slider = document.getElementsByClassName('carousel')[0];
        slider.scrollLeft = slider.scrollLeft + 160;
      }



    return (
        <div class='origin'>
          <PlayerBanner player={player} class='banner'/>
          <div class='origin-inner'>
            {/* <div>
              {messagesRes.map((message, index) => (
                <div style={{ border: 'solid red 1px' }} key={index}>{message}</div>
              ))}
            </div> */}
            {!showStartGame && !enableScore && !checkOwner && <StorytellerMessage key={storyTeller.name} storyteller={storyTeller} player={player}/>}
            {!enableScore && checkOwner && <TransitionMessage key={checkOwner} class='transition'/>}

            {/* <Scoreboard scoresUpdate={scoresUpdate} singlePlayer={player} /> */}

            {/* {!showStartGame && checkStoryTeller && !checkOwner &&
            <div style={{position:'fixed', top:'50%', left:'17%', backgroundColor: 'transparent', color: 'black',
            padding: '10px 20px',
            fontWeight:'700',
            fontSize:'20px',
            borderRadius: '5px'}}>
              You are the storyteller
            </div>
            } */}
            
            <div class='sliderGroup'>
              {/* <div class='blur' onClick={slideLeft}> </div> */}
            {!enableScore && <List class='carousel'>
              {!checkStoryTeller && !checkOwner && displayedCards.map((key, index) => (
                <ListItem>
                  <DixitCard
                    key={index}
                    id={index} // Set the data-key attribute
                    checkClick={() => handleCardSelect(index)} // No need to pass the key here
                  />
                </ListItem>
              ))}
              {checkOwner && displayedCards.map((key, index) => (
                <ListItem>
                <DixitCard
                    key={index}
                    id={index} // Set the data-key attribute
                    checkClick={() => handleCardVote(index)} // No need to pass the key here
                  />
                </ListItem>
              ))}
            </List>}
              {/* <div class='blurright' onClick={slideRight}></div> */}
            </div>

            {!showStartGame && !checkStoryTeller && !checkOwner && <div class='helper-text'> 
                Pick a card
              </div>
            }

            {/* {checkOwner && <TransitionMessage key={checkOwner} class='transition'/>} */}
            {/* Set Ownership of Cards */}
            {/* <List class='carousel'>
              {checkOwner && displayedCards.map((key, index) => (
                <ListItem>
                <DixitCard
                    key={index}
                    id={index} // Set the data-key attribute
                    checkClick={() => handleCardVote(index)} // No need to pass the key here
                  />
                </ListItem>
              ))}
            </List> */}

            {enableScore && <Footer scoresUpdate={scoresUpdate} player={player}/>}

            {enableScore && checkStoryTeller && 
            <Button
            style={{
              position: 'absolute', // Set absolute positioning
              left: '50%', // Center horizontally
              top: '50%', // Center vertically
              transform: 'translate(-50%, -50%)', // Center both horizontally and vertically
              width: '200px',
              height: '50px',
              backgroundColor:'black'
            }}
              variant="contained"
              onClick={handleScore} // No need to pass the key here
            >
              Finish round
            </Button>}
            {showStartGame && (
              <Box display="flex" justifyContent="center" marginTop="16px">
                <Button
                  className="startgame"
                  onClick={startGame}
                  variant="contained"
                  style={{
                    position: 'absolute', // Set absolute positioning
                    left: '50%', // Center horizontally
                    top: '50%', // Center vertically
                    transform: 'translate(-50%, -50%)', // Center both horizontally and vertically
                    width: '200px',
                    height: '50px',
                    backgroundColor:'black'
                  }}
                >
                  Start Game
                </Button>
              </Box>
            )}
          </div>
          {/* {!checkOwner && <VoteStatusMonitor voteStatus={voteStatus} />} */}
          {/* {checkOwner && <OwnerStatusMontior voteStatus={ownershipStatus} />} */}
          {/* <Footer class='origin-footer' scoresUpdate={scoresUpdate} player={player}/> */}
          {/* <div>
            {messages.map((message, index) => (
              <div key={index}>{message}</div>
            ))}
          </div> */}
      </div>
    );
}

export default TableTop;