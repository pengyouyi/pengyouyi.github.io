---
layout: post
title: 前端other面试题及答案
tags:
- Interview
categories: JS
description: 前端other面试题及答案
---

# charset

- 页面编码和被请求的资源编码如果不一致如何处理？

**浏览器解析编码：**

1.根据http协议中的 content-type 中的charset ，
`Content-Type: text/html;charset:utf-8;`
content-type中的charset的优先级最高，如果有charset选项浏览器将忽略以下规则

2.html页面中meta标签中的charset。
`<meta charset="UTF-8">`
(js,css 也有charset ，如果有将用此charset ，如果没有就用宿主html的charset)

3.浏览器默认charset 

**本题答案：**

比如：http://www.yyy.com/a.html 中嵌入了一个http://www.xxx.com/test.js

a.html 的编码是gbk或gb2312的。 而引入的js编码为utf-8的 ，那就需要在引入的时候

`<script src="http://www.xxx.com/test.js" charset="utf-8"></script>`
同理，如果你的页面是utf-8的，引入的js是gbk的，那么就需要加上charset="gbk".


# Memory-leak

- JavaScript常见的内存泄漏原因

内存泄漏指任何对象在您不再拥有或需要它之后仍然存在。

垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为 0（没有其他对象引用过该对象），或对该对象的惟一引用是循环的，那么该对象的内存即可回收。

**常见内存泄漏的原因:**

全局变量、setTimeout、闭包、console.log、DOM泄露、循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）

**全局变量引起的内存泄漏**

```js
function leaks(){  
    leak = 'xxxxxx';//leak 成为一个全局变量，不会被回收
}
```

**闭包引起的内存泄漏**

```js
var leaks = (function(){  
    var leak = 'xxxxxx';// 被闭包所引用，不会被回收
    return function(){
        console.log(leak);
    }
})()
```
如果闭包的作用域链中保存着一个HTML元素，那么该元素将无法被销毁

**DOM泄露**

dom清空或删除时，事件未清除导致的内存泄漏

```js
<div id="container">  
</div>

$('#container').bind('click', function(){
    console.log('click');
}).remove();
```

**setTimeout 内存泄漏**

setTimeout的第一个参数可以是函数，也可以是字符串。当传入字符串时，就会有内存泄漏产生。

不需要重复定时器时，确保对定时器进行清除

# Polyfill

- What is a Polyfill?

polyfill 是“在旧版浏览器上复制标准 API 的 JavaScript 补充”,可以动态地加载 JavaScript 代码或库，在不支持这些标准 API 的浏览器中模拟它们。

所有这些都是 W3C 地理位置 API 定义的对象和函数。因为 polyfill 模拟标准 API，所以能够以一种面向所有浏览器未来的方式针对这些 API 进行开发，一旦对这些 API 的支持变成绝对大多数，则可以方便地去掉 polyfill，无需做任何额外工作。


- 做的项目中，有没有用过或自己实现一些 polyfill 方案（兼容性处理方案）？

✮ html5shiv.js 让IE6、IE7、IE8支持html

✮ Respond.js 让IE6-8支持CSS3 Media Query

✮ HTML5 Geolocation（地理定位）用于定位用户的位置

✮ Placeholder

# Get-file-extension-name

- 使用JS实现获取文件扩展名？

```js
function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}
```		

String.lastIndexOf() 方法返回指定值（本例中的'.'）在调用该方法的字符串中最后出现的位置，如果没找到则返回 -1。

对于'filename'和'.hiddenfile'，lastIndexOf的返回值分别为0和-1无符号右移操作符(>>>) 将-1转换为4294967295，将-2转换为4294967294，这个方法可以保证边缘情况时文件名不变。

String.prototype.slice() 从上面计算的索引处提取文件的扩展名。如果索引比文件名的长度大，结果为""。

# Public-key-encryption

- 是否了解公钥加密和私钥加密。

一般情况下是指私钥用于对数据进行签名，公钥用于对签名进行验证;

HTTP网站在浏览器端用公钥加密敏感数据，然后在服务器端再用私钥解密。

# Comet

- WEB应用从服务器主动推送Data到客户端有那些方式？

1. Comet：XHR长轮询和HTTP流【推荐】

2. SSE（Server-sent Events, 服务器发送事件）

3. html5提供的Websockets协议

4. 不可见的iframe

**轮询: AJAX轮询、JSONP跨域请求的方式轮询(不推荐)**

