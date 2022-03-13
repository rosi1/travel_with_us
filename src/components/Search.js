import React, { useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/system';
import axios from 'axios';
import { AppContext } from '../App';

import './Hotels.css';

const Search = (props) => {

    const divStyle = {
        margin:100,
        width: '100%'
    }
    const [cities, setCities]= useState([]);
    const {text,setText, inputValue, setInputValue} = useContext(AppContext);
  

    useEffect(async() => {
      if(text.length>=1){
        setCities([{city: 'Loading...'}]);
        let res = await axios.get(`http://localhost:3002/cities/${text}`)
        setCities(res.data);
      }
      else{
        setCities([]);
      }
  },[text]);

  return (
      <div>
         
          <Stack spacing={2}>
        <Autocomplete
          id="city-select"
          sx={{ width: 270}}
          options={cities}
          autoHighlight
          getOptionLabel={(option) => option.city}
          renderOption={(props, option) => (
            <Box component="li" sx={{ mr: 2, flexShrink: 0  }} {...props } >
              {option.city}
            </Box>
          )}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField 
              {...params}
              onChange={(e)=>setText(e.target.value)}
              label ="Choose a city..."
            />
          )}
        />
      </Stack>
      </div>
  );
};

export default Search;
