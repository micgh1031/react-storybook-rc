import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import Wrapper from '../components/Layout/Wrapper/Wrapper';
import DashboardContainer from '../containers/DashboardContainer';
import MobileTopbar from '../components/Header/MobileTopbar/MobileTopbar';

const Dashboard = (props) => {
  return (
    <Wrapper>
      <Helmet>
        <title>
          Dashboard | Reforestum
        </title>
      </Helmet>
      <MobileTopbar>
        <FormattedMessage
          id={'Header.dashboard'}
        />
      </MobileTopbar>
      <DashboardContainer {...props} />
    </Wrapper>
  );
};

export default Dashboard;
