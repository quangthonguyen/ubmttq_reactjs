import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux';

export default function AlertDialog(props) {
  //useState Open
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //use dispatch
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch({ type: 'USER_DELETE_CVD', payload: props.DeleteCVD[1] });
    handleClose();
  };
  return (
    <div>
      <IconButton size="small" onClick={handleClickOpen}>
        <DeleteIcon fontSize="small" />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Bạn có chắc muốn xóa CV này ?'}
          <IconButton onClick={handleDelete} color="secondary">
            <CheckIcon />
          </IconButton>
          <IconButton onClick={handleClose} color="primary">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      </Dialog>
    </div>
  );
}
