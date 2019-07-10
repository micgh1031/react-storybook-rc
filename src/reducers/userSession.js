import actionTypes from '../constants/actionTypes';

const initialState = {
  isAuthenticated: false,
  details: {},
  token: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_COMPLETE:
    case actionTypes.AUTH_COMPLETE:
    case actionTypes.ACTIVATE_KS_PROFILE_COMPLETE:
      return {
        ...state,
        isAuthenticated: true,
        details: action.payload.user,
        token: action.payload["access-token"]
      };
    case actionTypes.GUEST_COMPLETE:
      return {
        ...state,
        isAuthenticated: false,
        token: action.payload["access-token"]
      };
    case actionTypes.GET_PROFILE_COMPLETE:
    case actionTypes.UPLOAD_COMPLETE:
      return {
        ...state,
        details: action.payload.user
      };
    case actionTypes.AUTH_LOGOUT:
    case actionTypes.AUTH_EXPIRED:
      return initialState;
    default:
      return state;
  }
};

export const getIsUserAuthenticated = state => state.isAuthenticated;
export const getUserDetails = state => state.details;
export const getToken = state => state.token;
