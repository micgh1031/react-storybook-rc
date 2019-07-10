import * as fromAlerts from '../reducers/alerts';

export const getAlerts = state => fromAlerts.getAlerts(state.alerts);
