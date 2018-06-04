---
layout: post
title: Cookie，sessionStorage, localStorage 的区别
tags:
- Interview
categories: JS
description: Cookie，sessionStorage, localStorage 的区别
---

# cookie

- cookie本身用于客户端和服务器端通信  
- 但它有本地存储的功能，于是就被“借用”，它是兼容性最好的本地存储  
- 使用 document.cookie = ... 获取和修改即可  

cookie:存储在用户本地终端上的数据。有时也用cookies，指某些网站为了辨别用户身份，进行session跟踪而存储在本地终端上的数据，通常经过加密。一般应用最典型的案列就是判断注册用户是否已经登过该网站。

**Cookie用于存储的优缺点**

**优点：**

兼容性最好，几乎所有的浏览器都支持。

**缺点：**

- 存储量太小，只有4KB  
- 所有http请求都带着，会影响获取资源的效率  
- API简单，需要封装才能用 document.cookie = ...  

## 设置、读取、删除cookie

cookie是以键值对的形式保存的字符串，即key=value的格式。各个cookie之间一般是以“;”分隔。  

cookie中存储的内容为格式：name=jack;password=123

```js
//设置cookie  
//name是cookie中的名，value是对应的值，iTime是多久过期（单位为天）  
function setCookie(name,value,iTime){  
    var oDate = new Date();  
    //设置cookie过期时间  
    oDate.setDate(oDate.getDate()+iTime);  
    document.cookie = name+'='+value+';expires='+oDate.toGMTString();  
}  

//获取cookie  
function getCookie(name){  
    //cookie中的数据都是以分号加空格区分开  
    var arr = document.cookie.split("; ");  
    for(var i=0; i<arr.length; i++){  
        if(arr[i].split("=")[0] == name){  
            return arr[i].split("=")[1];  
        }  
    }  
    //未找到对应的cookie则返回空字符串  
    return '';  
}  

//删除cookie  
function removeCookie(name){  
    //调用setCookie方法，把时间设置为-1  
    setCookie(name,1,-1);  
}
```

