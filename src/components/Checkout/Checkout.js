import React from 'react';
import PropTypes from 'prop-types';

import ForestGalleryContainer from '../../containers/ForestGalleryContainer';
import SummaryText from './SummaryText';
import Summary from './Summary';
import BillingForm from './BillingForm';
import Payment from './Payment';

import Container from '../Layout/Container/Container';
import Content from '../Layout/Container/Content';

import './Checkout.css';

const Checkout = ({
  area,
  billingComplete,
  countries,
  forest,
  isAuthenticated,
  isPaying,
  isWorkingAuth,
  makePayment,
  paymentErrors,
  refreshProfile,
  signup,
  signupErrorMessages,
  toggleBillingPanel,
  updateErrorMessages,
  updateUser,
  user,
  price,
}) => {

  if (countries.length < 1) {
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
    <Container>
      <Content className="checkout-container">

        <SummaryText
          className="checkout-container__text"
          area={area}
          forestName={forest.name}
          forestLocation={forest.location_desc}
        />
        <div className="checkout-container__image">
          <ForestGalleryContainer
            image={forest.main_image}
            forestId={forest.id}
          />
        </div>

        <div className="checkout-container__summary">
          <Summary
            area={area}
            priceFromServer={price}
          />
        </div>

        <div className="checkout-container__form">
          <BillingForm
            billingComplete={billingComplete}
            initialValues={{...initialValues, country: humanReadableCountryName() }}
            isAuthenticated={isAuthenticated}
            isWorkingAuth={isWorkingAuth}
            signup={signup}
            signupErrorMessages={signupErrorMessages}
            toggleBillingPanel={toggleBillingPanel}
            updateErrorMessages={updateErrorMessages}
            updateUser={updateUser}
            countries={countries}
            refreshProfile={refreshProfile}
          />
          <Payment
            area={area}
            billingComplete={billingComplete}
            forestId={forest.id}
            forestName={forest.name}
            isPaying={isPaying}
            makePayment={makePayment}
            paymentErrors={paymentErrors}
            price={price.total_amount}
            user={user}
          />
        </div>

      </Content>
    </Container>
  );
};

Checkout.propTypes = {
  area: PropTypes.number.isRequired,
  billingComplete: PropTypes.bool.isRequired,
  countries: PropTypes.array.isRequired,
  forest: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isPaying: PropTypes.bool.isRequired,
  isWorkingAuth: PropTypes.bool.isRequired,
  makePayment: PropTypes.func.isRequired,
  paymentErrors: PropTypes.string,
  refreshProfile: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  signupErrorMessages: PropTypes.string,
  toggleBillingPanel: PropTypes.func.isRequired,
  updateErrorMessages: PropTypes.string,
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  price: PropTypes.object.isRequired,
};

export default Checkout;
