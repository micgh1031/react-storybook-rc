import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './Frame.css';

const Frame = ({
  children,
  className,
  ...props,
}) => (
  <div {...props} className={cx(className, 'l-frame')}>
    {children}
  </div>
);

Frame.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
};

export default Frame;
