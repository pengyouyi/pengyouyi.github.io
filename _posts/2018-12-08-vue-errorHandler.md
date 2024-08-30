---
layout: post
title: 如何统一监听 Vue 组件报错
tags:
- vue
categories: Framework
description: 如何统一监听 Vue 组件报错
---

# 如何统一监听 Vue 组件报错

❶ window.onerror  
❷ errorCaptured 生命周期  
❸ errorHandler 配置  

## ❶ window.onerror

- 全局监听所有 JS 错误  
- 但它是 JS 级别的，识别不了 Vue 组价信息  
- 捕捉一些 Vue 监听不到的错误  

App.vue 示例

```html
<template>
</template>
<script>
   export default {
     mounted() {
       window.onerror = function(msg, source, line, column, error) {
         console.info('window.onerror----', msg, source, line, column, error)
       }
     }
   }
</script>
```

## ❷ errorCaptured 生命周期

- 监听所有下级组件的错误  
- 返回 false 会阻止向上传播  


```html
<template>
</template>
<script>
   export default {
     mounted() {
       window.onerror = function(msg, source, line, column, error) {
         console.info('window.onerror----', msg, source, line, column, error)
       }
     },
     errorCaptured: (err, vm, info) => {
       console.info('errorCaptured----', err, vm, info)
     }
   }
</script>
```

## ❸ errorHandler 配置

- Vue 全局错误监听，所有组件错误都会汇总到这里  
- 但 errorCaptured 返回 false,不会传播到这里  


在 main.js 中配置

```js
const app = createApp(App)

app.config.errorHandler = (error, vm, info) => {
  console.info('errorHandler----', err, vm, info)
}
```

**异步错误**

- 异步回调里的错误，errorHandler 监听不到  
- 需要使用 window.onerror

**【总结：】**

- errorCaptured 监听下级组件错误，返回 false 阻止向上传播  
- errorHandler 监听全局 Vue 组件的错误  
- window.onerror 监听其他 JS 错误，如异步  

**如何使用：**

- 实际工作中，三者要结合使用  
- errorCaptured 监听一些重要、有风险组件的错误  
- window.onerror 和 errorHandler 候补全局监听  
