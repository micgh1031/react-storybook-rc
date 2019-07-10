import actionTypes from '../constants/actionTypes';
import { createReducer } from '../utils/reducersHelpers';

export default createReducer({
  fetchingPrice: false,
  price: {},
  isBillingComplete: false,
  isPaying: false,
  isPaymentComplete: false,
  paymentErrors: null,
}, {
  [actionTypes.CHECKOUT_PAY_START]: state => ({
    ...state, isPaying: true,
  }),
  [actionTypes.CHECKOUT_PAY_COMPLETE]: state => ({
    ...state,
    isPaying: false,
    isPaymentComplete: true,
    paymentErrors: null,
  }),
  [actionTypes.CHECKOUT_PAY_ERROR]: (state, action) => {
    return {
      ...state,
      isPaying: false,
      isPaymentComplete: false,
      paymentErrors: action.error,
    };
  },
  [actionTypes.CHECKOUT_TOGGLE_BILLING]: state => ({
    ...state,
    isBillingComplete: !state.isBillingComplete
  }),
  [actionTypes.CHECKOUT_RESET]: state => ({
    ...state,
    isBillingComplete: false,
    isPaymentComplete: false,
    paymentErrors: null
  }),
  [actionTypes.PRICE_START] : state => ({
    ...state,
    fetchingPrice: true,
  }),
  [actionTypes.PRICE_COMPLETE] : (state, action) => ({
    ...state,
    fetchingPrice: false,
    price: action.payload,
  }),
  [actionTypes.PRICE_ERROR] : (state, action) => ({
    ...state,
    fetchingPrice: false,
    paymentErrors: action.payload,
  }),
});

export const getIsFetchingPrice = (state) => state.fetchingPrice;
export const getPrice = (state) => state.price;
export const getIsBillingComplete = (state) => state.isBillingComplete;
export const getIsPaying = (state) => state.isPaying;
export const getIsPaymentComplete = (state) => state.isPaymentComplete;
export const getPaymentErrors = (state) => state.paymentErrors;
