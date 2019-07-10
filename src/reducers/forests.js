import actionTypes from '../constants/actionTypes';
import { combineReducers } from 'redux';
import {
  createReducer,
  createBooleanReducer,
  createErrorMessagesReducer
} from '../utils/reducersHelpers';

const forests = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FORESTS_SUMMARY_COMPLETE:
    case actionTypes.FORESTS_FETCH_COMPLETE:
    case actionTypes.MY_FORESTS_COMPLETE: {
      let returnObject = { ...state };
      action.payload.result.map(forest => {
        return returnObject[forest] = {
          ...state[forest],
          ...action.payload.entities['forests'][forest]
        };
      });
      return returnObject;
    }
    case actionTypes.FORESTS_DETAILS_COMPLETE: {
      return {
        ...state,
        [action.payload.result]: {
          ...state[action.payload.result],
          ...action.payload.entities['forests'][action.payload.result]
        }
      };
    }
    case actionTypes.FORESTS_TREES_COMPLETE:
      return {
        [action.id]: {
          ...state[action.id],
          trees: action.response.result
        }
      };
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case actionTypes.FORESTS_SUMMARY_START:
    case actionTypes.FORESTS_FETCH_START:
    case actionTypes.MY_FORESTS_START:
      return true;
    case actionTypes.FORESTS_SUMMARY_COMPLETE:
    case actionTypes.FORESTS_SUMMARY_ERROR:
    case actionTypes.FORESTS_FETCH_COMPLETE:
    case actionTypes.FORESTS_FETCH_ERROR:
    case actionTypes.MY_FORESTS_COMPLETE:
    case actionTypes.MY_FORESTS_ERROR:
    case actionTypes.FORESTS_PRICE_COMPLETE:
    case actionTypes.FORESTS_PRICE_ERROR:
      return false;
    default:
      return state;
  }
};

const isFetchingDetails = (state = false, action) => {
  switch (action.type) {
    case actionTypes.FORESTS_DETAILS_START:
      return true;
    case actionTypes.FORESTS_DETAILS_COMPLETE:
    case actionTypes.FORESTS_DETAILS_ERROR:
      return false;
    default:
      return state;
  }
};

const errorMessages = (state = null, action) => {
  switch (action.type) {
    case actionTypes.FORESTS_FETCH_START:
    case actionTypes.MY_FORESTS_START:
    case actionTypes.FORESTS_FETCH_COMPLETE:
    case actionTypes.MY_FORESTS_COMPLETE:
    case actionTypes.FORESTS_PRICE_COMPLETE:
      return null;
    case actionTypes.FORESTS_FETCH_ERROR:
    case actionTypes.MY_FORESTS_ERROR:
    case actionTypes.FORESTS_PRICE_ERROR:
      return action.error.message;
    default:
      return state;
  }
};

