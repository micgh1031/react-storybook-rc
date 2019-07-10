import { normalize } from 'normalizr';
import actionTypes from '../constants/actionTypes';
import { axiosInstance, authHeaders } from './';
import { addAlert } from '../actions/alerts';
import api from '../constants/api';
import mixpanel from 'mixpanel-browser';

import { carbonSource, carbonSourcesArray } from '../schemas/carbon';
import {
  getIsAdding,
  getIsFetching,
  getIsRemoving,
  getIsUpdating
} from '../selectors/carbon';

export const getSources = () => ({
  shouldCallAPI: state => !getIsFetching(state),
  callAPI: () => axiosInstance.get(api.GET_SOURCES, authHeaders()),
  actions: [
    actionTypes.CARBON_FETCH_START,
    {
      type: actionTypes.CARBON_FETCH_COMPLETE,
      payload: response => {
        return normalize(response.data.data.sources, carbonSourcesArray);
      }
    },
    {
      type: actionTypes.CARBON_FETCH_ERROR,
      payload: response => response
    }
  ],
});

export const addSource = (value, name, periodicity, calculatedPath, type='', callback) => ({
  shouldCallAPI: state => !getIsAdding(state),
  callAPI: () => {
    return axiosInstance.post(
      api.ADD_SOURCE,
      {
        amount: value,
        name,
        periodicity: +periodicity,
        path: calculatedPath,
        type: type
      },
      authHeaders()
    );
  },
  actions: [
    actionTypes.CARBON_ADD_START,
    {
      type: actionTypes.CARBON_ADD_COMPLETE,
      payload: (response, dispatch) => {
        if (typeof callback === 'function') {
          callback();
        }

        if(callback !== 'redirect') {
          dispatch(addAlert({
            type: 'success',
            message: response.data.data.message,
            dismissAfter: 3000
          }));
        }else {
          localStorage.setItem("current_source", JSON.stringify(response.data.data.source));
        }

        mixpanel.track("CO2", {
          "Action": "Add source",
          "Value": value,
          "Name": name,
          "Periodicity": periodicity,
          "Path": calculatedPath,
          "Type": response.data.data.type,
          "Domain": "App"
        });

        return normalize(response.data.data.source, carbonSource);
      }
    },
    {
      type: actionTypes.CARBON_ADD_ERROR,
      payload: (response, dispatch) => {
        dispatch(addAlert({
          type: 'error',
          message: response.data.error.errors.name[0],
          dismissAfter: 3000
        }));
      }
    }
  ]
});

export const removeSource = id => ({
  shouldCallAPI: state => !getIsRemoving(state),
  callAPI: () => {
    return axiosInstance.delete(`${api.REMOVE_SOURCE}${id}`, authHeaders());
  },
  actions: [
    actionTypes.CARBON_REMOVE_START,
    {
      type: actionTypes.CARBON_REMOVE_COMPLETE,
      payload: (response, dispatch) => {
        dispatch(addAlert({
          type: 'success',
          message: response.data.data.message,
          dismissAfter: 3000
        }));

        mixpanel.track("CO2", {
          "Action": "Remove source",
          "Id": id,
          "Domain": "App"
        });

        return id;
      }
    },
    {
      type: actionTypes.CARBON_REMOVE_ERROR,
      payload: response => response
    }
  ]
});

export const updateSourceFrequency = (id, periodicity = 0) => ({
  shouldCallAPI: state => !getIsUpdating(state),
  callAPI: () => {
    return axiosInstance.put(
      `${api.UPDATE_SOURCE}${id}`,
      { periodicity },
      authHeaders()
    );
  },
  actions: [
    actionTypes.CARBON_UPDATE_START,
    {
      type: actionTypes.CARBON_UPDATE_COMPLETE,
      payload: () => id
    },
    {
      type: actionTypes.CARBON_UPDATE_ERROR,
      payload: response => response.data
    }
  ],
});

export const markSourceAsOffseted = (id, offsetted = 1) => ({
  callAPI: () => {
    return axiosInstance.put(
      `${api.UPDATE_SOURCE}${id}`,
      { offsetted },
      authHeaders()
    );
  },
  actions: [
    actionTypes.CARBON_UPDATE_START,
    {
      type: actionTypes.CARBON_UPDATE_COMPLETE,
      payload: () => {

        mixpanel.track("CO2", {
          "Action": "Offset source",
          "Id": id,
          "Domain": "App"
        });

        return id;
      }
    },
    {
      type: actionTypes.CARBON_UPDATE_ERROR,
      payload: response => response.data
    }
  ],
});

export const setCarbonFilter = filter => ({
  type: actionTypes.SET_CARBON_FILTER,
  payload: filter
});
