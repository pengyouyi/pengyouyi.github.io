---
layout: post
title: HTTP缓存
tags:
- HTTP
categories: HTTP
description: HTTP缓存机制
---

# 浏览器request过程

**浏览器第一次请求：**

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-01-10.png" alt="">
</div>

**浏览器再次请求时：**

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-01-11.png" alt="">
</div>

[参见"浏览器缓存机制"-吴秦](http://www.cnblogs.com/skynet/archive/2012/11/28/2792503.html)

# HTTP缓存优点-advantage

- 减少了冗余的数据传输，节省了你的网络费用。  
- 缓解了网络瓶颈的问题。不需要更多的带宽就能够更快的加载页面。  
- 降低了对原始服务器的要求。服务器可以更快地响应，避免过载的出现。  
- 降低了距离时延，因为从较远的地方加载页面会更慢一些。  

# 缓存的处理步骤-step

1. 接收 - 缓存从网络中读取抵达的请求报文。  
2. 解析 - 缓存对报文进行解析，提取URL和各种首部。  
3. 查询 - 缓存查看是否有本地副本可用，如果没有，就获取一份副本（并将其保存在本地）。  
4. 新鲜度检测 - 缓存查看已缓存副本是否足够新鲜，如果不是，就询问服务器是否有任何更新。  
5. 创建响应 - 缓存会用新的首部和已缓存的主体来构建一条响应报文。  
6. 发送 - 缓存通过网络将响应发回给客户端。  
7. 日志 - 缓存可选地创建一个日志文件条目来描述这个事务。  

# http报文中与缓存相关的首部字段

## 通用缓存首部-Universal cache

|首部|描述|示例|
|---|---|---|
|Cache-Control|【HTTP/1.1】指定请求和响应遵循的缓存机制|Cache-Control: no-cache|
|Pragma|【HTTP/1.0】随报文传送一些指令。通常来控制缓存。|Pragma: no-cache|

## 请求首部字段-request header

|首部|描述|示例|
|---|---|---|
|If-Match|比较ETag是否一致，匹配才返回对象|If-Match: “737060cd8c284d8af7ad3082f209582d”|
|If-None-Match|比较ETag是否不一致 |If-None-Match: “737060cd8c284d8af7ad3082f209582d”|
|If-Modified-Since|比较资源最后修改时间是否一致|If-Modified-Since: Sat, 29 Oct 2010 19:43:31 GMT|
|If-Unmodified-Since|只有实体在指定时间之后未被修改才请求成功|If-Unmodified-Since: Sat, 29 Oct 2010 19:43:31 GMT|

## 响应首部字段-Response header

|首部|描述|示例|
|---|---|---|
|ETag|实体标记，某个特定资源版本的标识符|ETag: “737060cd8c284d8af7ad3082f209582d”|

## 实体缓存首部-Entity cache

|首部|描述|示例|
|---|---|---|
|Expires|【HTTP/1.0】实体主体过期的时间 |Expires: Thu, 01 Dec 2010 16:00:00 GMT|
|Last-Modified|资源的最后一次修改时间|Last-Modified: Tue, 15 Nov 2010 12:45:26 GMT|

# 文档过期-document expiration

HTTP采用`文档过期`和`服务器再验证`机制来检测副本的新鲜。

文档过期也叫做`强缓存`。

## Expires策略

HTTP/1.0给客户端设定缓存方式可通过两个字段——“Pragma”和“Expires”来规范。

### Pragma来禁用缓存

1. “Pragma: no-cache”，会知会客户端不要对该资源读缓存，即每次都得向服务器发一次请求才行。

2. Pragma属于**通用首部**字段，在客户端上使用时，常规要求我们往html上加上这段meta元标签

```html
<meta http-equiv="Pragma" content="no-cache">
```

以上属于非HTTP协议定义的缓存机制,这行代码的用处很有限，因为只有IE识别

### Expires来启用缓存和定义缓存时间

`Expires指定一个绝对的过期日期。`

```html
Expires: Thu, 01 Dec 2010 16:00:00 GMT
```

Expires是Web服务器**响应消息头**字段，在响应http请求时告诉浏览器在过期时间前浏览器可以直接从浏览器缓存取数据，而无需再次请求。

**使用Expires缺点**

响应报文中Expires所定义的缓存时间是相对服务器上的时间而言的，如果客户端上的时间跟服务器上的时间不一致（特别是用户修改了自己电脑的系统时间），那缓存时间可能就没啥意义了。

## Cache-control策略

HTTP/1.1使用 Cache-control: max-age 响应首部来指定过期日期。

max-age值定义了文档的最大使用期，（以秒为单位），以下有效时间为一小时

```
Cache-Control: max-age=3600
```

`Cache-Control优先级高于Expires`  

若报文中同时出现了 Pragma、Expires 和 Cache-Control，HTTP/1.1会以 Cache-Control 为准；

HTTP/1.0会以 Expires 为准，忽略Cache-Control。

# 服务器再验证-server revalidation

服务器再验证也叫做`协商缓存`。

有两种方式，检查缓存的新鲜度

第一种方式是在上一次服务端告诉客户端约定的有效期的同时，告诉客户端该文件最后修改的时间，当再次试图从服务端下载该文件的时候，check下该文件有没有更新（对比最后修改时间），如果没有，则读取缓存；

第二种方式是在上一次服务端告诉客户端约定有效期的同时，同时告诉客户端该文件的版本号，当服务端文件更新的时候，改变版本号，再次发送请求的时候check一下版本号是否一致就行了，如一致，则可直接读取缓存。

## If-Modified-Since: Date

Last-Modified/If-Modified-Since要配合Cache-Control使用。

- Last-Modified：标示这个响应资源的最后修改时间。web服务器在响应请求时，告诉浏览器资源的最后修改时间。  
- If-Modified-Since：当资源过期时（使用Cache-Control标识的max-age），发现资源具有Last-Modified声明，则再次向web服务器请求时带上头 If-Modified-Since:  Last-Modified-value，表示请求时间。

web服务器收到请求后发现有头If-Modified-Since 则与被请求资源的最后修改时间进行比对。  
若最后修改时间较新，说明资源又被改动过，则响应整片资源内容（写在响应消息包体内），HTTP 200；  
若最后修改时间较旧，说明资源无新修改，则响应HTTP 304 (无需包体，节省浏览)，告知浏览器继续使用所保存的cache。  

```html
If-Modified-Since: Thu, 31 Mar 2016 07:07:52 GMT
```

## If-None-Match: <tags>

Etag/If-None-Match也要配合Cache-Control使用。

- Etag：web服务器响应请求时，告诉浏览器当前资源在服务器的唯一标识（生成规则由服务器决定）。  
- If-None-Match：当资源过期时（使用Cache-Control标识的max-age），发现资源具有Etage声明，则再次向web服务器请求时带上头If-None-Match: ETag-value。

web服务器收到请求后发现有头If-None-Match 则与被请求资源的相应校验串进行比对，决定返回200或304。

```html
If-None-Match: "56fcccc8-1699"
```

## 既生Last-Modified何生Etag

- 有些文档可能会被周期性地重写，但实际包含的数据常是一样的。尽管内容没有变化，但修改日期会发生变化。  
- 有些文档可能已经被修改了，但所做修改并不重要，不需要让世界范围内的缓存都重装数据（比如对拼写或注释的修改）。  
- 有些服务器无法准确的判定其页面的最后修改日期。Last-Modified标注的最后修改只能精确到秒级，比如某些文件在1秒钟以内，被修改多次。  
- 有些服务器提供的文档会在亚秒间隙发生变化（比如实时监视器），对于这些服务器来说，以一秒为粒度的修改日期可能就不够用了。  

Etag是服务器自动生成或者由开发者生成的对应资源在服务器端的唯一标识符，能够更加准确的控制缓存。  
Last-Modified与ETag是可以一起使用的，`服务器会优先验证ETag`，一致的情况下，才会继续比对Last-Modified，最后才决定是否返回304。

## when use If-None-Match和If-Modified-Since

什么时候应该使用实体标签和最近修改日期

1. 如果服务器回送了一个实体标签，HTTP/1.1客户端就必须使用实体标签验证器。  
2. 如果服务器只回送了一个Last-Modified值，客户端可以使用If-Modified-Since验证。  
3. 如果实体标签和最后修改日期都提供了，客户端就应该使用这两种再验证方法，这样HTTP/1.0和HTTP/1.1缓存就都可以正确响应了。  

除非HTTP/1.1原始服务器无法生成实体标签验证器，否则就应该发送一个出去。

如果HTTP/1.1缓存或服务器收到的请求既带有If-Modified-Since，又带有实体标签条件首部，那么只有这两个条件都满足时，才能返回304 Not Modified响应。

# 用户行为与缓存-User behavior

如果直接在地址栏按回车，响应HTTP200（from cache），因为有效期还没过直接读取的缓存；

如果ctrl+r进行刷新，则会相应HTTP304（Not Modified），虽然还是读取的本地缓存，但是多了一次服务端的请求；

而如果是ctrl+shift+r强刷，则会直接从服务器下载新的文件，响应HTTP200。

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-01-12.png" alt="">
</div>

当用户在按F5进行刷新的时候，会忽略Expires/Cache-Control的设置，会再次发送请求去服务器请求，而Last-Modified/Etag还是有效的，服务器会根据情况判断返回304还是200；

而当用户使用Ctrl+F5进行强制刷新的时候，只是所有的缓存机制都将失效，重新从服务器拉去资源。

# cache实际应用

## can被缓存的内容

- css样式表  
- js文件  
- logo、图标  
- html文件  
- 可以下载的内容  

### 经常改变的文件

Cache-Control:no-cache，Cache-Control:max-age=0

比如入口index.html文件，文件内容改变但名称不变的资源。

### 不经常改变的文件

给max-age设置一个较大的值，一般设置max-age=31536000(一年，最大值)。

比如引入的第三方文件、打包出来的带有hash后缀css、js文件。一般来说文件内容改变了，会更新版本号、hash值，相当于请求另一个文件

## 不能缓存的请求-Unable 

1. HTTP信息头中包含Cache-Control:no-cache，Cache-Control:max-age=0，pragma:no-cache（HTTP1.0）等告诉浏览器不用缓存的请求  
2. 需要根据Cookie，认证信息等决定输入内容的动态请求是不能被缓存的  
3. 经过HTTPS安全加密的请求（有人也经过测试发现，ie其实在头部加入Cache-Control：max-age信息，firefox在头部加入Cache-Control:Public之后，能够对HTTPS的资源进行缓存，[参考《HTTPS的七个误解》](http://www.ruanyifeng.com/blog/2011/02/seven_myths_about_https.html)）  
4. POST请求无法被缓存  
5. HTTP响应头中不包含Last-Modified/Etag，也不包含Cache-Control/Expires的请求无法被缓存  

# Cache-control详解

通过指定首部字段Cache-control的指令，就能操作缓存的工作机制。

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-01-13.png" alt="">
</div>

指令的参数是可选的，多个指令之间通过“，”分隔。Cache-control指令可用于请求和响应。

```html
Cache-control: private, max-age=0, no-cache
```

**缓存请求指令**

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-01-14.png" alt="">
</div>

**缓存响应指令**

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-01-15.png" alt="">
</div>

## 表示是否能缓存的指令-a

**public 指令**

```html
Cache-Control: public
```
当指定使用public指令时，则明确表明其他用户也可以利用缓存。

**private 指令**

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-01-16.png" alt="">
</div>

```html
Cache-Control: private
```

当指定private指令后，响应只以特定的用户作为对象，与public相反。

缓存服务器会对该特定用户提供资源缓存的服务，对于其他用户发送过来的请求，代理服务器则不会返回缓存。

**no-cache 指令**

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-01-17.png" alt="">
</div>

```html
Cache-Control: no-cache
```

使用no-cache指令的目的是为了防止从缓存中返回过期的资源。

客户端发送的请求中如果包含no-cache指令，则表示客户端将不会接收缓存过的响应。于是，缓存服务器必须把客户端请求转发给源服务器。

如果服务器返回的响应中包含no-cache指令,缓存服务器`可以缓存`，但是只有在跟WEB服务器验证了其有效后，才能返回给客户端

```html
Cache-Control: no-cache = Location
```

如果服务器返回的响应中，若报文首部字段Cache-Control中对no-cache字段名具体指定参数值，那么缓存服务器不能对资源进行缓存。源服务器以后也将不再对缓存服务器请求提出的资源有效性进行确认，且禁止其对响应资源进行缓存操作。


## 控制可执行缓存对象的指令-b

**no-store 指令**

```html
Cache-Control: no-store
```

当使用no-store指令时，暗示请求或响应中包含机密信息。

no-store是`真正地不进行缓存`。

因此，该指令规定缓存不能在本地存储请求或响应的任何一部分。

## 指定缓存期限和认证的指令-c

**s-maxage 指令**

```html
Cache-Control: s-maxage = 3600（单位：秒）
```

s-maxage指令的功能和max-age指令的相同。

它们的不同点是s-maxage指令只适用于供多位用户使用的公共缓存服务器（一般指代理）。也就是说，对于向同一用户重复返回响应的服务器来说，这个指令没有任何作用。

另外，当使用s-maxage指令后，则直接忽略对Expires首部字段及max-age指令的处理。

**max-age 指令**

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-01-18.png" alt="">
</div>

```html
Cache-Control: max-age = 3600（单位：秒）
Cache-Control: max-age = 0
```

当客户端发送的请求中包含max-age指令时，如果判定缓存资源的缓存时间数值比指定时间的数值更小，那么客户端就接收缓存的资源。

当指定max-age = 0，时，那么缓存服务器通常需要将请求转发给源服务器。

当源服务器返回的响应中包含max-age指令时，缓存服务器将不对资源的有效性再作确认，而max-age数值代表保存为缓存的最长时间。

**min-fresh 指令**

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-01-19.png" alt="">
</div>

```html
Cache-Control: min-fresh = 60（单位：秒）
```

min-fresh指令要求缓存服务器返回至少还未过指定时间的缓存资源。

比如，当指定min-fresh = 60后，过了60秒的资源都无法作为响应返回了。

**max-stale 指令**

```html
Cache-Control: max-stale = 60（单位：秒）
```

使用max-stale可指示缓存资源，即使过期也照常接收。

**only-if-cached 指令**

```html
Cache-Control: only-if-cached
```

使用only-if-cached指令表示客户端仅在缓存服务器本地缓存目标资源的情况下才会要求其返回。

换言之，该指令要求缓存服务器不重新加载响应，也不会再次确认资源有效性。若发生请求缓存服务器的本地缓存无响应，则返回504 Gateway Timeout。

**must-revalidate 指令**

```html
Cache-Control: must-revalidate 
```

使用must-revalidate 指令，代理会向源服务器再次验证即将返回的响应缓存目前是否任然有效。

若代理无法连通源服务器再次获取有效资源的话，缓存必须给客户端一条504状态码。

另外，使用must-revalidate 指令会忽略请求的max-stale 指令。

**proxy-revalidate 指令**

```html
Cache-Control: proxy-revalidate
```

proxy-revalidate指令要求所有的缓存服务器在接收到客户端带有该指令的请求返回响应之前，必须再次验证缓存的有效性。

**no-transform 指令**

```html
Cache-Control: no-transform
```

使用no-transform指令规定无论是在请求还是响应中，缓存都不能改变实体主体的媒体类型。

这样做可防止缓存或代理压缩图片等类似操作。

[http://blog.csdn.net/chen_zw/article/details/18924875](http://blog.csdn.net/chen_zw/article/details/18924875)

## cache-control应该怎么设置更好？

对于图片，css,等长期不变化的内容应该设置较长的过期时间（如180天）

建议：

1.对于js和css可以独立到一个二级域名中，启用GZIP，且设置较长的过期时间

2.对于图片独立到另一个二级域名中，且设置较长的过期时间

3.对于静态文件(html)如果长期不更新也可以设置稍长的过期时间（如30天），需要根据当前网站的实际而定。

4.对于动态文件(php)可以设置较短的过期时间（如120秒）

# 更多-more

- [http://www.codeceo.com/article/broswer-http-cache.html#0-tsina-1-75257-397232819ff9a47a7b7e80a40613cfe1](http://www.codeceo.com/article/broswer-http-cache.html#0-tsina-1-75257-397232819ff9a47a7b7e80a40613cfe1)  

- [http://www.cnblogs.com/zichi/p/4685822.html](http://www.cnblogs.com/zichi/p/4685822.html)
