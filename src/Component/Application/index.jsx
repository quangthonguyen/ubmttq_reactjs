import React from 'react';
import Appbar from '../Appbar';
import { useDispatch } from 'react-redux';
// import useShallowEqualSelector from '../../Redux/useShallowEqualSelector';

function Application() {
  //use Selector
  // const user = useShallowEqualSelector(state => state.users);
  //use dispatch
  const dispatch = useDispatch();
  dispatch({ type: 'FETCH_USER_JWT' });
  // dispatch({ type: 'GET_LIST_USERS' });
  // dispatch({ type: 'USER_FETCH_CVD' });
  return (
    <>
      {/* {!user ? <Redirect to="/signin" /> :  */}
      <Appbar />
      {/* } */}
    </>
  );
}

export default Application;
