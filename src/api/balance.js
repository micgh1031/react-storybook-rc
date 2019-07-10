import { delay } from './';

export const getCO2Balance = () => {
  return delay(500).then(() => {
    if (Math.random() < 0.1) {
      throw new Error('There was a problem fetching your balance');
    }

    return {
      emitted: 2000,
      captured: 3452,
      oxygen: 2352345,
      timeline_formula: 'return 0.0274 * (Math.pow (Math.E, 0.0748*y))'
    };
  });
};
