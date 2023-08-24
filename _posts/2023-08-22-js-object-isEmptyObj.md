---
layout: post
title: js 判断空对象的方法
tags:
- Interview
- JS
categories: JS
description: js 判断空对象的方法
---

# js 判断空对象的方法

## JSON.stringify() == "{}"

空对象对应的字符串为"{}",

使用 `JSON.stringify()` 方法把对象转化成字符串.

```js
var obj = {};
var obj2 = new Object()

function isEmptyObject(obj){
    if (JSON.stringify(obj) == "{}") {
    	return true
    }
    return false;
}
	
console.log(isEmptyObject(obj))  // true
console.log(isEmptyObject(obj2))  // true
```

## ES6 的 Object.keys()

Object.keys() 返回对象中属性名(`可枚举`)组成的数组。

```js
var obj = {};

function isEmptyObject(obj){
	var arr = Object.keys(obj);
    if (arr.length == 0) {
    	return true
    }
    return false;
}
	
console.log(isEmptyObject(obj));  //true
```

## Object.getOwnPropertyNames()

getOwnPropertyNames() 返回一个数组，其包含给定对象中所有自有属性（包括`可枚举和不可枚举属性`，但不包括使用 symbol 值作为名称的属性）

```js
var obj = {};

function isEmptyObject(obj){
	var arr = Object.getOwnPropertyNames(obj);
    if (arr.length == 0) {
    	return true
    }
    return false;
}
	
console.log(isEmptyObject(obj));  //true
```

[Object.getOwnPropertyNames()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)

## for...in 循环

使用 for...in 循环可以遍历所有属性以此判断对象是否为空对象：

```js
var obj = {};

function isEmptyObject(obj){
	for(var key in obj) {
		return false
	}
    return true;
}
	
console.log(isEmptyObject(obj))  // true
```

### Object.keys() 和 for...in 的区别

> Object.keys() 返回一个数组，包括对象自身的（`不含继承`的）所有可枚举属性（不含 Symbol 属性）。  
> for...in 循环遍历对象自身的和`继承`的可枚举属性（不含 Symbol 属性）。  

### Object.keys() 和 Object.getOwnPropertyNames() 的区别

> Object.keys() 返回对象中属性名(`可枚举`)组成的数组。  
> getOwnPropertyNames() 返回一个数组，其包含给定对象中所有自有属性（包括`可枚举和不可枚举属性`，但不包括使用 symbol 值作为名称的属性）