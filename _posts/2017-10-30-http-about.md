---
layout: post
title: HTTP协议的基础
tags:
- HTTP
categories: HTTP
description: HTTP协议的基础
---

# HTTP协议的基础

## HTTP协议用于客户端和服务器端之间的通信

请求访问文本或图像等资源的一端称为客户端，而提供资源响应的一端称为服务器端。

## HTTP通过请求和响应的交换达成通信

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-30-5.png" alt="">
</div>

## HTTP是不保存状态的协议

无状态(stateless)协议。

HTTP协议自身不对请求和响应之间的通信状态进行保存。即对于发送过的请求或响应都不做持久化处理。

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-30-6.png" alt="">
</div>

## 请求URI定位资源

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-30-7.png" alt="">
</div>

## 告知服务器意图的HTTP方法

- GET：获取资源
- POST：传输实体的主体
- PUT：传输文件
- HEAD：获得报文首部。用于确认URI的有效性及资源更新日期时间等。
- DELETE：删除文件
- OPTIONS：询问支持的方法。
- TRACE：追踪路径
- CONNECT：要求用隧道协议连接代理。使用SSL和TLS协议把通信内容加密后经网络隧道传输。

## 使用方法下达命令Method

## 持久连接省通信量Keep-Alive

HTTP协议的初始版本中，每进行一次HTTP通信就要断开一次TCP连接。

当需要请求的资源较多时，每次请求都会造成TCP连接建立和断开，增加通信量的开销。

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-30-8.png" alt="">
</div>

### 持久连接Keep-Alive

HTTP/1.1提出了了持久连接。只要任意一端没有明确提出断开连接，则保持TCP连接状态。

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-30-9.png" alt="">
</div>

持久连接旨在建立1次TCP连接后进行多次请求和响应的交互。

HTTP/1.1中，所有的连接默认都是持久连接。

持久连接的好处在于减少了TCP连接的重复建立和断开造成的额外开销，减轻了服务器端的负载。另外，减少开销的那部分时间，使HTTP请求和响应能够提早结束，这样Web页面的显示速度也就相应提高了。

### 管线化pipelining

持久连接使得多数请求以管线化方式发送成为可能。

从前发送请求后需等待并收到响应，才能发送下一个请求。

管线化技术出现后，不用等待响应亦可直接发送下一个请求。

这样就能够做到同时并行发送多个请求，而不需要一个接一个地等待响应了。

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-30-10.png" alt="">
</div>

## 使用Cookie的状态管理

HTTP是无状态协议

Cookie技术通过在请求和响应报文中写入Cookie信息来控制客户端的状态。

Cookie会根据从服务器端发送的响应报文内的一个叫做Set-Cookie的首部字段信息，通知客户端保存Cookie。当下次客户端再往该服务器发送请求时，客户端会自动在请求报文中加入Cookie值后发送出去。

服务器端发现客户端发送过来的Cookie后，会去检查究竟是从哪一个客户端发来的连接请求，然后对比服务器上的记录，最后得到之前的状态信息。

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-30-11.png" alt="">
</div>

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-30-12.png" alt="">
</div>
HTTP请求报文和响应报文的内容

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-30-13.png" alt="">
</div>

# HTTP工作原理

HTTP协议定义Web客户端如何从Web服务器请求Web页面，以及服务器如何把Web页面传送给客户端。  
HTTP协议采用了请求/响应模型。客户端向服务器发送一个请求报文，请求报文包含请求的方法、URL、协议版本、请求头部和请求数据。  
服务器以一个状态行作为响应，响应的内容包括协议的版本、成功或者错误代码、服务器信息、响应头部和响应数据。  

# HTTP 请求/响应的步骤

实际的Web服务器会做什么

1. 建立连接 - 接受一个客户端连接，或者不希望与这个客户端建立连接，就将其关闭。  
2. 接收请求 - 从网络中读取一HTTP请求报文。  
3. 处理请求 - 对请求报文进行解释，并采取行动。  
4. 访问资源 - 访问报文中所指的资源。  
5. 构建响应 - 创建带有正确首部的HTTP响应报文。  
6. 发送响应 - 将响应回送给客户端。  
7. 记录事务处理过程 - 将与已完成事务有关的内容记录在一个日志文件中。  

# 更多-more
 
- [图解HTTP-完整彩色版.pdf](http://pengyouyi.site/assets/images/2017/pdf/HTTP.pdf)  