import actionTypes from '../constants/actionTypes';

const initialState = {
  isWorking: false,
  invoices: [],
  invoicesErrorMessages: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_INVOICES_START:
    return {
      ...state,
      isWorking: true,
    };
    case actionTypes.GET_INVOICES_COMPLETE:
      return {
        isWorking: false,
        invoices: action.payload.invoices
      };
    case actionTypes.GET_INVOICES_ERROR:
      return {
        ...state,
        isWorking: false,
        invoicesErrorMessages: action.payload.message
      };
    default:
      return state;
  }
};

export const getInvoices = state => state.invoices;
export const getIsWorking = state => state.isWorking;
export const getInvoicesErrorMessages = state => state.invoicesErrorMessages;
