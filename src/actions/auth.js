import { put, call, takeLatest, select } from 'redux-saga/effects';
import {fetchData} from 'utils/fetch';

export const changeEmail = (email) => {
  return {
    type: 'LOGIN_FORM_EMAIL',
    payload: email
  };
};

export const changePassword = (password) => {
  return {
    type: 'LOGIN_FORM_PASSWORD',
    payload: password
  };
};

export const onLoginClick = () => {
  return {
    type: 'DO_LOGIN_REQUEST'
  };
};

export const onLoginClearError = () => {
  return {
    type: 'LOGIN_ERROR_CLEAR'
  };
};

function* doAjaxLogin() {
  const data = yield select((state) => {
    return {
      email: state.auth.email,
      password: state.auth.password
    };
  });

  try {
    yield put({ type: 'LOGIN_START_REQUEST' });
    const userInfo = yield call(fetchData, {url: '/login', method: 'POST', data: data});

    if (userInfo.token) {
      if (typeof (Storage) !== 'undefined') {
        if (localStorage.userName && localStorage.userName !== userInfo.userName) {
          yield put(onCloseRegister());
        }
        sessionStorage.jwt_token = userInfo.token;
        localStorage.userName = userInfo.userName;
      } else {
        yield put({ type: 'LOGIN_ERROR', payload: 'You may use an old version of browser, please update to the latest version' });
      }
      yield put({ type: 'LOGIN_SUCCESS', payload: { token: userInfo.token, userName: userInfo.userName } });
      yield put({ type: 'SYNC_USER_ITEMS' });
    } else {
      yield put({ type: 'LOGIN_ERROR', payload: userInfo.code ? userInfo.code : 'Login failed' });
    }
  } catch (error) {
    yield put({ type: 'LOGIN_ERROR', payload: 'There is an error while login to server' });
  }

  yield put({ type: 'LOGIN_FINISH_REQUEST' });
}

export function* loginSaga() {
  yield takeLatest('DO_LOGIN_REQUEST', doAjaxLogin);
}
