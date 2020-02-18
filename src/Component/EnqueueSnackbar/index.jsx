import { useSnackbar } from 'notistack';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function EnqueueSnackbar(messenger, variant, ontop = false) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const action = key => {
    return (
      <>
        <IconButton
          onClick={() => {
            closeSnackbar(key);
          }}
        >
          <CloseIcon />
        </IconButton>
      </>
    );
  };
  return ontop
    ? enqueueSnackbar(messenger, {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        variant,
        autoHideDuration: 3000
      })
    : enqueueSnackbar(messenger, {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        variant,
        autoHideDuration: 5000,
        action
      });
}
