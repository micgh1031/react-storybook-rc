import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Box } from 'react-layout-components';
import { FormattedNumber, injectIntl, intlShape } from 'react-intl';

import Text from '../UI/Text/Text';
import Small from '../UI/Text/Small';
import IconText from '../UI/Text/IconText';
import OrangeRain from '../UI/Icons/OrangeRain';
import Frequency from '../UI/Icons/Frequency';
import More from '../UI/Icons/More';
import CarbonItemPopover from './CarbonItemPopover';

import { getFormattedWeight } from '../../utils/units';
import { carbonMessages } from '../../constants/messages';

import carbonIcons from '../../constants/carbonIcons';
import './CarbonItem.css';

const CarbonItem = ({
  className,
  currentlySelected,
  deleteItem,
  frequency,
  id,
  image,
  name,
  selectItem,
  updateFrequency,
  value,
  intl,
}) => (
  <Box
    justifyContent="space-between"
    alignItems="center"
    className={cx(className, 'carbon-item')}
    onMouseLeave={() => { selectItem(null); }}>

    <Box center>
      <div
        className="carbon-item__image"
        style={{
          backgroundImage: `url(${carbonIcons[image]})`
        }}
      />

      <Box column className="carbon-item__content">

        <Text tag="h3" className="carbon-item__text">
          {name}
        </Text>

        <Box className="carbon-item__info">
          <IconText icon={OrangeRain} className="carbon-item__carbon">
            <Small color="orange">
              <FormattedNumber
                value={getFormattedWeight(value).value}
              /> {getFormattedWeight(value).unit}
            </Small>
          </IconText>
          {
            frequency !== 0 &&
            <IconText icon={Frequency} className="carbon-item__frequency">
              <Small color="light">
                {frequency === 1 && intl.formatMessage({
                  id: carbonMessages.freqFormDaily.id,
                  defaultMessage: carbonMessages.freqFormDaily.defaultMessage
                })
                }
                {frequency === 2 && intl.formatMessage({
                  id: carbonMessages.freqFormWeekly.id,
                  defaultMessage: carbonMessages.freqFormWeekly.defaultMessage
                })
                }
                {frequency === 3 && intl.formatMessage({
                  id: carbonMessages.freqFormMonthly.id,
                  defaultMessage: carbonMessages.freqFormMonthly.defaultMessage
                })
                }
              </Small>
            </IconText>
          }
        </Box>
      </Box>
    </Box>

    <Box
      center
      className="carbon-item__options"
      onClick={() => { selectItem(currentlySelected === id ? null : id); }}>
      <More />
      {
        currentlySelected === id &&
        <CarbonItemPopover
          className="carbon-item__popover"
          id={id}
          deleteItem={deleteItem}
          frequency={frequency}
          updateFrequency={updateFrequency}
        />
      }
    </Box>
  </Box>
);

CarbonItem.propTypes = {
  className: PropTypes.string,
  currentlySelected: PropTypes.number,
  deleteItem: PropTypes.func.isRequired,
  frequency: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  selectItem: PropTypes.func.isRequired,
  updateFrequency: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  intl: intlShape
};

export default injectIntl(CarbonItem);
