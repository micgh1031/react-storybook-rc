import React, { Component } from 'react';
import mixpanel from 'mixpanel-browser';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchForestDetails } from '../actions/forests';
import { fetchCountries } from '../actions/countries';
import { signup, updateUser } from '../actions/userActions';
import { refreshProfile } from '../actions/userSession';
import { markSourceAsOffseted } from '../actions/carbon';

import { getIsFetchingDetails, getForestById } from '../selectors/forests';
import {
  getCountries,
  getCountriesErrorMessages,
} from '../selectors/countries';


import {
  getIsUserAuthenticated,
  getUserDetails,
} from '../selectors/userSession';
import {
  getIsUpdating,
  getUpdateErrorMessages,
  getSignupErrorMessages,
  getIsWorking as getIsSigningUp
} from '../selectors/userActions';
import {
  getIsBillingComplete,
  getIsPaymentComplete,
  getIsPaying,
  getPaymentErrors,
  getIsFetchingPrice,
  getPrice,
} from '../selectors/checkout';

import {
  makePayment,
  resetCheckout,
  toggleBillingPanel,
  getCalculatedPrice
} from '../actions/checkout';

import Loader from '../components/UI/Loader/Loader';
import ThankYou from '../components/Checkout/ThankYou';
import Checkout from '../components/Checkout/Checkout';

class CheckoutContainer extends Component {
  constructor(props) {
    super(props);

    this.forestId = Number(
      new URLSearchParams(props.location.search).get('forest')
    );
    this.forestArea = Number(
      new URLSearchParams(props.location.search).get('area')
    );
    this.selectedSources = (() => {
      const sources = new URLSearchParams(props.location.search).get('sources');
      if (sources !== 'undefined') return sources.split(',');
      return [];
    })();

  }

  componentDidMount() {
    mixpanel.track("Checkout", {
      "Action": "Load",
      "Domain": "App"
    });
    mixpanel.track("Page view", {
      "Action": "Checkout",
      "Domain": "App"
    });
  }

  componentWillMount() {
    const {
      history,
      fetchForestDetails,
      fetchCountries,
      getCalculatedPrice,
    } = this.props;

    if (!this.forestId || !this.forestArea) {
      history.replace('/create-forest');
    }

    fetchForestDetails(this.forestId);
    fetchCountries();
    getCalculatedPrice(this.forestId, this.forestArea);
  }

  componentWillReceiveProps(newProps){
    if (newProps.paymentComplete && this.selectedSources.length > 0) {
      this.selectedSources.forEach(
        element => {
          this.props.markSourceAsOffseted(element);
        }
      );
    }
  }

  componentWillUnmount() {
    this.props.resetCheckout();
  }

  getTotalInCents(area, pricePerSqm) {
    return (area * pricePerSqm * 100).toFixed();
  }

  render() {
    const {
      billingComplete,
      forest,
      isAuthenticated,
      isFetching,
      isPaying,
      isSigningUp,
      isUpdating,
      makePayment,
      paymentComplete,
      paymentErrors,
      signup,
      signupErrorMessages,
      toggleBillingPanel,
      updateErrorMessages,
      updateUser,
      user,
      countries,
      refreshProfile,
      isFetchingPrice,
      price,
    } = this.props;

    if (isFetching || isFetchingPrice || !forest) {
      return <Loader />;
    }

    if (paymentComplete) {

      mixpanel.track("Checkout", {
        "Action": "Completed :)",
        "Forest Id": forest.id,
        "Forest Name": forest.name,
        "Final Price": price.total_amount,
        "Area (sqm)": this.forestArea,
        "Domain": "App"
      });

      return (
        <ThankYou
          price={price.total_amount}
          area={this.forestArea}
          forest={forest}
        />
      );
    }

    return (
      <Checkout
        area={this.forestArea}
        billingComplete={billingComplete}
        countries={countries}
        forest={forest}
        getTotalInCents={this.getTotalInCents.bind(this)}
        isAuthenticated={isAuthenticated}
        isPaying={isPaying}
        isWorkingAuth={isSigningUp || isUpdating}
        makePayment={makePayment}
        paymentErrors={paymentErrors}
        refreshProfile={refreshProfile}
        signup={signup}
        signupErrorMessages={signupErrorMessages}
        toggleBillingPanel={toggleBillingPanel}
        updateErrorMessages={updateErrorMessages}
        updateUser={updateUser}
        user={user}
        price={price}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const forestId = new URLSearchParams(ownProps.location.search).get('forest');
  return {
    billingComplete: getIsBillingComplete(state),
    forest: getForestById(state, Number(forestId)),
    isAuthenticated: getIsUserAuthenticated(state),
    isFetching: getIsFetchingDetails(state),
    isPaying: getIsPaying(state),
    isSigningUp: getIsSigningUp(state),
    isUpdating: getIsUpdating(state),
    paymentComplete: getIsPaymentComplete(state),
    paymentErrors: getPaymentErrors(state),
    signupErrorMessages: getSignupErrorMessages(state),
    updateErrorMessages: getUpdateErrorMessages(state),
    user: getUserDetails(state),
    countries: getCountries(state),
    countriesErrorMessages: getCountriesErrorMessages(state),
    isFetchingPrice: getIsFetchingPrice(state),
    price: getPrice(state),
  };
};

CheckoutContainer.propTypes = {
  billingComplete: PropTypes.bool.isRequired,
  countries: PropTypes.array.isRequired,
  countriesErrorMessages: PropTypes.string,
  fetchCountries: PropTypes.func.isRequired,
  fetchForestDetails: PropTypes.func.isRequired,
  forest: PropTypes.object,
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isPaying: PropTypes.bool.isRequired,
  isSigningUp: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  makePayment: PropTypes.func.isRequired,
  markSourceAsOffseted: PropTypes.func.isRequired,
  paymentComplete: PropTypes.bool.isRequired,
  paymentErrors: PropTypes.string,
  refreshProfile: PropTypes.func.isRequired,
  resetCheckout: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  signupErrorMessages: PropTypes.string,
  toggleBillingPanel: PropTypes.func.isRequired,
  updateErrorMessages: PropTypes.string,
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  getCalculatedPrice: PropTypes.func.isRequired,
  isFetchingPrice: PropTypes.bool.isRequired,
  price: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {
  fetchForestDetails,
  signup,
  updateUser,
  toggleBillingPanel,
  makePayment,
  resetCheckout,
  fetchCountries,
  refreshProfile,
  markSourceAsOffseted,
  getCalculatedPrice,
})(CheckoutContainer);
