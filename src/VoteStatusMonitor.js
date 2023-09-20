import React, { useEffect, useState } from 'react';

function VoteStatusMonitor({ voteStatus }) {
  const [playersNotVoted, setPlayersNotVoted] = useState([]);

  useEffect(() => {
    // Filter players who haven't voted
    const notVotedPlayers = voteStatus.filter((player) => !player.voted);

    // Update the state with players who haven't voted
    setPlayersNotVoted(notVotedPlayers);
  }, [voteStatus]);

  return (
    <div>
      <h3>Players Who Haven't Voted:</h3>
      <ul>
        {playersNotVoted.map((player) => (
          <li
            key={player.name}
            style={{
              backgroundColor: player.color,
              padding: '8px',
              margin: '4px',
              listStyle: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>{player.name}</span>
            <div
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: player.color,
                borderRadius: '50%',
              }}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VoteStatusMonitor;
