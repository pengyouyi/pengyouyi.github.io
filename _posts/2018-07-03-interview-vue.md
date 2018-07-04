---
layout: post
title: Vue面试题汇总
tags:
- Interview
- vue
categories: JS
description: Vue面试题汇总
---

# vue-router

## vue-router是什么？它有哪些组件？

vue用来写路由一个插件。

router-link、router-view

## active-class是哪个组件的属性？

vue-router模块的router-link组件。

```js
<router-link :to="{ name: 'goods' }" tag="div" class="tab-item" active-class="active">商品</router-link>
```

## vue嵌套路由怎么定义？

在 VueRouter 的参数中使用 children 配置

- projectName
	- index.html
	- src
	  - App.vue
	  - main.js
	  - components
	      - rank
	         - rank.vue
	      - top-list
	         - top-list.vue
	  - router
	      - index.js


index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>sell</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
    <link rel="stylesheet" type="text/css" href="static/css/reset.css">
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

App.vue

```js
<template>
  <div id="app">
     <div class="tab">
	    <router-link to="/recommend" tag="div" class="tab-item" active-class="active">
	      推荐
	    </router-link>
	    <router-link to="/singer" tag="div" class="tab-item" active-class="active">
	      歌手
	    </router-link>
	    <router-link to="{name: 'rank'}" tag="div" class="tab-item" active-class="active">
        排行
	    </router-link>
	  </div>
    
    <div class="content">
	    <keep-alive>
	      <router-view></router-view>
	    </keep-alive>
    </div>
  </div>
</template>

```

main.js

```js
import Vue from 'vue';
import App from './App';
import router from './router';

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
```

router/index.js

```js
import Vue from 'vue';
import Router from 'vue-router';

import Rank from 'components/rank/rank.vue';
import Recommend from 'components/recommend/recommend';
import Singer from 'components/singer/singer';
import TopList from 'components/top-list/top-list';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer
    }
  ]
});

```

rank.vue

```js
<template>
  <div class="rank" ref="rank">
      <ul>
        <li @click="selectItem(item)" v-for="item in topList"></li>
      </ul>
      <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  methods: {
	   selectItem(item) {
		      this.$router.push({
		        path: `/rank/${item.id}`
		      });
		}
  }
}
</script>

```

top-list.vue

```js
<template>
    <music-list></music-list>
</template>

```


## 怎么定义vue-router的动态路由？怎么获取传过来的动态参数？

在router目录下的index.js文件中，对path属性加上/:id。

使用router对象的params.id。

## vue-router有哪几种导航钩子？

三种，

**第一种：是全局导航钩子：router.beforeEach(to,from,next)，作用：跳转前进行判断拦截。**

- beforeEach

- beforeResolve

- afterEach

```js
//定义一个路由  
const router = new VueRouter({ ... })  
  
// 点击导航前调用  
router.beforeEach((to, from, next) => {  
  // ...  
})  
// 点击导航后调用  
router.afterEach(route => {  
  // ...  
})
```

**第二种：组件内的钩子**

- beforeRouteEnter

- beforeRouteUpdate (2.2 新增)

- beforeRouteLeave

```js
let fromPath = '';  
export default{  
    beforeRouteEnter (to, from, next) {  
         // 在渲染该组件的对应路由被 confirm 前调用  
         // 不！能！获取组件实例 `this`  
         // 因为当钩子执行前，组件实例还没被创建  
         fromPath = from.path;  
         next();  
    }, 
}
```

**第三种：单独路由独享组件**

beforeEnter

```js
const router = new VueRouter({  
  routes: [  
    {  
      path: '/foo',  
      component: Foo,  
      beforeEnter: (to, from, next) => {  
        // ...  
      },  
      beforeEnter: (route) => {  
        // ...  
      }  
    }  
  ]  
});
```

## vue-router导航钩子有哪些参数

有to（去的那个路由）、

from（离开的路由）、

