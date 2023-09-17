// UserInfoRoomSelection.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';

const UserInfoRoomSelection = ({ socket, rooms, handlePlayer }) => {
  const [name, setName] = useState('');
  const [selectedPicture, setSelectedPicture] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [newRoomName, setNewRoomName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userPictures = [
    { label: 'Avatar 1', value: 'avatar1.jpg' },
    { label: 'Avatar 2', value: 'avatar2.jpg' },
    // Add more predefined avatars here
  ];

  const playerColors = [
    { label: 'Light Purple', value: 'rgb(155,84,131)' },
    { label: 'Light Orange', value: 'rgb(238,99,68)' },
    { label: 'Brown', value: 'rgb(81,62,42)' },
    { label: 'White', value: 'rgb(232,235,232)' },
    { label: 'Blue', value: 'rgb(78,109,163)' },
    { label: 'Gray', value: 'rgb(156,157,147)' },
    { label: 'Light Orange', value: 'rgb(238,99,68)' },
    { label: 'Lime', value: 'rgb(178,203,71)' },
    { label: 'Purple', value: 'rgb(119,57,112)' },
    { label: 'Yellow', value: 'rgb(238,198,32)' },
    { label: 'Dark Gray', value: 'rgb(168,68,65)' },
    { label: 'Green', value: 'rgb(87,144,74)' },
  ];

//   useEffect(() => {
//   }, [rooms]);

  const handleAddRoom = () => {
    // Send a request to the server to create a new room
    socket.emit('createRoom', newRoomName);

    // Close the modal
    setIsModalOpen(false);

    // Clear the new room name input
    setNewRoomName('');
  };

  return (
    <div>
      <h2>User Information</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <h2>Select a Picture</h2>
      <Select
        options={userPictures}
        onChange={(selectedOption) => setSelectedPicture(selectedOption.value)}
        value={selectedPicture}
        isSearchable={false}
      />

      <h2>Select a Color</h2>
      <Select
        options={playerColors}
        onChange={(selectedOption) => setSelectedColor(selectedOption.value)}
        value={selectedColor}
        isSearchable={false}
      />

      <h2>Select a Room</h2>
      <Select
        options={rooms.map((room) => ({ label: room.name, value: room.name }))}
        onChange={(selectedOption) => setSelectedRoom(selectedOption)}
        value={selectedRoom}
      />

      <button onClick={() => setIsModalOpen(true)}>Add Room</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <h2>Create a New Room</h2>
        <input
          type="text"
          placeholder="Room Name"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
        />
        <button onClick={handleAddRoom}>Add</button>
      </Modal>

      <button
        onClick={() => {
          // Join the selected room when the user clicks "Join Room"
          if (selectedRoom) {
            const messageContent = {
                playerName: name,
                roomName: selectedRoom.value,
                color: selectedColor
            }
            const message = JSON.stringify(messageContent);
            handlePlayer(messageContent);
            // socket.emit('joinRoom', message);
          }
        }}
      >
        Join Room
      </button>
    </div>
  );
};

export default UserInfoRoomSelection;
