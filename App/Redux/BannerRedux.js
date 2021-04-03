import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

import I18n from '../I18n';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getBannersRequest: ['data', 'callback'],
  getBannersSuccess: ['payload'],
  getBannersFailure: ['error'],
});

export const BannerTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const DEFAULT_STATE = {
  data: null,
  fetching: false,
  payload: null,
  error: null,
};

export const INITIAL_STATE = Immutable({
  getBanners: DEFAULT_STATE,
});

/* ------------- Reducers ------------- */

export const getBannersRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getBanners: {...state.getBanners, fetching: true, data},
  });
};
export const getBannersSuccess = (state, {payload}) => {
  return state.merge({
    ...state,
    getBanners: {DEFAULT_STATE, payload},
  });
};
export const getBannersFailure = (state, {error}) => {
  return state.merge({
    ...state,
    getBanners: {...state.getBanners, fetching: false, error},
  });
};
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_BANNERS_REQUEST]: getBannersRequest,
  [Types.GET_BANNERS_SUCCESS]: getBannersSuccess,
  [Types.GET_BANNERS_FAILURE]: getBannersFailure,
});
