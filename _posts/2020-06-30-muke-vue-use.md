---
layout: post
title: 慕课网-前端框架及项目面试 聚焦Vue/React/Webpack - 第3章 Vue 使用
tags:
- Interview
- imooc
- vue
categories: Framework
description: 慕课网-前端框架及项目面试 聚焦Vue/React/Webpack - 第3章 Vue 使用
---

[https://cn.vuejs.org/](https://cn.vuejs.org/)


# 第1章 课程导学


- 一面：基础知识  
    - JS基础知识，
    - 框架基本使用
- 二面：高级特性+原理  
    - 框架高级特性
    - 框架原理
- 三面：设计+经验  
    - 项目设计能力
    - 工作经验和环境


# 第2章 课程介绍-introduction

## vue 面试题

- v-show 和 v-if 的区别  
- 为何 v-for 中要用 key  
- 描述 Vue 组件生命周期（有父子组件的情况）  
- Vue 组件如何通信  
- 描述组件渲染和更新的过程（原理）  
- 双向数据绑定 v-model 的实现原理  

## React 面试题

- react 组件如何通讯  
- JSX 本质是什么  
- context 是什么，有何用途？  
- shouldComponentUpdate 的用途  
- 描述 redux 单项数据流  
- setState 是同步还是异步？（场景图）  


## 框架综合应用use

- 基于 React 设计一个 todolist (组件结构，redux state 数据结构)
- 基于 Vue 设计一个购物车 （组件结构，vuex state 数据结构）

## webpack 面试题

- 前端代码为何要进行构建和打包  
- module、chunk、bundle 分别什么意思，有何区别  
- loader 和 plugin 的 区别  
- webpack 如何实现懒加载  
- webpack 常见性能优化  
- babel-runtime 和 babel-polyfill 的区别  

## how 如何应对上述面试题

框架的使用（基本使用，高级特性，周边插件）    
框架的原理（基本原理的了解，热门技术的深度，全面性）  
框架的实际应用，即设计能力（组件结构，数据结构）    

# 第3章 Vue 基本使用


## vue 使用-考点串讲 

- 基本使用，组件使用 - 常用，必须会  
- 高级特性 - 不常用，但体现深度  
- Vuex 和 Vue-router 使用  

## vue基本使用

日常使用，必须掌握，面试必考（不一定全考）  
梳理知识点，从冗长的文档中摘出考点和重点  
考察形式不限（参考后面的面试真题），但都在范围之内  

**指令、插值**

- 插值、表达式  
- 指令、动态属性  
- v-html :会有 XSS 风险，会覆盖子组件  

**computed 和 watch**

- computed  有缓存，data 不变则不会重新计算  
- watch 如何深度监听？  
- watch 监听引用类型，拿不到 oldValue  

### computed VS watch

✦ computed 用来监控自己定义的变量，该变量`不在 data 里面声明`，直接在computed里面定义，然后就可以在页面上进行双向数据绑定展示出结果或者用作其他处理；

✦ watch 主要用于监控 vue 实例的变化，它监控的变量当然必须`在 data 或者 props 里面声明`才可以，它可以监控一个变量，也可以是一个对象

✤ computed 擅长处理的场景：`一个数据受多个数据影响` ，某个属性的值需要来自多个属性的简单计算或者复杂逻辑计算得出的值时, （比如购物车计算总价，过滤某些数据）。

✤ watch 擅长处理的场景：`一个数据影响多个数据`（比如：浏览器自适应、监控路由对象、监控自身属性变化，input 输入框的值特殊处理等等），监听某个数据的变化（监听完调用什么函数） 。


[计算属性 vs Methods](https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7-vs-Methods)


*watch 深度监听*

```html
<template>
    <div>
        <input v-model="name"/>
        <input v-model="info.city"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '双越',
            info: {
                city: '北京'
            }
        }
    },
    watch: {
        name(oldVal, val) {
            console.log('watch name', oldVal, val) // 值类型，可正常拿到 oldVal 和 val
        },
        info: {
            handler(oldVal, val) {
                console.log('watch info', oldVal, val) // 引用类型，拿不到 oldVal 。因为指针相同，此时已经指向了新的 val
            },
            deep: true // 深度监听
        }
    }
}
</script>
```

**class 和 style**

- 使用动态属性    
- 使用驼峰式写法

**条件渲染**

- v-if v-else 的用法，可以使用变量，也可以使用 === 表达式  
- v-if 和 v-show 的区别  
- v-if 和 v-show 的使用场景  


## vue基本知识点串讲-part2

**循环（列表）渲染**

- 如何遍历对象？--也可以用v-for
- key 的重要性。key 不能乱写（如 random 或者 index）
- v-for 和 v-if 不能一起使用！

```html
<template>
    <div>
        <p>遍历数组</p>
        <ul>
            <li v-for="(item, index) in listArr" :key="item.id">
                {{index}} - {{item.id}} - {{item.title}}
            </li>
        </ul>

        <p>遍历对象</p>
        <ul >
            <li v-for="(val, key, index) in listObj" :key="key">
                {{index}} - {{key}} -  {{val.title}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            flag: false,
            listArr: [
                { id: 'a', title: '标题1' }, // 数据结构中，最好有 id ，方便使用 key
                { id: 'b', title: '标题2' },
                { id: 'c', title: '标题3' }
            ],
            listObj: {
                a: { title: '标题1' },
                b: { title: '标题2' },
                c: { title: '标题3' },
            }
        }
    }
}
</script>
```

**事件**

- event 参数，自定义参数    
- 事件修饰符，按键修饰符   
- 【观察】事件被绑定到哪里？

```html
<template>
    <div>
        <p>{{num}}</p>
        <button @click="increment1">+1</button>
        <button @click="increment2(2, $event)">+2</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            num: 0
        }
    },
    methods: {
        increment1(event) {
            console.log('event', event, event.__proto__.constructor) // 是原生的 event 对象
            console.log(event.target)
            console.log(event.currentTarget) // 注意，事件是被注册到当前元素的，和 React 不一样
            this.num++

            // 1. event 是原生的
            // 2. 事件被挂载到当前元素
            // 和 DOM 事件一样
        },
        increment2(val, event) {
            console.log(event.target)
            this.num = this.num + val
        },
        loadHandler() {
            // do some thing
        }
    },
    mounted() {
        window.addEventListener('load', this.loadHandler)
    },
    beforeDestroy() {
        //【注意】用 vue 绑定的事件，组建销毁时会自动被解绑
        // 自己绑定的事件，需要自己销毁！！！
        window.removeEventListener('load', this.loadHandler)
    }
}
</script>
```

**表单**

- v-model  
- 常见表单项 textarea 、checkbox 、radio、select  
- 修饰符 lazy、number、trim

## vue父子组件如何通讯

- props 和 $emit  
- 组件间通讯 - 自定义事件  
- 组件生命周期  

**props 和 $emit**

### todoList示例

index.vue

```html
<template>
    <div>
        <Input @add="addHandler"/>
        <List :list="list" @delete="deleteHandler"/>
    </div>
</template>

<script>
import Input from './Input'
import List from './List'

export default {
    components: {
        Input,
        List
    },
    data() {
        return {
            list: [
                {
                    id: 'id-1',
                    title: '标题1'
                },
                {
                    id: 'id-2',
                    title: '标题2'
                }
            ]
        }
    },
    methods: {
        addHandler(title) {
            this.list.push({
                id: `id-${Date.now()}`,
                title
            })
        },
        deleteHandler(id) {
            this.list = this.list.filter(item => item.id !== id)
        }
    },
    created() {
        console.log('index created')
    },
    mounted() {
        console.log('index mounted')
    },
    beforeUpdate() {
        console.log('index before update')
    },
    updated() {
        console.log('index updated')
    },
}
</script>
```

Input.vue

```html
<template>
    <div>
        <input type="text" v-model="title"/>
        <button @click="addTitle">add</button>
    </div>
</template>

<script>
import event from './event'

export default {
    data() {
        return {
            title: ''
        }
    },
    methods: {
        addTitle() {
            // 调用父组件的事件
            this.$emit('add', this.title)

            // 调用自定义事件
            event.$emit('onAddTitle', this.title)

            this.title = ''
        }
    }
}
</script>
```

List.vue

```html
<template>
    <div>
        <ul>
            <li v-for="item in list" :key="item.id">
                {{item.title}}

                <button @click="deleteItem(item.id)">删除</button>
            </li>
        </ul>
    </div>
</template>

<script>
import event from './event'

export default {
    // props: ['list']
    props: {
        // prop 类型和默认值
        list: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {

        }
    },
    methods: {
        deleteItem(id) {
            this.$emit('delete', id)
        },
        addTitleHandler(title) {
            console.log('on add title', title)
        }
    },
    created() {
        console.log('list created')
    },
    mounted() {
        console.log('list mounted')

        // 绑定自定义事件
        event.$on('onAddTitle', this.addTitleHandler)
    },
    beforeUpdate() {
        console.log('list before update')
    },
    updated() {
        console.log('list updated')
    },
    beforeDestroy() {
        // 及时销毁，否则可能造成内存泄露
        event.$off('onAddTitle', this.addTitleHandler)
    }
}
</script>
```

## 如何用自定义事件进行vue组件通讯

```html
import Vue from 'vue'

export default new Vue()
```

以下的 event 是指上述的 new Vue()

```html
import event from './event'
...
// 调用父组件的事件
this.$emit('add', this.title)

// 调用自定义事件
event.$emit('onAddTitle', this.title)
```

这里注意调用父组件事件和调用自定义组件写法 `this.$emit` 和 `event.$emit`

```html
// 绑定自定义事件
event.$on('onAddTitle', this.addTitleHandler)
```

```html
beforeDestroy() {
   // 及时销毁，否则可能造成内存泄露
   event.$off('onAddTitle', this.addTitleHandler)
}
```

## vue父子组件生命周期调用顺序

生命周期（单个组件）

- 挂载阶段  
- 更新阶段  
- 销毁阶段

父组件 index 组件  
子组件 List 组件

index.vue

```js
export default {
    components: {
        List
    },
    created() {
        // eslint-disable-next-line
        console.log('index created')
    },
    mounted() {
        // eslint-disable-next-line
        console.log('index mounted')
    },
    beforeUpdate() {
        // eslint-disable-next-line
        console.log('index before update')
    },
    updated() {
        // eslint-disable-next-line
        console.log('index updated')
    },
}
```

List.vue

```js
export default {
    ....
    created() {
        // eslint-disable-next-line
        console.log('list created')
    },
    mounted() {
        // eslint-disable-next-line
        console.log('list mounted')

        // 绑定自定义事件
        event.$on('onAddTitle', this.addTitleHandler)
    },
    beforeUpdate() {
        // eslint-disable-next-line
        console.log('list before update')
    },
    updated() {
        // eslint-disable-next-line
        console.log('list updated')
    },
    beforeDestroy() {
        // 及时销毁，否则可能造成内存泄露
        event.$off('onAddTitle', this.addTitleHandler)
    }
}
```

页面初始化的时候，父子组件生命周期执行顺序

```shell
index created
list created
list mounted
index mounted
```

updated 时候

```shell
index beforeUpdate
list beforeUpdate
list updated
index updated
```

# vue 高级特性

- 不是每个都很常用，但用到的时候必须要知道  
- 考察候选人对Vue的掌握是否全面，且有深度  
- 考察做过的项目是否有深度和复杂度（至少能用到高级特性）    

**vue高级特性**

- 自定义 v-model  
- $nextTick  
- slot  
- 动态、异步组件  
- keep-alive  
- mixin  

## vue 如何自己实现 v-model

```html
<template>
    <div>
        <!-- 自定义 v-model -->
        <p>{{name}}</p>
        <CustomVModel v-model="name"/> 
    </div>
</template>

<script>
import CustomVModel from './CustomVModel'

export default {
    components: {
        CustomVModel
    },
    data() {
        return {
            name: '双越'
        }
    }
}
</script>
```

CustomVModel.vue

```html
<template>
    <!-- 例如：vue 颜色选择 -->
    <input type="text"
        :value="text1"
        @input="$emit('change1', $event.target.value)"
    >
    <!--
        1. 上面的 input 使用了 :value 而不是 v-model
        2. 上面的 change1 和 model.event1 要对应起来
        3. text1 属性对应起来
    -->
</template>

<script>
export default {
    model: {
        prop: 'text1', // 对应 props text1
        event: 'change1'
    },
    props: {
        text1: String,
        default() {
            return ''
        }
    }
}
</script>
```

## $nextTick-vue组件更新之后如何获取最新DOM

- Vue 是异步渲染  
- data 改变之后，DOM 不会立刻渲染  
- $nextTick 会在 DOM 渲染之后被触发，以获取最新 DOM 节点  

NextTick.vue

```html
<template>
  <div id="app">
    <ul ref="ul1">
        <li v-for="(item, index) in list" :key="index">
            {{item}}
        </li>
    </ul>
    <button @click="addItem">添加一项</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
      return {
        list: ['a', 'b', 'c']
      }
  },
  methods: {
    addItem() {
        this.list.push(`${Date.now()}`)
        this.list.push(`${Date.now()}`)
        this.list.push(`${Date.now()}`)

        // 1. 异步渲染，$nextTick 待 DOM 渲染完再回调
        // 2. 页面渲染时会将 data 的修改做整合，多次 data 修改只会渲染一次
        this.$nextTick(() => {
          // 获取 DOM 元素
          const ulElem = this.$refs.ul1
          console.log( ulElem.childNodes.length )
        })
    }
  }
}
</script>
```

以上若是不加  this.$nextTick 拿到的元素子节点是 list.push 之前的，

## slot

- 基本使用  
- 作用域插槽  
- 具名插槽  


### slot demo

父组件

```html
<template>
    <div>
        <!-- slot -->
        <SlotDemo :url="website.url">
            {{website.title}}
        </SlotDemo>
    </div>
</template>

<script>
import SlotDemo from './SlotDemo'

export default {
    components: {
        SlotDemo,
    },
    data() {
        return {
            website: {
                url: 'http://imooc.com/',
                title: 'imooc',
                subTitle: '程序员的梦工厂'
            },
        }
    }
}
</script>
```

子组件

```html
<template>
    <a :href="url">
        <slot>
            默认内容，即父组件没设置内容时，这里显示
        </slot>
    </a>
</template>

<script>
export default {
    props: ['url'],
    data() {
        return {}
    }
}
</script>
```

### 作用域插槽 demo

父组件

```html
<template>
    <div>
        <!-- slot -->
        <ScopedSlotDemo :url="website.url">
            <template v-slot="slotProps">
                {{slotProps.slotData.title}}
            </template>
        </ScopedSlotDemo>
    </div>
</template>

<script>
import ScopedSlotDemo from './ScopedSlotDemo'

export default {
    components: {
        ScopedSlotDemo,
    },
    data() {
        return {
            website: {
                url: 'http://imooc.com/',
                title: 'imooc',
                subTitle: '程序员的梦工厂'
            },
        }
    }
}
</script>
```

### 在VUE中你使用slot插槽的理由是什么

slot适用的场景是那些可以将多个组件看做一个整体，这个整体会被复用。但其中的一些部分内容不固定。

首先和v-bind最大的不同是v-bind只能绑定数据，而slot可以传入数据、HTML结构甚至是组件。 其次使用v-bind绑定的数据渲染出的DOM结构固定，而slot的内容类似于fragement可以接收任意内容

另外，一个模态框经常作为一个整体被多次复用，这个模态框中包含类似于关闭按钮、确认取消按钮等组件，但同时也包含一些不固定的内容。比如中间的展示区可以是一个UL LI列表、表格、表单、图片甚至是引入另外一个组件。那么，这个不固定的内容就可以用slot实现。

slot 使用场景：模态框、按钮


## vue 动态组件是什么

- :is="component-name" 用法  
- 需要根据数据，动态渲染的场景。即组件类型不确定


```html
<template>
    <div>
        <!-- 动态组件 -->
        <component :is="NextTickName"/>
       
    </div>
</template>

<script>
import NextTick from './NextTick'

export default {
    components: {
        NextTick
    },
    data() {
        return {
            NextTickName: "NextTick"
        }
    }
}
</script>
```

## vue 如何异步加载组件

- import() 函数  
- 按需加载，异步加载大文件  

```html
<template>
    <div>
        <!-- 异步组件 -->
        <FormDemo v-if="showFormDemo"/>
        <button @click="showFormDemo = true">show form demo</button>
    </div>
</template>

<script>
import MixinDemo from './MixinDemo' 

export default {
    components: {
        FormDemo: () => import('../BaseUse/FormDemo'),  // 异步引入
        FormDemo2: () => {
            return import('../BaseUse/FormDemo2')  // 同上，写法不同
        },
        MixinDemo // 这是同步引入
    },
    data() {
        return {
        }
    }
}
</script>
```

## keep-alive vue 如何缓存组件

**keep-alive**

- 缓存组件  
- 频繁切换，不需要重复渲染  
- Vue 常见性能优化


```html
<template>
    <div>
        <button @click="changeState('A')">A</button>
        <button @click="changeState('B')">B</button>
        <button @click="changeState('C')">C</button>

        <keep-alive> <!-- tab 切换 -->
            <KeepAliveStageA v-if="state === 'A'"/> <!-- v-show -->
            <KeepAliveStageB v-if="state === 'B'"/>
            <KeepAliveStageC v-if="state === 'C'"/>
        </keep-alive>
    </div>
</template>

<script>
import KeepAliveStageA from './KeepAliveStateA'
import KeepAliveStageB from './KeepAliveStateB'
import KeepAliveStageC from './KeepAliveStateC'

export default {
    components: {
        KeepAliveStageA,
        KeepAliveStageB,
        KeepAliveStageC
    },
    data() {
        return {
            state: 'A'
        }
    },
    methods: {
        changeState(state) {
            this.state = state
        }
    }
}
</script>
```

KeepAliveStageA.vue

```html
<template>
    <p>state A</p>
</template>

<script>
export default {
    mounted() {
        console.log('A mounted')
    },
    destroyed() {
        console.log('A destroyed')
    }
}
</script>
```

因为 Keep-alive 会将组件保存在内存中，并不会销毁以及重新创建，所以不会重新调用组件的created等方法 

keep-alive 控制显示隐藏是 vue 层级的，
v-show 是 css 层级

## mixin - vue组件如何抽离公共逻辑

mixin

- 多个组件有相同的逻辑，抽离出来  
- mixin 并不是完美的解决方案，会有一些问题  
- Vue3 提出的 Composition API 旨在解决这些问题

MixinDemo.vue

```html
<template>
    <div>
        <p>{{name}} {{major}} {{city}}</p>
        <button @click="showName">显示姓名</button>
    </div>
</template>

<script>
import myMixin from './mixin'

export default {
    mixins: [myMixin], // 可以添加多个，会自动合并起来
    data() {
        return {
            name: '双越',
            major: 'web 前端'
        }
    },
    methods: {
    },
    mounted() {
        console.log('component mounted', this.name)
    }
}
</script>
```

mixin.js

```js
export default {
    data() {
        return {
            city: '北京'
        }
    },
    methods: {
        showName() {
            console.log(this.name)
        }
    },
    mounted() {
        console.log('mixin mounted', this.name)
    }
}

```

**mixin 缺点**

- 变量来源不明确，不利于阅读  
- 多个 mixin ，可能会造成命名冲突  
- mixin 和组件可能会出现多对多的关系，复杂度较高

## vuex 知识点串讲

- 面试考点并不多  
- 但基本概念、基本使用和API必须要掌握  
- 可能会考察 state 的数据结构设计


**vuex 基本概念**

- state  
- getters  
- action  
- mutation


**用于 Vue组件**

- dispatch  
- commit  
- mapState  
- mapGetters  
- mapActions  
- mapMutations

## vue-router 知识点串讲

Vue-router 使用

- 面试考点并不多  
- 路由模式（hash、H5 history）  
- 路由配置（动态路由、懒加载）

Vue-router 路由模式

- hash 模式（默认），如 http://abc.com/#/user/10  
- H5 history 模式，如 http://abc.com/user/10    
- H5 模式需要server 端支持，因此无特殊需求可选择前者




