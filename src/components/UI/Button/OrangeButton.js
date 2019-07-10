import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Button from './Button';

const OrangeButton = ({className, ...props}) => (
  <Button {...props} className={cx(className, 'btn--orange')} />
);

OrangeButton.propTypes = {
  className: PropTypes.string
};

export default OrangeButton;
