import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import {
  authMessages,
  addressMessages,
  settingsMessages,
  privacyLevels,
  formMessages
} from '../../constants/messages';
import { passwordStrength, required, email } from '../../utils/formHelpers';
import { withIntl } from '../../utils/intl';

import FeedbackMessage from '../UI/Forms/FeedbackMessage';
import Row from '../UI/Forms/Row';
import RowAligner from '../UI/Forms/RowAligner';
import Input from '../UI/Forms/Input';
import Typeahead from '../UI/Forms/Typeahead';
import Button from '../UI/Button/Button';

class KSSignupForm extends Component {

  submitForm(form) {
    const country = this.props.countries.find(
      (element) => form.country === element.country_name
    );
    form = {...form, country: country ? country.country_code : ''};
    this.props.activateUser(form);
  }

  render() {
    const {
      handleSubmit,
      isUpdating,
      intl,
      countries,
      languages,
      privacy,
      errorMessages,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.submitForm.bind(this))}>
        <Row>
          <Field
            name="lang"
            disabled={isUpdating}
            component={Input}
            label={intl.formatMessage(settingsMessages.langLabel)}
            type="select"
            children={languages}
          />
        </Row>

        <Row>
          <Field
            name="name"
            disabled={isUpdating}
            component={Input}
            label={intl.formatMessage(authMessages.nameLabel)}
            placeholder={intl.formatMessage(authMessages.namePlaceholder)}
            type="text"
            validate={withIntl(intl, required)}
          />
          <Field
            name="surname"
            disabled={isUpdating}
            component={Input}
            label={intl.formatMessage(authMessages.surnameLabel)}
            placeholder={intl.formatMessage(authMessages.surnamePlaceholder)}
            type="text"
            validate={withIntl(intl, required)}
          />
        </Row>

        <Row>
          <Field
            name="email"
            disabled={true}
            component={Input}
            label={intl.formatMessage(authMessages.emailLabel)}
            placeholder={intl.formatMessage(authMessages.emailPlaceholder)}
            type="text"
            validate={withIntl(intl, [email, required])}
          />
        </Row>

        <Row>
          <Field
            name="address_line"
            disabled={isUpdating}
            component={Input}
            label={intl.formatMessage(addressMessages.addressLabel)}
            placeholder={intl.formatMessage(addressMessages.addressPlaceholder)}
            type="text"
          />
        </Row>

        <Row>
          <Field
            name="city"
            disabled={isUpdating}
            component={Input}
            label={intl.formatMessage(addressMessages.cityLabel)}
            placeholder={intl.formatMessage(addressMessages.cityPlaceholder)}
            type="text"
          />
          <Field
            name="zip"
            disabled={isUpdating}
            component={Input}
            label={intl.formatMessage(addressMessages.zipLabel)}
            placeholder={intl.formatMessage(addressMessages.zipPlaceholder)}
            type="text"
          />
        </Row>

        <Row>
          <Field
            name="state"
            disabled={isUpdating}
            component={Input}
            label={intl.formatMessage(addressMessages.stateLabel)}
            placeholder={intl.formatMessage(addressMessages.statePlaceholder)}
            type="text"
          />

          <Field
            name="country"
            items={countries}
            getItemValue={(item) => item.country_name}
            disabled={isUpdating}
            component={Typeahead}
            label={intl.formatMessage(addressMessages.countryLabel)}
            placeholder={intl.formatMessage(addressMessages.countryPlaceholder)}
          />
        </Row>

        <Row>
          <Field
            name="privacy"
            disabled={isUpdating}
            component={Input}
            label={intl.formatMessage(settingsMessages.privacyLabel)}
            type="select"
            children={[
              {
                name: intl.formatMessage(privacyLevels.private),
                value: 0
              },
              {
                name: intl.formatMessage(privacyLevels.public),
                value: 1
              },
              {
                name: intl.formatMessage(privacyLevels.nickname),
                value: 2
              }
            ]}
          />
        </Row>

        <Row>
          <Field
            name="nickname"
            disabled={isUpdating}
            component={Input}
            label={intl.formatMessage(settingsMessages.nicknameLabel)}
            placeholder={intl.formatMessage(settingsMessages.nicknamePlaceholder)}
            type="text"
            validate={Number(privacy) > 1 ? withIntl(intl, required) : null}
          />
        </Row>

        <Row>
          <Field
            name="password"
            disabled={isUpdating}
            component={Input}
            placeholder={intl.formatMessage(authMessages.passwordPlaceholder)}
            label={intl.formatMessage(authMessages.passwordLabel)}
            type="password"
            validate={withIntl(intl, [required, passwordStrength])}
          />
          <Field
            name="passwordConfirm"
            disabled={isUpdating}
            component={Input}
            placeholder={intl.formatMessage(authMessages.repeatPasswordPlaceholder)}
            label={intl.formatMessage(authMessages.repeatPasswordLabel)}
            type="password"
            validate={withIntl(intl, required)}
          />
        </Row>

        {
          errorMessages &&
          <FeedbackMessage type="error">{errorMessages}</FeedbackMessage>
        }

        <Row>
          <RowAligner>
            <Button big loading={isUpdating} type="submit">
              <FormattedMessage
                id={'ksSignup.submit'}
                defaultMessage={'Create Account'}
              />
            </Button>
          </RowAligner>
        </Row>

      </form>
    );

  }
}

const validate = (formProps, props) => {
  const errors = {};
  const { password, passwordConfirm } = formProps;
  const { formatMessage } = props.intl;

  if ( passwordConfirm && (password !== passwordConfirm) ) {
    errors.passwordConfirm = formatMessage(formMessages.passwordNotMatch);
  }

  return errors;
};

KSSignupForm.propTypes = {
  countries: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  intl: intlShape,
  isUpdating: PropTypes.bool.isRequired,
  languages: PropTypes.array.isRequired,
  privacy: PropTypes.oneOf([ 0, 1, 2, '0', '1', '2' ]),
  errorMessages: PropTypes.string,
  activateUser: PropTypes.func.isRequired,
};

export default injectIntl(reduxForm({
  form: 'ksSignup',
  validate
})(KSSignupForm));
