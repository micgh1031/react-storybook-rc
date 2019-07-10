import React from 'react';
import PropTypes from 'prop-types';

import CheckboxRadio from './CheckboxRadio';

const Checkbox = props => (
  <CheckboxRadio {...props} type="checkbox" />
);

Checkbox.propTypes = {
  /** label can be a string or a function that renders JSX */
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]).isRequired
};

export default Checkbox;
