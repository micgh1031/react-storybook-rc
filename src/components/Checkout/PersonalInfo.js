import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { injectIntl, intlShape } from 'react-intl';

import { withIntl } from '../../utils/intl';
import { required, email } from '../../utils/formHelpers';
import { authMessages, addressMessages } from '../../constants/messages';

import Typeahead from '../UI/Forms/Typeahead';
import Row from '../UI/Forms/Row';
import Input from '../UI/Forms/Input';

class PersonalInfo extends Component {
  render(){
    const {
      countries,
      isWorkingAuth,
      billingComplete,
      intl,
    } = this.props;

    return (
      <div>
        <Row>
          <Field
            name="name"
            component={Input}
            disabled={isWorkingAuth || billingComplete}
            placeholder={intl.formatMessage(authMessages.namePlaceholder)}
            label={intl.formatMessage(authMessages.nameLabel)}
            type="text"
            validate={withIntl(intl, required)}
          />
          <Field
            name="surname"
            component={Input}
            disabled={isWorkingAuth || billingComplete}
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
            disabled={isWorkingAuth || billingComplete}
            placeholder={intl.formatMessage(authMessages.emailPlaceholder)}
            label={intl.formatMessage(authMessages.emailLabel)}
            type="email"
            validate={withIntl(intl, [email, required])}
          />
        </Row>

        <Row>
          <Field
            name="address_line"
            component={Input}
            disabled={isWorkingAuth || billingComplete}
            label={intl.formatMessage(addressMessages.addressLabel)}
            placeholder={intl.formatMessage(addressMessages.addressPlaceholder)}
            type="text"
            validate={withIntl(intl, required)}
          />
        </Row>

        <Row>
          <Field
            name="city"
            component={Input}
            disabled={isWorkingAuth || billingComplete}
            label={intl.formatMessage(addressMessages.cityLabel)}
            placeholder={intl.formatMessage(addressMessages.cityPlaceholder)}
            type="text"
            validate={withIntl(intl, required)}
          />
          <Field
            name="zip"
            component={Input}
            disabled={isWorkingAuth || billingComplete}
            label={intl.formatMessage(addressMessages.zipLabel)}
            placeholder={intl.formatMessage(addressMessages.zipPlaceholder)}
            type="text"
            validate={withIntl(intl, required)}
          />
        </Row>

        <Row>
          <Field
            name="state"
            component={Input}
            disabled={isWorkingAuth || billingComplete}
            label={intl.formatMessage(addressMessages.stateLabel)}
            placeholder={intl.formatMessage(addressMessages.statePlaceholder)}
            type="text"
            validate={withIntl(intl, required)}
          />
          <Field
            name="country"
            component={Typeahead}
            items={countries}
            getItemValue={(item) => item.country_name}
            disabled={isWorkingAuth || billingComplete}
            label={intl.formatMessage(addressMessages.countryLabel)}
            placeholder={intl.formatMessage(addressMessages.countryPlaceholder)}
            validate={withIntl(intl, required)}
          />
        </Row>

      </div>
    );
  }
}


PersonalInfo.propTypes = {
  isWorkingAuth: PropTypes.bool.isRequired,
  billingComplete: PropTypes.bool.isRequired,
  countries: PropTypes.array.isRequired,
  intl: intlShape,
};

export default injectIntl(PersonalInfo);
