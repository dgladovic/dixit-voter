import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import UserInfoRoomSelection from './UserInfoRoomSelection';

const socket = io('http://localhost:3000'); // Replace with your server's URL

function App() {
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messagesRes, setMessagesRes] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [buttons, setButtons] = useState([]);
  const [player, setPlayer] = useState({});
  const [currentRoom, setCurrentRoom] = useState('');
  const [firstLog, setFirstLog] = useState(true);

  const setPlayerContext = (data) => {
    setCurrentRoom(data.roomName);
    const Player = {
      id: '',
      name: data.playerName,
      score: 0,
    }
    setPlayer(Player);
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
    // Listen for scoring update
    socket.on('messageRes', (message) => {
      JSON.parse(message);
      console.log('scores', message);
      setMessagesRes([message]);
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
  }

  const resetCards = () => {
    socket.emit('resetCards', currentRoom);
  }

  return (
    <div>
      <h1>Socket.IO Chat</h1>
      {firstLog === true ?
        <UserInfoRoomSelection socket={socket} rooms={rooms} handlePlayer={setPlayerContext} />
        :
        <div>
          <h2>{player.name}</h2>
          <div>
            <div>
              <div>
                {messagesRes.map((message, index) => (
                  <div style={{ border: 'solid red 1px' }} key={index}>{message}</div>
                ))}
              </div>
              {buttons.map((key, index) => (
                <button
                  key={index}
                  data-key={index} // Set the data-key attribute
                  onClick={handleCardSelect} // No need to pass the key here
                >
                  Select Card {index}
                </button>
              ))}
              {buttons.map((key, index) => (
                <button
                  key={index}
                  data-key={index} // Set the data-key attribute
                  onClick={handleCardVote} // No need to pass the key here
                >
                  Vote Card {index}
                </button>
              ))}
              <button
                onClick={resetCards} // No need to pass the key here
              >
                Reset Cards
              </button>
              <button
                onClick={handleScore} // No need to pass the key here
              >
                Get Score Update
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
