import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

import I18n from '../I18n';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getRestaurantsRequest: ['data', 'callback'],
  getRestaurantsSuccess: ['payload'],
  getRestaurantsFailure: ['error'],

  getRecommendedRestaurantsRequest: ['data', 'callback'],
  getRecommendedRestaurantsSuccess: ['payload'],
  getRecommendedRestaurantsFailure: ['error'],
});

export const RestaurantTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const DEFAULT_STATE = {
  data: null,
  fetching: false,
  payload: null,
  error: null,
};

export const INITIAL_STATE = Immutable({
  restaurants: [],

  getRestaurants: DEFAULT_STATE,
  getRecommendedRestaurants: DEFAULT_STATE,
});

/* ------------- Reducers ------------- */

export const getRestaurantsRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getRestaurants: {...state.getRestaurants, fetching: true, data},
  });
};
export const getRestaurantsSuccess = (state, {payload}) => {
  const {data} = state.getRestaurants;
  const page = (data && data.page) || 0;

  return state.merge({
    ...state,
    getRestaurants: {DEFAULT_STATE, payload},
    restaurants: page > 0 ? [...state.restaurants, ...payload] : [...payload],
  });
};
export const getRestaurantsFailure = (state, {error}) => {
  return state.merge({
    ...state,
    getRestaurants: {...state.getRestaurants, fetching: false, error},
  });
};

export const getRecommendedRestaurantsRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getRecommendedRestaurants: {
      ...state.getRecommendedRestaurants,
      fetching: true,
      data,
    },
  });
};
export const getRecommendedRestaurantsSuccess = (state, {payload}) => {
  return state.merge({
    ...state,
    getRecommendedRestaurants: {DEFAULT_STATE, payload},
  });
};
export const getRecommendedRestaurantsFailure = (state, {error}) => {
  return state.merge({
    ...state,
    getRecommendedRestaurants: {
      ...state.getRecommendedRestaurants,
      fetching: false,
      error,
    },
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_RESTAURANTS_REQUEST]: getRestaurantsRequest,
  [Types.GET_RESTAURANTS_SUCCESS]: getRestaurantsSuccess,
  [Types.GET_RESTAURANTS_FAILURE]: getRestaurantsFailure,

  [Types.GET_RECOMMENDED_RESTAURANTS_REQUEST]: getRecommendedRestaurantsRequest,
  [Types.GET_RECOMMENDED_RESTAURANTS_SUCCESS]: getRecommendedRestaurantsSuccess,
  [Types.GET_RECOMMENDED_RESTAURANTS_FAILURE]: getRecommendedRestaurantsFailure,
});
