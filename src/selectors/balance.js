import * as fromBalance from '../reducers/balance';

export const getIsFetching = state =>
  fromBalance.getIsFetching(state.balance);

export const getErrorMessages = state =>
  fromBalance.getErrorMessages(state.balance);

export const getEmitted = state =>
  fromBalance.getEmitted(state.balance);

export const getCaptured = state =>
  fromBalance.getCaptured(state.balance);

export const getOxygen = state =>
  fromBalance.getOxygen(state.balance);

export const getFormula = state =>
  fromBalance.getFormula(state.balance);

export const getUserSurface = state =>
  fromBalance.getUserSurface(state.balance);
