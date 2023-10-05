/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';

const RoomNotFoundListener = ({socket, setFirstLog, setSaveSession}) =>{

useEffect(() => {
    // Update the list of rooms whenever it changes
    socket.on('roomNotFound', (message) => {
      console.log(message, 'roomNotFound');
      sessionStorage.removeItem("sessionID");
      setFirstLog(true);
      setSaveSession(true);
    });
  }, []);

  return null;

}

export default RoomNotFoundListener;

  