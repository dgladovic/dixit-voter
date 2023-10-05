import {useEffect} from 'react';

const RoomListListener = ({socket, setRooms}) =>{

  useEffect(() => {
    // Update the list of rooms whenever it changes
    socket.on('roomList', (updatedRooms) => {
      console.log(updatedRooms, 'hejo');
      setRooms(JSON.parse(updatedRooms));
    });
  }, []);

  return null;

}

export default RoomListListener;

  