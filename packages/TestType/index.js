import * as isType from './isType';
import * as compareType from './compareType';
import * as compareValue from './compareValue';

export default Object.freeze(
  Object.assign(
    Object.create(null),
    isType,
    compareType,
    compareValue
  )
);
