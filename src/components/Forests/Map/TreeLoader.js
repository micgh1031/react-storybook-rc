import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Box } from 'react-layout-components';

import Small from '../../UI/Text/Small';
import Loader from '../../UI/Loader/Loader';

import './TreeLoader.css';

const TreeLoader = () => {
  return (
    <Box alignItems="center" className="tree-loader">
      <Loader />
      <Small color="white" className="tree-loader__text">
        <FormattedMessage
          id={'TreeLoader.loadingTrees'}
          defaultMessage={'Loading trees...'}
        />
      </Small>
    </Box>
  );
};

export default TreeLoader;
