import * as fromKsUser from '../reducers/ksUser';

export const getIsFetching = state =>
  fromKsUser.getIsFetching(state.ksUser);

export const getKsDetails = state =>
  fromKsUser.getKsDetails(state.ksUser);

  export const getKsError = state =>
    fromKsUser.getKsError(state.ksUser);
