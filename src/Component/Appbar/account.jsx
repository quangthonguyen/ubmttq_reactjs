import React, { useState } from 'react';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useShallowEqualSelector from '../../Redux/useShallowEqualSelector';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ChangePass from '../Dialogs/ChangePass';
import ChangeInfoUser from '../Dialogs/ChangeInfoUser';
import FeatherClient from '../../FeatherClient/FeatherConfigure';
const useStyles = makeStyles(theme => ({
  arrow: {
    position: 'absolute',
    fontSize: theme.spacing(1.3),
    borderLeft: '1em solid transparent',
    borderRight: '1em solid transparent',
    borderBottom: '1em solid #fff',
    marginTop: theme.spacing(-4.3)
  },
  small: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5)
  },
  name: {
    [theme.breakpoints.up('sm')]: {
      width: '97px'
    }
  },
  profileName: {
    margin: 'auto',
    textAlign: 'center'
  },
  profile: {
    boxShadow: 'none',
    textTransform: 'none'
  },
  prorfileCon: {
    width: 'auto',
    padding: theme.spacing(3)
  },
  large: {
    margin: 'auto',
    width: theme.spacing(12),
    height: theme.spacing(12)
  }
}));

export default function SectionDesktop() {
  // use Dispatch
  const dispatch = useDispatch();
  // State
  const [anchorEl, setanchorEl] = useState(null);
  const [arrowRef, setarrowRef] = useState(null);

  const handleToggle = event => {
    setanchorEl(anchorEl ? null : event.currentTarget);
  };
  // const handleClose = () => {
  //   setanchorEl(null);
  // };
  const handleArrowRef = node => {
    setarrowRef(node);
  };
  // IMG
  const [Img, setImg] = useState('');
  // Style
  const classes = useStyles();
  // Redux useSelecter
  const user = useShallowEqualSelector(state => state.users);
  //
  React.useEffect(() => {
    FeatherClient.service('uploads')
      .get(user.avatarId)
      .then(data => {
        setImg(data.uri);
      })
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }, [user]);
  return (
    <>
      {!user ? <Redirect to="/signin" /> : ''}
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleToggle}
        startIcon={
          <Avatar alt="Remy Sharp" src={Img} className={classes.small} />
        }
        className={classes.profile}
        disableElevation={true}
      >
        <Typography variant="subtitle1" className={classes.name} noWrap>
          {user.fristName !== undefined && `${user.fristName}`}
        </Typography>
      </Button>

      {/* Popper */}

      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        transition
        placement="bottom"
        disablePortal={true}
        modifiers={{
          flip: {
            enabled: false
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'viewport'
          },
          arrow: {
            enabled: true,
            element: arrowRef
          }
        }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper className={classes.prorfileCon}>
              <span className={classes.arrow} ref={handleArrowRef} />

              <ClickAwayListener
                onClickAway={() => {
                  '';
                }}
              >
                <Grid container direction="column">
                  <Grid item>
                    <Avatar
                      alt="Remy Sharp"
                      src={Img}
                      className={classes.large}
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="subtitle1"
                      className={classes.profileName}
                      noWrap
                    >
                      {`Họ và tên : ${user.lastName} ${user.fristName}`}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="subtitle1"
                      className={classes.profileName}
                      noWrap
                    >
                      {`Chức vụ : ${user.chucVu}`}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      fullWidth
                      color="primary"
                      onClick={() => dispatch({ type: 'USER_LOGOUT' })}
                    >
                      Đăng xuất
                    </Button>
                  </Grid>
                  <Grid
                    container
                    justify="space-between"
                    spacing={2}
                    className={classes.lik}
                  >
                    <ChangePass email={user.email} />
                    <ChangeInfoUser infoUser={user} />
                  </Grid>
                </Grid>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
