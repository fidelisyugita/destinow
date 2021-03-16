import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

import I18n from '../I18n';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getPlacesRequest: ['data', 'callback'],
  getPlacesSuccess: ['payload'],
  getPlacesFailure: ['error'],

  getFavoritePlacesRequest: ['data', 'callback'],
  getFavoritePlacesSuccess: ['payload'],
  getFavoritePlacesFailure: ['error'],

  getRecommendedPlacesRequest: ['data', 'callback'],
  getRecommendedPlacesSuccess: ['payload'],
  getRecommendedPlacesFailure: ['error'],
});

export const PlaceTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const DEFAULT_STATE = {
  data: null,
  fetching: false,
  payload: null,
  error: null,
};

export const INITIAL_STATE = Immutable({
  places: [],

  getPlaces: DEFAULT_STATE,
  getFavoritePlaces: DEFAULT_STATE,
  getRecommendedPlaces: DEFAULT_STATE,
});

/* ------------- Reducers ------------- */

export const getPlacesRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getPlaces: {...state.getPlaces, fetching: true, data},
  });
};
export const getPlacesSuccess = (state, {payload}) => {
  const {data} = state.getPlaces;
  const page = (data && data.page) || 0;

  return state.merge({
    ...state,
    getPlaces: {DEFAULT_STATE, payload},
    places: page > 0 ? [...state.places, ...payload] : [...payload],
  });
};
export const getPlacesFailure = (state, {error}) => {
  return state.merge({
    ...state,
    getPlaces: {fetching: false, error, payload: null},
  });
};

export const getFavoritePlacesRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getFavoritePlaces: {...state.getFavoritePlaces, fetching: true, data},
  });
};
export const getFavoritePlacesSuccess = (state, {payload}) => {
  return state.merge({
    ...state,
    getFavoritePlaces: {DEFAULT_STATE, payload},
  });
};
export const getFavoritePlacesFailure = (state, {error}) => {
  return state.merge({
    ...state,
    getFavoritePlaces: {fetching: false, error, payload: null},
  });
};

export const getRecommendedPlacesRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getRecommendedPlaces: {...state.getRecommendedPlaces, fetching: true, data},
  });
};
export const getRecommendedPlacesSuccess = (state, {payload}) => {
  return state.merge({
    ...state,
    getRecommendedPlaces: {DEFAULT_STATE, payload},
  });
};
export const getRecommendedPlacesFailure = (state, {error}) => {
  return state.merge({
    ...state,
    getRecommendedPlaces: {fetching: false, error, payload: null},
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PLACES_REQUEST]: getPlacesRequest,
  [Types.GET_PLACES_SUCCESS]: getPlacesSuccess,
  [Types.GET_PLACES_FAILURE]: getPlacesFailure,

  [Types.GET_FAVORITE_PLACES_REQUEST]: getFavoritePlacesRequest,
  [Types.GET_FAVORITE_PLACES_SUCCESS]: getFavoritePlacesSuccess,
  [Types.GET_FAVORITE_PLACES_FAILURE]: getFavoritePlacesFailure,

  [Types.GET_RECOMMENDED_PLACES_REQUEST]: getRecommendedPlacesRequest,
  [Types.GET_RECOMMENDED_PLACES_SUCCESS]: getRecommendedPlacesSuccess,
  [Types.GET_RECOMMENDED_PLACES_FAILURE]: getRecommendedPlacesFailure,
});
