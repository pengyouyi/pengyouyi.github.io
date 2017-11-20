---
layout: post
title: 前端错误监控
tags:
- 面试题
categories: other
description: 前端错误监控
---

# 前端error的分类

- 即时运行错误：代码错误  
- 资源加载错误  

# error的捕获方式

## 即时运行error

1、try..catch  
2、window.onerror

```js
try
  {
  //在这里运行代码
  }
catch(err)
  {
  //在这里处理错误
  }
```

## 资源加载error

1、object.onerror  
2、[performance.getEntries()](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntries), 获取页面中每个静态资源的请求  
3、Error事件捕获  

```js
window.addEventListener('error', function(e){
  console.log('捕获',e)
}, false);
```

**资源加载错误能被事件捕获，但是资源加载错误不冒泡**

# 跨域的js运行错误

错误能被捕获。

1、在script标签增加 crossorigin 属性  
2、设置js资源响应头 Access-Control-Allow-Origin:*  

# 上报error的基本原理

1、采用Ajax通信的方式上报  
2、利用Image对象上报（推荐）  

```js
<script>
(new Image()).src = "http://baidu.com/test?r=hello";
</script>
```


# 更多-more

- [http://www.cnblogs.com/hustskyking/p/fe-monitor.html](http://www.cnblogs.com/hustskyking/p/fe-monitor.html)