import React, {useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';
import {useImmerReducer} from 'use-immer';

// MUI Imports
import {Grid, Typography, Button, TextField} from '@mui/material';

// // Contexts
import DispatchContext from '../Contexts/DispatchContext';
import StateContext from '../Contexts/StateContext';

const style = {
  formContainer: {
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '3rem',
    border: '5px solid black',
    padding: '3rem',
  },

  textInput: {
    marginTop: '1rem',
  },

  buttonInput: {
    marginTop: '1rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  loginBtn: {
    backgroundColor: 'green',
    color: 'white',
    fontSize: '1.1rem',
    marginLeft: '1rem',
    '&:hover': {
      backgroundColor: 'orange',
    },
  },

  accountLink: {
    cursor: 'pointer',
    color: 'green',
    '&:hover': {
      color: 'orange',
    },
  },
};

function Login() {
  const navigate = useNavigate();

  const GlobalDispatch = useContext(DispatchContext);
  const GlobalState = useContext(StateContext);

  const initialState = {
    usernameValue: '',
    passwordValue: '',
    sendRequest: false,
    token: '',
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case 'catchUsernameChange':
        draft.usernameValue = action.usernameChosen;
        break;
      case 'catchPasswordChange':
        draft.passwordValue = action.passwordChosen;
        break;
      case 'changeSendRequest':
        draft.sendRequest = !draft.sendRequest;
        break;
      case 'catchToken':
        draft.token = action.tokenValue;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  function FormSubmit(e) {
    e.preventDefault();
    console.log('submitted');
    dispatch({type: 'changeSendRequest'});
  }

  // Login request
  useEffect(() => {
    if (state.sendRequest) {
      const source = Axios.CancelToken.source();
      async function SignIn() {
        try {
          const response = await Axios.post(
            'http://localhost:8000/api-auth-djoser/token/login/',
            {
              username: state.usernameValue,
              password: state.passwordValue,
            },
            {
              cancelToken: source.token,
            }
          );
          dispatch({type: 'catchToken', tokenValue: response.data.auth_token});
          GlobalDispatch({
            type: 'catchToken',
            tokenValue: response.data.auth_token,
          });
          // navigate('/');
        } catch (error) {
          console.log(error.response);
        }
      }
      SignIn();
      return () => {
        source.cancel();
      };
    }
  }, [state.sendRequest]);

  // Get user info request
  useEffect(() => {
    if (state.token !== '') {
      const source = Axios.CancelToken.source();
      async function GetUserInfo() {
        try {
          const response = await Axios.get(
            'http://localhost:8000/api-auth-djoser/users/me/',
            {
              headers: {Authorization: 'Token '.concat(state.token)},
            },
            {
              cancelToken: source.token,
            }
          );
          GlobalDispatch({
            type: 'userSignIn',
            usernameInfo: response.data.username,
            emailInfo: response.data.email,
            idInfo: response.data.id,
          });
          navigate('/');
        } catch (error) {
          console.log(error.response);
        }
      }
      GetUserInfo();
      return () => {
        source.cancel();
      };
    }
  }, [state.sendRequest]);

  return (
    <div style={style.formContainer}>
      <form onSubmit={FormSubmit}>
        <Grid item container justifyContent="center">
          <Typography variant="h4">SIGN IN</Typography>
        </Grid>
        <Grid item container sx={style.textInput}>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            value={state.usernameValue}
            onChange={e =>
              dispatch({
                type: 'catchUsernameChange',
                usernameChosen: e.target.value,
              })
            }
            fullWidth
          />
        </Grid>
        <Grid item container sx={style.textInput}>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            value={state.passwordValue}
            onChange={e =>
              dispatch({
                type: 'catchPasswordChange',
                passwordChosen: e.target.value,
              })
            }
            fullWidth
          />
        </Grid>
        <Grid item container xs={8} sx={style.buttonInput}>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={style.loginBtn}
          >
            SIGN IN
          </Button>
        </Grid>
        <Grid item container justifyContent="center" sx={style.textInput}>
          <Typography>
            Don't have an account yet?{' '}
            <span
              onClick={() => navigate('/register')}
              style={style.accountLink}
            >
              SIGN UP
            </span>
          </Typography>
        </Grid>
      </form>
    </div>
  );
}

export default Login;
