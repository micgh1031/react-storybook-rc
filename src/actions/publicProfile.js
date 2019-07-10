import actionTypes from '../constants/actionTypes';
import { axiosInstance, authHeaders } from './';
import api from '../constants/api';
import { getIsFetching } from '../selectors/publicProfile';


export const getPublicProfile = (userName) => ({
  shouldCallAPI: state => !getIsFetching(state),
    callAPI: () => axiosInstance.get(api.GET_PUBLIC_PROFILE + "/" + userName, authHeaders()),
    actions: [
      actionTypes.PUBLIC_PROFILE_START,
      {
        type: actionTypes.PUBLIC_PROFILE_COMPLETE,
        payload: response => response.data.data
      },
      {
        type: actionTypes.PUBLIC_PROFILE_ERROR,
        payload: response => response
      }
    ],
});
