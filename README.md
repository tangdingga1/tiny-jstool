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
1. 安装包。`npm i -D tiny-jstool`
2. 引入使用。`import { ErrorCatcher } from 'tiny-jstool';`

## 使用文档
[DOC.md](https://github.com/tangdingga1/tiny-jstool/blob/master/DOC.md)

## 单测 UT
模块名 | % stmts  | % Lines |
---|---|---|
ALL | 94.12 | 94.83 |
Store | 86.05 |  87.8 |
ErrorCatcher | 100 | 100 |
TestType | 98.39 | 98.39 |

## 开源协议 License
[MIT licensed](./LICENSE).
