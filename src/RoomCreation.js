import React, { useState } from 'react';
import {
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
} from '@mui/material';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';

const RoomCreation = ({handleAddNewRoom}) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [newRoomNameForm, setNewRoomNameForm] = useState('');
  const [roundNumber, setRoundNumber] = useState(8);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);

  const [value, setValue] = useState('standard');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleConfirmClick = ()=>{
    console.log('confirm');
    handleAddNewRoom(newRoomNameForm);
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
        <TextField
          style={{ width: '100%' }}
          label="Room Name"
          variant="filled"
          value={newRoomNameForm}
          onChange={(e) => setNewRoomNameForm(e.target.value)}
        />

        <FormControl style={{marginTop:'8px',marginBottom:'8px'}}>
          <FormLabel id="demo-controlled-radio-buttons-group">Game mode</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            style={{marginLeft:'16px'}}
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="standard" control={<Radio />} label="Standard" />
            <FormControlLabel value="timed" control={<Radio />} label="Timed" />
          </RadioGroup>
        </FormControl>

        {value === 'timed' &&
          <TextField
            style={{ width: '100%', marginBottom:'20px' }}
            label="Round number"
            variant="filled"
            value={roundNumber}
            onChange={(e) => setRoundNumber(e.target.value)}
          />
        }

        <Button
          style={{ width: '60%', color: 'white', backgroundColor: 'black', height: '50px', margin:'auto', marginTop: '0px' }}
          variant="contained"
          // color="primary"
          onClick={handleConfirmClick}
        >
          Confirm
        </Button>


      </div>
    </div>
  );
};

export default RoomCreation;
