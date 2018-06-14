---
layout: post
title: 慕课网-前端JavaScript面试技巧(双越)-原型和原型链
tags:
- Interview
- imooc
categories: JS
description: 慕课网-前端JavaScript面试技巧(双越)-原型和原型链
---

慕课网学习笔记-前端JavaScript面试技巧(双越)-第2章 JS基础知识（上）- 原型和原型链

# question

**题目：**

1、如何准确判断一个变量是数组类型

2、写一个原型链继承的例子

3、描述 new 一个对象的过程

4、zepto(或其他框架) 源码如何使用原型链

# Knowledge-point

**知识点：**

- 构造函数

- 构造函数 - 扩展

- 原型规则和示例

- 原型链

- instanceof

## 构造函数-Constructor

```js
function Foo(name, age) {
  this.name = name;
  this.age = age;
  this.class = 'class-1';
  // return this;  // 默认有这一行
}
var foo = new Foo('zhangsan', 20);
var foo1 = new Foo('lisi', 22);  //创造多个对象
```

## 构造函数extend

var a = {} 其实是 var a = new Object() 的语法糖

var a = [] 其实是 var a = new Array() 的语法糖

function Foo() {...} 其实是 var Foo = new Function(...)

使用 instanceof 判断一个函数是否是一个变量的构造函数

## 5个原型rules

**原型和原型链-5个原型规则:**

1、所有的*引用类型*（数组、对象、函数），都具有**对象特性**，即可自由扩展属性（除了 'null' 意外）。

2、所有的*引用类型*（数组、对象、函数），都有一个 __proto__ 属性【隐式原型】，属性值是一个普通的对象。

3、所有*函数*，都有一个**prototype** 属性【显式原型】，属性值也是一个普通的对象。

4、所有的引用类型（数组、对象、函数）， __proto__ 属性值指向它的构造函数的 “prototype” 属性值

5、当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的 __proto__ （即它的构造函数的prototype）中寻找。

### 1、所有的*引用类型*（数组、对象、函数），都具有**对象特性**，即可自由扩展属性（除了 'null' 意外）。

```js
// 原型和原型链
var obj = {};
obj.a = 100;

var arr = [];
arr.a = 100;

function fn() { }
fn.a = 100;
```

### 2、所有的*引用类型*（数组、对象、函数），都有一个 \_\_proto\_\_ 属性【隐式原型】，属性值是一个普通的对象。

```js
console.log(obj.__proto__);  
// Object
console.log(arr.__proto__);
// [constructor: ƒ, toString: ƒ, toLocaleString: ƒ, join: ƒ, pop: ƒ, …]
console.log(fn.__proto__);
// ƒ () { [native code] }
```

### 3、所有*函数*，都有一个**prototype** 属性【显式原型】，属性值也是一个普通的对象。

```js
console.log(fn.prototype);
// {constructor: f fn(); __proto__: Object}
```

### 4、所有的引用类型（数组、对象、函数）， \_\_proto\_\_ 属性值指向它的构造函数的 “prototype” 属性值

```js
console.log(obj.__proto__ === Object.prototype);
// true
```

### 5、当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的 __proto__ （即它的构造函数的prototype）中寻找。

```js
// 构造函数
function Foo(name, age) {
  this.name = name
}
Foo.prototype.alertName = function() {
	alert(this.name)
}
// 创建示例
var f = new Foo('zhangsan');
f.printName = function() {
	console.log(this.name);
}
// 测试
f.printName()
f.alertName()
```

## 原型规则-Add-2-points

**原型和原型链-5个原型规则-补充2点**

this、循环对象自身的属性

```js
var item
for (item in f) {
	// 高级浏览器已经在 for in 中屏蔽了来自原型的属性
	// 但是这里建议大家还是加上这个判断，保证程序的健壮性
	if (f.hasOwnProperty(item)) {
		console.log(item)
	}
}

// 结果只有2个属性：name 、printName
```

## 原型链-Prototype-Chain

- 原型和原型链-原型链

```js
// 原型和原型链-原型链

// 构造函数
function Foo(name, age) {
  this.name = name
}
Foo.prototype.alertName = function() {
	alert(this.name)
}
// 创建示例
var f = new Foo('zhangsan');
f.printName = function() {
	console.log(this.name);
}
// 测试
f.printName()
f.alertName()
f.toString() // 要去 f.__proto__.__proto__ 中去寻找
console.log(f.toString()) // [object Object]
```

