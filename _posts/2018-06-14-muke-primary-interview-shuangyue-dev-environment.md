---
layout: post
title: 慕课网-前端JavaScript面试技巧(双越)-开发环境
tags:
- Interview
- imooc
- Build-Tool
categories: JS
description: 慕课网-前端JavaScript面试技巧(双越)-开发环境
---

慕课网学习笔记-前端JavaScript面试技巧(双越)- 第7章 开发环境

# 开发dev环境介绍

面试官想通过开发环境了解面试者的经验

开发环境，最能体现工作产出的效率

- IDE（写代码的效率）

- git (代码版本管理，多人协作开发)

- JS 模块化

- 打包工具

- 上线回滚的流程


# IDE

- webstorm - 收费

- subline - 免费

- vscode

- atom

插件 插件 插件

如果要走大牛、大咖、逼格的路线，就用 webstorm

如果走普通、屌丝、低调路线，就用 subline

如果走小清新、个性路线，就用 vscode 或者 atom

如果你是面试，最好有一个用的熟悉，其他都会一点

# git - 常用命令

正式项目都需要代码版本管理

大型项目需要多人协作开发

git 和 linux 是一个作者

网络git服务器，如 coding.net 、github.com 【开源】

一般公司代码非开源，都有自己的git服务器

git的基本操作必须熟练

**常用git命令**

- git add .

- git checkout xxx

- git commit -m xxx

- git push origin master

- git pull origin master

- git branch

- git checkout -b xxx /  git checkout xxx

- git merge xxx

# 模块化 - AMD

- require.js

- 全局 define 函数

- 全局 require 函数

- 依赖JS会自动、异步加载

**util.js** <- **a-util.js** <- **a.js** <- **main.js**

util.js
```js
define(function() {
  return {
    getFormatDate: function(date, type) {
      if (type === 1) {
        return '2017-10-10';
      } 
      if (type === 2) {
        return '2017年10月10日';
      }
    }
  }
})
```

a-util.js
```js
define([./util.js], function(util) {
  return {
    aGetFormatDate: function(date) {
      return util.getFormatDate(date, 2)
    }
  }
})
```

a.js
```js
define(['./a-util.js'], function(aUtil) {
  return {
    printDate: function(date) {
      console.log(aUtil.aGetFormatDate(date))
    }
  }
})
```

main.js
```js
require(['./a.js'], function(a) {
  var date = new Date();
  a.printDate(date);
})
```

**使用require.js**

```js
<script src="js/require.js" defer async="true" data-main="js/app.js"></script>
```

# 模块化 - CommonJS

CommonJS

nodejs 模块化规范，现在被大量用前端，原因：

- 前端开发依赖的插件和库，都可以从npm中获取

- 构建工具的高度自动化，使得使用npm的成本非常低

- CommonJS 不会异步加载 JS ,而是同步一次性加载出来


util.js
```js
module.exports = {
    getFormatDate: function(date, type) {
      if (type === 1) {
        return '2017-10-10';
      } 
      if (type === 2) {
        return '2017年10月10日';
      }
    }
  }
```

a-util.js
```js
var util = require('util.js');
module.exports =  {
    aGetFormatDate: function(date) {
      return util.getFormatDate(date, 2)
    }
  }
```

**CommonJS 和 CommonJS 的使用场景**

需要异步加载，使用AMD

使用npm之后建议使用CommonJS

# 构建工具 - 安装http-server

安装 http-server 仅可以浏览静态文件
```bash
$ sudo npm i http-server -g
```

使用 http-server，进入 project 工程下
```bash
projectName $ http-server -p 8881
```

在你浏览器中输入 http://localhost:8881/index.html 即可查看网页

# 构建工具 - 安装webpack

进入工程目录下,初始化
```bash
projectName $ npm init
```

安装webpack、webpack-dev-serer
```bash
projectName $ sudo cnpm i webpack --save-dev
projectName $ sudo cnpm install webpack-dev-server --save-dev
```

安装jQuery、moment

```bash
projectName $ sudo cnpm i jquery --save
```

# 构建工具 - 配置webpack

**文件目录结构**

+ webpack-test
   - src
       + app.js
   - dist 【执行webpack之后生成新的】
       + bundle.js
   - index.html
   - webpack.config.js
   - package.json

