import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

import { calculateCarbon, requestStep } from '../actions/calculator';
import { getStepOptions } from '../selectors/calculator';

import StepSelect from '../components/Calculator/StepSelect';
import StepInput from '../components/Calculator/StepInput';
import StepTypeahead from '../components/Calculator/StepTypeahead';

class CalcStepContainer extends Component {
  constructor() {
    super();

    this.handleChange = debounce(this.handleChange, 300);
    this.state = {
      nextId: null,
      windowWidth: window.innerWidth,
    };

    this.updateWindowWidth = this.updateWindowWidth.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowWidth);
  }

  componentWillUnmount() {
    const { change, step } = this.props;
    window.removeEventListener("resize", this.updateWindowWidth);
    change(`field_${step.id}`, '');
  }

  updateWindowWidth() {
    this.setState({
      windowWidth: window.innerWidth,
    });
  }

  handleChange(nextId, final) {
    this.setState({nextId}, () => {
      this.handleNextStep(final);
    });
  }

  handleNextStep(final) {
    const {
      calculateCarbon,
      formValues,
      requestStep,
      step,
    } = this.props;

    const { nextId } = this.state;
    let currentFormValue = formValues[`field_${step.id}`];

    if (!currentFormValue) return;

    const { options } = this.props;

    if (isNaN(currentFormValue)) {
      const match = options.find(
        (element) => currentFormValue === element.name
      );
      currentFormValue = match.value;
    }

    if (final === 'true' || step.final) {
      let stepsList = this.props.stepsList.slice();

      // handling user going back from one last step to another last step.
      if (stepsList[stepsList.length - 1][0] !== step.id) {
        stepsList = [[0, null], ...stepsList.slice(1, stepsList.length - 1)];

        const stepsPath = [
          ...stepsList.slice().splice(1, (stepsList.length - 1)),
          [Number(nextId), Number(currentFormValue)]
        ];

        return calculateCarbon(stepsPath, stepsList.slice());
      }

      //regular calculation flow
      const stepsPath = [
        ...stepsList.slice().splice(1, (stepsList.length - 1)),
        [Number(nextId), Number(currentFormValue)]
      ];

      return calculateCarbon(stepsPath, stepsList.slice());
    }

    return requestStep(
      step.id,
      nextId,
      currentFormValue
    );
  }

  render() {
    const { step, options } = this.props;
    const { windowWidth } = this.state;
    const inputType = step.data_type;

    switch (inputType) {
      case 0:
        return (
          <StepSelect
            handleChange={this.handleChange.bind(this)}
            options={options}
            step={step}
            nextId={step.next_step_id}
          />
        );
      case 1:
        return (
          windowWidth > 768 ?
          <StepTypeahead
            handleChange={this.handleChange.bind(this)}
            options={options}
            step={step}
          />
          :
          <StepSelect
            handleChange={this.handleChange.bind(this)}
            options={options}
            step={step}
            nextId={step.next_step_id}
          />
        );
      default:
        return (
          <StepInput
            handleChange={this.handleChange.bind(this)}
            input={options[0]}
            step={step}
          />
        );
    }

  }
}

CalcStepContainer.propTypes = {
  calculateCarbon: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  formValues: PropTypes.object,
  options: PropTypes.array.isRequired,
  requestStep: PropTypes.func.isRequired,
  step: PropTypes.object.isRequired,
  stepsList: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  options: getStepOptions(state, ownProps.step),
});

export default connect(
  mapStateToProps,
  { calculateCarbon, requestStep }
)(CalcStepContainer);
