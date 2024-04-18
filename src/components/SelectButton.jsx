import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { Input } from '@mui/material';

const SelectButton = ({ getSelectedTimeScale, fetchFromInput }) => {
  const [value, setValue] = useState('Semaine');

  const handleChange = (event) => {
    if (!isNaN(event.target.value)) {
      setValue('Jour');
      return;
    }
    setValue(event.target.value);
    getSelectedTimeScale(event.target.value);
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
          <MenuItem value={"Année"}>Année</MenuItem>
          <MenuItem value={"Jour"} style={{ display: 'none' }}>Jour</MenuItem>
          <InputLabel style={{ color: 'white', marginLeft: '15px' }}>Jour</InputLabel>
          <Input style={{marginLeft: '15px' }} type="text" onKeyDown={fetchFromInput} onChange={handleChange} />
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectButton;