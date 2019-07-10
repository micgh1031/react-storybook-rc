import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import get from 'lodash/get';

import callAPI from '../middleware/callAPI';
import reducers from '../reducers';
import { loadState, saveState } from '../utils/localStorage';

const configureStore = () => {
  const middleware = [
    reduxThunk,
    callAPI,
  ];

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  const persistedState = loadState();
  const store = createStore(
    reducers,
    persistedState,
    composeEnhancers(
      applyMiddleware(...middleware)
    )
  );

  store.subscribe(throttle(() => {
    saveState({
      userSession: get(store.getState(), 'userSession'),
    });
  }), 1000);

  return store;
};


export default configureStore();
