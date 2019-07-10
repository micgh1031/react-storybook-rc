import actionTypes from '../constants/actionTypes';

const initialState = {
  isWorking: false,
  languages: [],
  languagesErrorMessages: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LANGUAGES_START:
      return {
        ...initialState,
        isWorking: true,
      };
    case actionTypes.LANGUAGES_COMPLETE:
      return {
        ...initialState,
        languages: action.payload.languages,
      };
    case actionTypes.LANGUAGES_ERROR:
      return {
        ...initialState,
        countriesErrorMessages: action.payload.message,
      };
    default:
      return state;
  }
};

export const getIsWorking = state => state.isWorking;
export const getLanguages = state => state.languages;
export const getLanguagesErrorMessages = state => state.languagesErrorMessages;
