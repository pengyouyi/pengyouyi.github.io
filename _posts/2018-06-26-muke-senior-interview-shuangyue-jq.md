---
layout: post
title: 慕课网-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第3章 原型 - zepto 和 jquery 中如何使用原型
tags:
- Interview
- imooc
- jQuery
categories: JS
description: 慕课网-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第3章 原型 - zepto 和 jquery 中如何使用原型
---

慕课网学习笔记-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第3章 原型 - zepto 和 jquery 中如何使用原型

# begin 

- zepto 和 jquery 中如何使用原型 ？

- 说一个原型的实际应用

- 原型如何体现它的扩展性

# 实际应用 - jQuery使用

[jQuery源码分析系列](http://www.cnblogs.com/aaronjs/p/3279314.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

	<div id="div1">
      <p>hello</p>
	</div>

<script>  
  var $div1 = $('#div1');

  $div1.css('color','blue'); // css 是原型方法
  console.log($div1.html()); // html 是原型方法
</script>
</body>
</html>
```

# jQuery - 实现原型

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>
	<div id="div1">
      <p>hello</p>
	</div>
	
<script>
(function(window){
	var jQuery = function(selector) {
		return new jQuery.fn.init(selector);
	}
	jQuery.fn = {
		css: function(key,value) {
			alert('css')
		},
		html: function(value) {

		}
	}
	var init = jQuery.fn.init = function(selector) {
		var slice = Array.prototype.slice;
		var dom = slice.call(document.querySelectorAll(selector));

		var i, len = dom ? dom.length : 0;
		for(i = 0; i < len; i++) {
			this[i] = dom[i];
		}
		this.length = len;
		this.selector = selector || ''
	}
	init.prototype = jQuery.fn;
	window.$ = jQuery;
})(window)	
</script>
<script>  
  var $div1 = $('#div1');

  $div1.css('color','blue'); // css 是原型方法
  console.log($div1.html()); // html 是原型方法
</script>
</body>
</html>
```

## 一般构造方法的定义和调用-General

```js
function A(){
}
A.prototype.init = function(){};
A.prototype.css = function(){};
var a = new A();
a.init();
a.css();
```
## jQuery设计模式却是return new jQuery.fn.init()

```js
function jQuery(){
	return new jQuery.fn.init();
}
jQuery.prototype.init = function(){};
jQuery.prototype.css = function(){};

//line-283
jQuery.fn.init.prototype = jQuery.fn;
jQuery().css();
```
jQuery.fn = jQuery.prototype，
执行jQuery()时，new jQuery.fn.init()，创造了jQuery.fn.init对象，同时执行jQuery.prototype.init() 方法。

jQuery.prototype.init.prototype = jQuery.prototype;把jQuery的原型赋给jQuery.prototype.init的原型，jQuery.fn.init对象就可以使用jQuery的方法css(),所以我们可以这样调用jQuery().css()；

<!--line-8826-->

```js
window.jQuery = window.$ = jQuery;
```
将jQuery挂在到全局window上,这样能在外部调用jQuery()、$()方法。

# 实际应用-Zepto

[读Zepto源码之代码结构](https://segmentfault.com/a/1190000008950420)

```js
var zepto = {}

zepto.init = function(selector) {
  var slice = Array.prototype.slice;
  var dom = slice.call(document.querySelectorAll(selector));
  return zepto.Z(dom, selector)
}

// 即使用zepto时候的$
var $ = function(selector){
  return zepto.init(selector)
}
// 构造函数
function Z(dom,selector) {
  var i, len = dom ? dom.length : 0;
  for (i = 0; i < len; i++) {
    this[i] = dom[i]
    this.length = len;
    this.selector = selector || ''
  }
}

zepto.Z = function(dom, selector) {
  // 出现new
  return new Z(dom,selector)
}
```

zepto 如何使用原型

```js
$.fn = {
  constructor: zepto.Z,
  css: function(key, value){},
  html: function(value){}
}
zepto.Z.prototype = Z.prototype = $.fn
```

# zepto - 实现原型

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>
	<div id="div1">
      <p>hello</p>
	</div>
<script>
(function(){
	var zepto = {}

	zepto.init = function(selector) {
	  var slice = Array.prototype.slice;
	  var dom = slice.call(document.querySelectorAll(selector));
	  return zepto.Z(dom, selector)
	}

	// 即使用zepto时候的$
	var $ = function(selector){
	  return zepto.init(selector)
	}
	// 构造函数
	function Z(dom,selector) {
	  var i, len = dom ? dom.length : 0;
	  for (i = 0; i < len; i++) {
	    this[i] = dom[i]
	  }
	  this.length = len;
	  this.selector = selector || ''
	}

	zepto.Z = function(dom, selector) {
	  // 出现new
	  return new Z(dom,selector)
	}

	$.fn = {
	  constructor: zepto.Z,
	  css: function(key, value){
	  	alert('css')
	  },
	  html: function(value){}
	}
	
	zepto.Z.prototype = Z.prototype = $.fn

	window.$ = $;
    
})(window)
</script>
<script>  
  var $div1 = $('#div1');

  $div1.css('color','blue'); // css 是原型方法
  console.log($div1.html()); // html 是原型方法
</script>
</body>
</html>
```


# 扩展性-插件机制-Extensibility

**为何要把原型方法放在$.fn ?**

```js
jQuery.fn = {
	css: function(key,value) {
		alert('css')
	},
	html: function(value) {

	}
}
init.prototype = jQuery.fn;
```

**因为要扩展插件**

```js
$.fn.getNodeName = function(){
  return this[0].nodeName
}
```

**好处**

- 只有$会暴露在window全局变量

- 将插件扩展统一到$.fn.xxx这一个接口，方便使用









# 更多-more

[揭秘一线互联网企业 前端JavaScript高级面试](https://coding.imooc.com/learn/list/190.html)

