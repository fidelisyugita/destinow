import {put} from 'redux-saga/effects';

import BannerActions from '../Redux/BannerRedux';

import {httpsCallable} from './Utils';
import {GET_BANNERS} from './Consts';

export function* getBanners(api, action) {
  try {
    const response = yield httpsCallable(GET_BANNERS, action.data);

    console.tron.log({getBanners: response});

    if (response.data.ok) {
      yield put(BannerActions.getBannersSuccess(response.data.payload));
      if (action.callback)
        action.callback({ok: true, data: response.data.payload});
    } else {
      yield put(BannerActions.getBannersFailure(response.data.error));
      if (action.callback)
        action.callback({ok: false, error: response.data.error});
    }
  } catch (error) {
    yield put(BannerActions.getBannersFailure(error));
    if (action.callback) action.callback({ok: false, error});
  }
}
