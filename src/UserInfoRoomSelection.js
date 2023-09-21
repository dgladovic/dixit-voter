import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select
} from '@mui/material';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';

const UserInfoRoomSelection = ({ socket, rooms, handlePlayer }) => {
  const [name, setName] = useState('');
  const [selectedPicture, setSelectedPicture] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [newRoomName, setNewRoomName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);

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
    { label: 'Lime', value: 'rgb(178,203,71)' },
    { label: 'Purple', value: 'rgb(119,57,112)' },
    { label: 'Yellow', value: 'rgb(238,198,32)' },
    { label: 'Dark Gray', value: 'rgb(168,68,65)' },
    { label: 'Green', value: 'rgb(87,144,74)' },
  ];

  const exampleAvatars = [
    'avatar1.jpg',
    'avatar2.jpg',
    // Add more example avatars here
  ];

  const handleAddRoom = () => {
    setIsAddRoomOpen(true);
  };

  const handleAvatarClick = (avatar) => {
    setSelectedPicture(avatar);
    setSelectedColor(''); // Reset color selection
    setIsAvatarDialogOpen(false);
  };

  const handleConfirmClick = () => {
    if (name && selectedColor) {
      console.log(socket);
      socket.auth = { name };
      socket.connect();
      console.log(socket);
      setIsDialogOpen(true);
    }
  };

  const handleAddNewRoom = () => {
    socket.emit('createRoom', newRoomName);
    if (newRoomName) {
      const messageContent = {
        playerName: name,
        roomName: newRoomName,
        color: selectedColor,
      };
      const message = JSON.stringify(messageContent);
      handlePlayer(messageContent);
      setIsAddRoomOpen(false);
      socket.emit('joinRoom', message);
    }
  };

  const joinRoom = (room) => {
    console.log(room, 'sobica');
    if (room) {
      const messageContent = {
        playerName: name,
        roomName: room,
        color: selectedColor,
      };
      const message = JSON.stringify(messageContent);
      handlePlayer(messageContent);
      setIsAddRoomOpen(false);
      socket.emit('joinRoom', message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card style={{ backgroundColor: selectedColor, width: '90%', maxWidth: '400px' }}>
        <CardHeader
          title={
            <TextField
              label="Your Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          }
          avatar={
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => setIsAvatarDialogOpen(true)}
            >
              <Avatar src={selectedPicture} alt="Avatar" />
            </div>
          }
        />
        <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Select
            placeholder="Pick a color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            style={{ width: '100%' }}
          >
            {playerColors.map((colorOption) => (
              <MenuItem key={colorOption.value} value={colorOption.value}>
                {colorOption.label}
              </MenuItem>
            ))}
          </Select>

          <Button
            style={{ width: '60%', marginTop: '16px' }}
            variant="contained"
            color="primary"
            onClick={handleConfirmClick}
          >
            Confirm
          </Button>

          <Dialog
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
          >
            <DialogTitle>Selec a room to join</DialogTitle>
            <DialogContent>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  style={{ width: '70%' }}
                  label="Room Name"
                  variant="outlined"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                />
                <div
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  onClick={handleAddNewRoom}
                >
                  <AddCircleOutline

                    variant="contained"
                    color="primary"
                  >
                  </AddCircleOutline>
                  Add

                </div>
              </div>

              <List>
                {rooms.map((room) => (
                  <ListItem
                    key={room.name}
                    button
                    onClick={() => {
                      joinRoom(room.name);
                      setIsDialogOpen(false);
                    }}
                  >
                    <ListItemText primary={room.name} />
                  </ListItem>
                ))}
              </List>
            </DialogContent>
          </Dialog>

          <Dialog
            open={isAvatarDialogOpen}
            onClose={() => setIsAvatarDialogOpen(false)}
          >
            <DialogTitle>Select an Avatar</DialogTitle>
            <DialogContent>
              <List>
                {exampleAvatars.map((avatar) => (
                  <ListItem
                    key={avatar}
                    button
                    onClick={() => handleAvatarClick(avatar)}
                  >
                    <Avatar src={avatar} alt="Avatar" />
                  </ListItem>
                ))}
              </List>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserInfoRoomSelection;
