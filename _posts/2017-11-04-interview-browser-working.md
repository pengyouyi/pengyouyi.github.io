---
layout: post
title: 浏览器渲染机制
tags:
- 面试题
categories: other
description: 浏览器工作原理
---

# 浏览器的High-rise structure

浏览器的高层结构:

1. **用户界面** - 包括地址栏、前进/后退按钮、书签菜单等。除了浏览器主窗口显示的您请求的页面外，其他显示的各个部分都属于用户界面。  
2. **浏览器引擎** - 在用户界面和呈现引擎之间传送指令。  
3. **呈现引擎** - 负责显示请求的内容。如果请求的内容是 HTML，它就负责解析 HTML 和 CSS 内容，并将解析后的内容显示在屏幕上。  
4. **网络** - 用于网络调用，比如 HTTP 请求。其接口与平台无关，并为所有平台提供底层实现。  
5. **用户界面后端** - 用于绘制基本的窗口小部件，比如组合框和窗口。其公开了与平台无关的通用接口，而在底层使用操作系统的用户界面方法。  
6. **JavaScript 解释器**。用于解析和执行 JavaScript 代码。  
7. **数据存储**。这是持久层。浏览器需要在硬盘上保存各种数据，例如 Cookie。新的 HTML 规范 (HTML5) 定义了“网络数据库”，这是一个完整（但是轻便）的浏览器内数据库。  

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-04-1.png" alt="">
</div>

渲染引擎(layout engineer或Rendering Engine)

# 呈现引擎-Rendering Engine

## 呈现引擎的作用-role

默认情况下，呈现引擎可显示 HTML 和 XML 文档与图片。通过插件（或浏览器扩展程序），还可以显示其他类型的内容；例如，使用 PDF 查看器插件就能显示 PDF 文档。但是在本章中，我们将集中介绍其主要用途：显示使用 CSS 格式化的 HTML 内容和图片。

## 呈现引擎分类-classification

本文所讨论的浏览器（Firefox、Chrome 浏览器和 Safari）是基于两种呈现引擎构建的。  
Firefox 使用的是 `Gecko`，这是 Mozilla 公司“自制”的呈现引擎。  
而 Safari 和 Chrome 浏览器使用的都是 `WebKit`。  

其他浏览器内核：

`Presto`内核：Opera7及以上。 [Opera内核原为：Presto，现为：Blink;]  
`Trident`内核：IE,MaxThon,TT,The World,360,搜狗浏览器等。[又称MSHTML]  

# 呈现引擎的主流程-main process

解析html以构建dom树 -> 构建render树 -> 布局render树 -> 绘制render树

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-04-2.png" alt="">
</div>

## dom树和render树

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-04-5.png" alt="">
</div>

Rendering Tree 渲染树并不等同于 DOM 树，因为一些像"head"元素或display:none的东西就没必要放在渲染树中了。

display:none 的节点不会被加入 Render Tree，而 visibility: hidden 则会，所以，如果某个节点最开始是不显示的，设为 display:none 是更优的。

# WebKit 主流程

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-04-3.png" alt="">
</div>

Mozilla 的 Gecko 呈现引擎主流程

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-04-4.jpg" alt="">
</div>

WebKit 和 Gecko 使用的术语略有不同，但整体流程是基本相同的。

1. **Create/Update DOM And request css/image/js**：浏览器请求到HTML代码后，在生成DOM的最开始阶段，并行发起css、图片、js的请求，无论他们是否在HEAD里。

2. **Create/Update Render CSSOM**：CSS文件下载完成，开始构建CSSOM

3. **Create/Update Render Tree**：所有CSS文件下载完成，CSSOM构建结束后，和 DOM 一起生成 Render Tree。

4. **Layout**：有了Render Tree，浏览器已经能知道网页中有哪些节点、各个节点的CSS定义以及他们的从属关系。下一步操作称之为Layout，顾名思义就是计算出每个节点在屏幕中的位置。

