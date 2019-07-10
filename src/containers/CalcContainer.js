import React, { Component } from 'react';
import mixpanel from 'mixpanel-browser';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';

import { requestStep, clearForm } from '../actions/calculator';
import { addSource } from '../actions/carbon';
import {
  getCalcErrorMessages,
  getCalculatedCarbon,
  getFormSteps,
  getIsAdding,
  getIsCalculating,
  getIsFetching,
  getStepErrorMessages,
  getStepsList,
  getOptions,
  getcalculatedPath,
} from '../selectors/calculator';

import Calculator from '../components/Calculator/Calculator';

class CalcContainer extends Component {

  componentDidMount() {
    mixpanel.track("Page view", {
      "Action": "My CO2 Sources",
      "Domain": "App"
    });
  }

  componentWillMount() {
    this.props.requestStep();
    this.setDefaultFrequency();
  }

  componentWillUnmount() {
    this.resetForm();
  }

  formSubmit(form) {
    const {
      addSource,
      calculatedCarbon,
      calculatedPath } = this.props;
    addSource(
      calculatedCarbon,
      form['field_last'],
      form['field_frequency'],
      calculatedPath,
      this.resetForm.bind(this)
    );
  }

  resetForm() {
    const { reset, dispatch } = this.props;

    // clear steps on redux
    dispatch(clearForm());
    // reset redux form
    reset();
    // re-initialize the default frequency selection
    this.setDefaultFrequency();
  }

  setDefaultFrequency() {
    this.props.change('field_frequency', '0');
  }

  render() {
    const {
      calculatedCarbon,
      change,
      formValues,
      handleSubmit,
      isAdding,
      isCalculating,
      isFetching,
      stepErrorMessages,
      steps,
      stepsList,
      valid,
      calcErrorMessages,
      options,
    } = this.props;

    return (
      <Calculator
        calculatedCarbon={calculatedCarbon}
        calcErrorMessages={calcErrorMessages}
        change={change}
        isAdding={isAdding}
        isCalculating={isCalculating}
        isFetching={isFetching}
        stepErrorMessages={stepErrorMessages}
        steps={steps}
        stepsList={stepsList}
        formValues={formValues}
        handleSubmit={handleSubmit}
        valid={valid}
        formSubmit={this.formSubmit.bind(this)}
        options={options}
      />
    );
  }
}

CalcContainer.propTypes = {
  addSource: PropTypes.func.isRequired,
  calcErrorMessages: PropTypes.string,
  calculatedCarbon: PropTypes.number,
  change: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  formValues: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  isAdding: PropTypes.bool.isRequired,
  isCalculating: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  requestStep: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  stepErrorMessages: PropTypes.string,
  steps: PropTypes.array.isRequired,
  stepsList: PropTypes.array.isRequired,
  valid: PropTypes.bool.isRequired,
  options: PropTypes.object.isRequired,
  calculatedPath: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  calcErrorMessages: getCalcErrorMessages(state),
  calculatedCarbon: getCalculatedCarbon(state),
  formValues: getFormValues('calculator')(state),
  isAdding: getIsAdding(state),
  isCalculating: getIsCalculating(state),
  isFetching: getIsFetching(state),
  stepErrorMessages: getStepErrorMessages(state),
  steps: getFormSteps(state),
  stepsList: getStepsList(state),
  options: getOptions(state),
  calculatedPath: getcalculatedPath(state),
});

const validate = values => {
  const errors = {};

  if (!values.field_last) {
    errors.field_last = 'This field is required';
  }
  return errors;
};

const CalcForm = reduxForm({
  form: 'calculator',
  validate
})(CalcContainer);

export default connect(mapStateToProps, {
  addSource,
  clearForm,
  requestStep,
})(CalcForm);
