---
layout: post
title: Vue3 组件通讯的方式
tags:
- vue
categories: Framework
description: vue3.0 父子组件通信 兄弟组件通信
---

# Vue3 组件通讯的方式

- props 和 emits【子组件通过props:[]接收父组件的属性，子组件通过emits:[]获取父组件方法】  
- 自定义事件 $emit【子组件通过$emit 向父组件传值】  
- $attrs【子组件通过 this.$attrs 可以获取父组件上的属性和方法】  
- $parent【子组件通过 this.$parent 可以获取父组件上的属性和方法】  
- $refs【父组件通过 this.$refs 可以获取子组件上的属性和方法】  
- provide/inject【上级 provide 传递，下级 inject 接收】  
- Vuex  

# Vue3 组件通讯适用不同场景

- ❶ 父子组件【子取父 props、emits、$attrs、$parent；父取子 $emit、$refs】  
- ❷ 上下级组件（跨多级）通讯【provide/inject】  
- ❸ 全局组件【event-emitter/Vuex】  

# vue3.0 父子组件通信

## 父组件往子组件传值 props

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

## $emit 事件

子组件往父组件传值，通过emit事件

子组件 

```html
<template>
  <div id="child">
    <div @click="open">click</div>
  </div>
</template>

<script>
export default {
  emits: ['showbox'],  // Vue3新增的
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

## $attrs

`子组件通过 this.$attrs 可以获取父组件上的属性和方法`

$attrs 是 props 和 emits 之外的候补。

**$attrs 具体示例**

components
  - Level1.vue
  - Level2.vue
  - Level3.vue


- 父组件 Level1.vue 包含子组件 Level2.vue， 子组件 Level2.vue 包含孙子组件 Level3.vue  
- Level1.vue 向 Level2.vue 传递 a、b、c、getA、getB、getC  
- Level2.vue 向 Level3.vue 传递 x、y、z、getX、getY、getZ  

【解释：】

- Level1 向 Level2 传递的属性 a、b、c, 可以在 Level2 页面中通过 props: ['a'] 获取，  
- Level1 向 Level2 传递的方法 getA、getB、getC, 可以在 Level2 页面中通过 emits: ['getA'] 获取，  
- Level1 向 Level2 传递的属性和方法（a、b、c、getA、getB、getC），没有通过 props（a）、emits（getA） 接收的，可以在 Level2 页面中通过 $attrs 获取到（b、c、getB、getC），  
- 如果 Level2 想把父组件 Level1 给它传递的属性和方法再传递给孙子组件 Level3 ，可以在 Level2 组件上添加 v-bind="$attrs" 属性  

Level1.vue

```html
<template>
  <p>Level1</p>
  <Level2
    :a="a"
    :b="b"
    :c="c"
    @getA="getA"
    @getB="getb"
    @getC="getC"
  ></Level2>
</template>

<script>
import Level2 from './Level2'

export default {
  name: 'Level1',
  components: { Level2 },
  data() {
    return {
      a: "aaa",
      b: "bbb",
      c: "ccc"
    },
  },
  methods: {
    getA() {
      return this.a
    },
    getB() {
      return this.b
    },
    getC() {
      return this.c
    },
  }
}
</script>
```

Level2.vue

```html
<template>
  <p>Level2</p>
  <Level3
    :x="x"
    :y="y"
    :z="z"
    @getX="getX"
    @getY="getY"
    @getZ="getZ"
    v-bind="$attrs"
  ></Level3>
</template>

<script>
import Level2 from './Level2'

export default {
  name: 'Level2',
  components: { Level3 },
  props: ['a'],
  emits: ['getA']
  data() {
    return {
      x: "xxx",
      y: "yyy",
      z: "zzz"
    },
    methods: {
      getX() {
        return this.x
      },
      getY() {
        return this.y
      },
      getZ() {
        return this.z
      },
    },
    created() {
      console.log(this.$attrs)  // Proxy{ b:"bbb", c:"ccc", onGetB: f, onGetC: f  }
    },
  }
}
</script>
```

父组件 Level1.vue 向子组件 Level2.vue 传递，如果子组件 Level2.vue 里面  props: ['a'], emits: ['getA'] 没有接收，那么其他属性和方法就会被 this.$attrs 捕获到。

Level2.vue 中 v-bind="$attrs" 可以把 b、c、onGetB、onGetC 再次传递给子组件 Level3.vue

Level3.vue

```html
<template>
  <p>Level3</p>
