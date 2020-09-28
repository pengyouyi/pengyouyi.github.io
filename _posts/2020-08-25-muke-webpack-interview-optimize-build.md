---
layout: post
title: 慕课网-前端框架及项目面试 聚焦Vue/React/Webpack - 第10章 webpack 和 babel - webpack 优化构建速度 & 优化产出代码
tags:
- Interview
- imooc
- optimize
- webpack
categories: Framework
description: 慕课网-前端框架及项目面试 聚焦Vue/React/Webpack - 第10章 webpack 和 babel
---

# webpack 优化构建速度 & 优化产出代码

**webpack 性能优化**

- 优化打包构建速度 - 开发体验和效率  
- 优化产出代码 - 产品性能  

# webpack 优化构建速度

**webpack 性能优化 - 构建速度**

- babel-loader 开启缓存  
- IgnorePlugin 避免引入无用模块  
- noParse 避免重复打包  
- happyPack 多进程打包  
- ParallelUglifyPlugin 多进程压缩 JS  
- 自动刷新 watch: true  
- 热更新 hot: true  
- DllPlugin 第三方库，不常升级版本  

## babel-loader 开启缓存

```js
rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader?cacheDirectory',  // 开启缓存
                    include: path.resolve(__dirname, 'src'),  // 明确范围
                    // include 和 exclude 两者选一个即可
                    exclude: path.resolve(__dirname, 'node_modules')  // 排除范围
                }

            },
        ]
```

## IgnorePlugin 避免引入无用模块

