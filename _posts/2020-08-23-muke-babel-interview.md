---
layout: post
title: 慕课网-前端框架及项目面试 聚焦Vue/React/Webpack - 第10章 webpack 和 babel - babel 基本概念串讲
tags:
- Interview
- imooc
- ES6
- webpack
categories: Framework
description: 慕课网-前端框架及项目面试 聚焦Vue/React/Webpack - 第10章 webpack 和 babel
---

# babel 基本概念串讲

**babel**

- 环境搭建 & 基本配置  
- babel-polyfill  
- babel-runtime  

# 环境搭建 and 基本配置

- 环境搭建  
- .babelrc  
- presets 和 plugins  

package.json 中需要安装的

```js
  "devDependencies": {
    "@babel/cli": "^7.7.5",
    "@babel/core": "^7.7.5",
    "@babel/plugin-transform-runtime": "^7.7.5",
    "@babel/preset-env": "^7.7.5"
  },
  "dependencies": {
    "@babel/polyfill": "^7.7.0",
    "@babel/runtime": "^7.7.5"
  }
```

.babelrc

```js
{
    "presets": [
        [
            "@babel/preset-env",
        ]
    ],
    "plugins": []
}
```

- [presets 预设](https://www.babeljs.cn/docs/presets) ，一堆 plugins 的集合，免去配置很多 plugins
- plugins 解析 ES6 不同语法  

src/index.js

```js
const sum = (a, b) => a + b
```

将 ES6 编译成 ES5

```shell
npx babel src/index.js
```

# babel-polyfill 是什么

**什么是 polyfill** 

浏览器补丁，兼容

**[babel-polyfill](https://www.babeljs.cn/docs/babel-polyfill) 是什么**

`core-js` 和 `regenerator`, babel-polyfill 是这两者的集合


- [core-js](https://github.com/zloirock/core-js): 标准库，集合了 ES6+ 新语法的补丁、兼容性

- regenerator: 处理 generator 函数, function* xx(){}

**babel-polyfill 现已被弃用** 

- babel 7.4 之后弃用 babel-polyfill  
- 推荐直接使用 core-js 和 regenerator  

# babel-polyfill 如何按需引入

babel 只关心语法，并不关心 API。

```js
import "@babel/polyfill"

const sum = (a, b) => a + b

// 新的 API
Promise.resolve(100).then(data => data);

// 新的 API
[10, 20, 30].includes(20)

// 语法，符合 ES5 语法规范
// babel不处理模块化（webpack 才会处理模块化）
```

打包之后的结果

```js
"use strict";

require("@babel/polyfill");

var sum = function sum(a, b) {
  return a + b;
}; // 新的 API


Promise.resolve(100).then(function (data) {
  return data;
}); // 新的 API

[10, 20, 30].includes(20);
```

**babel-polyfill 按需引入**

- babel-polyfill 文件较大，集成了 core-js 和 regenerator
- 只有一部分功能，无需全部引入  
- 配置按需引入  

.babelrc

```js
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage",  // 按需引入
                "corejs": 3  // corejs 最新版本
            }
        ]
    ],
    "plugins": [
    ]
}
```

使用的时候不再 import "@babel/polyfill" 引入全部 

打包出来的结果

```js
"use strict";

require("core-js/modules/es.array.includes");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

var sum = function sum(a, b) {
  return a + b;
}; // 新的 API


Promise.resolve(100).then(function (data) {
  return data;
}); // 新的 API

[10, 20, 30].includes(20);
```

# babel-runtime 是什么

**babel-polyfill 的问题**

- 会污染全局  
- 如果做一个独立的 web 系统，则无碍  
- 如果做一个第三方的库 lib，则会有问题  

**babel-polyfill 的问题**

```js
// 新的 API
Promise.resolve(100).then(data => data);

// 新的 API
[10, 20, 30].includes(20)

// 语法，符合 ES5 语法规范
// 不处理模块化（webpack）

// 污染全局环境
// window.Promise1 = function() {}
// Array.prototype.includes1 = function () {}

// 使用方
// window.Promise = 'abc'
// Array.prototype.includes = 100
```

安装 babel-runtime

```js
  "devDependencies": {
    "@babel/plugin-transform-runtime": "^7.7.5",
  },
  "dependencies": {
    "@babel/runtime": "^7.7.5"
  }
```

配置 .babelrc

```js
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage",
                "corejs": 3
            }
        ]
    ],
    "plugins": [
        [
            "@babel/plugin-transform-runtime",
            {
                "absoluteRuntime": false,
                "corejs": 3,
                "helpers": true,
                "regenerator": true,
                "useESModules": false
            }
        ]
    ]
}
```

打包后的结果

```js
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _context;

var sum = function sum(a, b) {
  return a + b;
}; // 新的 API


_promise["default"].resolve(100).then(function (data) {
  return data;
}); // 新的 API


(0, _includes["default"])(_context = [10, 20, 30]).call(_context, 20);
```


# babel 总结

- babel-polyfill 是 core-js 和 regenerator 的集合    
- babel-runtime 解决 babel-polyfill 污染全局的问题  

