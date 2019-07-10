import React, { Component } from 'react';
import mixpanel from 'mixpanel-browser';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import {
  getIsUpdating,
  getPasswordErrorMessages,
  getUpdateErrorMessages,
  getUploadProgress
} from '../selectors/userActions';

import {
  getIsUserAuthenticated,
  getUserDetails,
  getToken,
} from '../selectors/userSession';

import {
  getCountries,
  getCountriesErrorMessages,
} from '../selectors/countries';

import { getInvoices, getInvoicesErrorMessages } from '../selectors/invoices';

import { getCertificates } from '../selectors/certificates';

import { getLanguages } from '../selectors/languages';

import { updateUser, setNewPassword, updateAvatar } from '../actions/userActions';
import { refreshProfile } from '../actions/userSession';
import { fetchCountries } from '../actions/countries';
import { fetchLanguages } from '../actions/languages';
import { fetchInvoices } from '../actions/invoices';
import { fetchCertificates } from '../actions/certificates';
import { addAlert } from '../actions/alerts';

import Account from '../components/Account/Account';

class AccountContainer extends Component {

  componentDidMount() {
    mixpanel.track("Page view", {
      "Action": "My account",
      "Domain": "App"
    });
  }

  componentWillMount() {
    const { isAuthenticated, history } = this.props;

    if (!isAuthenticated) {
      history.push('/login');
    }

    this.props.fetchCountries();
    this.props.fetchLanguages();
  }

  componentWillReceiveProps(newProps) {
    const { isAuthenticated, history } = newProps;

    if (!isAuthenticated) {
      history.push('/login');
    }
  }

  render() {
    const {
      countries,
      isAuthenticated,
      isUpdating,
      languages,
      passwordErrorMessages,
      refreshProfile,
      setNewPassword,
      updateAvatar,
      updateErrorMessages,
      updateUser,
      user,
      privacy,
      invoices,
      token,
      invoicesErrorMessages,
      certificates,
      fetchInvoices,
      fetchCertificates,
      uploadProgress,
      addAlert,
     } = this.props;

    if (!isAuthenticated && countries) return false;

    return (
      <Account
        countries={countries}
        isUpdating={isUpdating}
        languages={languages}
        passwordErrorMessages={passwordErrorMessages}
        refreshProfile={refreshProfile}
        setNewPassword={setNewPassword}
        updateAvatar={updateAvatar}
        updateErrorMessages={updateErrorMessages}
        updateUser={updateUser}
        user={user}
        privacy={privacy}
        fetchInvoices={fetchInvoices}
        invoices={invoices}
        invoicesErrorMessages={invoicesErrorMessages}
        token={token}
        fetchCertificates={fetchCertificates}
        certificates={certificates ? certificates : []}
        uploadProgress={uploadProgress}
        addAlert={addAlert}
      />
    );
  }
}

const settingsFormSelector = formValueSelector('settings');

const mapStateToProps = state => ({
  countries: getCountries(state),
  countriesErrorMessages: getCountriesErrorMessages(state),
  isAuthenticated: getIsUserAuthenticated(state),
  isUpdating: getIsUpdating(state),
  languages: getLanguages(state),
  passwordErrorMessages: getPasswordErrorMessages(state),
  updateErrorMessages: getUpdateErrorMessages(state),
  user: getUserDetails(state),
  privacy: settingsFormSelector(state, 'privacy'),
  invoices: getInvoices(state),
  invoicesErrorMessages: getInvoicesErrorMessages(state),
  token: getToken(state),
  certificates: getCertificates(state),
  uploadProgress: getUploadProgress(state),
});

AccountContainer.propTypes = {
  countries: PropTypes.array.isRequired,
  countriesErrorMessages: PropTypes.string,
  fetchCountries: PropTypes.func.isRequired,
  fetchLanguages: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  languages: PropTypes.array.isRequired,
  passwordErrorMessages: PropTypes.string,
  refreshProfile: PropTypes.func.isRequired,
  setNewPassword: PropTypes.func.isRequired,
  updateAvatar: PropTypes.func.isRequired,
  updateErrorMessages: PropTypes.string,
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  privacy: PropTypes.oneOf([ 0, 1, 2, '0', '1', '2' ]),
  fetchInvoices: PropTypes.func.isRequired,
  invoices: PropTypes.array.isRequired,
  invoicesErrorMessages: PropTypes.string,
  token: PropTypes.string.isRequired,
  fetchCertificates: PropTypes.func.isRequired,
  certificates: PropTypes.array,
  uploadProgress: PropTypes.number.isRequired,
  addAlert: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  fetchCountries,
  fetchCertificates,
  fetchInvoices,
  fetchLanguages,
  refreshProfile,
  setNewPassword,
  settingsFormSelector,
  updateAvatar,
  updateUser,
  addAlert
})(AccountContainer);
