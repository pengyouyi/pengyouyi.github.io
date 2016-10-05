---
layout: post
title: requirejs初学
tags:
- requirejs
categories: Js
description: requirejs初学
---
# requirejs初学

**a.为什么要使用requireJS**
很久之前，我们所有的JS文件写到一个js文件里面去进行加载，但是当业务越来越复杂的时候，需要分成多个JS文件进行加载，比如在页面中head内分别引入a.js，b.js，c.js等，如下所示：
```
<script src="js/app/a.js"></script>
<script src="js/app/b.js"></script>
<script src="js/app/c.js"></script>
```
这段代码依次加载多个js文件。这样的写法有很大的缺点。
1. 页面在加载的时候，是从页面自上往下加载及渲染的，当页面上有多个分散的js文件时候，页面会先加载及解析头部的JS文件(同步加载)，页面被堵塞了，其次分散的js请求数多了，网页失去响应的时间就会变长。
2. 由于JS文件存在依赖关系，比如上面的b.js要依赖于a.js,所以务必保证a.js优先引入到页面上来且先加载，要严格保证加载顺序，依赖性最大的文件一定要放到最后加载。但是当依赖关系很复杂的时候，代码的编写和维护就会变得困难了。

**b.使用requireJS的优点有哪些？**

> （1）实现js文件的异步加载，避免网页失去响应；
> （2）管理模块之间的依赖性，便于代码的编写和维护；
> （3）遵循AMD（异步模块定义）规范。

**c.引用-reference**
去requirejs官网下载[http://www.requirejs.cn/docs/download.html](http://www.requirejs.cn/docs/download.html),在页面头部head标签内引入requireJS，如下：
`<script src="js/require.js"></script>`，但是加载这个文件也会造成网页失去响应，我们可以加上 defer 和 async这个属性。如下：`<script src="js/require.js" defer async="true" ></script>`

# data-main入口点
接下来，看看requireJS启动加载脚本的初始化方式，requireJS支持属性 data-main 这个属性来加载初始化的JS文件，如下：
```<script src="js/require.js" defer async="true" data-main="js/app.js"></script>```
上面的意思是：先异步加载requireJS文件，完成后继续异步加载app.js文件
上面的app.js后的.js可以去掉，因为requireJS源码已经默认都是以后缀JS文件结尾的。

# 如何定义模块文件-define
RequireJS编写模块不同于其他脚本文件，它良好的使用define来定义一个作用域避免全局空间污染，它可以显示出其依赖关系，并以函数(定义此模块的那个函数)参数的形式将这些依赖进行注入。

```html
-demo
   index.html
   -js
        require.js
        app.js
        -app
            a.js
            b.js
            c.js
            d1.js
            ....
            d6.js
        -lib
            jquery.js
            backbone.js
            underscore.js
```

```html
//index.html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>require</title>
	<script data-main="js/app.js" src="js/require.js"></script>
</head>
<body>
    <div id="demo"></div>
</body>
</html>
```
在app.js初始化代码如下：
```js
require(['app/d1'],function(d1){
	console.log(d1);
})
```
**a.简单的值对,直接一个对象**
```js
//d1.js
define({
	color: "black",
	size: "24px"
});
```
**_result display_**
<div class="rd">
 <img src=http://chuantu.biz/t5/36/1475154019x1929192556.png />
</div>
<div class="rd">
  <img src=http://chuantu.biz/t5/36/1475154102x3340469628.png />
</div>
**b.函数式定义**
```js
//d2.js
define(function(){
	return {
		color: "red",
		size: "30px"
	}
});
```
**c.存在依赖的函数式定义**
例如d3.js 依赖a.js
```js
//d3.js
define(['./a'],function(a){
	return {
		color: "blue",
		add: a.add(1,2)
	}
})
```
```js
//a.js
define(function(){
	return{
		add: function(a,b){
			return a+b
		}
	}
})
```
**d.将模块定义为一个函数**
```js
//d4.js
define(['./a'],function(a){
	return function(){
		return a.add(1,2)
	}
})
```
**e.定义一个命名模块**
```js
//d5.js
 define("myname",['./a'],function(a)) {
            //todo
       }
    );
```
*以上命名函数写法,移植需要重命名,不推荐使用*
**f.简单包装CommonJS来定义模块**
```js
//d6.js
define(function(require,exports,module){

	var a = require('./a');

	exports.show =  function() {
		return a.add(1,2);
	}
});
```
# requireJS配置项
## baseUrl ：
所有模块的查找根路径。
```js
//app.js
requirejs.config({
    baseUrl: 'js/app'
});

requirejs(['a','b','c'],function(a,b,c){

});
```

## paths:
是映射那些不直接放在baseUrl指定的目录下的文件。设置paths的起始位置是相对于baseUrl的，除非该path设置是以”/”开头或含有URL协议('http://'或者'https://').

```js
app.js
requirejs.config({
	baseUrl: 'js/lib',
	paths: {
		myapp: '../app'
	}
});

require(['jquery','myapp/b'],function($,b){
	$("#demo").append("hello world");
});
```
## shim:
 为那些没有使用define()来声明依赖关系、设置模块的"浏览器全局变量注入"型脚本做依赖和导出配置。
```js
require.config({
　　　　shim: {

　　　　　　'underscore':{
　　　　　　　　exports: '_'
　　　　　　},
　　　　　　'backbone': {
　　　　　　　　deps: ['underscore', 'jquery'],
　　　　　　　　exports: 'Backbone'
　　　　　　}
　　　　}
　　});
```
## Map参数：
Map参数是用来解决同一个模块不同版本的问题
building...



# 更多-more
* [http://www.requirejs.cn/docs/api.html](http://www.requirejs.cn/docs/api.html)
* [http://www.ruanyifeng.com/blog/2012/11/require_js.html](http://www.ruanyifeng.com/blog/2012/11/require_js.html)
* [http://www.cnblogs.com/tugenhua0707/p/4067220.html](http://www.cnblogs.com/tugenhua0707/p/4067220.html)

























