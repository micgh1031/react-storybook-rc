import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './Alert.css';

const Alert = props => {
  const { action, className, dismissAlert, id, label, message, type } = props;
  return (
    <div className={cx(className, 'alert', `alert--${type}`)}>
      <div className="alert__content">
        {
          label &&
          <span className="alert__label">
            {label}
          </span>
        }
        <span className="alert__message">
          {
            message
          }
        </span>
        {
          action &&
          <div className="alert__action" onClick={action.action}>
            {action.label}
          </div>
        }
      </div>

      <div className="alert__close" onClick={() => { dismissAlert(id); }}>&#215;</div>
    </div>
  );
};

Alert.propTypes = {
  /** Callback action. If used it needs both label and action */
  action: PropTypes.shape({
    label: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
  }),
  className: PropTypes.string,
  /** Dismiss time in ms. If not available Alert has to be dismissed manually */
  dismissAlert: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  label: PropTypes.string,
  message: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']).isRequired
};

export default Alert;
