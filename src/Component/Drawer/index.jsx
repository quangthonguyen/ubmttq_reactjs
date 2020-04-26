import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MoveToInbox from '@material-ui/icons/MoveToInbox';
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import TablesCVD from '../MUI_Table/CVD';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Badge from '@material-ui/core/Badge';
import TelegramIcon from '@material-ui/icons/Telegram';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import TimerIcon from '@material-ui/icons/Timer';
import CreateCVD from '../Dialogs/CreateCVD';
import CreateCVDI from '../Dialogs/CreateCVDI';
import TablesCVDI from '../MUI_Table/CVDI';
import TablesQLCV from '../MUI_Table/QLCV';
import useShallowEqualSelector from '../../Redux/useShallowEqualSelector';
import featherClient from '../../FeatherClient/FeatherConfigure';
import { useDispatch } from 'react-redux';
import DanhMuc from '../MUI_Table/DanhMuc';
import { Backdrop, CircularProgress } from '@material-ui/core';

const drawerWidth = 200;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-flex'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    paddingBottom: '0px',
    boxSizing: 'border-box',
    padding: theme.spacing(2),
    marginLeft: '200px',

    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  },
  content2: {
    boxSizing: 'border-box',
    padding: theme.spacing(2),
    marginLeft: '58px',

    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  },
  toolbar: {
    display: 'block',
    minHeight: '48px'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  createNew: {
    marginRight: '4px',
    marginLeft: '4px',
    marginTop: theme.spacing(2)
  },
  createNewExtended: {
    width: 'initial',
    minHeight: '48px',
    borderRadius: '24px'
  },
  nested: {
    paddingLeft: theme.spacing(4),
    height: '48.8px'
  },
  drawListItem: {
    height: '48.8px'
  },
  labelFab: {
    justifyContent: 'unset'
  },
  textFab: {
    marginLeft: '19px'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));
