import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import UserInfoRoomSelection from './UserInfoRoomSelection';
import VoteStatusMonitor from './VoteStatusMonitor';
import OwnerStatusMontior from './OwnerStatusMonitor';
import Scoreboard from './Scoreboard';
import StorytellerMessage from './StorytellerMessage';
import DixitCard from './DixitCard';
import { Grid, Button, Box } from '@mui/material';
import PlayerBanner from './PlayerBanner';
import logo from './dixit-logo.png';
import RoomNotFoundListener from './NetworkHandlers/RoomNotFoundListener';
import MessagesListener from './NetworkHandlers/MessagesListener';
import CardListListener from './NetworkHandlers/CardListListener';
import RoomListListener from './NetworkHandlers/RoomListListener';
import ScoreUpdateListener from './NetworkHandlers/ScoreUpdateListener';
import StoryTellerListener from './NetworkHandlers/StoryTellerListener';
import PlayerVoteListener from './NetworkHandlers/PlayerVoteListener';
import PlayerOwnershipListener from './NetworkHandlers/PlayerOwnershipListener';
import SessionController from './NetworkHandlers/SessionController';


console.log(process.env.REACT_APP_API_URL);

const socket = io(process.env.REACT_APP_API_URL,
  { autoConnect: false }
);

function App() {
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [scoresUpdate, setScoresUpdate] = useState([]);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [player, setPlayer] = useState({});
  const [storyTeller, setStoryteller] = useState({});
  const [currentRoom, setCurrentRoom] = useState('');
  const [firstLog, setFirstLog] = useState(true);
  const [voteStatus, setVoteStatus] = useState([]);
  const [ownershipStatus, setOwnershipStatus] = useState([]);
  const [connected,setConnected] = useState(false);
  const [saveSession,setSaveSession] = useState(true);



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
    setFirstLog(false);
    socket.emit('joinRoom', JSON.stringify(data));
  }

  const updateSession = (room) =>{
    const session = {
      sessionID: socket.sessionID,    // id uredjaja - sesije
      userID: socket.userID,          // javni id playera
      userScore: socket.userScore,
      name: socket.name,
      roomName: room,
      color: socket.color
    }
    socket.emit('updateSession', JSON.stringify(session));
    let PlayerUpdate = {
      name: socket.name,
      score: socket.userScore,
      color: player.color,
      id: player.id
    }
    setPlayer(PlayerUpdate);
  }

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

      {/* NETWORK  LISTENERS */}
      <SessionController socket={socket} saveSession={saveSession} setFirstLog={setFirstLog} 
        setSaveSession={setSaveSession} setCurrentRoom={setCurrentRoom} setPlayer={setPlayer} 
      />
      <CardListListener socket={socket} setDisplayedCards={setDisplayedCards}/>
      <MessagesListener socket={socket} setMessages={setMessages} messages={messages}/>
      <StoryTellerListener socket={socket} storyTeller={storyTeller} player={player} 
        setCheckStoryTeller={setCheckStoryTeller} setStoryteller={setStoryteller} setShowStartGame={setShowStartGame}
      />
      <PlayerVoteListener socket={socket} setVoteStatus={setVoteStatus} setCheckOwner={setCheckOwner} />
      <PlayerOwnershipListener socket={socket} setOwnershipStatus={setOwnershipStatus} setEnableScore={setEnableScore}/>
      <ScoreUpdateListener socket={socket} setScoresUpdate={setScoresUpdate} updateSession={updateSession} />
      <RoomListListener socket={socket} setRooms={setRooms}/>
      <RoomNotFoundListener socket={socket} setFirstLog={setFirstLog} setSaveSession={setSaveSession} />
      {/* NETWORK  LISTENERS */}

      {firstLog === true ?
        <div style={{ padding: '8px', background: 'linear-gradient(166deg, rgba(255,152,0,1) 0%, rgba(254,248,128,1) 100%)', height:'100vh' }}>
          <img src={logo} style={{width:'80%', margin: 'auto', display:'block', marginTop:'4px', marginBottom:'8px',maxWidth:'200px'}}/>
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
              <Scoreboard scoresUpdate={scoresUpdate} singlePlayer={player} />


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
