import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import {
  photoMessages,
  authMessages,
  addressMessages,
  settingsMessages,
  privacyLevels
} from '../../constants/messages';
import { required, email } from '../../utils/formHelpers';
import { withIntl } from '../../utils/intl';

import FeedbackMessage from '../UI/Forms/FeedbackMessage';
import Row from '../UI/Forms/Row';
import RowAligner from '../UI/Forms/RowAligner';
import HeadingSmall from '../UI/Text/HeadingSmall';
import PhotoInput from '../UI/Forms/PhotoInput';
import Input from '../UI/Forms/Input';
import Typeahead from '../UI/Forms/Typeahead';
import Button from '../UI/Button/Button';
import DisabledButton from '../UI/Button/DisabledButton';

class Settings extends Component {
  submitForm(form) {
    const country = this.props.countries.find(
      (element) => form.country === element.country_name
    );

    form = {...form, country: country ? country.country_code : ''};
    if (form.avatar && form.avatar.length > 0) {
      let data = new FormData();
      data.append('image', form.avatar[0]);

      this.props.updateAvatar(data);
    }
    this.props.updateUser(form, this.props.refreshProfile);
  }

  render() {
    const {
      avatar,
      dirty,
      handleSubmit,
      isUpdating,
      valid,
      updateErrorMessages,
      intl,
      countries,
      languages,
      privacy,
      uploadProgress,
      addAlert,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.submitForm.bind(this))}>

        <Row>
          <RowAligner>
            <HeadingSmall>
              <FormattedMessage
                id={'Account.settingsTitle'}
                defaultMessage={'My Personal Information'}
              />
            </HeadingSmall>
          </RowAligner>
        </Row>

        <Row>
          <RowAligner>
            <Field
              avatar={avatar}
              name="avatar"
              type="file"
              label={intl.formatMessage(photoMessages.photoLabel)}
              component={PhotoInput}
              uploadProgress={uploadProgress}
              hidden
              addAlert={addAlert}
            />
          </RowAligner>
        </Row>

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
            disabled={isUpdating}
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

        {
          updateErrorMessages &&
          <FeedbackMessage type="error">{updateErrorMessages}</FeedbackMessage>
        }

        <Row>
          <RowAligner>
            { valid && dirty ?
              <Button big loading={isUpdating}>
                <FormattedMessage
                  id={'Account.saveSettings'}
                  defaultMessage={'Save Information'}
                />
              </Button> :
              <DisabledButton big>
                <FormattedMessage
                  id={'Account.saveSettings'}
                  defaultMessage={'Save Information'}
                />
              </DisabledButton>
            }
          </RowAligner>
        </Row>

      </form>
    );

  }
}

Settings.propTypes = {
  avatar: PropTypes.string,
  countries: PropTypes.array.isRequired,
  dirty: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  intl: intlShape,
  isUpdating: PropTypes.bool.isRequired,
  languages: PropTypes.array.isRequired,
  refreshProfile: PropTypes.func.isRequired,
  updateAvatar: PropTypes.func.isRequired,
  updateErrorMessages: PropTypes.string,
  updateUser: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  privacy: PropTypes.oneOf([ 0, 1, 2, '0', '1', '2' ]),
  uploadProgress: PropTypes.number.isRequired,
  addAlert: PropTypes.func.isRequired,
};

export default injectIntl(reduxForm({
  form: 'settings'
})(Settings));
