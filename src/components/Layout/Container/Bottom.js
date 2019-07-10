import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './Bottom.css';

const Bottom = ({
  children,
  className,
  ...props,
}) => (
  <div {...props} className={cx(className, 'l-bottom')}>
    { children }
  </div>
);

Bottom.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
};

export default Bottom;
