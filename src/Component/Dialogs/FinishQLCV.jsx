import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
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
  const handleFinish = () => {
    dispatch({
      type: 'USER_FINISH_QLCV',
      payload: {
        id: props.FinishQLCV[1],
        updateField: { notification: true, trangThai: 'Hoàn thành' }
      }
    });
    handleClose();
  };
  return (
    <div>
      <IconButton size="small" onClick={handleClickOpen}>
        <CheckCircleIcon fontSize="small" />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Xác nhận đã hoàn thành Công văn này ?'}
          <IconButton onClick={handleFinish} color="secondary">
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
