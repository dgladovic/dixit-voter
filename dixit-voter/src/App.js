import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Replace with your server's URL

function App() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    // Set a new player
    const Player = {
      id: '',
      name:'Djoka',
      score: 0
    }
    console.log(Player);
    socket.emit('joinSession',JSON.stringify(Player));
  }, []);

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on('message', (message) => {
      JSON.parse(message);
      setMessages([...messages, message]);
    });
  }, [messages]);

  const handleSendMessage = () => {
    // Send a message to the server
    socket.emit('message', messageInput);
    setMessageInput('');
  };

  const handleCardSelect = (event) => {
    const key = event.target.getAttribute('data-key'); // Get the key from data-key attribute
    const playerSelection = {
      id: key,
      player: `Djoka`,
      touched: 'yes'
    };
    const stringSelection = JSON.stringify(playerSelection);
    socket.emit('cardVote', stringSelection);
  };

  const handleCardVote = (event) => {
    const key = event.target.getAttribute('data-key'); // Get the key from data-key attribute
    const playerSelection = {
      id: key,
      player: `Djoka`,
      touched: 'yes'
    };
    const stringSelection = JSON.stringify(playerSelection);
    socket.emit('ownerVote', stringSelection);
  };

  // An array of unique keys for the buttons
  const buttonKeys = ['1', '2', '3', '4'];

  return (
    <div>
      <h1>Socket.IO Chat</h1>
      <div>
        <div>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
          {buttonKeys.map((key, index) => (
            <button
              key={key}
              data-key={key} // Set the data-key attribute
              onClick={handleCardSelect} // No need to pass the key here
            >
              Select Card {key}
            </button>
          ))}
          {buttonKeys.map((key, index) => (
            <button
              key={key}
              data-key={key} // Set the data-key attribute
              onClick={handleCardVote} // No need to pass the key here
            >
              Vote Card {key}
            </button>
          ))}
        </div>
        <div>
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
