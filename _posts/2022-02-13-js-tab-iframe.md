---
layout: post
title: 如何实现网页多标签tab通讯
tags:
- BOM
- Interview
categories: JS
description: 如何实现网页多标签tab通讯
---

# 如何实现网页多标签tab通讯

- ❶ WebSccket 需要服务器，成本较高，无跨域限制  
- ❷ localStorage 简单易用，同域，【推荐】  
- ❸ SharedWorker 调试不方便，同域，不兼容IE11 

**localStorage 示例**

A 页面设置 localStorage,B 页面可监听到 localStorage

A
```html
<body>
  <button id='btn1'>修改</button>
</body>
<script>
  const btn1 = docunent.getElementById('btn1');
  btn1.addEventListener('click', () => {
    const newInfo = {
      id: 100,
      name: '标题' + Date.now()
    };
    localStorage.setItem('changeInfo',JSON.striginfy(newInfo))
  })
</script>
```

B

```js
window.addEventListener('storage', event => {
  console.info('key', event.key)
  console.info('value', event.newValue)
})
``` 

# 如何实现网页和iframe之间的通讯

使用 postMessage 通讯，注意跨域的限制和判断

postMessage 示例，

页面，里面嵌入了 iframe

```html
<body>
  <button id='btn1'>修改</button>
  <iframe id='iframe1' src='./child.html'></iframe>
</body>
<script>
  const btn1 = docunent.getElementById('btn1');
  btn1.addEventListener('click', () => {
    console.info('页面clicked');
    // 发送
    window.iframe1.contentWindow.postMessage('hello', '*')
    // 接收
    window.addEventListener('message', event => {
      console.info('origin', event.origin)  // 来源的域名
    })
  })
</script>
```
iframe.html
```html
<body>
  <button id='btn1'>修改</button>
  <iframe id='iframe1' src='./child.html'></iframe>
</body>
<script>
  const btn1 = docunent.getElementById('btn1');
  btn1.addEventListener('click', () => {
    console.info('iframe clicked');
    // 发送
    window.parent.postMessage('world', '*')
    // 接收
    window.addEventListener('message', event => {
      console.info('origin', event.origin)  // 来源的域名
    })
  })
</script>
```