**Comet**

Comet是一种用于Web的推送技术，能使服务器实时地将更新的信息传送到客户端，而无须客户端发出请求。适合体育比赛的分数和股票报价。

**XHR长轮询**

页面发起一个到服务器的AJAX 请求，然后服务器一直保持连接打开，直到有数据可发送。发送完数据之后，浏览器关闭连接，随即又发起一个到服务器的新请求。这一过程在页面打开期间一直持续不断。

xhr = new XMLHttpRequest();

优点：所有浏览器都支持长轮询，而且都支持CROS的跨域方式请求，建议采用XHR长轮询。

**HTTP流**

流不同于轮询，因为它在页面的整个生命周期内只使用一个HTTP连接。浏览器向服务器发送一个请求，而服务器保持连接打开，然后周期性地向浏览器发送数据。

可以利用XHR对象实现HTTP流，浏览器侦听readystatechange事件和readyState的值是否为3。

缺点：大多数浏览器支持（IE除外）原生支持HTTP流

**SSE（Server-sent Events, 服务器发送事件）：**

SSE是围绕只读Comet交互推出的API或模式。SSE API用于创建到服务器的单向连接，服务器通过这个连接可以发送任意数量的数据。SSE支持短轮询、长轮询和HTTP流。

```js
var source = new EventSource('myevents.php');

source.onmessage = function(event){
    var data = event.data;
    // 处理数据
}
```
注意，传入的URL必须与创建对象的页面同源。

**iframe**

通过在 HTML 页面里嵌入一个隐蔵帧，然后将这个隐蔵帧的 SRC 属性设为对一个长连接的请求，服务器端就能源源不断地往客户端输入数据。

**Web Sockets协议**

HTML5的WebSockets的目标是在一个单独的持久连接上提供全双工、双向通信。

```js
var socket = new WebSocket("ws://www.example.com/server.php")
```

同源策略对Web Sockets不适用，因此可以通过它打开到任何站点的连接。

缺点：考虑现有服务器和低版本浏览器是否支持Web Sockets通信

适用：双向通信（如聊天室）

