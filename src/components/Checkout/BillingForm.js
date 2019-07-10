import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { formMessages } from '../../constants/messages';

import Row from '../UI/Forms/Row';
import RowAligner from '../UI/Forms/RowAligner';
import Button from '../UI/Button/Button';
import FeedbackMessage from '../UI/Forms/FeedbackMessage';
import BillingHeader from './BillingHeader';
import PersonalInfo from './PersonalInfo';
import PasswordForm from './PasswordForm';

import './BillingForm.css';

class BillingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formHeight: 0
    };
  }

  componentDidMount() {
    this.updateFormHeight();
  }

  componentDidUpdate() {
    this.updateFormHeight();
  }

  updateFormHeight() {
    if (this.state.formHeight !== this.form.clientHeight) {
      this.setState({
        formHeight: this.form.clientHeight
      });
    }
  }

  submitForm(form) {
    const {
      dirty,
      isAuthenticated,
      toggleBillingPanel,
      valid,
    } = this.props;

    const country = this.props.countries.find(
      (element) => form.country === element.country_name
    );
    form = {...form, country: country.country_code};

    if (!valid) { return; }

    if (!isAuthenticated) {
      return this.handleSignup(form);
    }

    return dirty ?
      this.handleUpdate(form) :
      toggleBillingPanel();
  }

  handleSignup(form) {
    this.props.signup(
      form,
      this.props.refreshProfile,
      this.props.toggleBillingPanel
    );
  }

  handleUpdate(form) {
    this.props.updateUser(
      form,
      this.props.refreshProfile,
      this.props.toggleBillingPanel
    );
  }

  render() {
    const {
      billingComplete,
      handleSubmit,
      isAuthenticated,
      toggleBillingPanel,
      isWorkingAuth,
      signupErrorMessages,
      updateErrorMessages,
      countries,
    } = this.props;

    return (
      <div className="checkout-billing-form">

        <BillingHeader
          isAuthenticated={isAuthenticated}
          billingComplete={billingComplete}
          toggleBillingPanel={toggleBillingPanel}
        />

        <div
          className="checkout-billing-form__form-wrapper"
          style={{
            maxHeight: billingComplete ? 0 : this.state.formHeight
          }}>
          <form
            className="checkout-billing-form__form"
            ref={form => this.form = form}
            onSubmit={handleSubmit(this.submitForm.bind(this))}>

            {
              (signupErrorMessages || updateErrorMessages) &&
              <FeedbackMessage type="error">
                {signupErrorMessages || updateErrorMessages}
              </FeedbackMessage>
            }

            <PersonalInfo
              isWorkingAuth={isWorkingAuth}
              billingComplete={billingComplete}
              countries={countries}
            />

            { !isAuthenticated &&
              <PasswordForm
                billingComplete={billingComplete}
                isWorkingAuth={isWorkingAuth}
              />
            }

            { !billingComplete &&
              <Row>
                <RowAligner>
                  <Button big loading={isWorkingAuth}>
                    <FormattedMessage
                      id={'BillingForm.continue'}
                      defaultMessage={'Save and Continue'}
                    />
                  </Button>
                </RowAligner>
              </Row>
            }
          </form>
        </div>

      </div>
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

BillingForm.propTypes = {
  billingComplete: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape,
  isAuthenticated: PropTypes.bool.isRequired,
  isWorkingAuth: PropTypes.bool.isRequired,
  signup: PropTypes.func.isRequired,
  signupErrorMessages: PropTypes.string,
  toggleBillingPanel: PropTypes.func.isRequired,
  updateErrorMessages: PropTypes.string,
  updateUser: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  countries: PropTypes.array.isRequired,
  refreshProfile: PropTypes.func.isRequired,
};

export default injectIntl(reduxForm({
  form: 'billing-form',
  validate
})(BillingForm));
