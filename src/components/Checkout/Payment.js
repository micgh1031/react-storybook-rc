import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Row from '../UI/Forms/Row';
import RowAligner from '../UI/Forms/RowAligner';
import HeadingSmall from '../UI/Text/HeadingSmall';
import StripeForm from './StripeForm';
import FinePrint from './FinePrint';

import './Payment.css';

class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formHeight: 0,
    };
  }

  componentDidMount() {
    this.updateFormHeight();
  }

  componentDidUpdate() {
    this.updateFormHeight();
  }

  updateFormHeight() {
    if (this.state.formHeight !== this.form.clientHeight) {
      this.setState({
        formHeight: this.form.clientHeight
      });
    }
  }

  render() {
    const {
      area,
      billingComplete,
      forestId,
      forestName,
      price,
      user,

      isPaying,
      paymentErrors,
      makePayment,
    } = this.props;

    return (
      <div className="checkout-payment-form">
        <Row>
          <RowAligner>
            <div>
              <HeadingSmall color={billingComplete ? 'dark' : 'light'}>
                <FormattedMessage
                  id={'Payment.title'}
                  defaultMessage={'2. Payment Information'}
                />
              </HeadingSmall>
            </div>
          </RowAligner>
        </Row>

        <div
          className="checkout-payment-form__form-wrapper"
          style={{
            maxHeight: billingComplete ? this.state.formHeight : 0
          }}>

            <div
              className="checkout-payment-form__form"
              ref={form => this.form = form}>

              <StripeForm
                area={area}
                forestId={forestId}
                forestName={forestName}
                isPaying={isPaying}
                makePayment={makePayment}
                paymentErrors={paymentErrors}
                price={price}
                user={user}
              />

              <FinePrint />

            </div>

        </div>

      </div>
    );
  }
}

Payment.propTypes = {
  area: PropTypes.number.isRequired,
  billingComplete: PropTypes.bool.isRequired,
  forestId: PropTypes.number.isRequired,
  forestName: PropTypes.string.isRequired,
  isPaying: PropTypes.bool.isRequired,
  makePayment: PropTypes.func.isRequired,
  paymentErrors: PropTypes.string,
  price: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};

export default Payment;
