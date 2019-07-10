import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'react-layout-components';
import { FormattedMessage } from 'react-intl';

import HeadingSmall from '../Text/HeadingSmall';
import IconText from '../Text/IconText';
import Text from '../Text/Text';
import Small from '../Text/Small';
import Retry from '../Icons/Retry';

import './FullErrorFetching.css';

const FullErrorFetching = ({ errorMessage, retry }) => (
  <Box fit center className="full-error-fetching">
    <Box fit center className="full-error-fetching__wrapper">
      <Box column center className="full-error-fetching__inner">
        <HeadingSmall color="orange" className="full-error-fetching__title">
          <FormattedMessage
            id={'FullErrorFetching.message'}
            defaultMessage={'Error'}
          />
        </HeadingSmall>
        <Text className="full-error-fetching__message">
          {errorMessage}
        </Text>
        { retry &&
          <div onClick={retry} className="full-error-fetching__retry">
            <IconText icon={Retry}>
              <Small color="orange">
                <FormattedMessage
                  id={'FullErrorFetching.retry'}
                  defaultMessage={'Retry'}
                />
              </Small>
            </IconText>
          </div>
        }
      </Box>
    </Box>
  </Box>
);


FullErrorFetching.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  retry: PropTypes.func,
};

export default FullErrorFetching;
