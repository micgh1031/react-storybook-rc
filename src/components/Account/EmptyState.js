import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'react-layout-components';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { invoiceMessages } from '../../constants/messages';

import Text from '../UI/Text/Text';
import ButtonLink from '../UI/Button/ButtonLink';

import EmptyInvoicesImg from '../../assets/images/invoice.png';

const EmptyState = ({intl, type}) => (
  <Box column center className="empty-state">
    <img
      alt={intl.formatMessage(invoiceMessages.emptyImageAlt)}
      src={EmptyInvoicesImg}
    />
    <Box className="empty-state__text">
      { type === 'invoices' &&
        <Text color="light" className="empty-carbon__text">
          <FormattedMessage
            id={'EmptyInvoices.text'}
            defaultMessage={'Looks like you have no invoices yet. Enlarge a forest to get them here!'}
          />
        </Text>
      }
      { type === 'certificates' &&
        <Text color="light" className="empty-carbon__text">
          <FormattedMessage
            id={'EmptyCertificates.text'}
            defaultMessage={'Looks like you have no certificates yet. Enlarge a forest to get them here!'}
          />
        </Text>
      }
    </Box>

    <ButtonLink big to="/create-forest">
      <FormattedMessage
        id={'EmptyInvoices.cta'}
        defaultMessage={'Enlarge a forest'}
      />
    </ButtonLink>
  </Box>
);

EmptyState.defaultProps = {
  type: 'invoices',
};

EmptyState.propTypes = {
  intl: intlShape.isRequired,
  type: PropTypes.string,
};

export default injectIntl(EmptyState);
