import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import UserInfoRoomSelection from './UserInfoRoomSelection';
import VoteStatusMonitor from './VoteStatusMonitor';
import OwnerStatusMontior from './OwnerStatusMonitor';
import Scoreboard from './Scoreboard';
import StorytellerMessage from './StorytellerMessage';

const socket = io('http://localhost:3000'); // Replace with your server's URL

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
    console.log(Player,'test');
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
      console.log('message',JSON.parse(message))
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    // Listen for storyteller update
    socket.on('storyteller', (message) => {
      let newStoryteller = JSON.parse(message);
      console.log('storytellere',newStoryteller);
      setStoryteller(newStoryteller);
      if(newStoryteller.name === player.name){
        setCheckStoryTeller(true);
      }
      else{
        setCheckStoryTeller(false);
      }

    });
  }, [storyTeller]);

  useEffect(() => {
    // Listen for players voting status
    socket.on('playerVoteStatus', (message) => {

      let allVoters = JSON.parse(message);
      let allVoted = true;
      console.log(allVoters,'testmeup ');
      setVoteStatus(allVoters);
      for(let i = 0; i < allVoters.length; i++){
        let voter = allVoters[i];
        if(!voter.voted){
          allVoted = false;
          setCheckOwner(false);
          break;
        }
      }

      if(allVoted){
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
      for(let i = 0; i < allVoters.length; i++){
        let voter = allVoters[i];
        if(!voter.votedOwnership){
          allVoted = false;
          setEnableScore(false);
          break;
        }
      }

      if(allVoted){
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
    const key = event.target.getAttribute('data-key'); // Get the key from data-key attribute
    const playerSelection = {
      id: key,
      player: player.name,
      room: currentRoom
    };
    const stringSelection = JSON.stringify(playerSelection);
    socket.emit('cardVote', stringSelection);
  };

  const handleCardVote = (event) => {
    const key = event.target.getAttribute('data-key'); // Get the key from data-key attribute
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
    socket.emit('getstoryteller',message);
  }

  const startGame = () => {
    const messageCont = {
      room: currentRoom
    };
    const message = JSON.stringify(messageCont);
    socket.emit('startGame',message);
  }

  return (
    <div>
      {/* <h1>Welcome to Dixit</h1> */}
      {firstLog === true ?
        <UserInfoRoomSelection socket={socket} rooms={rooms} handlePlayer={setPlayerContext} />
        :
        <div>
          <h2>
            <div style={{ display: 'inline-block',width:'40px',height:'40px',backgroundColor:player.color }}/>
            {player.name}
          </h2>
          <div>
            <div>
              {/* <div>
                {messagesRes.map((message, index) => (
                  <div style={{ border: 'solid red 1px' }} key={index}>{message}</div>
                ))}
              </div> */}
              <StorytellerMessage key={storyTeller.name} storyteller={storyTeller} player={player}/>
              <Scoreboard messagesRes={messagesRes} singlePlayer={player}/>
              {!checkOwner && <VoteStatusMonitor voteStatus={voteStatus}/>}
              {checkOwner && <OwnerStatusMontior voteStatus={ownershipStatus}/>}
              {!checkStoryTeller && !checkOwner && buttons.map((key, index) => (
                <button
                  key={index}
                  data-key={index} // Set the data-key attribute
                  onClick={handleCardSelect} // No need to pass the key here
                >
                  Select Card {index}
                </button>
              ))}
              {checkOwner && buttons.map((key, index) => (
                <button
                  key={index}
                  data-key={index} // Set the data-key attribute
                  onClick={handleCardVote} // No need to pass the key here
                >
                  Vote Card {index}
                </button>
              ))}
              {enableScore && checkStoryTeller && <button
                onClick={handleScore} // No need to pass the key here
              >
                Get Score Update
              </button>}
              <button
                onClick={startGame} // No need to pass the key here
              >
                Start Game
              </button>
            </div>
            <div>
              {messages.map((message, index) => (
                <div key={index}>{message}</div>
              ))}
            </div>
          </div>
        </div>
      }

    </div>
  );
}

export default App;
