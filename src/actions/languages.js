import { axiosInstance } from './';
import api from '../constants/api';
import actionTypes from '../constants/actionTypes';
import { getIsWorking } from '../selectors/languages';

export const fetchLanguages = () => ({
  shouldCallAPI: state => !getIsWorking(state),
  callAPI: () => axiosInstance.get(api.GET_LANGUAGES),
  actions: [
    actionTypes.LANGUAGES_START,
    {
      type: actionTypes.LANGUAGES_COMPLETE,
      payload: response => response.data.data
    },
    {
      type: actionTypes.LANGUAGES_ERROR,
      payload: response => response
    }
  ]
});
