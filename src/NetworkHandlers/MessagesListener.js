import {useEffect} from 'react';

const MessagesListener= ({socket, setMessages, messages}) =>{

useEffect(() => {
    // Update the list of rooms whenever it changes
    socket.on('message', (message) => {
      JSON.parse(message);
      console.log('message', JSON.parse(message))
      setMessages([...messages, message]);
    });
  }, []);

  return null;

}

export default MessagesListener;

  