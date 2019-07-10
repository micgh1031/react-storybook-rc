import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Box } from 'react-layout-components';
import { FormattedMessage } from 'react-intl';

import Heading from '../../UI/Text/Heading';
import Text from '../../UI/Text/Text';
import ButtonLink from '../../UI/Button/ButtonLink';

import './ForestHeader.css';

const ForestHeader = ({ className, location, name, available }) => (
  <Box
    className={cx(className, 'forest-detail-header')}
    alignItems="center"
    justifyContent="space-between">
    <Box column>
      <Heading className="forest-detail-header__name">
        {name}
      </Heading>
      <Text color="light">
        {location}
      </Text>
    </Box>

    { available &&
      (document.location.pathname.split('/')[1] !== 'create-forest') &&
      <ButtonLink to="/create-forest/">
        <FormattedMessage
          id={'ForestDetails.enlargeForest'}
          defaultMessage={'Enlarge Forest'}
        />
      </ButtonLink>
    }
  </Box>
);

ForestHeader.propTypes = {
  available: PropTypes.bool.isRequired,
  className: PropTypes.string,
  location: PropTypes.string.isRequired,
  name: PropTypes.string,
};

export default ForestHeader;
