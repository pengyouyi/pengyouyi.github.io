---
layout: post
title: HTTP报文常用请求头和响应头
tags:
- HTTP
categories: HTTP
description: HTTP报文常用请求头和响应头
---

# HTTP报文常用请求头

Accept：告诉服务器，客户端支持的数据类型。
 
Accept-Charset：告诉服务器，客户端采用的编码。
 
Accept-Encoding：告诉服务器，客户端支持的数据压缩格式。
 
Accept-Language：告诉服务器，客户端的自然语言环境。

Host：【HTTP1.1规定“必须”】告诉服务器，客户端想访问的主机名。
 
If-Modified-Since：客户端询问服务器，在某个时间点之后修改了没。
 
Referer：告诉服务器，客户端是从哪个资源来访问服务器的。（一般用于防盗链）
 
User-Agent：客户端的软件环境。
 
Cookie：告诉服务器，可以向服务器带数据。
 
Connection：告诉服务器，请求完后是关闭还是保持链接。
 
Date：客户端当前请求时间。

Origin：标识跨域资源请求（请求服务端设置Access-Control-Allow-Origin响应字段）

# HTTP报文常用响应头

Access-Control-Allow-Origin： 指定哪些站点可以参与跨站资源共享

Location：这个头配合302状态码使用，重定向中或者创建新资源时使用。

Server：服务器的类型。

Content-Encoding： 数据采用的压缩格式，告诉浏览器采用哪种方式解码。

Content-Length：返回的数据的长度。

Content-Language：告诉客户端，理解哪种自然语言。

Content-Type：返回主体数据的类型

Last-Modified：告诉浏览器当前资源的最后缓存时间。

Refresh：告诉浏览器隔多长时间刷新一次。

Content-Disposition：告诉浏览器以下载的方式打开数据。

Transfer-Encoding：告诉浏览器数据的传送格式，比如分块方式。

Connection：告诉浏览器，响应完是保持链接还是关闭链接。

Date：告诉客户端，返回响应的时间。

ETag：与缓存相关的头。

以下三个表示服务器通过这个头告诉浏览器不要缓存

expires：-1

cache-control：no-cache

pragma：no-cache

# 更多-more

- [http://tools.jb51.net/table/http_header](http://tools.jb51.net/table/http_header)
- [http://www.jianshu.com/c/47c604fe47af](http://www.jianshu.com/c/47c604fe47af)
- [http://www.jianshu.com/p/d40facd78a88](http://www.jianshu.com/p/d40facd78a88)
