// use demo
import { Store } from './index';

Store.watch('name', function({ key, value }) {
  console.log(key, value);
});

Store.set('name', 123);
