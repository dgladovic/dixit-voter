/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';

const WinnerListener = ({socket, setWinner}) =>{

  useEffect(() => {
    // Listen for cards to render
    socket.on('winner', (message) => {
      let newMess = JSON.parse(message);
      console.log(newMess,'winner');
      setWinner(newMess);
    });
  }, []);

  return null;

}

export default WinnerListener;

  