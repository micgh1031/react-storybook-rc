import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { requiredIf } from '../../../utils/requiredIf';

import Small from '../Text/Small';

import './Input.css';

const Input = (props) => {
  const {
    action,
    className,
    children,
    disabled = false,
    input,
    label,
    meta,
    placeholder,
    type = 'text'
  } = props;

  return (
    <div
      className={
      cx(
        className,
        { 'input-holder--error': meta.touched && meta.error },
        { 'input-holder--disabled': disabled }
      )}
      onClick={() => { this[input.name].focus(); }}>

      <div className="main-input">

        { label &&
          <div className="main-input__header">
            <Small
              tag="label"
              className="main-input__label">
              {label}
            </Small>

            { action &&
              <Small
                tag="span"
                className="main-input__action"
                onClick={action.action}>
                {action.label}
              </Small>
            }

          </div>
        }

        {
          type === 'select' ?
          <select
            {...input}
            className="main-input__input"
            disabled={disabled}
            ref={node => this[input.name] = node}>
            {children.map( (option, index) => (
              <option
                key={index}
                {...option.props}
                value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          :
          <input
            {...input}
            className="main-input__input"
            placeholder={placeholder}
            type={type}
            disabled={disabled}
            ref={node => this[input.name] = node}
          />
        }

        <div className="main-input__box" />

      </div>

      { meta.touched && meta.error &&
        <div className="main-input__error">
          <Small color="red">{meta.error}</Small>
        </div>
      }

    </div>
  );
};

Input.defaultProps = {
  disabled: false,
  type: 'text'
};

Input.propTypes = {
  /** Label required to use */
  action: PropTypes.shape({
    label: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
  }),
  className: PropTypes.string,
  /** If this is a select, we need the children props */
  children: requiredIf( PropTypes.array, props => props.type === 'select'),
  disabled: PropTypes.bool,
  /** Will be provided by redux-form */
  input: PropTypes.object.isRequired,
  /** Label is required if there's an action */
  label: requiredIf( PropTypes.string, props => props.action),
  /** Will be provided by redux-form */
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default Input;
