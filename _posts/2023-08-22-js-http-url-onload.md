---
layout: post
title: 地址栏输入 URL 敲下回车后发生了什么?
tags:
- Interview
- BOM
categories: HTTP
description: 地址栏输入 URL 敲下回车后发生了什么?
---

# 地址栏输入 URL 敲下回车后发生了什么?

# 简单答案 simple

❶ URL 解析  
❷ 缓存判断  
❸ DNS 查询  
❹ TCP 连接 (三次握手)  
❺ HTTP 请求  
❻ 响应请求  
❼ 页面渲染  
❽ 关闭 TCP 连接（四次挥手)

# 详细分解 detail

## URL 解析

在浏览器的地址栏输入 URL 并按下回车键时，浏览器首先会对 URL 进行解析。

首先判断它是否是一个合法的 URL，一个 url 的解析如下：

<div class="rd">
    <img src="/assets/images/2023/7-8-9/url.webp" alt="">
</div>

## 缓存判断 cache

浏览器会先判断是否存在缓存，并且比较缓存是否过期。

## DNS 查询 IP 地址

浏览器解析 URL 后，提取其中域名部分，然后进行 DNS 查询，将域名转换为对应的 IP 地址。

## 建立 TCP连接（三次握手）

根据 IP 建立 TCP 连接, TCP 三次握手确保连接可靠。

<div class="rd">
    <img src="/assets/images/2023/7-8-9/http-tcp-three.png" alt="">
</div>

客户端发送一个带有 SYN 标志的数据包给服务端，服务端收到后，回传一个带有 SYN/ACK 标志的数据包以示传达确认信息，最后客户端再回传一个带 ACK 标志的数据包，代表握手结束，连接成功。

通俗化之后就是：

客户端：老弟我要跟你链接  

服务端：好的，同意了  

客户端：好嘞  

## 浏览器发送 HTTP 请求

浏览器向服务器发送 HTTP 请求。

完整的HTTP请求包含请求起始行、请求头部、请求正文三部分。

## 服务器处理请求，返回数据 return

服务器接收到 HTTP 请求后，会根据请求的内容进行处理。服务器可能会读取请求体中的数据，查询数据库，执行业务逻辑等操作。

处理完成之后，服务器会生成 HTTP 响应并发送会浏览器。

## 页面渲染 paint

《1》查看响应头的信息，根据不同的指示做对应处理，eg：重定向， 存储 cookie，解压 gzip，缓存资源等等

《2》查看响应头的 Content-type 的值，根据不同的资源类型采用不同的解析方式

① 解析 HTML，构建 DOM 树  
② 解析 CSS ，生成 CSS 规则树  
③ 合并 DOM 树和 CSS 规则，生成 render 树  
④ 布局 render 树（ Layout / reflow ），负责各元素尺寸、位置的计算  
⑤ 绘制 render 树（ paint ），绘制页面像素信息  
⑥ 浏览器会将各层的信息发送给 GPU，GPU 会将各层合成（ composite ），显示在屏幕上  

## 关闭 TCP 连接（四次挥手）

关闭 TCP 连接或继续保持连接

通过四次挥手关闭连接(FIN ACK, ACK, FIN ACK, ACK)。

<div class="rd">
    <img src="/assets/images/2023/7-8-9/http-tcp-four.png" alt="">
</div>

第一次挥手是浏览器发完数据后，发送 FIN 请求断开连接。

第二次挥手是服务器发送 ACK 表示同意，如果在这一次服务器也发送 FIN 请求断开连接似乎也没有不妥，但考虑到服务器可能还有数据要发送，所以服务器发送 FIN 应该放在第三次挥手中。

这样浏览器需要返回 ACK 表示同意，也就是第四次挥手。
