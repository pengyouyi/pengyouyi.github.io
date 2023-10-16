---
layout: post
title: HTTP报文-首部分类
tags:
- HTTP
categories: HTTP
description: HTTP报文-首部
---

# HTTP报文-首部

HTTP首部字段想请求和响应报文中添加了一些附加信息。  
本质上来说，他们只是一些名/值对的列表。

请求报文和响应报文的结构

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-27-1.png" alt="">
</div>

请求报文和响应报文的实例

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-27-2.png" alt="">
</div>

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-27-3.png" alt="">
</div>

# HTTP报文-首部分类

 HTTP首部可以分为以下5类

 **1. 通用首部**  
 既可用于请求，也可用于响应。可以在客户端、服务器和其他应用程序之间提供通用功能。

 **2. 请求首部**  
 是请求报文特有的。补充了请求的附加内容、客户端信息、响应内容相关优先级等信息。

 **3. 响应首部**  
 是响应报文特有的。为客户端提供信息，补充响应的附加内容，也会要求客户端附加额外的内容信息。

 **4. 实体首部**  
针对请求报文和响应报文的实体部分使用的首部。描述实体的长度和内容，或者更新时间。

 **5. 扩展首部**  
 非标准HTTP规范，由程序开发者创建


# 通用首部(General-Header)

## 通用性息信首部-General

|首部|描述|示例|
|---|---|---|
|Connection|表示是否需要持久连接。（HTTP 1.1默认进行持久连接）|Connection: close|
|Date|报文创建的日期和时间，响应必须给出，缓存评估新鲜度|Date: Tue, 15 Nov 2010 08:12:31 GMT|
|Trailer|如果报文采用了分块传输编码方式，就可以使用这个首部列出位于报文拖挂(Trailer)部分的首部集合|Trailer: Content-Length|
|Upgrade|发送端想”升级“，向服务器指定某种传输协议以便服务器进行转换（如果支持），服务端回应101响应时，必须包含这个首部|Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11|
|Via|显示报文经过的中间节点(代理、网关)|Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)|
|MIME-Version|发送端使用的MIME版本|MIME-Version: 1.0|
|Transfer-Encoding|告知接收方对其采用了何种传输编码方式|Transfer-Encoding:chunked|


## 通用缓存首部-Universal cache

|首部|描述|示例|
|---|---|---|
|Cache-Control|【HTTP/1.1】指定请求和响应遵循的缓存机制|Cache-Control: no-cache|
|Pragma|随报文传送一些指令。通常来控制缓存。迫使浏览器重新加载或刷新时，即使缓存新鲜也要请求服务器|Pragma: no-cache|

# 请求首部(request header)

请求首部说明是谁或什么在发送请求、请求源自何处，或者客户端的喜好及能力。

服务器可以根据请求首部给出的客户端信息，试着为客户端提供更好的响应。

## 请求的信息性首部-Informational

|首部|描述|示例|
|---|---|---|
|From|发出请求的用户的Email|From: user@email.com|
|Host|指定请求的服务器的域名和端口号，HTTP1.1规定客户端请求必须包含Host,否则它返回400 bad request|Host: www.zcmhi.com|
|Referer|使服务器知道客户端从哪里获得其请求的URL；先前网页的地址，当前请求网页紧随其后,即来路|Referer: http://www.zcmhi.com/archives/71.html|
|User-Agent|告诉服务器发出请求的客户端信息|User-Agent: Mozilla/5.0 (Linux; X11)|
|UA-(CPU,Disp,OS,Color,Pixels)|不推荐使用，客户端机器的CPU、显示器的尺寸和色彩深度、操作系统、显示器的颜色信息、显示器的像素信息|UA-OS: Windows 95|

## Accept首部

Accept首部为客户端提供了一种将其喜好和能力告知服务器的方式，包括它们想要什么，可以使用什么，不想要什么。

Accept首部使连接的两端受益：

客户端会得到它们想要的内容，服务器则不会浪费其时间和带宽来发送客户端无法使用的东西。

|首部|描述|示例|
|---|---|---|
|Accept|告诉服务器能够发送哪些媒体类型|Accept: text/plain, text/html|
|Accept-Charset|客户端可以接受哪些字符集|Accept-Charset: utf-8, gb2312|
|Accept-Encoding|客户端可以接受哪些编码方式|Accept-Encoding: compress, gzip, deflate, identity(默认不压缩)|
|Accept-Language|浏览器可以接受或优选哪种语言|Accept-Language: en,zh|
|TE|客户端愿意接受的传输编码，并通知服务器接受接受尾加头信息|TE: trailers,deflate;q=0.5|


