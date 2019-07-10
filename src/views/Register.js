import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import Wrapper from '../components/Layout/Wrapper/Wrapper';
import SignupContainer from '../containers/SignupContainer';
import MobileTopbar from '../components/Header/MobileTopbar/MobileTopbar';

const Register = (props) => {
  return (
    <Wrapper>
      <Helmet>
        <title>
          Register | Reforestum
        </title>
      </Helmet>
      <MobileTopbar>
        <FormattedMessage
          id={'Header.register'}
        />
      </MobileTopbar>
      <SignupContainer {...props} />
    </Wrapper>
  );
};

export default Register;
