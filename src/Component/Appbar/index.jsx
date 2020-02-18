import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Account from './account';
import Drawer from '../Drawer';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  grow: {
    flexGrow: 1
  },
  toolappBar: {
    paddingLeft: theme.spacing(2),
    paddingRight: '0px'
  }
}));

export default function Navbar() {
  // use State
  const [open, setOpen] = React.useState(true);
  const handleDrawerToggle = () => {
    setOpen(state => !state);
  };
  //style
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar variant="dense" className={classes.toolappBar}>
            {/* Menu button */}
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            {/* Logo */}

            <img
              className={classes.menuButton}
              src={process.env.PUBLIC_URL + 'UBMTTQ.png'}
              alt="UBNDMTTQ"
              height="25"
              width="28"
            />
            <Typography variant="subtitle2" noWrap>
              Ủy ban mặt trận tổ quốc Q.Bình Thạnh
            </Typography>
            {/* Search Component */}

            <div className={classes.grow} />
            <Account />
          </Toolbar>
        </AppBar>
        {/* Desktop Menu */}
      </div>
      <Drawer open={open} />
    </>
  );
}
