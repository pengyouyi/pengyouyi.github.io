---
layout: post
title: HTTPS
tags:
- HTTP
categories: HTTP
description: HTTPS
---

# HTTP和HTTPS的区别

1. HTTP 的 URL 以 http:// 开头，而 HTTPS 的 URL 以 https:// 开头  
2. HTTP 是不安全的，而 HTTPS 是安全的。HTTPS使用安全套接字层（SSL）进行信息交换，是HTTP的安全版  
3. HTTP 标准端口是 80 ，而 HTTPS 的标准端口是 443  
4. 在 OSI 网络模型中，HTTP 工作于应用层，而 HTTPS 工作在传输层  
5. HTTP 无需加密，而 HTTPS 对传输的数据进行加密  
6. HTTP 无需证书，而 HTTPS 需要认证证书  

# HTTP的缺点

- 通信使用明文(不加密), 内容可能会被窃听  
- 不验证通信方的身份, 因此有可能遭遇伪装  
- 无法证明报文的完整性, 所以有可能已遭篡改  

## 通信使用明文可能会被窃听-a

### TCP/IP是可能被窃听的网络

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-31-7.png" alt="">
</div>

即使已经经过加密处理的通信，也会被窥视到通信内容。但无法破解报文信息的含义。

### 加密处理防止被窃听-encryption

**通信的加密**

HTTP协议通过和SSL(Secure Socket Layer,安全套接层)或TLS(Transport Layer Security,安全层传输协议)组合使用，加密HTTP的通信内容。

**内容的加密**

把HTTP报文里所含的内容进行加密处理后再发送。

## 不验证通信方的身份就可能遭遇伪装-b

### 任何人都可发起请求-anyone

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-31-8.png" alt="">
</div>

### 查明对手的证书-certificate

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-31-9.png" alt="">
</div>

## 无法证明报文的完整性, 可能已遭篡改-c

### 接收到的内容可能有误-Error

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-31-10.png" alt="">
</div>

### 如何防止篡改

使用MD5和SHA-1来确认文件的数字签名。

# HTTPS

HTTP + 加密 + 认证 + 完整性保护 = HTTPS

## HTTP + 加密 + 认证 + 完整性保护 = HTTPS

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-31-11.png" alt="">
</div>

## HTTPS是身披SSL外壳的HTTP

通常情况下HTTP是直接和TCP层进行通信的。当使用SSL(安全套阶字)时,则演变成HTTP先和SSL通信,SSL再和TCP通信的了。

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-31-12.png" alt="">
</div>

## 加密技术-encryption

SSL采用的是一种叫做公开密钥加密的加密处理方式

### 对称加密-Symmetric encryption

加密和解密用的一个密钥的方式称为对称加密,也叫做共享密钥加密

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-31-13.png" alt="">
</div>

对称加密在发送加密信息时也需要将密钥发送给对方,但这样可以被攻击者截取,就不安全啦

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-31-14.png" alt="">
</div>

### 非对称加密-Asymmetric encryption

非对称加密又称作公开密钥加密,它很好的解决了对称加密密钥被截取的问题。

非对称加密采用一对非对称的密钥,一把叫做私有密钥,一把叫做共有密钥。

使用非对称加密,发送密文一方使用对方的共有密钥进行加密处理,对方收到加密信息后,再使用自己的私有密钥进行解密。

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-31-15.png" alt="">
</div>

### HTTPS采用混合加密机制

HTTPS采用对称加密和非对称加密所混合的加密机制。

若密钥能安全交换,那么有可能仅考虑非对称加密。

但是非对称加密与对称加密相比,处理速度相对较慢。

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-31-16.png" alt="">
</div>

### 证明公开密钥正确性的证书-certificate

使用数字证书认证机构和其颁布的公开密钥证书进行认证。即让第三方独立机构进行验证。

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-31-17.png" alt="">
</div>

## HTTPS安全通信机制

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-31-18.png" alt="">
</div>

[http://www.jianshu.com/p/e634784e7b00](http://www.jianshu.com/p/e634784e7b00)

完整的HTTPS的通信过程

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-31-19.png" alt="">
</div>

## 为什么不一直使用HTTPS

HTTPS的缺点

1. 加密通信与纯文本通信相比,消耗更多的CPU和内存资源

2. 购买证书是要钱的！

3. 少许对客户端有要求的情况下,会要求客户端也必须有一个证书.

- 这里客户端证书,其实就类似表示个人信息的时候,除了用户名/密码, 还有一个CA 认证过的身份. 应为个人证书一般来说上别人无法模拟的,所有这样能够更深的确认自己的身份

- 目前少数个人银行的专业版是这种做法,具体证书可能是拿U盘作为一个备份的载体

### SSL慢吗

当使用SSL时，它的处理速度变慢

<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-31-20.png" alt="">
</div>

使用SSL加速器硬件来改善计算速度。

# HTTPS的工作原理

1、客户端发起HTTPS请求  
2、服务端的配置数字证书  
3、传送证书  
4、客户端解析证书  
5、传送加密信息  
6、服务段解密信息  
7、传输加密后的信息  
8、客户端解密信息  

# 什么时候该使用 HTTPS

- 银行网站  
- 支付网关  
- 购物网站  
- 登录页  
- 电子邮件  
- 一些企业部门的网站  

# 更多-more

- [https://juejin.im/entry/58d7635e5c497d0057fae036](https://juejin.im/entry/58d7635e5c497d0057fae036)  
- [http://www.jianshu.com/p/37654eb66b58](http://www.jianshu.com/p/37654eb66b58)