[http://www.imooc.com/article/3654](http://www.imooc.com/article/3654)

[http://www.jb51.net/article/30750.htm](http://www.jb51.net/article/30750.htm)

## instanceof

- 原型和原型链-原型链 - instanceof

instanceof：用于判断 *引用类型* 属于哪个 *构造函数* 的方法

**f instanceof Foo 的判断逻辑是：**

f 的 \_\_proto\_\_ 一层一层往上，能否对应到Foo.prototype

```js
function Foo(name, age) {
  this.name = name
}

// 创建示例
var f = new Foo('zhangsan');

console.log(f instanceof Foo);  // true
```

再试着判断 f instanceof Object


# Answer

## one-如何准确判断一个变量是数组类型

```js
var arr = [];
console.log(arr instanceof Array); // true
console.log(typeof arr); // object, typeof 是无法判断是否是数组的

function isArray(obj) {
	return Object.prototype.toString.call(obj) === '[object Array]';
}
console.log(isArray(arr)); // true
```

## two-写一个原型链继承的例子

```js
// 动物
function Animal() {
	this.eat = function() {
		console.log('animal eat');
	}
}

// 狗
function Dog() {
	this.bark = function() {
		console.log('dog bark');
	}
}

Dog.prototype = new Animal();

// 哈士奇
var hashiqi = new Dog();
```

写一个贴近实际开发原型链继承的例子

## 写一个封装DOM查询的例子

```js
function Elem(id) {
	this.elem = document.getElementById(id);
}
Elem.prototype.html = function(val) {
  var elem = this.elem;
  if (val) {
  	elem.innerHTML = val;
  	console.log(this)
  	return this; // 链式操作
  } else {
  	return elem.innerHTML;
  }
}
Elem.prototype.on = function(type, fn) {
	var elem = this.elem;
	if(elem.addEventListener) {
		elem.addEventListener('type', fn, false);
	} else if(elem.attachEvent) {
		elem.attachEvent('on' + type, fn);
	} else {
		elem['on' + type] = fn;
	}
    return this;
}

var div1 = new Elem('div1');
div1.html('有');
div1.on('click', alert('click')).html('youyi');
```

## 描述 new 一个对象的过程

- 创建一个新对象

- this 指向这个新对象

- 执行代码，即对this赋值

- 返回this

[new操作符具体干了什么呢?](http://pengyouyi.site/js/2016/10/09/js#new)

```js
function Foo(name, age) {
  this = {};
  this.name = name;
  this.age = age;
  this.class = 'class-1';
  // return this;  // 默认有这一行
}
var foo = new Foo('zhangsan', 20);
var foo1 = new Foo('lisi', 22);  //创造多个对象
```

## zepto(或其他框架) 源码如何使用原型链

### 整体结构-Overall structure

```js
var Zepto = (function () {
  ...
})()

window.Zepto = Zepto
window.$ === undefined && (window.$ = Zepto)
```

zepto 的核心是一个闭包，加载完毕后立即执行。然后暴露给全局变量 zepto ，如果 $ 没有定义，也将 $ 赋值为 zepto 。

### 核心结构-Core structure

```js
var zepto = {}, $

function Z(doms) {
  var len = doms.length 
  for (var i = 0; i < len; i++) {
    this[i] = doms[i]
  }
  this.length = doms.length
}

zepto.Z = function(doms) {
  return new Z(doms)
}

zepto.init = function(doms) {
  var doms = ['domObj1','domObj2','domObj3']
  return zepto.Z(doms)
}

$ = function() {
  return zepto.init()
}

$.fn = {
  constructor: zepto.Z,
  method: function() {
    return this
  }
}

zepto.Z.prototype = Z.prototype = $.fn

return $
```

在源码中，可以看出， $ 其实是一个函数，同时在 $ 身上又挂了很多属性和方法（这里体现在 $.fn 身上，其他的会在后续的文章中谈到）。

我们在使用 zepto 的时候，会用 $ 去获取 dom ，并且在这些 dom 对象身上都有 zepto 定义的各种各样的操作方法。

从上面的伪代码中，可以看到，$ 其实调用了 zepto.init() 方法，在 init 方法中，会获取到 dom 元素集合，然后将集合交由 zepto.Z() 方法处理，而 zepto.Z 方法返回的是函数 Z 的一个实例。

函数 Z 会将 doms 展开，变成实例的属性，key 为对应 domObj 的索引， 并且设置实例的 length 属性。

### zepto.Z.prototype = Z.prototype = $.fn

读到这里，你可能会有点疑惑，$ 最终返回的是 Z 函数的实例，但是 Z 函数明明没有 dom 的操作方法啊，这些操作方法都定义在 $.fn 身上，为什么 $ 可以调用这些方法呢？

其实关键在于这句代码 Z.prototype = $.fn ，这句代码将 Z 的 prototype 指向 $.fn ，这样，Z 的实例就继承了 $.fn 的方法。

既然这样就已经让 Z 的实例继承了 $.fn 的方法，那 zepto.Z.prototype = $.fn 又是为什么呢？

如果我们再看源码，会发现有这样的一个方法：
```js
zepto.isZ = function(object) {
  return object instanceof zepto.Z
}
```
这个方法是用来判读一个对象是否为 zepto 对象，这是通过判断这个对象是否为 zepto.Z 的实例来完成的，因此需要将 zepto.Z 和 Z 的 prototype 指向同一个对象。 isZ 方法会在 init 中用到，后面也会介绍。

[读 Zepto 源码系列](https://www.cnblogs.com/libin-1/p/6888574.html)

[读Zepto源码之代码结构](https://segmentfault.com/a/1190000008950420)

# 更多-more

[前端JavaScript面试技巧](https://coding.imooc.com/learn/list/115.html)