next（一定要用这个函数才能去到下一个路由，如果不用就拦截）最常用就这几种


# mint-ui

## mint-ui是什么？

mint-ui是什么？怎么使用？说出至少三个组件使用方法？

基于vue的前端组件库。

npm安装，然后import样式和js，vue.use（mintUi）全局引入。

在单个组件局部引入：import {Toast} from ‘mint-ui’。

组件一：Toast(‘登录成功’)；

组件二：mint-header；

组件三：mint-swiper

# 指令-directive

## 说出至少4种vue当中的指令和它的用法？

- v-if：判断是否隐藏；

- v-for：数据循环出来；

- v-bind:class：绑定一个属性；

- v-model：实现双向绑定

指令（v-class、v-for、v-if、v-show、v-on）。


## v-model是什么？怎么使用？ vue中标签怎么绑定事件？

v-model可以实现双向绑定，

vue的model层的data属性。

绑定事件：`<input @click=doLog()/>`

## v-if与v-show的区别

[【Vue】v-if与v-show的区别](https://www.cnblogs.com/echolun/p/7803943.html)

## 自定义指令-directive

自定义指令（v-check、v-focus）的方法有哪些？它有哪些钩子函数？还有哪些钩子函数参数？

全局定义指令：在vue对象的directive方法里面有两个参数，一个是指令名称，另外一个是函数。

组件内定义指令：directives

钩子函数：bind（绑定事件触发）、inserted(节点插入的时候触发)、update（组件内相关更新）

钩子函数参数：el、binding

# axios

## axios是什么？

请求后台资源的模块。

## axios的特点有哪些？

1. Axios 是一个基于 promise 的 HTTP 库，支持promise所有的API

2. 它可以拦截请求和响应

3. 它可以转换请求数据和响应数据，并对响应回来的内容自动转换成 JSON类型的数据

4. 安全性更高，客户端支持防御 XSRF

## axios有哪些常用方法？

1. axios.get(url[, config])   //get请求用于列表和信息查询

2. axios.delete(url[, config])  //删除

3. axios.post(url[, data[, config]])  //post请求用于信息的添加

4. axios.put(url[, data[, config]])  //更新操作

### 歌单数据接口分析-Interface

[QQ音乐分类歌单](https://y.qq.com/portal/playlist.html)

[分类歌单JSON数据](https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg)

此时在浏览器无法预览歌单数据，且JSONP也无法读取URL，

报错误码500-内部服务器错误

前端无法绕过Headers中的host、referer
```bash
access-control-allow-origin:http://y.qq.com
referer:https://y.qq.com/portal/playlist.html
```

[axios](https://github.com/mzabriskie/axios)

安装axios
```bash
npm install axios --save
```

然后发送的是跨域，dev-server.js新增

```js
var axios = require('axios')

var apiRoutes = express.Router()

apiRoutes.get('/getDiscList', function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

app.use('/api', apiRoutes)
```

后台如果是Tp5则定义一个资源路由。

js中使用import进来，然后.get或.post。返回在.then函数中如果成功，失败则是在.catch函数中


recommend.js
```js
export function getDiscList() {
  const url = '/api/getDiscList';

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  });

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
```

recommend.vue
```html
<script type="text/ecmascript-6">
import {getRecommend, getDiscList} from 'api/recommend';
import {ERR_OK} from 'api/config';
export default {
  data() {
      return {
          recommends: [],
          discList: []
      };
  },
  created() {
    this._getDiscList();
  },
  methods: {
    _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
             // console.log(res.data);
             this.discList = res.data.list;
          }
        });
      }
  }
};
</script>
```

浏览器可访问抓取的

[getDiscList](http://localhost:8080/api/getDiscList?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000&rnd=0.732565425766549)


## axios+tp5进阶

axios+tp5进阶中，调用axios.post(‘api/user’)是进行的什么操作？axios.put(‘api/user/8′)呢？

跨域，

添加用户操作，

更新操作。


## 说下你了解的axios相关配置属性？

```js
`url`是用于请求的服务器URL

`method`是创建请求时使用的方法,默认是get

`baseURL`将自动加在`url`前面，除非`url`是一个绝对URL。它可以通过设置一个`baseURL`便于为axios实例的方法传递相对URL

`transformRequest`允许在向服务器发送前，修改请求数据，只能用在'PUT','POST'和'PATCH'这几个请求方法

`headers`是即将被发送的自定义请求头
    headers:{'X-Requested-With':'XMLHttpRequest'},

`params`是即将与请求一起发送的URL参数，必须是一个无格式对象(plainobject)或URLSearchParams对象
    params:{
        ID:12345
    },

`auth`表示应该使用HTTP基础验证，并提供凭据
这将设置一个`Authorization`头，覆写掉现有的任意使用`headers`设置的自定义`Authorization`头
    auth:{
        username:'janedoe',
        password:'s00pers3cret'
    },

'proxy'定义代理服务器的主机名称和端口

`auth`表示HTTP基础验证应当用于连接代理，并提供凭据
这将会设置一个`Proxy-Authorization`头，覆写掉已有的通过使用`header`设置的自定义`Proxy-Authorization`头。
    proxy:{
        host:'127.0.0.1',
        port:9000,
        auth::{
            username:'mikeymike',
            password:'rapunz3l'
        }
    },
```

# vuex

## 你是怎么认识vuex的？

vuex可以理解为一种开发模式或框架。比如PHP有thinkphp，java有spring等。

通过状态（数据源）集中管理驱动组件的变化（好比spring的IOC容器对bean进行集中管理）。

- 应用级的状态集中放在store中； 

- 改变状态的方式是提交mutations，这是个同步的事物； 

- 异步逻辑应该封装在action中。

## vuex是什么？怎么使用？哪种功能场景使用它？

vue框架中状态管理。

在main.js引入store，注入。新建了一个目录store，….. export 。

场景有：单页应用中，组件之间的状态。音乐播放、登录状态、加入购物车

**音乐播放器vuex例子**

- store
  - index.js
  - actions.js
  - getters.js
  - mutations.js
  - mutation-types.js
  - state.js
  
- main.js 引入store
- 业务层
  - singer.vue需要跳转及传递给XX的页
  - singer-detail.js跳转到的及接收数据的页面


store/ index.js
```js
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict: debug,
    plugins: debug ? [createLogger()] : []
});
```

store/state.js
```js
const state = {
    singer: {}
};

export default state;
```

store/mutation-types.js
```js
export const SET_SINGER = 'SET_SINGER';
```

store/mutations.js
```js
import * as types from './mutation-types';

const mutations = {
    [types.SET_SINGER](state, singer) {
        state.singer = singer;
    }
};

export default mutations;
```

store/getters.js
```js
export const singer = state => state.singer;
```

main.js
```js
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index';

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  render: h => h(App)
});
```

singer.js
```js
<template>
  <div class="singer">
    <list-view :data="singers" @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
import {mapMutations} from 'vuex';

export default {
  data() {
      return {
          singers: []
      };
  },
  methods: {
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      });
      this.setSinger(singer);
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
};
</script>
```

singer-detail.js
```js
<template>
<transition name="slide">
  <div class="singer-detail">
      详情
  </div>
</transition>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex';
export default {
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    console.log(this.singer);
  }
};
</script>
```

actions.js

无内容

[vuex更多](https://vuex.vuejs.org/zh-cn/structure.html)

# MVVM

## mvvm框架是什么？

mvvm框架是什么？它和其它框架（jquery）的区别是什么？哪些场景适合？

一个model+view+viewModel框架，数据模型model，viewModel连接两个

区别：vue数据驱动，通过数据来显示视图层而不是节点操作。

场景：数据操作比较多的场景，更加便捷


## Vue的双向数据绑定原理是什么？

vue.js 是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。


具体步骤：

第一步：需要observe的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter和getter 这样的话，给这个对象的某个值赋值，就会触发setter，那么就能监听到了数据变化

第二步：compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图

第三步：Watcher订阅者是Observer和Compile之间通信的桥梁，主要做的事情是:

1、在自身实例化时往属性订阅器(dep)里面添加自己

2、自身必须有一个update()方法

3、待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。

第四步：MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果。

# vue组件化

## 请说下封装vue组件的过程？

首先，组件可以提升整个项目的开发效率。能够把页面抽象成多个相对独立的模块，解决了我们传统项目开发：效率低、难维护、复用性等问题。

然后，使用Vue.extend方法创建一个组件，然后使用Vue.component方法注册组件。
子组件需要数据，可以在props中接受定义。而子组件修改好数据后，想把数据传递给父组件。可以采用emit方法。


# vue-loader

## vue-loader是什么？使用它的用途有哪些？

解析.vue文件的一个加载器，跟template/js/style转换成js模块。

用途：js可以写es6、style样式可以scss或less、template可以加jade等


# vue.cli

## 请说出vue.cli项目中src目录每个文件夹和文件的用法？

- assets文件夹是放静态资源；

- components是放组件；

- router是定义路由相关的配置;

- view视图；

- app.vue是一个应用主组件；

- main.js是入口文件


## vue.cli中怎样使用自定义的组件？有遇到过哪些问题吗？

第一步：在components目录新建你的组件文件（smithButton.vue），script一定要export default {

第二步：在需要用的页面（组件）中导入：import smithButton from ‘../components/smithButton.vue’

第三步：注入到vue的子组件的components属性上面,components:{smithButton}

第四步：在template视图view中使用，`<smith-button> </smith-button>`

问题有：smithButton命名，使用的时候则smith-button。

# template编译

## 聊聊你对Vue.js的template编译的理解？


简而言之，就是先转化成AST树，再得到的render函数返回VNode（Vue的虚拟DOM节点）

详情步骤：

首先，通过compile编译器把template编译成AST语法树（abstract syntax tree 即 源代码的抽象语法结构的树状表现形式），compile是createCompiler的返回值，createCompiler是用以创建编译器的。另外compile还负责合并option。

然后，AST会经过generate（将AST语法树转化成render funtion字符串的过程）得到render函数，render的返回值是VNode，VNode是Vue的虚拟DOM节点，里面有（标签名、子节点、文本等等）


# vuejs与angularjs的区别？

相同点：

- 都支持指令：内置指令和自定义指令。

- 都支持过滤器：内置过滤器和自定义过滤器。

- 都支持双向数据绑定。

- 都不支持低端浏览器

不同点：

1.AngularJS的学习成本高，比如增加了Dependency Injection特性，而Vue.js本身提供的API都比较简单、直观。

2.在性能上，AngularJS依赖对数据做脏检查，所以Watcher越多越慢。

Vue.js使用基于依赖追踪的观察并且使用异步队列更新。所有的数据都是独立触发的。

对于庞大的应用来说，这个优化差异还是比较明显的。

# vuejs与react的区别？

相同点：

- React采用特殊的JSX语法，Vue.js在组件开发中也推崇编写.vue特殊文件格式，对文件内容都有一些约定，两者都需要编译后使用。

- 中心思想相同：一切都是组件，组件实例之间可以嵌套。

- 都提供合理的钩子函数，可以让开发者定制化地去处理需求。

- 都不内置列数AJAX，Route等功能到核心包，而是以插件的方式加载。

- 在组件开发中都支持mixins的特性

不同点：

React依赖Virtual DOM,而Vue.js使用的是DOM模板。React采用的Virtual DOM会对渲染出来的结果做脏检查。

Vue.js在模板中提供了指令，过滤器等，可以非常方便，快捷地操作DOM。






