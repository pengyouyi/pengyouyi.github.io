---
layout: post
title: 同源策略及限制
tags:
- 通信类
categories: HTTP
description: 同源策略及限制
---

# 同源策略-Same-origin policy

## 含义 - Meaning

> 协议相同 window.location.protocol  
> 域名相同 window.location.hostname  
> 端口相同 window.location.port  

[location对象](http://www.w3school.com.cn/jsref/dom_obj_location.asp)

域名、端口、协议，其中任何一个不同都算跨域。

|URL|说明|是否允许通信|
|---|---|---|
|http://www.a.com/a.js <br/> http://70.32.92.74/b.js|域名和域名对应IP|不允许|
|http://www.a.com/a.js <br/> http://script.a.com/b.js|[主域相同，子域不同](http://blog.csdn.net/qq_26744901/article/details/52701116)|不允许|
|http://www.a.com/a.js <br/> http://a.com/b.js|[同一域名，不同二级域名](http://blog.csdn.net/yummy_go/article/details/50675421)（同上）|不允许|

在跨域问题上，域仅仅是通过“URL的首部”来识别，而不会去尝试判断相同的ip地址对应着两个域，或是两个域是否在同一个IP上。

## 目的 - purpose

同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。

"同源政策"是必需的，否则 Cookie 可以共享，互联网就毫无安全可言了。

## 限制范围 - Limit range

如果非同源，共有三种行为受到限制。

（1） Cookie、LocalStorage 和 IndexDB 无法读取。
（2） DOM 无法获得。
（3） AJAX 请求不能发送。

# 跨域的标签-Cross domain Tags

## 可以跨域的标签-Tags

1. `<img src=xxx>`
2. `<link href=xxx>`
3. `<script src=xxx>`
4. `<iframe>`

这些标签可以跨域加载资源，而不受同源策略的限制。这些带"src"属性的标签每次加载时，实际上是由浏览器发起了一次GET请求。不同于 XMLHttpRequest 的是，通过src属性加载的资源，浏览器限制了JavaScript的权限，使其不能读、写返回的内容。

## 跨域的标签的使用场景-Use scenarios

1. `<img>` 用于打点统计，统计网站可能是其他域
2. `<link> <script>` 可以使用CDN，CDN的也是其他域
3. `<script>` 可以用于JSONP

# 规避同源策略-Avoid

㊀ document.domain
㊁ window.name
㊂ localtion.hash 
㊃ window.postMessage (HTML5)   
㊄ JSONP 
㊅ Websocket协议  
㊆ CORS跨域资源共享（W3C标准，支持跨域通信的AJAX）  


# 通过修改document.domain来跨子域

**document.domain跨域原理**

如果两个window或者frames包含的脚本可以把domain设置成一样的值，那么就可以规避同源策略，每个window之间可以互相沟通。

- 这种方式也不是一直都有用，因为端口号是在内部保存的，有可能被保存成null。换句话说，example.com的端口号80，在我们更新document.domain属性的时候可能会变成null。为null的端口可能不被认为是80，这主要依赖浏览器实现。  

- document.domain的设置是有限制的，我们只能把`document.domain设置成自身或更高一级的父域`，且`主域必须相同`。例如：a.b.example.com 中某个文档的document.domain 可以设成a.b.example.com、b.example.com 、example.com中的任意一个，但是不可以设成 c.a.b.example.com,因为这是当前域的子域，也不可以设成baidu.com,因为主域已经不相同了。

## Cookie

Cookie 是服务器写入浏览器的一小段信息，只有同源的网页才能共享。但是，两个网页一级域名相同，只是二级域名不同，浏览器允许通过设置document.domain共享 Cookie。

## document.domain获取Cookie例子

> 场景：A网页是 http://w1.example.com/a.html ，B网页是 http://w2.example.com/b.html ，那么只要设置相同的document.domain，两个网页就可以共享Cookie。

```js
document.domain = 'example.com';
```

A网页通过脚本设置一个 Cookie。
```js
document.cookie = "test1=hello";
```

B网页就可以读到这个 Cookie。
```js
var allCookie = document.cookie;
```

> document.domain这种方法只适用于 Cookie 和 iframe 窗口，LocalStorage 和 IndexDB 无法通过这种方法.

## document.domain + iframe例子

> 场景：http://a.study.cn/a.html 请求 http://b.study.cn/b.html

a.html
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
        <script type="text/javascript">
            document.domain = 'study.cn';
            function test() {
            	var iframe = document.getElementById('a');
            	var win = iframe.contentWindow;

            	var doc = win.document;
            	var name = win.name;
            	
                alert(win);
            }
        </script>
</head>
<body>
    <iframe id='a' src='http://b.study.cn/b.html' onload='test()'>
</body>
</html>
```

b.html
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<script type="text/javascript">
document.domain = 'study.cn';
</script>
</head>
<body>
    我是b.study.cn的body
</body>
</html>
```

运行效果截图:
<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-07-1.png" alt="">
</div>

可以通过js访问到iframe中的各种属性和对象.

如果你想在 http://a.study.cn/a.html 页面中通过ajax直接请求页面 http://b.study.cn/b.html ，即使你设置了相同的document.domain也还是不行的.

*解决：如果你想通过ajax的方法去与不同子域的页面交互，除了使用jsonp的方法外，还可以用一个隐藏的iframe来做一个代理。原理就是让这个iframe载入一个与你想要通过ajax获取数据的目标页面处在相同的域的页面，所以这个iframe中的页面是可以正常使用ajax去获取你要的数据的，然后就是通过我们刚刚讲得修改document.domain的方法，让我们能通过js完全控制这个iframe，这样我们就可以让iframe去发送ajax请求，然后收到的数据我们也可以获得了。?????*

**document.domain跨域缺点**

1、安全性，当一个站点（b.a.com）被攻击后，另一个站点（c.a.com）会引起安全漏洞。  
2、如果一个页面中引入多个iframe，要想能够操作所有iframe，必须都得设置相同domain。

# location.hash + iframe

**location.hash跨域原理：**

hash改变不刷新页面，search改变刷新页面

**location.hash跨域场景：**

> 当前页面A通过iframe或iframe嵌入了跨域的页面B

父窗口A可以把信息，写入子窗口的片段标识符。

```js
var B = document.getElementsByTagName('iframe');
B.src = B.src + '#' + data;
```

子窗口B通过监听`hashchange事件`得到通知

```js
window.onhashchange = function(){
  var data = window.location.hash;
}
```

同样的，子窗口也可以改变父窗口的片段标识符。

```js
parent.location.href= target + "#" + hash;
```

**location.hash跨域缺点**

数据直接暴露在了url中，数据容量和类型都有限等

# window.name + iframe

**window.name跨域原理：**

浏览器窗口有window.name属性。这个属性的最大特点是，

在一个窗口(window)的生命周期内,窗口载入的所有的页面（无论是否同源）都是`共享一个window.name`的，每个页面对window.name都有读写的权限，

window.name是持久存在一个窗口载入过的所有页面中的，并不会因新页面的载入而进行重置。

**window.name跨域场景：**

比如有一个 www.example.com/a.html 页面,需要通过a.html页面里的js来获取另一个位于不同域上的页面 www.cnblogs.com/data.html 里的数据。

（1）data.html页面里的代码很简单，就是给当前的window.name设置一个a.html页面想要得到的数据值。

data.html里的代码：
```js
<script>
    window.name = '要传送的内容,所有可以转化成字符串来传递的数据都可以在这里使用，比如可以传递一个JSON数据';
</script>
```

那么在a.html页面中，我们怎么把data.html页面载入进来呢？显然我们不能直接在a.html页面中通过改变window.location来载入data.html页面，因为我们想要即使a.html页面不跳转也能得到data.html里的数据。答案就是在a.html页面中使用一个隐藏的iframe来充当一个中间人角色，由iframe去获取data.html的数据，然后a.html再去得到iframe获取到的数据。

充当中间人的iframe想要获取到data.html的通过window.name设置的数据，只需要把这个iframe的src设为 www.cnblogs.com/data.html 就行了。然后a.html想要得到iframe所获取到的数据，也就是想要得到iframe的window.name的值，还必须把这个iframe的src设成跟a.html页面同一个域才行，不然根据前面讲的同源策略，a.html是不能访问到iframe里的window.name属性的。

（2）a.html页面的代码：
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<script type="text/javascript">
  function getData() {
    var iframe = document.getElementById("proxy");
    iframe.onload = function () {
      var data = iframe.contentWindow.name;
      alert(data);
    }
    iframe.src = "b.html"; //b.html是随便的一个页面，只要与a.html同源就行，目的是让a.html能访问到iframe里面的东西。
  }
</script>
</head>
<body>
    <iframe id = "proxy" src="www.cnblogs.com/data.html" style="display:none" onload="getData()"></iframe>
</body>
</html>
```

**window.name 方法的优缺点**

- 优点: window.name容量很大，可以放置非常长的字符串（2MB）；  
- 缺点: 必须监听子窗口window.name属性的变化，影响网页性能。

# HTML5的window.postMessage

HTML5引入了一个全新的API：跨文档通信 API（Cross-document messaging）。

这个API为window对象新增了一个`otherWindow.postMessage(message, targetOrigin)`方法，允许跨窗口通信，不论这两个窗口是否同源。

> 调用postMessage方法的window对象是指要接收消息的那一个window对象，即otherWindow: 可以是页面中iframe的contentWindow属性；window.open的返回值；通过name或下标从window.frames取到的值。

> 该方法的第一个参数message为要发送的消息，类型只能为字符串；

> 第二个参数targetOrigin用来限定接收消息的那个window对象所在的域，如果不想限定域，可以使用通配符 *  。

> 需要接收消息的window对象，可是通过监听自身的`message事件`来获取传过来的消息，消息内容储存在该事件对象的data属性中。

**window.postMessage跨域场景：**

> **场景一：**A窗口 http://aaa.com 向B窗口 http://bbb.com 发消息。

A页面通过postMessage方法发送消息：
```js
var popup = window.open('http://bbb.com', 'title');
popup.postMessage('Hello World!', 'http://bbb.com');
// Bwindow.postMessage('data', 'http://bbb.com');
```

B页面通过message事件监听并接受消息:
```js
window.addEventListener('message', function(e) {
  console.log(e.data);  // data
  console.log(e.source);  // Bwindow
  console.log(e.origin);  // http://aaa.com
},false);
```

同理，也可以B页面发送消息，然后A页面监听并接受消息。

> **场景二：**a.com/index.html页面 向 b.com/index.html页面 发消息。

a.com/index.html中的代码：
```js
<iframe id="ifr" src="b.com/index.html"></iframe>
<script type="text/javascript">
window.onload = function() {
    var ifr = document.getElementById('ifr');

    var win = ifr.contentWindow;  // 获取window对象
    var targetOrigin = 'http://b.com';  // 若写成'http://b.com/c/proxy.html'效果一样
                                        // 若写成'http://c.com'就不会执行postMessage了
    win.postMessage('我是来自a页面的消息', targetOrigin);
};
</script>
```

b.com/index.html中的代码：
```js
window.onmessage = function(e) {
  alert(e.data);
}
```
运行a页面，就能看到b页面收到了消息

**postMessage优缺点**

- 优点：postMessage的使用十分简单，在处理一些和多页面通信、页面与iframe等消息通信的跨域问题时，有着很好的适用性。
- 缺点：[IE11才完全支持](https://caniuse.com/#feat=x-doc-messaging)、IE10对postMessage的支持有限制

> 通过window.postMessage，读写其他窗口的 LocalStorage 也成为了可能。

[https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)

# JSONP

**JSONP跨域原理：**

在js中，我们直接用XMLHttpRequest请求不同域上的数据时，是不可以的。但是，在页面上引入不同域上的js脚本文件却是可以的，jsonp正是利用这个特性来实现的。

JSONP包含两部分：回调函数和数据。

- 回调函数是当响应到来时要放在当前页面被调用的函数。  
- 数据就是传入回调函数中的json数据，也就是回调函数的参数了。  

**JSONP跨域步骤**

（1）网页通过添加一个script元素，向服务器请求JSON数据，这种做法不受同源政策限制；  
（2）服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。  
（3）回调函数在当前页面被立即调用，前提是浏览器定义了这个回调函数  

**JSONP跨域场景：**

> 有个a.html页面，它里面的代码需要利用ajax获取一个不同域上的json数据，假设这个json数据地址是 http://example.com/data.php,

a.html
```js
<script>
  function dosomething(jsondata) {

  }
</script>
<script src="http://example.com/data.php?callback=dosomething"></script>
```

script标签向服务器example.com发出请求。注意，该请求的查询字符串有一个callback参数，用来指定回调函数的名字，这对于JSONP是必需的。

因为是当做一个js文件来引入的，所以 http://example.com/data.php 返回的必须是一个能执行的js文件，所以这个页面的php代码可能是这样的:

```php
<?php
$callback = $_GET['callback'];  // 得到回调函数名
$data = array('a', 'b', 'c');  // 要返回的数据
echo $callback.'('.json_encode($data).')';  // 输出
?>
```

最终那个页面输出的结果是:

```js
dosomething(['a', 'b', 'c']);
```

所以通过 http://example.com/data.php?callback=dosomething 得到的js文件，就是我们之前定义的dosomething函数,并且它的参数就是我们需要的json数据，这样我们就跨域获得了我们需要的数据。

a.html
```html
<script>
  function dosomething(jsondata) {
  }
</script>
<!-- <script src="http://example.com/data.php?callback=dosomething"></script> -->
<script>
  dosomething(['a', 'b', 'c']);
</script>
```

由于script元素请求的脚本，直接作为代码运行。这时，只要浏览器定义了dosomething函数，该函数就会立即调用。作为参数的JSON数据被视为JavaScript对象，而不是字符串，因此避免了使用JSON.parse的步骤。

## jQuery实现JSONP

1) $.getJSON方法来请求跨域数据：
```js
//callback后面的?会由jQuery自动生成方法名
$.getJSON('http://www.b.com/getdata?callback=?', function(data) {
  console.log(data.msg); // 处理获得的json数据
});
```

2) $.ajax方法，指定dataType为jsonp：
```js
$.ajax({
  url: 'http://www.b.com/getdata?callback=?', //不指定回调名，可省略callback参数，会由jQuery自动生成
  dataType: 'jsonp',
  jsonpCallback: 'demo', //可省略
  success: function(data) {
    console.log(data.msg);
  }
});
```

**JSONP跨域优缺点**

- 优点：JSONP是服务器与客户端跨源通信的常用方法。最大特点就是简单适用，老式浏览器全部支持。  
- 缺点：  
- 1、JSONP只支持GET请求;   
- 2、JSONP只支持跨域HTTP请求这种情况,不能解决不同域的两个页面之间如何进行JavaScript调用的问题;   
- 3、要确定jsonp请求是否失败并不容易,回调函数调用失败，浏览器会以静默失败的方式处理  
- 4、安全问题(请求代码中可能存在安全隐患)  

# WebSocket通信协议

**webSocket跨域原理：**

WebSocket是一种通信协议，使用ws://（非加密）和wss://（加密）作为协议前缀。该协议`不实行同源政策`，只要服务器支持，就可以通过它进行跨源通信。

**webSocket跨域实现步骤：**

在JS创建了webSocket之后，会有一个HTTP请求发送到浏览器以发起连接。取得服务器响应后，建立的连接会使用HTTP升级从HTTP协议交换为webSockt协议。

浏览器发出的WebSocket请求的头信息

```html
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com
```

上面代码中，有一个字段是Origin，表示该请求的`请求源（origin）`，即发自哪个域名。

正是因为有了Origin这个字段，所以WebSocket才没有实行同源政策。因为服务器可以根据这个字段，判断是否许可本次通信。如果该域名在`白名单`内，服务器就会做出如下回应。

```html
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat
```

**WebSocket客户端示例**

```js
var ws = new WebSocket("wss://echo.websocket.org");

ws.onopen = function(evt) { 
  console.log("Connection open ..."); 
  ws.send("Hello WebSockets!");
};

ws.onmessage = function(evt) {
  console.log( "Received Message: " + evt.data);
  ws.close();
};

ws.onclose = function(evt) {
  console.log("Connection closed.");
}; 
```

[http://www.ruanyifeng.com/blog/2017/05/websocket.html](http://www.ruanyifeng.com/blog/2017/05/websocket.html)


# W3C的CORS跨域资源共享

**CORS原理**

"跨域资源共享"（Cross-origin resource sharing）。它是W3C标准，是跨源AJAX请求的根本解决方法。

CORS使用了一个新的`Origin请求头`和一个新的`Access-Control-Allow-Origin响应头`扩展了HTTP。

整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

因此，实现CORS通信的关键是服务器。只要`服务器实现了CORS接口`，就可以跨源通信。

> 浏览器将CORS请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。

**CORS简单请求的基本流程**

浏览器发现这次跨源AJAX请求是简单请求，就自动在头信息之中，添加一个Origin字段。

```js
GET /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

Origin字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。

服务器端对于CORS的支持，通过设置Access-Control-Allow-Origin头标识哪些站点可以请求文件。如果浏览器检测到相应的设置，就可以允许Ajax进行跨域的访问。

```js
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
Content-Type: text/html; charset=utf-8
```


**CORS具体例子**

平时的ajax请求:

```html
<script type="text/javascript">
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/damonare",true);
    xhr.send();
</script>
```
使用CORS的Ajax代码：
```html
<script type="text/javascript">
    var xhr = new XMLHttpRequest();
    xhr.open("￼GET", "http://segmentfault.com/u/trigkit4/",true);
    xhr.send();
</script>
```

代码与之前的区别就在于相对路径换成了其他域的绝对路径，也就是你要跨域访问的接口地址。

**CORS跨域优缺点**

- 优点：CORS支持所有类型的HTTP请求,CORS与JSONP相比，无疑更为先进、方便和可靠。  
- 缺点：CORS需要浏览器和服务器同时支持。IE浏览器不能低于IE10。

[http://www.ruanyifeng.com/blog/2016/04/cors.html](http://www.ruanyifeng.com/blog/2016/04/cors.html)

# 总结-all

在不同域的文档之间传输数据,前端的方式:

对于主域相同，子域不同的父子窗口通信

- document.domain + iframe, ①获取document.cookie; ②获取子iframe.contentWindow  

对于完全不同源的网站，有三种方法可以解决跨域窗口的通信问题。

- location.hash + iframe，子窗口监听hashchange事件得到消息  
- window.name + iframe, 同窗口的页面共享window.name，父窗口监听子窗口window.name属性的变化得到消息  
- otherWindow.postMessage(message, targetOrigin) + iframe，子iframe监听message事件来获取父页面传过来的消息  

<hr>

规避AJAX同源限制:

- JSONP - 前后端结合：script.src发请求，callbackFn(data)  
- WebSocket - 协议不实行同源政策，Origin请求头，服务器白名单  
- CORS跨域资源共享  - 纯后端方式: 浏览器自动添加Origin，服务器设置Access-Control-Allow-Origin白名单  

# 更多-more

- [https://en.wikipedia.org/wiki/Same-origin_policy](https://en.wikipedia.org/wiki/Same-origin_policy)  
- [浏览器同源政策及其规避方法-阮一峰](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)  
- [https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)  
- [https://en.wikipedia.org/wiki/Same-origin_policy 翻译](http://www.jianshu.com/p/beb059c43a8b)  
- [前端解决跨域问题的8种方案（最新最全）](http://m.blog.csdn.net/joyhen/article/details/21631833)  
- [前端的跨域请求方法使用场景及各自的局限性](http://www.cnblogs.com/2050/p/3191744.html)  
- [前端跨域知识总结-前端大全-秦至](https://mp.weixin.qq.com/s/NOmsbKZsryTUONQj2gBFIA)  
- [JavaScript 跨域总结与解决办法-前端大全-rainman](https://mp.weixin.qq.com/s/Ulh3dq-9eHwbS2ggOcu7jA)
- [那些年，那些跨域问题-前端早读课-金蝶](https://mp.weixin.qq.com/s/G37_ZBIj_WkSpCyTuTpg3g)