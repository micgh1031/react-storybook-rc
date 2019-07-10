import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import {
  FormattedMessage,
  injectIntl,
  intlShape
} from 'react-intl';

import { authMessages, formMessages } from '../../constants/messages';

import { passwordStrength, required, email, mustAgree } from '../../utils/formHelpers';
import { withIntl } from '../../utils/intl';

import FeedbackMessage from '../UI/Forms/FeedbackMessage';
import Input from '../UI/Forms/Input';
import Checkbox from '../UI/Forms/Checkbox';
import Row from '../UI/Forms/Row';
import RowAligner from '../UI/Forms/RowAligner';
import Button from '../UI/Button/Button';

const ResetForm = ({
  errorMessages,
  handleSignup,
  handleSubmit,
  intl,
  isWorking,
}) => (
  <form onSubmit={handleSubmit(handleSignup)}>
    {
      errorMessages &&
      <FeedbackMessage type="error">{errorMessages}</FeedbackMessage>
    }

    <Row>
      <Field
        name="name"
        component={Input}
        disabled={isWorking}
        placeholder={intl.formatMessage(authMessages.namePlaceholder)}
        label={intl.formatMessage(authMessages.nameLabel)}
        type="text"
        validate={withIntl(intl, required)}
      />
      <Field
        name="surname"
        component={Input}
        disabled={isWorking}
        placeholder={intl.formatMessage(authMessages.surnamePlaceholder)}
        label={intl.formatMessage(authMessages.surnameLabel)}
        type="text"
        validate={withIntl(intl, required)}
      />
    </Row>

    <Row>
      <Field
        name="email"
        component={Input}
        disabled={isWorking}
        placeholder={intl.formatMessage(authMessages.emailPlaceholder)}
        label={intl.formatMessage(authMessages.emailLabel)}
        type="email"
        validate={withIntl(intl, [email, required])}
      />
    </Row>

    <Row>
      <Field
        name="password"
        disabled={isWorking}
        component={Input}
        placeholder={intl.formatMessage(authMessages.passwordPlaceholder)}
        label={intl.formatMessage(authMessages.passwordLabel)}
        type="password"
        validate={withIntl(intl, [required, passwordStrength])}
      />
      <Field
        name="passwordConfirm"
        disabled={isWorking}
        component={Input}
        placeholder={intl.formatMessage(authMessages.repeatPasswordPlaceholder)}
        label={intl.formatMessage(authMessages.repeatPasswordLabel)}
        type="password"
        validate={withIntl(intl, required)}
      />
    </Row>

    <Row>
      <Field
        name="tos"
        disabled={isWorking}
        component={Checkbox}
        label={
          <span>
            <FormattedMessage
              id={'tosMessages.message'}
            />
            &nbsp;
            <Link
              to={intl.formatMessage({id: 'localizedLink.tos'})}
              target="_blank">
              <FormattedMessage
                id={'tosMessages.tos'}
              />
            </Link>
          </span>
        }
        validate={withIntl(intl, mustAgree)}
      />
    </Row>

    <Row>
      <RowAligner>
        <Button big loading={isWorking} type="submit">
          <FormattedMessage
            id={'Signup.signupButton'}
            defaultMessage={'Sign up'}
          />
        </Button>
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
  handleSignup: PropTypes.func.isRequired,
  errorMessages: PropTypes.string,
  isWorking: PropTypes.bool.isRequired,
  /* redux form */
  handleSubmit: PropTypes.func.isRequired,
  /* intl */
  intl: intlShape.isRequired,
};

export default injectIntl(reduxForm({
  form: 'signup',
  validate
})(ResetForm));
