import * as fromInvoices from '../reducers/invoices';

export const getIsWorking = state =>
  fromInvoices.getIsWorking(state.invoices);

export const getInvoices = state =>
  fromInvoices.getInvoices(state.invoices);

export const getInvoicesErrorMessages = state =>
  fromInvoices.getInvoicesErrorMessages(state.invoices);
