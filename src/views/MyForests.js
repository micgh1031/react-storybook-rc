import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import Wrapper from '../components/Layout/Wrapper/Wrapper';
import MyForestsContainer from '../containers/MyForestsContainer';
import MobileTopbar from '../components/Header/MobileTopbar/MobileTopbar';

const MyForests = (props) => {
  return (
    <Wrapper>
      <Helmet>
        <title>
          My forests | Reforestum
        </title>
      </Helmet>
      <MobileTopbar>
        <FormattedMessage
          id="Header.forests"
        />
      </MobileTopbar>
      <MyForestsContainer {...props} />
    </Wrapper>
  );
};

export default MyForests;
