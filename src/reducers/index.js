import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import actionTypes from '../constants/actionTypes';

import alerts from './alerts';
import balance from './balance';
import calculator from './calculator';
import carbon from './carbon';
import certificates from './certificates';
import checkout from './checkout';
import countries from './countries';
import forests from './forests';
import invoices from './invoices';
import languages from './languages';
import userActions from './userActions';
import userInterface from './UI';
import userSession from './userSession';
import ksUser from './ksUser';
import publicProfile from './publicProfile';

const reducers = combineReducers({
  alerts,
  balance,
  calculator,
  carbon,
  certificates,
  checkout,
  countries,
  forests,
  form,
  invoices,
  languages,
  userActions,
  userInterface,
  userSession,
  ksUser,
  publicProfile
});


const rootReducer = (state, action) => {
  if (action.type === actionTypes.AUTH_LOGOUT) {
    state = undefined;
  }
  return reducers(state, action);
};

export default rootReducer;
