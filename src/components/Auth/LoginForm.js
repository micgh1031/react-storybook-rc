import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import {
  FormattedMessage,
  injectIntl,
  intlShape
} from 'react-intl';

import { authMessages } from '../../constants/messages';

import history from '../../setup/history';
import { required, email } from '../../utils/formHelpers';
import { withIntl } from '../../utils/intl';

import FeedbackMessage from '../UI/Forms/FeedbackMessage';
import Input from '../UI/Forms/Input';
import Row from '../UI/Forms/Row';
import RowAligner from '../UI/Forms/RowAligner';
import Button from '../UI/Button/Button';

const LoginForm = ({
  handleSubmit,
  handleLogin,
  errorMessages,
  isWorking,
  intl
}) => (
  <form onSubmit={handleSubmit(handleLogin)}>
    {
      errorMessages &&
      <FeedbackMessage type="error">{errorMessages}</FeedbackMessage>
    }
    <Row>
      <Field
        name="email"
        component={Input}
        placeholder={intl.formatMessage(authMessages.emailPlaceholder)}
        label={intl.formatMessage(authMessages.emailLabel)}
        type="email"
        validate={withIntl(intl, [email, required])}
      />
    </Row>

    <Row>
      <Field
        name="password"
        component={Input}
        placeholder={intl.formatMessage(authMessages.passwordPlaceholder)}
        label={intl.formatMessage(authMessages.passwordLabel)}
        type="password"
        validate={withIntl(intl, required)}
        action={{
          label: intl.formatMessage(authMessages.forgot),
          action: () => {
            history.push('/recover-password');
          }
        }}
      />
    </Row>

    <Row>
      <RowAligner>
        <Button big loading={isWorking} type="submit">
          <FormattedMessage
            id={'Login.loginButton'}
            defaultMessage={'Login'}
          />
        </Button>
      </RowAligner>
    </Row>
  </form>
);

LoginForm.propTypes = {
  className: PropTypes.string,
  handleLogin: PropTypes.func.isRequired,
  errorMessages: PropTypes.string,
  isWorking: PropTypes.bool.isRequired,
  /* redux form */
  handleSubmit: PropTypes.func.isRequired,
  /* intl */
  intl: intlShape.isRequired,
};

export default injectIntl(
  reduxForm({
    form: 'login'
  })(LoginForm));
