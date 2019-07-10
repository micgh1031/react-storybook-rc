import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './Wrapper.css';

const Wrapper = ({
  children,
  className,
  ...props,
}) => (
  <div {...props} className={cx(className, 'l-wrapper')}>
    { children }
  </div>
);

Wrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
};

export default Wrapper;
