---
layout: post
title: Vue Router 中的 router-view 显示
tags:
- vue
categories: Framework
description: Vue Router 中的 router-view 显示
---

# Vue routes 中的 component 在哪个 router-view 显示

[https://router.vuejs.org/zh/guide/#html](https://router.vuejs.org/zh/guide/#html)

❶ 不是谁的 children ，通通显示在根文件 App.vue 的 \<router-view/\> 中，

❀ 比如： '/a' 、 '/a/b/c' 都会显示在根文件 App.vue 的 \<router-view/\> 中

❷ 是谁的 children ,显示在父级 component 定义的 \<router-view/\> 中，

❀ 比如： '/home' 、'/login' ，会显示在 Layout 组件中定义的 \<router-view/\> 中

# router-view demo

src/router/index.js

```js
import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/pncComponents/layout/layout'
import Home from '@/pncPages/Home'
import Login from '@/pncPages/login/login'
import News from '@/pncPages/news'
import newsInfo from '@/pncPages/newsInfo'
import Project from '@/pncPages/project'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Layout,
      children: [
		    {
		      path: 'home',
		      name: 'Home',
		      component: Home,
		      meta: {
		      	isShowHomeHeader: true,
		      	hideNavBar: true
		      }
		    },
		    {
		      path: 'login',
		      name: 'Login',
		      component: Login,
		      meta: {
		      	isShowHomeHeader: true,
		      	hideNavBar: true
		      }
		    }
      ]
    },
	{
      path: '/news',
      redirect: '/news/library',
      name: 'News',
      component: Layout,
      children: [
          {
          	path: 'library',
          	name: News,
          	component: News
          },
          {
          	path: 'information/:id',
          	name: newsInfo,
          	component: newsInfo
          }
      ]
    },
    {
      path: '/project',
      redirect: '/project/library/1',
      name: 'Project',
      component: Layout,
      children: [
          {
          	path: 'library/:id',
          	name: Project,
          	component: Project
          }
      ]
    },
  ]
})

```

src/App.vue

```html
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>
```

src/pncComponents/layout/layout.vue

```html
<template>
  <div class="app-wrapper">
    <NavBar v-if="showNavbar"></NavBar>
    <div class="main-container">
        <HomeHeader v-if="$route.meta.isShowHomeHeader"></HomeHeader>
    	<div id="headerBar" v-else>主体头部</div>
    	<router-view></router-view>
    </div>
  </div>
</template>

<script>
import HomeHeader from './homeHeader'
import NavBar from './navBar'
export default {
  name: 'Home',
  components: {
    HomeHeader,
    NavBar
  },
  data () {
    return {
      msg: 'Welcome to layout'
    }
  },
  computed: {
    showNavbar() {
    	return !this.$route.meta.hideNavBar
    }
  }
};
</script>
```

# more 

vue-router-view demo 代码请看 github, 项目 [v-router-view](https://github.com/pengyouyi/Framework_test/tree/master/vue-test/vue%E5%AE%9E%E7%94%A8%E7%BB%84%E4%BB%B6/v-router-view)

