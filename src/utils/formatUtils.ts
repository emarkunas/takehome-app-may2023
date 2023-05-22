/**
 * This is used for common utility functions across the application
 * following DRY principles.
 *
 * For future performance, only functions that your code is using should be imported, not the whole utils file
 * (do this) e.g. import { formatNumber } from 'src/utils/formatUtils';
 *
 * Changes to these functions should have relevant tests updated.
 * Manual testing of existing uses is recommended while
 * unit tests are still new.
 *
 * TODO: Add unit tests
 */

/**
 * Formats currently supported for number formatting
 */
export const NUMBER_FORMAT_TYPES = Object.freeze({
  NUMBER: 'NUMBER', // 123,456,789
  CURRENCY: 'CURRENCY', // $123,456,789.01
  SHORT_CURRENCY: 'SHORT_CURRENCY', // $123.56K
} as const);

/**
 * Used to format numbers throughout the application, accepts number and returns
 * string.
 * Default return format is NUMBER, a comma separated string if no second parameter used
 *
 * @param number number to be formatted
 * @param toFormat number
 * @returns string formatted list
 */
export const formatNumber: (number: number, toFormat: keyof typeof NUMBER_FORMAT_TYPES) => string = (
  number,
  toFormat = 'NUMBER'
) => {
  switch (toFormat) {
    case NUMBER_FORMAT_TYPES.CURRENCY:
      return `$${toFixedOptional(number).toLocaleString('en-US')}`;
    case NUMBER_FORMAT_TYPES.SHORT_CURRENCY:
      return shortenNumberScaled(number, true);
    case NUMBER_FORMAT_TYPES.NUMBER:
    default:
      return `${number.toLocaleString('en-US')}`;
  }
};

// Inspired by https://www.30secondsofcode.org/js/s/number-to-optional-fixed/
const toFixedOptional = (number: number): number => {
  return Number.parseFloat(number.toFixed(2));
};

/**
 * Returns a number shorted by it's base 10 scale, e.g. TENS or THOUSANDS
 * Currently only supported up to trillions
 *
 * @param number
 * @param isCurrency
 * @returns
 */
const shortenNumberScaled = (number: number, isCurrency = false): string => {
  const NUMBER_SCALES = ['TENS', 'THOUSANDS', 'MILLIONS', 'BILLIONS', 'TRILLIONS'] as const;
  const NUMBER_SCALE_VALUES = {
    TENS: 10,
    THOUSANDS: 10 ** 3,
    MILLIONS: 10 ** 6,
    BILLIONS: 10 ** 9,
    TRILLIONS: 10 ** 12,
  };
  const SCALE_SUFFIX = {
    TENS: '',
    THOUSANDS: 'K',
    MILLIONS: 'M',
    BILLIONS: 'B',
    TRILLIONS: 'T',
  };
  // Initialize to tens
  let currentMaxScale: (typeof NUMBER_SCALES)[number] = NUMBER_SCALES[0];
  let currentMaxScaleVal = NUMBER_SCALE_VALUES[currentMaxScale];
  for (const scale of NUMBER_SCALES) {
    const scaleValue = NUMBER_SCALE_VALUES[scale];
    if (number / scaleValue > 1 && scaleValue > currentMaxScaleVal) {
      currentMaxScale = scale;
      currentMaxScaleVal = scaleValue;
    }
  }

  // Scales number to correct tens base
  const scaledNumber = number / currentMaxScaleVal;

  // Adds 2 decimals with no trailing zeroes. Unless scale is TENS, then show both digits regardless
  const scaledNumberValue =
    currentMaxScale === NUMBER_SCALES[0] ? scaledNumber.toFixed(2) : `${toFixedOptional(scaledNumber).toString()}`;

  return isCurrency
    ? `$${scaledNumberValue}${SCALE_SUFFIX[currentMaxScale]}`
    : `${scaledNumberValue}${SCALE_SUFFIX[currentMaxScale]}`;
};
