import * as fromUserActions from '../reducers/userActions';

export const getLoginErrorMessages = state =>
  fromUserActions.getLoginErrorMessages(state.userActions);

export const getRecoveryErrorMessages = state =>
  fromUserActions.getRecoveryErrorMessages(state.userActions);

export const getResetErrorMessages = state =>
  fromUserActions.getResetErrorMessages(state.userActions);

export const getSignupErrorMessages = state =>
  fromUserActions.getSignupErrorMessages(state.userActions);

export const getIsWorking = state =>
  fromUserActions.getIsWorking(state.userActions);

export const getIsUpdating = state =>
  fromUserActions.getIsUpdating(state.userActions);

export const getUploadProgress = state =>
  fromUserActions.getUploadProgress(state.userActions);

export const getUpdateErrorMessages = state =>
  fromUserActions.getUpdateErrorMessages(state.userActions);

export const getPasswordErrorMessages = state =>
  fromUserActions.getPasswordErrorMessages(state.userActions);

export const getGuestErrorMessages = state =>
  fromUserActions.getGuestErrorMessages(state.userActions);
