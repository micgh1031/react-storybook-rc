import { defineMessages } from "react-intl";

export const localizedLink = defineMessages({
  tos: {
    id: "localizedLink.tos",
    defaultMessage: "https://reforestum.com/en/legal-terms"
  },
  contact: {
    id: "localizedLink.contact",
    defaultMessage: "https://reforestum.com/en/contact-us"
  },
  how: {
    id: "localizedLink.how",
    defaultMessage: "https://reforestum.com/en/how-it-works/"
  },
});

export const calculatorMessages = defineMessages({
  noLogic: {
    id: "calculatorMessages.noLogic",
    defaultMessage: "No Logic for this option yet."
  },
});

export const checkoutMessages = defineMessages({
  cardNumberLabel: {
    id: "StripeForm.cardNumberLabel",
    defaultMessage: "Card Number"
  },
  expiryDateLabel: {
    id: "StripeForm.expiryDateLabel",
    defaultMessage: "Expiry Date"
  },
  cvcLabel: {
    id: "StripeForm.cvcLabel",
    defaultMessage: "Security Code (CVC)"
  },
  transaction: {
    id: "transaction",
    defaultMessage: "After we've confirmed the transaction you'll receive and email with your invoice. "
  },
  checkForest: {
    id: "checkForest",
    defaultMessage: "Meanwhile, you can already check your percentage of {forestName}!"
  },
  goToForest: {
    id: "goToForest",
    defaultMessage: "Go to {forestName}"
  }
});

export const filterMessages = defineMessages({
  co2Label: {
    id: "Filters.co2Label",
    defaultMessage: "Select CO² sources:"
  },
  budgetLabel: {
    id: "Filters.budgetLabel",
    defaultMessage: "Define your budget:"
  },
  areaLabel: {
    id: "Filters.areaLabel",
    defaultMessage: "Define your area:"
  },
});

export const photoMessages = defineMessages({
  photoLabel: {
    id: "Form.photoLabel",
    defaultMessage: "Profile Picture"
  },
});

export const addressMessages = defineMessages({
  addressLabel: {
    id: "Form.addressLabel",
    defaultMessage: "Full address"
  },
  addressPlaceholder: {
    id: "Form.addressPlaceholder",
    defaultMessage: "Type your full address"
  },
  cityLabel: {
    id: "Form.cityLabel",
    defaultMessage: "City"
  },
  cityPlaceholder: {
    id: "Form.cityPlaceholder",
    defaultMessage: "Type your city"
  },
  zipLabel: {
    id: "Form.zipLabel",
    defaultMessage: "Zip code"
  },
  zipPlaceholder: {
    id: "Form.zipPlaceholder",
    defaultMessage: "0000-000"
  },
  stateLabel: {
    id: "Form.stateLabel",
    defaultMessage: "State"
  },
  statePlaceholder: {
    id: "Form.statePlaceholder",
    defaultMessage: "Type your state"
  },
  countryLabel: {
    id: "Form.countryLabel",
    defaultMessage: "Country"
  },
  countryPlaceholder: {
    id: "Form.countryPlaceholder",
    defaultMessage: "Type your country"
  },
});

export const settingsMessages = defineMessages({
  privacyLabel: {
    id: "Form.privacyLabel",
    defaultMessage: "Account Privacy"
  },
  nicknameLabel: {
    id: "Form.nicknameLabel",
    defaultMessage: "Nickname"
  },
  nicknamePlaceholder: {
    id: "Form.nicknamePlaceholder",
    defaultMessage: "Type your desired nickname"
  },
  langLabel: {
    id: "Form.langLabel",
    defaultMessage: "Preferred Language"
  },
});

export const privacyLevels = defineMessages({
  private: {
    id: "Form.private",
    defaultMessage: "Completely private."
  },
  public: {
    id: "Form.public",
    defaultMessage: "Display my name, surname and photo"
  },
  nickname: {
    id: "Form.nickname",
    defaultMessage: "Display my nickname only."
  },
});

export const ksUserSignup = defineMessages({
  ksTitle: {
    id: "ksTitle",
    defaultMessage: "Activate your Reforestum account"
  },
  ksMessage: {
    id: "ksMessage",
    defaultMessage: "Update the form below to redeem your reforestum account"
  },
});