## 条件请求首部-Conditional

|首部|描述|示例|
|---|---|---|
|Expect|客户端告诉服务器他们需要某种行为，服务器给出反馈【成功：100 Continue ；失败：417 Expectation Failed】|Expect: 100-continue|
|If-Match|只有请求内容与实体相匹配才有效，服务器对比If-Match首部的实体标记与当前的实体标记，匹配才返回对象|If-Match: “737060cd8c284d8af7ad3082f209582d”|
|If-None-Match|如果内容未改变返回304代码，参数为服务器先前发送的Etag，与服务器回应的Etag比较判断是否改变|If-None-Match: “737060cd8c284d8af7ad3082f209582d”|
|Range|只请求实体的一部分，指定范围|Range: bytes=500-999|
|If-Range|客户端拥有某范围内资源的副本，它要对范围进行再验证。如果实体未改变，服务器发送客户端丢失的部分，否则发送整个实体。参数也为Etag或Date|If-Range: “737060cd8c284d8af7ad3082f209582d”|
|If-Modified-Since|如果请求的部分在指定时间之后被修改则请求成功，未被修改则返回304代码|If-Modified-Since: Sat, 29 Oct 2010 19:43:31 GMT|
|If-Unmodified-Since|只有实体在指定时间之后未被修改才请求成功|If-Unmodified-Since: Sat, 29 Oct 2010 19:43:31 GMT|



## 安全请求首部-Security

|首部|描述|示例|
|---|---|---|
|Authorization|向服务器(401)回应自己的身份验证信息，HTTP授权的授权证书|Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==|
|Cookie|客户端识别和跟踪的扩展首部|Cookie: Skin=new;|
|Cookie2|识别请求发起者能够理解哪种类型的Cookie|Cookie: $Version=1; Skin=new;|


## 代理请求首部-Proxy

|首部|描述|示例|
|---|---|---|
|Max-Forwards|指定请求所经过的代理或其他中间节点的最大数目。只能和TRACE方法一同使用|Max-Forwards: 10|
|Proxy-Authorization|与代理进行认证时使用，响应Proxy-Authenticate质询|Proxy-Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==|
|Proxy-Connection|客户端与代理之间建立连接使用。解决Connection被哑代理盲转发的问题|Proxy-Connection: close|



# 响应首部(Response header)

## 响应的信息性首部-Informative

|首部|描述|示例|
|---|---|---|
|Age|(从原始服务器创建开始)响应持续时间，响应是通过中间节点，很可能从代理的缓存传过来的|Age: 12|
|Retry-After|如果资源不可用的话，告诉客户端什么时候(或多久之后)重新发送请求|Retry-After: 120|
|Server|服务器标识自己，同User-Agent标识客户端一样|Server: Apache/1.3.27 (Unix) (Red-Hat/Linux)|
|Warning|警告实体可能存在的问题|Warning: 199 Miscellaneous warning|


## 协商首部-Negotiation

|首部|描述|示例|
|---|---|---|
|Accept-Ranges|表明服务器是否接受请求资源的某个范围|Accept-Ranges: bytes|
|Allow|告诉客户端可以对特定资源使用哪些HTTP方法，发送405Method Not Allowed响应的HTTP/1.1服务器必须包含Allow首部|Allow: GET, HEAD|
|Location|用来重定向接收方到非请求URL的位置来完成请求或标识新的资源|Location: http://www.zcmhi.com/archives/94.html|
|Vary|是一个首部列表，服务器查看其它首部的列表，根据首部的内容挑出最适合的版本发送给客户端|Vary: User-Agent|


## 安全响应首部-Security

|首部|描述|示例|
|---|---|---|
|Proxy-Authenticate|代理用这个首部来质询发送请求的应用程序，要求其对自身进行认证，HTTP/1.1代理服务器发送407Proxy Authentication Required响应，必须包含这个首部|Proxy-Authenticate: Basic|
|WWW-Authenticate|用于401Unauthorized 响应，向客户端发布一个质询认证方案，表明客户端请求实体应该使用的授权方案|WWW-Authenticate: Basic|
|Set-Cookie|不是真正的安全首部，但隐含有安全功能；可以在客户端设置一个令牌，以便服务器对客户端进行标识|Set-Cookie: UserID=JohnDoe;|
|Set-Cookie2|是|Set-Cookie的扩展|Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1|

# 实体首部(Entity header)

