import { axiosInstance, authHeaders } from './';
import api from '../constants/api';
import actionTypes from '../constants/actionTypes';
import { getIsWorking } from '../selectors/userActions';
import { getToken } from '../selectors/userSession';
import { addAlert } from '../actions/alerts';
import mixpanel from 'mixpanel-browser';

export const authenticate = (email, password, redirect) => ({
  shouldCallAPI: state => !getIsWorking(state),
  callAPI: (state) => {
    const guestToken = getToken(state);
    return axiosInstance.put(
      api.LOGIN,
      {
        username: email,
        password,
        "guest-token": guestToken
      }
    );
  },
  actions: [
    actionTypes.AUTH_START,
    {
      type: actionTypes.AUTH_COMPLETE,
      payload: (response, dispatch) => {
        startRefreshInterval();

        dispatch(addAlert({
          type: 'info',
          message: response.data.data.message,
          dismissAfter: 3000
        }));

        mixpanel.identify(response.data.data.user.id);

        mixpanel.people.set({
          "$email": response.data.data.user.email
        });

        mixpanel.track("Session", {
          "Action": "Login registered",
          "Domain": "App"
        });

        if (typeof redirect === 'function') redirect();
        return response.data.data;
      }
    },
    {
      type: actionTypes.AUTH_ERROR,
      payload: response => {

        mixpanel.track("Session", {
          "Action": "Login FAILED",
          "email": email,
          "Domain": "App"
        });

        return response.data.error
      }
    }
  ]
});

export const guestAuthenticate = () => ({
  shouldCallAPI: state => !getIsWorking(state),
  callAPI: () => axiosInstance.put(api.LOGIN, { "guest": true } ),
  actions: [
    actionTypes.GUEST_START,
    {
      type: actionTypes.GUEST_COMPLETE,
      payload: response => {

        startRefreshInterval();

        mixpanel.identify(response.data.data.id);
        mixpanel.track("Session", {
          "Action": "Create guest session",
          "Domain": "App"
        });

        return response.data.data;
      }
    },
    {
      type: actionTypes.GUEST_ERROR,
      payload: response => response.data
    }
  ]
});

export const refreshProfile = () => ({
  shouldCallAPI: state => !getIsWorking(state),
  callAPI: () => axiosInstance.get(api.GET_PROFILE, authHeaders()),
  actions: [
    actionTypes.GET_PROFILE_START,
    {
      type: actionTypes.GET_PROFILE_COMPLETE,
      payload: response => response.data
    },
    {
      type: actionTypes.GET_PROFILE_ERROR,
      payload: response => response.data.error
    }
  ]
});

export const logout = () => dispatch => {
  return dispatch({ type: actionTypes.AUTH_LOGOUT });
};

// Token refresh code.
let refreshInterval;
let interval = 1000 * 60 * 30; // 30 min

export const startRefreshInterval = () => dispatch => {
  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => dispatch(refreshToken()), interval);
};

export const clearRefreshInterval = () => {
  clearInterval(refreshInterval);
};

export const refreshToken = () => ({
  callAPI: () => axiosInstance.get(api.REFRESH_TOKEN, authHeaders()),
  actions: [
    actionTypes.REFRESH_START,
    {
      type: actionTypes.REFRESH_COMPLETE,
      payload: response => response,
    },
    {
      type: actionTypes.REFRESH_ERROR,
      payload: response => {
        logout();
        startRefreshInterval();
        return response.error;
      }
    }
  ]
});
