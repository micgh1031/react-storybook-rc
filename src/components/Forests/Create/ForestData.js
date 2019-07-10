import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Box } from 'react-layout-components';
import { FormattedNumber, FormattedMessage } from 'react-intl';

import { getFormattedWeight, getFormattedArea } from '../../../utils/units';

import Text from '../../UI/Text/Text';
import Uppercase from '../../UI/Text/Uppercase';

import './ForestData.css';

const ForestData = ({ className, data }) => {
  return (
    <Box className={cx(className, 'forest-checkout-data')}>
      {data.price !== null &&
        <Box column className="forest-checkout-data__item">
          <Uppercase color="light">
            <FormattedMessage
              id={'ForestData.price'}
              defaultMessage={'Price'}
            />
          </Uppercase>
          <Text>
            {
              data.price > 0 ?
              <FormattedNumber
                value={Number(data.price)}
                style="currency" // eslint-disable-line
                currency="EUR"
                currencyDisplay="symbol"
              />
              :
              '---'
            }
          </Text>
        </Box>
      }


      <Box column className="forest-checkout-data__item">
        <Uppercase color="light">
          <FormattedMessage
            id={'ForestData.area'}
            defaultMessage={'Area'}
          />
        </Uppercase>
        <Text>
          {
            (data.price > 0 || data.price === null) ?
            <span>
              <FormattedNumber
                value={getFormattedArea(data.area).value.toFixed(2)}
              /> {getFormattedArea(data.area).unit}
            </span>
            :
            '---'
          }
        </Text>
      </Box>

      <Box column className="forest-checkout-data__item">
        <Uppercase color="light">
          <FormattedMessage
            id={'ForestData.carbon'}
            defaultMessage={'Carbon'}
          />
        </Uppercase>
        <Text>
          {
            (data.price > 0 || data.price === null) ?
            <span>
              <FormattedNumber
                value={getFormattedWeight(data.carbon).value}
              /> {getFormattedWeight(data.carbon).unit}
            </span>
            :
            '---'
          }
        </Text>
      </Box>
    </Box>
  );
};

ForestData.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    price: PropTypes.number,
    area: PropTypes.number,
    carbon: PropTypes.number,
  }).isRequired,
};

export default ForestData;
