import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

import I18n from '../I18n';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getReviewsRequest: ['data', 'callback'],
  getReviewsSuccess: ['payload'],
  getReviewsFailure: ['error'],

  saveReviewRequest: ['data', 'callback'],
  saveReviewSuccess: ['payload'],
  saveReviewFailure: ['error'],
});

export const ReviewTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const DEFAULT_STATE = {
  data: null,
  fetching: false,
  payload: null,
  error: null,
};

export const INITIAL_STATE = Immutable({
  reviews: [],

  getReviews: DEFAULT_STATE,
  saveReview: DEFAULT_STATE,
});

/* ------------- Reducers ------------- */

export const getReviewsRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getReviews: {...state.getReviews, fetching: true, data},
    reviews: [],
  });
};
export const getReviewsSuccess = (state, {payload}) => {
  const {data} = state.getReviews;
  const page = (data && data.page) || 0;

  return state.merge({
    ...state,
    getReviews: {DEFAULT_STATE, payload},
    reviews: page > 0 ? [...state.reviews, ...payload] : [...payload],
  });
};
export const getReviewsFailure = (state, {error}) => {
  return state.merge({
    ...state,
    getReviews: {...state.getReviews, fetching: false, error},
  });
};

export const saveReviewRequest = (state, {data}) => {
  return state.merge({
    ...state,
    saveReview: {
      ...state.saveReview,
      fetching: true,
      data,
    },
  });
};
export const saveReviewSuccess = (state, {payload}) => {
  const updatedReviews = [...state.reviews, {...payload}];

  return state.merge({
    ...state,
    saveReview: {DEFAULT_STATE, payload},
    reviews: updatedReviews,
  });
};
export const saveReviewFailure = (state, {error}) => {
  return state.merge({
    ...state,
    saveReview: {
      ...state.saveReview,
      fetching: false,
      error,
    },
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_REVIEWS_REQUEST]: getReviewsRequest,
  [Types.GET_REVIEWS_SUCCESS]: getReviewsSuccess,
  [Types.GET_REVIEWS_FAILURE]: getReviewsFailure,

  [Types.SAVE_REVIEW_REQUEST]: saveReviewRequest,
  [Types.SAVE_REVIEW_SUCCESS]: saveReviewSuccess,
  [Types.SAVE_REVIEW_FAILURE]: saveReviewFailure,
});
