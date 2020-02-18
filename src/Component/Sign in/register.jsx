import React, { useState, useContext } from 'react';
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
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { makeStyles, FormHelperText } from '@material-ui/core';
import { dialogContext } from './index';
import { useSnackbar } from 'notistack';
import featherClient from '../../FeatherClient/FeatherConfigure';

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
  const classes = useStyles();
  //State validation
  const [ValidationFristName, setValidationFristName] = useState('');
  const [ValidationLastName, setValidationLastName] = useState('');
  const [ValidationEmail, setValidationEmail] = useState('');
  const [ValidationPassword, setValidationPassword] = useState('');
  //  State & handle
  const [show, setshow] = useState(false);
  const toglePass = () => {
    setshow(prev => !prev);
  };
  const { setLogin, setForgot } = useContext(dialogContext);

  const [RegisterInfo, setRegisterInfo] = useState({});
  const handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setRegisterInfo({
      ...RegisterInfo,
      [name]: value
    });
    name === 'lastName' &&
      (/\D[a-zA-Z]{1,20}/.test(value)
        ? setValidationLastName('')
        : setValidationLastName('Họ không phù hợp'));
    name === 'fristName' &&
      (/\D[a-zA-Z]{1,20}/.test(value)
        ? setValidationFristName('')
        : setValidationFristName('Tên không phù hợp'));
    name === 'email' &&
      (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      )
        ? setValidationEmail('')
        : setValidationEmail('Email không hợp lệ'));
    name === 'password' &&
      (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(value)
        ? setValidationPassword('')
        : setValidationPassword(
            'Mật khẩu gồm 8 ký tự bao gồm số và chữ in hoa'
          ));
  };
  const handleSubmit = event => {
    console.log(RegisterInfo);
    featherClient
      .service('users')
      .create({
        ...RegisterInfo,
        chucVu: 'Khách',
        qlCVD: true,
        qlCVDI: true,
        qlDM: true
      })
      .then(setLogin)
      .then(() => {
        enqueueSnackbar('Your account is activated !', {
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          variant: 'success',
          autoHideDuration: 3000
        });
      })
      .catch(() => {
        enqueueSnackbar('Error please try again later !', {
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          variant: 'error',
          autoHideDuration: 3000
        });
      });
    event.preventDefault();
  };
  // snackbar
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <DialogTitle align="center">
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        Sign in
      </DialogTitle>
      <form name="Register" onSubmit={handleSubmit}>
        <DialogContent>
          {/* frist,last name input */}
          <Grid container spacing={1} justify="space-between">
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.loginInput}>
                <InputLabel margin="dense">Họ</InputLabel>
                <OutlinedInput
                  margin="dense"
                  type="text"
                  labelWidth={25}
                  name="lastName"
                  onChange={handleInputChange}
                  required={true}
                />
                <FormHelperText variant="outlined" margin="dense" error>
                  {ValidationLastName}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.loginInput}>
                <InputLabel margin="dense">Tên</InputLabel>
                <OutlinedInput
                  margin="dense"
                  type="text"
                  labelWidth={40}
                  name="fristName"
                  onChange={handleInputChange}
                  required={true}
                />
                <FormHelperText variant="outlined" margin="dense" error>
                  {ValidationFristName}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
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
              <FormHelperText variant="outlined" margin="dense" error>
                {ValidationPassword}
              </FormHelperText>
            </FormControl>
          </Grid>
          {/* Remember me */}
          <Grid container>
            <FormControlLabel
              control={<Checkbox value="checkedB" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          {/* Submit */}
          <Container className={classes.loginContener}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={
                ValidationLastName === '' &&
                ValidationFristName === '' &&
                ValidationEmail === '' &&
                ValidationPassword === ''
                  ? false
                  : true
              }
            >
              Sign in
            </Button>
            <Grid
              container
              className={classes.lik}
              justify="space-between"
              spacing={2}
            >
              <Grid item>
                <Link component="button" onClick={setForgot}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component="button" onClick={setLogin}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Container>
        </DialogActions>
      </form>
    </>
  );
}
