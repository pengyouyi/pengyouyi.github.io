---
layout: post
title: 慕课网-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第2章 ES6 语法 - Module
tags:
- Interview
- imooc
- ES6
- Module
categories: JS
description: 慕课网-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第2章 ES6 语法 - Module
---

慕课网学习笔记-前端跳槽面试必备技巧（快乐动起来呀）- 第2章 ES6 语法 - Module

# ES6-begin

- 开发环境已经普及使用

- 浏览器环境却支持不好（需要开发环境编译）

- 重点了解常用语法

- 面试：开发环境的使用 + 重点语法的掌握

# ES6-Module模块化

**ES6模块化如何使用？开发环境如何打包？**

- 模块化的基本语法
- 开发环境配置
- 关于JS众多模块化标准

[Module 的语法](http://es6.ruanyifeng.com/#docs/module)

## ES6 模块的出现

在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。

ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

## ES6 模块的好处

⓵ ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。

⓶ 不再需要UMD模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。

⓷ 将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。

## ES6 模块的设计思想

ES6 模块的设计思想是尽量的`静态化`，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。

```js
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

上面代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取 3 个方法。这种加载称为“`运行时加载`”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

```js
// ES6模块
import { stat, exists, readFile } from 'fs';
```

上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。这种加载称为“`编译时加载`”或者`静态加载`，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。

ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。

## Module & CommonJS

ES6 模块与 CommonJS 模块的差异

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用

- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口

# es6模块化语法

export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。

## **export**

```js
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;

export function multiply(x, y) {
  return x * y;
};
```

```js
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};
```

export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，下一节的import命令也是如此。

## **export default**

```js
// export-default.js
export default function () {
  console.log('foo');
}
```

```js
// import-default.js
import customName from './export-default';
customName(); // 'foo'
```

export default命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此export default命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应export default命令。

```js
// 第一组
export default function crc32() { // 输出
  // ...
}

import crc32 from 'crc32'; // 输入

// 第二组
export function crc32() { // 输出
  // ...
};

import {crc32} from 'crc32'; // 输入
```

## **import**

```js
// main.js
import {firstName, lastName, year} from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```

import命令具有提升效果，会提升到整个模块的头部，首先执行。

由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。

## **import \***

```js
// circle.js

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}
```

```js
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

# 模块化-babel

[babel初学](http://pengyouyi.site/js/2016/10/04/Babel)

⓿ **babel安装**

```bash
npm init

npm install babel-cli -g

npm install babel-core babel-preset-es2015 babel-preset-latest --save-dev
```

❷ **创建.babelrc文件**

```js
{
  "presets": ["es2015"]
}
```

❸ **babel执行**

测试文件src/index.js
```js
[1,2,3].map((item, index) => {
    return item * 2;
})
```

执行
```
babel src/index.js
```

得到编译后的文件
```js
[1, 2, 3].map(function (item, index) {
    return item * 2;
});
```

# 模块化 - webpack

[Webpack初学](http://pengyouyi.site/js/2016/09/20/webpack)

❶ **webpack安装及其依赖插件**

```bash
npm install webpack babel-loader --save-dev
sudo cnpm i webpack-cli -g
cnpm install webpack-dev-sever --save-dev
```

❷ **配置webpack.config.js**

```js
module.exports = {
    entry: './src/index',
    output: {
        path: __dirname,
        filename: './build/bundle.js'
    },
    module: {
      rules: [{
          test: /\.js?$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader'
      }]
    }
}
```

❸ **配置package.json中的scripts**

```js
  "scripts": {
    "start": "webpack"
  },
```

package.json详细

```json
{
  "name": "",
  "version": "",
  "scripts": {
    "start": "webpack"
  },
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.4",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-latest": "^6.24.1",
    "webpack": "^4.5.0",
    "webpack-cli": "^2.0.14",
    "webpack-dev-server": "^3.1.3"
  }
}
```

❹ **测试index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="../build/bundle.js"></script>
</head>
<body>
    
</body>
</html>

```

❺ **运行webpack**

执行

```bash
npm start 或 webpack
```

浏览器打开 http://127.0.0.1:8080/

```bash
webpack-dev-server
```

# 模块化 - rollup简介

**rollup功能单一，webpack功能强大**

参考设计原则和《linux/Unix设计思想》

[rollupjs](https://rollupjs.org/guide/en)

```bash
npm init

sudo cnpm install rollup -g
cnpm i rollup-plugin-node-resolve rollup-plugin-babel babel-plugin-external-helpers babel-preset-latest babel-core --save-dev 
```

配置.babelrc

配置rollup.config.js

修改package.json中的scripts

# 模块化-summary

- 没有模块化
- AMD称为标准，require.js(也有CMD)
- 前端打包工具，nodejs模块化可以被使用
- ES6出现，想统一现在所有模块化标准
- nodejs积极支持，浏览器尚未统一
- 可以自造lib,但不要自造标准

**ES6模块化如何使用？开发环境如何打包？**

- 语法：import export （注意有无default）

- 环境：babel 编译ES6语法，模块化可以使用webpack和rollup

- 扩展：说一下自己对模块化标准统一的期待


# 更多-more

[揭秘一线互联网企业 前端JavaScript高级面试](https://coding.imooc.com/learn/list/190.html)

[ECMAScript 6 入门-阮一峰](http://es6.ruanyifeng.com/)

[ES6之Module 的加载实现](https://blog.csdn.net/tian361zyc/article/details/72834288)

