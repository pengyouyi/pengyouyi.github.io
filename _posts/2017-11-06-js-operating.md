---
layout: post
title: js运行机制、同步、异步
tags:
- 面试题
categories: JS
description: js运行机制
---

# js运行机制是单线程

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

# 任务队列-Task queue

所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。  
同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；  
异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。  

异步执行的运行机制如下。（同步执行也是如此，因为它可以被视为没有异步任务的异步执行。）

（1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。  
（2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。  
（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。  
（4）主线程不断重复上面的第三步。  

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-06-1.jpg" alt="">
</div>

只要主线程空了，就会去读取"任务队列"，这就是JavaScript的运行机制。这个过程会不断重复。

# 同步任务-Synchronization task

> console.log()  
> alert()

```js
console.log('peng');
alert('you');
console.log('yi');
```

# 异步任务-Asynchronous task

**前端使用异步的场景**

> 定时任务：setTimeout、setInterval  
> 网络请求：ajax请求，动态`<img>`加载  
> DOM事件绑定  
> ES6中Promise  

## setTimeout

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
200  

## ajax请求代码示例

```js
console.log('start');
$.get('./data1.json', function(data(1)){
	console.log(data1);
});
console.log('end');
```

## img加载

```js
console.log('start');
var img = document.createElement('img');
img.onload = function() {
	console.log('loaded');
}
img.src = '/xxx.png';
console.log('end');
```

## DOM事件绑定

```js
console.log('start');
document.getElementById('btn1').addEventListener('click',function() {
	alert('clicked');
})
console.log('end');
```

**何时需要异步**

- 在可能发生等待的情况  
- 等待过程中不能像alert一样阻塞程序运行  

# 同步和异步的区别-Difference

同步会阻塞代码执行，而异步不会

# Event Loop

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-06-2.png" alt="">
</div>

# 同步和异步执行顺序-order

`执行栈中的代码（同步任务），总是在读取"任务队列"（异步任务）之前执行。`

```js
console.log("A");
while(true) {

}
console.log("B");
```
结果只执行A

```js
console.log("A");
setTimeout(function(){
  console.log('B');
}, 0)
while(true) {

}
```
结果还是只执行A

```js
for(var i = 0; i < 4; i++) {
  setTimeout(function(){
  	 console.log(i);
  }, 1000);
}
```
1s后打出4个4

# 更多-more

- [http://www.ruanyifeng.com/blog/2014/10/event-loop.html](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)  
- [http://web.jobbole.com/82631/](http://web.jobbole.com/82631/)