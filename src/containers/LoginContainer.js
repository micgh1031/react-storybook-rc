import React, { Component } from 'react';
import mixpanel from 'mixpanel-browser';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../setup/history';

import { authenticate } from '../actions/userSession';
import * as authSelector from '../selectors/userActions';
import * as userSelector from '../selectors/userSession';

import Login from '../components/Auth/Login';

class HeaderContainer extends Component {

  componentDidMount() {
    mixpanel.track("Page view", {
      "Action": "Login",
      "Domain": "App"
    });
  }

  componentWillMount() {
    const { isAuthenticated, location } = this.props;

    if (isAuthenticated) {
      history.push('/');
    }

    this.nextUrl = new URLSearchParams(location.search).get('next');
  }

  componentWillReceiveProps(newProps) {
    const { isAuthenticated } = newProps;

    if (isAuthenticated) {
      history.push(this.nextUrl ? this.nextUrl : '/');
    }
  }

  handleLogin({ email, password}) {
    this.props.authenticate(email, password, () => history.push(this.nextUrl ? this.nextUrl : '/'));
  }

  render() {
    const { errorMessages, isWorking } = this.props;
    return (
      <Login
        handleLogin={this.handleLogin.bind(this)}
        errorMessages={errorMessages}
        isWorking={isWorking}
      />
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: userSelector.getIsUserAuthenticated(state),
  isWorking: authSelector.getIsWorking(state),
  errorMessages: authSelector.getLoginErrorMessages(state)
});

HeaderContainer.propTypes = {
  authenticate: PropTypes.func.isRequired,
  errorMessages: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  isWorking: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  { authenticate }
)(HeaderContainer);
