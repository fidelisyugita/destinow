import {put} from 'redux-saga/effects';

import TransportActions from '../Redux/TransportRedux';

import {httpsCallable} from './Utils';
import {GET_TRANSPORTS, GET_RECOMMENDED_TRANSPORTS} from './Consts';

export function* getTransports(api, action) {
  try {
    const response = yield httpsCallable(GET_TRANSPORTS, action.data);

    console.tron.log({getTransports: response});

    if (response.data.ok) {
      yield put(TransportActions.getTransportsSuccess(response.data.payload));
      if (action.callback)
        action.callback({ok: true, data: response.data.payload});
    } else {
      yield put(TransportActions.getTransportsFailure(response.data.error));
      if (action.callback)
        action.callback({ok: false, error: response.data.error});
    }
  } catch (error) {
    yield put(TransportActions.getTransportsFailure(error));
    if (action.callback) action.callback({ok: false, error});
  }
}

export function* getRecommendedTransports(api, action) {
  try {
    const response = yield httpsCallable(
      GET_RECOMMENDED_TRANSPORTS,
      action.data,
    );

    console.tron.log({getRecommendedTransports: response});

    if (response.data.ok) {
      yield put(
        TransportActions.getRecommendedTransportsSuccess(response.data.payload),
      );
      if (action.callback)
        action.callback({ok: true, data: response.data.payload});
    } else {
      yield put(
        TransportActions.getRecommendedTransportsFailure(response.data.error),
      );
      if (action.callback)
        action.callback({ok: false, error: response.data.error});
    }
  } catch (error) {
    yield put(TransportActions.getRecommendedTransportsFailure(error));
    if (action.callback) action.callback({ok: false, error});
  }
}
