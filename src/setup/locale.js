import { getUserDetails } from '../selectors/userSession';

export const locale = state => getUserDetails(state).lang;
