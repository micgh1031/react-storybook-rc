import * as fromCountries from '../reducers/countries';

export const getIsWorking = state =>
  fromCountries.getIsWorking(state.countries);

export const getCountries = state =>
  fromCountries.getCountries(state.countries);

export const getCountriesErrorMessages = state =>
  fromCountries.getCountriesErrorMessages(state.countries);
