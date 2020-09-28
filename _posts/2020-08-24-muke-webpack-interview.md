---
layout: post
title: 慕课网-前端框架及项目面试 聚焦Vue/React/Webpack - 第10章 webpack 和 babel - webpack面试真题
tags:
- Interview
- imooc
- vue
- webpack
categories: Framework
description: 慕课网-前端框架及项目面试 聚焦Vue/React/Webpack - 第10章 webpack 和 babel
---

# webpack面试真题

# 前端代码为何要打包-one

**代码相关：**

- 体积更小（Tree-Shaking、压缩、合并），加载更快  
- 编译高级语言或语法（TS，ES6+，模块化，scss）  
- 兼容性和错误检查（Polyfill、postcss、eslint）  

**研发流程：**

- 统一、高效的开发环境  
- 统一的构建流程和产出标准  
- 集成公司构建规范（提测、上线）

# module chunk bundle 的区别

- module - 各个源码文件，webpack 中中一切皆是模块  
- chunk - 多模块合并成的，比如 entry、import、splitChunk   
- bundle - 最终输出文件  

# loader 和 plugin 的区别

- loader 模块转换器，如 less -> css  
- plugin 扩展插件，如 HtmlWebpackPlugin  

# 常见 loader 和 plugin 有哪些

**常见 loader**

[https://www.webpackjs.com/concepts/loaders/](https://www.webpackjs.com/concepts/loaders/)

- 样式：style-loader、css-loader、less-loader、sass-loader等  
- 文件：raw-loader、file-loader 、url-loader等  
- 编译：babel-loader、coffee-loader 、ts-loader等  
- 校验测试：mocha-loader、jshint-loader 、eslint-loader等  

**常见 plugin**

- [https://www.webpackjs.com/concepts/plugins/](https://www.webpackjs.com/concepts/plugins/)

- 首先 webpack 内置 `UglifyJsPlugin`，压缩和混淆代码。  
- webpack 内置 `CommonsChunkPlugin`，提高打包效率，将第三方库和业务代码分开打包。  
- `ProvidePlugin`：自动加载模块，代替 require 和 import  

```js
 new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  })
```

- `html-webpack-plugin` 可以根据模板自动生成 html 代码，并自动引用 css 和 js 文件  
- `extract-text-webpack-plugin` 将 js 文件中引用的样式单独抽离成 css 文件  
- `DefinePlugin` 编译时配置全局变量，这对开发模式和发布模式的构建允许不同的行为非常有用。  

```js
new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true),
  VERSION: JSON.stringify("5fa3b9"),
  BROWSER_SUPPORTS_HTML5: true,
  TWO: "1+1",
  "typeof window": JSON.stringify("object")
})
```

- `HotModuleReplacementPlugin` 热更新  
- 添加 `HotModuleReplacementPlugin`  

	◦	entry中添加 "webpack-dev-server/client?http://localhost:8080/",
	◦	entry中添加 "webpack/hot/dev-server"
	◦	(热更新还可以直接用webpack_dev_server --hot --inline,原理也是在entry中添加了上述代码)  
	
- webpack 内置的 `DllPlugin` 和 `DllReferencePlugin` 相互配合，前置第三方包的构建，只构建业务代码，同时能解决 Externals 多次引用问题。DllReferencePlugin 引用 DllPlugin 配置生成的 manifest.json 文件, manifest.json 包含了依赖模块和 module id 的映射关系   
- `optimize-css-assets-webpack-plugin` 不同组件中重复 css 可以快速去重   
- `webpack-bundle-analyzer` 一个 webpack 的 bundle 文件分析工具，将 bundle 文件以可交互缩放的 treemap 的形式展示。  
- `compression-webpack-plugin` 生产环境可采用 gzip 压缩 JS 和 CSS   
- `happypack`：通过多进程模型，来加速代码构建  

# babel 和 webpack 的区别

- babel - JS 新语法编译工具，不关心模块化，不关心 API  
- webpack - 打包构建工具，是多个 loader plugin 的集合  

# 如何产出一个 lib

- 参考 webpack.dll.js  
- output.library  

```js
output:{
    // lib 的文件名
    filename: 'loader.js',
    // 输出 lib 到 dist 目录下
    path: distPath,
    // lib 的全局变量名
    library: 'lodash'
}
```

# babel-polyfill 和 babel-runtime 的区别

- babel-polyfill 会污染全局  
- babel-runtime 不会污染全局  
- 产出第三方 lib 要用 babel-runtime

# webpack 如何实现懒加载

- import()  
- 结合 Vue 、React 异步组件  
- 结合 Vue-router 、React-router 异步加载路由  

# 为何 Proxy 不能被 Polyfill

- class 可以用 function 模拟  
- Promise 可以用 callback 来模拟  
- 但 Proxy 的功能用 Object.defineProperty 无法模拟  

# webpack 优化构建速度（可用于生产环境）

- babel-loader 开启缓存  
- IgnorePlugin 避免引入无用模块  
- noParse 避免重复打包  
- happyPack 开启多进程打包  
- ParallelUglifyPlugin 多进程压缩 JS  

# webpack 优化构建速度（不可用于生产环境）

- 自动刷新 watch: true  
- 热更新 hot: true  
- DllPlugin 第三方库，不常升级版本  

# webpack 优化产出代码

- 小图片 base64 编码  
- bundle 加 hash  
- 懒加载  
- 提取公共代码  
- 使用 CDN  
- IgnorePlugin  
- 使用 production   
- Scope Hosting 作用域提升，自动优化代码，去除没必要的啰嗦的代码 