import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import Wrapper from '../components/Layout/Wrapper/Wrapper';
import LoginContainer from '../containers/LoginContainer';
import MobileTopbar from '../components/Header/MobileTopbar/MobileTopbar';

const Login = (props) => {
  return (
    <Wrapper>
      <Helmet>
        <title>
          Login | Reforestum
        </title>
      </Helmet>
      <MobileTopbar>
        <FormattedMessage
          id={'Login.loginButton'}
        />
      </MobileTopbar>
      <LoginContainer {...props} />
    </Wrapper>
  );
};

export default Login;
