import { combineReducers } from 'redux';
import actionTypes from '../constants/actionTypes';
import {
  extractNormalizedEntity,
  createBooleanReducer,
  createErrorMessagesReducer,
  createReducer
} from '../utils/reducersHelpers';

const calculatedCarbon = (state = null, action) => {
  switch (action.type) {
    case actionTypes.CALC_STEP_START:
    case actionTypes.CALC_ERROR:
    case actionTypes.CALC_STEP_CLEAR:
      return null;
    case actionTypes.CALC_COMPLETE:
      return action.payload.co2;
    default:
      return state;
  }
};

const stepsList = (state = [], action) => {
  switch (action.type) {
    case actionTypes.CALC_START: {
      // we use the calculated path to ensure coherence in stepsList
      return action.stepsList;
    }
    case actionTypes.CALC_STEP_START: {
      let actionIndex = state.findIndex(nested => nested[0] === action.ownStep);

      if (state[actionIndex + 1]) {
        state[actionIndex + 1].splice(1, 1, action.ownStepValue);
      }
      return state.slice(0, (actionIndex + 1));
    }
    case actionTypes.CALC_STEP_COMPLETE:
      return [ ...state, [action.nextStep, Number(action.ownStepValue)] ];
    case actionTypes.CALC_STEP_CLEAR:
      return state[0] ? [ state[0] ] : [];
    default:
      return state;
  }
};

const stepArray = [
  actionTypes.CALC_STEP_START,
  actionTypes.CALC_STEP_COMPLETE,
  actionTypes.CALC_STEP_ERROR
];

const calcArray = [
  actionTypes.CALC_START,
  actionTypes.CALC_COMPLETE,
  actionTypes.CALC_ERROR
];

const carbonArray = [
  actionTypes.CARBON_ADD_START,
  actionTypes.CARBON_ADD_COMPLETE,
  actionTypes.CARBON_ADD_ERROR
];

export default combineReducers({
  isFetching: createBooleanReducer(stepArray),
  isCalculating: createBooleanReducer(calcArray),
  isAdding: createBooleanReducer(carbonArray),
  calculatedCarbon,
  stepsList,
  steps: extractNormalizedEntity(actionTypes.CALC_STEP_COMPLETE, 'steps'),
  options: extractNormalizedEntity(actionTypes.CALC_STEP_COMPLETE, 'options'),
  stepErrorMessages: createErrorMessagesReducer(stepArray),
  calcErrorMessages: createErrorMessagesReducer(calcArray),
  calculatedPath: createReducer([], {
    [actionTypes.CALC_COMPLETE]: (_, action) => action.calculatedPath
  }),
});

// Direct access to reducers
export const getIsFetching = (state) => state.isFetching;
export const getIsCalculating = (state) => state.isCalculating;
export const getIsAdding = (state) => state.isAdding;
export const getStepsList = (state) => state.stepsList;
export const getSteps = (state) => state.steps;
export const getOptions = (state) => state.options;
export const getCalculatedCarbon = (state) => state.calculatedCarbon;
export const getStepErrorMessages = (state) => state.stepErrorMessages;
export const getCalcErrorMessages = (state) => state.calcErrorMessages;
export const getcalculatedPath = (state) => state.calculatedPath;

// Logic access
export const getStepById = (state, id) => state.steps[id];

export const getOptionById = (state, id) => state.options[id];

export const getFormSteps = (state) =>
  state.stepsList.map(step => state.steps[step[0]]);

export const getStepOptions = (state, step) =>
  step.children.map(option => state.options[option]);
