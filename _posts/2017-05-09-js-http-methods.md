---
layout: post
title: HTTP方法
tags:
- HTTP
categories: HTTP
description: HTTP方法
---

# HTTP请求方法

根据HTTP标准，HTTP请求可以使用多种请求方法。
HTTP1.0定义了三种请求方法： GET, POST 和 HEAD方法。
HTTP1.1新增了五种请求方法：OPTIONS, PUT, DELETE, TRACE 和 CONNECT 方法。

|序号|方法|描述|是否包含主体|安全|幂等|
|---|---|---|---|---|---|---|
|1|GET|从服务器获取一份文档|否|`是`|是|
|2|HEAD|类似于GET，只从服务器获取文档的首部|否|`是`|是|
|3|PUT|与GET相反，将请求的主体部分存储在服务器上|`是`|否|是|
|4|POST|向服务器发送需要处理的数据|`是`|否|`否`|
|5|TRACE|对可能经过代理服务器传送到服务器上去的报文进行追踪|否|？|？|
|6|OPTIONS|请求服务器告知其支持的各种功能|否|`是`|是|
|7|DELETE|请求服务器删除请求URL所指定的资源|否|否|是|

名词解释

> 安全性：客户端可以发起请求，并知道它不会改变资源的状态。
> 幂等性：保证客户端重复发起某个请求的效果与一次请求的效果一致。

## GET
GET方法请求一个指定资源的表示形式. 使用GET的请求应该只被用于获取数据.

+ 请求：只有header，没有body。
+ 响应：对应请求URI的资源表述，通常带有body。响应header中的Content-Type，Content-Length，Content-Language，Last-Modified，ETag等应该和响应body的表述一致。

请求报文
```
GET /hello HTTP/1.1
Host: localhost
```
响应报文
```
HTTP/1.1 200 OK
Content-Type: application/xml; charset=UTF-8
Content-Length: 21

<hello>tester</hello>
......
```

## HEAD 
HEAD方法与GET方法行为类似，但服务器在响应中只返回首部。不会返回实体的主体部分。

用处：

> 在不获取资源的情况下了解资源的情况（比如：判断其类型）；
> 通过查看响应中的状态码，看看某个对象是否存在；
> 通过查看首部，测试资源是否被修改了。

服务器必须确保返回的首部与GET请求所返回的首部完全相同。

+ 请求：只有header，没有body。
+ 响应：只有header，没有body。服务器不能添加body。


请求报文
```
GET /hello HTTP/1.1
Host: localhost
```


响应报文
```
HTTP/1.1 200 OK
Content-Type: application/xml; charset=UTF-8
Content-Length: 21
```

## PUT
PUT方法就是让服务器用请求的主体部分来创建一个由所请求的URL命名的新文档，或者，如果那个URL已经存在的话，就用这个主体来替代它。
因为PUT允许用户对内容进行修改，所以很多Web服务器都要求在执行PUT之前，用密码登录。

+ 请求：一个资源的表述。请求的body可以与客户端后续收到的GET请求一样,当然，也可以不一样。在某些情况下，服务器也可要求客户端只提供资源的可变部分。
+ 响应：更新的状态。可在响应中包含被更新资源的完整表述，但是客户端不能假设响应中包含完整状态，除非响应有一个Content-Location头。如果服务器没有包含这个头，客户端必须提交一个无条件GET请求来获取更新后的表述，带有Last-Modified和/或ETag头。

**创建资源的请求**

请求报文
```
PUT /stu/alice HTTP/1.1
Host: localhost
```

响应报文
```
HTTP/1.1 201 Created
Location: http://localhost/stu/alice
Content-Length: 0
```


**更新资源的请求**

请求报文
```
PUT /stu/bob HTTP/1.1
Host: localhost
```

响应报文
```
HTTP/1.1 204 No Content
```

