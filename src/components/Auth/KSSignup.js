import React from 'react';
import PropTypes from 'prop-types';
import Box from 'react-layout-components';

import {
  injectIntl,
  intlShape
} from 'react-intl';

import { ksUserSignup } from '../../constants/messages';

import CoverImage from '../Layout/CoverImage/CoverImage';
import VerticalCenter from '../Layout/VerticalCenter/VerticalCenter';
import AuthHeader from './AuthHeader';
import AuthForm from './AuthForm';
import KSSignupForm from './KSSignupForm';

import signupImg from '../../assets/images/signup.jpg';

const KSSignup = ({
  intl,
  countries,
  languages,
  user,
  privacy,
  isUpdating,
  errorMessages,
  activateUser,
}) => {

  if (countries.length < 1 || Object.keys(user).length < 1) {
    return false;
  }

  const { ...initialValues } = user;

  const humanReadableCountryName = () => {
    if (!initialValues.country) {
      return '';
    }

    const initialCountry = countries.find(
      (element) => initialValues.country.toUpperCase() === element.country_code
    );
    return initialCountry.country_name;
  };

  return (
    <Box width="100%">
      <CoverImage img={signupImg} />

      <VerticalCenter className="signup-sidebar">
        <AuthHeader
          title={intl.formatMessage(ksUserSignup.ksTitle)}
          text={intl.formatMessage(ksUserSignup.ksMessage)}
        />
        <AuthForm>
          <KSSignupForm
            countries={countries}
            initialValues={{...initialValues, country: humanReadableCountryName() }}
            languages={languages}
            privacy={privacy}
            isUpdating={isUpdating}
            errorMessages={errorMessages}
            activateUser={activateUser}
          />
        </AuthForm>
      </VerticalCenter>
    </Box>
  );
};

KSSignup.propTypes = {
  intl: intlShape,
  countries: PropTypes.array.isRequired,
  languages: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  privacy: PropTypes.oneOf([ 0, 1, 2, '0', '1', '2' ]),
  isUpdating: PropTypes.bool.isRequired,
  errorMessages: PropTypes.string,
  activateUser: PropTypes.func.isRequired,
};

export default injectIntl(KSSignup);
