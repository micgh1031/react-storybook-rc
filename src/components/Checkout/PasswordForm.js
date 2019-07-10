import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import { withIntl } from '../../utils/intl';
import { required, passwordStrength, mustAgree } from '../../utils/formHelpers';
import { authMessages } from '../../constants/messages';

import Row from '../UI/Forms/Row';
import RowAligner from '../UI/Forms/RowAligner';
import Input from '../UI/Forms/Input';
import Checkbox from '../UI/Forms/Checkbox';
import Text from '../UI/Text/Text';
import Small from '../UI/Text/Small';

const PasswordForm = ({ billingComplete, isWorkingAuth, intl }) => {
  return (
    <div>
      <Row className="checkout-billing-form__password">
        <RowAligner>
          <Text className="checkout-billing-form__password-title">
            Account password
          </Text>
          <Small color="light">
            Create your account to manage your forests.
          </Small>
        </RowAligner>
      </Row>

      <Row>
        <Field
          name="password"
          component={Input}
          disabled={isWorkingAuth || billingComplete}
          placeholder={intl.formatMessage(authMessages.passwordPlaceholder)}
          label={intl.formatMessage(authMessages.passwordLabel)}
          type="password"
          validate={withIntl(intl, [required, passwordStrength])}
        />
        <Field
          name="passwordConfirm"
          component={Input}
          disabled={isWorkingAuth || billingComplete}
          placeholder={intl.formatMessage(authMessages.repeatPasswordPlaceholder)}
          label={intl.formatMessage(authMessages.repeatPasswordLabel)}
          type="password"
          validate={withIntl(intl, required)}
        />
      </Row>

      <Row>
        <Field
          name="tos"
          disabled={isWorkingAuth || billingComplete}
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

    </div>
  );
};

PasswordForm.propTypes = {
  billingComplete: PropTypes.bool.isRequired,
  isWorkingAuth: PropTypes.bool.isRequired,
  intl: intlShape,
};

export default injectIntl(PasswordForm);
