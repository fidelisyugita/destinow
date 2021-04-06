import {put} from 'redux-saga/effects';

import SouvenirActions from '../Redux/SouvenirRedux';

import {httpsCallable} from './Utils';
import {GET_SOUVENIRS, GET_RECOMMENDED_SOUVENIRS} from './Consts';

export function* getSouvenirs(api, action) {
  try {
    const response = yield httpsCallable(GET_SOUVENIRS, action.data);

    console.tron.log({getSouvenirs: response});

    if (response.data.ok) {
      yield put(SouvenirActions.getSouvenirsSuccess(response.data.payload));
      if (action.callback)
        action.callback({ok: true, data: response.data.payload});
    } else {
      yield put(SouvenirActions.getSouvenirsFailure(response.data.error));
      if (action.callback)
        action.callback({ok: false, error: response.data.error});
    }
  } catch (error) {
    yield put(SouvenirActions.getSouvenirsFailure(error));
    if (action.callback) action.callback({ok: false, error});
  }
}

export function* getRecommendedSouvenirs(api, action) {
  try {
    const response = yield httpsCallable(
      GET_RECOMMENDED_SOUVENIRS,
      action.data,
    );

    console.tron.log({getRecommendedSouvenirs: response});

    if (response.data.ok) {
      yield put(
        SouvenirActions.getRecommendedSouvenirsSuccess(response.data.payload),
      );
      if (action.callback)
        action.callback({ok: true, data: response.data.payload});
    } else {
      yield put(
        SouvenirActions.getRecommendedSouvenirsFailure(response.data.error),
      );
      if (action.callback)
        action.callback({ok: false, error: response.data.error});
    }
  } catch (error) {
    yield put(SouvenirActions.getRecommendedSouvenirsFailure(error));
    if (action.callback) action.callback({ok: false, error});
  }
}
