import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import Wrapper from '../components/Layout/Wrapper/Wrapper';
import AccountContainer from '../containers/AccountContainer';
import MobileTopbar from '../components/Header/MobileTopbar/MobileTopbar';

const Account = (props) => {
  return (
    <Wrapper>
      <Helmet>
        <title>
          Account Settings | Reforestum
        </title>
      </Helmet>
      <MobileTopbar>
        <FormattedMessage
          id={'Header.account'}
        />
      </MobileTopbar>
      <AccountContainer {...props} />
    </Wrapper>
  );
};

export default Account;
