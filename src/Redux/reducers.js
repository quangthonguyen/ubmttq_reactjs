import users from './Slice/usersSlice';
import notifier from './reducers/notifier';
import { combineReducers } from '@reduxjs/toolkit';
import listUsers from './Slice/listUsers';
import listCVD from './Slice/listCVD';
import listCVDI from './Slice/listCVDI';
import listQLCV from './Slice/listQLCV';

const rootReducer = combineReducers({
  users,
  notifier,
  listUsers,
  listCVD,
  listCVDI,
  listQLCV
});

export default rootReducer;
