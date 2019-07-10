import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import Wrapper from '../components/Layout/Wrapper/Wrapper';
import KSSignupContainer from '../containers/KSSignupContainer';
import MobileTopbar from '../components/Header/MobileTopbar/MobileTopbar';

const KSRegister = (props) => {
  return (
    <Wrapper>
      <Helmet>
        <title>
          Register | Reforestum
        </title>
      </Helmet>
      <MobileTopbar>
        <FormattedMessage
          id={'Header.KSRegister'}
          defaultMessage={'Backer Registration'}
        />
      </MobileTopbar>
      <KSSignupContainer {...props} />
    </Wrapper>
  );
};

export default KSRegister;
