/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';

const PlayerVoteListener = ({socket, setVoteStatus, setCheckOwner}) =>{

  useEffect(() => {
    // Listen for players voting status
    socket.on('playerVoteStatus', (message) => {

      let allVoters = JSON.parse(message);
      let allVoted = true;
      console.log(allVoters, 'testmeup ');
      setVoteStatus(allVoters);
      for (let i = 0; i < allVoters.length; i++) {
        let voter = allVoters[i];
        if (!voter.voted) {
          allVoted = false;
          setCheckOwner(false);
          break;
        }
      }

      if (allVoted) {
        setCheckOwner(true);
      }
    });

  }, []);

  return null;

}

export default PlayerVoteListener;

  