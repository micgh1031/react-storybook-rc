import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Box } from 'react-layout-components';
import { FormattedNumber, FormattedMessage } from 'react-intl';

import { getFormattedArea } from '../../utils/units';

import Area from '../UI/Icons/Area';
import Budget from '../UI/Icons/Budget';
import Text from '../UI/Text/Text';
import IconText from '../UI/Text/IconText';
import HeadingSmall from '../UI/Text/HeadingSmall';
import Heading from '../UI/Text/Heading';

import './Summary.css';

const Summary = ({ className, area, priceFromServer }) => (
  <div className={cx(className, 'checkout-summary')}>

    <Box className="checkout-summary__item">

      <IconText icon={Area}>
        <Text color="light">
          <FormattedMessage
            id={'Summary.pricePerSqm'}
            defaultMessage={'Price / m²'}
          />
        </Text>
      </IconText>

      <HeadingSmall color="light">
        <FormattedNumber
          value={Number(priceFromServer.price_sqm)}
          style="currency" // eslint-disable-line
          currency="EUR"
          currencyDisplay="symbol"
        />
      </HeadingSmall>
    </Box>

    <Box className="checkout-summary__item">

      <IconText icon={Area}>
        <Text color="light">
          <FormattedMessage
            id={'Summary.totalArea'}
            defaultMessage={'Total area'}
          />
        </Text>
      </IconText>

      <HeadingSmall color="light">
        <FormattedNumber
          value={getFormattedArea(area).value}
        /> {getFormattedArea(area).unit}
      </HeadingSmall>
    </Box>

    <Box className="checkout-summary__item">

      <IconText icon={Budget}>
        <Text color="light">
          <FormattedMessage
            id={'Summary.netAmount'}
            defaultMessage={'Net Amount'}
          />
        </Text>
      </IconText>

      <Heading>
        <FormattedNumber
          value={priceFromServer.net_amount}
          style="currency" // eslint-disable-line
          currency="EUR"
          currencyDisplay="symbol"
        />
      </Heading>
    </Box>

    { priceFromServer.taxes_percentage > 0 &&
      <Box className="checkout-summary__item">

        <IconText icon={Budget}>
          <Text color="light">
            <FormattedMessage
              id={'Summary.TaxRate'}
              defaultMessage={'Tax Rate'}
            />
          </Text>
        </IconText>

        <Heading>
          <FormattedNumber
            value={priceFromServer.taxes_percentage}
          />&#37;
        </Heading>
      </Box>
    }

    { priceFromServer.taxes_amount > 0 &&
      <Box className="checkout-summary__item">

        <IconText icon={Budget}>
          <Text color="light">
            <FormattedMessage
              id={'Summary.taxesAmount'}
              defaultMessage={'Taxes'}
            />
          </Text>
        </IconText>

        <Heading>
          <FormattedNumber
            value={priceFromServer.taxes_amount}
            style="currency" // eslint-disable-line
            currency="EUR"
            currencyDisplay="symbol"
          />
        </Heading>
      </Box>
    }

    <Box className="checkout-summary__item">

      <IconText icon={Budget}>
        <Text color="light">
          <FormattedMessage
            id={'Summary.paymentFees'}
            defaultMessage={'Payment Fees'}
          />
        </Text>
      </IconText>

      <Heading>
        <FormattedNumber
          value={priceFromServer.payment_fees}
          style="currency" // eslint-disable-line
          currency="EUR"
          currencyDisplay="symbol"
        />
      </Heading>
    </Box>

    <Box className="checkout-summary__item">

      <IconText icon={Budget}>
        <Text color="light">
          <FormattedMessage
            id={'Summary.totalPrice'}
            defaultMessage={'Total price'}
          />
        </Text>
      </IconText>

      <Heading>
        <FormattedNumber
          value={priceFromServer.total_amount}
          style="currency" // eslint-disable-line
          currency="EUR"
          currencyDisplay="symbol"
        />
      </Heading>
    </Box>

  </div>
);

Summary.propTypes = {
  area: PropTypes.number.isRequired,
  className: PropTypes.string,
  priceFromServer: PropTypes.object.isRequired,
};

export default Summary;
