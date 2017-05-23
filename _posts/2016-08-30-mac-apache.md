---
layout: post
title: mac 配置Apache
tags:
- mac
- Apache
categories: MAC
description: MAC下配置Apache
---
## MAC下配置Apache

我使用的Mac OS X版本是10.11.6，Mac自带了Apache环境。
1.启动Apache
2.设置虚拟主机

## 启动Apache

打开"终端(terminal)",输入 apachectl -v 查看Apache版本。

```bash
pengyouyideMacBook-Pro:~ pengyouyi$ apachectl -v
Server version: Apache/2.4.18 (Unix)
Server built:   Feb 20 2016 20:03:19
```

接着输入 apachectl start ,这样就启动Apache。

```
pengyouyideMacBook-Pro:~ pengyouyi$ apachectl start
This operation requires root.
```

检查Apache是否启动成功,打开chrome浏览器在地址栏输入"localhost",可以看到内容为"It works!"的页面。其位于“/Library（资源库）/WebServer/Documents/”下，这就是Apache的默认根目录。

Apache的安装目录在：/etc/apache2/，etc默认是隐藏的。有三种方式查看：
1.dock下右键Finder，选择"前往文件夹"，输入"/etc"
2.在finder下－－－－》前往－－－》前往文件夹，然后输入/etc
3.可以在terminal 输入 "open /etc"。

## 设置虚拟主机-Virtual host

1.在终端运行"sudo vi /etc/apache2/httpd.conf"，打开Apche的配置文件
2.在httpd.conf中找到"#Include /private/etc/apache2/extra/httpd-vhosts.conf"，去掉前面的"＃"，保存并退出。
3.运行"sudo apachectl restart"，重启Apache后就开启了虚拟主机配置功能。
4.运行"sudo vi /etc/apache2/extra/httpd-vhosts.conf"，就打开了配置虚拟主机文件httpd-vhost.conf，配置虚拟主机了。需要注意的是该文件默认开启了两个作为例子的虚拟主机：

{% highlight xml linenos %}

#<VirtualHost *:80>
#    ServerAdmin webmaster@dummy-host.example.com
#    DocumentRoot "/usr/docs/dummy-host.example.com"
#    ServerName dummy-host.example.com
#    ServerAlias www.dummy-host.example.com
#    ErrorLog "/private/var/log/apache2/dummy-host.example.com-error_log"
#    CustomLog "/private/var/log/apache2/dummy-host.example.com-access_log" common
#</VirtualHost>

#<VirtualHost *:80>
#    ServerAdmin webmaster@dummy-host2.example.com
#   DocumentRoot "/usr/docs/dummy-host2.example.com"
#    ServerName dummy-host2.example.com
#    ErrorLog "/private/var/log/apache2/dummy-host2.example.com-error_log"
#    CustomLog "/private/var/log/apache2/dummy-host2.example.com-access_log" common
#</VirtualHost>
{% endhighlight %}

而实际上，这两个虚拟主机是不存在的，在没有配置任何其他虚拟主机时，可能会导致访问localhost时出现如下提示：

Forbidden
You don't have permission to access /index.php on this server
最简单的办法就是在它们每行前面加上#，注释掉就好了，这样既能参考又不导致其他问题。

5.增加如下配置

{% highlight xml linenos %}
<VirtualHost *:80>
    DocumentRoot "/Users/pengyouyi/workplaces"
    ServerName mysites
    ErrorLog "/private/var/log/apache2/sites-error_log"
    CustomLog "/private/var/log/apache2/sites-access_log" common
    <Directory "/Users/pengyouyi/workplaces">
        Options Indexes FollowSymLinks Includes ExecCGI
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
{% endhighlight %}
保存退出，并重启Apache。

6.运行“sudo vi /etc/hosts”，打开hosts配置文件，加入"127.0.0.1 mysites"，这样就可以配置完成sites虚拟主机了，可以访问"mysites"了

**注意:** 以上代码适用于 Apache HTTP Server Version 2.4

```
Apache 2.4 configuration:
Require all denied
```

```
Apache 2.2 configuration:
Order deny,allow
Deny from all
```

Apache HTTP Server Version 2.2 可用如下代码

{% highlight xml linenos %}
<VirtualHost *:80>
    DocumentRoot "/Users/pengyouyi/workplaces"
    ServerName mysites
    ErrorLog "/private/var/log/apache2/sites-error_log"
    CustomLog "/private/var/log/apache2/sites-access_log" common
    <Directory "/Users/pengyouyi/workplaces">
                Options Indexes FollowSymLinks MultiViews
                AllowOverride None
                Order deny,allow
                Allow from all
      </Directory>
</VirtualHost>
{% endhighlight %}

## 停止Apache服务

```
apachectl stop
```

**注意:**
当使用apachectl start 或者 apacheclt stop,出现以下结果时,表示权限不够
This operation requires root.
尝试:`sudo apachectl stsrt` 或者 `sudo apachectl stop` 可解决








