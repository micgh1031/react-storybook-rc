import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Box } from 'react-layout-components';
import {
  injectIntl,
  intlShape,
  FormattedNumber,
  FormattedMessage
} from 'react-intl';

import { carbonMessages } from '../../constants/messages';

import { getFormattedWeight } from '../../utils/units';

import Uppercase from '../UI/Text/Uppercase';
import Text from '../UI/Text/Text';
import Button from '../UI/Button/Button';
import DisabledButton from '../UI/Button/DisabledButton';

const Total = ({
  calcErrorMessages,
  calculatedCarbon,
  className,
  formSubmit,
  frequency,
  handleSubmit,
  isAdding,
  isCalculating,
  isFetching,
  stepErrorMessages,
  valid,
  intl,
}) => {
  const renderFrequencyValue = (frequency, intl) => {
    switch (frequency) {
      case '0':
        return intl.formatMessage(carbonMessages.freqFormTotal);
      case '1':
        return intl.formatMessage(carbonMessages.freqFormDaily);
      case '2':
        return intl.formatMessage(carbonMessages.freqFormWeekly);
      case '3':
        return intl.formatMessage(carbonMessages.freqFormMonthly);
      default:
        return;
    }
  };

  return (
    <Box className={cx(className, 'carbon-calc-total')}>
      <Box column style={{ opacity: isCalculating ? 0.5 : 1 }}>
        <Uppercase
          color="light">
          <FormattedMessage
            id={'CalculatorTotal.title'}
            defaultMessage={'Total CO²'}
          />
        </Uppercase>

        { calcErrorMessages ?
          <Box>
            <Text color="red">{calcErrorMessages}</Text>
          </Box>
        :
          <Box className="carbon-calc-total__button">
            <Text color="orange">
              { calculatedCarbon ?
                <div>
                  <FormattedNumber
                    value={getFormattedWeight(calculatedCarbon).value}
                  /> {getFormattedWeight(calculatedCarbon).unit}
                </div>
                :
                <FormattedMessage
                  id={'CalculatorTotal.notAvailable'}
                  defaultMessage={'n/a'}
                />
              }
            </Text>
            { calculatedCarbon > 0 &&
              <Text color="light">
              &nbsp;/&nbsp;{ renderFrequencyValue(frequency, intl) }
              </Text>
            }
          </Box>
        }
      </Box>

      { valid &&
        !stepErrorMessages &&
        !isFetching &&
        !isCalculating &&
        !calcErrorMessages &&
        calculatedCarbon > 0 ?
        <Button loading={isAdding} onClick={handleSubmit(formSubmit)}>
          <FormattedMessage
            id={'CalculatorTotal.addSource'}
            defaultMessage={'Add source'}
          />
        </Button>
        :
        <DisabledButton>
          <FormattedMessage
            id={'CalculatorTotal.addSource'}
            defaultMessage={'Add source'}
          />
        </DisabledButton>
      }
    </Box>
  );
};

Total.propTypes = {
  calcErrorMessages: PropTypes.string,
  calculatedCarbon: PropTypes.number,
  className: PropTypes.string,
  formSubmit: PropTypes.func.isRequired,
  frequency: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isAdding: PropTypes.bool.isRequired,
  isCalculating: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  stepErrorMessages: PropTypes.string,
  valid: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(Total);
