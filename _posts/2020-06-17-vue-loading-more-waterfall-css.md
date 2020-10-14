---
layout: post
title: pc端鼠标滑动，加载更多，css布局瀑布流，实现多列
tags:
- vue
categories: Framework
description: pc端鼠标滑动，加载更多，css布局瀑布流，实现多列
---

# vue实现鼠标滚动加载更多【简版css3布局】

接口地址： 

`http://test.pandanc.com/api/v1/news/entry/`

`http://test.pandanc.com/api/v1/news/entry/?limit=2&offset=2`


浏览器访问如下：

`http://localhost:8080/news/library/`

## CSS3实现瀑布流布局 column-count

**父容器**

```css
column-count: 3; /* 设置列数 */
column-gap: 0; /* 设置列与列之间的间距 */
column-width: 200px; /* 设置每列的宽度 */
```

**子容器**

```css
break-inside: avoid; /* 避免在元素内部插入分页符 */
```

**优点：模板只需1层循环**

### 更多CSS3实现瀑布流布局

[CSS3实现瀑布流布局(display: flex / column-count / display: grid)](http://www.imooc.com/article/273879)

[flex布局实现瀑布流排版](https://www.cnblogs.com/a-cat/p/8618675.html)

[纯css实现瀑布流（multi-column和flex布局）](https://blog.csdn.net/ZJW222/article/details/82356141)


**Vue.js中this.$nextTick()的使用**

this.$nextTick()将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。

[vm-nextTick-callback](https://cn.vuejs.org/v2/api/#vm-nextTick-callback)

[this.$nextTick()](https://www.cnblogs.com/jin-zhe/p/9985436.html)

# v-loading-more-mouse-waterfall-css demo

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
    <ul class="news-section waterfall">
      <li v-for="item in newses" class='item'>
        <div class="item-content">
          <h2>{{item.title}}</h2>
          <img class="img-news" :src="item.image" alt="">
          <div>{{item.content}}</div>
        </div>
      </li>
    </ul>
    <LoadingMore :disabled="disabled" :show="haveMore" @loading="getNews"></LoadingMore>
  </div>
</template>

<script>
import LoadingMore from '../base/loadingMore';
export default {
  components: {
    LoadingMore
  },
  data () {
    return {
      msg: 'Welcome to News',
      token:'',
      limit: 3,
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
  },
  methods: {
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
.waterfall {
  column-count: 3; /* 设置列数 */
  column-gap: 0; /* 设置列与列之间的间距 */
  /* column-width: 200px; //设置每列的宽度 */
}
.item {
  box-sizing: border-box;
  break-inside: avoid; /* 避免在元素内部插入分页符 */
  padding: 10px;
}
.item-content {
  padding: 10px;
  height: auto;
  box-sizing: border-box;
  border: 1px solid red;
}
</style>
```

src/main.js 新增

```js
import axios from 'axios';

Vue.prototype.$axios = axios;
```

# more

- 完整项目请看github, 项目 [v-loading-more-mouse-waterfall-css](https://github.com/pengyouyi/Framework_test/tree/master/vue-test/vue-practical-components/v-loading-more-mouse-waterfall-css)
