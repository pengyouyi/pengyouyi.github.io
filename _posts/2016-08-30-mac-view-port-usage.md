---
layout: post
title: mac查看端口占用情况
tags:
- mac
- 端口使用
categories: MAC
description: MAC下查看某个端口被哪个程序占用及杀进程方法
---
## MAC下查看某个端口被哪个程序占用及杀进程方法

## lsof命令查看端口使用情况
通过list open file命令可以查看到当前打开文。

```
lsof -i:port
```

port替换成端口号，比如查看63342端口,使用如下

```
lsof -i:63342
```

参数说明: -i表示网络链接,该命令会同时列出PID，方便kill
```c
pengyouyideMacBook-Pro:~ pengyouyi$ lsof -i:63342
COMMAND   PID      USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
Google    236 pengyouyi   93u  IPv4 0xe55f3646947d799f      0t0  TCP localhost:56933->localhost:63342 (ESTABLISHED)
Google    236 pengyouyi  155u  IPv4 0xe55f36469507ceb7      0t0  TCP localhost:49264->localhost:63342 (ESTABLISHED)
webstorm  375 pengyouyi   28u  IPv4 0xe55f364694d605bf      0t0  TCP localhost:63342->localhost:49264 (ESTABLISHED)
webstorm  375 pengyouyi   29u  IPv4 0xe55f3646923c5eb7      0t0  TCP localhost:63342->localhost:56933 (ESTABLISHED)
webstorm  375 pengyouyi  280u  IPv4 0xe55f36469711deb7      0t0  TCP localhost:63342 (LISTEN)
```
## 根据PID,使用kill命令杀掉进程

```
kill -9 PID
```

比如杀掉PID为236的Google浏览器,如下

```
pengyouyideMacBook-Pro:~ pengyouyi$ kill -9 236
```

参数说明: -9表示强制杀死

## 如何查看github的服务器ip

* windows下按Win+R，输入cmd后回车，在命令行里输入`ping pengyouyi.github.io`，回车后会看到一个IP，就是它了。
* 如果是mac，可以在终端输入`dig pengyouyi.github.io`，同样回车后会看到一个对应的IP地址。









