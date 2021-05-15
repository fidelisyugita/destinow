import {put} from 'redux-saga/effects';

import LocalDiaryActions from '../Redux/LocalDiaryRedux';

import {httpsCallable} from './Utils';
import {GET_LOCAL_DIARIES, GET_RECOMMENDED_LOCAL_DIARIES} from './Consts';

export function* getLocalDiaries(api, action) {
  try {
    const response = yield httpsCallable(GET_LOCAL_DIARIES, action.data);

    console.tron.log({getLocalDiaries: response});

    if (response.data.ok) {
      yield put(
        LocalDiaryActions.getLocalDiariesSuccess(response.data.payload),
      );
      if (action.callback)
        action.callback({ok: true, data: response.data.payload});
    } else {
      yield put(LocalDiaryActions.getLocalDiariesFailure(response.data.error));
      if (action.callback)
        action.callback({ok: false, error: response.data.error});
    }
  } catch (error) {
    yield put(LocalDiaryActions.getLocalDiariesFailure(error));
    if (action.callback) action.callback({ok: false, error});
  }
}

export function* getRecommendedLocalDiaries(api, action) {
  try {
    const response = yield httpsCallable(
      GET_RECOMMENDED_LOCAL_DIARIES,
      action.data,
    );

    console.tron.log({getRecommendedLocalDiaries: response});

    if (response.data.ok) {
      yield put(
        LocalDiaryActions.getRecommendedLocalDiariesSuccess(
          response.data.payload,
        ),
      );
      if (action.callback)
        action.callback({ok: true, data: response.data.payload});
    } else {
      yield put(
        LocalDiaryActions.getRecommendedLocalDiariesFailure(
          response.data.error,
        ),
      );
      if (action.callback)
        action.callback({ok: false, error: response.data.error});
    }
  } catch (error) {
    yield put(LocalDiaryActions.getRecommendedLocalDiariesFailure(error));
    if (action.callback) action.callback({ok: false, error});
  }
}
