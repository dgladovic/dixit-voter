/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';

const StoryTellerListener = ({socket, setStoryteller, setShowStartGame, setCheckStoryTeller, storyTeller, player}) =>{

  useEffect(() => {
    // Listen for storyteller update
    socket.on('storyteller', (message) => {
      let newStoryteller = JSON.parse(message);
      console.log('storyteller',newStoryteller);
      setStoryteller(newStoryteller);
      setShowStartGame(false);
    });
  }, []);

  useEffect(() => {
    // Listen for storyteller update
      if (storyTeller.name === player.name) {
        setCheckStoryTeller(true);
      }
      else {
        setCheckStoryTeller(false);
      }
  }, [storyTeller.name]);

  return null;

}

export default StoryTellerListener;

  