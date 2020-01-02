import { Store } from '../packages';

const mockListenerValueAdd = ({ value }) => (42 + value);

const mockListenerReturnValue = ({ value }) => value;

// @todo type check and multiple listener check
describe('Store add listener', () => {
  test('test Store single listener', () => {
    const JestMockListenerValueAdd = jest.fn(mockListenerValueAdd);
    Store.watch('singleListenerKey', JestMockListenerValueAdd);
    Store.set('singleListenerKey', 10);
    expect(JestMockListenerValueAdd.mock.calls.length).toBe(1);
    expect(JestMockListenerValueAdd.mock.results[0].value)
      .toBe(mockListenerValueAdd({ value: 10 }));
    // preValue
    Store.set('singleListenerKey', 20);
    expect(JestMockListenerValueAdd.mock.calls.length).toBe(2);
    expect(JestMockListenerValueAdd.mock.results[1].value)
      .toBe(mockListenerValueAdd({ value: 20 }));
  });

  test('test Stroe multiple listener', () => {
    const JestMockListenerValueAdd = jest.fn(mockListenerValueAdd);
    const JestMockListenerReturnValue = jest.fn(mockListenerReturnValue);
    Store.watch('multipleListenerKey', JestMockListenerValueAdd);
    Store.watch('multipleListenerKey', JestMockListenerReturnValue);
    Store.set('multipleListenerKey', 10);
    expect(JestMockListenerValueAdd.mock.calls.length).toBe(1);
    expect(JestMockListenerReturnValue.mock.calls.length).toBe(1);
    Store.removeWatch('multipleListenerKey', JestMockListenerValueAdd);
    Store.set('multipleListenerKey', 20);
    expect(JestMockListenerValueAdd.mock.calls.length).toBe(1);
    expect(JestMockListenerReturnValue.mock.calls.length).toBe(2);
  });

  test('test Store single change listener', () => {
    const JestMockListenerReturnValue = jest.fn(mockListenerReturnValue);
    Store.onChange('changeListenerKey', JestMockListenerReturnValue);
    Store.set('changeListenerKey', { value: 10 });
    expect(JestMockListenerReturnValue.mock.calls.length).toBe(1);
    expect(JestMockListenerReturnValue.mock.results[0].value)
      .toEqual({ value: 10 });
    // not change
    Store.set('changeListenerKey', { value: 10 });
    expect(JestMockListenerReturnValue.mock.calls.length).toBe(1);
    // change
    Store.set('changeListenerKey', [1, 2, 3]);
    expect(JestMockListenerReturnValue.mock.calls.length).toBe(2);
    Store.set('changeListenerKey', [1, 2, 3]);
    expect(JestMockListenerReturnValue.mock.calls.length).toBe(2);
  });

  test('test clear key', () => {
    Store.set('willClearKey', 10);
    const JestMockListenerValueAdd = jest.fn(mockListenerValueAdd);
    Store.watch('willClearKey', JestMockListenerValueAdd);
    Store.set('willClearKey', 10);
    expect(JestMockListenerValueAdd.mock.calls.length).toBe(1);
    Store.clear('willClearKey');
    expect(Store.willClearKey).toBeUndefined();
    // clear key 是否清楚了listen以及数据
    Store.set('willClearKey', 20);
    expect(Store.willClearKey).toBe(20);
    expect(JestMockListenerValueAdd.mock.calls.length).toBe(1);
  });

});
