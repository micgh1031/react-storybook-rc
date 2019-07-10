import * as fromSources from '../reducers/carbon';

export const getIsFetching = (state) =>
  fromSources.getIsFetching(state.carbon);

export const getIsAdding = (state) =>
  fromSources.getIsAdding(state.carbon);

export const getIsRemoving = (state) =>
  fromSources.getIsRemoving(state.carbon);

export const getIsUpdating = (state) =>
  fromSources.getIsUpdating(state.carbon);

export const getFilter = (state) =>
  fromSources.getFilter(state.carbon);

export const getErrorMessages = (state) =>
  fromSources.getErrorMessages(state.carbon);

export const getSourcesList = (state) =>
  fromSources.getSourcesList(state.carbon);

export const getSources = (state) =>
  fromSources.getSources(state.carbon);

export const getSourceById = (state, id) =>
  fromSources.getSourceById(state.carbon, id);

export const getAllSources = (state) =>
  fromSources.getAllSources(state.carbon);

export const getTotalCarbon = (state) =>
  fromSources.getTotalCarbon(state.carbon);

export const getFilteredSources = (state, filter) => {
  return fromSources.getFilteredSources(state.carbon, filter);
};

export const getSourcesToOffset = (state, capturedAmount) => {
  return fromSources.getSourcesToOffset(state.carbon, capturedAmount);
};
