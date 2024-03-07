import React, { useEffect, useState } from 'react';
import './TransitionMessage.css'; // Import the CSS file

function TransitionMessage({ }) {
  const [isVisible, setIsVisible] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsVisible(false);
  //   }, 1500);

  //   return () => {
  //     clearTimeout(timer);
  //     setIsVisible(true);
  //   }
  // }, [key]);

  // if (!isVisible) {
  //   return null;
  // }

  return (
    <div className="transition-message">
        <div style={{ display:'flex', flexDirection: 'column'}}>
          <div className='title' >
            <span id="capitalS" style={{ fontFamily: 'Dilana', fontSize: '36px', textTransform: 'capitalize' }}>O</span>
            <span id="capitalS-rest" style={{ fontFamily: 'Dilana', fontSize: '28px' }}>wnership</span>
          </div>
          <span style={{ display: 'inline-block', margin: 'auto', alignSelf:'center', textOverflow:'clip', whiteSpace:'break-spaces' }}>Select the position of the card that you placed</span>
        </div>
    </div>
  );
}

export default TransitionMessage;