[JS设置cookie、读取cookie、删除cookie](http://www.jb51.net/article/64330.htm)

# sessionStorage

sessionStorage 和 localStorage 是HTML5 Web Storage API 提供的，可以方便的在web请求之间保存数据。有了本地数据，就可以避免数据在浏览器和服务器间不必要地来回传递。

`sessionStorage是临时存储神器`

**sessionStorage优缺点**

**优点：** 临时存储神器，关闭页面标签自动回收，不可以跨页面交互。

**缺点：** 不能做持久化的东西

> 页面强制刷新时，sessionStorage依旧还在  
> 当前页面不关闭，重新打开新的一样的页面，新页面里不存在之前的sessionStorage  
> 在当前页面做提交表单动作时，前进到别的页面，回退之后依旧能取到sessionStorage  


## sessionStorage、localStorage常用API

不管是 localStorage，还是 sessionStorage，可使用的API都相同，常用的有如下几个（以localStorage为例）：

+ 保存数据：localStorage.setItem(key,value);  
+ 读取数据：localStorage.getItem(key);  
+ 删除单个数据：localStorage.removeItem(key);  
+ 删除所有数据：localStorage.clear();  
+ 得到某个索引的key：localStorage.key(index);  


# localStorage

`localStorage用于持久化的本地存储`

**localstorage优缺点**

**优点：** 兼容性中等，操作简单，就是key-value形式，几乎现代的浏览器都支持。

**缺点：** IE8及以下不支持。跨浏览器是读不到缓存的，不能跨域取

**localStorage 的一个坑**

IOS safari 隐藏模式下，localStorage.getItem 会报错，建议统一使用try-catch 封装

# Cookie，sessionStorage, localStorage 的相同点

都是保存在浏览器端，且同源的。

# Cookie，sessionStorage, localStorage 的区别

## http请求中是否携带

**cookie：**数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递；  
cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下。

**sessionStorage和localStorage：**不会自动把数据发给服务器，仅在本地保存。

## 存储大小-Storage size

**cookie：**数据不能超过4k，同时因为每次http请求都会携带cookie，所以cookie只适合保存很小的数据，如会话标识。  
**sessionStorage和localStorage：**大小一般为5MB

## 数据有效期-Data validity period

**cookie：**只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭；  
**sessionStorage：**仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持；  
**localStorage：**始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据。
  
## 作用域不同-Different scopes

**sessionStorage：**不在不同的浏览器窗口中共享，即使是同一个页面；  
**localStorage：**在所有同源窗口中都是共享的；  
**cookie：**也是在所有同源窗口中都是共享的。  

## 易用性-Ease of use

**Cookie：**需要程序员自己封装，源生的Cookie接口不友好  
**sessionStorage和localStorage：**源生接口可以接受，亦可再次封装来对Object和Array有更好的支持

Web Storage 支持事件通知机制，可以将数据更新的通知发送给监听者。  
Web Storage 的 api 接口使用更方便。

# Cookie、sessionStorage、localStorage	应用场景

**⑴ Cookie：**判断用户是否登录。针对登录过的用户，服务器端会在他登录时往 Cookie 中插入一段加密过的唯一辨识单一用户的辨识码，下次只要读取这个值就可以判断当前用户是否登录啦。

曾经还使用 Cookie 来保存用户在电商网站的购物车信息，如今有了 localStorage，似乎在这个方面也可以给 Cookie 放个假了~

**⑵ localStorage：**接替了 Cookie 管理购物车的工作，同时也能胜任其他一些工作。比如HTML5游戏通常会产生一些本地数据，localStorage 也是非常适用的。

**⑶ sessionStorage：**如果遇到一些内容特别多的表单，为了优化用户体验，我们可能要把表单页面拆分成多个子页面，然后按步骤引导用户填写。这时候 sessionStorage 的作用就发挥出来了。

# 安全性的考虑-Security

不是什么数据都适合放在 Cookie、localStorage 和 sessionStorage 中的。使用它们的时候，需要时刻注意是否有代码存在 XSS 注入的风险。因为只要打开控制台，你就随意修改它们的值，也就是说如果你的网站中有 XSS 的风险，它们就能对你的 localStorage 肆意妄为。所以千万不要用它们存储你系统中的敏感数据。

# 浏览器本地存储与服务器端存储的区别-Server storage

其实数据既可以在浏览器本地存储，也可以在服务器端存储 

浏览器可以保存一些数据，需要的时候直接从本地存取，sessionStorage、localStorage和cookie都是由浏览器存储在本地的数据 

服务器端也可以保存所有用户的所有数据，但需要的时候浏览器要向服务器请求数据。 

1、服务器端可以保存用户的持久数据，如数据库和云存储将用户的大量数据保存在服务器端   
2、服务器端也可以保存用户的临时会话数据，服务器端的session机制，如jsp的session对象，数据保存在服务器上，

实际上，服务器和浏览器之间仅需传递session id即可，服务器根据session id找到对应用户的session对象，会话数据仅在一段时间内有效，这个时间就是server端设置的session有效期

服务器端保存所有的用户的数据，所以服务器端的开销较大，而浏览器端保存则把不同用户需要的数据分别保存在用户各自的浏览器中，浏览器端一般只用来存储小数据，而非服务可以存储大数据或小数据服务器存储数据安全一些，浏览器只适合存储一般数据

# cookie和session的区别： 

1、cookie数据存放在客户的浏览器上，session数据放在服务器上   
2、cookie不是很安全，别人可以分析存放在本地的cookie并进行cookie欺骗，考虑*到安全应当使用session   
3、session会在一定时间内保存在服务器上，当访问增多，会比较占用你服务器的性能，考虑到减轻服务器性能方面，应当使用cookie   
4、单个cookie保存的数*据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie   
5、建议将登录信息等重要信息存放为session，其他信息如果需要保留，可以放在cookie中   
6、session保存在服务器，客户端不知道其中的信心；cookie保存在客户端，服务器能够知道其中的信息   
7、session中保存的是对象，cookie中保存的是字符串   
8、session不能区分路径，同一个用户在访问一个网站期间，所有的session在任何一个地方都可以访问到，而cookie中如果设置了路径参数，那么同一个网站中不同路径下的cookie互相是访问不到的  

# 更多-more

[Cookie、session和localStorage、以及sessionStorage之间的区别](http://blog.csdn.net/ruby_xc/article/details/65939988)  
[详说 Cookie, LocalStorage 与 SessionStorage](https://segmentfault.com/a/1190000002723469)
