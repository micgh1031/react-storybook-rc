import * as fromLanguages from '../reducers/languages';

export const getIsWorking = state =>
  fromLanguages.getIsWorking(state.languages);

export const getLanguages = state =>
  fromLanguages.getLanguages(state.languages);

export const getLanguagesErrorMessages = state =>
  fromLanguages.getLanguagesErrorMessages(state.languages);
