import { isArray } from '../testType';

/**
 * @param {Array} list 需要检测的list
 * @param {String} key keyName
 */
export function findListenerIndex(list, key) {
  return list.findIndex(item => {
    return (
      item.key === key
      &&
      isArray(item.listeners)
    )
  });
}
