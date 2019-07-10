// Generic reducer creator
export const createReducer = (initialState, handlers) => {
  return (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};

export const extractNormalizedEntity = (type, entity) => {
  if (typeof type !== 'string' || typeof entity !== 'string') {
    throw new Error('Expected strings in both arguments.');
  }

  return (state = {}, action) => {
    if (
      action.type === type &&
      action.response
    ) {
      return {
        ...state,
        ...action.response.entities[entity],
      };
    }

    return state;
  };
};

export const createBooleanReducer = (types) => {
  checkArray(types);

  const [ requestType, successType, failureType ] = types;

  return (state = false, action) => {
    switch (action.type) {
      case requestType:
        return true;
      case successType:
      case failureType:
        return false;
      default:
        return state;
    }
  };
};

export const createErrorMessagesReducer = (types) => {
  checkArray(types);

  const [ requestType, successType, failureType ] = types;

  return (state = null, action) => {
    switch (action.type) {
      case requestType:
      case successType:
        return null;
      case failureType:
        return action.payload;
      default:
        return state;
    }
  };
};

const checkArray = (types) => {
  if (
    !Array.isArray(types) ||
    types.length !== 3 ||
    !types.every(type => typeof type === 'string')
  ) {
    throw new Error('Expected an array of three string types.');
  }
};

// accepts actions to generate reducer in the following order:
// on, off and toggle
export const generateUIReducer = (types, initialState = false) => {

  const [ onType, offType, toggleType ] = types;

  return (state = initialState, action) => {
    switch (action.type) {
      case onType:
        return state = true;
      case offType:
        return state = false;
      case toggleType:
        return !state;
      default:
        return false;
    }
  };
};
