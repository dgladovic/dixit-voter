import { Typography } from '@mui/material';
import React, { useState } from 'react';
import './DixitCard.css'; // Import the CSS file

function DixitCard({key, checkClick, id}) {

  const [selected, setSelected] = useState(false);
  const cardStyle = {
    width: '100px',
    height: '150px',
    // backgroundImage: "dixit-back.png", // Replace with your card image URL
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer',
    border: selected ? '2px solid #ff0000' : '2px solid transparent', // Add a border when selected
    borderRadius: '8px',
    display:'flex', 
    justifyContent:'center', 
    alignItems:'flex-end'
  };

  const customTypographyStyle = {
    // Add a black outline with white fill
    textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000',
    color: 'white', // Set the text fill color to white
    marginBottom:'6px'
  };

  const handleClick = () => {
    setSelected(true);
    checkClick();
  };

  return (
    <div
      className="dixit-card"
      style={cardStyle}
      onClick={handleClick}
    >
      <Typography variant='h4' style={customTypographyStyle}> {id}</Typography>
    </div>
  );
}

export default DixitCard;
