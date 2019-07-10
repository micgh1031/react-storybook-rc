import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'react-layout-components';

import HeadingSmall from '../../UI/Text/HeadingSmall';

import './FilterInput.css';

const FilterInput = ({ value, onChange, label, unit, disabled = 'false' }) => {
  return (
    <Box className="create-forest-input">
      <HeadingSmall className="create-forest-input__label">
        {label}
      </HeadingSmall>

      <Box className="create-forest-input__form">
        <HeadingSmall>
          <input
            disabled={disabled}
            type="number"
            placeholder="0"
            value={value && value > 0 ? value : ''}
            onChange={onChange}
            className="create-forest-input__input"
          />
        </HeadingSmall>

        <HeadingSmall>
          {unit}
        </HeadingSmall>
      </Box>
    </Box>
  );
};

FilterInput.defaultProps = {
  disabled: false
};

FilterInput.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
};

export default FilterInput;
