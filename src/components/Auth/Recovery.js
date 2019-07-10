import React from 'react';
import PropTypes from 'prop-types';
import Box from 'react-layout-components';
import {
  injectIntl,
  intlShape
} from 'react-intl';

import { authMessages } from '../../constants/messages';

import VerticalCenter from '../Layout/VerticalCenter/VerticalCenter';
import CoverImage from '../Layout/CoverImage/CoverImage';
import AuthHeader from './AuthHeader';
import AuthForm from './AuthForm';
import RecoveryForm from './RecoveryForm';
import ResetForm from './ResetForm';

import welcomeImg from '../../assets/images/welcome.jpg';

const Recovery = ({
  handleRecovery,
  handleReset,
  recoveryErrorMessages,
  resetErrorMessages,
  isWorking,
  isRecoveryRequested,
  isPasswordReset,
  recoveryToken,
  intl
}) => (

  <Box width="100%">

    <CoverImage img={welcomeImg} />

    {
      recoveryToken ?
      <VerticalCenter className="recovery-sidebar">
        <AuthHeader
          title={intl.formatMessage(authMessages.resetTitle)}
          text={intl.formatMessage(authMessages.resetText)}
        />
        <AuthForm>
          <ResetForm
            handleReset={handleReset}
            errorMessages={resetErrorMessages}
            isWorking={isWorking}
            isPasswordReset={isPasswordReset}
          />
        </AuthForm>
      </VerticalCenter>
      :
      <VerticalCenter className="recovery-sidebar">
        <AuthHeader
          title={intl.formatMessage(authMessages.recoveryTitle)}
          text={intl.formatMessage(authMessages.recoveryText)}
        />
        <AuthForm>
          <RecoveryForm
            handleRecovery={handleRecovery}
            errorMessages={recoveryErrorMessages}
            isWorking={isWorking}
            isRecoveryRequested={isRecoveryRequested}
          />
        </AuthForm>
      </VerticalCenter>
    }

  </Box>
);

Recovery.propTypes = {
  className: PropTypes.string,
  handleRecovery: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  recoveryErrorMessages: PropTypes.string,
  resetErrorMessages: PropTypes.string,
  isWorking: PropTypes.bool.isRequired,
  isRecoveryRequested: PropTypes.bool.isRequired,
  isPasswordReset: PropTypes.bool.isRequired,
  recoveryToken: PropTypes.string,
  intl: intlShape,
};

export default injectIntl(Recovery);