[Web应用从服务器主动推送数据到客户端有哪些方式？](https://blog.csdn.net/shuo1992/article/details/59477055)

js高程-Page588~595

# url-页面加载

- 一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？（流程说的越详细越好）

注：这题胜在区分度高，知识点覆盖广，再不懂的人，也能答出几句，
而高手可以根据自己擅长的领域自由发挥，从URL规范、HTTP协议、DNS、CDN、数据库查询、
到浏览器流式解析、CSS规则构建、layout、paint、onload/domready、JS执行、JS API绑定等等；

详细版：

1、浏览器会开启一个线程来处理这个请求，对 URL 分析判断如果是 http 协议就按照 Web 方式来处理;

2、调用浏览器内核中的对应方法，比如 WebView 中的 loadUrl 方法;

3、通过DNS解析获取网址的IP地址，设置 UA 等信息发出第二个GET请求;

4、进行HTTP协议会话，客户端发送报头(请求报头);

5、进入到web服务器上的 Web Server，如 Apache、Tomcat、Node.JS 等服务器;

6、进入部署好的后端应用，如 PHP、Java、JavaScript、Python 等，找到对应的请求处理;

7、处理结束回馈报头，此处如果浏览器访问过，缓存上有对应资源，会与服务器最后修改时间对比，一致则返回304;

8、浏览器开始下载html文档(响应报头，状态码200)，同时使用缓存;

9、文档树建立，根据标记请求所需指定MIME类型的文件（比如css、js）,同时设置了cookie;

10、页面开始渲染DOM，JS根据DOM API操作DOM,执行事件绑定等，页面显示完成。

简洁版：

浏览器根据请求的URL交给DNS域名解析，找到真实IP，向服务器发起请求；

服务器交给后台处理完成后返回数据，浏览器接收文件（HTML、JS、CSS、图象等）；

浏览器对加载到的资源（HTML、JS、CSS等）进行语法解析，建立相应的内部数据结构（如HTML的DOM）；

载入解析到的资源文件，渲染页面，完成。

# page重构

- 页面重构怎么操作？

网站重构：在不改变外部行为的前提下，简化结构、添加可读性，而在网站前端保持一致的行为。
也就是说是在不改变UI的情况下，对网站进行优化，在扩展的同时保持一致的UI。

对于传统的网站来说重构通常是：

表格(table)布局改为DIV+CSS  
使网站前端兼容于现代浏览器(针对于不合规范的CSS、如对IE6有效的)  
对于移动平台的优化  
针对于SEO进行优化  
深层次的网站重构应该考虑的方面  

减少代码间的耦合  
让代码保持弹性  
严格按规范编写代码  
设计可扩展的API  
代替旧有的框架、语言(如VB)  
增强用户体验  
通常来说对于速度的优化也包含在重构中  

压缩JS、CSS、image等前端资源(通常是由服务器来解决)  
程序的性能优化(如数据读写)  
采用CDN来加速资源加载  
对于JS DOM的优化  
HTTP服务器的文件缓存  

# about前端工程师

- 对前端工程师这个职位是怎么样理解的？它的前景会怎么样？

前端是最贴近用户的程序员，比后端、数据库、产品经理、运营、安全都近。

1、实现界面交互

2、提升用户体验

3、有了Node.js，前端可以实现服务端的一些事情


前端是最贴近用户的程序员，前端的能力就是能让产品从 90分进化到 100 分，甚至更好，

参与项目，快速高质量完成实现效果图，精确到1px；

与团队成员，UI设计，产品经理的沟通；

做好的页面结构，页面重构和用户体验；

处理hack，兼容、写出优美的代码格式；

针对服务器的优化、拥抱最新前端技术。


# Manage-project

- 平时如何管理你的项目？

先期团队必须确定好全局样式（globe.css），编码模式(utf-8) 等；

编写习惯必须一致（例如都是采用继承式的写法，单样式都写成一行）；

标注样式编写人，各模块都及时标注（标注关键样式调用的地方）；

页面进行标注（例如 页面 模块 开始和结束）；

CSS跟HTML 分文件夹并行存放，命名都得统一（例如style.css）；

JS 分文件夹存放 命名以该JS功能为准的英文翻译。

图片采用整合的 images.png png8 格式文件使用 尽量整合在一起使用方便将来的管理

# new-thing

- 说说最近最流行的一些东西吧？常去哪些网站？

ES6\WebAssembly\Node\MVVM\Web Components\React\React Native\Webpack 组件化

# SEO

- 知道什么是SEO并且怎么优化么? 知道各种meta data的含义么?

网站结构布局优化

1. 扁平化的目录层次

2. 控制首页的链接数量

3. 导航SEO优化

4. 页面的大小控制在100k以下

代码SEO优化

- \<head>标签放网页的标题，各个页面不同

- \<meta keywords>列举出几个重要的关键词

- \<meta description>网页内容的高度概括

- html语义化

- 正确使用H标题

- \<a>标记要加上说明（title属性）、img设置alt属性


[前端如何实现SEO优化](https://blog.csdn.net/H1069495874/article/details/78826382)

[SEO优化实战](http://imweb.io/topic/5682938b57d7a6c47914fc00)

[前端开发中的SEO](https://segmentfault.com/a/1190000002994538)

[什么是Meta标签？ 哪些Meta标签对搜索引擎SEO优化有作用？](https://www.jb51.net/yunying/419531.html)

> 前端后端分离，怎么解决SEO优化的问题呢？

# cookie转发

- 服务器代理转发时，该如何处理cookie？

 nginx ???

# Webpack热更新

- Webpack热更新实现原理?

1. Webpack编译期，为需要热更新的 entry 注入热更新代码(EventSource通信)

2. 页面首次打开后，服务端与客户端通过 EventSource 建立通信渠道，把下一次的 hash 返回前端

3. 客户端获取到hash，这个hash将作为下一次请求服务端 hot-update.js 和 hot-update.json的hash

4. 修改页面代码后，Webpack 监听到文件修改后，开始编译，编译完成后，发送 build 消息给客户端

5. 客户端获取到hash，成功后客户端构造hot-update.js script链接，然后插入主文档

6. hot-update.js 插入成功后，执行hotAPI 的 createRecord 和 reload方法，获取到 Vue 组件的 render方法，重新 render 组件， 继而实现 UI 无刷新更新。


[Webpack热更新](https://zhuanlan.zhihu.com/p/30623057)

# 产品Update

- 产品进行版本升级时，可能发生不兼容性问题，如何提前预防和解决？

非覆盖式发布，API新增而不是在原来的上面修改；

提前做好 @Deprecated的版本提示；