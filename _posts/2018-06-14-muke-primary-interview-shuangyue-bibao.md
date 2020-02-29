---
layout: post
title: 慕课网-前端JavaScript面试技巧(双越)-作用域、闭包
tags:
- Interview
- imooc
categories: JS
description: 慕课网-前端JavaScript面试技巧(双越)-作用域、闭包
---

慕课网学习笔记-前端JavaScript面试技巧(双越)- 第3章 JS基础知识（中）- 作用域、闭包

# question

**题目：**

1、说一下对变量提升的理解

2、说明this几种不同的使用场景

3、创建10个 `<a>` 标签，点击的时候弹出对应的序号

4、如何理解作用域

5、实际开发中闭包的应用

# Knowledge-point

**知识点：**

- 执行上下文

- this

- 作用域

- 作用域链

- 闭包

## 执行上下文-Execution-context

**执行上下文**

- 范围：一段 `<script>` 或者一个函数

- 全局：变量定义、函数声明 【针对一段`<script>`里面】

- 函数：变量定义、函数声明、this、arguments

PS：注意“函数声明” 和 “函数表达式” 的区别

```js
console.log(a);  // undefined
var a = 100;

fn('zhansan'); // zhangsan, 20
function fn(name) {
	age = 20;
	console.log(name, age); 
	var age;
}
```

## this

*this 要在执行时才能确认值，定义时无法确认*

**this的使用场景**

- 作为构造函数执行

- 作为对象属性执行

- 作为普通函数执行 【this指向window】

- call、 apply、 bind

```js
var a = {
	name: 'A',
	fn: function() {
		console.log(this.name);
	}
}

a.fn();  // A, this === a
a.fn.call({name: 'B'});  // B, this === {name: 'B'}
var fn1 = a.fn;
fn1(); // 空， this === window
```

## 作用域-action-scope

**作用域**

- 全局作用域

- 函数作用域

- 块级作用域（ES6新增）

**作用域链**

> 自由变量：一个变量在当前作用域没有定义，但被使用了

```js
var a = 100;
function fn() {
	var b = 200;
	// 当前作用域没有定义的变量，即“自由变量”
	console.log(a);
	console.log(b);
}
fn();
```

```js
var a = 100;
function F1() {
	var b = 200;
	function F2() {
		var c = 300;
		console.log(a);  // a是自由变量
		console.log(b);  // b是自由变量
		console.log(c);
	}
	F2();
}
F1();
```

## 闭包-closure

**闭包的使用场景**

- 函数作为返回值

- 函数作为参数传递

**函数作为返回值**

```js
function F1() {
	var a = 100;
	// 返回一个函数（函数作为返回值）
	return function() {
		console.log(a); // 自由变量，去定义它的父作用域寻找
	}
}
// f1 得到一个函数
var f1 = F1();
var a = 200;
f1(); // 100
```

**函数作为参数传递**

```js 
function print(fn) {
    let b = 200
    fn()
}

let b = 100
function fnb() {
    console.log(b)
}

print(fnb) // 100
```

> 所有的自由变量【闭包】的查找，是在函数定义的地方，向上级作用域查找，不是在执行的地方！！！

# Answer

## 创建10个 `<a>` 标签，点击的时候弹出对应的序号

```js
for(var i = 0; i < 10; i++) {
	a = document.createElement('a');
	a.innerHTML = i + 1 + "<br>";
	document.body.appendChild(a);
}

window.onload = function() {
	var oA = document.getElementsByTagName('a');
	for(var i = 0; i < oA.length; i++) {
		oA[i].onclick = function(num) {
			return function() {
				alert(num);
			}
		}(i);
    }
}
```

## Application-of-closure

- 实际开发中闭包的应用

```js
// 闭包隐藏数据，只提供 API

function createCache() {
    // 闭包中的数据，被隐藏，不被外界访问
    const data = {}
    return {
        set: function(key,val) {
             data[key] = val
        },
        get: function(key) {
            return data[key]
        }
    }
}

const c = createCache()
c.set('a', 100)
console.log(c.get('a'))
```

```js
// 封装变量，收敛权限。
function isFirstLoad() {
	var _list = [];
	return function(id) {
		if (_list.indexOf(id) >= 0) {
			return false;
		} else {
			_list.push(id);
			return true;
		}
	}
}
var firstLoad = isFirstLoad();
console.log(firstLoad(10)); // true
console.log(firstLoad(10)); // false
console.log(firstLoad(20)); // true
```

# 更多-more

[前端JavaScript面试技巧](https://coding.imooc.com/learn/list/115.html)