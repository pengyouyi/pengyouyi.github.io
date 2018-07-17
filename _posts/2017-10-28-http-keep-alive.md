---
layout: post
title: HTTP持久连接、管线化
tags:
- HTTP
categories: HTTP
description: HTTP持久连接
---

# HTTP连接性能

## HTTP事务的时延

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-28-9.png" alt="">
</div>

## TCP连接的握手时延

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-28-10.png" alt="">
</div>

在发送数据之前，TCP要传送两个分组来建立连接

## HTTP串行事务处理时延

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-28-11.png" alt="">
</div>

**提高HTTP的连接性能**

1. 并行连接。 通过多TCP连接发起并发的HTTP请求。  
2. 持久连接。 重用TCP连接，以消除连接及关闭时延。  
3. 管道化连接。通过共享的TCP连接发起并发的HTTP请求。  
4. 复用的连接。 交替传送请求和响应（实验阶段）。  

# 并行连接

并行连接可能会提高页面的加载速度

但由于客户端的网络宽带不足，并行连接不一定总是更快。

浏览器使用了并行连接，并行连接的总数通常是4个。服务器可以随意关闭来自特定客户端的超量连接。

# HTTP/1.1持久连接

在事务处理结束之后仍然保持在打开状态的TCP连接被称为`持久连接`。

非持久连接会在每个事务结束之后关闭。持久连接会在不同事务之间保持打开状态，直到客户端或服务器决定将其关闭为止。

HTTP协议采用“请求 - 应答”模式，当使用普通模式，即非Keep-Alive模式时，每个请求/应答客户和服务器都要新建一个连接，完成之后立即断开连接（HTTP协议为无连接的协议）

当使用Keep - Alive模式（又称为持久连接、连接重用）时，Keep - Alive功能使客户端到服务器端的连接持续有效，当出现对服务器的后续请求时，Keep - Alive功能避免了建立或者重新建立连接

{% highlight bash %}
Connection: Keep-Alive
Keep-Alive: max = 5, timeout = 120
{% endhighlight %}

以上说明服务器最多还会为另外5个事务保持持久的打开状态，或者将打开状态保持到连接空闲了2分钟之后。

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-28-12.png" alt="">
</div>

## Connection首部和哑代理

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-28-13.png" alt="">
</div>

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-28-14.png" alt="">
</div>

现代的代理不能转发Connection首部和所有名字出现在Connection值中的首部。

使用Proxy-Connection能解决客户端和服务器之间只有一个代理时的哑代理问题。

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-28-15.png" alt="">
</div>

浏览器发送Proxy-Connection。如果遇到聪明的代理（理解持久连接），它会用Connection取代Proxy-Connection，再发送给服务器

如果有多层代理，Proxy-Connection仍然无法解决问题。

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-28-16.png" alt="">
</div>

## HTTP/1.0和HTTP/1.1持久协议区别

HTTP/1.0中默认是关闭持久连接的,通过发送Connection: Keep-Alive请求首部来激活Keep-Alive连接。

早期HTTP/1.0使用Keep - Alive连接达到持久连接效果。Keep - Alive连接是可选或者不支持的。

持久连接(persistent connection)是HTTP/1.1才出现的，HTTP/1.1所有的连接默认都是持久连接。连接关闭必须添加Connection: close首部。

**启用Keep-Alive的优点**

启用Keep-Alive模式肯定更高效，性能更高。因为避免了建立/释放连接的开销。

单用户客户端与任何服务器或代理之间的连接数不应该超过2个。一个代理与其它服务器或代码之间应该使用不超过2 * N的活跃并发连接。这是为了提高HTTP响应时间，避免拥塞（冗余的连接并不能代码执行性能的提升）。

# HTTP管线化连接

在使用持久连接的情况下，某个连接上消息的传递类似于

请求1 -> 响应1 -> 请求12 -> 响应2 -> 请求3 -> 响应3

管线化连接，某个连接上的消息变成了类似这样

请求1 -> 请求2 -> 请求3 -> 响应1  -> 响应2 -> 响应3

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-28-17.png" alt="">
</div>

**HTTP管线化连接限制**

- 管线化机制通过持久连接完成，仅HTTP/1.1支持此技术  
- 只有GET和HEAD请求可以进行管线化，而POST则有所限制  
- 初次建立连接时不应启动管线机制，因为对方（服务器）不一定支持HTTP/1.1版本的协议  
- 管线化不会影响响应到来的顺序，如上面的例子所示，响应返回的顺序未改变  
- HTTP/1.1要求服务器支持管线化，但并不要求服务器端也对响应进行管线化处理，只是要求对于管线化的请求不失败即可  
- 由于上面提到的服务器端问题，开启管线化很可能并不会带来大幅度的性能提升，而且很多服务器端和代理程序对管线化的支持并不好，因此现代浏览器chrome和Firefox默认并未开启管线化支持  

# 关闭连接-close

所有HTTP客户端、服务器或代理都可以在任意时刻关闭一TCP传输连接。通常在一条报文结束时关闭，也有出错的时候。

**如何确定传输的实体大小？**

- 当服务器知道消息的长度时，使用消息首部字段Conent-Length  
- 当服务器不知道内容的大小时，使用消息首部字段Transfer-Encoding  

Transfer-Encoding 与 Conent-Length 不共存，Transfer-Encoding 优先级高于 Conent-Length

# 更多-more

[https://www.kafan.cn/edu/5110681.html](https://www.kafan.cn/edu/5110681.html)

