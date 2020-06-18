---
layout: post
title: pc端鼠标滑动，加载更多，只有一个项目渲染
tags:
- vue
categories: Framework
description: pc端鼠标滑动，加载更多，只有一个项目渲染
---

# vue实现鼠标滚动加载更多【简版】

接口地址： 

`http://test.pandanc.com/api/v1/news/entry/`

`http://test.pandanc.com/api/v1/news/entry/?limit=2&offset=2`


浏览器访问如下：

`http://localhost:8080/news/library/`


**Vue.js中this.$nextTick()的使用**

this.$nextTick()将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。

[vm-nextTick-callback](https://cn.vuejs.org/v2/api/#vm-nextTick-callback)

[this.$nextTick()](https://www.cnblogs.com/jin-zhe/p/9985436.html)

[简单理解Vue中的nextTick](https://www.jianshu.com/p/a7550c0e164f)

# v-loading-more-mouse demo

src/router/index.js

```js
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import News from '@/components/News'

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
      path: '/news',
      redirect: '/news/library',
      name: 'News',
      component: News,
      children: [{
        path: 'library',
        component: News,
      }]
    }
  ]
})
```

src/components/News.vue

```html
<template>
  <div class="news">
    <ul class="news-section">
      <li v-for="item in newses">
        <h2>{{item.title}}</h2>
        <img class="img-news" :src="item.image" alt="">
        <div>{{item.content}}</div>
      </li>
    </ul>
    <button @click="getNews" v-show='haveMore' ref='loadBtn'>loading-more</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to News',
      token:'',
      limit: 1,
      newses: [],
      defaultOrdering: '-publication_date',
      page:0,
      haveMore: true,
      disabled: false,
      offset: 100,
      loading: false
    }
  },

  mounted() {
    this.getNews();
    window.addEventListener('scroll', this.onScroll)
  },
  watch: {
    //不显示后取消检测
    show(newValue) {
      newValue ? null : window.removeEventListener('scroll', this.onScroll)
    },
    //当可点击时取消loading状态
    disabled(newValue) {
      newValue ? null : this.loading = false; 
    }
  },
  methods: {
    onScroll() {
      //不正在axios中，按钮可点击
      if (!this.disabled) {
        //在视野中
        if (this.isView(this.$refs.loadBtn)) {
          this.getNews();
          this.loading = true;
        } else {
          //不在视野中
          this.loading = false;
        }
      } else {
        //正在axios中
        this.loading = true;
      }
    },
    //是否在视野内
    isView(element) {
        if (!element || !element.getBoundingClientRect) {
          return false
        };
        const rect = element.getBoundingClientRect(),
              top = rect.top >= 0,
              left = rect.left >= 0,
              bottom = rect.bottom <= (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) + this.offset,
              right = (rect.right <= (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) + this.offset);
              return (top && left && bottom && right);
    },
    // 获取项目数据
    getNews() {
      this.disabled = true;
      this.page++;
      // 获取newses
      this.$axios.get('http://test.pandanc.com/api/v1/news/entry/', {
        params: {
          limit: this.limit,
          offset: this.limit * (this.page - 1),
          ordering: this.defaultOrdering
        }
      }).then( res => {
        this.haveMore = res.data.next;
        this.pushNews(res.data.results)
      }).catch(err => {
        console.log(err)
        this.disabled = false;
      })
    },
    pushNews(results, index = 0) {
      if (results[index]) {
        this.newses.push(results[index]);
        this.$nextTick(() => {
          this.pushNews(results, index + 1)
        })
      } else {
        this.disabled = false;
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
}

.img-news {
  width: 300px;
  height: 300px;
}
</style>
```

src/main.js 新增

```js
import axios from 'axios';

Vue.prototype.$axios = axios;
```

# more

- 完整项目请看github, 项目 [v-loading-more-mouse](https://github.com/pengyouyi/Framework_test/tree/master/vue-test/vue%E5%AE%9E%E7%94%A8%E7%BB%84%E4%BB%B6/v-loading-more-mouse)
