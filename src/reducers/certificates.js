import actionTypes from '../constants/actionTypes';

const initialState = {
  isWorking: false,
  certificates: [],
  certificatesErrorMessages: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CERTIFICATES_START:
    return {
      ...state,
      isWorking: true,
    };
    case actionTypes.GET_CERTIFICATES_COMPLETE:
      return {
        isWorking: false,
        certificates: action.payload
      };
    case actionTypes.GET_CERTIFICATES_ERROR:
      return {
        ...state,
        isWorking: false,
        certificatesErrorMessages: action.payload.message
      };
    default:
      return state;
  }
};

export const getCertificates = state => state.certificates;
export const getIsWorking = state => state.isWorking;
export const getCertificatesErrorMessages = state =>
  state.certificatesErrorMessages;
