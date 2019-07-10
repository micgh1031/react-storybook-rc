export const withIntl = (intl, fn) => {
  if (typeof fn === 'function') return value => fn(value, intl);

  return fn.map(f => value => f(value, intl));
};
