import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'react-layout-components';
import {
  injectIntl,
  intlShape
} from 'react-intl';

import { authMessages } from '../../constants/messages';

import VerticalCenter from '../Layout/VerticalCenter/VerticalCenter';
import CoverImage from '../Layout/CoverImage/CoverImage';
import AuthHeader from './AuthHeader';
import AuthForm from './AuthForm';
import LoginForm from './LoginForm';

import welcomeImg from '../../assets/images/welcome.jpg';

import './Login.css';

const Login = ({
  handleLogin,
  errorMessages,
  isWorking,
  intl
}) => (
  <Box width="100%">

    <CoverImage img={welcomeImg} />

    <VerticalCenter className="login-sidebar">
      <AuthHeader
        title={intl.formatMessage(authMessages.loginTitle)}
        text={intl.formatMessage(authMessages.loginText)}
      />
      <AuthForm>
        <LoginForm
          handleLogin={handleLogin}
          errorMessages={errorMessages}
          isWorking={isWorking}
        />
      </AuthForm>
    </VerticalCenter>

  </Box>
);

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  errorMessages: PropTypes.string,
  isWorking: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(Login);
