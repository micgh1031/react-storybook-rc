import actionTypes from '../constants/actionTypes';
import { getIsWorking, getIsUpdating } from '../selectors/userActions';
import { addAlert } from '../actions/alerts';
import store from '../setup/store';
import mixpanel from 'mixpanel-browser';
import { axiosInstance, authHeaders } from './';
import api from '../constants/api';

export const requestRecovery = email => ({
  shouldCallAPI: state => !getIsUpdating(state),
  callAPI: () => axiosInstance.post(api.RECOVER, { email }),
  actions: [
    actionTypes.RECOVERY_START,
    {
      type: actionTypes.RECOVERY_COMPLETE,
      payload: response => response
    },
    {
      type: actionTypes.RECOVERY_ERROR,
      payload: response => response.error
    }
  ],
});

export const resetPassword = (token, password) => ({
  shouldCallAPI: state => !getIsUpdating(state),
  callAPI: () => axiosInstance.put(api.RESET_PASSWORD, { token, password }),
  actions: [
    actionTypes.RESET_START,
    {
      type: actionTypes.RESET_COMPLETE,
      payload: response => response
    },
    {
      type: actionTypes.RESET_ERROR,
      payload: response => response.error
    }
  ],
});

export const signup = (form, callback, extraCallback) => ({
  shouldCallAPI: state => !getIsWorking(state),
  callAPI: () => axiosInstance.put(api.SIGNUP, form, authHeaders()),
  actions: [
    actionTypes.SIGNUP_START,
    {
      type: actionTypes.SIGNUP_COMPLETE,
      payload: (response, dispatch) => {

        mixpanel.alias(response.data.user.id);

        mixpanel.people.set({
          "$email": response.data.user.email
        });

        mixpanel.track("Session", {
          "Action": "User signup",
          "Domain": "App"
        });

        if (typeof callback === 'function') callback();
        if (typeof callback === 'function') {
          extraCallback();
          dispatch(addAlert({
            type: 'info',
            message: "Taxes have been updated to your billing address",
            dismissAfter: 3000
          }));
        }

        return response.data;
      }
    },
    {
      type: actionTypes.SIGNUP_ERROR,
      payload: response => response.data
    },
  ],
});

export const setNewPassword = (oldPassword, newPassword, callback) => ({
  shouldCallAPI: state => !getIsUpdating(state),
  callAPI: () => axiosInstance.put(api.UPDATE_PASSWORD,
    {
      "password_current": oldPassword,
      "password_new": newPassword
    },
    authHeaders()
  ),
  actions: [
    actionTypes.NEW_PASS_START,
    {
      type: actionTypes.NEW_PASS_COMPLETE,
      payload: (response, dispatch) => {
        dispatch(addAlert({
          type: 'info',
          message: response.data.message,
          dismissAfter: 5000
        }));
        if (typeof callback === 'function') {
            callback();
        }
      }
    },
    {
      type: actionTypes.NEW_PASS_ERROR,
      payload: response => response.error
    },
  ]
});

export const updateUser = (form, callback, extraCallback) => ({
  shouldCallAPI: state => !getIsUpdating(state),
  callAPI: () => {
    const formToSend = {...form, privacy: Number(form.privacy)};
    return axiosInstance.put(api.UPDATE_USER, formToSend, authHeaders());
  },
  actions: [
    actionTypes.UPDATE_START,
    {
      type: actionTypes.UPDATE_COMPLETE,
      payload: (response, dispatch) => {

        dispatch(addAlert({
          type: 'success',
          message: response.data.data.message,
          dismissAfter: 3000
        }));

        if (typeof callback === 'function') {
            callback();
        }
        if (typeof extraCallback === 'function') {
            extraCallback();
            dispatch(addAlert({
              type: 'info',
              message: "Taxes have been updated to your billing address",
              dismissAfter: 5000
            }));
        }
      }
    },
    {
      type: actionTypes.UPDATE_ERROR,
      payload: response => response.error
    }
  ]
});

export const updateAvatar = (formData) => ({
  shouldCallAPI: state => !getIsUpdating(state),
  callAPI: () => {
    let formHeaders = authHeaders();
    formHeaders.headers['content-type'] =  'multipart/form-data';
    formHeaders.onUploadProgress = progressEvent => {
      store.dispatch({
        type: actionTypes.UPLOAD_PROGRESS,
        payload: Math.floor((progressEvent.loaded * 100) / progressEvent.total)
      });

    };
    return axiosInstance.post(api.UPLOAD_AVATAR, formData, formHeaders);
  },
  actions: [
    actionTypes.UPLOAD_START,
    {
      type: actionTypes.UPLOAD_COMPLETE,
      payload: (response, dispatch) => {
        dispatch(addAlert({
          type: 'success',
          message: response.data.data.message,
          dismissAfter: 2000
        }));
        return response.data.data;
      }
    },
    {
      type: actionTypes.UPLOAD_ERROR,
      payload: (response, dispatch) => {
        dispatch(addAlert({
          type: 'error',
          message: response.error.message,
          dismissAfter: 2000
        }));
        return response.error;
      }
    }
  ]
});
