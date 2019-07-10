import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Field } from 'redux-form';
import { injectIntl, intlShape } from 'react-intl';

import { required } from '../../utils/formHelpers';
import { withIntl } from '../../utils/intl';

import LineInput from '../UI/Forms/LineInput';

const StepSelect = ({
  className,
  handleChange,
  intl,
  options,
  step,
}) => {
  return (
  <Field
    className={cx(className, 'carbon-calc-step')}
    name={`field_${step.id}`}
    component={LineInput}
    type="typeahead"
    color="orange"
    textBefore={step.pretext}
    textAfter={step.postext}
    breakAfter={step.breakAfter || step.final}
    validate={withIntl(intl, required)}
    handleChange={handleChange}
    items={options}
    getItemValue={(option) => option.name}
    nextId={step.next_step_id}
  />
  );
};

StepSelect.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  intl: intlShape,
  options: PropTypes.array.isRequired,
  step: PropTypes.object.isRequired,
};

export default injectIntl(StepSelect);
