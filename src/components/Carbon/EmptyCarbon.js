import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Box } from 'react-layout-components';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { carbonMessages } from '../../constants/messages';

import Text from '../UI/Text/Text';
import EmptySourcesImg from '../../assets/images/carbon-sidebar-empty.png';

import './EmptyCarbon.css';

const EmptyCarbon = ({className, intl, type}) => (
    <Box column className={cx(className, 'empty-carbon')}>
      <img
        alt={intl.formatMessage(carbonMessages.emptyImageAlt)}
        style={{width: '100%', height: 'auto'}}
        src={EmptySourcesImg}
      />
      <Text color="light" className="empty-carbon__text">
        {!type &&
          <FormattedMessage
            id={'EmptyCarbon.text'}
            defaultMessage={'Looks like you have no CO² sources'}
          />
        }
        {type === 'toOffset' &&
          <FormattedMessage
            id={'EmptyCarbon.toOffset'}
            defaultMessage={'You have no sources of this category'}
          />
        }
        {type === 'offset' &&
          <FormattedMessage
            id={'EmptyCarbon.offset'}
            defaultMessage={'You have no sources of this category'}
          />
        }
        {type === 'recurring' &&
          <FormattedMessage
            id={'EmptyCarbon.recurring'}
            defaultMessage={'You have no sources of this category'}
          />
        }
      </Text>
    </Box>
  );

EmptyCarbon.propTypes = {
  className: PropTypes.string,
  intl: intlShape.isRequired,
  type: PropTypes.string,
};

export default injectIntl(EmptyCarbon);