export default function ClippedDrawer(props) {
  //use state Danh Muc
  const [openDanhMuc, setOpenDanhMuc] = React.useState(true);

  const handleClickDanhMuc = () => {
    setOpenDanhMuc(!openDanhMuc);
  };
  //use state create cvd
  const [openDialogCreateCVD, setOpenDialogCreateCVD] = React.useState(false);

  const handleOpenDialogCreateCVD = () => {
    setOpenDialogCreateCVD(true);
  };
  const handleCloseDialogCreateCVD = () => {
    setOpenDialogCreateCVD(false);
  };
  //use state create cvdi
  const [openDialogCreateCVDI, setOpenDialogCreateCVDI] = React.useState(false);

  const handleOpenDialogCreateCVDI = () => {
    setOpenDialogCreateCVDI(true);
  };
  const handleCloseDialogCreateCVDI = () => {
    setOpenDialogCreateCVDI(false);
  };
  // use state set menu
  const [Menu, setMenu] = React.useState('QLCV');
  const handleSetMenu = menu => {
    setMenu(menu);
  };
  //style
  const classes = useStyles();
  //Use selector
  const user = useShallowEqualSelector(state => state.users);

  //use Dispatch
  const dispatch = useDispatch();
  //featherjs
  React.useEffect(() => {
    featherClient.service('vbd').on('created', message => {
      if (message.nguoiThucHien === user['_id']) {
        dispatch({ type: 'USER_ADD_QLCV', payload: message });
      }
    });
    featherClient.service('vbd').on('patched', message => {
      if (user.qlCVD === true) {
        dispatch({ type: 'USER_UPDATED_CVD', payload: message });
      }
    });
  }, [user, dispatch]);

  const listCVD = useShallowEqualSelector(state => state.listCVD);

  const listQLCV = useShallowEqualSelector(state => state.listQLCV);

  return (
    <div>
      <Backdrop className={classes.backdrop} open={!(user !== false)}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* DialogCreateCVD */}
      <CreateCVD
        openDialogCreateCVD={openDialogCreateCVD}
        handleCloseDialogCreateCVD={handleCloseDialogCreateCVD}
      />
      {/* DialogCreateCVD */}
      <CreateCVDI
        openDialogCreateCVDI={openDialogCreateCVDI}
        handleCloseDialogCreateCVDI={handleCloseDialogCreateCVDI}
      />
      {/* Drawer */}
      <Drawer
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: props.open
        })}
        variant="permanent"
        classes={{
          paper: clsx({
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open
          })
        }}
      >
        <div className={classes.toolbar} />
        {}
        {!(Menu === 'CVDI') ? (
          !props.open ? (
            // Create new
            <Fab
              variant={'round'}
              color="primary"
              size={'medium'}
              className={classes.createNew}
              onClick={handleOpenDialogCreateCVD}
              disabled={user.qlCVD ? false : true}
            >
              <AddIcon />
            </Fab>
          ) : (
            // Create new extended
            <Fab
              variant={'extended'}
              color="primary"
              className={classes.createNew}
              classes={{
                extended: classes.createNewExtended,
                label: classes.labelFab
              }}
              onClick={handleOpenDialogCreateCVD}
              disabled={user.qlCVD ? false : true}
            >
              <AddIcon className={classes.extendedIcon} />
              <div className={classes.textFab}>{'Tạo cv đến '}</div>
            </Fab>
          )
        ) : !props.open ? (
          // Create new
          <Fab
            variant={'round'}
            color="primary"
            size={'medium'}
            className={classes.createNew}
            onClick={handleOpenDialogCreateCVDI}
            disabled={user.qlCVDI ? false : true}
          >
            <AddIcon />
          </Fab>
        ) : (
          // Create new extended
          <Fab
            variant={'extended'}
            color="primary"
            className={classes.createNew}
            classes={{
              extended: classes.createNewExtended,
              label: classes.labelFab
            }}
            onClick={handleOpenDialogCreateCVDI}
            disabled={user.qlCVDI ? false : true}
          >
            <AddIcon className={classes.extendedIcon} />
            <div className={classes.textFab}>{'Tạo cv đi '}</div>
          </Fab>
        )}
        <List>
          <ListItem
            button
            className={classes.drawListItem}
            selected={Menu === 'CVD'}
            onClick={() => handleSetMenu('CVD')}
            disabled={user.qlCVD ? false : true}
          >
            <ListItemIcon>
              {listCVD[0] ? (
                <Badge
                  badgeContent={
                    listCVD.filter(el => el.notification === true).length
                  }
                  color="secondary"
                  max={99}
                >
                  <MoveToInbox />
                </Badge>
              ) : (
                <Badge badgeContent={0} color="secondary" max={99}>
                  <MoveToInbox />
                </Badge>
              )}
            </ListItemIcon>
            <ListItemText primary={'Công văn đến'} />
          </ListItem>
          <ListItem
            disabled={user.qlCVDI ? false : true}
            button
            className={classes.drawListItem}
            selected={Menu === 'CVDI'}
            onClick={() => handleSetMenu('CVDI')}
          >
            <ListItemIcon>
              <TelegramIcon />
            </ListItemIcon>
            <ListItemText primary={'Công văn đi'} />
          </ListItem>
          <ListItem
            button
            className={classes.drawListItem}
            onClick={() => handleSetMenu('QLCV')}
            selected={Menu === 'QLCV'}
          >
            <ListItemIcon>
              <Badge
                badgeContent={
                  listQLCV.filter(e => e.notificationQLCV === true).length
                }
                color="secondary"
                max={99}
              >
                <TimerIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={'Quản lý CV'} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            disabled={user.qlDM ? false : true}
            button
            onClick={handleClickDanhMuc}
            className={classes.drawListItem}
          >
            <ListItemIcon>
              <CollectionsBookmarkIcon />
            </ListItemIcon>
            <ListItemText primary={'Danh muc'} />
            {openDanhMuc ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openDanhMuc} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              className={classes.drawListItem}
            >
              <ListItem
                onClick={() => handleSetMenu('danhMuc')}
                disabled={user.qlDM ? false : true}
                button
                className={props.open ? classes.nested : ''}
                selected={Menu === 'danhMuc'}
              >
                <ListItemIcon>
                  <SupervisorAccountIcon />
                </ListItemIcon>
                <ListItemText primary="Người dùng" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Drawer>

      <main className={props.open ? classes.content : classes.content2}>
        <div className={classes.toolbar} />

        {(Menu === 'CVD' && <TablesCVD />) ||
          (Menu === 'CVDI' && <TablesCVDI />) ||
          (Menu === 'QLCV' && <TablesQLCV />) ||
          (Menu === 'danhMuc' && <DanhMuc />)}
      </main>
    </div>
  );
}
