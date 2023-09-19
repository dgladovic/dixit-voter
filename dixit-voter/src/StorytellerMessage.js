import React, { useEffect, useState } from 'react';
import './StorytellerMessage.css'; // Import the CSS file

function StorytellerMessage({ key, storyteller, player }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    console.log('CHANGE',storyteller,player);
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
        <p>Tell a story!</p>
      ) : (
        <p>{storyteller.name} is telling a story</p>
      )}
    </div>
  );
}

export default StorytellerMessage;
