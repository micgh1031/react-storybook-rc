import actionTypes from '../constants/actionTypes';
import { combineReducers } from 'redux';
import {
  createReducer,
  createBooleanReducer,
  createErrorMessagesReducer
} from '../utils/reducersHelpers';

const sourcesList = createReducer([], {
  [actionTypes.CARBON_ADD_COMPLETE]: (state, action) => {
    return [ action.payload.result, ...state ];
  },
  [actionTypes.CARBON_REMOVE_COMPLETE]: (state, action) => {
    return state.filter(id => id !== action.payload);
  },
  [actionTypes.CARBON_FETCH_COMPLETE]: (state, action) => {
    return [ ...action.payload.result ];
  }
});

const filter = createReducer('', {
  [actionTypes.SET_CARBON_FILTER]: (_, action) => {
    return action.payload;
  },
});

const sources = (state = {}, action) => {
  if (
    action.type === actionTypes.CARBON_ADD_COMPLETE ||
    action.type === actionTypes.CARBON_FETCH_COMPLETE
  ) {
    return {
      ...state,
      ...action.payload.entities['carbonSources'],
    };
  }

  if (action.type === actionTypes.CARBON_UPDATE_COMPLETE) {
    if (!action.payload.relatives || action.payload.relatives.length <= 0) {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          periodicity: 0
        }
      };
    }

    let returnedState = {
      [action.response.id]: {
        ...state[action.response.id],
        periodicity: action.response.periodicity
      }
    };
    action.response.relatives.map(relative => {
      return returnedState = {
        ...returnedState,
        [relative]: {
          ...state[relative],
          periodicity: action.response.periodicity
        }
      };
    });

    return {
      ...state,
      ...returnedState
    };

  }

  return state;
};

const fetchTypes = [
  actionTypes.CARBON_FETCH_START,
  actionTypes.CARBON_FETCH_COMPLETE,
  actionTypes.CARBON_FETCH_ERROR,
];

const addTypes = [
  actionTypes.CARBON_ADD_START,
  actionTypes.CARBON_ADD_COMPLETE,
  actionTypes.CARBON_ADD_ERROR,
];

const removeTypes = [
  actionTypes.CARBON_REMOVE_START,
  actionTypes.CARBON_REMOVE_COMPLETE,
  actionTypes.CARBON_REMOVE_ERROR,
];

const updateTypes = [
  actionTypes.CARBON_UPDATE_START,
  actionTypes.CARBON_UPDATE_COMPLETE,
  actionTypes.CARBON_UPDATE_ERROR,
];

export default combineReducers({
  isFetching: createBooleanReducer(fetchTypes),
  isAdding: createBooleanReducer(addTypes),
  isRemoving: createBooleanReducer(removeTypes),
  isUpdating: createBooleanReducer(updateTypes),
  errorMessages: createErrorMessagesReducer(fetchTypes),
  sourcesList,
  sources,
  filter,
});

export const getIsFetching = (state) => state.isFetching;
export const getIsAdding = (state) => state.isAdding;
export const getIsRemoving = (state) => state.isRemoving;
export const getIsUpdating = (state) => state.isUpdating;
export const getFilter = (state) => state.filter;
export const getErrorMessages = (state) => state.errorMessages;
export const getSourcesList = (state) => state.sourcesList;
export const getSources = (state) => state.sources;

export const getSourceById = (state, id) => state.sources[id];
export const getAllSources = (state) =>
  state.sourcesList.map(source => state.sources[source]);

export const getTotalCarbon = (state) => {
  const carbonValues = state.sourcesList.map(source => {
    return state.sources[source].amount;
  });

  return carbonValues.reduce((a, b) => {
    return a + b;
  }, 0);
};

export const getFilteredSources = (state, filter) => {
  if (filter) {
    return getAllSources(state).filter(source => {
      return source.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  return getAllSources(state);
};

export const getSourcesToOffset = (state, capturedAmount) => {
  let remainder = capturedAmount;

  return getAllSources(state).sort((a,b) => a.value-b.value).filter(source => {
    if (remainder < 0) { return false; }

    remainder = remainder - source.value;
    return source;
  });
};
