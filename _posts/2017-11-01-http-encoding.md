---
layout: post
title: HTTP内容编码、传输编码、分块传输
tags:
- HTTP
categories: HTTP
description: HTTP内容编码、分块传输
---

# HTTP内容编码

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-01-20.png" alt="">
</div>

内容编码指明应用在实体内容上的编码格式，保持实体信息原样压缩。内容编码后的实体由客户端接收并负责解码。

## HTTP内容编码类型

- gzip (GNU zip)
- compress (UNIX系统的标准压缩)
- deflate (zlib)
- identity (不进行编码，默认)

## Accept-Encoding、Content-Encoding

- Accept-Encoding，HTTP请求头，指定浏览器可以支持的web服务器返回内容压缩编码类型。  
- Content-Encoding，HTTP响应头，web服务器支持的返回内容压缩编码类型。

```html
Accept-Encoding: compress, gzip
Accept-Encoding: *
Accept-Encoding: gzip;q=1.0, identity;q=0.5, *;q=0
```
```html
Content-Encoding: gzip
```

# HTTP传输编码

使用传输编码是为了改变报文中的数据在网络上传输方式。

## Transfer-Encoding、TE

- Transfer-Encoding，(多用作HTTP响应头) 告知接收方对其采用了何种传输编码方式  
- TE，HTTP请求头，客户端愿意接受的传输编码，并通知服务器接受接受尾加头信息  

```html
Transfer-Encoding:chunked
```
```html
TE: trailers,deflate;q=0.5
```

# HTTP分块编码

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-01-21.png" alt="">
</div>

分块编码是一种传输编码，是报文的属性，不是主体的属性。

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-01-22.png" alt="">
</div>

# Accept-Charset

- Accept-Charset：HTTP请求头,浏览器可以接受的字符编码集。

常见字符集名称：ASCII字符集、GB2312字符集、BIG5字符集、GB18030字符集、Unicode字符集(UTF-8)等。


```html
Accept-Charset: iso-8859-5
```
```html
Content-Type: text/html; Charset = utf-8
```

[HTML 字符集](http://www.w3school.com.cn/tags/html_ref_charactersets.asp)


# 更多-more

- [http://www.cnblogs.com/skynet/archive/2011/05/03/2035105.html](http://www.cnblogs.com/skynet/archive/2011/05/03/2035105.html)
- [http://www.cnblogs.com/defias/p/3436517.html](http://www.cnblogs.com/defias/p/3436517.html)