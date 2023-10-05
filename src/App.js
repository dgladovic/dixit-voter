/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import UserInfoRoomSelection from './UserInfoRoomSelection';
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
import TableTop from './TableTop';

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

  return (
    <div>

      {/* NETWORK  LISTENERS */}
      <SessionController socket={socket} saveSession={saveSession} setFirstLog={setFirstLog} 
        setSaveSession={setSaveSession} setCurrentRoom={setCurrentRoom} setPlayer={setPlayer} 
      />
      <CardListListener socket={socket} setDisplayedCards={setDisplayedCards}/>
      <MessagesListener socket={socket} setMessages={setMessages} messages={messages}/> 
      {/* MessagesListener is used for debugging */}
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
        <TableTop socket={socket} player={player} storyTeller={storyTeller} voteStatus={voteStatus} 
          ownershipStatus={ownershipStatus} scoresUpdate={scoresUpdate} checkStoryTeller={checkStoryTeller} 
          checkOwner={checkOwner} displayedCards={displayedCards} enableScore={enableScore} 
          showStartGame={showStartGame} currentRoom={currentRoom}
        />
      }

    </div>
  );
}

export default App;
