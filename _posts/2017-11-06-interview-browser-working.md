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
    <img src="/assets/images/2017/10-11-12/11-07-1.png" alt="">
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
    <img src="/assets/images/2017/10-11-12/11-07-2.png" alt="">
</div>

## dom树和render树

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-07-5.png" alt="">
</div>

Rendering Tree 渲染树并不等同于 DOM 树，因为一些像"head"元素或display:none的东西就没必要放在渲染树中了。

display:none 的节点不会被加入 Render Tree，而 visibility: hidden 则会，所以，如果某个节点最开始是不显示的，设为 display:none 是更优的。

# WebKit 主流程

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-07-3.png" alt="">
</div>

Mozilla 的 Gecko 呈现引擎主流程

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-07-4.jpg" alt="">
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




# 更多-more

- [浏览器的工作原理：新式网络浏览器幕后揭秘](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/)  
- [https://segmentfault.com/a/1190000004292479#articleHeader6](https://segmentfault.com/a/1190000004292479#articleHeader6)  
- [http://www.cnblogs.com/slly/p/6640761.html](http://www.cnblogs.com/slly/p/6640761.html)  
- [http://www.jianshu.com/p/e141d1543143](http://www.jianshu.com/p/e141d1543143)