import { axiosInstance, authHeaders } from './';
import api from '../constants/api';
import actionTypes from '../constants/actionTypes';
import { getIsWorking } from '../selectors/certificates';

export const fetchCertificates = () => ({
  shouldCallAPI: state => !getIsWorking(state),
  callAPI: () =>  axiosInstance.get(api.GET_CERTIFICATES, authHeaders()),
  actions: [
    actionTypes.GET_CERTIFICATES_START,
    {
      type: actionTypes.GET_CERTIFICATES_COMPLETE,
      payload: response => response.data.data.forests
    },
    {
      type: actionTypes.GET_CERTIFICATES_ERROR,
      payload: response => response.data.data
    }
  ],
});
