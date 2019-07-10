import actionTypes from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.ALERT_ADD:
      return [...state, action.payload];
    case actionTypes.ALERT_DISMISS:
      return state.filter(alert => alert.id !== action.payload);
    case actionTypes.ALERT_CLEAR:
      return [];
    default:
      return state;
  }
};

export const getAlerts = state => state;
