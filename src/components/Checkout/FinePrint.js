import React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import stripeImg from '../../assets/images/checkout/stripe.png';
import visaImg from '../../assets/images/checkout/visa.png';
import mastercardImg from '../../assets/images/checkout/mastercard.png';
import americanexpressImg from '../../assets/images/checkout/americanexpress.png';


import Small from '../UI/Text/Small';

import './FinePrint.css';

const FinePrint = ({intl}) => {
  return (
    <div className="checkout-fineprint">
      <Small color="light" className="checkout-fineprint__text">

        <FormattedMessage
          id={'FinePrint.processedVia'}
          defaultMessage={'All payments processed via'}
        />{' '}
         <a
          href="https://stripe.com/"
          target="_blank"
          rel="noopener noreferrer">
          Stripe.
        </a>
        <br/>

        <FormattedMessage
          id={'FinePrint.noCreditCardStore'}
          defaultMessage={"Reforestum never stores your credit card details."}
        />
        <br/>


        <FormattedMessage
          id={'FinePrint.moreInfo'}
          defaultMessage={"For more information read our"}
        />{' '}
        <a
          href={intl.formatMessage({id: 'localizedLink.tos'})}
          target="_blank"
          rel="noopener noreferrer">
          <FormattedMessage
            id={'FinePrint.allPaymentsProcessed'}
            defaultMessage={"terms of service."}
          />
        </a>
      </Small>
      <div className="checkout-fineprint__logos">
        <img
          className="checkout-fineprint__stripe"
          src={stripeImg}
          alt="Powered by stripe"
        />
        <img
          className="checkout-fineprint__card"
          src={visaImg}
          alt="Visa"
        />
        <img
          className="checkout-fineprint__card"
          src={mastercardImg}
          alt="Mastercard"
        />
        <img
          className="checkout-fineprint__card"
          src={americanexpressImg}
          alt="American Express"
        />
      </div>
    </div>
  );
};

FinePrint.propTypes = {
  intl: intlShape,
};

export default injectIntl(FinePrint);
