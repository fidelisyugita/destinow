import {put} from 'redux-saga/effects';

import PlaceActions from '../Redux/PlaceRedux';

import {httpsCallable} from './Utils';
import {GET_PLACES} from './Consts';

export function* getPlaces(api, action) {
  try {
    const response = yield httpsCallable(GET_PLACES, action.data);

    console.tron.log({getPlaces: response});

    if (response.data.ok) {
      yield put(PlaceActions.getPlacesSuccess(response.data.payload));
      if (action.callback)
        action.callback({ok: true, data: response.data.payload});
    } else {
      yield put(PlaceActions.getPlacesFailure(response.data.error));
      if (action.callback)
        action.callback({ok: false, error: response.data.error});
    }
  } catch (error) {
    yield put(PlaceActions.getPlacesFailure(error));
    if (action.callback) action.callback({ok: false, error});
  }
}
