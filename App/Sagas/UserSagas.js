import {put} from 'redux-saga/effects';

import UserActions from '../Redux/UserRedux';
import SessionActions from '../Redux/SessionRedux';

import {httpsCallable} from './Utils';
import {SAVE_USER} from './Consts';

export function* saveUser(api, action) {
  try {
    const response = yield httpsCallable(SAVE_USER, action.data);

    console.tron.log({saveUser: response});

    if (response.data.ok) {
      yield put(UserActions.saveUserSuccess(response.data.payload));
      yield put(SessionActions.saveUser(response.data.payload));
      if (action.callback)
        action.callback({ok: true, data: response.data.payload});
    } else {
      yield put(UserActions.saveUserFailure(response.data.error));
      if (action.callback)
        action.callback({ok: false, error: response.data.error});
    }
  } catch (error) {
    yield put(UserActions.saveUserFailure(error));
    if (action.callback) action.callback({ok: false, error});
  }
}
