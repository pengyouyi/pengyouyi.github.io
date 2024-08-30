---
layout: post
title: HTML面试题
tags:
- Interview
categories: HTML
description: HTML面试题
---

# HTML面试题

# Doctype
- Doctype作用？标准模式与兼容模式各有什么区别?

（1）、\<!DOCTYPE\>声明位于位于HTML文档中的第一行，处于 \<html\> 标签之前。告知浏览器的解析器用什么文档标准解析这个文档。DOCTYPE不存在或格式不正确会导致文档以兼容模式呈现。

（2）、标准模式的排版 和JS运作模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示,模拟老式浏览器的行为以防止站点无法工作。

# \<!DOCTYPE HTML\>
- HTML5 为什么只需要写 \<!DOCTYPE HTML\>？

 HTML5 不基于 SGML，因此不需要对DTD进行引用，但是需要doctype来规范浏览器的行为（让浏览器按照它们应该的方式来运行）；

 而HTML4.01基于SGML,所以需要对DTD进行引用，才能告知浏览器文档所使用的文档类型。

> [SGML](https://blog.csdn.net/github_39030531/article/details/72854443) - 标准通用标记语言（Standard Generalized Markup Language）

> DTD - 文档类型定义（Document Type Definition）

# WEB标准

- WEB标准以及W3C标准是什么?

标签闭合、标签小写、不乱嵌套、使用外链css和js、结构行为表现的分离。

# 前端页面由哪三层构成

- 前端页面由哪三层构成，分别是什么?作用是什么?  

结构层 Html(页面结构内容，骨架) 

表示层 CSS(网页的样式和外观) 

行为层 js(实现网页的交互，动画效果)

# block & inline
- 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

首先：CSS规范规定，每个元素都有display属性，确定该元素的类型，每个元素都有默认的display值，如div的display默认值为“block”，则为“块级”元素；span默认display属性值为“inline”，是“行内”元素。

（1）行内元素有：a b span img input select strong（图片，表单元素）  
（2）块级元素有：div ul ol li dl dt dd h1 h2 h3 h4…p (标题，列表)  
（3）常见的空元素：
{% highlight html linenos %}
    \<br\> <hr> <img> <input> <link> <meta>
    鲜为人知的是：
    <area> <base> <col> <command> <embed> <keygen> <param> <source> <track> <wbr>
{% endhighlight %}

不同浏览器（版本）、HTML4（5）、CSS2等实际略有差异
[参考:](http://stackoverflow.com/questions/6867254/browsers-default-css-for-html-elements)

# link 和 @import

- 两者都是外部引用 CSS 的方式，使用 link 和 @import 有什么区别？

（1）link 属于 XHTML 标签，除了加载 CSS 外，还能用于定义 RSS, 定义 rel 连接属性等作用；而 @import 是 CSS 提供的，只能用于加载 CSS;  
（2）页面被加载的时，link 会同时被加载，而 @import 引用的 CSS会等到页面被加载完再加载;  
（3）link 是 XHTML 标签，无兼容问题; import 是 CSS2.1 提出的，只在 IE5 以上才能被识别;  
（4）link 支持使用 Javascript 控制 DOM 去改变样式；而 @import不支持。  

# 简述src和href的区别

作用结果不同、浏览器解析方式不同、请求资源类型不同。

**<ul>作用结果不同<u/>l>**

- href 用于在当前文档和引用资源之间确立联系；  
- src 用于替换当前内容。  

**<ul>浏览器解析方式不同</ul>**

- 若在文档中添加 href ，浏览器会识别该文档为 CSS 文件，就会并行下载资源并且不会停止对当前文档的处理。这也是为什么建议使用 link 方式加载 CSS，而不是使用 @import 方式。  
- 当浏览器解析到 src ，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等也如此，类似于将所指向资源应用到当前内容。这也是为什么建议把 js 脚本放在底部而不是头部的原因。  

**<ul>请求资源类型不同/<ul>**

- href 表示超文本引用。用来建立当前元素和文档之间的链接。常用的有：link、a。  
- 请求 src 资源时会将其指向的资源下载并应用到文档中。常用的有 script，img 、iframe。  

简而言之，src 用于替换当前元素；href 用于在当前文档和引用资源之间建立联系。

# Browser kernel
- 介绍一下你对浏览器内核的理解？

主要分成两部分：渲染引擎(layout engineer或Rendering Engine)和JS引擎。

渲染引擎：负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入CSS等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其它需要编辑、显示网络内容的应用程序都需要内核。

JS引擎则：解析和执行javascript来实现网页的动态效果。

最开始渲染引擎和JS引擎并没有区分的很明确，后来JS引擎越来越独立，内核就倾向于只指渲染引擎。

# Browser core
- 常见的浏览器内核有哪些？

Trident内核：IE,MaxThon,TT,The World,360,搜狗浏览器等。[又称MSHTML]  
Gecko内核：Netscape6及以上版本，FF,MozillaSuite/SeaMonkey等  
Presto内核：Opera7及以上。      [Opera内核原为：Presto，现为：Blink;]  
Webkit内核：Safari,Chrome等。   [ Chrome的：Blink（WebKit的分支）]  

详细文章：[浏览器内核的解析和对比](http://www.cnblogs.com/fullhouse/archive/2011/12/19/2293455.html)

# html5 new features
- html5有哪些新特性、移除了那些元素？如何处理HTML5新标签的浏览器兼容问题？如何区分 HTML 和 HTML5？

**HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等功能的增加。**

(1) 语义标签, 比如 article、footer、header、nav、section;   
(2) 增强型表单, 比如新的表单 Input 输入类型[date、time、email、url、search]，和新增的表单属性;  
(3) 视频 video 和音频 audio;  
(4) Canvas 绘图;  
(5) SVG 绘图;  
(6) Geolocation（地理定位）;  
(7) 拖放 API;  
(8) Web Worker 为 JavaScript 创造多线程环境;  
(9) Web Storage 存储【localStorage永久化、sessionStorage临时】;  
(10) WebSocket 全双工通讯的协议;  

[HTML5的十大新特性](https://www.cnblogs.com/vicky1018/p/7705223.html)

- [Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html);  
- WebSocket 可以实现跨域通讯，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息。  

**移除的元素：**

纯表现的元素：basefont，big，center，font, s，strike，tt，u;  
对可用性产生负面影响的元素：frame，frameset，noframes；

**支持HTML5新标签：**

 IE8/IE7/IE6支持通过document.createElement方法产生的标签，
 可以利用这一特性让这些浏览器支持HTML5新标签，
 浏览器支持新标签后，还需要添加标签默认的样式。

 当然也可以直接使用成熟的框架、比如html5shim;

 {% highlight html linenos %}
 <!--[if lt IE 9]>
    `<script> src="http://html5shim.googlecode.com/svn/trunk/html5.js"</script>`
 <![endif]-->
 {% endhighlight %}

**如何区分HTML5：** 

DOCTYPE声明、新增的结构元素、功能元素

# SEO
前端需要注意哪些 SEO

- 合理的 title、description、keywords：搜索对着三项的权重逐个减小，title 值强调重点即可，重要关键词出现不要超过2次，而且要靠前，不同页面title要有所不同；description把页面内容高度概括，长度合适，不可过分堆砌关键词，不同页面 description 有所不同；keywords 列举出重要关键词即可
- 语义化的 HTML 代码，符合 W3C 规范：语义化代码让搜索引擎容易理解网页
- 重要内容 HTML 代码放在最前：搜索引擎抓取 HTML 顺序是从上到下，有的搜索引擎对抓取长度有限制，保证重要内容一定会被抓取
- 重要内容不要用 js 输出：爬虫不会执行 js 获取内容
- 少用 iframe：搜索引擎不会抓取iframe中的内容
- 非装饰性图片必须加 alt
- 提高网站速度：网站速度是搜索引擎排序的一个重要指标

# 语义化-Semantic
- 简述一下你对HTML语义化的理解？

用正确的标签做正确的事情。  
html语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析;  
即使在没有样式CSS情况下也以一种文档格式显示，并且是容易阅读的;  
搜索引擎的爬虫也依赖于HTML标记来确定上下文和各个关键字的权重，利于SEO;  
使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。   

# 离线储存-Offline storage
- HTML5的离线储存怎么使用，工作原理能不能解释一下？

在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。

原理：HTML5的离线存储是基于一个新建的.appcache文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像cookie一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。

如何使用：

1、页面头部像下面一样加入一个manifest的属性；

2、在cache.manifest文件的编写离线存储的资源；

{% highlight html linenos %}
    CACHE MANIFEST
    #v0.11
    CACHE:
    js/app.js
    css/style.css
    NETWORK:
    resourse/logo.png
    FALLBACK:
    / /offline.html
{% endhighlight %}

3、在离线状态时，操作window.applicationCache进行需求实现。

详细的使用请参考：

[HTML5 离线缓存-manifest简介](http://yanhaijing.com/html/2014/12/28/html5-manifest/)

[有趣的HTML5：离线存储](http://segmentfault.com/a/1190000000732617)

# application cache
- 浏览器是怎么对HTML5的离线储存资源进行管理和加载的呢？

在线的情况下，浏览器发现html头部有manifest属性，它会请求manifest文件，如果是第一次访问app，那么浏览器就会根据manifest文件的内容下载相应的资源并且进行
离线存储。如果已经访问过app并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的manifest文件与旧的manifest文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。

离线的情况下，浏览器就直接使用离线存储的资源。

[有趣的HTML5：离线存储](https://segmentfault.com/a/1190000000732617)

# cookies
- 请描述一下 cookies，sessionStorage 和 localStorage 的区别？

cookie是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）。  
cookie数据始终在同源的http请求中携带（即使不需要），记会在浏览器和服务器间来回传递。  
sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。  

**存储大小：**
    
    cookie数据大小不能超过4k。  
    sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。 

**有期时间：**
    
    localStorage    存储持久数据，浏览器关闭后数据不丢失除非主动删除数据；  
    sessionStorage  数据在当前浏览器窗口关闭后自动删除。  
    cookie          设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭

# iframe 的优缺点？

- iframe 优点：

1. iframe 能够原封不动的把嵌入的网页展现出来。  
2. 如果有多个网页引用 iframe，那么你只需要修改 iframe 的内容，就可以实现调用的每一个页面内容的更改，方便快捷【可以增加代码的可重用】。   
3. 如果遇到加载缓慢的第三方内容如图标和广告，这些问题可以由 iframe 来解决。  

- iframe 缺点

1. 会产生很多页面，不容易管理。如果框架个数多的话，可能会出现上下、左右滚动条，会分散访问者的注意力，用户体验度差;
2. 搜索引擎的检索程序无法解读这种页面，不利于 SEO;  
3. iframe 会阻塞主页面的 Onload 事件;  
4. iframe 和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。  

使用 iframe 之前需要考虑这两个缺点。如果需要使用 iframe，最好是通过 javascript 动态给 iframe 添加 src 属性值，这样可以绕开以上两个问题。

# Label
- Label的作用是什么？是怎么用的？

label标签来定义表单控制间的关系,当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。

{% highlight html linenos %}
<label for="Name">Number:</label>
<input type=“text“name="Name" id="Name"/>

<label>Date:<input type="text" name="B"/></label>
{% endhighlight %}

# form close
- HTML5的form如何关闭自动完成功能？

给不想要提示的 form 或某个 input 设置为 autocomplete=off。

# WebSocket
- 如何实现浏览器内多个标签页之间的通信?

WebSocket、SharedWorker；
也可以调用localstorge、cookies等本地存储方式；

localstorge另一个浏览上下文里被添加、修改或删除时，它都会触发一个事件，
我们通过监听事件，控制它的值来进行页面信息通信；
注意quirks：Safari 在无痕模式下设置localstorge值时会抛出 QuotaExceededError 的异常；

# webSocket
- webSocket如何兼容低浏览器？

Adobe Flash Socket 、
ActiveX HTMLFile (IE) 、
基于 multipart 编码发送 XHR 、
基于长轮询的 XHR

# Page Visibility
- 页面可见性（Page Visibility API） 可以有哪些用途？

通过 visibilityState 的值检测页面当前是否可见，以及打开网页的时间等;
在页面被切换到其他后台进程的时候，自动暂停音乐或视频的播放；

# circle click

- 如何在页面上实现一个圆形的可点击区域？

1、map+area 或者 svg

2、border-radius

3、纯js实现 需要求一个点在不在圆上简单算法、获取鼠标坐标等等

# 1px
- 实现不使用 border 画出1px高的线，在不同浏览器的标准模式与怪异模式下都能保持一致的效果。

{% highlight html linenos %}
<div style="height:1px;overflow:hidden;background:red"></div>
{% endhighlight %}

# Verification Code
- 网页验证码是干嘛的，是为了解决什么安全问题。

区分用户是计算机还是人的公共全自动程序。可以防止恶意破解密码、刷票、论坛灌水；  
有效防止黑客对某一个特定注册用户用特定程序暴力破解方式进行不断的登陆尝试。

# title
- title与h1的区别、b与strong的区别、i与em的区别？

title属性没有明确意义只表示是个标题，H1则表示层次明确的标题，对页面信息的抓取也有很大的影响；

strong是标明重点内容，有语气加强的含义，使用阅读设备阅读网络时：\<strong>会重读，而\<B>是展示强调内容。

i内容展示为斜体，em表示强调的文本；

Physical Style Elements -- 自然样式标签 : b, i, u, s, pre  

Semantic Style Elements -- 语义样式标签 : strong, em, ins, del, code  

应该准确使用语义样式标签, 但不能滥用, 如果不能确定时首选使用自然样式标签。

# Reprint

[转载-markYun](https://github.com/markyun/My-blog/tree/master/Front-end-Developer-Questions/Questions-and-Answers)

# img 中的 alt 与 title 属性

- alt 是图片加载失败时，显示在网页上的替代文字；
- title 是鼠标放在图片上面时显示的文字，title 是对图片的描述与进一步说明；

`alt 是 img 必要的属性`，而 title 不是；
对于网站 seo 优化来说，title 与 alt 还有最重要的一点：
搜索引擎对图片意思的判断，主要靠 alt 属性。所以在图片 alt 属性中以简要的文字说明，同时包含关键词，也是页面优化的一部分。
条件允许的话，可以在 title 属性里进一步对图片说明。