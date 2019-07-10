import * as fromBalance from '../reducers/publicProfile';

export const getIsFetching = state =>
  fromBalance.getIsFetching(state.publicProfile);

export const getErrorMessages = state =>
  fromBalance.getErrorMessages(state.publicProfile);

export const getProfileEmitted = state =>
  fromBalance.getProfileEmitted(state.publicProfile);

export const getProfileCaptured = state =>
  fromBalance.getProfileCaptured(state.publicProfile);

export const getOxygen = state =>
  fromBalance.getOxygen(state.publicProfile);

export const getProfileFormula = state =>
  fromBalance.getProfileFormula(state.publicProfile);

export const getProfileDetails = state =>
fromBalance.getProfileDetails(state.publicProfile);

export const getProfileSurface = state =>
fromBalance.getProfileSurface(state.publicProfile);

export const getProfileForests = state =>
fromBalance.getProfileForests(state.publicProfile);