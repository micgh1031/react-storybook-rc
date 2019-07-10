import actionTypes from '../constants/actionTypes';
import { addAlert } from '../actions/alerts';
import history from '../setup/history';

const callAPIMiddleware = ({ dispatch, getState }) => {
  return next => action => {
    const {
      actions,
      callAPI,
      shouldCallAPI = () => true,
      payload = {},
    } = action;

    if (!actions) {
      // Normal action: pass it on
      return next(action);
    }

    // Some early checks
    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.');
    }

    if ( !Array.isArray(actions) || actions.length !== 3 ) {
      throw new Error('Expected an array of three actions.');
    }

    if (
      actions.some(type => typeof type !== 'string' && typeof type !== 'object')
    ) {
      throw new Error(
        'Each type needs to be a string or an object'
      );
    }

    if (
      actions.some(type => (
        typeof type === 'object' && (
          typeof type.type !== 'string' ||
          typeof type.payload !== 'function'
        ))
      )
    ) {
      throw new Error(
        "Type object needs a string 'type' and a function 'payload'"
      );
    }

    // Return early if needed
    if (!shouldCallAPI(getState())) {
      return;
    }

    const [ requestType, successType, failureType ] = actions;

    // Function to dispatch each type
    const dispatchResponse = (type, payload, response) => {
      return typeof type === 'string' ?
        dispatch({
          ...payload,
          payload: response,
          type: type,
        }) :
        dispatch({
          ...payload,
          // if the type is an object, we expect the 'payload' key to be a
          // function. Execute it injecting the response, dispatch and state.
          payload: type.payload(response, dispatch, getState()),
          type: type.type
        });
    };

    // Start the request
    dispatchResponse(requestType, payload);

    // Call API
    return callAPI(getState()).then(
      response => {
        if (response.data.status >= 400) {
          return dispatchResponse(failureType, payload, response);
        }
        // Dispatch success response
        dispatchResponse(successType, payload, response);
      },
      error => {
        const isAuthed = getState().userSession.isAuthenticated;
        if (!error.response) return;
        if (error.response.status === 401) {
          dispatch({
            type: actionTypes.AUTH_EXPIRED,
            payload: null
          });

          if (isAuthed) {
            dispatch(addAlert({
              type: 'warning',
              message: 'Session Expired',
              dismissAfter: 5000
            }));
          }
        }
        // KS user already registered
        if (error.response.status === 410) {
          history.push('/login');
          dispatch(addAlert({
            type: 'warning',
            message: error.response.data.error.message,
            dismissAfter: 8000
          }));
        }

        // invalid token
        if (error.response.status === 403) {
          history.push('/');
          dispatch(addAlert({
            type: 'warning',
            message: 'Forbidden',
            dismissAfter: 3000
          }));
        }

        // Stripe Minimum fee not met
        if (error.response.status === 412) {
          history.push('/create-forest/carbon');
          dispatch(addAlert({
            type: 'warning',
            message: error.response.data.error.message,
            dismissAfter: 8000
          }));
        }

        // Dispatch error response
        dispatchResponse(failureType, payload, error.response.data);
      }
    );
  };
};

export default callAPIMiddleware;
