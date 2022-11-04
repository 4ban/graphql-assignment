import React from 'react';
import { useAtom } from 'jotai'
import { countries } from '../config'
import { countryAtom, postCodeAtom } from '../store'

import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';


export const Form = () => {
  const [country, setCountry] = useAtom(countryAtom)
  const [postCode, setPostCode] = useAtom(postCodeAtom)

  const handleCountryChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
    setPostCode('');
  };

  const handlePostCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostCode(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: '100%' }} >
      <InputLabel id="demo-select-small">Country</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={country}
        label="Country"
        onChange={handleCountryChange}
        sx={{marginBottom: 2}}
      >
        {Object.entries(countries).map(([key, value]) => (
            <MenuItem
              key={`${key}-${value}`}
              value={value}
            >
              {key}
            </MenuItem>
          ))}
      </Select>
      <TextField fullWidth id="standard-basic" label="Postal code" variant="standard" onChange={handlePostCodeChange} value={postCode} />
    </FormControl>
  )
}