const {ThousandsSeparatorRegExp, ThousandsSeparatorLoopString, ThousandsSeparatorArray, ThousandsSeparatorRecursive} = require('./thousands_separator.js');

beforeEach(() => {
  TSregexp = new ThousandsSeparatorRegExp;
  TSarray = new ThousandsSeparatorArray;
  TSloop = new ThousandsSeparatorLoopString;
  TSrecursive = new ThousandsSeparatorRecursive;
});

let numbers = {
  0 : '0',
  12 : '12',
  123 : '123',
  '444' : '444', // test for type string/integer
  1234 : '1,234',
  987654321 : '987,654,321',
  9876543210 : '9,876,543,210'
} 

// REGEXP
Object.keys(numbers).forEach(value => {
  let expected = numbers[value]

  test('REGEXP: ' + value + ' => ' + expected, () => {
    expect(TSregexp.format(value)).toBe(expected);
  });
});

// REGEXP - NEGATIVE
Object.keys(numbers).forEach(value => {
  let expected = numbers[value]

  // add auto negative
  if (value !== '0' && value !== 0) { // fix for zero, because in JS (0 * -1 = -0)
    value = (typeof value === 'string') ? '-' + value : -Math.abs(num)
  }
  expected = expected === '0' ? expected : '-' + expected

  test('REGEXP NEGATIVE: ' + value + ' => ' + expected, () => {
    expect(TSregexp.format(value)).toBe(expected);
  });
});


// ARRAY
Object.keys(numbers).forEach(value => {
  let expected = numbers[value]

  test('ARRAY: ' + value + ' => ' + expected, () => {
    expect(TSarray.format(value)).toBe(expected);
  });
});

// ARRAY - NEGATIVE
Object.keys(numbers).forEach(value => {
  let expected = numbers[value]

  // add auto negative
  if (value !== '0' && value !== 0) { // fix for zero, because in JS (0 * -1 = -0)
    value = (typeof value === 'string') ? '-' + value : -Math.abs(num)
  }
  expected = expected === '0' ? expected : '-' + expected

  test('ARRAY NEGATIVE: ' + value + ' => ' + expected, () => {
    expect(TSarray.format(value)).toBe(expected);
  });
});

// LOOP/STRING
Object.keys(numbers).forEach(value => {
  let expected = numbers[value]

  test('LOOP/STRING: ' + value + ' => ' + expected, () => {
    expect(TSloop.format(value)).toBe(expected);
  });
});

// LOOP/STRING
Object.keys(numbers).forEach(value => {
  let expected = numbers[value]

  // add auto negative
  if (value !== '0' && value !== 0) { // fix for zero, because in JS (0 * -1 = -0)
    value = (typeof value === 'string') ? '-' + value : -Math.abs(num)
  }
  expected = expected === '0' ? expected : '-' + expected

  test('LOOP/STRING NEGATIVE: ' + value + ' => ' + expected, () => {
    expect(TSloop.format(value)).toBe(expected);
  });
});

// RECURSIVE
Object.keys(numbers).forEach(value => {
  let expected = numbers[value]

  test('RECURSIVE: ' + value + ' => ' + expected, () => {
    expect(TSarray.format(value)).toBe(expected);
  });
});

// RECURSIVE - NEGATIVE
Object.keys(numbers).forEach(value => {
  let expected = numbers[value]

  // add auto negative
  if (value !== '0' && value !== 0) { // fix for zero, because in JS (0 * -1 = -0)
    value = (typeof value === 'string') ? '-' + value : -Math.abs(num)
  }
  expected = expected === '0' ? expected : '-' + expected

  test('RECURSIVE NEGATIVE: ' + value + ' => ' + expected, () => {
    expect(TSrecursive.format(value)).toBe(expected);
  });
});

// OTHER SEPARATOR
test('REGEXP: Separator = "." ~~> 1234 => return 1.234', () => {
  expect(TSregexp.format('1234', '.')).toBe('1.234');
});

// TEST WITH TYPES & NULL
test('ARRAY: Empty value => return 0', () => {
  expect(TSarray.format(' ')).toBe('0');
});
test('ARRAY: Boolean true => return 0', () => {
  expect(TSarray.format(true)).toBe('0');
});
test('ARRAY: Boolean false => return 0', () => {
  expect(TSarray.format(false)).toBe('0');
});
test('ARRAY: Boolean false => return 0', () => {
  expect(TSarray.format(null)).toBe('0');
});

// TEST WITH VALUES
test('ARRAY: Value is lorem123 => return 0', () => {
  expect(TSarray.format('lorem123')).toBe('0');
});
test('ARRAY: Value lenght is > 15 => return 0', () => {
  expect(() => {
    TSarray.format('012345678901010101');
  }).toThrow();
});
