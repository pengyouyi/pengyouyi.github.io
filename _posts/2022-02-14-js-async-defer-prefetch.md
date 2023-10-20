---
layout: post
title: script标签的defer和async有什么区别
tags:
- optimize
- Interview
categories: JS
description: script标签的defer和async有什么区别
---

# script标签的defer和async有什么区别

<div class="rd">
    <img src="/assets/images/2023/10-11-12/async-defer.png" alt="">
</div>

- 无：HTML 暂停解析，下载 JS，执行 JS，再继续解析 HTML  
- defer: HTML 继续解析，并行下载 JS，HTML 解析完再执行 JS  
- async: HTML 继续解析，并行下载 JS，执行 JS，再解析 HTML 

# preload和prefetch

- preload 资源在当前页面使用，会`优先`加载  
- prefetch 资源在未来页面使用，`空闲时`加载  

```html
<head>
  <!-- preload -->
  <link rel="preload" href="style.css" as="style">
  <link rel="preload" href="main.js" as="script">

  <!-- prefetch -->
  <link rel="prefetch" href="other.js" as="script">

  <!-- 引用css -->
  <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- 引用js -->
    <script src="main.js" defer></script>
</body>
```

# dns-prefetch 和 preconnect 

- dns-prefetch  即 DNS 预查询  
- preconnect 即 DNS 预连接  

```html
<head>
  <link rel="dns-prefetch" href="http://XXX.com">
  <link rel="preconnect" href="ttp://XXX.com" crossorigin>
</head>
```