import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './Button.css';

const Button = ({big, loading, className, ...props}) => (
  <button {...props} className={cx(
    className,
    'btn',
    {
      'btn--big': big,
      'btn--will-loading': loading || loading === false,
      'btn--loading': loading
    }
  )} />
);

Button.propTypes = {
  big: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string
};

export default Button;
