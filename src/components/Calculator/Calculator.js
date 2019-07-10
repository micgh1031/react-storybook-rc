import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Box } from 'react-layout-components';
import { FormattedMessage } from 'react-intl';

import Container from '../Layout/Container/Container';
import Content from '../Layout/Container/Content';

import CalcStepContainer from '../../containers/CalcStepContainer';
import LastStep from './LastStep';
import Footer from './Footer';
import HeadingSmall from '../UI/Text/HeadingSmall';
import Heading from '../UI/Text/Heading';
import FeedbackMessage from '../UI/Forms/FeedbackMessage';

import CarbonSidebarContainer from '../../containers/CarbonSidebarContainer';

import './Calculator.css';

class Calculator extends Component {
  constructor(props){
    super(props);

    this.state = {
      windowWidth: window.innerWidth
    };

    this.updateWindowWidth = this.updateWindowWidth.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowWidth);
  }

  updateWindowWidth() {
    this.setState({
      windowWidth: window.innerWidth,
    });
  }

  render(){
    const {
      calcErrorMessages,
      calculatedCarbon,
      change,
      formSubmit,
      formValues,
      handleSubmit,
      isAdding,
      isCalculating,
      isFetching,
      stepErrorMessages,
      steps,
      stepsList,
      valid,
      options,
    } = this.props;

    const { windowWidth } = this.state;

    return (
      <Box
        className={cx(
          'carbon-calculator',
          { 'pointer-disabled': isAdding || isFetching }
        )}
        width="100%">

        <Container>
          <Content className="carbon-calculator__calculator">
            <HeadingSmall className="carbon-calculator__title">
              <FormattedMessage
                id={'Calculator.title'}
                defaultMessage={'Add CO² source'}
              />
            </HeadingSmall>

            { isFetching && steps.length < 1 &&
              <Heading color="orange">
                <FormattedMessage
                  id={'Calculator.loading'}
                  defaultMessage={'Loading...'}
                />
              </Heading>
            }

            <form
              className="carbon-calculator__form"
              onSubmit={handleSubmit(formSubmit)}
              style={{opacity: isFetching ? 0.5 : 1}}>

              { steps.map((step, index) => (
                <CalcStepContainer
                  key={`${index}`}
                  step={step}
                  stepsList={stepsList}
                  change={change}
                  formValues={formValues}
                  options={options}
                />
              ))}

              { stepErrorMessages &&
                <FeedbackMessage type="error">
                  {stepErrorMessages}
                </FeedbackMessage>
              }


              { calculatedCarbon > 0 && valid &&
                <LastStep/>
              }

              <input type="submit" hidden />
            </form>
            {windowWidth <= 768 && calculatedCarbon > 0 &&
              <Footer
                formValues={formValues}
                change={change}
                calculatedCarbon={calculatedCarbon}
                isAdding={isAdding}
                isCalculating={isCalculating}
                valid={valid}
                stepErrorMessages={stepErrorMessages}
                calcErrorMessages={calcErrorMessages}
                handleSubmit={handleSubmit}
                formSubmit={formSubmit}
                isFetching={isFetching}
              />
            }
          </Content>
          {windowWidth > 768 &&
            <Footer
              formValues={formValues}
              change={change}
              calculatedCarbon={calculatedCarbon}
              isAdding={isAdding}
              isCalculating={isCalculating}
              valid={valid}
              stepErrorMessages={stepErrorMessages}
              calcErrorMessages={calcErrorMessages}
              handleSubmit={handleSubmit}
              formSubmit={formSubmit}
              isFetching={isFetching}
            />
          }
        </Container>

        <CarbonSidebarContainer />

      </Box>
    );
  }
}

Calculator.propTypes = {
  calcErrorMessages: PropTypes.string,
  calculatedCarbon: PropTypes.number,
  change: PropTypes.func.isRequired,
  formSubmit: PropTypes.func.isRequired,
  formValues: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  isAdding: PropTypes.bool.isRequired,
  isCalculating: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  stepErrorMessages: PropTypes.string,
  steps: PropTypes.array.isRequired,
  stepsList: PropTypes.array.isRequired,
  valid: PropTypes.bool.isRequired,
  options: PropTypes.object.isRequired,
};

export default Calculator;
