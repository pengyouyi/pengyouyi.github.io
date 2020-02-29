---
layout: post
title: js中的垃圾回收机制和内存泄漏
tags:
- JS-Function
- JS-Basic
categories: JS
description: js中的垃圾回收机制和内存泄漏
---

# 垃圾回收机制 Garbage collection mechanism

JS具有自动垃圾回收机制。垃圾收集器会按照固定的时间间隔周期性的执行。

✦ 如果一个对象不再被引用， 那么这个对象就会被垃圾回收机制回收；

✦ 如果两个对象互相引用， 且不再被第3者所引用， 那么这两个互相引用的对象也会被回收。

✦（在闭包中，父函数被子函数引用，子函数又被外部的一个变量引用，这就是父函数不被回收的原因）

JS 有两种垃圾收集方式：标记清除和引用计数

> JS中最常见的垃圾回收方式是`标记清除`。

> `引用计数`方式不太常用

## 标记清除 mark-and-sweep

**工作原理：**是当变量进入环境时，将这个变量标记为“进入环境”。当变量离开环境时，则将其标记为“离开环境”。标记“离开环境”的就回收内存。

**工作流程：**

1. 垃圾回收器，在运行的时候会给存储在内存中的所有变量都加上标记。

2. 去掉环境中的变量以及被环境中的变量引用的变量的标记。

3. 再被加上标记的会被视为准备删除的变量。

4. 垃圾回收器完成内存清除工作，销毁那些带标记的值并回收他们所占用的内存空间。

**标记清除示例：**

```js
function test(){
    var a = 10;    //被标记"进入环境"
    var b = "hello";    //被标记"进入环境"
}
test();    //执行完毕后之后，a 和 b 又被标记"离开环境"，被回收
```

## 引用计数 reference counting

**工作原理：**跟踪记录每个值被引用的次数。

**工作流程：**

1. 声明了一个变量并将一个引用类型的值赋值给这个变量，这个引用类型值的引用次数就是1。

2. 同一个值又被赋值给另一个变量，这个引用类型值的引用次数加1.

3. 当包含这个引用类型值的变量又被赋值成另一个值了，那么这个引用类型值的引用次数减1.

4. 当引用次数变成0时，说明没办法访问这个值了。

5. 当垃圾收集器下一次运行时，它就会释放引用次数是0的值所占的内存。

**引用计数示例：**

语言引擎有一张"引用表"，保存了内存里面所有资源（通常是各种值）的引用次数。如果一个值的引用次数是0，就表示这个值不再用到了，因此可以将这块内存释放。

```js
const arr = [1,2,3,4];
console.log("welcome to my blog");
```

上面的代码中，数组[1,2,3,4]是一个值，会占用内存。变量arr是仅有的对这个值的引用，因此引用次数为1。尽管后面的代码没有用到arr，它是会持续占用内存。

如果增加一行代码，解除arr对[1,2,3,4]引用，这块内存就可以被垃圾回收机制释放了。

```js
const arr = [1,2,3,4];
console.log("welcome to my blog");
arr = null;
```

因为IE中的BOM、DOM的实现使用了COM，而COM对象使用的垃圾收集机制是引用计数策略。所以会存在循环引用的问题。

解决：手工断开js对象和DOM之间的链接。赋值为null。IE9把DOM和BOM转换成真正的JS对象了，所以避免了这个问题。

# what什么是内存泄漏？

简单点说，不再用到的内存，没有及时释放，就叫内存泄漏

当页面跳转的时候，变量不会释放，一直存在于内存当中，然后使你的CPU在累加，在提高，只有当你关闭浏览器的时候，内存才会被释放。

## when什么情况会引起内存泄漏？

虽然有垃圾回收机制但是我们编写代码操作不当还是会造成内存泄漏。

1. 意外的全局变量引起的内存泄漏。

```js
function foo(arg) {
    bar = "aaaaa";
}
 
// 实际上等价于
function foo(arg) {
    window.bar = "aaaaa";
}
```

```js
function foo() {
    this.variable = "qqqqq";
}
//this 指向全局对象（window）
foo();
```

原因：全局变量，不会被回收。

解决：使用严格模式避免。

2. 闭包引起的内存泄漏

```js
function fn1(){
    var n = 1;
	//在加一个fn2当他的子集
    function fn2() { 
        alert(n);
    }
	//return出来后 他就给 window了所以一直存在内存中。因为一直在内存中，在IE里容易造成内存泄漏
    return fn2();
}
fn1();
```

原因：闭包可以维持函数内局部变量，使其得不到释放。

解决：将事件处理函数定义在外部，解除闭包,或者在定义事件处理函数的外部函数中，删除对dom的引用。

3. DOM对象与JS对象相互引用

```js
function testObject(element) { 
    this.elementReference = element;    // 为testObject(js)对象的属性绑定element(DOM)对象
    element.property = this;      // 为element(DOM)对象的属性绑定testObject(js)对象
} 
new testObject(document.getElementById('idname'));
```

解决方法：

在window.onunload事件中写上:

```js
document.getElementById('idname').property = null;
```

4. 定时器 setTimeout setInterval

当不需要setInterval或者setTimeout时，定时器没有被clear，定时器的回调函数以及内部依赖的变量都不能被回收，造成内存泄漏。

```js
clearTimeout(***)
clearInterval(***)
```

vue如果在mounted/created 钩子中使用了$on，需要在beforeDestroy 中做对应解绑($off)处理

```js
beforeDestroy() {
  this.bus.$off('****');
}
```

5. 从外到内执行appendChild。这时即使调用removeChild也无法释放

```js
var parentDiv = document.createElement("div"); 
var childDiv = document.createElement("div"); 
document.body.appendChild(parentDiv); 
parentDiv.appendChild(childDiv); 
```

解决方法： 

从内到外执行appendChild: 

```js
var parentDiv = document.createElement("div"); 
var childDiv = document.createElement("div"); 
parentDiv.appendChild(childDiv); 
document.body.appendChild(parentDiv); 
```

# more

