import * as fromCheckout from '../reducers/checkout';

export const getIsFetchingPrice = (state) =>
  fromCheckout.getIsFetchingPrice(state.checkout);

export const getPrice = (state) =>
  fromCheckout.getPrice(state.checkout);

export const getIsBillingComplete = (state) =>
  fromCheckout.getIsBillingComplete(state.checkout);

export const getIsPaying = (state) =>
  fromCheckout.getIsPaying(state.checkout);

export const getIsPaymentComplete = (state) =>
  fromCheckout.getIsPaymentComplete(state.checkout);

export const getPaymentErrors = (state) =>
  fromCheckout.getPaymentErrors(state.checkout);
