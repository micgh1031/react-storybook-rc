import actionTypes from '../constants/actionTypes';
import { createReducer } from '../utils/reducersHelpers';

const initialState = {
  isFetching: false,
  errorMessages: null,
  oxygen: 0.7273,
  profile_details: { description: "", name:"", avatar_url:"", website:"" },
  profile_forests: [],
  profile_balance: { emitted: 0, captured: 0, timeline_formula: "", total_user_surface: 0 }
};

export default createReducer(initialState, {
      [actionTypes.PUBLIC_PROFILE_START]: state => {
      return { ...state, isFetching: true, errorMessages: null };
},
[actionTypes.PUBLIC_PROFILE_COMPLETE]: (state, action) => {
  return {
      ...state,
      isFetching: false,
      profile_balance:
      {
        emitted: action.payload.balance.emitted,
        captured: action.payload.balance.captured,
        timeline_formula: action.payload.balance.timeline_formula,
        total_user_surface: action.payload.balance.total_user_surface,
        available: action.payload.balance.available
      },
      profile_details:
      {
        name: action.payload.user.name,
        description: action.payload.user.description,
        avatar_url: action.payload.user.avatar_url,
        website: action.payload.user.website
      },
      profile_forests: action.payload.forests.forests

};
},
[actionTypes.PUBLIC_PROFILE_ERROR]: (state, action) => {
    console.log(action.payload);
  return {
      ...state,
      isFetching: false,
      errorMessages: action.payload.data.error.message
};
}
});

export const getIsFetching = (state) => state.isFetching;
export const getErrorMessages = (state) => state.errorMessages;
export const getProfileEmitted = (state) => state.profile_balance.emitted;
export const getProfileCaptured = (state) => state.profile_balance.captured;
export const getOxygen = (state) => state.oxygen;
export const getProfileFormula = (state) => state.profile_balance.timeline_formula;
export const getProfileSurface = (state) => state.profile_balance.total_user_surface;
export const getProfileDetails = (state) => state.profile_details;
export const getProfileForests = (state) => state.profile_forests;