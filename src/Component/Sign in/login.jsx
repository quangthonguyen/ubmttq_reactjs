import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import { dialogContext } from './index';
import { FormHelperText } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  loginInput: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  loginContener: {
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  lik: {
    paddingTop: theme.spacing(0.5)
  },
  avatar: {
    backgroundColor: theme.palette.primary.main
  }
}));

export default function LoginForm() {
  //State validation
  const [ValidationEmail, setValidationEmail] = useState('');

  // State loginInfo
  const [LoginInfo, setLoginInfo] = useState({});
  const handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setLoginInfo({
      ...LoginInfo,
      [name]: value
    });

    name === 'email' &&
      (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      )
        ? setValidationEmail('')
        : setValidationEmail('Email không hợp lệ'));
  };

  // State show
  const [show, setshow] = useState(false);
  const toglePass = () => {
    setshow(prev => !prev);
  };
  //style
  const classes = useStyles();
  // Context
  const SignInContext = useContext(dialogContext);

  // use Dispatch
  const dispatch = useDispatch();

  const handleSubmit = event => {
    dispatch({ type: 'USER_LOGIN', payload: LoginInfo });
    event.preventDefault();
  };
  return (
    <>
      <DialogTitle align="center">
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        Sign in
      </DialogTitle>
      <form name="Login" onSubmit={handleSubmit}>
        <DialogContent>
          {/* email address input */}
          <Grid container>
            <FormControl
              variant="outlined"
              type="email"
              className={classes.loginInput}
              fullWidth
            >
              <InputLabel margin="dense">Email Address</InputLabel>
              <OutlinedInput
                margin="dense"
                type="email"
                labelWidth={110}
                name="email"
                onChange={handleInputChange}
                required={true}
              />

              <FormHelperText variant="outlined" margin="dense" error>
                {ValidationEmail}
              </FormHelperText>
            </FormControl>
          </Grid>
          {/* password input */}
          <Grid container>
            <FormControl
              variant="outlined"
              className={classes.loginInput}
              fullWidth
            >
              <InputLabel margin="dense">Password</InputLabel>
              <OutlinedInput
                margin="dense"
                type={show ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end" onClick={toglePass}>
                    <IconButton edge="end">
                      {show ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={75}
                name="password"
                onChange={handleInputChange}
                required={true}
              />
              <FormHelperText
                variant="outlined"
                margin="dense"
                error
              ></FormHelperText>
            </FormControl>
          </Grid>
          {/* Remember me */}
          {/* <Grid container>
            <FormControlLabel
              control={<Checkbox value="checkedB" color="primary" />}
              label="Remenber me"
            />
          </Grid> */}
        </DialogContent>
        <DialogActions>
          <Container className={classes.loginContener}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={ValidationEmail === '' ? false : true}
            >
              Sign in
            </Button>
            <Grid
              container
              justify="space-between"
              spacing={2}
              className={classes.lik}
            >
              <Grid item>
                <Link component="button" onClick={SignInContext.setForgot}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component="button" onClick={SignInContext.setRegister}>
                  Don't have an account? Sign Up{' '}
                </Link>
              </Grid>
            </Grid>
          </Container>
        </DialogActions>
      </form>
    </>
  );
}
