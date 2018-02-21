import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

function pingServer() {
  return fetch(`${API_BASE_URL}/ping`, {
    method: 'GET',
    headers: { 'content-type': 'application/json' }
  }).then((response) => {
    return response.json().then(result => (result));
  })
    .catch((error) => {
      throw error;
    });
}

export default function* checkOnlineStatus() {
  while (1) {
    // check browser status every 30 seconds
    yield delay(15000);
    if (!navigator.onLine) {
      yield put({ type: 'NAVIGATION_ONLINE_STATUS', payload: false });
    } else {
      try {
        const result = yield call(pingServer);
        if (result && result.status === 'ok') {
          yield put({ type: 'NAVIGATION_ONLINE_STATUS', payload: true });
        } else {
          yield put({ type: 'NAVIGATION_ONLINE_STATUS', payload: false });
        }
      } catch (error) {
        yield put({ type: 'NAVIGATION_ONLINE_STATUS', payload: false });
      }
    }
  }
}
