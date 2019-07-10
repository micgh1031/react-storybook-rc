import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'react-layout-components';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { getCurrentUrlEncoded } from '../../utils/url';

import Row from '../UI/Forms/Row';
import RowAligner from '../UI/Forms/RowAligner';
import HeadingSmall from '../UI/Text/HeadingSmall';
import Text from '../UI/Text/Text';
import IconText from '../UI/Text/IconText';
import GreenCheck from '../UI/Icons/GreenCheck';

const BillingHeader = ({
  billingComplete,
  isAuthenticated,
  toggleBillingPanel,
  location: { pathname, search },
}) => {
  return (
    <Row>
      <RowAligner>
        <Box className="checkout-billing-form__header">
          { billingComplete ?
            <IconText icon={GreenCheck}>
              <HeadingSmall color="green">
                <FormattedMessage
                  id={'BillingHeader.title'}
                  defaultMessage={'1. Billing Information'}
                />
              </HeadingSmall>
            </IconText> :
            <HeadingSmall>
              <FormattedMessage
                id={'BillingHeader.title'}
                defaultMessage={'1. Billing Information'}
              />
            </HeadingSmall>
          }
          { !isAuthenticated && !billingComplete &&
            <Text color="light">
              <FormattedMessage
                id={'BillingHeader.hasAccount'}
                defaultMessage={'Already have an account?'}
              />
              {' '}
              <Link
                to={`/login?next=${getCurrentUrlEncoded(pathname, search)}`}>
                <Text color="green">
                  <FormattedMessage
                    id={'BillingHeader.signIn'}
                    defaultMessage={'Sign in'}
                  />
                </Text>
              </Link>
            </Text>
          }
          { billingComplete &&
            <Text
              color="light"
              className="checkout-billing-form__edit"
              onClick={toggleBillingPanel}>
              <FormattedMessage
                id={'BillingHeader.edit'}
                defaultMessage={'Edit Billing Information'}
              />
            </Text>
          }
        </Box>
      </RowAligner>
    </Row>
  );
};

BillingHeader.propTypes = {
  billingComplete: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  toggleBillingPanel: PropTypes.func.isRequired,
};

export default withRouter(BillingHeader);
