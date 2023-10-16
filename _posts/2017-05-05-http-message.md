---
layout: post
title: HTTP报文的组成部分
tags:
- HTTP
categories: HTTP
description: HTTP报文的组成部分
---

# HTTP报文

# HTTP报文流

报文流入源端服务器并流回到客户端

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-25-3.png" alt="">
</div>

所有报文都向下游流动

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-25-4.png" alt="">
</div>

#  HTTP报文的组成部分

 HTTP报文是简单的格式化数据块。

 每条报文都包含一条来自客户端的请求，或者一条来自服务器的响应。

 报文由三个部分组成：

 - 对报文进行描述的`起始行`(**start line**),报文的第一行  
 - 包含属性的`首部`(**header**)块  
 - 以及可选的、包含数据的`主体`(**body**)部分  

 <div class="rd">
    <img src="/assets/images/2017/10-11-12/10-25-5.png" alt="">
</div>


1. 起始行和首部是由行分隔的ASCII文本。  
2. 起始行和首部每行末尾都以CRLF结束  
3. 首部和主体之间用一个`空行`(CR+LF)来分隔  
4. 主体中可以包含文本或二进制数据，也可以为空


行终止序列CRLF，是由两个字符组成的:

- CR(Carriage Return)回车符，ASCII码13
- LF(Line Feed)换行符，ASCII码10


# HTTP报文的语法

所有HTTP报文都可以分为两类：

- 请求报文(request message)  
- 响应报文(response message)

请求报文会向web服务器请求一个动作，响应报文会将请求的结果返回给客户端



## request message格式

{% highlight html linenos %}
<method> <request-URL> <version>
<headers>

<entity-body>
{% endhighlight %}

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-25-7.png" alt="">
</div>

**请求报文的4个组成部分:**

1. 请求行。用来说明请求的方法,请求URL和HTTP版本。  
2. 首部-请求头，可以为服务器提供一些额外信息  
3. 空行，是必须滴，即使没有后面的请求数据  
4. 主体-请求数据  

## response message格式

{% highlight html linenos %}
<version> <status> <reason-phrase>
<headers>

<entity-body>
{% endhighlight %}

**响应报文的4个组成部分:**

1. 响应行，由HTTP协议版本号，数字状态码，原因短语三部分组成  
2. 首部，可以为客户端提供信息  
3. 空行  
4. 主体-响应正文  

**中英对照**

- 方法(method)  
- 请求URL(request-URL)  
- 版本(version)  
- 状态码(status)  
- 原因短语(reason-phrase)  
- 首部(header)  
- 实体的主体部分(entity-body)  


## 实体的主体部分(entity-body) 

可选的实体主体部分是HTTP报文的负荷。就是`HTTP要传输的内容`。

HTTP报文可以承载很多类型的数字数据：图片、视频、HTML文档、软件应用程序、信用卡事物、电子邮件等。

# 使用Charles抓取的request、response

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-25-6.png" alt="">
</div>


# 更多-more
- [http://www.cnblogs.com/li0803/archive/2008/11/03/1324746.html](http://www.cnblogs.com/li0803/archive/2008/11/03/1324746.html)
- [http://www.jianshu.com/p/80e25cb1d81a](http://www.jianshu.com/p/80e25cb1d81a)