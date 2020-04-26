import React, { useState } from 'react';
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
import Dropzone from '../DropZone';
import useShallowEqualSelector from '../../Redux/useShallowEqualSelector';
import { useDispatch } from 'react-redux';
import { LinearProgress } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const BorderLinearProgress = withStyles({
  root: {
    borderRadius: 20,
    height: 15,
    backgroundColor: 'rgba(29, 191, 4,.35)',
  },
  bar: {
    borderRadius: 20,
    backgroundColor: 'rgba(29, 180, 4,0.9)',
  },
})(LinearProgress);

const DialogTitle = withStyles(styles)((props) => {
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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  //useState
  const [load, setload] = useState(false);
  //use Selector
  const listUsers = useShallowEqualSelector((state) => state.listUsers);
  const arrayUsers = Object.values(listUsers);
  //use State
  const [CreateCVDI, setCreateCVDI] = useState({});
  const handleFileChange = (fileName, fileId) => {
    setCreateCVDI({ ...CreateCVDI, fileName: fileName, fileId: fileId });
  };
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.name === 'soVb' ? Number(target.value) : target.value;
    const name = target.name;
    setCreateCVDI({
      ...CreateCVDI,
      [name]: value,
    });
  };
  //onClose
  const closeDiag = () => {
    setCreateCVDI({});
    setload(false);
    props.handleCloseDialogCreateCVDI();
  };
  //use Dispatch
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    dispatch({ type: 'USER_CREATE_CVDI', payload: CreateCVDI });
    closeDiag();
    event.preventDefault();
  };
  return (
    <div>
      <Dialog
        onClose={closeDiag}
        aria-labelledby="customized-dialog-title"
        open={props.openDialogCreateCVDI}
      >
        <DialogTitle id="customized-dialog-title" onClose={closeDiag}>
          Tạo văn bản đi
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
                  <InputLabel margin="dense" shrink>
                    Ngày đi
                  </InputLabel>
                  <OutlinedInput
                    margin="dense"
                    labelWidth={72}
                    type="date"
                    name="ngayDi"
                    required={true}
                    notched
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
                    required={true}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid> */}

              {/* fied dính kem */}
              <Grid item xs={12}>
                <Dropzone
                  handleFileChange={handleFileChange}
                  setload={setload}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={
                  load
                    ? { visibility: 'unset', position: 'relative' }
                    : { visibility: 'hidden', position: 'relative' }
                }
              >
                <BorderLinearProgress
                  variant={CreateCVDI.fileId ? 'determinate' : 'indeterminate'}
                  value={100}
                />
                <span
                  style={{
                    fontSize: 'smaller',
                    fontWeight: '500',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {CreateCVDI.fileId ? 'Done' : 'Uploading...'}
                </span>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary" disabled={!CreateCVDI.fileId}>
              Tạo văn bản đi
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