## 内容首部-Content

内容首部说明了实体内容的类型、尺寸以及处理它所需的其他有用信息

|首部|描述|示例|
|---|---|---|
|Content-Type|请求或返回主体的媒体类型|Content-Type: text/html; charset=utf-8|
|Content-Length|请求或响应主体的长度或尺寸，比如HEAD方法得到服务器给的header就有这个首部|Content-Length: 348|
|Content-Range|在整个返回体中本部分的字节位置【206】|Content-Range: bytes 21010-47021/47022|
|Content-Encoding|是否对某对象进行过编码。比如，服务器告诉客户端它对对象执行过哪种编码，客户端就可以对报文解码|Content-Encoding: compress, gzip|
|Content-Language|告诉客户端，理解哪种自然语言|Content-Language: en,zh|
|Content-Base|服务器为响应主体部分中要解析的URL指定一个基础URL|Content-Base: http://www.joes-hardware.com|
|Content-Location|服务器用它将客户端重定向到一个新URL|Content-Location: http://www.joes-hardware.com/index.htm|
|Content-MD5|对报文主体进行校验|Content-MD5: Q2hlY2sgSW50ZWdyaXR5IQ==|


## 实体缓存首部-Entity cache

|首部|描述|示例|
|---|---|---|
|ETag|实体标记，某个特定资源版本的标识符|ETag: “737060cd8c284d8af7ad3082f209582d”|
|Expires|给出响应失效的日期和时间，客户端缓存副本，在有效期之前，不去访问服务器资源是否有效|Expires: Thu, 01 Dec 2010 16:00:00 GMT|
|Last-Modified|服务器上的资源的最后修改时间或创建时间|Last-Modified: Tue, 15 Nov 2010 12:45:26 GMT|


# 扩展首部(extension header)

|首部|描述|示例|
|---|---|---|
|Cookie|客户端识别和跟踪的扩展首部|Cookie: Skin=new;|
|Cookie2|识别请求发起者能够理解哪种类型的Cookie|Cookie: $Version=1; Skin=new;|
|MIME-Version|发送端使用的MIME版本|MIME-Version: 1.0|
|Set-Cookie|不是真正的安全首部，但隐含有安全功能；可以在客户端设置一个令牌，以便服务器对客户端进行标识|Set-Cookie: UserID=JohnDoe;|
|Set-Cookie2|是|Set-Cookie的扩展|Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1|
|UA-(CPU,Disp,OS,Color,Pixels)|不推荐使用，客户端机器的CPU、显示器的尺寸和色彩深度、操作系统、显示器的颜色信息、显示器的像素信息|UA-OS: Windows 95|
|Content-Disposition|告诉浏览器以下载的方式打开数据。|？|
|X-Frame-Options|HTTP响应首部，防止点击劫持攻击。|X-Frame-Options: DENY、SAMEORIGIN（仅同源域名下的页面匹配许可）|
|X-XSS-Protection|HTTP响应首部，防止XSS攻击|X-XSS-Protection: 0（过滤无效）、1（过滤有效）|
|DNT|HTTP请求首部，拒绝个人信息被收集|DNT: 0(同意被追踪)、1(拒绝被追踪)|
|P3P|HTTP响应首部，保护用户隐私|？|

# Hop-by-hop headers

HTTP首部字段根据代理怎么处理它们分为两类

## End-to-end headers
端到端首部

分在此类别中的首部会转发给请求/响应的最终接收目标，且必须保存在由缓存生成的响应中，另外规定它必须被转发。

## Hop-by-hop headers
逐跳首部

只对单次转发有效，会通过缓存或代理而不再转发。HTTP/1.1规定，使用Hop-by-hop 首部，需提供 Connection 首部字段。

逐跳首部

 - Connection  
 - Keep-Alive  
 - Proxy-Authenticate  
 - Proxy-Authorization  
 - TE  
 - Trailer  
 - Transfer-Encoding  
 - Upgrade  

除了这8个首部字段之外，其他所有字段都属于端到端首部。

# 更多-more

- [https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)  
- [http://tools.jb51.net/table/http_header](http://tools.jb51.net/table/http_header)  
- [http://www.jianshu.com/c/47c604fe47af](http://www.jianshu.com/c/47c604fe47af)  
- [http://www.jianshu.com/p/d40facd78a88](http://www.jianshu.com/p/d40facd78a88)  
- [图解HTTP-完整彩色版.pdf](http://pengyouyi.site/assets/pdf/HTTP.pdf)  