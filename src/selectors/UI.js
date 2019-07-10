import * as fromUI from '../reducers/UI';

export const getIsUserPopupOpen = state =>
  fromUI.getIsUserPopupOpen(state.userInterface);

export const getIsRecoveryRequested = state =>
  fromUI.getIsRecoveryRequested(state.userInterface);

export const getIsPasswordReset = state =>
  fromUI.getIsPasswordReset(state.userInterface);

export const getGallery = state =>
  fromUI.getGallery(state.userInterface);

export const getLoadStatus = state =>
  fromUI.getLoadStatus(state.userInterface);
