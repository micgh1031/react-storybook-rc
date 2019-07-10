import { normalize } from 'normalizr';
import mixpanel from 'mixpanel-browser';
import actionTypes from '../constants/actionTypes';
import { steps } from '../schemas/calculator';
import {
  getIsFetching,
  getIsCalculating,
} from '../selectors/calculator';

import { axiosInstance, authHeaders } from './';
import api from '../constants/api';

export const requestStep = (ownStep, nextStep, value) => {
  return (dispatch, getState) => {
    // If already fetching return early
    if (getIsFetching(getState())) return;

    // Start the proccess
    dispatch({
      type: actionTypes.CALC_STEP_START,
      ownStep: ownStep,
      ownStepValue: value,
      nextStep: nextStep,
    });

    // Call API
    axiosInstance.post(api.GET_STEPS , {
      step_id: nextStep,
      value: value
    }, authHeaders())
    .then(
      response => {
        // handle errors
        if (response.data.status >= 400) {
          return dispatch({
            type: actionTypes.CALC_STEP_ERROR,
            error: response.data.error
          });
        }
        let responseData = response.data.data;
        // handle incomplete response
        if (!responseData.children) {

          mixpanel.track("CO2", {
            "Action": "Get next step w/o logic",
            "Next Step": nextStep,
            "Domain": "App"
          });

          return dispatch({
            type: actionTypes.CALC_STEP_ERROR,
            // this string is the ID of a message located at /src/constants/messages.js
            payload: 'calculatorMessages.noLogic'
          });
        }

        if(nextStep) {
            mixpanel.track("CO2", {
              "Action": "Get next step",
              "Next Step": nextStep,
              "Domain": "App"
            });
        }

        // handle correct response
        return dispatch({
          type: actionTypes.CALC_STEP_COMPLETE,
          response: normalize(responseData, steps),
          ownStepValue: value,
          nextStep: responseData.id
        });
      },
      error => {
          dispatch({
            type: actionTypes.CALC_STEP_ERROR,
            error
          });
      }
    );

  };
};

export const calculateCarbon = (calculatedPath, stepsList) => ({
  shouldCallAPI: state => !getIsCalculating(state),
  callAPI: () => axiosInstance.post(api.CALC_CO2, {"values": calculatedPath} ),
  actions: [
    actionTypes.CALC_START,
    {
      type: actionTypes.CALC_COMPLETE,
      payload: response => {

        mixpanel.track("CO2", {
            "Action": "Final calculation",
            "Amount": response.data.data.co2,
            "Steps": stepsList,
            "Domain": "App"
        });

        return response.data.data

      }
    },
    {
      type: actionTypes.CALC_ERROR,
      payload: response => response.data
    }
  ],
  payload: {
    calculatedPath,
    stepsList
  }
});

export const clearForm = () => ({
  type: actionTypes.CALC_STEP_CLEAR
});
