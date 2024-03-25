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
import LandingPage from './LandingPage';
import ResetRoundListener from './NetworkHandlers/ResetRoundListener';
import WinnerListener from './NetworkHandlers/WinnerListener';
import AchievementListener from './NetworkHandlers/AchievementListener';

console.log(process.env.REACT_APP_API_URL);

const socket = io(process.env.REACT_APP_API_URL,
  { autoConnect: false }
);

function App() {
  const [player, setPlayer] = useState({});
  const [firstLog, setFirstLog] = useState(true);
  const [showStartGame, setShowStartGame] = useState(true);
  //SessionController
  const [saveSession,setSaveSession] = useState(true);
  //CardListListener
  const [displayedCards, setDisplayedCards] = useState([]);
  //MessagesListener
  const [messages, setMessages] = useState([]);
  //StoryTellerlistener
  const [storyTeller, setStoryteller] = useState({});
  const [checkStoryTeller, setCheckStoryTeller] = useState(false);
  //PlayerVoteListener
  const [voteStatus, setVoteStatus] = useState([]);
  const [checkOwner, setCheckOwner] = useState(false);
  //PlayerOwnershipListener
  const [ownershipStatus, setOwnershipStatus] = useState([]);
  const [enableScore, setEnableScore] = useState(false);
  //ScoreUpdateListener
  const [scoresUpdate, setScoresUpdate] = useState([]);
  //WinnerListener
  const [winner,setWinner] = useState(null);
  //AchievementsListener
  const [achievements,setAchievements] = useState(null);
  //RoomListListener
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState('');

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
    // socket.emit('joinRoom', JSON.stringify(data));
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
    <div style={{height:'100vh', overflow:'hidden'}}>

      {/* NETWORK  LISTENERS */}
      {/* <SessionController socket={socket} saveSession={saveSession} setFirstLog={setFirstLog} 
        setSaveSession={setSaveSession} setCurrentRoom={setCurrentRoom} setPlayer={setPlayer} 
      /> */}
      <CardListListener socket={socket} setDisplayedCards={setDisplayedCards}/>
      <MessagesListener socket={socket} setMessages={setMessages} messages={messages}/> 
      {/* MessagesListener is used for debugging */}
      <StoryTellerListener socket={socket} storyTeller={storyTeller} player={player} 
        setCheckStoryTeller={setCheckStoryTeller} setStoryteller={setStoryteller} setShowStartGame={setShowStartGame}
      />
      <PlayerVoteListener socket={socket} setVoteStatus={setVoteStatus} setCheckOwner={setCheckOwner} />
      <PlayerOwnershipListener socket={socket} setOwnershipStatus={setOwnershipStatus} setEnableScore={setEnableScore}/>
      <ScoreUpdateListener socket={socket} setScoresUpdate={setScoresUpdate} updateSession={updateSession} />
      <WinnerListener socket={socket} setWinner={setWinner} updateSession={updateSession} />
      <AchievementListener socket={socket} setAchievements={setAchievements} updateSession={updateSession} />
      <ResetRoundListener socket={socket} setEnableScore={setEnableScore} setCheckOwner={setCheckOwner}/>
      <RoomListListener socket={socket} setRooms={setRooms}/>
      <RoomNotFoundListener socket={socket} setFirstLog={setFirstLog} setSaveSession={setSaveSession} />
      {/* NETWORK  LISTENERS */}

      {firstLog === true ?
        <LandingPage socket={socket} rooms={rooms} setPlayerContext={setPlayerContext}/>
        :
        <TableTop socket={socket} player={player} storyTeller={storyTeller} voteStatus={voteStatus} 
          ownershipStatus={ownershipStatus} scoresUpdate={scoresUpdate} checkStoryTeller={checkStoryTeller} 
          checkOwner={checkOwner} displayedCards={displayedCards} enableScore={enableScore} 
          showStartGame={showStartGame} currentRoom={currentRoom} winner={winner} achievements={achievements}
          style={{height:'97.6vh', overflow:'hidden', margin:'0' }}
        />
      }

    </div>
  );
}

export default App;
