import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import UserInfoRoomSelection from './UserInfoRoomSelection';
import VoteStatusMonitor from './VoteStatusMonitor';
import OwnerStatusMontior from './OwnerStatusMonitor';
import Scoreboard from './Scoreboard';
import StorytellerMessage from './StorytellerMessage';
import DixitCard from './DixitCard';
import { Grid, Button, Box } from '@mui/material';
import PlayerBanner from './PlayerBanner';

console.log(process.env.REACT_APP_API_URL)
const socket = io(process.env.REACT_APP_API_URL); // Replace with your server's URL

function App() {
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messagesRes, setMessagesRes] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [player, setPlayer] = useState({});
  const [storyTeller, setStoryteller] = useState({});
  const [currentRoom, setCurrentRoom] = useState('');
  const [firstLog, setFirstLog] = useState(true);
  const [voteStatus, setVoteStatus] = useState([]);
  const [ownershipStatus, setOwnershipStatus] = useState([]);



  const [checkOwner, setCheckOwner] = useState(false);
  const [checkStoryTeller, setCheckStoryTeller] = useState(false);
  const [enableScore, setEnableScore] = useState(false);
  const [showStartGame, setShowStartGame] = useState(true);

  // proverava da li su svi glasali, ukoliko jesu, onda se moze raditi glasanje za kartu

  const setPlayerContext = (data) => {
    setCurrentRoom(data.roomName);
    const Player = {
      id: '',
      name: data.playerName,
      score: 0,
      color: data.color
    }
    setPlayer(Player);
    console.log(Player, 'test');
    setFirstLog(false);
    socket.emit('joinRoom', JSON.stringify(data));
  }

  useEffect(() => {
    // Listen for cards to render
    socket.on('cardList', (message) => {
      let newMess = JSON.parse(message);
      setButtons(newMess);
    });
  }, [buttons]);

  useEffect(() => {
    // Listen for cards state update
    socket.on('message', (message) => {
      JSON.parse(message);
      console.log('message', JSON.parse(message))
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    // Listen for storyteller update
    socket.on('storyteller', (message) => {
      let newStoryteller = JSON.parse(message);
      setStoryteller(newStoryteller);
      setShowStartGame(false);
    });
  }, []);

  useEffect(() => {
    // Listen for storyteller update
      if (storyTeller.name === player.name) {
        setCheckStoryTeller(true);
      }
      else {
        setCheckStoryTeller(false);
      }
  }, [storyTeller.name]);

  useEffect(() => {
    // Listen for players voting status
    socket.on('playerVoteStatus', (message) => {

      let allVoters = JSON.parse(message);
      let allVoted = true;
      console.log(allVoters, 'testmeup ');
      setVoteStatus(allVoters);
      for (let i = 0; i < allVoters.length; i++) {
        let voter = allVoters[i];
        if (!voter.voted) {
          allVoted = false;
          setCheckOwner(false);
          break;
        }
      }

      if (allVoted) {
        setCheckOwner(true);
      }
    });

  }, [voteStatus]);

  useEffect(() => {
    // Listen for players voting status
    socket.on('playerOwnershipStatus', (message) => {

      let allVoters = JSON.parse(message);
      let allVoted = true;
      setOwnershipStatus(allVoters);
      for (let i = 0; i < allVoters.length; i++) {
        let voter = allVoters[i];
        if (!voter.votedOwnership) {
          allVoted = false;
          setEnableScore(false);
          break;
        }
      }

      if (allVoted) {
        setEnableScore(true);
      }
    });

  }, [ownershipStatus]);

  useEffect(() => {
    // Listen for scoring update
    socket.on('messageRes', (message) => {
      let result = JSON.parse(message);
      console.log('scores', message);
      setMessagesRes(result);
    });
  }, [messagesRes]);

  useEffect(() => {
    // Update the list of rooms whenever it changes
    socket.on('roomList', (updatedRooms) => {
      console.log(updatedRooms, 'hejo');
      setRooms(JSON.parse(updatedRooms));
    });
  }, [rooms]);

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
    <div>
      {firstLog === true ?
        <div style={{ padding: '8px' }}>
          <h1>Welcome to </h1>
          <span style={{fontFamily:'Dilana', fontSize:'64px'}}>Dixit</span>
          <UserInfoRoomSelection socket={socket} rooms={rooms} handlePlayer={setPlayerContext} />
        </div>
        :
        <div style={{ padding: '8px' }}>
          <PlayerBanner player={player} />
          <div>
            <div>
              {/* <div>
                {messagesRes.map((message, index) => (
                  <div style={{ border: 'solid red 1px' }} key={index}>{message}</div>
                ))}
              </div> */}
              <StorytellerMessage key={storyTeller.name} storyteller={storyTeller} player={player} />
              <Scoreboard messagesRes={messagesRes} singlePlayer={player} />


              <Grid container spacing={2} padding={1}>
                {!checkStoryTeller && !checkOwner && buttons.map((key, index) => (
                  <Grid item xs={4} key={index}>
                    <DixitCard
                      key={index}
                      id={index} // Set the data-key attribute
                      checkClick={() => handleCardSelect(index)} // No need to pass the key here
                    />
                  </Grid>
                ))}
              </Grid>

              <Grid container spacing={2} padding={1}>
                {checkOwner && buttons.map((key, index) => (
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
            {!checkOwner && <VoteStatusMonitor voteStatus={voteStatus} />}
            {checkOwner && <OwnerStatusMontior voteStatus={ownershipStatus} />}
            {/* <div>
              {messages.map((message, index) => (
                <div key={index}>{message}</div>
              ))}
            </div> */}
          </div>
        </div>
      }

    </div>
  );
}

export default App;
