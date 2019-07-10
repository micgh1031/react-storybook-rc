import { combineReducers } from 'redux';
import actionTypes from '../constants/actionTypes';
import { generateUIReducer, createReducer } from '../utils/reducersHelpers';

const isUserPopupOpen = generateUIReducer([
  actionTypes.USER_POPUP_OPEN,
  actionTypes.USER_POPUP_CLOSE,
  actionTypes.USER_POPUP_TOGGLE
]);

const isRecoveryRequested = generateUIReducer([
  actionTypes.RECOVERY_COMPLETE,
  actionTypes.RECOVERY_ERROR
]);

const isPasswordReset = generateUIReducer([
  actionTypes.RESET_COMPLETE,
  actionTypes.RESET_ERROR
]);

const gallery = createReducer([], {
  [actionTypes.GALLERY_OPEN]: (state, action) => {
    if (
      !Array.isArray(action.payload) ||
      !action.payload.every(type => typeof type === 'object')
    ) {
      throw new Error('Expected an array of object types.');
    }

    return [...action.payload];
  },
  [actionTypes.GALLERY_CLOSE]: () => {
    return [];
  }
});

const loadStatus = createReducer('active', {
  [actionTypes.LOAD_STATUS]: (state, action) => {
    return action.payload;
  },
});

const UI = combineReducers({
  isUserPopupOpen,
  isRecoveryRequested,
  isPasswordReset,
  gallery,
  loadStatus,
});

export default UI;

export const getIsUserPopupOpen = state => state.isUserPopupOpen;
export const getIsRecoveryRequested = state => state.isRecoveryRequested;
export const getIsPasswordReset = state => state.isPasswordReset;
export const getGallery = state => state.gallery;
export const getLoadStatus = state => state.loadStatus;
