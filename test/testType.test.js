import { isString } from '../packages/testType';

test('test type', () => {
  describe('test isString', () => {
    expect(isString('')).toBe(true);
  });
});
