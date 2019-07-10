import { axiosInstance, authHeaders } from './';
import api from '../constants/api';
import { normalize } from 'normalizr';
import { openGallery } from './UI';
import actionTypes from '../constants/actionTypes';
import {
  forests,
  forestsArray,
  patronsResponse,
} from '../schemas/forests';
import {
  getIsFetching,
  getIsFetchingDetails,
  getIsFetchingPatrons,
  getIsFetchingGallery,
} from '../selectors/forests';


export const forestSummary = () => ({
  shouldCallAPI: state => !getIsFetching(state),
  callAPI: () => axiosInstance.get(api.FOREST_SUMMARY, authHeaders()),
  actions: [
    actionTypes.FORESTS_SUMMARY_START,
    {
      type: actionTypes.FORESTS_SUMMARY_COMPLETE,
      payload: response => {
        return normalize(response.data.data.forests, forestsArray);
      }
    },
    {
      type: actionTypes.FORESTS_SUMMARY_ERROR,
      payload: response => response.data
    }
  ],
});

export const fetchMyForests = () => ({
  shouldCallAPI: state => !getIsFetching(state),
  callAPI: () => axiosInstance.get(api.MY_FORESTS, authHeaders()),
  actions: [
    actionTypes.MY_FORESTS_START,
    {
      type: actionTypes.MY_FORESTS_COMPLETE,
      payload: response => {
        return normalize(response.data.data.forests, forestsArray);
      }
    },
    {
      type: actionTypes.MY_FORESTS_ERROR,
      payload: response => response.data.error
    }
  ],
});

export const fetchForests = () => ({
  shouldCallAPI: state => !getIsFetching(state),
  callAPI: () =>  axiosInstance.get(api.FORESTS, authHeaders()),
  actions: [
    actionTypes.FORESTS_FETCH_START,
    {
      type: actionTypes.FORESTS_FETCH_COMPLETE,
      payload: response => normalize(response.data.data.forests, forestsArray)
    },
    actionTypes.FORESTS_FETCH_ERROR,
  ],
});

export const fetchForestDetails = (id) => ({
  shouldCallAPI: state => !getIsFetchingDetails(state),
  callAPI: () =>  axiosInstance.get(api.FORESTS + id),
  actions: [
    actionTypes.FORESTS_DETAILS_START,
    {
      type: actionTypes.FORESTS_DETAILS_COMPLETE,
      payload: response => normalize(response.data.data, forests),
    },
    actionTypes.FORESTS_DETAILS_ERROR,
  ]
});

export const fetchForestPatrons = (id, pageIndex, pageLength) => ({
  shouldCallAPI: state => !getIsFetchingPatrons(state),
  callAPI: () => {
    return axiosInstance.post( `${api.FORESTS}${id}${api.PATRONS}`,
      {
        "size": pageLength,
        "page": pageIndex
      },
      authHeaders()
    );
  },
  actions: [
    actionTypes.FOREST_PATRONS_START,
    {
      type: actionTypes.FOREST_PATRONS_COMPLETE,
      payload: response => normalize(response.data.data, patronsResponse)
    },
    actionTypes.FOREST_PATRONS_ERROR,
  ],
  payload: {
    page: pageIndex
  }
});

export const fetchForestGallery = (id) => ({
  shouldCallAPI: state => !getIsFetchingGallery(state),
  callAPI: () => axiosInstance.get(`${api.FORESTS}${id}${api.GALLERY}`),
  actions: [
    actionTypes.FOREST_GALLERY_START,
    {
      type: actionTypes.FOREST_GALLERY_COMPLETE,
      payload: (response, dispatch) => {
        dispatch(openGallery(response.data.data.items));
      }
    },
    actionTypes.FOREST_GALLERY_ERROR,
  ],
  payload: { id }
});
