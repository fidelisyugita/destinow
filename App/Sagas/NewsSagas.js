import {put} from 'redux-saga/effects';

import NewsActions from '../Redux/NewsRedux';

import {httpsCallable} from './Utils';
import {GET_NEWS, GET_RECOMMENDED_NEWS} from './Consts';

export function* getNews(api, action) {
  try {
    const response = yield httpsCallable(GET_NEWS, action.data);

    console.tron.log({getNews: response});

    if (response.data.ok) {
      yield put(NewsActions.getNewsSuccess(response.data.payload));
      if (action.callback)
        action.callback({ok: true, data: response.data.payload});
    } else {
      yield put(NewsActions.getNewsFailure(response.data.error));
      if (action.callback)
        action.callback({ok: false, error: response.data.error});
    }
  } catch (error) {
    yield put(NewsActions.getNewsFailure(error));
    if (action.callback) action.callback({ok: false, error});
  }
}

export function* getRecommendedNews(api, action) {
  try {
    const response = yield httpsCallable(GET_RECOMMENDED_NEWS, action.data);

    console.tron.log({getRecommendedNews: response});

    if (response.data.ok) {
      yield put(NewsActions.getRecommendedNewsSuccess(response.data.payload));
      if (action.callback)
        action.callback({ok: true, data: response.data.payload});
    } else {
      yield put(NewsActions.getRecommendedNewsFailure(response.data.error));
      if (action.callback)
        action.callback({ok: false, error: response.data.error});
    }
  } catch (error) {
    yield put(NewsActions.getRecommendedNewsFailure(error));
    if (action.callback) action.callback({ok: false, error});
  }
}
