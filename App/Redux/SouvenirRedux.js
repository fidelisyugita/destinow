import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

import I18n from '../I18n';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getSouvenirsRequest: ['data', 'callback'],
  getSouvenirsSuccess: ['payload'],
  getSouvenirsFailure: ['error'],

  getRecommendedSouvenirsRequest: ['data', 'callback'],
  getRecommendedSouvenirsSuccess: ['payload'],
  getRecommendedSouvenirsFailure: ['error'],
});

export const SouvenirTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const DEFAULT_STATE = {
  data: null,
  fetching: false,
  payload: null,
  error: null,
};

export const INITIAL_STATE = Immutable({
  souvenirs: [],

  getSouvenirs: DEFAULT_STATE,
  getRecommendedSouvenirs: DEFAULT_STATE,
});

/* ------------- Reducers ------------- */

export const getSouvenirsRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getSouvenirs: {...state.getSouvenirs, fetching: true, data},
  });
};
export const getSouvenirsSuccess = (state, {payload}) => {
  const {data} = state.getSouvenirs;
  const page = (data && data.page) || 0;

  return state.merge({
    ...state,
    getSouvenirs: {DEFAULT_STATE, payload},
    souvenirs: page > 0 ? [...state.souvenirs, ...payload] : [...payload],
  });
};
export const getSouvenirsFailure = (state, {error}) => {
  return state.merge({
    ...state,
    getSouvenirs: {...state.getSouvenirs, fetching: false, error},
  });
};

export const getRecommendedSouvenirsRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getRecommendedSouvenirs: {
      ...state.getRecommendedSouvenirs,
      fetching: true,
      data,
    },
  });
};
export const getRecommendedSouvenirsSuccess = (state, {payload}) => {
  return state.merge({
    ...state,
    getRecommendedSouvenirs: {DEFAULT_STATE, payload},
  });
};
export const getRecommendedSouvenirsFailure = (state, {error}) => {
  return state.merge({
    ...state,
    getRecommendedSouvenirs: {
      ...state.getRecommendedSouvenirs,
      fetching: false,
      error,
    },
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_SOUVENIRS_REQUEST]: getSouvenirsRequest,
  [Types.GET_SOUVENIRS_SUCCESS]: getSouvenirsSuccess,
  [Types.GET_SOUVENIRS_FAILURE]: getSouvenirsFailure,

  [Types.GET_RECOMMENDED_SOUVENIRS_REQUEST]: getRecommendedSouvenirsRequest,
  [Types.GET_RECOMMENDED_SOUVENIRS_SUCCESS]: getRecommendedSouvenirsSuccess,
  [Types.GET_RECOMMENDED_SOUVENIRS_FAILURE]: getRecommendedSouvenirsFailure,
});
