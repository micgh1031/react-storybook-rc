import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './Topbar.css';

const Topbar = ({
  children,
  className,
  ...props,
}) => (
  <div {...props} className={cx(className, 'l-topbar')}>
    { children }
  </div>
);

Topbar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
};

export default Topbar;
