---
layout: post
title: HTTP 请求中 cookie 和 token 有什么区别
tags:
- Interview
- BOM
- JS-use
categories: HTTP
description: HTTP 请求中 cookie 和 token 有什么区别

---


# HTTP 请求中 cookie 和 token 有什么区别

在用于用户登录的场景中时，可能会用到2种方法：

① cookie+session【用户信息存储在服务器的session中，通过sessionId作为桥梁】  
② token/JWT【用户信息由每个客户端自行存储token】  

# cookie 和 session

**cookie**

- HTTP 无状态，每次请求都要带 Cookie，以帮助识别身份  
- 服务端也可以向客户端 set-cookie,cookie 大小限制 4kb  
- 默认有跨域限制：不跨域共享cookie、不跨域传递 cookie  

前端和服务端可以设置 `withCredentials`

**cookie 本地存储**

- HTML5 之前 Cookie 常被用于本地存储  
- HTML5 之后推荐使用 localStorage 和 sessionStorage  

**现代浏览器开始禁止第三方 cookie**

- 和跨域限制不同。这里是：禁止网页引入的第三方 JS 设置 cookie  
- 打击第三方广告，保护用户隐私  
- 新增属性 SameSite: Strict/Lax/None; 值可自己选择  

**Cookie 和 session**  

- Cookie 用于登录验证，存储用户标识（如 userId）  
- session 在服务器端，存储用户详细信息，和 Cookie 信息一一对应  
- Cookie + session 是常见登录验证解决方案  

**用户登录逻辑**

```
登录 用户名 密码
set-cookie userId="x1"
cookie userId:"x1"

服务端-缓存
const session = {
  x1 = {
    username: 'xxx',
    phone:'183XXXXxxxx',
    emial'xxx@qq.com'
  }
}
```

# token 和 JWT

 **token vs cookie**

- cookie 是 HTTP 规范，而token 是自定义传递  
- Cookie 会默认被浏览器存储，而 token 需要自己存储  
- token 默认没有跨域限制  

Cookie 更加标准，限制更多，随着网络发展，派生出更加灵活的 token

**JWT （JSON Web Token）**

- 前端发起登录，后端验证成功之后，返回一个加密的 token  
- 前端自行存储这个 token （其中包含了用户信息，加密了）  
- 以后访问服务端接口，都带着这个 token ，作为用户信息  

【总结：】

- cookie：HTTP 标准；跨域限制；配合 session 使用  
- token：无标准；无跨域限制；用于JWT  

**token 用户登录逻辑 JWT**

❶ 用户输入用户名和密码，  
❷ 服务端校验用户名和密码之后，生成 加密过后的 token 字符串，然后传递给前端  
❸ 前端拿到 token 之后，用户自己在浏览器存储起来，  
❹ 前端每次发送请求的时候都要带上 token ，发送给服务端  

# session 和 JWT 哪个更适合

session 优点

- 原理简单，易于学习  
- 用户信息集中存储在服务端，统一管理所有用户，可快速封禁某个用户  

session 缺点

- 占用服务端内存，硬件成本高  
- 多进程，多服务器时，不好同步--需要使用第三方缓存，如 redis  
- 默认有跨域限制  


JWT优点  

- 不占用服务端内存  
- 多进程、多服务器，不受影响  
- 没有跨域限制  

JWT缺点

- 用户信息存储在客户端，无法快速封禁用户  
- 万一服务器密钥泄露，则用户信息全部丢失  
- token 体积一般大于 Cookie ，会增加请求的数据量  

总结：

- 如果有严格管理用户信息的需求（保密、快速封禁）推荐 Session  
- 如果没有特殊要求，则使用 JWT （如创业初期的网站）


[Cookie、Session、Token、Jwt的用途与区别](https://www.ngui.cc/el/2729719.html?action=onClick)

# 如何实现SSO单点登录

**❶ 主域名相同时，可基于 cookie**

- cookie 默认不可跨域共享，但有些情况下可设置为共享  
- 主域名相同，如 www.baidu.com  image.baidu.com  
- 设置 Cookie domain 为主域名，即可共享 cookie  

**❷ 主域名不同**

当主域名不同的时候，可启动第三方sso系统，把所有的登录和验证都交给第三方来做，而不是让系统A和系统B各自单独存储用户信息。

这样用户访问系统 A 的时候通过重定向去到第三方sso登录，而不是直接登录系统A，
系统A收到用户的登录信息，也会再调用第三方sso系统来验证用户的登录信息，再操作。

**❸ OAuth 2.0**

用户不用输入手机号码，直接通过常用的第三方去登录，比如：微信、qq、