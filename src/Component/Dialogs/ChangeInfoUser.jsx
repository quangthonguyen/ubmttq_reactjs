import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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
import Dropzone from '../DropZone/upimg';
import { Link, FormHelperText } from '@material-ui/core';
import { useDispatch } from 'react-redux';

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
  const user = props.infoUser;
  //useState Open Dialog
  const [Open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //State validation
  const [ValidationFristName, setValidationFristName] = React.useState('');
  const [ValidationLastName, setValidationLastName] = React.useState('');
  const [ValidationEmail, setValidationEmail] = React.useState('');
  //use State EditCVD
  const [EditCVD, setEditCVD] = React.useState({});
  const handleFileChange = avatarId => {
    setEditCVD({ ...EditCVD, avatarId: avatarId });
  };
  const handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setEditCVD({
      ...EditCVD,
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
  };

  // handleSubmit
  const dispatch = useDispatch();
  const handleSubmit = event => {
    dispatch({
      type: 'CHANGE_INFO_USER',
      payload: { id: user['_id'], updateField: EditCVD }
    });

    handleClose();
    event.preventDefault();
  };
  return (
    <>
      <Grid item>
        <Link component="button" onClick={handleOpen}>
          Thay đổi thông tin
        </Link>
      </Grid>
      <div>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={Open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Cập nhập thông tin cá nhân
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel margin="dense">Họ</InputLabel>
                    <OutlinedInput
                      margin="dense"
                      type="text"
                      labelWidth={25}
                      name="lastName"
                      onChange={handleInputChange}
                      required={true}
                      defaultValue={user.lastName}
                    />
                    <FormHelperText variant="outlined" margin="dense" error>
                      {ValidationLastName}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel margin="dense">Tên</InputLabel>
                    <OutlinedInput
                      margin="dense"
                      type="text"
                      labelWidth={40}
                      name="fristName"
                      onChange={handleInputChange}
                      required={true}
                      defaultValue={user.fristName}
                    />
                    <FormHelperText variant="outlined" margin="dense" error>
                      {ValidationFristName}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                {/* email address input */}
                <Grid item xs={12}>
                  <FormControl variant="outlined" type="email" fullWidth>
                    <InputLabel margin="dense">Email Address</InputLabel>
                    <OutlinedInput
                      margin="dense"
                      type="email"
                      labelWidth={110}
                      name="email"
                      onChange={handleInputChange}
                      required={true}
                      defaultValue={user.email}
                    />
                    <FormHelperText variant="outlined" margin="dense" error>
                      {ValidationEmail}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                {/* fied dính kem */}
                <Grid item xs={12}>
                  <Dropzone handleFileChange={handleFileChange} />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary">
                Lưu thay đổi
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </>
  );
}
