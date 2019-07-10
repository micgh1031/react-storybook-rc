import React, { Component } from 'react';
import mixpanel from 'mixpanel-browser';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../setup/history';

import { signup } from '../actions/userActions';
import * as authSelector from '../selectors/userActions';
import * as userSelector from '../selectors/userSession';

import Signup from '../components/Auth/Signup';

class SignupContainer extends Component {

  componentDidMount() {
    mixpanel.track("Page view", {
      "Action": "Sign up",
      "Domain": "App"
    });
  }

  componentWillMount() {
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      history.push('/');
    }
  }

  componentWillReceiveProps(newProps) {
    const { isAuthenticated } = newProps;

    if (isAuthenticated) {
      history.push('/');
    }
  }

  handleSignup(form) {
    this.props.signup(form);
  }

  render() {
    const {
      signupErrorMessages,
      isWorking,
    } = this.props;

    return (
      <Signup
        signupErrorMessages={signupErrorMessages}
        handleSignup={this.handleSignup.bind(this)}
        isWorking={isWorking}
      />
    );
  }
}

const mapStateToProps = state => ({
  signupErrorMessages: authSelector.getSignupErrorMessages(state),
  isAuthenticated: userSelector.getIsUserAuthenticated(state),
  isWorking: authSelector.getIsWorking(state),
});

SignupContainer.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isWorking: PropTypes.bool.isRequired,
  signup: PropTypes.func.isRequired,
  signupErrorMessages: PropTypes.string,
};

export default connect(
  mapStateToProps,
  { signup }
)(SignupContainer);
