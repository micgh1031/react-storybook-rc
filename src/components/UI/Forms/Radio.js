import React from 'react';
import PropTypes from 'prop-types';

import CheckboxRadio from './CheckboxRadio';

const Radio = props => (
  <CheckboxRadio {...props} type="radio" />
);

Radio.propTypes = {
  /** label can be a string or a function that renders JSX */
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]).isRequired,
  /** It is required to specify 'radio' as type on redux form Fields */
  type: PropTypes.oneOf(['radio']).isRequired
};

export default Radio;
