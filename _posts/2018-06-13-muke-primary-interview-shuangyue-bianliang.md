---
layout: post
title: 慕课网-前端JavaScript面试技巧(双越)-第2章 变量类型和计算
tags:
- Interview
- imooc
categories: JS
description: 慕课网-前端JavaScript面试技巧(双越)-变量类型和计算
---

慕课网学习笔记-前端JavaScript面试技巧(双越)-第2章 JS基础知识（上）-变量类型和计算

# question

**题目：**

1、js中使用typeof能得到哪些类型？

2、何时使用`===`何时使用`==`

3、js中有哪些内置函数

4、js变量按照存储方式区分为哪些类型，并描述其特点

5、如何理解JSON

# Knowledge-point

**知识点：**

变量类型

变量计算

## 变量类型-Variable-type

值类型 VS 引用类型

typeof 运算符详解

### 值类型-Value-type

```js
var a = 100;
var b = a;
a = 200;
console.log(b); // 100
```

### 引用类型-reference-type

```js
var aa = {age: 20};
var bb = aa;
bb.age = 40;
console.log(aa.age); // 40
```

引用类型：对象、数组、函数

### typeof运算符

**typeof 一共返回 7 种数据类型**

undefined

object

boolean

string

number

function

symbol

```js
//typeof 一共返回 7 种数据类型
console.log(typeof undefined);  // undefined
console.log(typeof 'abc');  // string
console.log(typeof 123);  // number
console.log(typeof true);  // boolean
console.log(typeof {});  // object
console.log(typeof []);  // object
console.log(typeof null);  // object
console.log(typeof console.log);  // function
console.log(typeof Symbol(1));  // symbol
console.log(typeof new Date());  // object
```

typeof 只能区分值类型的数据，不能区分引用类型

```js
// 以下均返回 function 类型
typeof Boolean
typeof Object
typeof String
typeof Number
```

## 变量计算-Variable-calculation

**变量计算 - 强制类型转换:**

字符串拼接

==运算符

if语句

逻辑运算

### 字符串拼接-StringBuilder

```js
var a1 = 100 + 10;  // 110
var b1 = 100 + '10'; // 10010
```

### ==运算符-operator

```js
console.log(100 == '100');  // true
console.log(0 == '');  // true
console.log(null == undefined);  // true
```

### if语句

```js
var x = true;
if (x) {  // 执行
	console.log(x);
}

var y = 100;
if (y) {  // 执行
	console.log(y);
}

var z = '';
if (z) {  // 不执行
	console.log(z);
}
```

###  逻辑运算符-Logical

```js
console.log(10 && 0);  // 0
console.log('' || 'abc');  // abc
console.log(!window.abc);  // true
```
```js
// 判断一个变量会被当做 true 还是 false
var i = 100;
console.log(!!i);  // true
```

# Answer

**变量类型和计算-2-解答**

## js中使用typeof能得到哪些类型？

答：7种

```js
undefined
boolean
number
string
object
function
symbol
```

## question:何时使用 === 何时 == ?

```js
const obj = {
	x: 100
}
if (obj.a == null) {
  // 这里相当于 obj.a === null || obj.a === undefined ,简写形式
  // 这是 jQuery 源码中推荐的写法
}
```

除了判断一个变量是否 == null 之外，其他一律用 === 。

## js中有哪些内置函数-数据封装类对象?

```js
Boolean
String
Number
Object
Array
Function
Date
RegExp
Error
```

Math对象

## ask：js变量按照存储方式区分为哪些类型？

**js变量按照存储方式区分为哪些类型？并描述其特点**

[值类型、引用类型](http://pengyouyi.site/js/2016/10/09/js#stack-heap)

## 如何理解Json

1、JSON 只不过是一个js 对象而已

```js
JSON.parse('{"a": 10, "b": 20}')
JSON.stringify({a: 10, b: 20})
```

2、JSON 还是一种数据格式




# 更多-more

[前端JavaScript面试技巧](https://coding.imooc.com/learn/list/115.html)