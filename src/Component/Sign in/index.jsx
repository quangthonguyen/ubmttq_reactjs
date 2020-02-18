import React, { useState, createContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Login from './login';
import Register from './register';
import { makeStyles } from '@material-ui/styles';
import useShallowEqualSelector from '../../Redux/useShallowEqualSelector';
import { Redirect } from 'react-router-dom';
import Forgot from './forgotPW';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

export const dialogContext = createContext();

export default function SignIn() {
  const classes = useStyles();
  // State
  const [dialog, setdialog] = useState('login');
  const setLogin = () => {
    setdialog('login');
  };
  const setRegister = () => {
    setdialog('register');
  };
  const setForgot = () => {
    setdialog('forgot');
  };
  const user = useShallowEqualSelector(state => state.users);

  return (
    <>
      {user ? (
        <Redirect to="/" />
      ) : (
        <Dialog
          open={true}
          maxWidth="xs"
          className={classes.root}
          disableBackdropClick={true}
        >
          <dialogContext.Provider
            value={{
              setLogin: setLogin,
              setRegister: setRegister,
              setForgot: setForgot
            }}
          >
            {(dialog === 'login' && <Login />) ||
              (dialog === 'register' && <Register />) ||
              (dialog === 'forgot' && <Forgot />)}
          </dialogContext.Provider>
        </Dialog>
      )}

      {/* Sign Dialog */}
    </>
  );
}
