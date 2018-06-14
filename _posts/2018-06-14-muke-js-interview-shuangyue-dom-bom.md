---
layout: post
title: 慕课网-前端JavaScript面试技巧(双越)-DOM&BOM
tags:
- Interview
- imooc
categories: JS
description: 慕课网-前端JavaScript面试技巧(双越)-DOM&BOM
---

慕课网学习笔记-前端JavaScript面试技巧(双越)- # 第5章 JS-Web-API（上）- DOM&BOM

# 从基础知识到JSWebAPI

**W3C 标准中关于js的规定有：**

- DOM操作

- BOM操作

- 事件绑定

- ajax 请求（包括HTTP协议）

- 存储

**W3C 标准没有规定任何js基础相关的东西**
 
- 不管什么变量、原型、作用域、和异步

- 只管定义与浏览器中js操作页面的API和全局变量

**js内置的全局函数和对象有哪些**

- Object 、Array 、Boolean 、String 、Math 、JSON、Number、Date、RegExp、Error等

- URI编码方法：encodeURI()、encodeURIComponent()编码；decodeURI()、decodeURIComponent()解码

- window 、document

- navigator.userAgent 

**常说的JS（浏览器执行的JS）包含两部分：**

- js基础知识（ECMA标准）

- js-Web-API (W3C标准)


# DOM本质

浏览器把拿到的HTML代码，结构化一个浏览器能识别并且js可操作的一个模型而已。

**题目**

- DOM是哪种基本的数据结构

- DOM操作常用的API有哪些

- DOM节点的attr 和property 有何区别

**知识点**

- DOM本质

- DOM节点操作

- DOM结构操作

## DOM节点操作

- 获取DOM节点

- prototype

- Attribute

### 获取DOM节点

```js
var div1 = document.getElementById('div1'); 

var divList = document.getElementsByTagName('div');
console.log(divList.length);
console.log(divList[0]);

var containerList = document.getElementsByClassName('container');

var pList = document.querySelectorAll('p');
```

### 获取DOM节点的property
```js
var pList = document.querySelectorAll('p');
var p = pList[0];

console.log(p.style.width);
p.style.width = '100px';

console.log(p.className);
p.className = 'p1';

console.log(p.nodeName);
console.log(p.nodeType);
```

### 获取DOM节点的Attribute
```js
var pList = document.querySelectorAll('p');
var p = pList[0];

p.getAttribute('data-name');
p.setAttribute('data-name', 'omooc');

p.getAttribute('style');
p.setAttribute('style', 'font-size: 30px');
```

## DOM结构操作

- 新增节点

- 获取父节点

- 获取子节点

- 删除节点

**新增DOM节点**
```js
var div1 = document.getElementById('div1');
// 添加新节点
var p1 = document.createElement('p');
p1.innerHTML = 'this is p1';
div1.appendChild(p1);
// 移动已有节点
var p2 = document.getElementById('p2');
div1.appendChild(p2);
```

**获取DOM父元素和子元素**

```js
var div1 = document.getElementById('div1');
var parent = div1.parentNode;

var child = div1.childNodes;
```

**删除节点**
```js
div1.removeChild(child[0]);
```

## DOM是哪种基本的数据结构

树

## DOM操作常用的API有哪些

- 获取DOM节点，以及节点的property和Attribute

- 获取父节点，获取子节点

- 新增节点，删除节点

## DOM节点的attr 和property 有何区别

- property 只是一个JS对象的属性的修改

- Attribute 是对html标签属性的修改

# BOM操作

**题目**

- 如何检测浏览器的类型

- 拆解URL的各部分

**知识点**

- navigator

- screen

- Location

- history

navigator & screen

```js
// navigator
var ua = navigator.userAgent;
var isChrome = ua.indexOf('Chrome');
console.log(isChrome);

// screen
console.log(screen.width);
console.log(screen.height);
```

Location & history
```js
// location
console.log(location.href);
console.log(location.protocol);
console.log(location.pathname);
console.log(location.search);
console.log(location.hash);

// history 
history.back();
history.forward();
```

**查询字符串参数**

```js
function getQueryStringArgs() {
    var qs = (location.search.length > 0 ? location.search.substring(1) : ""), //取得查询字符串并去掉开头的问号
        args = {}, //保存数据的对象
        items = qs.length ? qs.split("&") : [], //根据和号（&）来分割查询字符串，并返回name=value 格式的字符串数组
        item = null,
        name = null,
        value = null,
        i = 0,
        len = items.length;

    //逐个将每一项添加到args 对象中
    for (i = 0; i < len; i++) {
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}

//假设查询字符串是?q=javascript&num=10
var args = getQueryStringArgs();
console.log(args["q"]); //"javascript"
console.log(args["num"]); //"10"
```
《JavaScript高级程序设计第三版》

# 更多-more

[前端JavaScript面试技巧](https://coding.imooc.com/learn/list/115.html)