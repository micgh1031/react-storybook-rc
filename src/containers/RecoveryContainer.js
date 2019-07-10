import React, { Component } from 'react';
import mixpanel from 'mixpanel-browser';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../setup/history';

import { requestRecovery, resetPassword } from '../actions/userActions';
import * as authSelector from '../selectors/userActions';
import * as userSelector from '../selectors/userSession';
import * as UISelector from '../selectors/UI';

import Recovery from '../components/Auth/Recovery';

class RecoveryContainer extends Component {

  componentDidMount() {
    mixpanel.track("Page view", {
      "Action": "Recovery password",
      "Domain": "App"
    });
  }

  componentWillMount() {
    const { isAuthenticated, location } = this.props;

    if (isAuthenticated) {
      history.push('/');
    }

    this.recoveryToken = new URLSearchParams(location.search).get('token');
  }

  componentWillReceiveProps(newProps) {
    const { isAuthenticated } = newProps;

    if (isAuthenticated) {
      history.push('/');
    }
  }

  handleRecovery({ email }) {
    this.props.requestRecovery(email);
  }

  handleReset({ password }) {
    this.props.resetPassword(this.recoveryToken, password);
  }

  render() {
    const {
      recoveryErrorMessages,
      resetErrorMessages,
      isWorking,
      isPasswordReset,
      isRecoveryRequested,
    } = this.props;

    return (
      <Recovery
        recoveryErrorMessages={recoveryErrorMessages}
        resetErrorMessages={resetErrorMessages}
        handleRecovery={this.handleRecovery.bind(this)}
        handleReset={this.handleReset.bind(this)}
        isWorking={isWorking}
        isPasswordReset={isPasswordReset}
        isRecoveryRequested={isRecoveryRequested}
        recoveryToken={this.recoveryToken}
      />
    );
  }
}

const mapStateToProps = state => ({
  recoveryErrorMessages: authSelector.getRecoveryErrorMessages(state),
  resetErrorMessages: authSelector.getResetErrorMessages(state),
  isAuthenticated: userSelector.getIsUserAuthenticated(state),
  isWorking: authSelector.getIsWorking(state),
  isPasswordReset: UISelector.getIsPasswordReset(state),
  isRecoveryRequested: UISelector.getIsRecoveryRequested(state),
});

RecoveryContainer.propTypes = {
  recoveryErrorMessages: PropTypes.string,
  resetErrorMessages: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  isWorking: PropTypes.bool.isRequired,
  isPasswordReset: PropTypes.bool.isRequired,
  isRecoveryRequested: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  requestRecovery: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  { requestRecovery, resetPassword }
)(RecoveryContainer);
