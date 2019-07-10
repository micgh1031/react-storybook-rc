import actionTypes from '../constants/actionTypes';

const initialState = {
  isWorking: false,
  isUpdating: false,
  uploadProgress: 0,
  loginErrorMessages: null,
  recoveryErrorMessages: null,
  resetErrorMessages: null,
  signupErrorMessages: null,
  passwordErrorMessages: null,
  updateErrorMessages: null,
  guestErrorMessages: null,
  refreshErrorMessages: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
    case actionTypes.SIGNUP_START:
    case actionTypes.GUEST_START:
    case actionTypes.GET_PROFILE_START:
      return {
        ...initialState,
        isWorking: true,
      };
    case actionTypes.NEW_PASS_START:
    case actionTypes.UPDATE_START:
    case actionTypes.RECOVERY_START:
    case actionTypes.RESET_START:
      return {
        ...state,
        isUpdating: true
      };
    case actionTypes.UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: action.payload
      };
    case actionTypes.AUTH_ERROR:
      return {
        ...state,
        isWorking: false,
        loginErrorMessages: action.payload.message
      };
    case actionTypes.RECOVERY_ERROR:
      return {
        ...state,
        isWorking: false,
        recoveryErrorMessages: action.payload.message
      };
    case actionTypes.RESET_ERROR:
      return {
        ...state,
        isWorking: false,
        resetErrorMessages: action.payload.message
      };
    case actionTypes.SIGNUP_ERROR:
      return {
        ...state,
        isWorking: false,
        signupErrorMessages: action.payload.error.errors.email
      };
    case actionTypes.UPDATE_ERROR:
      return {
        ...state,
        isUpdating: false,
        updateErrorMessages: action.payload.message
      };
    case actionTypes.NEW_PASS_ERROR:
      return {
        ...state,
        isUpdating: false,
        passwordErrorMessages: action.payload.message
      };
    case actionTypes.GUEST_ERROR:
      return {
        ...state,
        isWorking: false,
        guestErrorMessages: action.payload
      };
    case actionTypes.GET_PROFILE_ERROR:
      return {
        ...state,
        isWorking: false,
        refreshErrorMessages: action.payload.message
      };
    case actionTypes.AUTH_COMPLETE:
    case actionTypes.RECOVERY_COMPLETE:
    case actionTypes.RESET_COMPLETE:
    case actionTypes.SIGNUP_COMPLETE:
    case actionTypes.NEW_PASS_COMPLETE:
    case actionTypes.GUEST_COMPLETE:
    case actionTypes.UPDATE_COMPLETE:
    case actionTypes.GET_PROFILE_COMPLETE:
    case actionTypes.AUTH_LOGOUT:
    case actionTypes.UPLOAD_COMPLETE:
      return initialState;
    default:
      return state;
  }
};

export const getIsWorking = state => state.isWorking;
export const getIsUpdating = state => state.isUpdating;
export const getUploadProgress = state => state.uploadProgress;
export const getLoginErrorMessages = state => state.loginErrorMessages;
export const getRecoveryErrorMessages = state => state.recoveryErrorMessages;
export const getResetErrorMessages = state => state.resetErrorMessages;
export const getSignupErrorMessages = state => state.signupErrorMessages;
export const getUpdateErrorMessages = state => state.updateErrorMessages;
export const getPasswordErrorMessages = state => state.passwordErrorMessages;
export const getGuestErrorMessages = state => state.guestErrorMessages;
