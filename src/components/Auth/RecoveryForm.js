import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import {
  FormattedMessage,
  injectIntl,
  intlShape
} from 'react-intl';

import { authMessages } from '../../constants/messages';

import { required, email } from '../../utils/formHelpers';
import { withIntl } from '../../utils/intl';

import FeedbackMessage from '../UI/Forms/FeedbackMessage';
import Input from '../UI/Forms/Input';
import Row from '../UI/Forms/Row';
import RowAligner from '../UI/Forms/RowAligner';
import Button from '../UI/Button/Button';
import DisabledButton from '../UI/Button/DisabledButton';

const RecoveryForm = ({
  handleSubmit,
  handleRecovery,
  errorMessages,
  isWorking,
  isRecoveryRequested,
  intl
}) => (
  <form onSubmit={handleSubmit(handleRecovery)}>
    {
      errorMessages && !isRecoveryRequested &&
      <FeedbackMessage type="error">{errorMessages}</FeedbackMessage>
    }
    {
      isRecoveryRequested &&
      <FeedbackMessage type="success">
        {intl.formatMessage(authMessages.recoverySuccess)}
      </FeedbackMessage>
    }
    <Row>
      <Field
        name="email"
        disabled={isRecoveryRequested}
        component={Input}
        placeholder={intl.formatMessage(authMessages.emailPlaceholder)}
        label={intl.formatMessage(authMessages.emailLabel)}
        type="email"
        validate={withIntl(intl, [email, required])}
      />
    </Row>

    <Row>
      <RowAligner>
        {
          isRecoveryRequested ?
          <DisabledButton>
            <FormattedMessage
              id={'Login.checkInbox'}
              defaultMessage={'Check your inbox'}
            />
          </DisabledButton> :
          <Button big loading={isWorking} type="submit">
            <FormattedMessage
              id={'Login.recoverButton'}
              defaultMessage={'Recover password'}
            />
          </Button>
        }
      </RowAligner>
    </Row>
  </form>
);

RecoveryForm.propTypes = {
  className: PropTypes.string,
  handleRecovery: PropTypes.func.isRequired,
  errorMessages: PropTypes.string,
  isWorking: PropTypes.bool.isRequired,
  isRecoveryRequested: PropTypes.bool.isRequired,
  /* redux form */
  handleSubmit: PropTypes.func.isRequired,
  /* intl */
  intl: intlShape.isRequired,
};

export default injectIntl(reduxForm({
  form: 'recovery'
})(RecoveryForm));
