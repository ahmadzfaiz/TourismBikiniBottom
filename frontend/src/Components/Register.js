import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';
import {useImmerReducer} from 'use-immer';

// MUI Imports
import {Grid, Typography, Button, TextField} from '@mui/material';

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

  registerBtn: {
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
  },
};

function Register() {
  const navigate = useNavigate();

  const initialState = {
    usernameValue: '',
    emailValue: '',
    passwordValue: '',
    password2Value: '',
    sendRequest: false,
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case 'catchUsernameChange':
        draft.usernameValue = action.usernameChosen;
        break;
      case 'catchEmailChange':
        draft.emailValue = action.emailChosen;
        break;
      case 'catchPasswordChange':
        draft.passwordValue = action.passwordChosen;
        break;
      case 'catchPassword2Change':
        draft.password2Value = action.password2Chosen;
        break;
      case 'changeSendRequest':
        draft.sendRequest = !draft.sendRequest;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  function FormSubmit(e) {
    e.preventDefault();
    dispatch({type: 'changeSendRequest'});
  }

  useEffect(() => {
    if (state.sendRequest) {
      const source = Axios.CancelToken.source();
      async function SignUp() {
        try {
          const response = await Axios.post(
            'http://localhost:8000/api-auth-djoser/users/',
            {
              username: state.usernameValue,
              email: state.emailValue,
              password: state.passwordValue,
              re_password: state.password2Value,
            },
            {
              cancelToken: source.token,
            }
          );
          console.log(response);
          navigate('/');
        } catch (error) {
          console.log(error.response);
        }
      }
      SignUp();
      return () => {
        source.cancel();
      };
    }
  }, [state.sendRequest]);

  return (
    <div style={style.formContainer}>
      <form onSubmit={FormSubmit}>
        <Grid item container justifyContent="center">
          <Typography variant="h4">CREATE AN ACCOUNT</Typography>
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
            id="email"
            label="Email"
            variant="outlined"
            value={state.emailValue}
            onChange={e =>
              dispatch({type: 'catchEmailChange', emailChosen: e.target.value})
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
        <Grid item container sx={style.textInput}>
          <TextField
            id="password2"
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={state.password2Value}
            onChange={e =>
              dispatch({
                type: 'catchPassword2Change',
                password2Chosen: e.target.value,
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
            sx={style.registerBtn}
          >
            SIGN UP
          </Button>
        </Grid>
        <Grid item container justifyContent="center" sx={style.textInput}>
          <Typography>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} style={style.accountLink}>
              SIGN IN
            </span>
          </Typography>
        </Grid>
      </form>
    </div>
  );
}

export default Register;
