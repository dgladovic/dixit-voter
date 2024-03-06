/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';

const SessionController = ({socket, setFirstLog, setSaveSession, setCurrentRoom, setPlayer, saveSession}) =>{

  // useEffect(() => {
  //   const sessionID = sessionStorage.getItem("sessionID");
  //   if(sessionID){
  //     console.log('hej',sessionID);
  //     // setFirstLog(false);
  //     socket.auth = {sessionID};
  //     socket.connect();
  //     // kada se konektuje na socket sa vec sacuvanim session id radi se
  //     // na serveru socket.emit(session)
  //     // i onda se pokrece useEffect ispod ovoga
  //   }
  // }, []);

  // useEffect(() => {
  //   // Listen for session update
  //   socket.on('session', ({ sessionID, userID, userScore, name, roomName, color }) => {
  //     console.log(socket,'socketo-sesija');
  //     socket.auth = {sessionID};
  //     socket.userID = userID;
  //     socket.userScore = userScore;
  //     socket.name = name;
  //     socket.roomName = roomName;
  //     socket.color = color;
  //     console.log(socket,'socketo-sesija-nakondodele');
  //     // sa servera preko session kanala dobija podatke o sesiji
  //     // ti podaci se stavljaju na socket konekciju
  //     // i zatim se proverava, ukoliko socket ima roomName, znaci da je vec bio u sobi 
  //     if(roomName){
  //       console.log(socket,'socketo');
  //       setFirstLog(false);
  //       setSaveSession(false);
  //       // nema potrebe da se bira soba, direktno ga vraca u igru
  //       let reconnectionObj = {
  //         playerName: socket.name,
  //         roomName: socket.roomName,
  //         reconnect: 'yes'
  //       }
  //       socket.emit('joinRoom', JSON.stringify(reconnectionObj));
  //       setCurrentRoom(socket.roomName);
  //       const Player = {
  //         id: '',
  //         name: socket.name,
  //         score: socket.userScore,
  //         color: socket.color
  //       }
  //       setPlayer(Player);
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   // Listen for session update
  //   socket.on('session', ({ sessionID, userID, userScore, name, roomName, color }) => {
  //     if(saveSession){
  //       socket.auth = {sessionID};
  //       sessionStorage.setItem("sessionID",sessionID);
  //       socket.userID = userID;
  //       socket.userScore = userScore;
  //       socket.name = name;
  //       socket.roomName = roomName;
  //       socket.color = color;
  //       // sa servera preko session kanala dobija podatke o sesiji
  //       // ti podaci se stavljaju na socket konekciju
  //       // i zatim se proverava, ukoliko socket ima roomName, znaci da je vec bio u sobi 
  //     }
  //     setSaveSession(false);
  //   });
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return null;

}

export default SessionController;

  