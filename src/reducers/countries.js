import actionTypes from '../constants/actionTypes';

const initialState = {
  isWorking: false,
  countries: [],
  countriesErrorMessages: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.COUNTRIES_START:
      return {
        ...initialState,
        isWorking: true,
      };
    case actionTypes.COUNTRIES_COMPLETE:
      return {
        ...initialState,
        countries: action.payload.countries,
      };
    case actionTypes.COUNTRIES_ERROR:
      return {
        ...initialState,
        countriesErrorMessages: action.payload.message,
      };
    default:
      return state;
  }
};

export const getIsWorking = state => state.isWorking;
export const getCountries = state => state.countries;
export const getCountriesErrorMessages = state => state.countriesErrorMessages;
