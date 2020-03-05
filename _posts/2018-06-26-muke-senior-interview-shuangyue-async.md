---
layout: post
title: 慕课网-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第4章 -异步
tags:
- Interview
- imooc
categories: JS
description: 慕课网-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第4章 -异步
---

慕课网学习笔记-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第4章 -异步

# begin

- 什么是单线程，和异步有什么关系

- 什么是event-loop

- 是否用过jQuery的 Deferred

- Promise 的基本使用和原理

- 介绍一下async/await(和Promise的区别、联系)

- 总结一下当前JS解决异步的方案

# 单线程-Single-thread

**什么是单线程，和异步的关系**

- 单线程 - 只有一个线程，只能做一件事

- 原因 - 避免DOM渲染的冲突

- 解决方案 - 异步

```js
// 循环运行期间，JS执行和DOM渲染暂时卡顿
var i,sum = 0;
for(i = 0; i < 100000000; i++) {
	sum += i;
}
console.log(sum);

// alert 不处理，JS执行和DOM渲染暂时卡顿
console.log(1);
alert('hello')
console.log(2);
```

# 异步-async

**原因 - 避免DOM渲染的冲突**

- 浏览器需要渲染DOM

- JS可以修改DOM结构

- JS执行的时候，浏览器DOM渲染会暂停

- 两段JS也不能同时执行（都修改DOM就冲突了）

- webworker支持多线程，但是不能访问DOM

**解决方案 - 异步**

```js
console.log(1);
setTimeout(function(){
	console.log(2)
}, 1000)
console.log(3);
console.log(4);
```

```js
console.log(1);
$.agax({
  url: 'xxx',
  success: function(result){
    console.log(result)
  }
})
console.log(3);
console.log(4);
```


## 单线程-summary

- 单线程 - 只有一个线程，同时间只能做一件事

- 原因 - 避免DOM渲染的冲突

- 解决方案 - 异步

- 实现方法 - event loop

问题一： 没有按照书写方式执行，可读性差

问题二：callback中不容易模块化

# event-loop

什么是事件轮询（循环）

- 事件轮询，JS实现异步的具体解决方案

- 同步代码，直接执行

- 异步函数先放在 异步队列 中

- 待同步函数执行完毕，轮询执行 异步队列 的函数

## event-loop过程

1. 主进程先执行完 同步函数

2. 异步函数根据时间（是否延迟）依次放入进 异步队列 中

3. 主进程一直监视异步队列中是否有函数，一有就立马拿到主进程执行

## event-loop实例

**事件轮询 - 实例分析1**
```js
setTimeout(function(){
  console.log(100);
});
console.log(200);
```

主进程
```js
console.log(200);
```

异步队列
```js
function(){
  console.log(100);
}
```

**事件轮询 - 实例分析2**

```js
setTimeout(function(){
  console.log(1);
},100);
setTimeout(function(){
  console.log(2);
});
console.log(3);
```


主进程
```js
console.log(3);
```

异步队列
```js
// 立刻被放入
function(){
  console.log(2);
}
// 100ms 之后被放入
function(){
  console.log(1);
}
```

**事件轮询 - 实例分析3**

```js
$.agax({
  url: 'xxx',
  success: function(result){
    console.log('a')
  }
})
setTimeout(function(){
  console.log('b');
},100);
setTimeout(function(){
  console.log('c');
});
console.log('d');
```

问：$.agax中的函数何时被放入异步队列中？

答：ajax加载完成(url请求成功)之后，具体跟网络快慢有关

所以结果可能有两种:

d,c,b,a 或者 d,c,a,b

# jquery-deferred

## jquery-deferred-介绍

jQuery 1.5 的变化

使用jQuery Deferred

初步引入  Promise 概念

- 无法改变JS异步和单线程的本质

- 只能从写法上杜绝callback 这种形式

- 它是一种语法糖形式，但是解耦了代码

- 很好的体现：开放封闭原则then

开放封闭原则: 对扩展开放，对修改封闭

## jQuery1.5对AJAX的改变

jQuery1.5之前

```js
var ajax = $.ajax({
    url: 'data.json',
    success: function() {
        console.log('success 1')
        console.log('success 2')
        console.log('success 3')
    },
    error: function() {
        console.log('error')
    }
})

console.log(ajax)  // 返回一个 XHR 对象
```

