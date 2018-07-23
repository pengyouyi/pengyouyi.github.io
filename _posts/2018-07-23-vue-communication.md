---
layout: post
title: vue2.0 父子组件通信 兄弟组件通信
tags:
- vue
categories: Framework
description: vue2.0 父子组件通信 兄弟组件通信
---

# vue2.0 父子组件通信 兄弟组件通信

## 父组件往子组件传值props

父组件

```html
<template>
  <div class="parent">
    <Child :child-com = "content"></Child> 
  </div>
</template>

<script>
// 引入子组件
import Child from './child.vue';

export default {
  components: {
    Child
  },
  data () {
    return {
      content: 'this is from parent'
    }
  }
}
</script>
```

传递的参数名称不识别驼峰命名，推荐使用横杠-命名

子组件 child.vue

```html
<template>
  <div id="child">
    {{childCom}}
  </div>
</template>

<script>
export default {
	props: {
		childCom: {
			type: String,
            default: 'i will from parent' 
		}
	}
}
</script>
```

## 子组件往父组件传值，通过emit事件

子组件 

```html
<template>
  <div id="child">
    <div @click="open">click</div>
  </div>
</template>

<script>
export default {
	methods: {
		open() {
			this.$emit('showbox', 'child need parent show')
		}
	}
}
</script>
```

父组件

```html
<template>
  <div class="parent">
    <Child @showbox="toshow"></Child> 
  </div>
</template>

<script>
// 引入子组件
import Child from './child.vue';

export default {
  components: {
    Child
  },
  methods: {
    toshow(msg) {
      console.log(msg)
    }
  }
}
</script>
```

## 不同组件之间传值，通过eventBus

小项目少页面用eventBus，大项目多页面使用 vuex

示例：childA向childB发送数据

components
  - eventBus.js
  - childA.vue
  - childB.vue


eventBus.js

```js
import Vue from 'vue';
export default new Vue();
```

childA.vue 发送命令

```html
<template>
  <div id="child">
    <div @click="ge">i will send a message to childB</div>
  </div>
</template>

<script>
import eventBus from './eventBus.js'
export default {
	methods: {
		ge() {
			eventBus.$emit('eventFromA', '小弟好')
		}
	}
}
</script>
```

childB.vue 接收命令

```html
<template>
  <div id="child">
  </div>
</template>

<script>
import eventBus from './eventBus.js'
export default {
	created() {
		eventBus.$on('eventFromA', (arg) => {
            alert(arg);
		})
	}
}
</script>
```


# 更多-more

[vue通信、传值的多种方式（详细）](https://blog.csdn.net/qq_35430000/article/details/79291287)

[vue2.0 父子组件通信 兄弟组件通信](https://www.cnblogs.com/sichaoyun/p/6690322.html)