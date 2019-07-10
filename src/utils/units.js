import convert from 'convert-units';

/**
 * getFormattedWeight
 *
 * @param  {Integer} value - Amount to format
 * @param  {Boolean} metric = true - Use metric system
 * @return {Object} Returns object with 'value' and 'unit' keys
 */
export const getFormattedWeight = (value, metric = true) => {
  return metric ? getMetricWeight(value) : getImperialWeight(value);
};

const amountTooBig = (value) => value > 999999 || value < -999999;
const amountTooSmall = (value) => value < 1 && value > -1;

const getMetricWeight = (value) => {
  if (amountTooBig(value)) {
    return {
      value: (value / 1000).toFixed(2),
      unit: 't'
    };
  } else if (amountTooSmall(value)) {
    return {
      value: (value * 1000).toFixed(2),
      unit: 'gr'
    };
  } else {
    return {
      value: value.toFixed(2),
      unit: 'kg'
    };
  }
};

const getImperialWeight = (value) => {
  const amount = convert(value).from('kg').to('lb');

  if (amountTooBig(amount)) {
    return {
      value: (amount / 2240),
      unit: 't'
    };
  } else if (amountTooSmall(amount)) {
    return {
      value: (amount * 16),
      unit: 'oz'
    };
  } else {
    return {
      value: amount,
      unit: 'lb'
    };
  }
};

export const getFormattedArea = (value, metric = true) => {
  return metric ? getMetricArea(value) : getImperialArea(value);
};

const getMetricArea = (value) => {
  if (amountTooBig(value)) {
    return {
      value: convert(value).from('m2').to('km2'),
      unit: 'km²'
    };
  }
  else {
    return {
      value: value,
      unit: 'm²'
    };
  }
};

const getImperialArea = (value) => {
  const amount = convert(value).from('m2').to('ft2');

  if (amountTooBig(amount)) {
    return {
      value: convert(amount).from('ft2').to('mi2'),
      unit: 'mi²'
    };
  }
  else {
    return {
      value: amount,
      unit: 'ft²'
    };
  }
};
