# 数据流(Store)
`Stroe`模块提供了最简单的观察者模型。你只需要记住，数据源(储存数据的地方)是唯一的，所有的变化监听设置值通过一个字符串的key来作为统一标识。

## &middot; 使用
1. 引入**Store**模块:
`import { Store } from 'tiny-jstool';`

2. 通过`set`来设置值，通过`watch`或`onChange`来注册监听函数，通过`key`从`Stroe`上面取值。
```javascript
/**
 * 监听函数入参第一个为对象
 * @param {String} key 数据唯一标识
 * @param {*} value 当前更新的值
 * @param {*} preValue 更新前的值
 */
const mockListenerValueAdd = ({ key, value, preValue }) => (42 + value);
Store.watch('singleListenerKey', mockListenerValueAdd);
Store.set('singleListenerKey', 20); // mockListenerValueAdd => 62
Stroe.singleListenerKey; // 20
```
3. 通过`clear`来清除数据(包括监听函数)。
```javascript
Store.set('willClearKey', 10);
Store.willClearKey; // 10
Store.clear('willClearKey');
Store.willClearKey; // undefined
```
## &middot; 注册api
### 注册监听事件
- onChange
- watch
```javascript
/**
 * 注册入参
 * @param {String | String[]} key 需要监听的key或者keys
 * @param {Function} watchHandler 触发的方法
 */
```
*其它说明*
通过`onChange`绑定的监听事件是在值发生变化的时候才触发。`watch`则是每次设置值都会触发。

### 注册值
- set
```javascript
/**
 * 注册值入参
 * @param {String} key 需要存储的key值
 * @param {*} value 需要存储的value值
 */
```

## &middot; 清理api
- removeWatch
- removeOnChange
- clear

```javascript
/**
 * removeWatch/removeOnChange
 * 移除对应的注册的事件
 * @param {string} key
 * @param {Function} 需要移除的方法
 */
 
/**
 * clear，移除key储存的数据以及对应的监听事件
 * @param {String} key
 */
```

# 类型检测(TestType)
类型检测由`TestType`模块提供，给予了一系列方便的单类型检测以及比较的方法。

## &middot; 使用

1. 引入**TestType**模块:
`import { TestType } from 'tiny-jstool';`

2. 模块的所有方法均挂载在TestType对象下。根据接下来罗列的api直接调用即可:
```javascript
TestType.isEqual({ list: [1, 2, 3] }, { list: [1, 2, 3] }, { list: [1, 2, 3] }); // true
```

## &middot; 类型检测

**类型检测**提供**单个入参**的类型检测。它永远返回一个布尔值，表示入参是否为该类型。

*提供api*
- isString
- isNumber
- isBool
- isUndefined
- isNull
- isFunction
- isArray
- isObject
- isNaN
- isObjectType
- isBasicType

*示例*
```javascript
TestType.isArray([1, 2, 3]); // true
TestType.isNaN(NaN); // true
```

*其它说明*

`isObjectType`指**引用类型**检测。即变量实质保存的非值，而是值的引用地址这些类型。如:`Object/Array/Function/Set/Map`等。`isBasicType`则为
非`ObjectType`外的所有值。

## &middot; 类型比较
**类型比较**提供类型的匹配以及获取类型。

*类型定义*
```javascript
/**
 * Enum for typeName
 * @readonly
 * @enum {String}
 */
export const TYPE_NAME_MAP = {
  StringName: 'string',
  NumberName: 'number',
  BooleanName: 'boolean',
  UndefinedName: 'undefined',
  NullName: 'null',
  FunctionName: 'function',
  ObjectName: 'object',
  ArrayName: 'array',
  AnyType: 'any',
};
```
*提供api*
- getType
- isMatchTypes
- isOneOfTypes

*示例*
```javascript
// getType
TestType.getType(13); // number
TestType.getType([1, 2, 3]) // array

/**
 * isMatchTypes
 * @param {String[]} types
 * @param {Any[]} targets
 * @return {Boolean} isMatchType
 */
TestType.isMatchTypes(['number', 'object', 'function'], [-3, {}, () => {}]); // true
// any 可以拓展任意长度参数
TestType.isMatchTypes(['undefined', 'any', 'any'], [undefined]); // true
TestType.isMatchTypes(['number'], [undefined, '', true]); // false

/**
 * isOneOfTypes
 * @param {String[]} types
 * @param {*} target
 * @return {Boolean} isMatchType
 */
 TestType.isOneOfTypes(['number', 'object', 'function'], 3); // true
 TestType.isOneOfTypes(['number', 'object', 'function'], null); // false
```
*其它说明*

`TYPE_NAME_MAP`外的类型，引用类型一概返回`object`，基本类型一概返回`null`。


## &middot; 值比较

**类型比较**提供**任意数量入参**的比较。它永远返回一个布尔值，所有入参根据规则比较是否相等。

*提供api*
- isSame
- isEqual

*示例*
```javascript
TestType.isSame(1, 2, 3, 4); // false
TestType.isEqual(1, 2, 3, 4); // false

TestType.isSame(NaN, NaN, NaN, NaN); // true
TestType.isEqual(NaN, NaN, NaN, NaN); // true

TestType.isSame([], [], []); // false
TestType.isEqual([], [], []); // true

TestType.isSame({ list: [1, 3, 3] }, { list: [1, 2, 3] }, { list: [1, 2, 3] }); // false
TestType.isEqual({ list: [1, 3, 3] }, { list: [1, 2, 3] }, { list: [1, 2, 3] }); //true
```
*其它说明*

`isSame`指值是否一致，引用类型会去比较是否是同一个引用来源。`isEqual`指值是否相等。数组和对象会去比较key与value的值是否相等。

# 容错(ErrorCatcher)
**容错**提供**调用**的错误检测，在调用方法前能够抛出错误，阻止不期望的调用方式。

## &middot; 使用

1. 引入**ErrorCatcher**模块:
`import { ErrorCatcher } from 'tiny-jstool';`

2. 模块的所有方法均挂载在ErrorCatcher对象下。根据接下来罗列的api直接调用即可:
```javascript
const catchedHandler = ErrorCatcher.matchParamsType(time => time + 10, ['number']);
```

## &middot; 函数调用

*提供api*
- matchParamsType

*示例*
```javascript
/**
 * matchParamsType
 * @param {Function} handler 需要包装的函数
 * @param {String[]} types 类型列表
 * @return {Function}
 */
const demoFunction = (value) => (42 + value);
const catchedDemoFunction = ErrorCatcher.matchParamsType(demoFunction, ['number']);
catchedDemoFunction(18); // 60
catchedDemoFunction('13'); // TypeError `arguments should be number, but now get string`
```
*其它说明*

当不确定函数入参类型的时候，可以用any扩充。`matchParamsType`只会进行匹配types数量的入参。
