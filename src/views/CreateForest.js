import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import Wrapper from '../components/Layout/Wrapper/Wrapper';
import CreateForestContainer from '../containers/CreateForestContainer';
import MobileTopbar from '../components/Header/MobileTopbar/MobileTopbar';

const CreateForest = (props) => {
  return (
    <Wrapper>
      <Helmet>
        <title>
          Create Forest | Reforestum
        </title>
      </Helmet>
      <MobileTopbar>
        <FormattedMessage
          id={'Header.create'}
        />
      </MobileTopbar>
      <CreateForestContainer {...props} />
    </Wrapper>
  );
};

export default CreateForest;
