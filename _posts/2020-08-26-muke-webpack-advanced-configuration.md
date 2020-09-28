---
layout: post
title: 慕课网-前端框架及项目面试 聚焦Vue/React/Webpack - 第10章 webpack 和 babel - webpack 高级配置
tags:
- Interview
- imooc
- optimize
- webpack
categories: Framework
description: 慕课网-前端框架及项目面试 聚焦Vue/React/Webpack - 第10章 webpack 和 babel
---

# webpack 高级配置

❶ 多入口配置 entry  
❷ 抽离 css 文件，mini-css-extract-plugin.loader【常用】  
❸ 抽离公共代码, chunks、splitChunks、cacheGroups【常用】  
❹ 懒加载, import()【常用】  
❺ 处理 JSX  
❻ 处理 Vue  

## webpack 如何配置多入口 - entry

build-multi-entry/webpack.common.js

修改 entry 和 new HtmlWebpackPlugin()

```js
module.exports = {
    entry: {
        index: path.join(srcPath, 'index.js'),
        other: path.join(srcPath, 'other.js')
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: path.join(srcPath, 'index.html'),
        //     filename: 'index.html'
        // })

        // 多入口 - 生成 index.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html',
            // chunks 表示该页面要引用哪些 chunk (即上面的 index 和 other)
            chunks: ['index'] // 只引用 index.js
        }),

        // 多入口 - 生成 other.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'other.html'),
            filename: 'other.html',
            chunks: ['other']  // 只引用 other.js
        })
    ]
}
```


build-multi-entry/webpack.prod.js

修改 output

```js
    output: {
        // filename: 'bundle.[contentHash:8].js',  // 打包代码时，加上 hash 戳
        filename: '[name].[contentHash:8].js', // name 即多入口时 entry 的 key
        path: distPath,
    },
```

## mini-css-extract-plugin 抽离压缩 css 文件

关键代码 webpack.prod.js

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')

module.exports = merge(webpackCommonConf, {
    module: {
        rules: [
            // 抽离 css
            {
                test: /\.css$/,
                loader: [
                    MiniCssExtractPlugin.loader, // 注意，这里不再用 style-loader
                    'css-loader',
                    'postcss-loader'
                ]
            },
            // 抽离 less --> css
            {
                test: /\.less$/,
                loader: [
                    MiniCssExtractPlugin.loader, // 注意，这里不再用 style-loader
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ]
            },
        ]
    },
    plugins: [
        // 抽离 css 文件
        new MiniCssExtractPlugin({
            filename: 'css/main.[contentHash:8].css'
        })
    ],
    optimization: {
        // 压缩 css
        minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin({})]
    }
})
```

### build-min-extract-css demo

build-min-extract-css/webpack.devjs

开发环境下，使用 style-loader 将 css 用 style 标签的方式插入页面

```js
const path = require('path')
const webpack = require('webpack')
const webpackCommonConf = require('./webpack.common.js')
const { merge } = require('webpack-merge')

module.exports = merge(webpackCommonConf, {
    mode: 'development',
    module: {
        rules: [
            // 直接引入图片 url
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'file-loader'
            },
            {
                test: /\.css$/,
                // loader 的执行顺序是：从后往前
                loader: ['style-loader', 'css-loader', 'postcss-loader'] // 加了 postcss
            },
            {
                test: /\.less$/,
                // 增加 'less-loader' ，注意顺序
                loader: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            // window.ENV = 'development'
            ENV: JSON.stringify('development')
        })
    ],
})
```

build-min-extract-css/webpack.prod.js

生产环境，抽离 css, 压缩 css

```js
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackCommonConf = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const { srcPath, distPath } = require('./paths')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')

