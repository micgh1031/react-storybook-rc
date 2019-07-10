export const requiredIf = (type, condition) => {
  return function(props) {
    const test = condition(props) ? type.isRequired : type;
    return test.apply(this, arguments);
  };
};
