import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Text from '../Text/Text';
import Small from '../Text/Small';

import './CheckboxRadio.css';

const CheckboxRadio = ({className, input, label, type, meta}) => (
  <div>
    <label className={cx(className, 'checkbox-radio')}>
      { typeof label === 'function' &&
        <div className="checkbox-radio__component">
          {label()}
        </div>
      }

      <input
        {...input}
        type={type}
        checked={
          type === 'checkbox'
          ? input.value
          : input.checked
        }
      />
      <div
        className={cx(
          'checkbox-radio__element',
          `checkbox-radio__element--${type}`
        )}
      />

      {
        (typeof label === 'string' || typeof label === 'object') &&
        <Text className="checkbox-radio__label">
          {label}
        </Text>
      }
    </label>

    { meta.touched && meta.error &&
      <div>
        <Small color="red">{meta.error}</Small>
      </div>
    }
  </div>
);

CheckboxRadio.propTypes = {
  className: PropTypes.string,
  /** Redux Form handles the input prop */
  input: PropTypes.object.isRequired,
  /** label can be a string or a function that renders JSX */
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  type: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
  meta: PropTypes.object.isRequired,
};

export default CheckboxRadio;
