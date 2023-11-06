import React, { useEffect, useState } from 'react';
import './TransitionMessage.css'; // Import the CSS file

function TransitionMessage({ key }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
      setIsVisible(true);
    }
  }, [key]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="transition-message">
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
            <span id="capitalS" style={{ fontFamily: 'Dilana', fontSize: '36px', textTransform: 'capitalize' }}>O</span>
            <span id="capitalS-rest" style={{ fontFamily: 'Dilana', fontSize: '28px' }}>wnership</span>
          </div>
          <span style={{ display: 'inline-block', margin: 'auto' }}>Select the position of your card</span>
        </div>
    </div>
  );
}

export default TransitionMessage;

