import { Store } from '../packages';

const TEST_KEY_NAME_A = 'demo1';
const TEST_KEY_NAME_B = 'demo2';

const TEST_LISTEN_MAP = {
  [TEST_KEY_NAME_A]: 10,
  [TEST_KEY_NAME_B]: 'something',
};

const mockListenerA = ({ value }) => (42 + value);

// @todo type check and multiple listener check
describe('Store add listener', () => {
  test('test Store single listener', () => {
    const JestMockListenerA = jest.fn(mockListenerA);
    Store.watch(TEST_KEY_NAME_A, JestMockListenerA);
    Store.set(TEST_KEY_NAME_A, TEST_LISTEN_MAP[TEST_KEY_NAME_A]);
    expect(JestMockListenerA.mock.calls.length).toBe(1);
    expect(JestMockListenerA.mock.results[0].value)
      .toBe(mockListenerA({ value: TEST_LISTEN_MAP[TEST_KEY_NAME_A] }));
  });
});
