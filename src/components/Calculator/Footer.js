import React from 'react';
import PropTypes from 'prop-types';
import FrequencyForm from './FrequencyForm';
import Total from './Total';

import Bottom from '../Layout/Container/Bottom';

const Footer = ({
  calcErrorMessages,
  calculatedCarbon,
  change,
  formSubmit,
  formValues,
  handleSubmit,
  isAdding,
  isCalculating,
  isFetching,
  stepErrorMessages,
  valid,
}) => (
  <Bottom className="carbon-calculator__footer">
    <FrequencyForm change={change} />
    <Total
      calcErrorMessages={calcErrorMessages}
      calculatedCarbon={calculatedCarbon}
      formSubmit={formSubmit}
      frequency={formValues && formValues['field_frequency']}
      handleSubmit={handleSubmit}
      isAdding={isAdding}
      isCalculating={isCalculating}
      isFetching={isFetching}
      stepErrorMessages={stepErrorMessages}
      valid={valid}
    />
  </Bottom>
);

Footer.propTypes = {
  calcErrorMessages: PropTypes.string,
  calculatedCarbon: PropTypes.number,
  change: PropTypes.func.isRequired,
  formSubmit: PropTypes.func.isRequired,
  formValues: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  isAdding: PropTypes.bool.isRequired,
  isCalculating: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  stepErrorMessages: PropTypes.string,
  valid: PropTypes.bool.isRequired,
};

export default Footer;
