import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './Popover.css';

const Popover = ({
  children,
  className,
  direction = 'up',
  theme = 'light'
}) => (
  <div
    className={cx(
      'ui-popover',
      `ui-popover--${direction}`,
      `ui-popover--${theme}`
    )}
  >
    <div className="ui-popover__arrow" />
    <div className={cx(className, 'ui-popover__content')}>
      {children}
    </div>
  </div>
);

Popover.defaultProps = {
  direction: 'up',
  theme: 'light'
};

Popover.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  className: PropTypes.string,
  direction: PropTypes.oneOf(['up', 'right', 'down', 'left']),
  theme: PropTypes.oneOf(['light', 'dark', 'unavailable'])
};

export default Popover;
