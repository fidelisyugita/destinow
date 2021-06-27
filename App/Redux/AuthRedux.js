import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

import I18n from '../I18n';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  loginGoogleRequest: ['data', 'callback'],
  loginGoogleSuccess: ['payload'],
  loginGoogleFailure: ['error'],

  loginAppleRequest: ['data', 'callback'],
  loginAppleSuccess: ['payload'],
  loginAppleFailure: ['error'],

  signOutRequest: ['data', 'callback'],
  signOutSuccess: ['payload'],
  signOutFailure: ['error'],
});

export const AuthTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const DEFAULT_STATE = {
  data: null,
  fetching: false,
  payload: null,
  error: null,
};

export const INITIAL_STATE = Immutable({
  loginGoogle: DEFAULT_STATE,
  loginApple: DEFAULT_STATE,
  signOut: DEFAULT_STATE,
});

/* ------------- Reducers ------------- */

export const loginGoogleRequest = (state, {data}) => {
  return state.merge({
    ...state,
    loginGoogle: {...state.loginGoogle, fetching: true, data},
  });
};
export const loginGoogleSuccess = (state, {payload}) => {
  console.tron.log({payload});
  return state.merge({
    ...state,
    loginGoogle: {DEFAULT_STATE, payload},
  });
};
export const loginGoogleFailure = (state, {error}) => {
  return state.merge({
    ...state,
    loginGoogle: {
      ...state.loginGoogle,
      fetching: false,
      error,
    },
  });
};

export const loginAppleRequest = (state, {data}) => {
  return state.merge({
    ...state,
    loginApple: {...state.loginApple, fetching: true, data},
  });
};
export const loginAppleSuccess = (state, {payload}) => {
  console.tron.log({payload});
  return state.merge({
    ...state,
    loginApple: {DEFAULT_STATE, payload},
  });
};
export const loginAppleFailure = (state, {error}) => {
  return state.merge({
    ...state,
    loginApple: {
      ...state.loginApple,
      fetching: false,
      error,
    },
  });
};

export const signOutRequest = (state, {data}) => {
  return state.merge({
    ...state,
    signOut: {...state.signOut, fetching: true, data},
  });
};
export const signOutSuccess = (state, {payload}) => {
  console.tron.log({payload});
  return state.merge({
    ...state,
    signOut: {DEFAULT_STATE, payload},
  });
};
export const signOutFailure = (state, {error}) => {
  return state.merge({
    ...state,
    signOut: {
      ...state.signOut,
      fetching: false,
      error,
    },
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_GOOGLE_REQUEST]: loginGoogleRequest,
  [Types.LOGIN_GOOGLE_SUCCESS]: loginGoogleSuccess,
  [Types.LOGIN_GOOGLE_FAILURE]: loginGoogleFailure,

  [Types.LOGIN_APPLE_REQUEST]: loginAppleRequest,
  [Types.LOGIN_APPLE_SUCCESS]: loginAppleSuccess,
  [Types.LOGIN_APPLE_FAILURE]: loginAppleFailure,

  [Types.SIGN_OUT_REQUEST]: signOutRequest,
  [Types.SIGN_OUT_SUCCESS]: signOutSuccess,
  [Types.SIGN_OUT_FAILURE]: signOutFailure,
});
