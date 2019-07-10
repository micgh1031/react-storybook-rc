import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Field } from 'redux-form';
import { injectIntl, intlShape } from 'react-intl';
import { formMessages } from '../../constants/messages';

import { required } from '../../utils/formHelpers';
import { withIntl } from '../../utils/intl';

import LineInput from '../UI/Forms/LineInput';

class StepSelect extends Component {
  constructor(props){
    super(props);

    this.state = {
      selectedOptionText: props.intl.formatMessage(formMessages.selectDefaultOption),
      width: 0,
    };
  }

  componentDidMount(){
    this.adjustWidth();
  }

  adjustWidth() {
    this.setState({
      width: this.dummyDiv.offsetWidth,
    });
  }

  render(){
    const {
      className,
      handleChange,
      intl,
      options,
      step,
    } = this.props;
    const {
      selectedOptionText
    } = this.state;

    return (
      <div className="line-input__holder">
        <Field
          className={cx(className, 'carbon-calc-step')}
          name={`field_${step.id}`}
          component={LineInput}
          type="select"
          color="orange"
          textBefore={step.pretext}
          textAfter={step.postext}
          breakAfter={step.breakAfter || step.final}
          width={this.dummyDiv ? this.dummyDiv.offsetWidth : 100}
          onChange={e => {
            this.setState({
              selectedOptionText: e.target.options[e.target.selectedIndex].text,
            });
            handleChange(
              e.target.options[e.target.selectedIndex].dataset.nextid,
              e.target.options[e.target.selectedIndex].dataset.final
            );
            this.adjustWidth();
          }}
          validate={withIntl(intl, required)}
        >
          {options.map((option, index) => {
            return (
              <option
                key={index}
                value={option.value}
                data-final={option.final}
                data-nextid={option.next_step_id || step.next_step_id}>
                {option.name}
              </option>
            );
          })}
        </Field>
        <div ref={element => this.dummyDiv = element} className="line-input__width-helper">
          {selectedOptionText}
        </div>
      </div>
    );
  }

}

StepSelect.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  intl: intlShape,
  options: PropTypes.array.isRequired,
  step: PropTypes.object.isRequired,
};

export default injectIntl(StepSelect);