5. **Painting**：Layout后，浏览器已经知道了哪些节点要显示（which nodes are visible）、每个节点的CSS属性是什么（their computed styles）、每个节点在屏幕中的位置是哪里（geometry）。就进入了最后一步：Painting，按照算出来的规则，通过显卡，把内容画到屏幕上。

需要着重指出的是，这是一个渐进的过程。为达到更好的用户体验，呈现引擎会力求尽快将内容显示在屏幕上。它不必等到整个 HTML 文档解析完毕之后，就会开始构建呈现树和设置布局。在不断接收和处理来自网络的其余内容的同时，呈现引擎会将部分内容解析并显示出来。

# 什么是DOCTYPE及作用

DTD（document type definition,文档类型定义）是一系列的语法规则，用来定义XML或 (X)HTML的文件类型。浏览器会使用它来判断文档类型，决定使用何种协议来解析，以及切换浏览器模式。

DOCTYPE是用来声明文档类型和DTD规范的，一个主要的用途便是文件的合法性验证。如果文件代码不合法，那么浏览器解析时便会出一些差错。

- HTML5
```html
<!DOCTYPE html>
```
- HTML 4.01 Strict
该DTD包含所有HTML元素和属性，但不包括展示性的和弃用的元素（比如font）

- HTML 4.01 Transitional
该DTD包含所有HTML元素和属性，包括展示性的和弃用的元素（比如font）

# 加载-Load

了解浏览器如何进行加载，我们可以在引用外部样式文件，外部js时，将他们放到合适的位置，使浏览器以最快的速度将文件加载完毕。

**加载css和js文件的区别**

- 加载过程中遇到外部css文件，浏览器另外发出一个请求，来获取css文件。遇到图片资源，浏览器也会另外发出一个请求，来获取图片资源。这是异步请求，并不会影响html文档进行加载，  
- 但是当文档加载过程中遇到js文件，html文档会挂起渲染（加载解析渲染同步）的线程，不仅要等待文档中js文件加载完毕，还要等待解析执行完毕，才可以恢复html文档的渲染线程。

> 原因：JS有可能会修改DOM，最为经典的document.write，这意味着，在JS执行完成前，后续所有资源的下载可能是没有必要的，这是js阻塞后续资源下载的根本原因。

> 办法：可以将外部引用的js文件放在</body>前。

**css文件影响js文件的执行**

虽然css文件的加载不影响js文件的加载，但是却影响js文件的执行，即使js文件内只有一行代码，也会造成阻塞。

> 原因：可能会有 var width = $('#id').width()，这意味着，js代码执行前，浏览器必须保证css文件已下载和解析完成。这也是css阻塞后续js的根本原因。

> 办法：当js文件不需要依赖css文件时，可以将js文件放在头部css的前面。

## 异步加载-Asynchronous loading

**1. 异步加载方式**

- 动态脚本加载
- defer
- async

**2. 异步加载的区别**

- defer是在HTML解析完之后才会执行，如果是多个，按照加载的顺序依次执行  
- async是在加载完之后立即执行，如果是多个，执行顺序和加载顺序无关  

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
	<style>
	</style>
	<!-- <script src="js/defer1.js" defer></script>
	<script src="js/defer2.js" defer></script> -->

	<script src="https://cdnjs.cloudflare.com/ajax/libs/seajs/3.0.2/sea.js" async></script>
	<script src="js/defer2.js" async></script>
</head>
<body>
	<div id="dome">
		test
		<script>  
			console.log('write');
		    document.write('<span>write</span>');
		</script>
	</div>

<script>  
for(i=0;i<200000;i++) {
	if(i%20000===0) {
		console.log(i);
	}
}
</script>
</body>
</html>
```

defer1.js

```js
console.log('defer1');
```

defer2.js

```js
console.log('defer2');
```


# 更多-more

- [浏览器的工作原理：新式网络浏览器幕后揭秘](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/)  
- [JS 一定要放在 Body 的最底部么](https://segmentfault.com/a/1190000004292479#articleHeader6)  
- [浏览器渲染原理及流程](http://www.cnblogs.com/slly/p/6640761.html)  
- [浏览器~加载，解析，渲染](http://www.jianshu.com/p/e141d1543143)