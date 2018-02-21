import { all } from 'redux-saga/effects';

import { loginSaga } from './auth';
import checkOnlineStatus from './offline';

export function* rootSaga() {
  yield all([
    checkOnlineStatus(),
    loginSaga(),
  ]);
}

export default rootSaga;
