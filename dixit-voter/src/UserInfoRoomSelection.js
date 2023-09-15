// UserInfoRoomSelection.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';

const UserInfoRoomSelection = ({ socket, rooms, handlePlayer }) => {
  const [name, setName] = useState('');
  const [selectedPicture, setSelectedPicture] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [newRoomName, setNewRoomName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userPictures = [
    { label: 'Avatar 1', value: 'avatar1.jpg' },
    { label: 'Avatar 2', value: 'avatar2.jpg' },
    // Add more predefined avatars here
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
                roomName: selectedRoom.value
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
