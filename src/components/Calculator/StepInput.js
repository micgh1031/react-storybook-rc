import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Field } from 'redux-form';
import { injectIntl, intlShape } from 'react-intl';

import { required, numberNormalizer } from '../../utils/formHelpers';
import { withIntl } from '../../utils/intl';

import { hideSidebar, showSidebar } from '../../constants/customEvents';
import LineInput from '../UI/Forms/LineInput';

const StepInput = ({
  className,
  handleChange,
  intl,
  input,
  step,
}) => {
  return (
  <Field
    className={cx(className, 'carbon-calc-step')}
    name={`field_${step.id}`}
    component={LineInput}
    type="text"
    color="orange"
    placeholder={input.placeholder}
    textBefore={step.pretext}
    textAfter={step.postext}
    breakAfter={step.breakAfter || step.final}
    onChange={() => { handleChange((input.next_step_id || step.next_step_id)); }}
    validate={withIntl(intl, required)}
    maxLength={step.data_type && step.data_type === 2 ? '7' : '20'}
    normalize={step.data_type && step.data_type === 2 && numberNormalizer}
    onFocus={() => dispatchEvent(hideSidebar)}
    onBlur={() => dispatchEvent(showSidebar)}
  />
  );
};

StepInput.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  intl: intlShape,
  input: PropTypes.object.isRequired,
  step: PropTypes.object.isRequired,
  value: PropTypes.string,
};

export default injectIntl(StepInput);
