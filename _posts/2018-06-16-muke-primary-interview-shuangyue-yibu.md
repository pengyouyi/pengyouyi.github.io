---
layout: post
title: 慕课网-前端JavaScript面试技巧(双越)-第5章 异步和单线程
tags:
- Interview
- imooc
categories: JS
description: 慕课网-前端JavaScript面试技巧(双越)-异步和单线程
---

慕课网学习笔记-前端JavaScript面试技巧(双越)- 第5章 JS基础知识（下）- 异步和单线程

# question

**题目：**

1、同步和异步的区别是什么？分别举一个同步和异步的例子

2、一个关于setTimeout的笔试题

3、前端使用异步的场景有哪些

# Knowledge-point

**知识点：**

- 什么是异步（对比同步）

- 前端使用异步的场景

- 异步和单线程

## 什么(what)是异步

**异步**

```js
console.log(100);
setTimeout(function() {
  console.log(200);
}, 1000);
console.log(300);
```

结果：

100
300
200【1s后打印】

**同步**

```js
console.log('peng');
alert('you');
console.log('yi');
```

### 何时(when)需要异步

- 在可能发生等待的情况

- 等待过程中不能像alert一样阻塞程序运行

- 因此，所有的“等待的情况”都不要异步

## front-end使用异步的场景

**前端使用异步的场景**

- 定时任务：setTimeout、setInterval

- 网络请求：ajax请求，动态`<img>`加载

- 事件绑定

*ajax请求代码示例*

```js
console.log('start');
$.get('./data1.json', function(data(1)){
	console.log(data1);
});
console.log('end');
```

*img加载*

```js
console.log('start');
var img = document.createElement('img');
img.onload = function() {
	console.log('loaded');
}
img.src = '/xxx.png';
console.log('end');
```

*事件绑定*

```js
console.log('start');
document.getElementById('btn1').addEventListener('click',function() {
	alert('clicked');
})
console.log('end');
```

## 单线程-Single-thread

单线程

```js
console.log(100);
setTimeout(function() {
  console.log(200);
});
console.log(300);
```
结果：
100
300
200

*以上程序执行过程分析：*

- 执行第一行，打印100

- 执行setTimeout后，传入setTimeout的函数会被暂存起来，不会立即执行（单线程的特点，不能同时干两件事）

- 执行最后一行，打印300

- 待所有程序执行完，处于空闲状态时，会立马看有没有暂存起来的要执行。

- 发现暂存起来的setTimeout中的函数无需等待时间，就立即过来执行

# Answer

## 同步and异步

**同步和异步的区别是什么？分别举一个同步和异步的例子**

- 基于 JS 是单线程语言

- 同步会阻塞代码执行，而异步不会

- alert是同步，setTimeout 是异步

## setTimeout

- 一个关于setTimeout的笔试题

```js
for(var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  },i*1000)
}
```

以上执行结果是：每过1s都输出5，

修改让其每隔1s弹出0，1，2，3，4

法一：
```js
for(var i = 0; i < 5; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i);
    },i*1000)
  })(i); 
}
```

法二：
```js
for(var i = 0; i < 5; i++) {
  setTimeout((function(i) {
    return function() {
      console.log(i);
    }
  })(i),i*1000)
}
```

法三：
```js
for(let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  },i*1000)
}
```

法四：
ES6的Promise、ES7的 async/await

> setTimeout 不支持传带参数的函数

[setTimeout(function(){}，0)](https://www.cnblogs.com/destinyruru/p/5823760.html)


# 更多-more

[前端JavaScript面试技巧](https://coding.imooc.com/learn/list/115.html)