[Moment.js JavaScript 日期处理类库](http://momentjs.cn/)

**示例： mementjs 多语言支持**

- import moment from 'moment'  
- 默认会引入所有语言 JS 代码，代码过大  
- 如何只引用中文或者英文  

### 如果不使用 IngorePlugin 示例

index.js

```js
import moment from 'moment'
moment.locale('zh-cn')  // 设置语言为中文
console.log('local', moment.locale())
console.log('date', moment().format('ll'))
```

这样打包产出的 index.js 体积大，因为引入了moment中所有的语言包locale

### 使用 IngorePlugin 示例

build/webpack.prod.js

```js
plugins: [
        // 忽略moment 下的/locale 目录
        new webpack.IgnorePlugin(/\.\/locale/, /moment/)
    ],
```

index.js

```js
// import moment from 'moment'
import 'moment/locale/zh-cn'  // 手动引入中文语言包
moment.locale('zh-cn')  // 设置语言为中文
console.log('local', moment.locale())
console.log('date', moment().format('ll'))
```

## noParse 避免重复打包

```js
module.exports = {
    module: {
        // 独完整的 ’react.min.js‘ 文件就没有采用模块化
        //忽略对 ’react.min.js‘ 文件的递归解析处理
        noParse: [/react\.min\.js$],
    }
}
```

### IgnorePlugin VS noParse

- IgnorePlugin 直接不引入，代码中没有  
- noParse 引入，但不打包  

## happyPack 多进程打包

- JS 单线程，开启多进程打包  
- 提高构建速度（特别是多核 CPU）

build-optimization/webpack.dev.js

```js
rules: [
  {
      test: /\.js$/,
      loader: ['babel-loader'],
      include: srcPath,
      exclude: /node_modules/
  },
]
```

build-optimization/webpack.prod.js

```js
const HappyPack = require('happypack')

module: {
	rules: [
	  {
	      test: /\.js$/,
	      // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
	      use: ['happypack/loader?id=babel'],   
	      include: srcPath,  // 明确范围
	      // exclude: /node_modules/  // 排除范围
	  },
	]
},
plugins: [
   // happyPack 开启多进程打包
   new HappyPack({
       // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
       id: 'babel',
       // 如何处理 .js 文件，用法和 Loader 配置中一样
       loaders: ['babel-loader?cacheDirectory']
   }),
],
```

## ParallelUglifyPlugin 多进程压缩 JS

- webpack 内置 Uglify 工具压缩 JS  
- JS 单线程，开启多进程压缩更快  
- 和 happyPack 同理  

**关于开启多进程**

- 项目较大，打包较慢，开启多进程能提高速度  
- 项目较小，打包很快，开启多进程会降低速度（进程开销）  
- 按需使用  

## 自动刷新 watch: true

build-optimization/webpack.dev.js

```js
    watch: true, // 开启监听，默认为 false
    watchOptions: {
        ignored: /node_modules/, // 忽略哪些
        // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
        // 默认为 300ms
        aggregateTimeout: 300,
        // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
        // 默认每隔1000毫秒询问一次
        poll: 1000
    }
```

## 热更新 hot: true

- 自动刷新：整个网页全部刷新，速度较慢  
- 自动刷新：整个网页全部刷新，状态会丢失  
- 热更新：新代码生效，网页不刷新，状态不丢失  


build-optimization/webpack.dev.js

```js
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
module.exports = {
    entry: {
        index: [
            'webpack-dev-server/client?http://localhost:8080/',
            'webpack/hot/dev-server',
            path.join(srcPath, 'index.js')
        ],
        other: path.join(srcPath, 'other.js')
    },
    plugins: [
        new HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 8080,
        progress: true,  // 显示打包的进度条
        contentBase: distPath,  // 根目录
        open: true,  // 自动打开浏览器
        compress: true,  // 启动 gzip 压缩

        hot: true,
    },
}
```

## DllPlugin 动态链接库插件

- 前端框架如 vue React,体积大，构建慢  
- 较稳定，不常升级版本  
- 同一个版本只构建一次即可，不用每次都重新构建  


- webpack 已内置 DllPlugin 支持  
- DllPlugin - 打包出 dll 文件  
- DllReferencePlugin - 使用 dll 文件  


## webpack优化构建速度-总结

**webpack优化构建速度(可用于生产环境)**

- babel-loader 缓存  
- IgnorePlugin 避免引入无用模块  
- noParse 避免重复打包  
- happyPack 开启多进程打包  
- ParallelUglifyPlugin 多进程压缩 JS  

**webpack优化构建速度(不可用于生产环境)**

- 自动刷新  
- 热更新  
- DllPlugin  

# webpack优化产出代码【重要】

- 体积更小  
- 合理分包，不重复加载  
- 速度更快，内存使用更小 

**怎样做**

- 小图片 base 64 编码   
- bundle 加 hash  
- 懒加载  
- 提取公共代码  
- IgnorePlugin  
- 使用 CDN 加速  
- 使用 production  
- Scope Hosting  


## 小图片 base 64 编码

```js
    module: {
        rules: [
            // 图片 - 考虑 base64 编码的情况
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // 小于 5kb 的图片用 base64 格式产出
                        // 否则，依然延用 file-loader 的形式，产出 url 格式
                        limit: 5 * 1024,

                        // 打包到 img 目录下
                        outputPath: '/img1/',

                        // 设置图片的 cdn 地址（也可以统一在外面的 output 中设置，那将作用于所有静态资源）
                        // publicPath: 'http://cdn.abc.com'
                    }
                }
            },
        ]
    },
```

## bundle 加 hash

```js
output: {
        filename: 'bundle.[contentHash:8].js',  // 打包代码时，加上 hash 戳
        path: distPath,
    },
```

## IgnorePlugin

## webpack 如何实现懒加载

- 懒加载语法： `import('文件名')`  
- 结合 Vue 、React 异步组件  、
- 结合 Vue-router 、React-router 异步加载路由 

## splitChunks 抽离公共代码和第三方代码

build-splitChunks/webpack.common.js

```js
module.exports = {
    entry: {
        index: path.join(srcPath, 'index.js'),
        other: path.join(srcPath, 'other.js')
    },
    plugins: [
        // 多入口 - 生成 index.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html',
            // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
            chunks: ['index', 'vendor', 'common']  // 要考虑代码分割
        }),
        // 多入口 - 生成 other.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'other.html'),
            filename: 'other.html',
            chunks: ['other', 'common']  // 考虑代码分割
        })
    ]
}
```

build-splitChunks/webpack.prod.js

```js
    optimization: {
        // 压缩 css
        minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin({})],
        // 分隔代码块
        splitChunks: {
            chunks: 'all',
            /**
            * initial 入口 chunk, 对于一部导入的文件不处理
            * async 异步 chunk , 只对异步导入的文件处理
            * all 全部 chunk
            **/

            // 缓存分组
            cacheGroups: {
                // 第三方模块
                vender: {
                    name: 'vender',  // chunk 名称
                    priority: 1,  // 权限更高，优先抽离，重要！！！
                    test: /node_modules/,  
                    minSize: 0,  // 大小限制
                    minChunks: 1  // 最少复用过几次
                },
                // 公共的模块
                common: {
                    name: 'common',  // chunk 名称
                    priority: 0,  // 优先级
                    minSize: 0,  // 公共模块的大小限制
                    minChunks: 2  // 公共模块最少复用过几次
                }
            }
        }
    }
```

## 使用 CDN 加速

webpack.prod.js

output 中 publicPath

```js
output: {
        filename: '[name].[contentHash:8].js', // name 即多入口时 entry 的 key
        path: distPath,
        publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
    },
```

打包出 dist/index.html 中引用的地址是

```html
<script type="text/javascript" src="http://cdn.abc.com/common.533f9fc1.js">
```

然后将打包出的 css 、img 和 js 文件上传到域名为 http://cdn.abc.com 的服务器上

## 使用 production 模式的好处

- 自动开启代码压缩  
- Vue React 等会自动删掉调试代码（如开发环境的 warning）  
- 启动 Tree-Shaking【ES6 Module 才能让 tree-shaking 生效，commonjs 就不行】  

### ES Module 和 Commonjs 的区别

- ES6 Module 静态引入，编译时引入  
- Commonjs 动态引入，执行时引入  
- 只有 ES6 Module 才能静态分析，实现 Tree-Shaking  

Commonjs

```js
let apiList = require('../config/api.js')
if (isDev) {
    // 可以动态引入，执行时引入
    apiList = require('../config/api_dev.js')
}
```

ES Module

```js
import apiList from '../config/api.js'
if (isDev) {
    // 编译时报错，只能静态引入
    import apiList form  '../config/api_dev.js'
}
```

## Scope Hosting：作用域提升

- 代码体积更小  
- 创建函数作用域更小  
- 代码可读性更好  

如果我们写一段很低级的代码，如下：

```js
let a = 1;
let b = 2;
let c = 3;
let d = a + b + c;   
// 在webpack中会自动省略一些可以简化的代码
// 简化后的代码如下：console.log(6);
console.log(d);
```

在生产模式下打包后，webpack会自动优化代码，去除没必要的啰嗦的代码。
