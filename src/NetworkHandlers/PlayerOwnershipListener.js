/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';

const PlayerOwnershipListener = ({socket, setOwnershipStatus, setEnableScore}) =>{

  useEffect(() => {
    // Listen for players voting status
    socket.on('playerOwnershipStatus', (message) => {

      let allVoters = JSON.parse(message);
      let allVoted = true;
      setOwnershipStatus(allVoters);
      for (let i = 0; i < allVoters.length; i++) {
        let voter = allVoters[i];
        if (!voter.votedOwnership) {
          allVoted = false;
          setEnableScore(false);
          break;
        }
      }

      if (allVoted) {
        setEnableScore(true);
      }
    });

  }, []);

  return null;

}

export default PlayerOwnershipListener;

  