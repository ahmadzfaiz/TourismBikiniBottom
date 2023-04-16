import React, {useState} from 'react';
import {Button, Typography} from '@mui/material';

function CustomCard() {
  const [btnColor, setBtnColor] = useState('error');
  return (
    <div>
      <div style={{border: '2px solid black', padding: '15px'}}>
        <Typography variant='h3'>
          This is the title
        </Typography>
        <Typography variant='body1'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
        <Button onClick={()=>setBtnColor('success')} color={btnColor} variant='contained' size='medium'>Go</Button>
      </div>
    </div>
  )
}

export default CustomCard
