---
layout: post
title: 慕课网-前端框架及项目面试 聚焦Vue/React/Webpack - 第10章 webpack 和 babel - webpack 基本配置
tags:
- Interview
- imooc
- optimize
- webpack
categories: Framework
description: 慕课网-前端框架及项目面试 聚焦Vue/React/Webpack - 第10章 webpack 和 babel
---

# webpack 基本配置

- 拆分配置和 merge  【 webpack.common.js/webpack.dev.js/webpack.prod.js等，需要安装 'webpack-merge' 】  
- 启动本地服务 【 跨域访问 api,配置 proxy 代理 】  
- 处理 ES6 【 使用 babel-loader 】  
- 处理样式  
- 处理图片 【处理体积小的图片转换成 base 64】  
- （模块化）

## 处理样式 css-loader

- loader 的执行顺序是：从后往前  
- css-loader  【加载.css文件】  
- style-loader 【通过style标签将css插入页面】  

**[hash、chunkhash、contenthash](https://www.cnblogs.com/twodog/p/12137542.html)**

## my-webpack-base

- webpack-base
    + build-base-conf
        - paths.js
        - webpack.common.js
        - webpack.dev.js
        - webpack.prod.js
    + src
        - img
        - style
        - index.html
        - index.js
        - math.js
    + .babelrc
    + package.json
    + postcss.config.js
 

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<p>hi</p>
</body>
</html>
```

index.js

```js
// 引入css
import './style/style1.css'
import './style/style2.less'

// console.log('window.ENV', ENV)

import { sum } from './math'

const sumRes = sum(10, 20)
console.log('sumRes', sumRes)

// 引入图片

function insertImgElem(imgFile) {
    const img = new Image()
    img.src = imgFile
    document.body.appendChild(img)
}

import imgFile1 from './img/1.png'
insertImgElem(imgFile1)

import imgFile2 from './img/2.jpeg'
insertImgElem(imgFile2)
```

math.js

```js
export const sum = (a, b) => {
    return a + b
}

export const mult = (a, b) => {
    return a * b
}
```

style/style1.css

```css
body {
	background-color: #f1f1f1;
}
p {
	transform: rotate(-45deg);
}
```

style/style1.less

```css
p {
    color: red;
}
```

build-base-conf/webpack.common.js

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath, distPath } = require('./paths')

module.exports = {
    entry: path.join(srcPath, 'index'),
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                include: srcPath,
                exclude: /node_modules/
            },
            // {
            //     test: /\.vue$/,
            //     loader: ['vue-loader'],
            //     include: srcPath
            // },
            // {
            //     test: /\.css$/,
            //     // loader 的执行顺序是：从后往前（知识点）
            //     loader: ['style-loader', 'css-loader']
            // },
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
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html'
        })
    ]
}
```

build-base-conf/webpack.dev.js

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
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            // window.ENV = 'development'
            ENV: JSON.stringify('development')
        })
    ],
    devServer: {
        port: 8080,
        progress: true,  // 显示打包的进度条
        contentBase: distPath,  // 根目录
        open: true,  // 自动打开浏览器
        compress: true,  // 启动 gzip 压缩

        // 设置代理
        proxy: {
            // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
            '/api': 'http://localhost:3000',

            // 将本地 /api2/xxx 代理到 localhost:3000/xxx
            '/api2': {
                target: 'http://localhost:3000',
                pathRewrite: {
                    '/api2': ''
                }
            }
        }
    }
})
```

build-base-conf/webpack.prod.js

```js
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackCommonConf = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const { srcPath, distPath } = require('./paths')

module.exports = merge(webpackCommonConf, {
    mode: 'production',
    output: {
        filename: 'bundle.[contentHash:8].js',  // 打包代码时，加上 hash 戳
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
        ]
    },
    plugins: [
         new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
         new webpack.DefinePlugin({
             // window.ENV = 'production'
             ENV: JSON.stringify('production')
         })
     ]
})
```

build-base-conf/paths.js

```js
const path = require('path')

const srcPath = path.join(__dirname, '..', 'src')
const distPath = path.join(__dirname, '..', 'dist')

module.exports = {
    srcPath,
    distPath
}
```

package.json

```js
{
  "name": "my-webpack-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --config build-base-conf/webpack.dev.js",
    "build": "webpack --config build-base-conf/webpack.prod.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.10.5",
    "@babel/preset-env": "^7.10.4",
    "autoprefixer": "^9.8.5",
    "babel-loader": "^8.1.0",
    "css-loader": "^4.0.0",
    "file-loader": "^6.0.0",
    "html-webpack-plugin": "^4.3.0",
    "less-loader": "^6.2.0",
    "postcss-loader": "^3.0.0",
    "style-loader": "^1.2.1",
    "url-loader": "^4.1.0",
    "webpack": "^4.44.0",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.0",
    "webpack-merge": "^5.0.9"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
```

.babelrc

```js
{
    "presets": ["@babel/preset-env"],
    "plugins": []
}
```

postcss.config.js

```js
module.exports = {
    plugins: [require('autoprefixer')]
}
```