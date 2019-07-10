import * as fromUserSession from '../reducers/userSession';

export const getUserDetails = state =>
  fromUserSession.getUserDetails(state.userSession);

export const getIsUserAuthenticated = state =>
  fromUserSession.getIsUserAuthenticated(state.userSession);

export const getToken = state =>
  fromUserSession.getToken(state.userSession);
