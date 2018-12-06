---
layout: post
title: vue+mockjs+axios 模拟请求数据-复杂版
tags:
- vue
categories: Framework
description: vue+mockjs+axios 模拟请求数据-复杂版
---

# vue+mockjs+axios 模拟请求数据-复杂版

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

# 在项目中引用mockjs+axios模拟数据

**文件目录结构：**

- src
    - api
        + feedback.js
        + project_classify.js
    - components
        + HelloWorld.vue
    - mock
        + index.js
        + feedback.js
        + project_classify.js
    - utils
        + fetch.js
    - main.js



## Mock.mock

新建 src/mock/index.js

```js
import Mock from 'mockjs';
import feedbackApi from './feedback.js';
// import projectClassifyApi from './project_classify.js';

Mock.mock(/\/feedback/, 'post', feedbackApi.getFeedback);
// Mock.mock(/\/project_classify/, 'get', projectClassifyApi.getProjectClassify);

export default Mock;
```

新建 src/mock/feedback.js

```js
import Mock from 'mockjs';

export default {
  getFeedback: () => ({
    title: '我是feedback标题',
    content: '我是feedback内容'
  })
};
```

## main.js 引入 './mock/index'

src/main.js 新增如下内容

```js
import './mock/index';
```


## 创建axios实例、请求拦截器、响应拦截器

新建 src/utils/fetch.js

```js
import axios from 'axios';
import vue from 'vue';
 
const baseUrl = 'http://localhost:8080';
// 创建axios实例
const HTTP = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});
 
// 请求拦截器
HTTP.interceptors.request.use(function(config) {
  return config;
}, function(error) {
  return Promise.reject(error);
});

// 响应拦截器
HTTP.interceptors.response.use(function(response) {
  return response;
}, function(error) {
  return Promise.reject(error);
});

export default HTTP;
```


## 创建请求api方法

新建 src/feedback.js

```js
import HTTP from '../utils/fetch';

export function getFeedback() {
	return HTTP({
		url: '/feedback',
		method: 'post'
	})
}
```

## 组件中模拟使用请求-use

```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import { getFeedback } from '../api/feedback';
// import { getProjectClassify } from '../api/project_classify';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created() {
    getFeedback().then((res) => {
       console.log(res);
    })
    .catch(error => console.log(error));
    
    // getProjectClassify().then((res) => {
    //   console.log(res.data);
    // })
  }
}
</script>

<style scoped>

</style>
```

在浏览器中看到打印出的res


一般我们需要使用到 res.data ,获取返回的数据

# 如何再次add一个请求接口

1. 新增 mock/project_classify.js，并加入 mock/index.js 中
2. 新增 api/project_classify.js, 然后就能在组件中愉快的使用了

mock/project_classify.js

```js
import Mock from 'mockjs';

export default {
  getProjectClassify: () => (
	[
	    "consumer electronics",
	    "private jet",
	    "fintech"
	]
  )
};
```

api/project_classify.js

```js
import HTTP from '../utils/fetch';

export function getProjectClassify() {
  return HTTP({
    url: '/project_classify',
    method: 'get'
  });
}
```

# more
- [http://mockjs.com/](http://mockjs.com/)
- [https://github.com/axios/axios](https://github.com/axios/axios)
- 完整项目请看github, 项目待上传，地址待添加。。。