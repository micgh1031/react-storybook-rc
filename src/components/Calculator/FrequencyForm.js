import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Field } from 'redux-form';
import { Box } from 'react-layout-components';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { carbonMessages } from '../../constants/messages';

import Uppercase from '../UI/Text/Uppercase';
import Radio from '../UI/Forms/Radio';

const FrequencyForm = ({className, intl}) => (
  <div className={cx(className, 'carbon-freq-form')}>
    <div className="carbon-freq-form__title">
      <Uppercase color="light">
        <FormattedMessage
          id={'FrequencyForm.recurring'}
          defaultMessage={'Is this a recurring event?'}
        />
      </Uppercase>
    </div>
    <Box className="carbon-freq-form__form">
      <Box>
        {/* 0, no recurrency */}
        <Field
          className="carbon-freq-form__item"
          name="field_frequency"
          value="0"
          type="radio"
          component={Radio}
          label={intl.formatMessage(carbonMessages.freqFormNone)}
        />
      </Box>
      <Box>
        {/* 1, daily */}
        <Field
          className="carbon-freq-form__item"
          name="field_frequency"
          value="1"
          type="radio"
          component={Radio}
          label={intl.formatMessage(carbonMessages.freqFormDaily)}
        />
      </Box>
      <Box>
        {/* 2, weekly */}
        <Field
          className="carbon-freq-form__item"
          name="field_frequency"
          value="2"
          type="radio"
          component={Radio}
          label={intl.formatMessage(carbonMessages.freqFormWeekly)}
        />
      </Box>
      <Box>
        {/* 3, monthly */}
        <Field
          className="carbon-freq-form__item"
          name="field_frequency"
          value="3"
          type="radio"
          component={Radio}
          label={intl.formatMessage(carbonMessages.freqFormMonthly)}
        />
      </Box>
    </Box>
  </div>
);

FrequencyForm.propTypes = {
  className: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(FrequencyForm);
