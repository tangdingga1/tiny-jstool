# tiny-jstool &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) ![npm version](https://img.shields.io/npm/v/tiny-jstool.svg?style=flat)

## 介绍
tiny-jstool 是一个简单轻便的JavaScript库。秉承精简轻便的概念，尝试给出当前工程化背景下一些开发所需的通用逻辑解决方案。如：数据流响应，函数容错，类型变化检测等。

## 使用

### 开发时(github)

**开启运行时**
1. 使用`ssh`或者`http`方式下载github包到本地。
2. 进入代码包目录，调用`npm install`命令安装依赖。
3. 使用`npm run start`，启用开发环境。
4. `packages/entry.js`下进行库的使用。

**开发调试测试**
- 开发请遵循[eslit](https://eslint.org/)规范。具体配置参见`./.eslintrc.json`。运行`npm run lint`，进行规范检测。
- 测试使用的是[jest](https://github.com/facebook/jest)框架。运行`npm run test`，进行测试。

### 运行时(npm)


## 文档

### 数据流响应(Store)
@todo

### 容错(ErrorCatcher)
@todo

### 类型检测(TestType)
类型检测由`TestType`模块提供，给予了一系列方便的单类型检测以及比较的方法。

#### &middot; 使用

1. 引入**TestType**模块:
`import { TestType } from 'tiny-jstool';`

2. 模块的所有方法均挂载在TestType对象下。根据接下来罗列的api直接调用即可:
```javascript
TestType.isEqual({ list: [1, 2, 3] }, { list: [1, 2, 3] }, { list: [1, 2, 3] }); // true
```

#### &middot; 类型检测

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

#### &middot; 类型比较

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

## 单测 UT
模块名 | % stmts  | % Lines |
---|---|---|
ALL | 开发中 | 开发中 |
Store | 85.71 |  85.71 |
ErrorCatcher | 开发中 | 开发中 |
TestType | 97.37 | 97.37 |

## 开源协议 License
[MIT licensed](./LICENSE).
