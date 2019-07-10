import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './RowAligner.css';

const RowAligner = ({
  children,
  className,
}) => (
  <div className={cx(className, 'form__aligner')}>
    {children}
  </div>
);

RowAligner.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node).isRequired,
  ]),
};

export default RowAligner;
