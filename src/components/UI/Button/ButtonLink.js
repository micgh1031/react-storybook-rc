import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Link } from 'react-router-dom';
import Button from './Button';

const ButtonLink = ({
  children,
  className,
  to,
  ...props
}) => (
  <Link to={to} className={cx(className, 'btn--link')}>
    <Button {...props}>
      {children}
    </Button>
  </Link>
);

ButtonLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
};

export default ButtonLink;
