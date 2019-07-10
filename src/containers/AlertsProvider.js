import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dismissAlert } from '../actions/alerts';
import { getAlerts } from '../selectors/alerts';

import Alerts from '../components/UI/Alerts/Alerts';

const AlertsProvider = ({alerts, dismissAlert, children}) => {
  return (
    <div>
      <Alerts alerts={alerts} dismissAlert={dismissAlert} />
      {React.Children.only(children)}
    </div>
  );
};

AlertsProvider.propTypes = {
  alerts: PropTypes.array.isRequired,
  children: PropTypes.element.isRequired,
  dismissAlert: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  alerts: getAlerts(state)
});

export default connect(mapStateToProps, { dismissAlert })(AlertsProvider);
