import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects';
import featherClient from '../FeatherClient/FeatherConfigure';
import { enqueueSnackbar } from '../Redux/actions/notifier';
import { login, logout, updateUser } from '../Redux/Slice/usersSlice';
import { getList, updateListUsers } from '../Redux/Slice/listUsers';
import {
  getListCVD,
  creatCVD,
  updateCVD,
  updatedCVD,
  deleteCVD,
} from '../Redux/Slice/listCVD';
import {
  getListCVDI,
  creatCVDI,
  updateCVDI,
  deleteCVDI,
} from '../Redux/Slice/listCVDI';
import {
  getListQLCV,
  creatQLCV,
  updateQLCV,
  // deleteQLCV
} from '../Redux/Slice/listQLCV';

const vbd = featherClient.service('vbd');
const vbdi = featherClient.service('vbdi');
const users = featherClient.service('users');

// JWT
function* fetchUserJwt(action) {
  try {
    const data = yield call(featherClient.reAuthenticate);
    const data2 = yield call([users, users.find], '');
    const data5 = yield call([vbd, vbd.find], {
      query: {
        nguoiThucHien: {
          $in: [data.user['_id']],
        },
        $sort: {
          notificationQLCV: 1,
        },
      },
    });
    console.log(data5);
    yield all([
      put(login(data.user)),
      put(getList(data2.data)),
      put(getListQLCV(data5.data)),
    ]);
    if (data.user.qlCVD) {
      const data3 = yield call([vbd, vbd.find], {
        query: {
          $sort: {
            notification: 1,
          },
        },
      });
      yield put(getListCVD(data3.data));
    }
    if (data.user.qlCVDI) {
      const data4 = yield call([vbdi, vbdi.find], '');
      yield put(getListCVDI(data4.data));
    }
    for (let index = 0; index < data5.data.length; index++) {
      if (data5.data[index].trangThai === 'Gần hết hạn') {
        yield put(
          enqueueSnackbar({
            message: `${data5.data[index].loaiVb} số ${data5.data[index].soVb} gần hết hạn ! `,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'warning',
              autoHideDuration: 6000,
            },
          })
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
}
// Logout
function* UserLogout(action) {
  try {
    yield call(featherClient.logout);
    yield put(logout());
  } catch (error) {
    console.log(error);
  }
}
//Login
function* UserLogin(action) {
  try {
    const data = yield call(featherClient.authenticate, {
      strategy: 'local',
      email: action.payload.email,
      password: action.payload.password,
    });
    yield put(login(data.user));
    yield put(
      enqueueSnackbar({
        message: `Xin chào ${data.user.lastName} ${data.user.fristName} ! `,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'info',
        },
      })
    );
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Email hoặc password không chính xác!',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'error',
        },
      })
    );
    console.log(error);
  }
}
// Get List users
function* GetListUsers(action) {
  try {
    const data = yield call([users, users.find], '');
    yield put(getList(data.data));
  } catch (error) {
    console.log(error);
  }
}
//CreateCVD
function* UsersCreateCVD(action) {
  try {
    const data = yield call([vbd, vbd.create], action.payload);
    yield put(creatCVD(data));
  } catch (error) {
    console.log(error);
  }
}
//add QLCV
function* UsersAddQLCV(action) {
  try {
    yield put(creatQLCV(action.payload));
    yield put(
      enqueueSnackbar({
        message: `Bạn có ${action.payload.loaiVb} mới , Số VB : ${action.payload.soVb} ! `,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'info',
          autoHideDuration: 3000,
        },
      })
    );
  } catch (error) {
    console.log(error);
  }
}
//CreateCVDI
function* UsersCreateCVDI(action) {
  try {
    const data = yield call([vbdi, vbdi.create], action.payload);
    yield put(creatCVDI(data));
  } catch (error) {
    console.log(error);
  }
}
//Fetch CVD
function* UsersFetchCVD(action) {
  try {
    const data = yield call([vbd, vbd.find], '');
    yield put(getListCVD(data.data));
  } catch (error) {
    console.log(error);
  }
}
//Update CVD
function* UsersUpdateCVD(action) {
  try {
    yield call([vbd, vbd.patch], action.payload.id, action.payload.updateField);
    yield put(updateCVD(action.payload));
  } catch (error) {
    console.log(error);
  }
}
//Update list users
function* UpdateUsersList(action) {
  try {
    yield call(
      [users, users.patch],
      action.payload.id,
      action.payload.updateField
    );
    yield put(updateListUsers(action.payload));
  } catch (error) {
    console.log(error);
  }
}
//Finish QLCV
function* UserFinishQLCV(action) {
  try {
    yield call([vbd, vbd.patch], action.payload.id, {
      notificationQLCV: false,
      ...action.payload.updateField,
    });
    yield put(updateQLCV(action.payload));
    yield put(
      updateQLCV({
        id: action.payload.id,
        updateField: {
          custom: 'Hoàn thành',
          notificationQLCV: false,
          ...action.payload.updateField,
        },
      })
    );
  } catch (error) {
    console.log(error);
  }
}
//Update CVD
function* UsersUpdateCVDI(action) {
  try {
    yield call(
      [vbdi, vbdi.patch],
      action.payload.id,
      action.payload.updateField
    );
    yield put(updateCVDI(action.payload));
  } catch (error) {
    console.log(error);
  }
}
//Delete CVD
function* UsersDeleteCVD(action) {
  try {
    yield call([vbd, vbd.remove], action.payload);
    yield put(deleteCVD(action.payload));
  } catch (error) {
    console.log(error);
  }
}
//Delete CVDI
function* UsersDeleteCVDI(action) {
  try {
    yield call([vbdi, vbdi.remove], action.payload);
    yield put(deleteCVDI(action.payload));
  } catch (error) {
    console.log(error);
  }
}
//update notification CVD
function* UpdateNotificationCVD(action) {
  try {
    yield call([vbd, vbd.patch], action.payload.id, action.payload.updateField);
    yield put(updateCVD(action.payload));
  } catch (error) {
    console.log(error);
  }
}
//update notification QLCV
function* UpdateNotificationQLCV(action) {
  try {
    yield call([vbd, vbd.patch], action.payload.id, action.payload.updateField);
    yield put(updateQLCV(action.payload));
  } catch (error) {
    console.log(error);
  }
}
//updated CVD
function* UsersUpdatedCVD(action) {
  try {
    yield put(updatedCVD(action.payload));
    if (
      action.payload.trangThai === 'Hoàn thành' &&
      action.payload.notification === true
    ) {
      yield put(
        enqueueSnackbar({
          message: `${action.payload.loaiVb} số : ${action.payload.soVb} Hoàn thành ! `,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'success',
            autoHideDuration: 3000,
          },
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
}
//changeInfoUser
function* changeInfoUser(action) {
  try {
    yield call(
      [users, users.patch],
      action.payload.id,
      action.payload.updateField
    );
    yield put(updateUser(action.payload));
  } catch (error) {
    console.log(error);
  }
}
function* mySaga() {
  yield takeLatest('FETCH_USER_JWT', fetchUserJwt);
  yield takeEvery('USER_LOGIN', UserLogin);
  yield takeEvery('USER_LOGOUT', UserLogout);
  yield takeEvery('GET_LIST_USERS', GetListUsers);
  yield takeLatest('USER_CREATE_CVD', UsersCreateCVD);
  yield takeLatest('USER_CREATE_CVDI', UsersCreateCVDI);
  yield takeLatest('USER_FETCH_CVD', UsersFetchCVD);
  yield takeLatest('USER_UPDATE_CVD', UsersUpdateCVD);
  yield takeLatest('USER_UPDATE_CVDI', UsersUpdateCVDI);
  yield takeLatest('USER_DELETE_CVD', UsersDeleteCVD);
  yield takeLatest('USER_DELETE_CVDI', UsersDeleteCVDI);
  yield takeLatest('UPDATE_NOTIFICATION_CVD', UpdateNotificationCVD);
  yield takeLatest('UPDATE_NOTIFICATION_QLCV', UpdateNotificationQLCV);
  yield takeLatest('USER_FINISH_QLCV', UserFinishQLCV);
  yield takeLatest('USER_ADD_QLCV', UsersAddQLCV);
  yield takeLatest('USER_UPDATED_CVD', UsersUpdatedCVD);
  yield takeLatest('CHANGE_INFO_USER', changeInfoUser);
  yield takeLatest('UPDATE_USERS_LIST', UpdateUsersList);
}

export default mySaga;
