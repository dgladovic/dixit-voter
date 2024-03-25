/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';

const AchievementListener = ({socket, setAchievements}) =>{

  useEffect(() => {
    // Listen for cards to render
    socket.on('achievements', (message) => {
      let newMess = JSON.parse(message);
      console.log(newMess,'achievements');
      setAchievements(newMess);
    });
  }, []);

  return null;

}

export default AchievementListener;

  