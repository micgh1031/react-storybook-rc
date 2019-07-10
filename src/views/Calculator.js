import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import Wrapper from '../components/Layout/Wrapper/Wrapper';
import CalcContainer from '../containers/CalcContainer';
import MobileTopbar from '../components/Header/MobileTopbar/MobileTopbar';

const Calculator = (props) => {
  return (
    <Wrapper>
      <Helmet>
        <title>
          CO&#x2082; Sources | Reforestum
        </title>
      </Helmet>
      <MobileTopbar>
        <FormattedMessage
          id={'Header.sources'}
        />
      </MobileTopbar>
      <CalcContainer {...props} />
    </Wrapper>
  );
};

export default Calculator;