</template>

<script>

export default {
  name: 'Level3',
  props: ['x'],
  emits: ['getX']
  data() {
    return {
    },
  },
  created() {
    console.log(this.$attrs)  // Proxy{ y:"yyy", z:"zzz", onGetY: f, onGetZ: f  }
  },
}
</script>
```

## $parent

`子组件通过 this.$parent 可以获取父组件上的属性和方法`

也是以上 Level3.vue 页面获取父组件 Level2.vue

Level3.vue

```html
<template>
  <p>Level3</p>
</template>

<script>

export default {
  name: 'Level3',
  props: ['x'],
  emits: ['getX']
  data() {
    return {
    },
  },
  created() {
      console.log(this.$attrs)  // Proxy{ y:"yyy", z:"zzz", onGetY: f, onGetZ: f  }
    },
  mounted() {
    console.log(this.$parent);
    console.log(this.$parent.x);
    console.log(this.$parent.getX);
  }
}
</script>
```
## $refs

`父组件通过 this.$refs 可以获取子组件上的属性和方法`

父组件 Level3.vue 获取子组件 HelloWorld.vue 上的属性和方法

注意点：$parent 和 $refs 需要在 mounted方法上用， 而不是 created 方法上用。

Level3.vue

```html
<template>
  <p>Level3</p>
  <HelloWorld msg="hello pyy" ref="hello1"></HelloWorld>
</template>

<script>
import HelloWorld from './HelloWorld'
export default {
  name: 'Level3',
  components: { HelloWorld },
  props: ['x'],
  emits: ['getX']
  data() {
    return {
    },
  },
  mounted() {
    console.log(this.$refs.hello1);
    console.log(this.$refs.hello1.name);
  }
}
</script>
```

HelloWorld.vue

```html
<template>
  <p>{{ msg }}</p>
</template>

<script>

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      name: 'hello-world'
    }
  }
}
</script>
```

# 多层级通讯 provide/inject

上级 provide 传递，下级 inject 接收

`上级组件通过 provide: {info: "xxx"} 定义，下级可以通过 inject: ['info'] 获取上级传递下来的信息。`

示例: 父组件 Level1 包含子组件 Level2,子组件 Level2 包含孙组件 Level3

Level1.vue

```html
<template>
  <p>Level1</p>
  <input v-model="name">
  <Level2></Level2>
</template>

<script>
import { computed } from 'vue'
import Level2 from "./Level2"
export default {
  name: 'Level1',
  components: { Level2 },
  data() {
    return {
      name: 'pyy'
    },
  },
  // 传递静态数据
  // provide: {
  //   info: 'aaa'
  // },
  // 用函数的方式传递响应式的数据
  provide() {
    return {
      info: computed(() => this.name)
    }
  }
}
</script>
```
Level2.vue

```html
<template>
  <p>Level2 {{info}}</p>
  <Level3></Level3>
</template>

<script>
import Level3 from "./Level3"
export default {
  name: 'Level2',
  components: { Level3 },
  inject: ['info']
}
</script>
```

Level3.vue

```html
<template>
  <p>Level3</p>
</template>

<script>
export default {
  name: 'Level3',
  inject: ['info']
}
</script>
```

# 全局组件之间传值，通过 event-emitter

小项目少页面用 event-emitter，大项目多页面使用 vuex

示例：childA向childB发送数据

components
  - eventBus.js
  - childA.vue
  - childB.vue

Vue3 中的 eventBus.js

```js
// Vue2 new Vue() 就是 event
// Vue3 引入第三方的自定义事件
import ee from 'event-emitter';
const event = ee();
export default event;
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
			eventBus.emit('eventFromA', '小弟好')
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
  methods: {
    showMsg(msg) {
      console.log(msg)
    }
  },
	created() {
		eventBus.on('eventFromA', this.showMsg)
	},
  beforeUnmount() {
    eventBus.off('eventFromA', this.showMsg)
  }
}
</script>
```

# 更多-more
