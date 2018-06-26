---
layout: post
title: 慕课网-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第2章 ES6 语法 - Promise的基本使用和原理
tags:
- Interview
- imooc
- ES6
categories: JS
description: 慕课网-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第2章 ES6 语法 - Promise的基本使用和原理
---

慕课网学习笔记-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第2章 ES6 语法 - Promise的基本使用和原理

# Promise的基本使用和原理

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。

# callback hell

```js
function loadImg(src, callback, fail){
  var img = document.createElement('img');
  img.onload = function(){
    callback(img)
  }
  img.onerror = function(){
    fail()
  }
  img.src = src
}

var src = 'http://www.imooc.com/static/img/index/logo_new.png'

loadImg(src,function(img){
  console.log(img.width)
}, function(){
  console.log('failed')
})
```

# Promise 语法

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});

promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

```js
function loadImg(src) {
  const promise = new Promise(function(resolve, reject) {
    var img = document.createElement('img');
    img.onload = function() {
      resolve(img)
    }
    img.onerror = function() {
      reject()
    }
    img.src = src
  })
  return promise
}

var src = 'http://www.imooc.com/static/img/index/logo_new.png'
var result = loadImg(src);

result.then(function(img){
  console.log(img.width)
}, function(){
  console.log('failed')
})

result.then(function(img){
  console.log(img.height)
})
```

# promise - 总结

1. new Promise实例，而且要return

2. new Promise时要传入函数，函数有resolve 、reject 两个参数

3. 成功时执行resolve(),失败时执行reject()

4. 用.then 监听结果



# 更多-more

[揭秘一线互联网企业 前端JavaScript高级面试](https://coding.imooc.com/learn/list/190.html)

[Promise 对象](http://es6.ruanyifeng.com/#docs/promise)

