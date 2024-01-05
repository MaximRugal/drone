import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectAutoWidth() {
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id='demo-simple-select-autowidth-label'>Канал</InputLabel>
        <Select
          labelId='demo-simple-select-autowidth-label'
          id='demo-simple-select-autowidth'
          value={age}
          onChange={handleChange}
          autoWidth
          label='Канал'
        >
          <MenuItem value=''>
            <em>Не выбран</em>
          </MenuItem>
          <MenuItem value={1}>Канал 1</MenuItem>
          <MenuItem value={2}>Канал 2</MenuItem>
          <MenuItem value={3}>Канал 3</MenuItem>
          <MenuItem value={4}>Канал 4</MenuItem>
          <MenuItem value={5}>Канал 5</MenuItem>
          <MenuItem value={6}>Канал 6</MenuItem>
          <MenuItem value={7}>Канал 7</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
