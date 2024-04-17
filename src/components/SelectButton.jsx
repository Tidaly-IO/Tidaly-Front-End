import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

const SelectButton = ({ updateFromChild }) => {
  const [value, setValue] = useState('Semaine');

  const handleChange = (event) => {
    const newValue = event.target.value;

    setValue(newValue);
    updateFromChild(newValue);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Temps</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Temps"
          onChange={handleChange}
        >
          <MenuItem value={"Semaine"}>Semaine</MenuItem>
          <MenuItem value={"Mois"}>Mois</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectButton;