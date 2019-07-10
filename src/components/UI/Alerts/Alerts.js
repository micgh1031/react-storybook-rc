import React from 'react';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import Alert from './Alert';

import './Alerts.css';

const Alerts = ({alerts, dismissAlert}) => {
  const items = alerts.map(alert => {
    return (
      <CSSTransition
        key={alert.id}
        classNames="alert-animation-"
        timeout={{ enter: 300, exit: 200 }}
      >
        <Alert
          id={alert.id}
          type={alert.type}
          label={alert.label}
          message={alert.message}
          dismissAlert={dismissAlert}
          action={alert.action}
        />
      </CSSTransition>
    );
  });

  return (
    <div className="alerts">
      <TransitionGroup>
        {items}
      </TransitionGroup>
    </div>
  );
};

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired,
  dismissAlert: PropTypes.func.isRequired,
};

export default Alerts;
