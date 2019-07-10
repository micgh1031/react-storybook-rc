import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import Wrapper from '../components/Layout/Wrapper/Wrapper';
import CheckoutContainer from '../containers/CheckoutContainer';
import MobileTopbar from '../components/Header/MobileTopbar/MobileTopbar';

const Checkout = (props) => {
  return (
    <Wrapper>
      <Helmet>
        <title>
          Checkout | Reforestum
        </title>
      </Helmet>
      <MobileTopbar>
        <FormattedMessage
          id={'Header.checkout'}
          defaultMessage={'Checkout'}
        />
      </MobileTopbar>
      <CheckoutContainer {...props} />
    </Wrapper>
  );
};

export default Checkout;
