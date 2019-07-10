import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { requiredIf } from '../../../utils/requiredIf';

import Autocomplete from 'react-autocomplete';
import Small from '../Text/Small';

import { typeaheadStyles } from './typeaheadStyles';
import './Input.css';

class Typeahead extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeaheadStyles,
      isInputOnFocus: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.matchTerms = this.matchTerms.bind(this);
    this.sortItems = this.sortItems.bind(this);
    this.inputIsInFocus = this.inputIsInFocus.bind(this);
    this.inputIsInBlur = this.inputIsInBlur.bind(this);

  }

  handleChange(event) {
   this.props.input.onChange(event.target.value);
  }

  handleSelect(val) {
   this.props.input.onChange(val);
  }

  /*
  We can't rely on backend to send the countries alphabetically
  sorted for easier human readability. This method makes sure everything is
  nicely ordered.
  */
  sortItems(a, b, value) {
    const aLower = a.country_name.toLowerCase();
    const bLower = b.country_name.toLowerCase();
    const valueLower = value.toLowerCase();
    const queryPosA = aLower.indexOf(valueLower);
    const queryPosB = bLower.indexOf(valueLower);
    if (queryPosA !== queryPosB) {
      return queryPosA - queryPosB;
    }
    return aLower < bLower ? -1 : 1;
  }

  matchTerms(item, value) {
    return item.country_name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
  }

  inputIsInFocus(){
    this.setState((state) => state.isInputOnFocus = true);
  }

  inputIsInBlur(){
    this.setState((state) => state.isInputOnFocus = false);
  }

  render() {
    const {
      action,
      label,
      items,
      getItemValue,
      className,
      meta,
      input,
      disabled,
      placeholder,
    } = this.props;

    return (
      <div
        className={
        cx(
          className,
          { 'input-holder--error': meta.touched && meta.error },
          { 'input-holder--disabled': disabled }
        )}
        onClick={() => this.autocomplete.focus()}>

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

            <Autocomplete
              {...input}
              items={items}
              getItemValue={getItemValue}
              renderItem={
                (item, isHighlighted) => (
                  <div
                    style={{ color: isHighlighted ? 'var(--dark)' : 'var(--iron)' }}
                    key={item.country_code}>
                    {item.country_name}
                  </div>
                )
              }
              sortItems={this.sortItems}
              shouldItemRender={this.matchTerms}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
              ref={e => this.autocomplete = e}
              inputProps={{
                onFocus: this.inputIsInFocus,
                onBlur: this.inputIsInBlur,
                placeholder: placeholder
              }}
              menuStyle={this.state.typeaheadStyles.defaultStyle}

            />

            <div
              className={
              cx(
                'main-input__box',
                { 'typeahead-on-focus': this.state.isInputOnFocus }
              )}/>
        </div>

        { meta.touched && meta.error &&
          <div className="main-input__error">
            <Small color="red">{meta.error}</Small>
          </div>
        }

      </div>
    );
  }

}

Typeahead.propTypes = {
  /** Label required to use */
  action: PropTypes.shape({
    label: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
  }),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  /** Will be provided by redux-form */
  input: PropTypes.object.isRequired,
  /** Label is required if there's an action */
  label: requiredIf( PropTypes.string, props => props.action),
  /** Will be provided by redux-form */
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  items: PropTypes.array.isRequired,
  getItemValue: PropTypes.func.isRequired,
};

export default Typeahead;
