import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  removeOnboarding: null,

  saveToken: ['data'],

  saveUser: ['data'],
  logout: null,

  saveUserPosition: ['data'],

  changeCountry: ['data'],
  changeLanguage: ['data'],
});

export const TemperatureTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isFirstOpen: true,

  token: null,

  user: {},
  userPosition: {
    //  central city | 0 km
    longitude: 107.6307432,
    latitude: -2.7405691,
    isDefault: true,
  },

  country: 'id',
  language: 'en',
});

/* ------------- Selectors ------------- */

export const SessionSelectors = {
  getFirstOpenStatus: (state) => state.session.isFirstOpen,

  getToken: (state) => state.session.token,

  getUser: (state) => state.session.user,

  getUserPosition: (state) => state.session.userPosition,

  getCountry: (state) => state.session.country,
  getLanguage: (state) => state.session.language,
};

/* ------------- Reducers ------------- */

export const removeOnboarding = (state) => {
  console.tron.log({removeOnboarding: 'success'});
  return state.merge({...state, isFirstOpen: false});
};

export const saveToken = (state, {data}) => {
  return state.merge({...state, token: data});
};

export const saveUser = (state, {data}) => {
  console.tron.log({saveUser: data});
  return state.merge({...state, user: data});
};

export const logout = (state) => {
  console.tron.log({logoutRedux: 'success'});
  return state.merge({
    ...INITIAL_STATE,
  });
};

export const saveUserPosition = (state, {data}) => {
  console.tron.log({saveUserPosition: data});
  return state.merge({...state, userPosition: data});
};

export const changeCountry = (state, {data}) => {
  return state.merge({...state, country: data});
};

export const changeLanguage = (state, {data}) => {
  return state.merge({...state, language: data});
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REMOVE_ONBOARDING]: removeOnboarding,

  [Types.SAVE_TOKEN]: saveToken,

  [Types.SAVE_USER]: saveUser,
  [Types.LOGOUT]: logout,

  [Types.SAVE_USER_POSITION]: saveUserPosition,

  [Types.CHANGE_COUNTRY]: changeCountry,
  [Types.CHANGE_LANGUAGE]: changeLanguage,
});
