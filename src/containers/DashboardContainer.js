import React, { Component } from 'react';
import mixpanel from 'mixpanel-browser';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getBalance } from '../actions/balance';
import {
  getCaptured,
  getEmitted,
  getErrorMessages,
  getFormula,
  getIsFetching,
  getOxygen,
  getUserSurface,
} from '../selectors/balance';
import {
  getIsUserAuthenticated,
  getUserDetails
} from '../selectors/userSession';

import Dashboard from '../components/Dashboard/Dashboard';
import Loader from '../components/UI/Loader/Loader';
import FullErrorFetching from '../components/UI/Interface/FullErrorFetching';

class DashboardContainer extends Component {

  componentDidMount() {
    mixpanel.track("Page view", {
      "Action": "Dashboard",
      "Domain": "App"
    });
  }

  componentWillMount() {
    this.props.getBalance();
  }

  render() {
    const {
      captured,
      emitted,
      errorMessages,
      formula,
      getBalance,
      isAuthed,
      isFetching,
      oxygen,
      userDetails,
      surface,
    } = this.props;

    if (errorMessages) {
      return (
        <FullErrorFetching
          errorMessage={errorMessages}
          retry={getBalance}
        />
      );
    }

    if (isFetching) return <Loader />;

    return (
      <Dashboard
        emitted={emitted}
        captured={captured}
        oxygen={oxygen}
        formula={formula}
        isAuthed={isAuthed}
        surface={surface}
        user={userDetails} />
    );
  }
}

const mapStateToProps = state => ({
  // balance
  captured: getCaptured(state),
  emitted: getEmitted(state),
  errorMessages: getErrorMessages(state),
  formula: getFormula(state),
  surface: getUserSurface(state),
  isFetching: getIsFetching(state),
  oxygen: getOxygen(state),
  // user
  isAuthed: getIsUserAuthenticated(state),
  userDetails: getUserDetails(state),
});

DashboardContainer.propTypes = {
  // balance
  captured: PropTypes.number,
  emitted: PropTypes.number,
  surface: PropTypes.number,
  errorMessages: PropTypes.string,
  formula: PropTypes.string,
  getBalance: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  oxygen: PropTypes.number,
  // user
  isAuthed: PropTypes.bool.isRequired,
  userDetails: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {
  getBalance,
})(DashboardContainer);
