export const NUMBER_FORMAT_TYPES = Object.freeze({
  NUMBER: 'NUMBER',
  CURRENCY: 'CURRENCY',
  SHORT_CURRENCY: 'SHORT_CURRENCY',
} as const);
type toFormatType = keyof typeof NUMBER_FORMAT_TYPES;

export const formatNumber = (number: number, toFormat?: toFormatType): string => {
  switch (toFormat) {
    case NUMBER_FORMAT_TYPES.CURRENCY:
      return `$${toFixedOptional(number).toLocaleString('en-US')}`;
    case NUMBER_FORMAT_TYPES.SHORT_CURRENCY:
      return shortenNumber(number, true);
    case NUMBER_FORMAT_TYPES.NUMBER:
    default:
      return `${number.toLocaleString('en-US')}`;
  }
};

const toFixedOptional = (number: number): number => {
  return Number.parseFloat(number.toFixed(2));
};

const shortenNumber = (number: number, isCurrency = false): string => {
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
  // Initialize to tens=
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

  // Adds 2 decimals with no trailing zeroes
  // Inspired by https://www.30secondsofcode.org/js/s/number-to-optional-fixed/
  const scaledNumberValue = `${toFixedOptional(scaledNumber)}${SCALE_SUFFIX[currentMaxScale]}`;

  return isCurrency ? `$${scaledNumberValue}` : scaledNumberValue;
};
