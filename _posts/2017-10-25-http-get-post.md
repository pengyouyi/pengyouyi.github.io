---
layout: post
title: GET请求和POST请求的区别
tags:
- HTTP
categories: HTTP
description: GET请求和POST请求的区别
---

# GET请求和POST请求的区别

两种 HTTP 请求方法：GET 和 POST

在客户机和服务器之间进行请求-响应时，两种最常被用到的方法是：GET 和 POST。

- GET: 从服务器获取资源
- POST: 向服务器发送需要处理的数据

**GET 方法**

查询字符串（名称/值对）是在 GET 请求的 URL 中发送的,  
（就是把数据放置在HTTP协议头中），以?分割URL和传输数据，参数之间以&相连;  
GET提交的数据会在地址栏中显示出来

{% highlight bash linenos %}
GET /books/?sex=man&name=Professional HTTP/1.1
Host: www.wrox.com
User-Agent: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.6)
Gecko/20050225 Firefox/1.0.1
Connection: Keep-Alive
  
{% endhighlight %}

最后一行是空行

**POST 方法**

查询字符串（名称/值对）是在 POST 请求的 HTTP 消息主体中发送的;  
POST提交，地址栏不会改变

{% highlight bash linenos %}
POST / HTTP/1.1
Host: www.wrox.com
User-Agent: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.6)
Gecko/20050225 Firefox/1.0.1
Content-Type: application/x-www-form-urlencoded
Content-Length: 40
Connection: Keep-Alive

name=Professional%20Ajax&publisher=Wiley
{% endhighlight %}

<br />

|比较|GET请求|POST请求|
|---|---|---|
|提交数据方式|GET请求的数据会附在URL之后|POST提交的数据放置在Request body中|
|可见性|数据在 URL 中对所有人都是可见的|数据不会显示在 URL 中|
|传输数据的大小|传输数据受到URL长度的限制|理论上数据不受限,但实际各个WEB服务器会规定对post提交数据大小进行限制|
|传输数据的类型|只允许 ASCII 字符|没有限制。也允许二进制数据|
|传输数据的编码方式|application/x-www-form-urlencoded, <br>只能进行url编码|application/x-www-form-urlencoded 或 multipart/form-data, 支持多种编码方式|
|安全性|不安全，因为参数直接暴露在URL上，所以不能用来传递密码或敏感信息,<br>使用GET提交数据还可能会造成Cross-site request forgery攻击|POST比GET更安全，因为参数不会被保存在浏览器历史或 web 服务器日志中|
|收藏|可收藏为书签|不可收藏为书签|
|缓存|被浏览器主动缓存|不能缓存,除非手动设置|
|历史记录|参数被完整保留在浏览器历史中|参数不会被保留|
|后退/刷新|无害|数据会被重新提交<br>（浏览器应该告知用户数据会被重新提交）|
|安全|GET请求安全，不会改变资源的状态|不安全|
|幂等|GET请求幂等，对同一URL的多个请求返回同样的结果|不幂等|

<br/>
[Node.js GET/POST请求](http://www.runoob.com/nodejs/node-js-get-post.html)

**补充知识：编码类型**

- [四种常见的 POST 提交数据方式](https://imququ.com/post/four-ways-to-post-data-in-http.html)  
- [application/x-www-form-urlencoded和multipart/form-data的区别](application/x-www-form-urlencoded和multipart/form-data的区别)



总结以上表格要表达的意思

1. GET请求安全、幂等；
2. GET通过URL提交数据，不安全；
3. GET传输的数据量小、数据类型单一、数据编码方式单一；
4. GET请求可以被收藏、被缓存、被历史记录，刷新无害


**GET和POST区别补充点**

- GET和POST本质上没有区别，都是是TCP链接。但是由于HTTP的规定和浏览器/服务器的限制，导致他们在应用过程中体现出一些不同。  
- GET产生一个TCP数据包；POST产生两个TCP数据包。

**GET和POST场景应用**

- get 请求类似于查找的过程，通常是向服务器获取数据时使用，比如`查询`，get 请求如果带参数，参数会拼接在地址栏的 url 中暴露出来，http 缓存通常只适用于不改变服务端数据的请求，所以 get 符合 http 缓存，适用于不改变服务端请求数据的这个原则，所以说 get 请求可以被缓存。
- post 不同，post 一般向服务器提交数据时使用，做的是`修改和删除`工作，比如添加和修改表单，post 参数会放在请求体中，所以必须与数据库交互，所以不能使用缓存。


# 更多-more

- [https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)
- [http://www.w3school.com.cn/tags/html_ref_httpmethods.asp](http://www.w3school.com.cn/tags/html_ref_httpmethods.asp)
- [99%的人都理解错了HTTP中GET与POST的区别](https://mp.weixin.qq.com/s?__biz=MzI3NzIzMzg3Mw==&mid=100000054&idx=1&sn=71f6c214f3833d9ca20b9f7dcd9d33e4#rd)