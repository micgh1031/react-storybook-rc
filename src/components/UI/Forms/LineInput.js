import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { injectIntl, intlShape } from 'react-intl';

import { formMessages } from '../../../constants/messages';
import { requiredIf } from '../../../utils/requiredIf';

import Heading from '../Text/Heading';
import Autocomplete from 'react-autocomplete';

import './LineInput.css';

const LineInput = ({
  breakAfter = false,
  children,
  className,
  color = 'dark',
  disabled = false,
  input,
  intl,
  maxLength,
  meta,
  placeholder,
  textAfter,
  textBefore,
  type = 'text',
  wrapper = Heading,
  items,
  getItemValue,
  handleChange,
  nextId,
  width,
}) => {
  const Component = wrapper;
  return (
    <Component
      className={cx(
        className,
        'line-input',
        `line-input--${color}`,
        { 'line-input--error': meta.touched && meta.error },
        { 'line-input--active': meta.active },
        { 'line-input--break': breakAfter },
        { 'line-input--disabled': disabled }
      )}>

      { textBefore &&
        <span className="line-input__text-before">
          {textBefore}
        </span>
      }

      <div className="line-input__input-holder"
        style={{width: width + 48}}>
        {
          type === 'select' &&
          <select
            {...input}
            className={cx(
              className,
              'line-input__input',
              {'line-input__input--selected': input.value !== ''}
            )}
            >
            <option disabled value="">
              {intl.formatMessage(formMessages.selectDefaultOption)}
            </option>
            {children.map( (option, index) => (
              <option
                key={index}
                {...option.props}>
                {option.props.children}
              </option>
            ))}
          </select>
        }
        {
          type === 'text' &&
          <input
            {...input}
            className="line-input__input"
            disabled={disabled}
            placeholder={placeholder}
            autoComplete="off"
            maxLength={maxLength ? maxLength : 25}
            size={input.value.length ? input.value.length : (maxLength || 25)}
          />
        }

        {
          type === 'typeahead' &&
          <Autocomplete
            {...input}
            className="line-input__input"
            items={items}
            getItemValue={getItemValue}
            inputProps={{
              size: input.value.length ? (input.value.length + 1) : 8,
            }}
            renderItem={
              (item, isHighlighted) => (
                <div
                  style={
                  { color: isHighlighted ? 'var(--orange)' : 'var(--aluminum)' }
                  }
                  key={item.value}>
                  {item.name}
                </div>
              )
            }
            renderMenu={
              (items, value, style) => (
                <div
                style={{  ...style, ...this.menuStyle }}
                className="line-input__typeahead-holder"
                children={items}/>
              )
            }
            shouldItemRender={
              (item, value) => {
                const name = item.name.toLowerCase();
                return name.indexOf(value.toLowerCase()) !== -1;
              }
            }
            onChange={(e) => input.onChange(e.target.value)}
            onSelect={(val, item) => {
              input.onChange(val);
              handleChange((nextId || item.next_step_id), item.final);
            }}
            ref={e => this.autocomplete = e}
          />
        }

        { meta.touched && meta.error &&
          <div className="line-input__error">
            <span color="red">{meta.error}</span>
          </div>
        }
      </div>

      { textAfter &&
        <span className="line-input__text-after">
          {textAfter}
        </span>
      }

    </Component>
  );
};

LineInput.defaultProps = {
  breakAfter: false,
  color: 'dark',
  type: 'text',
  wrapper: Heading
};

LineInput.propTypes = {
  /** Break line after this input */
  breakAfter: PropTypes.bool,
  children: requiredIf( PropTypes.array, props => props.type === 'select'),
  className: PropTypes.string,
  color: PropTypes.oneOf(['dark', 'green', 'orange']),
  disabled: PropTypes.bool,
  maxLength: PropTypes.string,
  /** A React component to wrap every element */
  wrapper: PropTypes.func,
  /** Redux form will provide the input object */
  input: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  /** Redux form's meta object */
  meta: PropTypes.object.isRequired,
  /** Text to be  placed after the input */
  textAfter: PropTypes.string,
  /** Text to be  placed before the input */
  textBefore: PropTypes.string,
  type: PropTypes.oneOf(['text', 'select', 'typeahead']),
  /** Intl shape **/
  intl: intlShape.isRequired,
  /** Typeahead needed only **/
  items: requiredIf( PropTypes.array, props => props.type === 'typeahead'),
  getItemValue: requiredIf( PropTypes.func, props => props.type === 'typeahead'),
  handleChange: requiredIf( PropTypes.func, props => props.type === 'typeahead'),
  nextId: requiredIf( PropTypes.number, props => props.type === 'typeahead'),
  width: PropTypes.number,
};

export default injectIntl(LineInput);
