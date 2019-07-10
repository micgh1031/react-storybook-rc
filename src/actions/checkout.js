import actionTypes from '../constants/actionTypes';
import { axiosInstance, authHeaders } from './';
import api from '../constants/api';
import { getIsPaying, getIsFetchingPrice } from '../selectors/checkout';

export const toggleBillingPanel = () => ({
  type: actionTypes.CHECKOUT_TOGGLE_BILLING
});

export const resetCheckout = () => ({
  type: actionTypes.CHECKOUT_RESET
});

export const getCalculatedPrice = (forest, sqm) => ({
  shouldCallAPI: state => !getIsFetchingPrice(state),
  callAPI: () => axiosInstance.post(
    api.GET_PRICE,
    {
      forest_id: forest,
      sqm,
    },
    authHeaders()),
  actions: [
    actionTypes.PRICE_START,
    {
      type: actionTypes.PRICE_COMPLETE,
      payload: response => {
        return response.data.data;
      }
    },
    {
      type: actionTypes.PRICE_ERROR,
      payload: response => response.error
    }
  ]
});

export const makePayment = (
  stripe,
  card,
  total,
  area,
  forestId
) => (dispatch, getState) => {
  // If already making a payment, return early
  if (getIsPaying(getState())) {
    return false;
  }

  // start the payment
  dispatch({
    type: actionTypes.CHECKOUT_PAY_START
  });

  // Create a stripe token
  stripe.createToken(card).then(result => {
    if (result.error) {
      dispatch({
        type: actionTypes.CHECKOUT_PAY_ERROR,
        error: result.error.message
      });
    } else {
      // Send a POST to the api with the result token + other data
      axiosInstance.post(
        api.PAYMENT,
        {
          "forest_id": forestId,
          "sqm": area,
          "amount": Number(total),
          "stripe_token": result.token.id,
        },
        authHeaders()
      ).then(() => {
        dispatch({
          type: actionTypes.CHECKOUT_PAY_COMPLETE,
        });
      }, error => {
        dispatch({
          type: actionTypes.CHECKOUT_PAY_ERROR,
          error: error.response.data.error.message
        });
      });
    }
  });
};
