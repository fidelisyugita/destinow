import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

import I18n from '../I18n';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getNewsRequest: ['data', 'callback'],
  getNewsSuccess: ['payload'],
  getNewsFailure: ['error'],

  getRecommendedNewsRequest: ['data', 'callback'],
  getRecommendedNewsSuccess: ['payload'],
  getRecommendedNewsFailure: ['error'],
});

export const NewsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const DEFAULT_STATE = {
  data: null,
  fetching: false,
  payload: null,
  error: null,
};

export const INITIAL_STATE = Immutable({
  news: [],

  getNews: DEFAULT_STATE,
  getRecommendedNews: DEFAULT_STATE,
});

/* ------------- Reducers ------------- */

export const getNewsRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getNews: {...state.getNews, fetching: true, data},
  });
};
export const getNewsSuccess = (state, {payload}) => {
  const {data} = state.getNews;
  const page = (data && data.page) || 0;

  return state.merge({
    ...state,
    getNews: {DEFAULT_STATE, payload},
    news: page > 0 ? [...state.news, ...payload] : [...payload],
  });
};
export const getNewsFailure = (state, {error}) => {
  return state.merge({
    ...state,
    getNews: {...state.getNews, fetching: false, error},
  });
};

export const getRecommendedNewsRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getRecommendedNews: {
      ...state.getRecommendedNews,
      fetching: true,
      data,
    },
  });
};
export const getRecommendedNewsSuccess = (state, {payload}) => {
  return state.merge({
    ...state,
    getRecommendedNews: {DEFAULT_STATE, payload},
  });
};
export const getRecommendedNewsFailure = (state, {error}) => {
  return state.merge({
    ...state,
    getRecommendedNews: {
      ...state.getRecommendedNews,
      fetching: false,
      error,
    },
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_NEWS_REQUEST]: getNewsRequest,
  [Types.GET_NEWS_SUCCESS]: getNewsSuccess,
  [Types.GET_NEWS_FAILURE]: getNewsFailure,

  [Types.GET_RECOMMENDED_NEWS_REQUEST]: getRecommendedNewsRequest,
  [Types.GET_RECOMMENDED_NEWS_SUCCESS]: getRecommendedNewsSuccess,
  [Types.GET_RECOMMENDED_NEWS_FAILURE]: getRecommendedNewsFailure,
});