jQuery1.5之后

```js
var ajax = $.ajax('data.json')

ajax.done(function() {
        console.log('success 1')
    })
    .fail(function() {
        console.log('error')
    })
    .done(function() {
        console.log('success 2')
    })

console.log(ajax)  // 返回一个 deferred 对象
```

jQuery1.5之后的之后

```js
var ajax = $.ajax('data.json')

ajax.then(function() {
        console.log('success 1')
    }, function() {
        console.log('error 1')
    })
    .then(function() {
        console.log('success 2')
    }, function() {
        console.log('error 2')
    })

console.log(ajax)  // 
```

## jquery-deferred-应用

- 总结，dtd的API可分为两类，用意不同

- 第一类：dtd.resolve / dtd.reject

- 第二类：dtd.then / dtd.done / dtd.fail

- 这两类应该分开，否则后果很严重

简单的异步操作代码

```js
var wait = function() {
	var task = function() {
		console.log('执行完成')
	}
	setTimeout(task, 2000)
}
wait();
```

新增需求：要在执行完成之后进行某些特别复杂的操作，代码可能会很多，而且分好几个步骤

```js
function waitHandle() {
	var dtd = $.Deferred(); // 创建一个deferred对象

	var wait = function(dtd) { // 要求传入一个deferred对象
		var task = function() {
			console.log('执行完成');
			dtd.resolve(); // 表示异步任务已经完成
			// dtd.reject() // 表示异步任务失败或出错
		}
		setTimeout(task, 2000); 
		return dtd;  // 要求返回deferred 对象
    }
    // 注意，这里一定要有返回值
    return wait(dtd)
}

var w = waitHandle();
w.then(function(){
	console.log('ok 1')
},function() {
	console.log('err 1')
}).then(function(){
	console.log('ok 2')
},function() {
	console.log('err 2')
})
// 还有 w.done  w.fail
```

**使用dtd.promise()**

```js
function waitHandle() {
	var dtd = $.Deferred(); // 创建一个deferred对象

	var wait = function(dtd) { // 要求传入一个deferred对象
		var task = function() {
			console.log('执行完成');
			dtd.resolve(); // 表示异步任务已经完成
			// dtd.reject() // 表示异步任务失败或出错
		}
		setTimeout(task, 2000); 
		return dtd.promise();  // 不是返回deferred 对象，而是返回promise
    }
    // 注意，这里一定要有返回值
    return wait(dtd)
}

var w = waitHandle();  // w 接收的就是一个Promise对象
$.when(w)
.then(function(){
	console.log('ok 1')
},function() {
	console.log('err 1')
})
// w.reject()  执行这句话会直接报错
```

## jquery-deferred - 总结

可以jQuery1.5 对AJAX的改变举例

说明如何简单的封装，使用Deferred

说明Promise和Defered的区别

# promise

- Promise 的基本使用和原理

- 基本语法回顾

- 异常捕获

- 多个串联

- Promise.all 和 promise.race

- promise标准

## Promise 的出现

回调地狱

```js
// 获取第一份数据
$.get(url1, (data1) => {
  console.log(data1)

  // 获取第二份数据
  $.get(url2, (data2) => {
    console.log(data2)

    // 获取第三份数据
    $.get(url3, (data3) => {
      console.log(data3)

      // 还可能获取更多的数据
    })
  })
})
```

Promise 解决 callback hell

```js
function getData(url) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      success(data) {
        resolve(data)
      },
      error(err) {
        reject(err)
      }
    })
  })
}

// 使用
const url1 = '/data1.json'
const url2 = '/data2.json'
const url3 = '/data3.json'

getData(url1).then((data1) => {
    console.log(data1)
    return getData(url2)
}).then((data2) => {
    console.log(data2)
    return getData(url3)
}).then((data3) => {
    console.log(data3)
}).catch(err => {
    console.error(err)
})
```

## promise-语法回顾

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

## promise-捕获异常

一般来说，使用promise捕获异常，不要在then方法里面定义 Reject 状态的回调函数（即then的第二个参数），`总是使用catch方法`。

**原因：**

1. catch能捕获到loadImg函数里面的语法错误，如throw new Error('自定义错误')；

2. catch也能捕获到reject('xx')执行错误，需要传参

