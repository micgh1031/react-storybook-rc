import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HeaderContainer from '../containers/HeaderContainer';
import Login from '../views/Login';
import Register from '../views/Register';
import Recovery from '../views/Recovery';
import Calculator from '../views/Calculator';
import MyForests from '../views/MyForests';
import PublicProfileDashboard from '../views/PublicProfileDashboard';
import Dashboard from '../views/Dashboard';
import CreateForest from '../views/CreateForest';
import Checkout from '../views/Checkout';
import Account from '../views/Account';
import KSRegister from '../views/KSRegister';
import NotFound from '../views/NotFound';

import Frame from '../components/Layout/Frame/Frame';

const routes = (
  <Frame>
    <Route path="/" component={HeaderContainer} />
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/recover-password" component={Recovery} />
      <Route exact path="/calculator" component={Calculator} />
      <Route exact path="/my-forests/:id?" component={MyForests} />
      <Route exact path="/create-forest/:mode?" component={CreateForest} />
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/account/:mode?" component={Account} />
      <Route exact path="/ks-register" component={KSRegister} />
      <Route exact path="/public-profile/:userName?/" component={PublicProfileDashboard} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Frame>
);

export default routes;
