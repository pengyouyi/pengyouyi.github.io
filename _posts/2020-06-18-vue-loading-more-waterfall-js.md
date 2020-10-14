---
layout: post
title: pc端鼠标滑动，加载更多，js实现瀑布流，多列
tags:
- vue
- GCIP
categories: Framework
description: pc端鼠标滑动，加载更多，js实现瀑布流，多列
---

# vue实现鼠标滚动加载更多【js实现】

news 接口地址： 

`http://test.pandanc.com/api/v1/news/entry/`

`http://test.pandanc.com/api/v1/news/entry/?limit=2&offset=2`


浏览器访问如下：

`http://localhost:8080/news/library/`

# loading-more思路

1. 给鼠标滚动监听事件 onScroll： `window.addEventListener('scroll', this.onScroll)`
2. onScroll 方法中判断 加载更多按钮是否在视野区 `element.getBoundingClientRect()`，
3. 如果加载更多按钮在视野区，向data中追加数据
4. data: [ [], [], [] ] 双循环格式，每次向瀑布流中用来获取最短的列中 `clientHeight` 添加数据

**Vue.js中this.$nextTick()的使用**

this.$nextTick()将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。

[vm-nextTick-callback](https://cn.vuejs.org/v2/api/#vm-nextTick-callback)

[this.$nextTick()](https://www.cnblogs.com/jin-zhe/p/9985436.html)

# v-loading-more-mouse-waterfall-js demo

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
      <li v-for="news in newses" class='item' refs='myItem'>
        <div class="item-content" v-for="item in news">
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
      limit: 10,
      newses: [
        [],
        [],
        []
      ],
      defaultOrdering: '-publication_date',
      page:0,
      haveMore: true,
      disabled: false,
      offset: 100,
      loading: false,
    }
  },
  computed: {
    newsCols() {
      return document.getElementsByClassName('item')
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
          limit: this.newses.length * 2,
          offset: this.newses.length * 2 * (this.page - 1),
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
        // 向最短的列中追加数据
        this.newses[this.getMinCol(this.newsCols)].push(results[index]);
        this.$nextTick(() => {
          this.pushNews(results, index + 1);
        })
      } else {
        this.disabled = false;
      }
    },
    // 瀑布流中用来获取最短的列
    getMinCol(cols) {
      cols = Array.from(cols);
      let min = cols[0].clientHeight,
          index = 0;
      for (let i in cols) {
        if (min > cols[i].clientHeight) {
          min = cols[i].clientHeight;
          index = i;
        }
      }
      return index;
    }
  }
};
</script>

<style scoped>
ul,li {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.img-news {
  width: 200px;
  height: 300px;
}
.waterfall {
  border: 1px solid #333;
  width: 1000px;
  margin: 0 auto;
  overflow: hidden;
}
.item {
  width:300px;
  float: left;
  margin-left:20px;
}
.item-content {
  height: auto;
  box-sizing: border-box;
  border: 1px solid red;
}
</style>
```

src/base/loadingMore.vue

```html
<template>
    <button @click="onClick" v-show='show' ref='loadBtn'>{{text}}</button>
</template>

<script>
export default {
  props: {
    show: {
      type: [Boolean, String],
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    offset: {
      type: [Number, String],
      default: 100
    },
  },
  data() {
        return {
          text: '正在加载',
          loading: false
        }
  },
  mounted() {
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
            this.$emit('loading');
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
      // 立刻加载
      onClick() {
        this.loading = true;
        this.$emit('loading')
      }
  },
  beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll)
  }
};
</script>

<style scoped>


</style>
```

src/main.js 新增

```js
import axios from 'axios';

Vue.prototype.$axios = axios;
```

# loadingMore 组件复用

本项目中 loadingMore 组件可以被复用,比如上面的 news 和下面的 project

project 接口地址： 

`http://test.pandanc.com/api/v1/projects/project/`

`http://test.pandanc.com/api/v1/projects/project/?offset=10`


浏览器访问如下：

`http://localhost:8080/project/library`

# more

- 完整项目请看github, 项目 [v-loading-more-mouse-waterfall-js](https://github.com/pengyouyi/Framework_test/tree/master/vue-test/vue-practical-components/v-loading-more-mouse-waterfall-js)

