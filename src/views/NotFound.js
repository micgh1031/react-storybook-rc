import React from 'react';
import { Helmet } from 'react-helmet';

import Wrapper from '../components/Layout/Wrapper/Wrapper';
import NotFoundComponent from '../components/NotFound/NotFound';

const NotFound = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>
          Not found | Reforestum
        </title>
      </Helmet>

      <NotFoundComponent />

    </Wrapper>
  );
};

export default NotFound;
