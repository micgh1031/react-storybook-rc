import { axiosInstance, authHeaders } from './';
import api from '../constants/api';
import actionTypes from '../constants/actionTypes';
import { getIsFetching } from '../selectors/ksUser';
import { addAlert } from '../actions/alerts';

export const getProfileFromKS = (token) => ({
  shouldCallAPI: state => !getIsFetching(state),
  callAPI: () => axiosInstance.get(`${api.KS_USER_DETAILS}?token=${token}`, authHeaders()),
  actions: [
    actionTypes.GET_KS_PROFILE_START,
    {
      type: actionTypes.GET_KS_PROFILE_COMPLETE,
      payload: response => response.data.data
    },
    {
      type: actionTypes.GET_KS_PROFILE_ERROR,
      payload: response => response.error
    }
  ]
});

export const activateKsProfile = (token, form) => ({
  shouldCallAPI: state => !getIsFetching(state),
  callAPI: () => axiosInstance.post(`${api.KS_SIGNUP}?token=${token}`, form),
  actions: [
    actionTypes.ACTIVATE_KS_PROFILE_START,
    {
      type: actionTypes.ACTIVATE_KS_PROFILE_COMPLETE,
      payload: (response, dispatch) => {

        dispatch(addAlert({
          type: 'success',
          message: response.data.data.message,
          dismissAfter: 5000
        }));

        return response.data.data;
      }
    },
    {
      type: actionTypes.ACTIVATE_KS_PROFILE_ERROR,
      payload: response => response.data.error
    }
  ]
});
