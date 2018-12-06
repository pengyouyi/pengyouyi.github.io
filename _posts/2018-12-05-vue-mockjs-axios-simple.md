---
layout: post
title: vue+mockjs+axios 模拟请求数据-简化版
tags:
- vue
categories: Framework
description: vue+mockjs+axios 模拟请求数据-简化版
---

# vue+mockjs+axios 模拟请求数据-简化版

## 基础知识

1. npm 安装 vue-cli 脚手架后，通过命令“ vue init webpack 项目名 ”来创建项目；

2. 了解 mockjs：可以拦截 Ajax 请求，返回模拟的响应数据，实现前后端分离；

3. 了解 axios: 基于http客户端的promise，面向浏览器和nodejs。

**axios特色**

- 浏览器端发起XMLHttpRequests请求
- node端发起http请求
- 支持Promise API
- 拦截请求和返回
- 转化请求和返回（数据）
- 取消请求
- 自动转化json数据
- 客户端支持抵御XSRF（跨站请求伪造）

## vue项目初始化

``` bash
vue init webpack Vue-ProjectName
npm install
# serve with hot reload at localhost:8080
npm run dev
```

## 安装 mockjs 和 axios

```bash
npm install mockjs --save-dev
npm install axios --save-dev
```

## 在项目中引用mockjs

项目src目录下新建一个mock文件夹

在mock文件夹下新建 index.js 【存放所有的http模拟返回的接口数据】

### 编辑index.js

包括引用mockjs插件，设定mock规则、拦截ajax请求

src/mock/index.js

```js
import Mock from 'mockjs';

const vehicle = Mock.mock('/api/vehicle','get', (req, res) =>{
    return  {
        code:200,
        data:[{
            id:1,
            licNumber:'渝A79898',
            color:"red",
            buyTime:'2017-04-01'

        },{
            id:2,
            licNumber:'京A79898',
            color:"white",
            buyTime:'2018-04-01'

        }],
        message:'success'
    }
});

const user = Mock.mock('/api/user','get', (req, res) =>{
    return  {
        code:200,
        data:{
            id:1,
            sex:1,
            age:25,
            createTime:'2017-04-01'
        },
        message:'查询成功'
    }
})

export default { vehicle,user }
```

## 在main.js中全局引入axios（并设定为Vue的原型属性$http）和mock.js文件

src/main.js

```js
import Vue from 'vue'
import App from './App'
import router from './router'
import "./mock";
import axios from 'axios';

Vue.prototype.$http = axios;

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
```

## 在组件中使用axios发送请求并将响应数据渲染到html

src/components/HelloWord.vue

```vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="(item, index) in data">{{item.licNumber}}</li>
    </ul>
  </div>
</template>

<script>
// import axios from 'axios';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      data: []
    }
  },
  created() {
    this.$http.get('/api/vehicle').then( response =>{ 
      console.log( response );
      this.data = response.data.data;
    })
    .catch(error => console.log(error));

    // axios.get('/api/user').then(response => {
    //   console.log(response)
    // })
    // .catch(error => console.log(error))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
```

# more

- [http://mockjs.com/](http://mockjs.com/)
- [https://github.com/axios/axios](https://github.com/axios/axios)
- 完整项目请看github, 项目待上传，地址待添加。。。


