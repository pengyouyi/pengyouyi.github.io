---
layout: post
title: mac 配置Apache
tags:
- mac
- Apache
categories: mac
description: MAC下配置Apache
---
## MAC下配置Apache

我使用的Mac OS X版本是10.11.6，Mac自带了Apache环境。
1.启动Apache
2.设置虚拟主机

## 启动Apache

打开"终端(terminal)",输入 apachectl -v 查看Apache版本。
```ruby
pengyouyideMacBook-Pro:~ pengyouyi$ apachectl -v
Server version: Apache/2.4.18 (Unix)
Server built:   Feb 20 2016 20:03:19
```
接着输入 apachectl start ,这样就启动Apache。
```ruby
pengyouyideMacBook-Pro:~ pengyouyi$ apachectl start
This operation requires root.
```
检查Apache是否启动成功,打开chrome浏览器在地址栏输入"localhost",可以看到内容为"It works!"的页面。其位于“/Library（资源库）/WebServer/Documents/”下，这就是Apache的默认根目录。

Apache的安装目录在：/etc/apache2/，etc默认是隐藏的。有三种方式查看：
1.dock下右键Finder，选择"前往文件夹"，输入"/etc"
2.在finder下－－－－》前往－－－》前往文件夹，然后输入/etc
3.可以在terminal 输入 "open /etc"。

## 启动hhhh

在终端运行"sudo vi /etc/apache2/httpd.conf"，打开Apche的配置文件
在httpd.conf中找到"#Include /private/etc/apache2/extra/httpd-vhosts.conf"，去掉前面的"＃"，保存并退出。
运行"sudo apachectl restart"，重启Apache后就开启了虚拟主机配置功能。
运行"sudo vi /etc/apache2/extra/httpd-vhosts.conf"，就打开了配置虚拟主机文件httpd-vhost.conf，配置虚拟主机了。需要注意的是该文件默认开启了两个作为例子的虚拟主机：

## hhhh
## 启动中文
## hhhh






