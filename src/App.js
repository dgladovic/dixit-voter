import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import UserInfoRoomSelection from './UserInfoRoomSelection';
import VoteStatusMonitor from './VoteStatusMonitor';
import OwnerStatusMontior from './OwnerStatusMonitor';
import Scoreboard from './Scoreboard';
import StorytellerMessage from './StorytellerMessage';
import DixitCard from './DixitCard';
import { Grid, Button, Box } from '@mui/material';
import PlayerBanner from './PlayerBanner';
import logo from './dixit-logo.png';

console.log(process.env.REACT_APP_API_URL);

const socket = io(process.env.REACT_APP_API_URL,
  { autoConnect: false }
);

function App() {
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messagesRes, setMessagesRes] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [player, setPlayer] = useState({});
  const [storyTeller, setStoryteller] = useState({});
  const [currentRoom, setCurrentRoom] = useState('');
  const [firstLog, setFirstLog] = useState(true);
  const [voteStatus, setVoteStatus] = useState([]);
  const [ownershipStatus, setOwnershipStatus] = useState([]);
  const [connected,setConnected] = useState(false);
  const [saveSession,setSaveSession] = useState(true);



  const [checkOwner, setCheckOwner] = useState(false);
  const [checkStoryTeller, setCheckStoryTeller] = useState(false);
  const [enableScore, setEnableScore] = useState(false);
  const [showStartGame, setShowStartGame] = useState(true);
  // proverava da li su svi glasali, ukoliko jesu, onda se moze raditi glasanje za kartu

  const setPlayerContext = (data) => {

    // data
    // playerName: name,
    // roomName: room,
    // color: selectedColor,

    setCurrentRoom(data.roomName);
    const Player = {
      id: '',
      name: data.playerName,
      score: 0,
      color: data.color
    }
    setPlayer(Player);
    setFirstLog(false);
    socket.emit('joinRoom', JSON.stringify(data));
  }

  useEffect(() => {
    const sessionID = localStorage.getItem("sessionID");
    if(sessionID){
      console.log('hej',sessionID);
      // setFirstLog(false);
      socket.auth = {sessionID};
      socket.connect();
      // kada se konektuje na socket sa vec sacuvanim session id radi se
      // na serveru socket.emit(session)
      // i onda se pokrece useEffect ispod ovoga

    }
  }, []);

  useEffect(() => {
    // Listen for session update
    socket.on('session', ({ sessionID, userID, userScore, name, roomName }) => {
      console.log(socket,'socketo-sesija');
      socket.auth = {sessionID};
      socket.userID = userID;
      socket.userScore = userScore;
      socket.name = name;
      socket.roomName = roomName;
      console.log(socket,'socketo-sesija-nakondodele');
      // sa servera preko session kanala dobija podatke o sesiji
      // ti podaci se stavljaju na socket konekciju
      // i zatim se proverava, ukoliko socket ima roomName, znaci da je vec bio u sobi 
      if(roomName){
        console.log(socket,'socketo');
        setFirstLog(false);
        setSaveSession(false);
        // nema potrebe da se bira soba, direktno ga vraca u igru
        let reconnectionObj = {
          playerName: socket.name,
          roomName: socket.roomName,
          reconnect: 'yes'
        }
        socket.emit('joinRoom', JSON.stringify(reconnectionObj));
        setCurrentRoom(socket.roomName);
        const Player = {
          id: '',
          name: socket.name,
          score: socket.userScore,
          // color: data.color
        }
        setPlayer(Player);
      }
    });
  }, []);

  useEffect(() => {
    // Listen for session update
    socket.on('session', ({ sessionID, userID, userScore, name, roomName }) => {
      if(saveSession){
        socket.auth = {sessionID};
        localStorage.setItem("sessionID",sessionID);
        socket.userID = userID;
        socket.userScore = userScore;
        socket.name = name;
        socket.roomName = roomName;
        // sa servera preko session kanala dobija podatke o sesiji
        // ti podaci se stavljaju na socket konekciju
        // i zatim se proverava, ukoliko socket ima roomName, znaci da je vec bio u sobi 
      }
      setSaveSession(false);
    });
  }, []);

  useEffect(() => {
    // Listen for cards to render
    socket.on('cardList', (message) => {
      let newMess = JSON.parse(message);
      console.log(newMess,'socketo-cards');
      setButtons(newMess);
    });
  }, []);

  useEffect(() => {
    // Listen for cards state update
    socket.on('message', (message) => {
      JSON.parse(message);
      console.log('message', JSON.parse(message))
      setMessages([...messages, message]);
    });
  }, []);

  useEffect(() => {
    // Listen for storyteller update
    socket.on('storyteller', (message) => {
      let newStoryteller = JSON.parse(message);
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

  useEffect(() => {
    // Listen for scoring update
    socket.on('messageRes', (message) => {
      let result = JSON.parse(message);
      setMessagesRes(result.players);
      let njuark = result.players.filter((singlePlayer) => singlePlayer.name === socket.name);
      socket.userScore = njuark[0].score;
      updateSession(result.roomName);
      // update session ! on socket.userScore for this player
    });
  }, []);

  useEffect(() => {
    // Update the list of rooms whenever it changes
    socket.on('roomList', (updatedRooms) => {
      console.log(updatedRooms, 'hejo');
      setRooms(JSON.parse(updatedRooms));
    });
  }, []);

  const updateSession = (room) =>{
    const session = {
      sessionID: socket.sessionID,    // id uredjaja - sesije
      userID: socket.userID,          // javni id playera
      userScore: socket.userScore,
      name: socket.name,
      roomName: room
    }
    socket.emit('updateSession', JSON.stringify(session));
    let PlayerUpdate = {
      name: socket.name,
      score: socket.userScore,
      color: player.color,
      id: player.id
    }
    setPlayer(PlayerUpdate);
  }

  const handleCardSelect = (event) => {
    const key = event; // Get the key from data-key attribute
    const playerSelection = {
      id: key,
      player: player.name,
      room: currentRoom
    };
    const stringSelection = JSON.stringify(playerSelection);
    socket.emit('cardVote', stringSelection);
  };

  const handleCardVote = (event) => {
    const key = event; // Get the key from data-key attribute
    const playerSelection = {
      id: key,
      player: player.name,
      room: currentRoom
    };
    const stringSelection = JSON.stringify(playerSelection);
    socket.emit('ownerVote', stringSelection);
  };

  const handleScore = () => {
    const objValue = { ...player, room: currentRoom }
    const storyTeller = JSON.stringify(objValue);
    console.log(storyTeller);
    socket.emit('votingResults', storyTeller);
    socket.emit('resetCards', currentRoom);
    const messageCont = {
      room: currentRoom
    };
    const message = JSON.stringify(messageCont);
    socket.emit('getstoryteller', message);
  }

  const startGame = () => {
    const messageCont = {
      room: currentRoom
    };
    const message = JSON.stringify(messageCont);
    socket.emit('startGame', message);
  }

  return (
    <div>
      {firstLog === true ?
        <div style={{ padding: '8px', background: 'linear-gradient(166deg, rgba(255,152,0,1) 0%, rgba(254,248,128,1) 100%)', height:'100vh' }}>
          <img src={logo} style={{width:'80%', margin: 'auto', display:'block', marginTop:'4px', marginBottom:'8px',maxWidth:'200px'}}/>
          <UserInfoRoomSelection socket={socket} rooms={rooms} handlePlayer={setPlayerContext} />
        </div>
        :
        <div style={{ padding: '8px' }}>
          <PlayerBanner player={player} />
          <div>
            <div>
              {/* <div>
                {messagesRes.map((message, index) => (
                  <div style={{ border: 'solid red 1px' }} key={index}>{message}</div>
                ))}
              </div> */}
              <StorytellerMessage key={storyTeller.name} storyteller={storyTeller} player={player} />
              <Scoreboard messagesRes={messagesRes} singlePlayer={player} />


              <Grid container spacing={2} padding={1} style={{maxHeight:'400px', overflow:'scroll'}}>
                {!checkStoryTeller && !checkOwner && buttons.map((key, index) => (
                  <Grid item xs={4} key={index}>
                    <DixitCard
                      key={index}
                      id={index} // Set the data-key attribute
                      checkClick={() => handleCardSelect(index)} // No need to pass the key here
                    />
                  </Grid>
                ))}
              </Grid>

              <Grid container spacing={2} padding={1}>
                {checkOwner && buttons.map((key, index) => (
                  <Grid item xs={4} key={index}>
                    <DixitCard
                      key={index}
                      id={index} // Set the data-key attribute
                      checkClick={() => handleCardVote(index)} // No need to pass the key here
                    />
                  </Grid>
                ))}
              </Grid>

              {enableScore && checkStoryTeller && <Button
                onClick={handleScore} // No need to pass the key here
                style={{width:'100%', height:'50px', marginTop:'16px'}}
                variant="contained"
                color="primary"
              >
                Get Score Update
              </Button>}
              {showStartGame && (
                <Box display="flex" justifyContent="center" marginTop="16px">
                  <Button
                    className="startgame"
                    onClick={startGame}
                    variant="contained"
                    color="primary"
                    style={{
                      position: 'absolute', // Set absolute positioning
                      left: '50%', // Center horizontally
                      top: '50%', // Center vertically
                      transform: 'translate(-50%, -50%)', // Center both horizontally and vertically
                      width: '200px',
                      height: '50px',
                      borderRadius: '50px',
                    }}
                  >
                    Start Game
                  </Button>
                </Box>
              )}
            </div>
            {!checkOwner && <VoteStatusMonitor voteStatus={voteStatus} />}
            {checkOwner && <OwnerStatusMontior voteStatus={ownershipStatus} />}
            {/* <div>
              {messages.map((message, index) => (
                <div key={index}>{message}</div>
              ))}
            </div> */}
          </div>
        </div>
      }

    </div>
  );
}

export default App;
