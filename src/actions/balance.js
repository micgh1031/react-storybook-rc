import actionTypes from '../constants/actionTypes';
import { axiosInstance, authHeaders } from './';
import api from '../constants/api';
import { getIsFetching } from '../selectors/balance';

export const getBalance = () => ({
  shouldCallAPI: state => !getIsFetching(state),
  callAPI: () => axiosInstance.get(api.GET_BALANCE, authHeaders()),
  actions: [
    actionTypes.BALANCE_START,
    {
      type: actionTypes.BALANCE_COMPLETE,
      payload: response => response.data.data
    },
    {
      type: actionTypes.BALANCE_ERROR,
      payload: response => response
    }
  ],
});
