import {put} from 'redux-saga/effects';

import RestaurantActions from '../Redux/RestaurantRedux';

import {httpsCallable} from './Utils';
import {GET_RESTAURANTS, GET_RECOMMENDED_RESTAURANTS} from './Consts';

export function* getRestaurants(api, action) {
  try {
    const response = yield httpsCallable(GET_RESTAURANTS, action.data);

    console.tron.log({getRestaurants: response});

    if (response.data.ok) {
      yield put(RestaurantActions.getRestaurantsSuccess(response.data.payload));
      if (action.callback)
        action.callback({ok: true, data: response.data.payload});
    } else {
      yield put(RestaurantActions.getRestaurantsFailure(response.data.error));
      if (action.callback)
        action.callback({ok: false, error: response.data.error});
    }
  } catch (error) {
    yield put(RestaurantActions.getRestaurantsFailure(error));
    if (action.callback) action.callback({ok: false, error});
  }
}

export function* getRecommendedRestaurants(api, action) {
  try {
    const response = yield httpsCallable(
      GET_RECOMMENDED_RESTAURANTS,
      action.data,
    );

    console.tron.log({getRecommendedRestaurants: response});

    if (response.data.ok) {
      yield put(
        RestaurantActions.getRecommendedRestaurantsSuccess(
          response.data.payload,
        ),
      );
      if (action.callback)
        action.callback({ok: true, data: response.data.payload});
    } else {
      yield put(
        RestaurantActions.getRecommendedRestaurantsFailure(response.data.error),
      );
      if (action.callback)
        action.callback({ok: false, error: response.data.error});
    }
  } catch (error) {
    yield put(RestaurantActions.getRecommendedRestaurantsFailure(error));
    if (action.callback) action.callback({ok: false, error});
  }
}
