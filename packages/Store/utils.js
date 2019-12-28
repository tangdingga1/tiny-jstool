import { isArray, isString } from '../TestType/isType';

/**
 * @param {String | String[]} key 需要转为数组的key
 * @return {String[]} keylist
 */
export function transKeyListByKey(key) {
  if (isString(key)) {
    return [key];
  }
  if (isArray(key)) {
    return key;
  }
  return [];
}
