import * as fromForests from '../reducers/forests';

export const getIsFetching = state =>
  fromForests.getIsFetching(state.forests);

export const getIsFetchingDetails = state =>
  fromForests.getIsFetchingDetails(state.forests);

export const getIsFetchingTrees = state =>
  fromForests.getIsFetchingTrees(state.forests);

export const getErrorMessages = state =>
  fromForests.getErrorMessages(state.forests);

export const getDetailsErrorMessages = state =>
  fromForests.getDetailsErrorMessages(state.forests);

export const getForests = state =>
  fromForests.getForests(state.forests);

export const getMyForests = state =>
  fromForests.getMyForests(state.forests);

export const getForestById = (state, id) =>
  fromForests.getForestById(state.forests, id);

export const getForestSpecies = (state, id) =>
  fromForests.getForestSpecies(state.forests, id);

export const getForestTeam = (state, id) =>
  fromForests.getForestTeam(state.forests, id);

export const getForestTrees = (state, id) =>
  fromForests.getForestTrees(state.forests, id);

export const getTotalCapturedCarbon = state =>
  fromForests.getTotalCapturedCarbon(state.forests);

export const getTotalOxygen = state =>
  fromForests.getTotalOxygen(state.forests);

export const getIsFetchingPatrons = state =>
  fromForests.getIsFetchingPatrons(state.forests);

export const getPatronsPage = state =>
  fromForests.getPatronsPage(state.forests);

export const getPatronsData = state =>
  fromForests.getPatronsData(state.forests);

export const getPatronsPodium = state =>
  fromForests.getPatronsPodium(state.forests);

export const getPatrons = state =>
  fromForests.getPatrons(state.forests);

export const getPatronsErrorMessages = state =>
  fromForests.getPatronsErrorMessages(state.forests);

export const getIsFetchingGallery = state =>
  fromForests.getIsFetchingGallery(state.forests);
