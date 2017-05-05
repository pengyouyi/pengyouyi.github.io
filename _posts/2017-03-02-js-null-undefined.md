---
layout: post
title: js的null，undefined或undeclared的区别
tags:
- js函数
categories: JS
description: js中null，undefined或undeclared区别
---

# js中null，undefined或undeclared的区别

# undeclared
undeclared是一种Js语法错误
```js
a // Uncaught ReferenceError: a is not defined
```
## typeof undeclared
```
var a;
typeof a; // "undefined"
typeof b; // "undefined"
```

# null，undefined
在JavaScript中，有两个表示‘空’的值undefined和null。

> undefined是Js语言类型，undefined 表示一个变量没有被声明，不存在这个值，或者被声明了但没有被赋值；
> null 表示一个对象是“没有值”的值，也就是值为“空”；

```js
var a;
var b = null;
a // "undefined"
```

## null == undefined
```js
null == undefined //true
```

## typeof null 、typeof undefined
```js
typeof null; // "object"
typeof undefined; //"undefined"
```

## Number(null) 、 Number(undefined)

```js
Number(null); // 0
Number(undefined); //NaN

//同理
+null;  //0
+undefined; //NaN 
```
# 判断null和undefined
## 判断undefined
```js
var exp = null;
if (typeof exp == "undefined"){
    alert("is undefined");
}
```

## 判断null
```js
var exp = null;
if (exp === null){
    alert("is null");
}
```
```js
var exp = null;
if (!exp && typeof exp == "object"){
    alert("is null");
}
```

# null和undefined典型用法

## null典型用法
```
（1） 作为函数的参数，表示该函数的参数不是对象。
（2） 作为对象原型链的终点。
```
```js
Object.getPrototypeOf(Object.prototype)
// null
```
## undefined典型用法
```
（1）变量被声明了，但没有赋值时，就等于undefined。
（2）调用函数时，应该提供的参数没有提供，该参数等于undefined。
（3）对象没有赋值的属性，该属性的值为undefined。
（4）函数没有返回值时，默认返回undefined。
```
```js
var i;
i // undefined

function f(x){console.log(x)}
f() // undefined

var  o = new Object();
o.p // undefined

var x = f();
x // undefined
```





# 更多-more
- 


















