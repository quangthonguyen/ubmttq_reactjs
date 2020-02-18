import React, { useState, useContext } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import { dialogContext } from './index';
import { FormHelperText } from '@material-ui/core';
import featherClient from '../../FeatherClient/FeatherConfigure';
import { useSnackbar } from 'notistack';

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
  // snackbar
  const { enqueueSnackbar } = useSnackbar();
  //style
  const classes = useStyles();
  // Context
  const SignInContext = useContext(dialogContext);

  const handleSubmit = event => {
    const ramdomStr = Math.random()
      .toString(36)
      .substr(2, 8);
    featherClient
      .service('users')
      .patch(null, { password: ramdomStr }, { query: LoginInfo })
      .then(
        featherClient
          .service('mailer')
          .create({
            to: LoginInfo.email,
            subject:
              'Ủy ban mặt trận tổ quốc quận Bình thạnh . Yêu cầu reset password',
            html:
              'Bạn đã yêu cầu reset password ?  Password reset to : ' +
              ramdomStr
          })
          .then(function(result) {
            console.log('Sent email', result);
          })
          .catch(err => {
            console.log('Error sending email', err);
          })
      )
      .then(data => console.log(data))
      .then(SignInContext.setLogin)
      .then(() => {
        enqueueSnackbar('Reset thành công , hãy kiểm tra email của bạn !', {
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          variant: 'success',
          autoHideDuration: 6000
        });
      })
      .catch(error => {
        console.log(error);
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
  return (
    <>
      <DialogTitle align="center">
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        Forgot password
      </DialogTitle>
      <form name="forgotPassword" onSubmit={handleSubmit}>
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
              Reset password
            </Button>
            <Grid
              container
              justify="space-between"
              spacing={2}
              className={classes.lik}
            >
              <Grid item>
                <Link component="button" onClick={SignInContext.setLogin}>
                  Login.
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
