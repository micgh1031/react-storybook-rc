import React, { Component } from 'react';
import mixpanel from 'mixpanel-browser';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../setup/history';
import { formValueSelector } from 'redux-form';

import { getProfileFromKS, activateKsProfile } from '../actions/ksUser';
import { fetchCountries } from '../actions/countries';
import { fetchLanguages } from '../actions/languages';

import * as userSelector from '../selectors/userSession';
import { getKsDetails, getIsFetching, getKsError } from '../selectors/ksUser';
import {
  getCountries,
  getCountriesErrorMessages,
} from '../selectors/countries';
import { getLanguages } from '../selectors/languages';

import KSSignup from '../components/Auth/KSSignup';

class KSSignupContainer extends Component {

  componentDidMount() {
    mixpanel.track("Page view", {
      "Action": "Kickstarter user activation",
      "Domain": "App"
    });
  }

  componentWillMount() {
    const { isAuthenticated, location, getProfileFromKS } = this.props;

    this.ksToken = new URLSearchParams(location.search).get('token');

    if (isAuthenticated || !this.ksToken) {
      return history.push('/');
    }

    getProfileFromKS(this.ksToken);
    this.props.fetchCountries();
    this.props.fetchLanguages();
  }

  componentWillReceiveProps(newProps) {
    const { isAuthenticated } = newProps;

    if (isAuthenticated || !this.ksToken) {
      history.push('/');
    }
  }

  activateUser(form){
    this.props.activateKsProfile(this.ksToken, form);
  }

  render() {
    const {
      countries,
      isUpdating,
      languages,
      user,
      privacy,
      errorMessages,
     } = this.props;

    return (
      <KSSignup
        countries={countries}
        isUpdating={isUpdating}
        languages={languages}
        user={user}
        privacy={privacy}
        errorMessages={errorMessages}
        activateUser={this.activateUser.bind(this)}
      />
    );
  }
}

const KsSignupFormSelector = formValueSelector('ksSignup');

const mapStateToProps = state => ({
  isAuthenticated: userSelector.getIsUserAuthenticated(state),
  countries: getCountries(state),
  countriesErrorMessages: getCountriesErrorMessages(state),
  isUpdating: getIsFetching(state),
  languages: getLanguages(state),
  user: getKsDetails(state),
  privacy: KsSignupFormSelector(state, 'privacy'),
  errorMessages: getKsError(state),
});

KSSignupContainer.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  getProfileFromKS: PropTypes.func.isRequired,
  countries: PropTypes.array.isRequired,
  countriesErrorMessages: PropTypes.string,
  fetchCountries: PropTypes.func.isRequired,
  fetchLanguages: PropTypes.func.isRequired,
  languages: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  privacy: PropTypes.oneOf([ 0, 1, 2, '0', '1', '2' ]),
  errorMessages: PropTypes.string,
  activateKsProfile: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  {
    getProfileFromKS,
    fetchCountries,
    fetchLanguages,
    activateKsProfile,
   }
)(KSSignupContainer);
