/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';

const ScoreUpdateListener = ({socket, setScoresUpdate, updateSession}) =>{

  useEffect(() => {
    // Listen for scoring update
    socket.on('scoreUpdate', (message) => {
      let result = JSON.parse(message);
      console.log('scoreUpdate',result);
      setScoresUpdate(result.players);

      // let njuark = result.players.filter((singlePlayer) => singlePlayer.name === socket.name);
      // socket.userScore = njuark[0].score;
      // updateSession(result.roomName);

      // update session ! on socket.userScore for this player
    });
  }, []);

  return null;

}

export default ScoreUpdateListener;

  