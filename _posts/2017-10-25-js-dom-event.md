---
layout: post
title: DOM事件级别
tags:
- js事件
categories: JS
description: DOM事件
---

# DOM事件模型

DOM事件模型分为两类：

一类是IE所使用的冒泡型事件（Bubbling）；
另一类是DOM标准定义的冒泡型与捕获型（Capture）的事件。

除IE外的其他浏览器都支持标准的DOM事件处理模型。

# DOM事件处理程序

事件就是用户或浏览器自身执行的某种动作。
诸如click、load、mouseover ，都是事件的名字。
而响应某个事件的函数就叫做事件处理程序（或事件侦听器）

## HTML事件处理程序

```html
<input type="button" value="click me" onclick="alert('clicked')">
```

由于 onclick 里包含的是 JavaScript代码， 因此不能再其中使用未经转义的HTML语法字符，比如 &、“”、''、< 、>

```html
<input type="button" value="click me" onclick="alert(&quot;clicked&quot;')">
```

在HTML中定义的事件处理程序可以调用脚本里定义的方法

```html
<script>
  function showMessage() {
      alert('hello');
  }
</script>
<input type="button" value="click me" onclick="showMessage()">
```

HTML事件处理程序的一个缺点：HTML与JavaScript代码紧密耦合。如果要更换事件处理程序，就需要改动两个地方。所以转而使用JavaScript指定事件处理程序

## DOM0级事件处理程序

```html
<button id = 'myBtn'>click me</button>
<script>
    var btn = document.getElementById('myBtn');
    btn.onclick = function(event){
        alert(event.target);
    }
</script>
```
btn.onclick 这种方式添加的事件处理程序会在事件流的冒泡阶段被处理

**解除DOM0级事件**
```
btn.onclick = null;
```
将事件处理程序设置为mull之后，再单击按钮将不会有任何动作发生

**一个dom对象只能注册一个同类型的函数，因为注册多个同类型的函数的话，就会发生覆盖，之前注册的函数就会无效。**

```js
var btn = document.getElementById('myBtn');
btn.onclick = function(){
    console.log(this.id);
    alert('you click the first function');
};
btn.onclick = function(e){
    var e = e || window.event;
    alert('you click the second function');
    console.log(this === e.currentTarget); // true
    console.log(this === btn);  // true
}
```
上述代码只执行第二个注册的函数

**DOM0级事件处理程序优点**

- 简单  
- 跨浏览器【所有现代浏览器支持】
- this 指向被绑定的DOM元素，即 event.currentTarget

**DOM0级事件处理程序缺点**

- 一次只能绑定一个事件处理器在DOM元素上
- function参数中的event参数只对非IE浏览器有效果(因为IE浏览器有特制的window.event)。


## DOM2级事件处理程序

“DOM2级事件”定义了两个方法来处理和删除事件，所有DOM节点中都包含这两种方法

- 注册事件: `element.addEventListener('eventName', function(e){}, true) // 捕获方式`
- 删除事件: `element.removeEventListener('eventName', function(e){}, false) // 冒泡方式`

最后一个参数是布尔型，true代表捕获事件，false代表冒泡事件。

**DOM2级方法可以添加多个事件处理程序**
```js
var btn = document.getElementById('myBtn');
btn.addEventListener('click',function(){
    alert('click one');
},false);
btn.addEventListener('click',function(){
    alert('click two');
},false);
```

以上事件处理程序按照添加他们的方法顺序触发，先弹“click one”，再弹“click two”

**解除DOM2级事件**

通过 addEventListener() 添加的事件处理程序只能使用 removeListener() 来移除；
移除时传入的参数与添加程序时使用的参数相同；
所以通过 addEventListener() 添加的`匿名函数无法移除`

```js
var btn = document.getElementById('myBtn');
var handler = function(){
    alert('click one');
}
btn.addEventListener('click',handler,false);
btn.removeEventListener('click',handler,false);  // 有效
```

**DOM2级事件处理程序优点**

- DOM2支持同一dom元素注册多个同种事件。 
- DOM2新增了捕获和冒泡的概念。 

**note：**

IE9、firefox、Safari、chrome、Opera 都支持DOM2级事件处理程序；
IE8及更早版本不支持DOM事件流（事件捕获）；
为了最大限度地兼容各种浏览器，建议将事件处理程序添加到事件流的冒泡阶段。

## IE事件处理程序

- 注册事件：`element.attachEvent('onclick', function(){})`
- 移除事件：`element.detachEvent('onclick', function(){})`

IE8及更早版本只支持事件冒泡，通过attachEvent() 添加的事件处理程序会被添加到冒泡阶段

**IE事件中的this**

在IE中使用attachEvent() 与使用DOM0级方法的主要区别在于事件处理的作用域。

- 在DOM0级方法，事件处理程序会在其所属元素的作用域内运行；  
- 使用attachEvent()，事件处理程序在全局作用域中运行，`this === window`

```js
var btn = document.getElementById('myBtn');
btn.attachEvent('onclick', function(){
    console.log(this === window); // true
})
```

**IE事件为一个元素添加多个事件处理程序**

```js
var btn = document.getElementById('myBtn');
btn.attachEvent('onclick', function(){
    console.log('clicked'); 
});
btn.attachEvent('onclick', function(){
    console.log('hello'); 
});
```

attachEvent()为按钮添加了两个不同的事件处理程序，与DOM方法不同，而是以`相反的顺序被触发`。
先弹出“Hello”，再弹出"clicked"

**IE事件移除**
同DOM方法一样，传入相同函数的引用

```js
var btn = document.getElementById('myBtn');
var handler = function(){
    alert('click one');
}
btn.attachEvent('onclick', handler);
btn.detachEvent('onclick', handler);  // 有效
```

## 跨浏览器的事件处理程序EventUtil

```js
var EventUtil = {
    addHandler: function(element, type, fn) {
      if (element.addEventListener) {
          element.addEventListener(type, fn, false);
      } else if (element.attachEvent) {
          element.attachEvent("on" + type, fn);
      } else {
          element['on' + type] = fn;
      }
    },
    removeHandle: function(element, type, fn) {
      if (element.removeEventListener) {
          element.removeEventListener(type, fn, false);
      } else if (element.detachEvent) {
          element.detachEvent("on" + type, fn);
      } else {
          element['on' + type] = fn;
      }
    }
}
```
使用EventUtil对象
```js
var btn = document.getElementById('myBtn');
var handler = function() {
    console.log('test');
}
EventUtil.addHandler(btn, "click", handler);
EventUtil.removeHandler(btn, "click", handler);
```

## DOM1、DOM3级事件

- DOM1中没有规定事件相关的内容  
- DOM3级事件模块在DOM2级事件模块的基础上重新定义了某些事件，也添加了一些新事件。
