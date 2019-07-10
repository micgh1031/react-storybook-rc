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
import SignupForm from './SignupForm';

import signupImg from '../../assets/images/signup.jpg';

const Signup = ({
  handleSignup,
  intl,
  isWorking,
  signupErrorMessages,
}) => (
  <Box width="100%">

    <CoverImage img={signupImg} />

    <VerticalCenter className="signup-sidebar">
      <AuthHeader
        title={intl.formatMessage(authMessages.signupTitle)}
        text={intl.formatMessage(authMessages.signupText)}
      />
      <AuthForm>
        <SignupForm
          handleSignup={handleSignup}
          errorMessages={signupErrorMessages}
          isWorking={isWorking}
        />
      </AuthForm>
    </VerticalCenter>

  </Box>
);

Signup.propTypes = {
  className: PropTypes.string,
  handleSignup: PropTypes.func.isRequired,
  intl: intlShape,
  isWorking: PropTypes.bool.isRequired,
  signupErrorMessages: PropTypes.string,
};

export default injectIntl(Signup);
