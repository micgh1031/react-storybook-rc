import actionTypes from '../constants/actionTypes';

/**
 * @function addAlert Adds an alert to Redux
 *
 * @param {Object} alert The alert object
 *
 * The alert object must contain:
 * @param {string} alert.message Alert message
 * @param {string} alert.type Alert type:
 * Can be 'info', 'success', 'warning', 'error'
 *
 * The alert object can contain:
 * @param {string} alert.label A label for the message
 * @param {number} alert.dismissAfter Number of ms. to auto-dismiss the alert
 * @param {Object} alert.action An actionable button within the alert with:
 * @param {function} alert.action.action The button action
 * @param {string} alert.action.label The button label
 *
 * @example
  addAlert({
    type: 'success',
    message: 'Your item was added',
    label: 'Great!',
    dismissAfter: 5000,
    action: {
      action: someFunction,
      label: 'Undo'
    }
  })
 */

export const addAlert = alert => {
  const payload = {
    ...alert,
    id: Date.now()
  };

  return dispatch => {
    dispatch({
      type: actionTypes.ALERT_ADD,
      payload
    });

    payload.dismissAfter && setTimeout(() => {
      dispatch({
        type: actionTypes.ALERT_DISMISS,
        payload: payload.id
      });
    }, payload.dismissAfter);
  };
};


/**
 * @function dismissAlert Dismiss a specific alert
 *
 * @param {number} id The alert's id
 */

export const dismissAlert = id => {
  return {
    type: actionTypes.ALERT_DISMISS,
    payload: id
  };
};


/**
 * @function clearAlerts Clear all alerts
 */

export const clearAlerts = () => {
  return {
    type: actionTypes.ALERT_CLEAR
  };
};
