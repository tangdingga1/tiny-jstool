import { ErrorCatcher } from '../packages';

const mockFunctionOne = jest.fn((value) => (42 + value));

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
});
