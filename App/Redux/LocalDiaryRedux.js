import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

import I18n from '../I18n';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getLocalDiariesRequest: ['data', 'callback'],
  getLocalDiariesSuccess: ['payload'],
  getLocalDiariesFailure: ['error'],

  getRecommendedLocalDiariesRequest: ['data', 'callback'],
  getRecommendedLocalDiariesSuccess: ['payload'],
  getRecommendedLocalDiariesFailure: ['error'],
});

export const LocalDiaryTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const DEFAULT_STATE = {
  data: null,
  fetching: false,
  payload: null,
  error: null,
};

export const INITIAL_STATE = Immutable({
  localDiaries: [],

  getLocalDiaries: DEFAULT_STATE,
  getRecommendedLocalDiaries: DEFAULT_STATE,
});

/* ------------- Reducers ------------- */

export const getLocalDiariesRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getLocalDiaries: {...state.getLocalDiaries, fetching: true, data},
  });
};
export const getLocalDiariesSuccess = (state, {payload}) => {
  const {data} = state.getLocalDiaries;
  const page = (data && data.page) || 0;

  return state.merge({
    ...state,
    getLocalDiaries: {DEFAULT_STATE, payload},
    localDiaries: page > 0 ? [...state.localDiaries, ...payload] : [...payload],
  });
};
export const getLocalDiariesFailure = (state, {error}) => {
  return state.merge({
    ...state,
    getLocalDiaries: {...state.getLocalDiaries, fetching: false, error},
  });
};

export const getRecommendedLocalDiariesRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getRecommendedLocalDiaries: {
      ...state.getRecommendedLocalDiaries,
      fetching: true,
      data,
    },
  });
};
export const getRecommendedLocalDiariesSuccess = (state, {payload}) => {
  return state.merge({
    ...state,
    getRecommendedLocalDiaries: {DEFAULT_STATE, payload},
  });
};
export const getRecommendedLocalDiariesFailure = (state, {error}) => {
  return state.merge({
    ...state,
    getRecommendedLocalDiaries: {
      ...state.getRecommendedLocalDiaries,
      fetching: false,
      error,
    },
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_LOCAL_DIARIES_REQUEST]: getLocalDiariesRequest,
  [Types.GET_LOCAL_DIARIES_SUCCESS]: getLocalDiariesSuccess,
  [Types.GET_LOCAL_DIARIES_FAILURE]: getLocalDiariesFailure,

  [Types.GET_RECOMMENDED_LOCAL_DIARIES_REQUEST]: getRecommendedLocalDiariesRequest,
  [Types.GET_RECOMMENDED_LOCAL_DIARIES_SUCCESS]: getRecommendedLocalDiariesSuccess,
  [Types.GET_RECOMMENDED_LOCAL_DIARIES_FAILURE]: getRecommendedLocalDiariesFailure,
});
