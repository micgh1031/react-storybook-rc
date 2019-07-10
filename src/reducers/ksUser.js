import actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  details: {},
  ksError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_KS_PROFILE_START:
      return {
        isFetching: true,
        details: {},
      };
    case actionTypes.ACTIVATE_KS_PROFILE_START:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.GET_KS_PROFILE_COMPLETE:
      return {
        ...state,
        isFetching: false,
        details: action.payload.user
      };
    case actionTypes.ACTIVATE_KS_PROFILE_COMPLETE:
      return {
        ...state,
        isFetching: false,
      };
    case actionTypes.GET_KS_PROFILE_ERROR:
      return {
        isFetching: false,
        ksError: action.payload.message,
      };
    case actionTypes.ACTIVATE_KS_PROFILE_ERROR:
      return {
        isFetching: false,
        ksError: action.payload.message,
      };
    default:
      return state;
  }
};

export const getIsFetching = state => state.isFetching;
export const getKsDetails = state => state.details;
export const getKsError = state => state.ksError;
