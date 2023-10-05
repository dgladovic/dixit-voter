/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';

const CardListListener = ({socket, setDisplayedCards}) =>{

  useEffect(() => {
    // Listen for cards to render
    socket.on('cardList', (message) => {
      let newMess = JSON.parse(message);
      console.log(newMess,'socketo-cards');
      setDisplayedCards(newMess);
    });
  }, []);

  return null;

}

export default CardListListener;

  