## POST
向服务器发送需要处理的数据,例如提交表单。
POST请求可能会导致服务器上新的资源的建立和/或已有资源的修改。

+ 请求：一个资源的表述。
+ 响应：一个资源的表述，或是一个重定向指令。如果body中存在表述，则其URI和请求URI不一致，包含一个带有改资源URI的Content-Location头。


**执行动作**

请求报文

```
POST /prompt/delete HTTP/1.1
Host: localhost
```

响应报文

```
HTTP/1.1 204 No Content
```

**创建资源**

请求报文

```
POST /stu/bob HTTP/1.1
Host: localhost
Content-Type: application/xml

<student>
    <name>Bob</name>
    <age>22</age>
</student>
```

响应报文

```
HTTP/1.1 201 Created
Location: http://localhost/stu/bob
Content-Location: http://localhost/stu/bob
Content-Type: application/xml

<student>
    <name>Bob</name>
    <age>22</age>
</student>
```
**修改资源**

请求报文

```
POST /stu/bob/modify HTTP/1.1
Host: localhost
Content-Type: application/json

{
    "Name": "Bob",
    "Age": 24
}
```

响应报文

```
HTTP/1.1 303 See Other
Location: http://localhost/stu/bob
Content-Type: application/xml

<student>
    <name>Bob</name>
    <age>24</age>
</student>
```

## TRACE
客户端发起一个请求时，这个请求可能要穿过防火墙、代理、网关或其他一些应用程序。每个中间节点都可能会修改原始的HTTP请求。TRACE方法允许客户端在最终将请求发给服务器时，看看它变成什么样子。
TRACE方法主要用于诊断；用于验证请求是否如愿穿过了请求/响应链。它也是一种很好的工具，可以用来查看代理和其他应用程序对用户请求所产生效果。

> 请求：header与body。
> 响应：body中包含整个请求消息。

请求报文
```
TRACE /trace HTTP/1.1
Host: localhost
Accept: text/html
```

响应报文
```
HTTP/1.1 200 OK
Content-Type: message/http

TRACE /trace HTTP/1.1
Host: localhost
Accept: text/html
```

## OPTIONS
OPTIONS 方法请求服务器告知其支持的各种功能。可以询问服务器通常支持哪些方法，或者对某些特殊资源支持哪些方法。
这为客户端应用程序提供了一种手段，使其不用实际访问那些资源就能判定访问各种资源的最优方式。

> 请求：只有header没有body。
> 响应：默认只有header，但是也可以在body中添加内容，比如描述性文字

请求报文
```
OPTIONS /test-options HTTP/1.1
Host: localhost
```

响应报文
```
HTTP/1.1 204 No Content
Allow: GET, POST, OPTIONS
```

## DELETE
请求服务器删除请求URL所指定的资源。

> 请求：只有header，没有body。
> 响应：成功或失败。body中可以包含操作的状态。

请求报文
```
DELETE /doc/old.txt HTTP/1.1
Host: localhost
```

响应报文
```
HTTP/1.1 204 No Content
```


## HTTP请求扩展方法

|序号|方法|描述|
|---|---|---|
|8	|CONNECT	|HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。|
|9	|PATCH	|实体中包含一个表，表中说明与该URI所表示的原内容的区别。|
|10	|MOVE	|请求服务器将指定的页面移至另一个网络地址。|
|11	|COPY	|请求服务器将指定的页面拷贝至另一个网络地址。|
|12	|LINK	|请求服务器建立链接关系。|
|13	|UNLINK	|断开链接关系。|
|14	|WRAPPED	|允许客户端发送经过封装的请求。|
|15	|Extension-mothed	|在不改动协议的前提下，可增加另外的方法。|

# 更多-more
- [http://tools.jb51.net/table/http_request_method](http://tools.jb51.net/table/http_request_method)
- [http://blog.lucode.net/protocol/http-method-tutorial.html](http://blog.lucode.net/protocol/http-method-tutorial.html)