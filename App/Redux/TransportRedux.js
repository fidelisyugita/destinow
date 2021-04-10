import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

import I18n from '../I18n';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getTransportsRequest: ['data', 'callback'],
  getTransportsSuccess: ['payload'],
  getTransportsFailure: ['error'],

  getRecommendedTransportsRequest: ['data', 'callback'],
  getRecommendedTransportsSuccess: ['payload'],
  getRecommendedTransportsFailure: ['error'],
});

export const TransportTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const DEFAULT_STATE = {
  data: null,
  fetching: false,
  payload: null,
  error: null,
};

export const INITIAL_STATE = Immutable({
  transports: [],

  getTransports: DEFAULT_STATE,
  getRecommendedTransports: DEFAULT_STATE,
});

/* ------------- Reducers ------------- */

export const getTransportsRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getTransports: {...state.getTransports, fetching: true, data},
  });
};
export const getTransportsSuccess = (state, {payload}) => {
  const {data} = state.getTransports;
  const page = (data && data.page) || 0;

  return state.merge({
    ...state,
    getTransports: {DEFAULT_STATE, payload},
    transports: page > 0 ? [...state.transports, ...payload] : [...payload],
  });
};
export const getTransportsFailure = (state, {error}) => {
  return state.merge({
    ...state,
    getTransports: {...state.getTransports, fetching: false, error},
  });
};

export const getRecommendedTransportsRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getRecommendedTransports: {
      ...state.getRecommendedTransports,
      fetching: true,
      data,
    },
  });
};
export const getRecommendedTransportsSuccess = (state, {payload}) => {
  return state.merge({
    ...state,
    getRecommendedTransports: {DEFAULT_STATE, payload},
  });
};
export const getRecommendedTransportsFailure = (state, {error}) => {
  return state.merge({
    ...state,
    getRecommendedTransports: {
      ...state.getRecommendedTransports,
      fetching: false,
      error,
    },
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_TRANSPORTS_REQUEST]: getTransportsRequest,
  [Types.GET_TRANSPORTS_SUCCESS]: getTransportsSuccess,
  [Types.GET_TRANSPORTS_FAILURE]: getTransportsFailure,

  [Types.GET_RECOMMENDED_TRANSPORTS_REQUEST]: getRecommendedTransportsRequest,
  [Types.GET_RECOMMENDED_TRANSPORTS_SUCCESS]: getRecommendedTransportsSuccess,
  [Types.GET_RECOMMENDED_TRANSPORTS_FAILURE]: getRecommendedTransportsFailure,
});
