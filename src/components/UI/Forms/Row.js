import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './Row.css';

const Row = ({
  children,
  className,
}) => (
  <div className={cx(className, 'form__row')}>
    {children}
  </div>
);

Row.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node).isRequired,
  ]),
};

export default Row;
