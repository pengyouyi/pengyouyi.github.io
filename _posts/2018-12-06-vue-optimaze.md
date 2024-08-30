---
layout: post
title: Vue 优化
tags:
- vue
- optimize
categories: Framework
description: Vue 优化
---

# 在实际工作中，你对Vue做过哪些优化

❶ v-if 和 v-show

- v-if 彻底销毁组件  
- v-show 使用 css 隐藏组件  
- 大部分情况下使用 v-if 更好，不要过度优化  

❷ v-for 使用 key

```html
<ul>
  <!-- key 最好不要用 index -->
  <li v-for="(id, name) in list" :key="id">{{name}}</li>
</ul>
```

❸ 使用 computed 缓存

```js
export default {
  data() {
    return {
      msgList: [...] // 消息列表
    }
  }，
  computed: {
    unreadCound() {
      // 未读消息的数量
      return this.msgList.filter(m => m.read === false).length
    }
  }
}
```

❹ keep-alive 缓存组件

- 频繁切换的组件，如 tabs  
- 不要乱用，缓存太多会占用内存，且不好 debug  

```html
<keep-alive>
    <Child1 v-if="num===1"></Child1>
    <Child2 v-else></Child2>
</keep-alive>
```

❺ 异步组件

- 针对体积比较大的组件，比如编辑器、复杂表格，复杂表单等  
- 拆包，需要时异步加载，不需要时不加载  
- 减少主包体积，首页会加载更快  

```html
<template>
  <Child></Child>
</template>
<script>
import { defineAsyncComponent } from 'vue'
  export default {
    name: '',
    components: {
      Child: defineAsyncComponent(() => import(/*webpackChunkName: "async-child"*/'./Child.vue'))
    }
  }
</script>
```

❻ 路由懒加载

- 项目比较大，拆分路由，保证首页先加载  

```js
const routes = {
  {
    path:'/',
    name: 'Home',
    component: Home
  },
  {
    path:'/about',
    name: 'About',
    component:() => import(/*  */ '../About.vue')
  }
}
```

❼ 服务端渲染 SSR

- 可使用 Nuxt.js  
- 按需优化，使用SSR 的成本比较高  


