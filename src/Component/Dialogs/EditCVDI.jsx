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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import useShallowEqualSelector from '../../Redux/useShallowEqualSelector';
import EditIcon from '@material-ui/icons/Edit';
import Dropzone from '../DropZone';
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
  const rowData = props.EditCVDI;
  //useState Open Dialog
  const [Open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //use State EditCVDI
  const [EditCVDI, setEditCVDI] = React.useState({});
  const handleFileChange = (fileName, fileId) => {
    setEditCVDI({ ...EditCVDI, fileName: fileName, fileId: fileId });
  };
  const handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setEditCVDI({
      ...EditCVDI,
      [name]: value
    });
  };
  //use Selector
  const listUsers = useShallowEqualSelector(state => state.listUsers);
  const arrayUsers = Object.values(listUsers);
  //use Dispatch
  const dispatch = useDispatch();
  const handleSubmit = event => {
    dispatch({
      type: 'USER_UPDATE_CVDI',
      payload: { id: rowData[1], updateField: EditCVDI }
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
          Cập nhập văn bản đi
        </DialogTitle>
        <form onSubmit={handleSubmit}>
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
              {/* Ngày Đi */}
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel margin="dense">Ngày đi</InputLabel>
                  <OutlinedInput
                    margin="dense"
                    labelWidth={75}
                    type="date"
                    name="ngayDi"
                    defaultValue={rowData[5]}
                    required={true}
                    onChange={handleInputChange}
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
                    type="date"
                    name="thoiHan"
                    defaultValue={rowData[7] ? rowData[7] : null}
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>
              {/* Nội dung phê quyệt của lãnh đạo */}
              {/* <Grid item xs={12}>
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
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid> */}
              {/* File holder */}
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  {`File : ${
                    EditCVDI.fileName ? EditCVDI.fileName : rowData[9]
                  }`}
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
  );
}
