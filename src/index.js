import 'babel-polyfill';
import 'url-search-params-polyfill';
import mixpanel from 'mixpanel-browser';
import React from 'react';
import { render } from 'react-dom';
import { getUserDetails } from './selectors/userSession';

import access from './constants/access';

import store from './setup/store';

import Root from './setup/Root';

import './styles/index.css';

mixpanel.init(access.mixpanelKey);

render(
  <Root store={store} lang={getUserDetails(store.getState())} />,
  document.getElementById('root')
);