module.exports = merge(webpackCommonConf, {
    mode: 'production',
    output: {
        filename: 'bundle.[contentHash:8].js',  // 打包代码时，加上 hash 戳
        path: distPath,
    },
    module: {
        rules: [
            // 抽离 css
            {
                test: /\.css$/,
                loader: [
                    MiniCssExtractPlugin.loader, // 注意，这里不再用 style-loader
                    'css-loader',
                    'postcss-loader'
                ]
            },
            // 抽离 less --> css
            {
                test: /\.less$/,
                loader: [
                    MiniCssExtractPlugin.loader, // 注意，这里不再用 style-loader
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
        new webpack.DefinePlugin({
            // window.ENV = 'production'
            ENV: JSON.stringify('production')
        }),
        // 抽离 css 文件
        new MiniCssExtractPlugin({
            filename: 'css/main.[contentHash:8].css'
        })
    ],
    optimization: {
        // 压缩 css
        minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin({})]
    }
})
```

terser-webpack-plugin3 打包的时候不知道为啥会报错，terser-webpack-plugin2 不会报错

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

### build-splitChunks demo

src/index.js

```js
// 引入 公共代码 math.js
import { sum } from './math'

const sumRes = sum(10, 20)
console.log('sumRes', sumRes)

// 引入第三方模块
import _ from 'lodash'
console.log(_.each)
```

src/other.js

```js
// 引入 公共代码 math.js
import { sum } from './math'

const sumRes = sum(10, 20)
console.log('sumRes', sumRes)
```

src/math.js

```js
export const sum = (a, b) => {
    return a + b
}
```

build-splitChunks/webpack.common.js

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath, distPath } = require('./paths')

module.exports = {
    entry: {
        index: path.join(srcPath, 'index.js'),
        other: path.join(srcPath, 'other.js')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                include: srcPath,
                exclude: /node_modules/
            }
        ]
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
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackCommonConf = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const { srcPath, distPath } = require('./paths')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')

module.exports = merge(webpackCommonConf, {
    mode: 'production',
    output: {
        filename: '[name].[contentHash:8].js',  // 打包代码时，加上 hash 戳
        path: distPath,
        // publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
    },
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
            // 抽离 css
            {
                test: /\.css$/,
                loader: [
                    MiniCssExtractPlugin.loader, // 注意，这里不再用 style-loader
                    'css-loader',
                    'postcss-loader'
                ]
            },
            // 抽离 less --> css
            {
                test: /\.less$/,
                loader: [
                    MiniCssExtractPlugin.loader, // 注意，这里不再用 style-loader
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
        new webpack.DefinePlugin({
            // window.ENV = 'production'
            ENV: JSON.stringify('production')
        }),
        // 抽离 css 文件
        new MiniCssExtractPlugin({
            filename: 'css/main.[contentHash:8].css'
        })
    ],
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
})
```

## webpack 如何实现异步加载 JS

懒加载语法： `import('文件名')`，

src/index.js

```js
// 这是同步语法
import './style/style1.css'
import { sum } from './math'

// 引入动态数据 - 懒加载，异步加载
setTimeout(() => {
  // 定义（将会产出）chunk
	import('./dynamic-data.js').then((res) => {
        console.log(res.default.message)  // 注意这里的 default
	})
}, 1500)
```

## 处理 jsx - @babel/preset-react

[https://www.babeljs.cn/docs/](https://www.babeljs.cn/docs/)

```js
npm install --save-dev @babel/preset-react
```

.babelrc 中配置

```js
{
    "presets":["@babel/preset-react"]
}
```

## 处理 vue 文件用 ‘vue-loader’

## module chunk bundle 的区别

- module - src 下除 index.html 的各个源码文件，任何可以被导入导出的文件都是一个模块【.css.js.img】  
- chunk - 多模块合并成的，代码块的类型：  
    + webpack 配置中入口文件 entry 是 chunk  
    + 入口文件以及它的依赖文件通过动态加载 import() / require.ensure() 出来的模块是 chunk  
    + 通过 SplitChunks 抽取出的公有代码也是 chunk  
- bundle - webpack打包出来的代码文件，也可以理解为对 chunk 编译/压缩打包等处理后的产出  

<div class="rd">
    <img src="/assets/images/2020/7-8-9/8-26-1.png" alt="">
</div>

左中右依次对应 module、chunk、bundle

