/* global Stripe */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { checkoutMessages } from '../../constants/messages';
import access from '../../constants/access';

import Button from '../UI/Button/Button';
import FeedbackMessage from '../UI/Forms/FeedbackMessage';
import PaymentInput from './PaymentInput';

import Row from '../UI/Forms/Row';
import RowAligner from '../UI/Forms/RowAligner';

class StripeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardType: 'unknown',
      cardError: false,
      dateError: false,
      cvcError: false,
    };

    this.stripe = Stripe(access.stripe);
    this.elements = this.stripe.elements();
  }

  componentDidMount() {
    this.setupPaymentForm();
  }

  setInputError(error, key) {
    this.setState({
      [key]: error ? true : false,
    });
  }

  moveToNextInput(input) {
    document.querySelector(`${input} input`).focus();
  }

  setupPaymentForm() {
    const style = {
      base: {
        fontFamily: 'Apercu, sans-serif',
        color: '#304351',
        fontSize: '18px',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#D8E0E6',
        },
      },
      invalid: {
        color: '#FA675C',
      },
    };

    this.card = this.elements.create('cardNumber', {style});
    this.date = this.elements.create('cardExpiry', {style});
    this.cvc = this.elements.create('cardCvc', {style});

    this.card.mount('#card-element');
    this.card.on('change', e => {
      if (e.complete) { this.moveToNextInput('#date-element'); }

      this.setState({ cardType: e.brand });
      this.setInputError(e.error, 'cardError');
    });

    this.date.mount('#date-element');
    this.date.on('change', e => {
      if (e.complete) { this.moveToNextInput('#cvc-element'); }

      this.setInputError(e.error, 'dateError');
    });

    this.cvc.mount('#cvc-element');
    this.cvc.on('change', e => {
      this.setInputError(e.error, 'cvcError');
    });
  }

  submitForm(event) {
    const {
      area,
      forestId,
      makePayment,
      price
    } = this.props;

    event.preventDefault();

    makePayment(
      // Stripe
      this.stripe,
      // Stripe's card element
      this.card,
      // Total
      price,
      // Sqm area
      area,
      forestId
    );
  }

  render() {
    const { isPaying, paymentErrors, intl } = this.props;
    const {
      cardError,
      cardType,
      cvcError,
      dateError,
    } = this.state;

    return (
      <form
        id="payment-form"
        method="post"
        onSubmit={this.submitForm.bind(this)}>

        <Row>
          <PaymentInput
            card
            label={intl.formatMessage(checkoutMessages.cardNumberLabel)}
            disabled={isPaying}
            error={cardError}
            cardType={cardType}>
            <div id="card-element" />
          </PaymentInput>
        </Row>

        <Row>
          <PaymentInput
            label={intl.formatMessage(checkoutMessages.expiryDateLabel)}
            disabled={isPaying}
            error={dateError}>
            <div id="date-element" />
          </PaymentInput>
          <PaymentInput
            label={intl.formatMessage(checkoutMessages.cvcLabel)}
            disabled={isPaying}
            error={cvcError}>
            <div id="cvc-element" />
          </PaymentInput>
        </Row>

        { paymentErrors &&
          <Row>
            <RowAligner>
              <FeedbackMessage type="error">
                {paymentErrors}
              </FeedbackMessage>
            </RowAligner>
          </Row>
        }

        <Row>
          <RowAligner>
            <Button big loading={isPaying}>
              <FormattedMessage
                id={'StripeForm.submit'}
                defaultMessage={'Submit Payment'}
              />
            </Button>
          </RowAligner>
        </Row>

      </form>
    );
  }
}

StripeForm.propTypes = {
  area: PropTypes.number.isRequired,
  forestId: PropTypes.number.isRequired,
  forestName: PropTypes.string.isRequired,
  intl: intlShape,
  isPaying: PropTypes.bool.isRequired,
  makePayment: PropTypes.func.isRequired,
  paymentErrors: PropTypes.string,
  price: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};

export default injectIntl(StripeForm);
