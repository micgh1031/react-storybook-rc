import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './Container.css';

const Container = ({
  children,
  className,
  ...props,
}) => (
  <div {...props} className={cx(className, 'l-container')}>
    { children }
  </div>
);

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
};

export default Container;
