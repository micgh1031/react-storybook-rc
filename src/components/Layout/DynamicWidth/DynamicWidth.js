import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './DynamicWidth.css';

const DynamicWidth = ({
  children,
  className,
  ...other,
}) => (
  <div {...other} className={cx(className, 'l-dynamic-width')}>
    { children }
  </div>
);

DynamicWidth.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node).isRequired
  ]),
};

export default DynamicWidth;
