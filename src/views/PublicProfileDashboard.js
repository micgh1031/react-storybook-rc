import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import Wrapper from '../components/Layout/Wrapper/Wrapper';
import PublicDashboardContainer from '../containers/PublicDashboardContainer';
import MobileTopbar from '../components/Header/MobileTopbar/MobileTopbar';

const PublicProfileDashboard = (props) => {
  return (
    <Wrapper>
      <Helmet>
        <title>
          Public Profile Dashboard | Reforestum
        </title>
      </Helmet>
      <MobileTopbar>
        <FormattedMessage
          id={'Header.dashboard'}
        />
      </MobileTopbar>
      <PublicDashboardContainer {...props} />
    </Wrapper>
  );
};

export default PublicProfileDashboard;
