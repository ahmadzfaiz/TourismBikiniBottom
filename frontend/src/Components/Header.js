import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';

// MUI Imports
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';

// Contexts
import StateContext from '../Contexts/StateContext';
import DispatchContext from '../Contexts/DispatchContext';

const style = {
  propertyBtn: {
    backgroundColor: 'orange',
    color: 'white',
    width: '15rem',
    fontSize: '1.1rem',
    marginRight: '1rem',
    '&:hover': {
      backgroundColor: 'red',
    },
  },

  loginBtn: {
    backgroundColor: 'white',
    color: 'black',
    width: '15rem',
    fontSize: '1.1rem',
    marginLeft: '1rem',
    '&:hover': {
      backgroundColor: 'red',
    },
  },

  profileBtn: {
    color: 'black',
    backgroundColor: 'green',
    width: '15rem',
    fontWeight: 'bolder',
    borderRadius: '15px',
    marginBottom: '0.25rem',
  },

  logoutBtn: {
    color: 'black',
    backgroundColor: 'red',
    width: '15rem',
    fontWeight: 'bolder',
    borderRadius: '15px',
  },
};

function Header() {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);
  const GlobalDispatch = useContext(DispatchContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleLogout() {
    setAnchorEl(null);
    const confirmLogout = window.confirm('Are you sure you want to leave?');
    if (confirmLogout) {
      try {
        const response = await Axios.post(
          'http://localhost:8000/api-auth-djoser/token/logout/',
          GlobalState.userToken,
          {headers: {Authorization: 'Token '.concat(GlobalState.userToken)}}
        );
        GlobalDispatch({type: 'userSignOut'});
        navigate('/');
      } catch (error) {
        console.log(error.response);
      }
    }
  }

  return (
    <AppBar position="static" sx={{backgroundColor: 'black'}}>
      <Toolbar>
        <div style={{marginRight: 'auto'}}>
          <Button color="inherit" onClick={() => navigate('/')}>
            <Typography variant="h5">Bikini Bottom Real Estate</Typography>
          </Button>
        </div>
        <div>
          <Button
            color="inherit"
            onClick={() => navigate('/listings')}
            sx={{marginRight: '2rem'}}
          >
            <Typography variant="h6">Listings</Typography>
          </Button>
          <Button color="inherit" sx={{marginLeft: '2rem'}}>
            <Typography variant="h6">Agencies</Typography>
          </Button>
        </div>
        <div style={{marginLeft: 'auto', marginRight: '10rem'}}>
          <Button
            onClick={() => navigate('/add-property')}
            sx={style.propertyBtn}
          >
            Add Property
          </Button>
          {GlobalState.userIsLogged ? (
            <Button onClick={handleClick} sx={style.loginBtn}>
              {GlobalState.userUsername}
            </Button>
          ) : (
            <Button onClick={() => navigate('/login')} sx={style.loginBtn}>
              Login
            </Button>
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem sx={style.profileBtn} onClick={handleClose}>
              Profile
            </MenuItem>
            <MenuItem sx={style.logoutBtn} onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
