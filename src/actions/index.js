import { addAlert } from './alerts';
import axios from 'axios';
import store from '../setup/store';
import { locale } from '../setup/locale';

import api from '../constants/api';

export const addError = (error, dispatch) => {
  dispatch(addAlert({
    type: 'error',
    message: error.message,
    dismissAfter: 3000
  }));
};

export const axiosInstance = axios.create({
  baseURL: api.ROOT_URL
});

export const authHeaders = () => {
  const token = store.getState().userSession.token;

  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept-Language': (locale(store.getState()) || navigator.language)
    }
  };
};