export default combineReducers({
  isFetching,
  isFetchingDetails,
  isFetchingTrees: createBooleanReducer([
    actionTypes.FORESTS_TREES_START,
    actionTypes.FORESTS_TREES_COMPLETE,
    actionTypes.FORESTS_TREES_ERROR,
  ]),
  errorMessages,
  detailsErrorMessages: createErrorMessagesReducer([
    actionTypes.FORESTS_DETAILS_START,
    actionTypes.FORESTS_DETAILS_COMPLETE,
    actionTypes.FORESTS_DETAILS_ERROR,
  ]),
  forestsList: createReducer([], {
    [actionTypes.FORESTS_FETCH_COMPLETE]: (state, action) => {
      return [ ...action.payload.result ];
    }
  }),
  myForestsList: createReducer([], {
    [actionTypes.MY_FORESTS_COMPLETE]: (state, action) => {
      return [ ...action.payload.result ];
    },
    [actionTypes.FORESTS_SUMMARY_COMPLETE]: (state, action) => {
      return [ ...action.payload.result ];
    }
  }),
  team: createReducer({}, {
    [actionTypes.FORESTS_DETAILS_COMPLETE]: (state, action) => {
      return { ...state, ...action.payload.entities['team'] };
    }
  }),
  species: createReducer({}, {
    [actionTypes.FORESTS_DETAILS_COMPLETE]: (state, action) => {
      return { ...state, ...action.payload.entities['species'] };
    }
  }),
  forests,
  trees: createReducer({}, {
    [actionTypes.FORESTS_TREES_COMPLETE]: (state, action) => {
      return { ...state, ...action.response.entities['trees'] };
    }
  }),
  patrons: createReducer({
    isFetching: false,
    errorMessages: null,
    currentPage: 1,
    data: {},
    patrons: {},
  }, {
    [actionTypes.FOREST_PATRONS_START]: (state, action) => {
      return {
        ...state,
        isFetching: true,
        currentPage: action.page,
      };
    },
    [actionTypes.FOREST_PATRONS_COMPLETE]: (state, action) => {
      return {
        ...state,
        isFetching: false,
        patrons: {
          ...state.patrons,
          ...action.payload.entities['patrons']
        },
        data: {
          ...action.payload.entities['patronsResponse'][action.payload.result]
        }
      };
    },
    [actionTypes.FOREST_PATRONS_ERROR]: (state, action) => {
      return {
        ...state,
        isFetching: false,
        errorMessages: action.error.message,
      };
    },
  }),
  gallery: createReducer({ isFetching: null }, {
    [actionTypes.FOREST_GALLERY_START]: (_, action) => {
      // We need to use the forest id instead of a boolean to show
      // the loading state only on the respective image.
      return { isFetching: action.id };
    },
    // We don't need to do anything with the data because
    // the action will also pass it to the "gallery" UI reducer.
    [actionTypes.FOREST_GALLERY_COMPLETE]: () => {
      return { isFetching: null };
    },
    [actionTypes.FOREST_GALLERY_ERROR]: () => {
      return { isFetching: null };
    },
  }),
});

// UI
export const getIsFetching = state => state.isFetching;
export const getIsFetchingDetails = state => state.isFetchingDetails;
export const getIsFetchingTrees = state => state.isFetchingTrees;
export const getErrorMessages = state => state.errorMessages;
export const getDetailsErrorMessages = state => state.detailsErrorMessages;

// Get all forests
export const getForests = state => {
  return state.forestsList.map( forestId => state.forests[forestId] );
};
export const getMyForests = state => {
  return state.myForestsList.map( forestId => state.forests[forestId] );
};
// Forest by ID
export const getForestById = (state, id) => state.forests[id];

// Get forest specific info:
// Species
export const getForestSpecies = (state, id) => {
  if (!id || !state.forests[id] || !state.forests[id].species) return [];

  return state.forests[id].species.map( specie => state.species[specie] );
};
// Team
export const getForestTeam = (state, id) => {
  if (!id || !state.forests[id] || !state.forests[id].team) return [];

  return state.forests[id].team.map( member => {
    return state.team[member];
  });
};
// Trees
export const getForestTrees = (state, id) => {
  if (!id || !state.forests[id] || !state.forests[id].trees) return [];

  return state.forests[id].trees.map( tree => state.trees[tree] );
};
// Patrons
export const getIsFetchingPatrons = state => state.patrons.isFetching;
export const getPatronsErrorMessages = state => state.patrons.errorMessages;
export const getPatronsPage = state => state.patrons.currentPage;
export const getPatronsData = state => state.patrons.data;
export const getPatronsPodium = state => {
  if (!state.patrons.data.patrons) return [];

  return Object.keys(state.patrons.patrons).filter(patronId => {
    return state.patrons.patrons[patronId].rank <= 3;
  }).map(patron => state.patrons.patrons[patron]);
};
export const getPatrons = state => {
  if (!state.patrons.data.patrons) return [];

  return state.patrons.data.patrons.map(patronId => {
    return state.patrons.patrons[patronId];
  });
};

// Gallery
export const getIsFetchingGallery = state => state.gallery.isFetching;

// Numbers
const getMyTotals = (state, key) => {
  const totalVales = state.myForestsList.map(forest => {
    return state.forests[forest][key];
  });

  return totalVales.reduce((a,b) => {
    return a + b;
  }, 0);
};
export const getTotalCapturedCarbon = state => {
  return getMyTotals(state, 'captured_co2');
};
export const getTotalOxygen = state => {
  return getMyTotals(state, 'generated_o2');
};
