import * as fromCalc from '../reducers/calculator';

export const getIsFetching = (state) =>
  fromCalc.getIsFetching(state.calculator);

export const getIsCalculating = (state) =>
  fromCalc.getIsCalculating(state.calculator);

export const getIsAdding = (state) =>
  fromCalc.getIsAdding(state.calculator);

export const getStepById = (state, id) =>
  fromCalc.getStepById(state.calculator, id);

export const getOptionById = (state, id) =>
  fromCalc.getOptionById(state.calculator, id);

export const getFormSteps = (state) =>
  fromCalc.getFormSteps(state.calculator);

export const getStepOptions = (state, step) =>
  fromCalc.getStepOptions(state.calculator, step);

export const getCalculatedCarbon = (state) =>
  fromCalc.getCalculatedCarbon(state.calculator);

export const getStepsList = (state) =>
  fromCalc.getStepsList(state.calculator);

export const getStepErrorMessages = (state) =>
  fromCalc.getStepErrorMessages(state.calculator);

export const getCalcErrorMessages = (state) =>
  fromCalc.getCalcErrorMessages(state.calculator);

export const getcalculatedPath = (state) =>
  fromCalc.getcalculatedPath(state.calculator);

export const getOptions = (state) =>
  fromCalc.getOptions(state.calculator);
