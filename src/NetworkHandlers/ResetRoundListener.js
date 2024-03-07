/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';

const ResetRoundListener = ({socket, setEnableScore, setCheckOwner}) =>{

  useEffect(() => {
    // Listen for cards to render
    socket.on('resetRound', (message) => {
      console.log('we-reset',message)
      setEnableScore(false);
      setCheckOwner(false);
    });
  }, []);

  return null;

}

export default ResetRoundListener;

  