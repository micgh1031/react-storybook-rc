import actionTypes from '../constants/actionTypes';
import { createReducer } from '../utils/reducersHelpers';

const initialState = {
  isFetching: false,
  errorMessages: null,
  emitted: 0,
  captured: 0,
  oxygen: 0.7273,
  timeline_formula: '',
  total_user_surface: 0
};

export default createReducer(initialState, {
  [actionTypes.BALANCE_START]: state => {
    return { ...state, isFetching: true, errorMessages: null };
  },
  [actionTypes.BALANCE_COMPLETE]: (state, action) => {
    return {
      ...state,
      isFetching: false,
      emitted: action.payload.emitted,
      captured: action.payload.captured,
      timeline_formula: action.payload.timeline_formula,
      total_user_surface: action.payload.total_user_surface
    };
  },
  [actionTypes.BALANCE_ERROR]: (state, action) => {
    return {
      ...state,
      isFetching: false,
      errorMessages: action.payload.error.message
    };
  }
});

export const getIsFetching = (state) => state.isFetching;
export const getErrorMessages = (state) => state.errorMessages;
export const getEmitted = (state) => state.emitted;
export const getCaptured = (state) => state.captured;
export const getOxygen = (state) => state.oxygen;
export const getFormula = (state) => state.timeline_formula;
export const getUserSurface = (state) => state.total_user_surface;
