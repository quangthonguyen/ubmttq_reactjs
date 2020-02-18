import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Link, InputAdornment, FormHelperText } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FeatherClient from '../../FeatherClient/FeatherConfigure';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  loginInput: {
    marginTop: theme.spacing(1)
  }
}));

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  // snackbar
  const { enqueueSnackbar } = useSnackbar();
  //  State & handle
  const [show, setshow] = useState(false);
  const toglePass = () => {
    setshow(prev => !prev);
  };
  //val pass
  const [ValidationPassword, setValidationPassword] = useState('');
  const [ValidationPasswordOld, setValidationPasswordOld] = useState('');
  //useState Open Dialog
  const [Open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //use State
  const [ChangePass, setChangePass] = useState({});
  const handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setChangePass({
      ...ChangePass,
      [name]: value
    });
    name === 'passwordNew' &&
      (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(value)
        ? setValidationPassword('')
        : setValidationPassword(
            'Mật khẩu gồm 8 ký tự bao gồm số và chữ in hoa'
          ));
  };
  //style
  const classes = useStyles();
  //use Dispatch
  const handleSubmit = event => {
    FeatherClient.authenticate({
      strategy: 'local',
      email: props.email,
      password: ChangePass.passwordOld
    })
      .then(data => {
        if (data.accessToken !== undefined) {
          FeatherClient.service('users')
            .patch(
              null,
              { password: ChangePass.passwordNew },
              { query: { email: props.email } }
            )
            .then(() => {
              enqueueSnackbar('Thay đổi mật khẩu thành công !', {
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center'
                },
                variant: 'success',
                autoHideDuration: 6000
              });
            })
            .then(setOpen(false))
            .catch(error => console.log(error));
        }
      })
      .catch(error => setValidationPasswordOld('Mật khẩu không chính xác.'));

    event.preventDefault();
  };
  return (
    <>
      <Grid item>
        <Link component="button" onClick={handleOpen}>
          Thay đổi mật khẩu
        </Link>
      </Grid>
      <div>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={Open}
          maxWidth={'md'}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Thay đổi mật khẩu
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              {/* password input */}
              <Grid container>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel margin="dense">Mật khẩu cũ</InputLabel>
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
                    labelWidth={100}
                    name="passwordOld"
                    onChange={handleInputChange}
                    required={true}
                  />
                  <FormHelperText variant="outlined" margin="dense" error>
                    {ValidationPasswordOld}
                  </FormHelperText>
                </FormControl>
              </Grid>
              {/* password input */}
              <Grid container>
                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.loginInput}
                >
                  <InputLabel margin="dense">Mật khẩu mới</InputLabel>
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
                    labelWidth={100}
                    name="passwordNew"
                    onChange={handleInputChange}
                    required={true}
                  />
                  <FormHelperText variant="outlined" margin="dense" error>
                    {ValidationPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                color="primary"
                disabled={ValidationPassword === '' ? false : true}
              >
                Thay đổi mật khẩu
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </>
  );
}
