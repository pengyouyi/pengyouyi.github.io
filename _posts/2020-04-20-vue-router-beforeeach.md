---
layout: post
title: Vue Router 中的 导航守卫
tags:
- vue
categories: Framework
description: Vue Router 中的 导航守卫
---

# Vue Router 中的 导航守卫

[https://router.vuejs.org/zh/guide/advanced/navigation-guards.html](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)

# one 完整的导航解析流程

① 导航被触发。  
② 在失活的组件里调用离开守卫。  
③ 调用全局的 beforeEach 守卫。  
④ 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。  
⑤ 在路由配置里调用 beforeEnter。  
⑥ 解析异步路由组件。  
⑦ 在被激活的组件里调用 beforeRouteEnter。  
⑧ 调用全局的 beforeResolve 守卫 (2.5+)。  
⑨ 导航被确认。  
⑩ 调用全局的 afterEach 钩子。  
⑪ 触发 DOM 更新。  
⑫ 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。  


## simplified version 流程

<div class="purple" > ❷ 组件 beforeRouteLeave </div>

<div class="red" > ❸ 全局 beforeEach </div>

<div class="purple" > ❹ 组件 beforeRouteUpdate </div>

<div class="green" > ❺ 独享 beforeEnter </div>

<div class="purple" > ❼ 组件 beforeRouteEnter </div>

<div class="red" > ❽ 全局 beforeResolve </div>

<div class="red" > ❿ 全局 afterEach </div>



> 一定要确保调用 next() 方法。 （afterEach 除外）  
> afterEach 不接收第三个参数 next 函数，也不会改变导航本身

# two 流程 demo

## 全局守卫 global

main.js

```js
// 全局前置守卫
router.beforeEach((to, from, next) => {
    console.log('全局 beforeEach')
    next()
})
// 全局解析守卫
router.beforeResolve((to, from, next) => {
    console.log('全局 beforeResolve')
    next()
})
// 全局后置钩子
router.afterEach((to, from) => {
    console.log('全局 afterEach')
})
```

## 路由独享的守卫 single

src/router/index.js

```js
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Foo from '@/components/Foo'
import FooDetail from '@/components/FooDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      beforeEnter: (to, from, next) => {
          console.log('独享 HelloWorld beforeEnter')
          next()
      }
    },
    {
    	path: '/foo',
    	name: 'Foo',
    	component: Foo,
    	children: [
            {
            	path: ':id',
            	name: 'FooDetail',
            	component: FooDetail,
            	beforeEnter: (to, from, next) => {
		          console.log('独享 FooDetail beforeEnter')
		          next()
		        }
            },
            {
            	path: 'hello',
            	name: 'HelloWorld',
            	component: HelloWorld,
            	beforeEnter: (to, from, next) => {
		          console.log('独享 HelloWorld beforeEnter')
		          next()
		        }
            }
    	]
    }
  ]
})
```

## 组件内的守卫 component

src/components/HelloWorld.vue

```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p @click="goFoo">goFoo</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    goFoo() {
      this.$router.push({name: 'Foo'})
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('组件内 HelloWorld beforeRouteEnter')
    next()
  },
  beforeRouteUpdate(to, from, next) {
    console.log('组件内 HelloWorld beforeRouteUpdate')
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log('组件内 HelloWorld beforeRouteLeave')
    const answer = confirm('Do you really want to leave')
    if (answer) {
      next()
    } else {
      next(false)
    }
  }
};
</script>
```

src/components/Foo.vue

```html
<template>
  <div class="foo">
    <h1>{{ msg }}</h1>
    <router-link :to="{name: 'FooDetail', params: {id: 1}}">to foo1</router-link>
    <router-link to='/foo/2'>to foo2</router-link>
    <span @click="setId(3)">to foo3</span>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Foo',
  data () {
    return {
      msg: 'Welcome to Foo'
    }
  },
  methods: {
    setId(id) {
    	this.$router.push(`${id}`)
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('组件内 beforeRouteEnter')
    next()
  },
  beforeRouteUpdate(to, from, next) {
    console.log('组件内 beforeRouteUpdate')
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log('组件内 beforeRouteLeave')
    next()
  }
};
</script>
```

src/components/FooDetail.vue

```html
<template>
  <div class="foo-detail">
    <h1>{{ msg }} {{ $route.params.id}}</h1>
  </div>
</template>

<script>
export default {
  name: 'FooDetail',
  data () {
    return {
      msg: 'Welcome to FooDetail',
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('组件内 FooDetail beforeRouteEnter')
    next()
  },
  beforeRouteUpdate(to, from, next) {
    console.log('组件内 FooDetail beforeRouteUpdate')
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log('组件内 FooDetail beforeRouteLeave')
    next()
  }
};
</script>
```

# three 应用场景

## beforeEach

1、验证用户是否登录（若未登录，且当前非登录页面，则自动重定向登录页面）；

2、用户权限；

3、控制某个路由只能由某个路由进入

```js
const noReturn = ['/login', '/home']; //登陆后不能回到的页面

router.beforeEach((to, from, next) => {
    // 判断是否有token
	if (store.getters.token) {
        // 有token则不能再回到login页面了
		if (langRouterGenerator(noReturn).indexOf(to.path) !== -1) {
            next(`/${to.path.split('/')[1]}/news`);
        // 判断是否有权限进入
		} else if (hasPermission(store.getters.groups, to.meta.groups)) {
            // 来源受限路由
            if (to.meta.source) { 
                // 控制某个路由只能由某个路由进入
				if (to.meta.source.indexOf(from.meta.id) >= 0 || to.meta.id === from.meta.id || from.name === null) {
                    next();
                // 如果不是在source来源内的路由，则回退
				} else {
					next(false);
                }
            // 正常路由
			} else {
				next();
            }
        // 无权进入
		} else {
			next(`/${to.meta.lang}/401`);
        }
    // 在免登录白名单，直接进入
	} else if (langRouterGenerator(noLoginList).indexOf(to.path) >= 0) { 
        next();
    // 否则全部重定向到登录页
	} else { 
		next(`/${to.path.split('/')[1]}/login`);
	}
});
```

## afterEach

访问不同路由地址，显示每个页面对应的title

```js
router.afterEach(() => {
	window.scrollTo(0, 0); // 跳转后回到页面顶部
	i18n.locale = router.currentRoute.meta.lang; // 全称的lang
	axios.defaults.baseURL = url.base; // 设置axios的根请求路径
	document.title = `${router.currentRoute.name}`;
});
```

## beforeRouteLeave

1、清除当前组件中的定时器

```js
beforeRouteLeave (to, from, next) {  
    window.clearInterval(this.timer) // 清除定时器
    next()
}
```

2、 当页面中有未关闭的窗口, 或未保存的内容时, 阻止页面跳转

```js
beforeRouteLeave (to, from, next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```

3、保存相关内容到Vuex中或Session中

当用户需要关闭页面时, 可以将公用的信息保存到session或Vuex中

```js
 beforeRouteLeave (to, from, next) {
     // 保存到localStorage中
    localStorage.setItem(name, content); 
    next()
}
```

## beforeRouteUpdate

在当前路由改变，但是该组件被复用时调用。

1、父路由监听子路由变化

2、对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候

# more 

vue-router-beforeeach demo 代码请看 github, 项目 [v-router-beforeeach](https://github.com/pengyouyi/Framework_test/tree/master/vue-test/vue%E5%AE%9E%E7%94%A8%E7%BB%84%E4%BB%B6/v-router-beforeeach)