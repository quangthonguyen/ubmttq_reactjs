import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import useShallowEqualSelector from '../../Redux/useShallowEqualSelector';
import { Button } from '@material-ui/core';
import FeatherClient from '../../FeatherClient/FeatherConfigure';

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

const formatDate = str => {
  const time = new Date(str);
  return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
};

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
  const rowData = props.detailCVD;

  //use Selector
  const listUsers = useShallowEqualSelector(state => state.listUsers);
  const arrayUsers = Object.values(listUsers);
  //useState file
  const [File, setFile] = React.useState(false);
  //useState Open
  const [Open, setOpen] = React.useState(false);
  const handleOpen = () => {
    FeatherClient.service('uploads')
      .get(rowData[11])
      .then(data => setFile(data.uri))
      .catch(error => console.log(error));
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //FeatherClient

  return (
    <div>
      <IconButton size="small" onClick={handleOpen}>
        <MoreHorizIcon fontSize="small" />
      </IconButton>
      <Dialog onClose={handleClose} open={Open} maxWidth={'md'}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Chi tiết văn bản
        </DialogTitle>
        <form>
          <DialogContent>
            <Grid container spacing={3}>
              {/* So Cv */}
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel margin="dense">Số Vb</InputLabel>
                  <OutlinedInput
                    margin="dense"
                    type="number"
                    labelWidth={50}
                    name="soVb"
                    defaultValue={rowData[2]}
                    required={true}
                    disabled={true}
                  />
                </FormControl>
              </Grid>
              {/* Loai Cv */}
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel margin="dense">Loại Vb</InputLabel>
                  <Select
                    margin="dense"
                    labelWidth={60}
                    defaultValue={rowData[3]}
                    name="loaiVb"
                    required={true}
                    disabled={true}
                  >
                    <MenuItem value={'Thông tư'}>Thông tư</MenuItem>
                    <MenuItem value={'Chỉ thị'}>Chỉ thị</MenuItem>
                    <MenuItem value={'Quyết định'}>Quyết định</MenuItem>
                    <MenuItem value={'Quy định'}>Quy định</MenuItem>
                    <MenuItem value={'Kết luận'}>Kết luận</MenuItem>
                    <MenuItem value={'Kế hoạch'}>Kế hoạch</MenuItem>
                    <MenuItem value={'Báo cáo'}>Báo cáo</MenuItem>
                    <MenuItem value={'Thông báo'}>Thông báo</MenuItem>
                    <MenuItem value={'Công văn'}>Công văn</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* Ngày Đến */}
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel margin="dense">Ngày đến</InputLabel>
                  <OutlinedInput
                    margin="dense"
                    labelWidth={75}
                    type="text"
                    name="ngayDen"
                    defaultValue={formatDate(rowData[5])}
                    required={true}
                    disabled={true}
                  />
                </FormControl>
              </Grid>
              {/* Thời hạn */}
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel margin="dense" shrink>
                    Thời hạn
                  </InputLabel>
                  <OutlinedInput
                    notched
                    margin="dense"
                    labelWidth={75}
                    type="text"
                    name="thoiHan"
                    defaultValue={rowData[7] ? formatDate(rowData[7]) : null}
                    disabled={true}
                  />
                </FormControl>
              </Grid>
              {/* Đơn vi gửi */}
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel margin="dense">Đơn vị gửi</InputLabel>
                  <OutlinedInput
                    margin="dense"
                    type="text"
                    labelWidth={82}
                    name="donViGui"
                    defaultValue={rowData[4]}
                    required={true}
                    disabled={true}
                  />
                </FormControl>
              </Grid>
              {/* Người thực hiện */}
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel margin="dense">Người thực hiện</InputLabel>
                  <Select
                    margin="dense"
                    labelWidth={120}
                    defaultValue={rowData[6]}
                    name="nguoiThucHien"
                    required={true}
                    disabled={true}
                  >
                    {arrayUsers.map((el, index) => (
                      <MenuItem
                        key={index}
                        value={el['_id']}
                      >{`${el.lastName} ${el.fristName}`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {/* Nội dung văn bản */}
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel margin="dense">Nội dung văn bản</InputLabel>
                  <OutlinedInput
                    margin="dense"
                    type="text"
                    multiline
                    labelWidth={150}
                    name="noiDungVb"
                    defaultValue={rowData[8]}
                    required={true}
                    disabled={true}
                  />
                </FormControl>
              </Grid>
              {/* Nội dung phê quyệt của lãnh đạo */}
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel margin="dense">
                    Nội dung phê quyệt của lãnh đạo
                  </InputLabel>
                  <OutlinedInput
                    margin="dense"
                    type="text"
                    multiline
                    labelWidth={250}
                    name="noiDungLd"
                    defaultValue={rowData[9]}
                    required={true}
                    disabled={true}
                  />
                </FormControl>
              </Grid>
              {/* File holder */}
              <Grid item xs={12}>
                <Button style={{ width: '100%', margin: 'auto' }}>
                  <a download={rowData[10]} href={File}>
                    {rowData[10]}
                  </a>
                </Button>

                <iframe
                  src={File}
                  width={'100%'}
                  height={'700px'}
                  title={rowData[10]}
                >
                  <p>Your browser does not support iframes.</p>
                </iframe>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions></DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
