import { axiosInstance, authHeaders } from './';
import api from '../constants/api';
import actionTypes from '../constants/actionTypes';
import { getIsWorking } from '../selectors/invoices';

export const fetchInvoices = () => ({
  shouldCallAPI: state => !getIsWorking(state),
  callAPI: () => axiosInstance.get(api.GET_INVOICES, authHeaders()),
  actions: [
    actionTypes.GET_INVOICES_START,
    {
      type: actionTypes.GET_INVOICES_COMPLETE,
      payload: response => response.data.data
    },
    {
      type: actionTypes.GET_INVOICES_ERROR,
      payload: response => response.data.error
    }
  ]
});
