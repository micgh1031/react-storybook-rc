import { axiosInstance } from './';
import api from '../constants/api';
import actionTypes from '../constants/actionTypes';
import { getIsWorking } from '../selectors/countries';

export const fetchCountries = () => ({
  shouldCallAPI: state => !getIsWorking(state),
  callAPI: () => axiosInstance.get(api.GET_COUNTRIES),
  actions: [
    actionTypes.COUNTRIES_START,
    {
      type: actionTypes.COUNTRIES_COMPLETE,
      payload: response => {
        return response.data.data;
      }
    },
    {
      type: actionTypes.COUNTRIES_ERROR,
      payload: response => response.data.error
    }
  ]
});
