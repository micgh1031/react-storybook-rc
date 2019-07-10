import React, { Component } from 'react';
import mixpanel from 'mixpanel-browser';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPublicProfile } from '../actions/publicProfile';
import {
  getProfileCaptured,
  getProfileEmitted,
  getErrorMessages,
  getProfileFormula,
  getIsFetching,
  getOxygen,
  getProfileSurface,
  getProfileForests,
  getProfileDetails,
} from '../selectors/publicProfile';
import {
  getIsUserAuthenticated
} from '../selectors/userSession';

import PublicDashboard from '../components/Dashboard/PublicDashboard';
import Loader from '../components/UI/Loader/Loader';
import FullErrorFetching from '../components/UI/Interface/FullErrorFetching';

class PublicDashboardContainer extends Component {


  componentDidMount() {
    mixpanel.track("Page view", {
      "Action": "Public profile: " + this.props.match.params.userName,
      "Domain": "App"
    });
  }

  componentWillMount() {
    this.props.getPublicProfile(this.props.match.params.userName);
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
      profileDetails,
      surface,
      forests,
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
      <PublicDashboard
        emitted={emitted}
        captured={captured}
        oxygen={oxygen}
        formula={formula}
        isAuthed={isAuthed}
        surface={surface}
        forests={forests}
        profile={profileDetails} />
    );
  }
}

const mapStateToProps = state => ({
  // balance
  captured: getProfileCaptured(state),
  emitted: getProfileEmitted(state),
  errorMessages: getErrorMessages(state),
  formula: getProfileFormula(state),
  surface: getProfileSurface(state),
  forests: getProfileForests(state),
  isFetching: getIsFetching(state),
  oxygen: getOxygen(state),
  // user
  isAuthed: getIsUserAuthenticated(state),
  profileDetails: getProfileDetails(state),
});

PublicDashboardContainer.propTypes = {
  // balance
  captured: PropTypes.number,
  emitted: PropTypes.number,
  surface: PropTypes.number,
  errorMessages: PropTypes.string,
  formula: PropTypes.string,
  getPublicProfile: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  oxygen: PropTypes.number,
  profileDetails: PropTypes.object,
  // user
  isAuthed: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, {
  getPublicProfile,
})(PublicDashboardContainer);
