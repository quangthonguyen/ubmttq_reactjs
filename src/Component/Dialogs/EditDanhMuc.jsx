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
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch } from 'react-redux';
import { FormControlLabel } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';

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
  const rowData = props.EditCVD;
  //useState Open Dialog
  const [Open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //use State EditCVD
  const [EditCVD, setEditCVD] = React.useState({
    qlCVD: rowData[7],
    qlCVDI: rowData[8],
    qlDM: rowData[9]
  });
  const handleChange = name => event => {
    setEditCVD({ ...EditCVD, [name]: event.target.checked });
  };
  const handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setEditCVD({
      ...EditCVD,
      [name]: value
    });
  };

  //use Dispatch
  const dispatch = useDispatch();
  const handleSubmit = event => {
    console.log(EditCVD);
    dispatch({
      type: 'UPDATE_USERS_LIST',
      payload: { id: rowData[1], updateField: EditCVD }
    });
    handleClose();
    event.preventDefault();
  };
  return (
    <div>
      <IconButton size="small" onClick={handleOpen}>
        <EditIcon fontSize="small" />
      </IconButton>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={Open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Cập nhật người dùng
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={3}>
              {/* Chức vụ*/}
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel margin="dense">Chức vụ</InputLabel>
                  <OutlinedInput
                    margin="dense"
                    type="text"
                    labelWidth={80}
                    name="chucVu"
                    defaultValue={rowData[5]}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>
              {/* Quyền*/}
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={EditCVD.qlCVD}
                      onChange={handleChange('qlCVD')}
                      value="qlCVD"
                    />
                  }
                  label="VB đến"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={EditCVD.qlCVDI}
                      onChange={handleChange('qlCVDI')}
                      value="qlCVDI"
                    />
                  }
                  label="công văn đi"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={EditCVD.qlDM}
                      onChange={handleChange('qlDM')}
                      value="qlDM"
                    />
                  }
                  label="danh mục"
                />
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
  );
}
