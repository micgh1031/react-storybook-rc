import React from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber, FormattedMessage } from 'react-intl';

import { getFormattedArea } from '../../utils/units';

import Heading from '../UI/Text/Heading';
import Text from '../UI/Text/Text';

const SummaryText = ({ area, className, forestName, forestLocation }) => (
  <Heading className={className}>
    <FormattedMessage
    id={'puchase.purchaseInfoHeader'}
    defaultMessage={'You are now purchasing {areaString} of carbon offsetting rights at our forest {forestNameString} located at {forestLocationString}'}
    values={{
        areaString: <Text color="green" tag="span">
                      <FormattedNumber
                        value={getFormattedArea(area).value}
                      /> {getFormattedArea(area).unit}
                    </Text>,
        forestNameString: <Text color="green" tag="span">
                          {forestName}
                          </Text>,
        forestLocationString: <Text color="green" tag="span">
                              {forestLocation}
                              </Text>
    }}
    />
  </Heading>
);

SummaryText.propTypes = {
  area: PropTypes.number.isRequired,
  className: PropTypes.string,
  forestLocation: PropTypes.string.isRequired,
  forestName: PropTypes.string.isRequired,
};

export default SummaryText;
