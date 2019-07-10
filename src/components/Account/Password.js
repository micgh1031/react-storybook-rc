import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { formMessages, authMessages } from '../../constants/messages';
import { required, passwordStrength } from '../../utils/formHelpers';
import { withIntl } from '../../utils/intl';

import FeedbackMessage from '../UI/Forms/FeedbackMessage';
import Row from '../UI/Forms/Row';
import RowAligner from '../UI/Forms/RowAligner';
import HeadingSmall from '../UI/Text/HeadingSmall';
import Input from '../UI/Forms/Input';
import Button from '../UI/Button/Button';
import DisabledButton from '../UI/Button/DisabledButton';

class Password extends Component {
  submitForm(form) {
    this.props.setNewPassword(
      form.oldPassword,
      form.newPassword,
      this.resetForm.bind(this)
    );
  }

  resetForm() {
    this.props.reset();
  }

  render() {
    const {
      dirty,
      handleSubmit,
      isUpdating,
      valid,
      passwordErrorMessages,
      intl,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.submitForm.bind(this))}>

        <Row>
          <RowAligner>
            <HeadingSmall>
              <FormattedMessage
                id={'Password.title'}
                defaultMessage={'Change Password'}
              />
            </HeadingSmall>
          </RowAligner>
        </Row>

        <Row>
          <Field
            name="oldPassword"
            disabled={isUpdating}
            component={Input}
            label={intl.formatMessage(authMessages.passwordLabel)}
            placeholder={intl.formatMessage(authMessages.passwordPlaceholder)}
            type="password"
            validate={withIntl(intl, required)}
          />
        </Row>

        <Row>
          <Field
            name="newPassword"
            disabled={isUpdating}
            component={Input}
            label={intl.formatMessage(authMessages.newPasswordLabel)}
            placeholder={intl.formatMessage(authMessages.newPasswordPlaceholder)}
            type="password"
            validate={withIntl(intl, [required, passwordStrength])}
          />
        </Row>

        <Row>
          <Field
            name="confirmPassword"
            disabled={isUpdating}
            component={Input}
            placeholder={intl.formatMessage(authMessages.repeatPasswordPlaceholder)}
            label={intl.formatMessage(authMessages.repeatPasswordLabel)}
            type="password"
            validate={withIntl(intl, required)}
          />
        </Row>

        {
          passwordErrorMessages &&
          <FeedbackMessage type="error">{passwordErrorMessages}</FeedbackMessage>
        }

        <Row>
          <RowAligner>
            { valid && dirty ?
              <Button big loading={isUpdating}>
                <FormattedMessage
                  id={'Password.saveChanges'}
                  defaultMessage={'Update Password'}
                />
              </Button> :
              <DisabledButton big>
                <FormattedMessage
                  id={'Password.saveChanges'}
                  defaultMessage={'Update Password'}
                />
              </DisabledButton>
            }
          </RowAligner>
        </Row>

      </form>
    );

  }
}

const validate = (formProps, props) => {
  const errors = {};
  const { newPassword, confirmPassword } = formProps;
  const { formatMessage } = props.intl;

  if ( confirmPassword && (newPassword !== confirmPassword) ) {
    errors.confirmPassword = formatMessage(formMessages.passwordNotMatch);
  }

  return errors;
};

Password.propTypes = {
  dirty: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape,
  isUpdating: PropTypes.bool.isRequired,
  passwordErrorMessages: PropTypes.string,
  reset: PropTypes.func.isRequired,
  setNewPassword: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
};

export default injectIntl(reduxForm({
  form: 'password',
  validate
})(Password));
