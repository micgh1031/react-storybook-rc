import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Button from './Button';

const DisabledButton = ({className, ...props}) => (
  <Button {...props} className={cx(className, 'btn--disabled')} disabled />
);

DisabledButton.propTypes = {
  className: PropTypes.string
};

export default DisabledButton;
