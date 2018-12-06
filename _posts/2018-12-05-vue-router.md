---
layout: post
title: vue-router传参（params 与 query）的区别
tags:
- vue
categories: Framework
description: vue-router传参（params 与 query）的区别
---

# vue2.0中的$router 和 $route的区别

在控制台中打印 this.$router 和 this.$route

<div class="rd">
    <img src="/assets/images/2018/10-11-12/12-5-1.png" alt="">
</div>
<div class="rd">
    <img src="/assets/images/2018/10-11-12/12-5-2.png" alt="">
</div>

- 1. router为VueRouter实例，想要导航到不同URL，则使用router.push方法
- 2. $route为当前router跳转对象，里面可以获取name、path、query、params等

# vue-router传参（params 与 query）的区别

## params、query是什么？

- params：/router1/:id ，/router1/123，/router1/789 , 这里的id叫做params

- query：/router1?id=123 ,/router1?id=456 , 这里的id叫做query。

`传参是this.$router,接收参数是this.$route`

## query方式传参和接收参数

router/index.js

```js
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Query from '@/components/query'
import Params from '@/components/params'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/query/',
      name: 'Query',
      component: Query
    },
    {
      path: '/params/:id',
      name: 'Params',
      component: Params
    }
  ]
})
```

```js
传参: 
this.$router.push({
        path:'/query'
        query:{
          name: 'pyy',
          sex: 'female'
        }
      })
  
接收参数:
this.$route.query.name
```

跳转之后的地址栏：

`http://localhost:8080/#/query?name=pyy&sex=female`

#### query传参，刷新页面

通过query传参，页面发生跳转后，刷新 `http://localhost:8080/#/query?name=pyy&sex=female` 

1. 页面url地址仍旧没有发生变化,页面中的内容【this.$route.query.name】也没有发生变化。

2. 但是我们可以直接修改url上的参数【`http://localhost:8080/#/query?name=pengyouyi` 】，使页面中的内容发生变化。

3. 我们还可以删除url上的query参数，或者router.push()的时候不传递query中的参数，页面依然可以正常跳转

## params方式传参和接收参数

```js
传参: 
this.$router.push({
        name:'Params'
        params:{
          age: 26,
          favorite: 'Table Tennis'
        }
      })
  
接收参数:
this.$route.params.age
```

跳转之后的地址栏：

`http://localhost:8080/#/params`

### params设置在路由

应用场景：当列表页跳转到详情页的时候。

比如：跳转 /params/:id

router/index.js

```js
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Params from '@/components/params'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/params/:id',
      name: 'Params',
      component: Params
    }
  ]
})
```

要跳转页面 components/HelloWorld.vue

```html
<template>
  <div class="hello">
    <h2 @click="toParams">to Params</h2>
  </div>
</template>

<script>
// import router from '@/router';
export default {
  methods: {
    toParams() {
	  // router.push({
      this.$router.push({
        name: 'Params',
        params: {
          // id: 20,
          age: 26,
          favorite: 'Table Tennis'
        }
      })
    }
  }
}
</script>
```

跳转之后的地址栏：

`http://localhost:8080/#/params/20`

**notice:**

当使用params方法传参的时候，要在路由后面加参数名，并且传参的时候，参数名要跟路由后面设置的参数名对应。

params一旦设置在路由，params就是路由的一部分，如果这个路由有params传参，但是在跳转的时候没有传这个参数，会导致跳转失败或者页面会没有内容。


#### query传参，刷新页面

params方法传参,在跳转后的页面，刷新 `http://localhost:8080/#/params/20` 

url上作为路由的params参数【id】不变，但是页面中获取到的没有在url中使用的其他params参数【age、favorite】刷新会消失数据

**怎么解决刷新时丢失的params参数？**

[beforeunload这个方法是在页面刷新时触发的，将store中的信息存入localStorage](https://blog.csdn.net/xr510002594/article/details/84302734)

## query方式和params方式区别

1. 传参时，push里面：query要用path来引入；params要用name来引入
2. url跳转后展示：query 在浏览器地址栏中显示参数【类似于我们ajax中get传参】；params 参数不会在地址栏中显示【类似于post】
3. 传参时，push里面的参数是否必须：query是拼接在url后面的参数，没有也没关，且query不设置也可以传参；当params参数作为路由的一部分,必须要有。
4. 刷新时：query不丢失参数；params不会丢失url中使用的参数，但params会丢失没在url中使用的参数。

# more

- [https://router.vuejs.org/zh/](https://router.vuejs.org/zh/)
- 完整项目请看github, 项目v-vue-router待上传，地址待添加。。。
