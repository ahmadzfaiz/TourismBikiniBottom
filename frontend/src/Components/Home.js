import React, {useState} from 'react';

// MUI
import {AppBar, Toolbar, Typography, Button} from '@mui/material';

// Assets
import city from './Assets/wallpaper-bikini-bottom.png'

const style = {
  cityImg: {
    width: '100%',
    height: '91vh'
  },

  overlayText: {
    position: 'absolute',
    zIndex: '100',
    top: '125px',
    left: '20px',
    textAlign: 'center'
  },

  homeText: {
    color: 'yellow',
    fontWeight: 'bolder'
  },

  homeButton: {
    fontSize: '3.5rem',
    borderRadius: '15px',
    backgroundColor: 'orange',
    marginTop: '2rem',
    boxShadow: '3px 3px 3px white',
    '&:hover': {
      backgroundColor: 'red'
    }
  }
}

function Home() {
  return (
    <div>
      <div style={{position: 'relative'}}>
        <img src={city} style={style.cityImg}></img>
        <div style={style.overlayText}>
          <Typography variant='h1' sx={style.homeText}>FIND YOUR <span style={{color: 'orange'}}>NEXT PROPERTY</span> ON BIKINI BOTTOM</Typography>
          <Button variant='contained' sx={style.homeButton}>SEE ALL PROPERTIES</Button>
        </div>
      </div>
    </div>
  )
}

export default Home