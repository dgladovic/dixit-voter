import React, { useEffect, useState } from 'react';
import './StorytellerMessage.css'; // Import the CSS file

function StorytellerMessage({ key, storyteller, player }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
      setIsVisible(true);
    }
  }, [storyteller]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="storyteller-message">
      {player.name === storyteller.name ? (
        <div>
          <span style={{ display: 'inline-block', margin: 'auto' }}>Tell a</span>
          <span id="capitalS" style={{ fontFamily: 'Dilana', fontSize: '36px', textTransform: 'capitalize', marginLeft: '6px' }}>S</span>
          <span style={{ display: 'inline-block', margin: 'auto', color: 'rgb(228,213,116)', fontFamily: 'Dilana', fontSize: '32px', }}>tory</span>
        </div>
      ) : storyteller.name && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
            <span id="capitalS" style={{ fontFamily: 'Dilana', fontSize: '36px', textTransform: 'capitalize' }}>{storyteller.name[0]}</span>
            <span id="capitalS-rest" style={{ fontFamily: 'Dilana', fontSize: '28px' }}>{storyteller.name.slice(1)}</span>
          </div>
          <span style={{ display: 'inline-block', margin: 'auto' }}>Is telling a story</span>
        </div>
      )}
    </div>
  );
}

export default StorytellerMessage;

