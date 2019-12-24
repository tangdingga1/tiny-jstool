import { isString } from '../packages/src/testType';

test('test type', () => {
  describe('test isString', () => {
    expect(isString('')).toBe(true);
  });
});
