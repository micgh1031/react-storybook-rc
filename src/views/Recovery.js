import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import Wrapper from '../components/Layout/Wrapper/Wrapper';
import RecoveryContainer from '../containers/RecoveryContainer';
import MobileTopbar from '../components/Header/MobileTopbar/MobileTopbar';

const Recovery = (props) => {
  return (
    <Wrapper>
      <Helmet>
        <title>
          Password recovery | Reforestum
        </title>
      </Helmet>
      <MobileTopbar>
        <FormattedMessage
          id={'Login.recoverButton'}
        />
      </MobileTopbar>
      <RecoveryContainer {...props} />
    </Wrapper>
  );
};

export default Recovery;
