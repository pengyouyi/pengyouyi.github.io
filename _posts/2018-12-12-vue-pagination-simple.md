---
layout: post
title: vue实现简单的翻页功能
tags:
- vue
categories: Framework
description: vue实现简单的翻页功能
---

# vue翻页组件

接口地址： http://test.pandanc.com/api/v1/projects/project/

浏览器访问如下：
http://localhost:8080/project/library/page

**翻页思路**

1. 翻页的时候通过改变url上params参数page
2. 路由参数page改变，刷新页面
3. 刷新页面的的时候，created 重新请求数据，getProjects(page)


**解决 'library/:page' 中page改变不刷新的问题**

通过给router-view添加一个动态变化的参数，让Vue认为这个组件每一次都是一个新组件，从而重新刷新。

[router-view 复用时组件不刷新的解决办法](https://www.jianshu.com/p/9911c15faa10)

# pagination demo

src/router/index.js

```js
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Project from '@/components/Project'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/project',
      redirect: '/project/library/1',
      name: 'Project',
      component: Project,
      children: [{
      	path: 'library/:page',
      	component: Project,
      }]
    }
  ]
})
```

src/components/Project.vue

```html
<template>
  <div class="project">
    <h1>{{ msg }}</h1>
    <div id="Pagination" :total="total" :limit="limit">
      <ul id="turn">
        <li v-for="i in showingPages" @click="onRouter(i)">
        {% raw %}
          {{i}}
        {% endraw %}
        </li>
      </ul>
    </div>
    <ul>
      <li v-for="item in projects">
        <h2>
        {% raw %}
          {{item.name}}
        {% endraw %}
        </h2>
        <img :src="item.cover_image" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Project',
      token:'',
      limit: 3,
      projects: [],
      defaultOrdering: '-upload_date',
      currentPage: parseInt(this.$route.params.page),
      total: 0
    }
  },
  computed: {
  	totalPage() {
  		return Math.ceil(this.total / this.limit);
  	},
  	showingPages() {
  		var temp = [];
  		for (var i = 0; i < this.totalPage; i++) {
  			temp.push(i + 1);
  		}
  		return temp;
  	}
  },
  mounted() {
    this.getProjects();
  },
  methods: {
    // 翻页
    onRouter(page = 1) {
      this.$router.push(`/project/library/${page}`);
    },

    // 获取项目数据
    getProjects(page=this.currentPage) {
      // 首先获取一个token，正式项目不需要这一步，这里为了绕过token验证，获取到projects数据
      this.$axios.post('http://test.pandanc.com/api/v1/accounts/rest-auth/login/',{
        username: 'pengyouyi',
        password: 'pengyouyi'
      }).then( res=> {
        this.token = res.data.token;
        // 获取projects
        this.$axios.get('http://test.pandanc.com/api/v1/projects/project/', {
          params: {
            limit: this.limit,
            offset: this.limit * (page - 1),
            ordering: this.defaultOrdering
          },
          headers: {
            Authorization: `JWT ${this.token}`
          },
        }).then( res=> {
        	this.projects = [];
        	this.total = res.data.count;
            this.projects = res.data.results;
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err);
      })
    },

    // getToken() {
    //   this.$axios.post('http://test.pandanc.com/api/v1/accounts/rest-auth/login/',{
    //     username: 'pengyouyi',
    //     password: 'pengyouyi'
    //   }).then( res=> {
    //     console.log(res.data.token)
    //     this.token = res.data.token;
    //   }).catch(err => {
    //     console.log(err);
    //   })
    // },
    
    // getProjects() {
    //   this.$axios.get('http://test.pandanc.com/api/v1/projects/project/', {
    //     headers: {
    //       Authorization: `JWT ${this.token}`
    //     }
    //   }).then( res=> {
    //     console.log(res)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },

  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
}
#turn {
	margin: 20px auto;
    overflow: hidden;
    line-height: 40px;
}
#turn li{
	display: inline-block;
	cursor: pointer;
	width: 40px;
	border:1px solid green;
	margin-bottom: 10px;
}
</style>
```

src/App.vue

```html
<template>
  <div id="app">
    <router-view :key="key"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    key() {
      return this.$route.name !== undefined ?
          this.$route.name + +new Date() :
          this.$route + +new Date();
    }
  }
}
</script>
```

src/main.js 新增

```js
import axios from 'axios';

Vue.prototype.$axios = axios;
```

# more

- 完整项目请看github, 项目v-pageturning-simple待上传，地址待添加。。。




