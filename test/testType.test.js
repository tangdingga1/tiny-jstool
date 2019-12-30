import { TestType } from '../packages';

const {
  isString,
  isNumber,
  isBool,
  isUndefined,
  isNull,
  isFunction,
  isArray,
  isObject,
  isNaN,
  isObjectType,
  isBasicType,
  getType,
  isMatchTypes,
  isOneOfTypes,
  isSame,
  isEqual,
} = TestType;

/**
 *
 * @param {Function} expect jest的expect
 * @param {Function} testHandler 检测的函数
 * @param {String} type 对应Map的类型：null/undefined/boolean/object/array/function
 */
function testSingleTypeBoundaryMap(typeMap, expect, testHandler, type) {
  for (const [value, valueType] of typeMap.entries()) {
    expect(testHandler(value)).toBe(valueType === type);
  }
}

const TYPE_BOUNDARY_MAP = new Map([
  [NaN, 'number'],
  [Infinity, 'number'],
  [0, 'number'],
  [-3, 'number'],
  [null, 'null'],
  [undefined, 'undefined'],
  [false, 'boolean'],
  ['', 'string'],
  [{}, 'object'],
  [[], 'array'],
  [[0], 'array'],
  [function() {}, 'function'],
  [() => {}, 'function'],
]);

describe('test isSomeType', () => {
  [
    [isString, 'string'],
    [isNumber, 'number'],
    [isBool, 'boolean'],
    [isUndefined, 'undefined'],
    [isNull, 'null'],
    [isFunction, 'function'],
    [isArray, 'array'],
    [isObject, 'object'],
  ].map(([handler, type]) => {
    test(`test ${handler.name}`, () => {
      testSingleTypeBoundaryMap(TYPE_BOUNDARY_MAP, expect, handler, type);
    });
  });

  test('test isNaN', () => {
    expect(isNaN(NaN)).toBe(true);
    expect(isNaN(0)).toBe(false);
    expect(isNaN(false)).toBe(false);
  });
});

describe('test compareTypes', () => {
  test('test getType', () => {
    for (const [value, valueType] of TYPE_BOUNDARY_MAP.entries()) {
      expect(getType(value)).toBe(valueType);
    }
  });

  test('test isMatchTypes', () => {
    expect(
      isMatchTypes(['number', 'object', 'function'], [-3, {}, () => {}])
    ).toBe(true);
    expect(
      isMatchTypes(['undefined', 'string', 'boolean'], [undefined, '', true])
    ).toBe(true);
    expect(
      isMatchTypes(['number'], [undefined, '', true])
    ).toBe(false);
    expect(
      isMatchTypes(['undefined', 'any', 'any'], [undefined])
    ).toBe(true);
  });

  test('test isOneOfTypes', () => {
    expect(
      isOneOfTypes(['number', 'object', 'function'], 3)
    ).toBe(true);
    expect(
      isOneOfTypes('number', 11)
    ).toBe(true);
    expect(
      isOneOfTypes('any', 11)
    ).toBe(true);
    expect(
      isOneOfTypes(['number', 'object', 'function'], null)
    ).toBe(false);
  });
});

const VALUE_TYPE_MAP = new Map([
  [NaN, 'basic'],
  [Infinity, 'basic'],
  [0, 'basic'],
  [-3, 'basic'],
  [null, 'basic'],
  [undefined, 'basic'],
  [false, 'basic'],
  ['', 'basic'],
  [{}, 'object'],
  [[], 'object'],
  [[0], 'object'],
  [function() {}, 'object'],
  [() => {}, 'object'],
  [new Map(), 'object'],
  [new Set(), 'object'],
  [new Promise(() => {}), 'object'],
]);

describe('test basic/object type', () => {
  [
    [isBasicType, 'basic'],
    [isObjectType, 'object'],
  ].map(([handler, type]) => {
    test(`test ${handler.name}`, () => {
      testSingleTypeBoundaryMap(VALUE_TYPE_MAP, expect, handler, type);
    });
  });
});

describe('test isSame/isEqual', () => {
  test('test isSame', () => {
    expect(isSame(1, 1, 1, 1)).toBe(true);
    expect(isSame(NaN, NaN, NaN, NaN)).toBe(true);
    expect(isSame([], [], [])).toBe(false);
    expect(isSame(1, 2, 3, 4)).toBe(false);
  });
  test('test isEqual', () => {
    expect(isEqual(NaN, NaN, NaN, NaN)).toBe(true);
    expect(
      isEqual([1, 2, { a: 1 }], [1, 2, { a: 1 }], [1, 2, { a: 1 }])
    ).toBe(true);
    expect(
      isEqual([1, 2, { a: 1 }], [1, 2, { a: 1 }], [1, 2, { a: 2 }])
    ).toBe(false);
    expect(
      isEqual({ list: [1, 2, 3] }, { list: [1, 2, 3] }, { list: [1, 2, 3] })
    ).toBe(true);
    expect(
      isEqual({ list: [1, 3, 3] }, { list: [1, 2, 3] }, { list: [1, 2, 3] })
    ).toBe(false);
  });
});
