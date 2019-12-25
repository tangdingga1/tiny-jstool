import STORE_PROTOTYPE from './StorePrototype';
import { WATCH_LIST } from './constant';

const STORE = Object.create(STORE_PROTOTYPE);

// @type WATCH_LIST { key: string, listeners: Function[] }
Object.defineProperty(STORE, WATCH_LIST, {
  value: [],
  writable: true,
  configurable: true,
});

export default STORE;
