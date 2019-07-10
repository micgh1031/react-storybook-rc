import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Box } from 'react-layout-components';
import { FormattedMessage } from 'react-intl';

import IconText from '../Text/IconText';
import Small from '../Text/Small';
import Retry from '../Icons/Retry';

import './ErrorFetching.css';

const ErrorFetching = ({ className, retry }) => (
  <Box
    justifyContent="space-between"
    className={cx(className, 'error-fetching')}>

    <Small className="error-fetching__text">
      <FormattedMessage
        id={'ErrorFetching.message'}
        defaultMessage={'Error fetching data'}
      />
    </Small>

    <div className="error-fetching__retry" onClick={retry}>
      <IconText icon={Retry}>
        <Small color="orange">
          <FormattedMessage
            id={'ErrorFetching.retry'}
            defaultMessage={'Retry'}
          />
        </Small>
      </IconText>
    </div>
  </Box>
);

ErrorFetching.propTypes = {
  className: PropTypes.string,
  retry: PropTypes.func.isRequired,
};

export default ErrorFetching;
