import {put} from 'redux-saga/effects';

import ReviewActions from '../Redux/ReviewRedux';

import {httpsCallable} from './Utils';
import {GET_REVIEWS, SAVE_REVIEW} from './Consts';

export function* getReviews(api, action) {
  try {
    const response = yield httpsCallable(GET_REVIEWS, action.data);

    console.tron.log({getReviews: response});

    if (response.data.ok) {
      yield put(ReviewActions.getReviewsSuccess(response.data.payload));
      if (action.callback)
        action.callback({ok: true, data: response.data.payload});
    } else {
      yield put(ReviewActions.getReviewsFailure(response.data.error));
      if (action.callback)
        action.callback({ok: false, error: response.data.error});
    }
  } catch (error) {
    yield put(ReviewActions.getReviewsFailure(error));
    if (action.callback) action.callback({ok: false, error});
  }
}

export function* saveReview(api, action) {
  try {
    const response = yield httpsCallable(SAVE_REVIEW, action.data);

    console.tron.log({saveReview: response});

    if (response.data.ok) {
      yield put(ReviewActions.saveReviewSuccess(response.data.payload));
      if (action.callback)
        action.callback({ok: true, data: response.data.payload});
    } else {
      yield put(ReviewActions.saveReviewFailure(response.data.error));
      if (action.callback)
        action.callback({ok: false, error: response.data.error});
    }
  } catch (error) {
    yield put(ReviewActions.saveReviewFailure(error));
    if (action.callback) action.callback({ok: false, error});
  }
}
