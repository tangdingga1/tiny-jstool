import { ErrorCatcher } from '../packages';

const mockFunctionOne = jest.fn((value) => (42 + value));

const mockFunctionAdd = jest.fn((addParam1, addParam2, addParam3) => addParam1 + addParam2 + addParam3);

describe('ErrorCatcher', () => {

  test('test matchParamsType call error', () => {
    const catchedMockFunctionOne = ErrorCatcher.matchParamsType(mockFunctionOne, ['number']);
    expect(
      () => catchedMockFunctionOne('11')
    ).toThrow(TypeError);
    expect(mockFunctionOne.mock.calls.length).toBe(0);
  });

  test('test matchParamsType call correctly', () => {
    const catchedMockFunctionOne = ErrorCatcher.matchParamsType(mockFunctionOne, ['number', 'any']);
    catchedMockFunctionOne(11);
    expect(mockFunctionOne.mock.calls.length).toBe(1);
    // return correctly
    expect(mockFunctionOne.mock.results[0].value).toBe(53);
  });

  test('test matchParamsType multiple times', () => {
    const catchedMockFunctionAdd = ErrorCatcher.matchParamsType(mockFunctionAdd, ['number', 'number', 'number']);
    expect(
      () => catchedMockFunctionAdd(11, 11, '11')
    ).toThrow(TypeError);
    expect(mockFunctionOne.mock.calls.length).toBe(0);
  });

  test('test matchParamsType multiple times correctly', () => {
    const catchedMockFunctionAdd = ErrorCatcher.matchParamsType(mockFunctionAdd, ['number']);
    catchedMockFunctionAdd(11, '11', '11');
    expect(mockFunctionAdd.mock.calls.length).toBe(1);
    // return correctly
    expect(mockFunctionAdd.mock.results[0].value).toBe('111111');
  });

});
