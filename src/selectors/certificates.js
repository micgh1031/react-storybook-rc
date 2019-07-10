import * as fromCertificates from '../reducers/certificates';

export const getIsWorking = state =>
  fromCertificates.getIsWorking(state.certificates);

export const getCertificates = state =>
  fromCertificates.getCertificates(state.certificates);

export const getCertificatesErrorMessages = state =>
  fromCertificates.getCertificatesErrorMessages(state.certificates);
