---
layout: post
title: constructor属性
tags:
- 原型链
categories: JS
description: constructor属性
---

# constructor属性

# constructor 定义
constructor属性 返回对创建此对象的数组函数的引用。


# constructor 语法
```js
object.constructor
```
constructor 始终指向创建当前对象的构造函数。

备注
必需的 object 是一个对象或函数的名称。
constructor 属性是每个具有原型的对象的原型成员。  这包括除 Global 和 Math 对象之外的所有内部 JavaScript 对象。constructor 属性包含了对某种函数的引用，此种函数构造了特定对象的实例。  

# example

# null && undefined
null 和 undefined 是没有constructor属性的

```js
var aa ;
console.log(aa.constructor); // Cannot read property 'constructor' of undefined

var bb = null;
console.log(bb.constructor); // Cannot read property 'constructor' of null
```

# 基本数据类型的constructor

## number.constructor
```js
var num2 = new Number(1);  
console.log(num2.constructor); // function Number() { [native code] }
console.log(num2.constructor === Number); // true

var num1 = 1;  // 等价于 var num1 = new Number(1) , 所以下面结果成立
console.log(num1.constructor); // function Number() { [native code] }
console.log(num1.constructor === Number); // true
```

数字的字面量创建方式能取到constructor属性，是因为等价于用new方法构造出来的数字对象。
同上，数字类型，其他基本类型如字符串、布尔、数组等都一样。

## string.constructor
```js
var str = "hello";
console.log(str.constructor);  // function String() { [native code] }
console.log(str.constructor === String);  // true
```

## boolean.constructor
```js
var d = true;
console.log(d.constructor);  // function Boolean() { [native code] }
console.log(d.constructor === Boolean);  // true
```

## array.constructor
```js
var b = [1,2];  
console.log(b.constructor);  // function Array() { [native code] }
console.log(b.constructor === Array);  // true
```

## object.constructor
```js
var c = {};
console.log(c.constructor);  // function Object() { [native code] }
console.log(c.constructor === Object);  // true
```

## data.constructor
```js
var g = new Date();
console.log(g.constructor); // function Date() { [native code] }
console.log(g.constructor === Date); // function Date() { [native code] }
```

## regexp.constructor
```js
var h = /\d/;
console.log(h.constructor); // function RegExp() { [native code] }
console.log(h.constructor === RegExp); // true
```

## function.constructor
```js
 var h = function() {
 	var hello = "hello";
 };
 console.log(h.constructor); // function Function() { [native code] }
 console.log(h.constructor === Function); // true
```

# 构造函数的constructor
实例化构造函数的对象的constructor指向其构造函数
```js
function F(){ }
var obj = new F();

console.log(obj.constructor === F) // true
console.log(F.constructor === Function) //true
//将上面两段代码合起来，就得到下面的结论
 console.log(obj.constructor.constructor === Function); // true
```

# proptotype.constructor
每个函数都有一个默认的属性prototype，而这个prototype的constructor默认指向这个函数。
```js
function Person(name) {
    this.name = name;
};
Person.prototype.getName = function() {
    return this.name;
};
var p = new Person("ZhangSan");

console.log(p.constructor === Person);  // true
console.log(Person.prototype.constructor === Person); // true
// 将上两行代码合并就得到如下结果
console.log(p.constructor.prototype.constructor === Person); // true
```

当时当我们重新定义函数的prototype时（注意：和上例的区别，这里不是修改而是覆盖），
constructor的行为就有点奇怪了，如下示例：

```js
function Person(name) {
    this.name = name;
};
Person.prototype = {
    getName: function() {
        return this.name;
    }
};
var p = new Person("ZhangSan");

console.log(p.constructor === Person);  // false
console.log(Person.prototype.constructor === Person); // false
console.log(p.constructor.prototype.constructor === Person); // false
```

因为覆盖Person.prototype时，等价于进行如下代码操作：
```js
Person.prototype = new Object({
    getName: function() {
        return this.name;
    }
});
```
而constructor始终指向创建自身的构造函数，所以此时Person.prototype.constructor === Object，即是：
```js
function Person(name) {
    this.name = name;
};
Person.prototype = {
    getName: function() {
        return this.name;
    }
};
var p = new Person("ZhangSan");

console.log(p.constructor === Object);  // true
console.log(Person.prototype.constructor === Object); // true
console.log(p.constructor.prototype.constructor === Object); // true
```

怎么修正这种问题呢？重新覆盖Person.prototype.constructor即可：
```js
function Person(name) {
    this.name = name;
};
Person.prototype = new Object({
    getName: function() {
        return this.name;
    }
});
Person.prototype.constructor = Person;
var p = new Person("ZhangSan");

console.log(p.constructor === Person);  // true
console.log(Person.prototype.constructor === Person); // true
console.log(p.constructor.prototype.constructor === Person); // true
```

或者:

```js
function Person(name) {
    this.name = name;
};
Person.prototype = {
    constructor: Person,
    getName: function() {
        return this.name;
    }
};

var p = new Person("ZhangSan");

console.log(p.constructor === Person);  // true
console.log(Person.prototype.constructor === Person); // true
console.log(p.constructor.prototype.constructor === Person); // true
```





















