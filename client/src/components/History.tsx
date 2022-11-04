import React from 'react';
import { useAtom } from 'jotai'
import { historyAtom } from '../store';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

export const History = () => {
  const [history, setHistory] = useAtom(historyAtom);

  return (
    <Box sx={{ bgcolor: '#a6baca', width: '100%', minHeight: '30vh', display: 'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'center'}} mt={2} px={3} py={2} >
      <div style={{display:'flex', flexDirection:'column', gap:4, width:'100%', marginBottom:15}}>
        {history.length > 0 ? history.map(item => {
          return (
            <Paper elevation={3} sx={{paddingRight: 1, paddingLeft:1, backgroundColor: '#cfe8fc'}} key={item?.keyProp}>
              <div>Post code: {item?.postCode}</div>
              <div>City: {item?.placeName}</div>
              <div>State: {item?.state}</div>
            </Paper>
          )
        }) : <div style={{textAlign:'center'}}>No history!</div>}
      </div>
      {history.length > 0 && <Button variant="contained" color='info' onClick={() => setHistory([])}>Clear history</Button>}
    </Box>
  )
}