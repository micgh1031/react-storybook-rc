import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Box } from 'react-layout-components';

import './AuthForm.css';

const AuthForm = ({ className, children }) => (
  <Box className={cx(className, 'auth-form')}>
    {React.Children.only(children)}
  </Box>
);

AuthForm.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default AuthForm;
