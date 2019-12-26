import { isString } from '../packages/TestType';

describe('test isString', () => {
  test('test type', () => {
    expect(isString('')).toBe(true);
  });
});