在项目下新建webpack.config.js

webpack.config.js
```js
var path = require('path');
var webpack = require('webpack');

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: {
		app: './app.js'
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js'
	}
}
```
or
```js
var webpack = require('webpack');

module.exports = {
	entry: {
		app: './src/app.js'
	},
	output: {
		path: __dirname + '/dist/',
		filename: 'bundle.js'
	}
};
```

app.js
```js
console.log('webpack start');
```

index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>tesst</title>
</head>
<body>
	<div id="demo">123</div>
	<script src="dist/bundle.js">
		
	</script>
</body>
</html>
```

**执行webpack**
```bash
$ webpack
```

或者在package.json里面添加一行
```js
"start": "webpack"
```
即
```json
{
  "name": "webpack-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^3.8.1",
    "webpack-dev-server": "^2.9.3"
  },
  "dependencies": {
    "jquery": "^3.2.1"
  }
}
```
在控制台里面执行
```bash
$ npm start
```
跟直接执行webpack命令是一样的

**浏览器中查看**
```bash
$ webpack-dev-server
```
Launch the server, visit  http://127.0.0.1:8080 .


# 构建工具 - 压缩JS

webpack.config.js

```js
var path = require('path');
var webpack = require('webpack');

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: {
		app: './app.js'
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js'
	},
	plugins: [
      new webpack.optimize.UglifyJsPlugin()
	]
}
```

# 上线回滚 - 上线回滚流程

**上线流程要点**

- 将测试完成的代码提交到git版本库的master分支

- 将当前服务器的代码全部打包并记录版本号，备份

- 将master分支的代码提交覆盖到线上服务器，生成新版本号

**回滚流程要点**

- 将当前服务器的代码全部打包并记录版本号，备份

- 将备份的上一个版本号解压，覆盖到线上服务器，并生成新的版本号


## 上线回滚 - linux基础命令

**目录操作：**

```js
mkdir a  创建目录

ls  列出目录的内容及其内容属性信息

ls -l = ll 【 ll不是命令，是ls -l的别名 】列出文件的详细信息，有时间，是否可读写等信息 

ls ‐a  显示目录下的所有文件，包括隐藏文件 

cd  从当前工作目录切换到指定的工作目录。

pwd  显示当前工作目录的绝对路径。

cd ..  进入上一层目录

cp a.js a1.js  复制文件或目录

mv a1.js src/a1.js  移动或重命名文件

rm  删除一个或多个文件或目录

rm -rf a  删除所有内容，包含目录和文件，r表示递归，f表示强制 

rmdir  删除空目录
```

**文件操作：**

```js
vi/vim a.js  命令行文本编辑器

touch  创建新的空文件，改变已有文件的时间戳属性。

cat a.js  连接文件并打印到标准输出设备上，cat经常用来显示文件的内容

head a.js  显示文件的开头的内容。默认显示文件的头10行内容。

tail a.js  显示文件内容的尾部，默认10行

head -n 5 a.js  显示前5行

tail -n 8 a.js  显示后8行

grep '2' a.js  是一种强大的文本搜索工具，它能使用正则表达式搜索文本，并把匹配的行打印出来。
```

- 文件和目录操作命令

- 查看文件及内容处理命令

- 文件压缩及解压缩命令

- 信息显示命令

- 搜索文件命令

- 用户管理命令

- 基础网络操作命令

- 有关磁盘与文件系统的命令

- 系统权限及用户授权相关命令

- 系统管理与性能监视命令

- 关机 / 重启 / 注销和查看系统信息的命令

- 进程管理相关命令

[Linux命令大全](http://man.linuxde.net/)

[Linux基础命令](https://blog.csdn.net/rufin89/article/details/79379908)

> 从命令模式切换到编辑模式使用“A”、“a”、“O”、“o”、“I”、“i”键。

> 从编辑模式切换到命令模式使用“esc”键，

**vim**

```js
vim a.js  编辑文件

i  在当前字符前插入文本

esc  从编辑模式切换到命令模式

:wq  在命令模式下，执行存盘退出操作
```

[vi命令](http://man.linuxde.net/vi)



# 更多-more

[前端JavaScript面试技巧](https://coding.imooc.com/learn/list/115.html)