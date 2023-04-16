import React from 'react'
import {useNavigate} from 'react-router-dom'

// MUI Imports
import {AppBar, Toolbar, Typography, Button} from '@mui/material';

const style = {
  propertyBtn: {
    backgroundColor: 'orange', 
    color: 'white', 
    width: '15rem',
    fontSize: '1.1rem',
    marginRight: '1rem',
    '&:hover': {
      backgroundColor: 'red'
    }
  },

  loginBtn: {
    backgroundColor: 'white', 
    color: 'black', 
    width: '15rem',
    fontSize: '1.1rem',
    marginLeft: '1rem',
    '&:hover': {
      backgroundColor: 'red'
    }
  }
}

function Header() {
  const navigate = useNavigate()
  return (
    <AppBar position="static" sx={{backgroundColor: 'black'}}>
      <Toolbar>
        <div style={{marginRight: 'auto'}}>
          <Button color="inherit" onClick={() => navigate('/')}>
            <Typography variant='h5'>Bikini Bottom Real Estate</Typography>
          </Button>
        </div>
        <div>
          <Button color="inherit" onClick={() => navigate('/listings')} sx={{marginRight: '2rem'}}>
            <Typography variant='h6'>Listings</Typography>
          </Button>
          <Button color="inherit" sx={{marginLeft: '2rem'}}>
            <Typography variant='h6'>Agencies</Typography>
          </Button>
        </div>
        <div style={{marginLeft: 'auto', marginRight: '10rem'}}>
          <Button sx={style.propertyBtn}>Add Property</Button>
          <Button onClick={() => navigate('/login')} sx={style.loginBtn}>Login</Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header