import includes from 'lodash/includes';
import { formMessages } from '../constants/messages';

export const required = (value, intl) => {
  if (!value) {
    return intl.formatMessage ?
      intl.formatMessage(formMessages.required) :
      formMessages.required.defaultMessage;
  }
};

export const mustAgree = (value, intl) => {
  if (!value) {
    return intl.formatMessage ?
      intl.formatMessage(formMessages.mustAgree) :
      formMessages.mustAgree.defaultMessage;
  }
};

export const email = (value, intl) => {
  if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return intl.formatMessage ?
      intl.formatMessage(formMessages.email) :
      formMessages.email.defaultMessage;
  }
};

export const phone = (value, intl) => {
  if (value && !/^[0-9-()+\\s-| ]+$/.test(value)) {
    return intl.formatMessage ?
      intl.formatMessage(formMessages.phone) :
      formMessages.phone.defaultMessage;
  }
};

export const mustBePresent = (arr, value, intl) => {
  if (value && !includes(arr, value)) {
    return intl.formatMessage ?
      intl.formatMessage(formMessages.option) :
      formMessages.option.defaultMessage;
  }
};

export const passwordStrength = (value, intl) => {
  if (value && !/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(value)) {
    return intl.formatMessage ?
      intl.formatMessage(formMessages.strength) :
      formMessages.strength.defaultMessage;
  }
};

export const numberNormalizer = value => !isNaN(value) ? value : '';
