  import React, { useEffect, useState, useRef } from 'react';
  import io from 'socket.io-client';

  const socket = io('http://localhost:3000'); // Replace with your server's URL

  function App() {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [buttons, setButtons] = useState([]);
    const [player, setPlayer] = useState({});

    useEffect(() => {
      // Set a new player
      const Player = {
        id: '',
        name: `Djoka${Math.floor(Math.random()*10)}`,
        score: 0,
      }
      setPlayer(Player);
      console.log('once');
      socket.emit('joinSession', JSON.stringify(Player));
    }, []);

    useEffect(() => {
      // Listen for cards
      socket.on('cardList', (message) => {
        let newMess = JSON.parse(message);
        console.log('got it',message);
        setButtons(newMess);
      });
    }, [buttons]);

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
        player: player.name,
      };
      const stringSelection = JSON.stringify(playerSelection);
      socket.emit('cardVote', stringSelection);
    };

    const handleCardVote = (event) => {
      const key = event.target.getAttribute('data-key'); // Get the key from data-key attribute
      const playerSelection = {
        id: key,
        player: player.name,
      };
      const stringSelection = JSON.stringify(playerSelection);
      socket.emit('ownerVote', stringSelection);
    };

    const resetCards = () => {
      socket.emit('resetCards');
    }

    return (
      <div>
        <h1>Socket.IO Chat</h1>
        <div>
          <div>
            {/* <div>
              {buttons.map((button, index) => {
                return <div style={{ border: 'solid red 1px' }} key={index}>{button}</div>
              })
              }
            </div> */}
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
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
