const DECIMAL_RADIX = 10;

export default (value = 0, dividedBy = 1, decimalPoints = 1) => {
  const val = parseFloat(value);
  const div = parseFloat(dividedBy);
  const dec = parseInt(decimalPoints, DECIMAL_RADIX);

  if (isNaN(val) || isNaN(div) || isNaN(dec)) return undefined;

  return (val / div).toFixed(dec);
};
