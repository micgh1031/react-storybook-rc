import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import {
  FormattedMessage,
  injectIntl,
  intlShape
} from 'react-intl';

import { authMessages, formMessages } from '../../constants/messages';

import { passwordStrength, required } from '../../utils/formHelpers';
import { withIntl } from '../../utils/intl';

import FeedbackMessage from '../UI/Forms/FeedbackMessage';
import Input from '../UI/Forms/Input';
import Row from '../UI/Forms/Row';
import RowAligner from '../UI/Forms/RowAligner';
import Button from '../UI/Button/Button';
import DisabledButton from '../UI/Button/DisabledButton';

const ResetForm = ({
  handleSubmit,
  handleReset,
  errorMessages,
  isWorking,
  isPasswordReset,
  intl
}) => (
  <form onSubmit={handleSubmit(handleReset)}>
    {
      errorMessages && !isPasswordReset &&
      <FeedbackMessage type="error">{errorMessages}</FeedbackMessage>
    }
    {
      isPasswordReset &&
      <FeedbackMessage type="success">
        {intl.formatMessage(authMessages.resetSuccess)}
      </FeedbackMessage>
    }
    <Row>
      <Field
        name="password"
        disabled={isPasswordReset}
        component={Input}
        placeholder={intl.formatMessage(authMessages.passwordPlaceholder)}
        label={intl.formatMessage(authMessages.passwordLabel)}
        type="password"
        validate={withIntl(intl, [required, passwordStrength])}
      />
    </Row>

    <Row>
      <Field
        name="passwordConfirm"
        disabled={isPasswordReset}
        component={Input}
        placeholder={intl.formatMessage(authMessages.repeatPasswordPlaceholder)}
        label={intl.formatMessage(authMessages.repeatPasswordLabel)}
        type="password"
        validate={withIntl(intl, required)}
      />
    </Row>

    <Row>
      <RowAligner>
        {
          isPasswordReset ?
          <DisabledButton>
            <FormattedMessage
              id={'Login.resetButton'}
              defaultMessage={'Reset password'}
            />
          </DisabledButton> :
          <Button big loading={isWorking} type="submit">
            <FormattedMessage
              id={'Login.resetButton'}
              defaultMessage={'Reset password'}
            />
          </Button>
        }
      </RowAligner>
    </Row>

  </form>
);

const validate = (formProps, props) => {
  const errors = {};
  const { password, passwordConfirm } = formProps;
  const { formatMessage } = props.intl;

  if ( passwordConfirm && (password !== passwordConfirm) ) {
    errors.passwordConfirm = formatMessage(formMessages.passwordNotMatch);
  }

  return errors;
};

ResetForm.propTypes = {
  className: PropTypes.string,
  handleReset: PropTypes.func.isRequired,
  errorMessages: PropTypes.string,
  isWorking: PropTypes.bool.isRequired,
  isPasswordReset: PropTypes.bool.isRequired,
  /* redux form */
  handleSubmit: PropTypes.func.isRequired,
  /* intl */
  intl: intlShape.isRequired,
};

export default injectIntl(reduxForm({
  form: 'reset',
  validate
})(ResetForm));