export const authMessages = defineMessages({
  loginTitle: {
    id: "Login.loginTitle",
    defaultMessage: "Welcome back"
  },
  loginText: {
    id: "Login.loginText",
    defaultMessage: "Type your credentials below to manage your forests and carbon emissions."
  },
  recoveryTitle: {
    id: "Login.recoveryTitle",
    defaultMessage: "Don't worry"
  },
  recoveryText: {
    id: "Login.recoveryText",
    defaultMessage: "Type your email address below and we'll send you a special link for you to reset your password."
  },
  resetTitle: {
    id: "Login.resetTitle",
    defaultMessage: "Reset password"
  },
  resetText: {
    id: "Login.resetText",
    defaultMessage: "Type your new password below"
  },
  signupTitle: {
    id: "Login.signupTitle",
    defaultMessage: "Join Reforestum"
  },
  signupText: {
    id: "Login.signupText",
    defaultMessage: "Thank you for wanting to make the world a better place! Type your information below to get started."
  },
  nameLabel: {
    id: "Login.nameLabel",
    defaultMessage: "First name"
  },
  namePlaceholder: {
    id: "Login.namePlaceholder",
    defaultMessage: "Type your first name"
  },
  surnameLabel: {
    id: "Login.surnameLabel",
    defaultMessage: "Last name"
  },
  surnamePlaceholder: {
    id: "Login.surnamePlaceholder",
    defaultMessage: "Type your last name"
  },
  emailLabel: {
    id: "Login.emailLabel",
    defaultMessage: "Email address"
  },
  emailPlaceholder: {
    id: "Login.emailPlaceholder",
    defaultMessage: "Type your email address"
  },
  passwordLabel: {
    id: "Login.passwordLabel",
    defaultMessage: "Password"
  },
  passwordPlaceholder: {
    id: "Login.passwordPlaceholder",
    defaultMessage: "Type your password"
  },
  newPasswordLabel: {
    id: "Password.newPasswordLabel",
    defaultMessage: "New Password"
  },
  newPasswordPlaceholder: {
    id: "Password.newPasswordPlaceholder",
    defaultMessage: "Type desired new password"
  },
  repeatPasswordLabel: {
    id: "Login.repeatPasswordLabel",
    defaultMessage: "Confirm New Password"
  },
  repeatPasswordPlaceholder: {
    id: "Login.repeatPasswordPlaceholder",
    defaultMessage: "Confirm your new password"
  },
  forgot: {
    id: "Login.forgot",
    defaultMessage: "Forgot?"
  },
  recoverySuccess: {
    id: "Login.recoverSuccess",
    defaultMessage: "Please check your inbox now"
  },
  resetSuccess: {
    id: "Login.resetSuccess",
    defaultMessage: "Your password has been successfully reset. You can login with your new credentials."
  },
});

export const carbonMessages = defineMessages({
  captured: {
    id: "Carbon.captured",
    defaultMessage: "CO² Captured"
  },
  emitted: {
    id: "Carbon.emitted",
    defaultMessage: "CO² Emitted"
  },
  oxygen: {
    id: "Carbon.oxygen",
    defaultMessage: "O² Generated"
  },
  emptyImageAlt: {
    id: "EmptyCarbon.imageAlt",
    defaultMessage: "No carbon sources available"
  },
  freqFormNone: {
    id: "FrequencyForm.none",
    defaultMessage: "No"
  },
  freqFormDaily: {
    id: "FrequencyForm.daily",
    defaultMessage: "Daily"
  },
  freqFormWeekly: {
    id: "FrequencyForm.weekly",
    defaultMessage: "Weekly"
  },
  freqFormMonthly: {
    id: "FrequencyForm.monthly",
    defaultMessage: "Monthly"
  },
  freqFormTotal: {
    id: "FrequencyForm.total",
    defaultMessage: "Total"
  },
  calculatorLastStepBefore: {
    id: "Calculator.lastStepBefore",
    defaultMessage: "This source will be named"
  },
  calculatorLastStepPlaceholder: {
    id: "Calculator.lastStepPlaceholder",
    defaultMessage: "Carbon source name"
  },
  notOffset: {
    id: "Carbon.notOffset",
    defaultMessage: "To offset"
  },
  offset: {
    id: "Carbon.offset",
    defaultMessage: "Offset"
  },
  recurring: {
    id: "Carbon.recurring",
    defaultMessage: "Recurring"
  },
});

export const formMessages = defineMessages({
  required: {
    id: "FormErrors.required",
    defaultMessage: "This field is required"
  },
  email: {
    id: "FormErrors.invalidEmail",
    defaultMessage: "Invalid email address"
  },
  phone: {
    id: "FormErrors.invalidPhone",
    defaultMessage: "Invalid phone number"
  },
  option: {
    id: "FormErrors.invalidOption",
    defaultMessage: "Invalid option"
  },
  strength: {
    id: "FormErrors.passwordStrength",
    defaultMessage: "Please use a password at least 8 characters long, with at least 1 uppercase, 1 digit and 1 special character."
  },
  passwordNotMatch: {
    id: "FormErrors.passwordNotMatch",
    defaultMessage: "Passwords must match"
  },
  selectDefaultOption: {
    id: "Forms.selectDefaultOption",
    defaultMessage: "Select option"
  },
  mustAgree: {
    id: "FormErrors.mustAgree",
    defaultMessage: "You must agree to Reforestum's terms of service"
  }
});

export const tosMessages = defineMessages({
  message: {
    id: "tosMessages.message",
    defaultMessage: "I agree with Reforestum's"
  },
  tos: {
    id: "tosMessages.tos",
    defaultMessage: "Terms of Service"
  },
});

export const invoiceMessages = defineMessages({
  emptyImageAlt: {
    id: "invoiceMessages.imageAlt",
    defaultMessage: "You have no invoices."
  },
});
