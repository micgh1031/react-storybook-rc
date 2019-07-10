import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Box } from 'react-layout-components';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { carbonMessages } from '../../constants/messages';

import Text from '../UI/Text/Text';
import EmptyForestsImg from '../../assets/images/forest-sidebar-empty.png';

import './EmptyCarbon.css';

const EmptyCarbon = ({className, intl}) => (
  <Box column className={cx(className, 'empty-carbon')}>
    <img
      alt={intl.formatMessage(carbonMessages.emptyImageAlt)}
      style={{width: '100%', height: 'auto'}}
      src={EmptyForestsImg}
    />
    <Text color="light" className="empty-carbon__text">

      <FormattedMessage
        id={'EmptyForest.text'}
        defaultMessage={'Looks like you have no Forests'}
      />
    </Text>
  </Box>
);

EmptyCarbon.propTypes = {
  className: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(EmptyCarbon);