```js
function loadImg(src) {
  const promise = new Promise(function(resolve, reject) {
    var img = document.createElement('img');
    // throw new Error('自定义错误')
    img.onload = function() {
      resolve(img)
    }
    img.onerror = function() {
      reject('图片加载失败')
    }
    img.src = src
  })
  return promise
}

var src = 'http://www.imooc.com/static/img/index/logo_new.png'
var result = loadImg(src);

// 规定：then只接受一个参数，最后统一用catch捕获异常
result.then(function(img){
  console.log(img.width);
  return img;
}).then(function(img){
  console.log(img.height);
}).catch(function(ex) {
	// 最后统一 catch
	console.log(ex)
})
```

## promise-串联

```js
function loadImg(src) {
  const promise = new Promise(function(resolve, reject) {
    var img = document.createElement('img');
    img.onload = function() {
      resolve(img)
    }
    img.onerror = function() {
      reject('图片加载失败')
    }
    img.src = src
  })
  return promise
}

var src1 = 'http://www.imooc.com/static/img/index/logo_new.png'
var result1 = loadImg(src1);
var src2 = 'https://img1.mukewang.com/53f470450001411b01000100-100-100.jpg'
var result2 = loadImg(src2);

result1.then(function(img1){
  console.log('第一个图片加载完成',img1.width);
  return result2;
}).then(function(img2){
  console.log('第二个图片加载完成',img2.width);
}).catch(function(ex) {
	// 最后统一 catch
	console.log(ex)
})
```

## promise-all-race

```js
// Promise.all接收一个promise对象的数组
// 待全部完成之后，统一执行 success
Promise.all([result1,result2]).then(datas => {
  // 接收到 datas 是一个数组，依次包含多个  promise 返回的内容
  console.log(datas[0])
  console.log(datas[2])
})

// Promise.race 接收一个包含多个 promise 对象的数组
// 只要有一个完成，就执行success
Promise.race([result1,result2]).then(data => {
  // data即最先执行完成的 promise 的返回值
  console.log(data);
})
```

## promise-标准总结

- 关于标准的闲谈
- 状态变化
- then


**关于标准的闲谈**

- 任何技术推广使用都需要一套标准来支撑 

- 如html、js、CSS、HTTP等，无规矩不成方圆

- 任何不符合标准的东西，终将会被用户抛弃

- 不要挑战标准，不要自造标准

**promise标准 - 状态变化**

- 三种状态：pending、fulfilled、rejected

- 初始状态是pending

- pending变为fulfilled，或者pending变为rejected

- 状态变化不可逆

**then**

- promise实例必须实现这个方法

- then()必须可以接收两个函数作为参数

- then()返回的必须是一个Promise实例

## promise-总结

- 基本语法

- 如何异常捕获（Error 和 reject 都要考虑）

- 多个串联-链式执行的好处

- Promise.all 和 Promise.race

- Promise标准 - 状态变化，then 函数

# async-await

- then只是将callback拆分了

- async/await 是最直接的同步写法

```js
const load = async function() {
  const result1 = await loadImg(src1);
  console.log(result1);
  const result2 = await loadImg(src2);
  console.log(result2);
}
load()
```

- 使用await，函数必须用async标识

- await后面跟的是一个Promise实例

- 需要babel-polyfill

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>

<script>  
function loadImg(src) {
  const promise = new Promise(function(resolve, reject) {
    var img = document.createElement('img');
    img.onload = function() {
      resolve(img)
    }
    img.onerror = function() {
      reject('图片加载失败')
    }
    img.src = src
  })
  return promise
}

var src1 = 'http://www.imooc.com/static/img/index/logo_new.png'
var src2 = 'https://img1.mukewang.com/53f470450001411b01000100-100-100.jpg'

const load = async function() {
  const result1 = await loadImg(src1);
  console.log(result1);
  const result2 = await loadImg(src2);
  console.log(result2);
}
load()
</script>
</body>
</html>
```

## async-await-总结

- 基本语法

- 使用了Promise，并没有和Promise冲突

- 完全是同步的写法，再也没有回调函数

- 但是：改变不了JS单线程、异步的本质

# 异步-Summary

总结一下当前JS解决异步的方案

- jQuery Deferred

- Promise

- Async/Await

- Generator

# 更多-more

[揭秘一线互联网企业 前端JavaScript高级面试](https://coding.imooc.com/learn/list/190.html)

