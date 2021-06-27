import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

import I18n from '../I18n';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  saveUserRequest: ['data', 'callback'],
  saveUserSuccess: ['payload'],
  saveUserFailure: ['error'],
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const DEFAULT_STATE = {
  data: null,
  fetching: false,
  payload: null,
  error: null,
};

export const INITIAL_STATE = Immutable({
  saveUser: DEFAULT_STATE,
});

/* ------------- Reducers ------------- */

export const saveUserRequest = (state, {data}) => {
  return state.merge({
    ...state,
    saveUser: {
      ...state.saveUser,
      fetching: true,
      data,
    },
  });
};
export const saveUserSuccess = (state, {payload}) => {
  return state.merge({
    ...state,
    saveUser: {DEFAULT_STATE, payload},
  });
};
export const saveUserFailure = (state, {error}) => {
  return state.merge({
    ...state,
    saveUser: {
      ...state.saveUser,
      fetching: false,
      error,
    },
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_USER_REQUEST]: saveUserRequest,
  [Types.SAVE_USER_SUCCESS]: saveUserSuccess,
  [Types.SAVE_USER_FAILURE]: saveUserFailure,
});
