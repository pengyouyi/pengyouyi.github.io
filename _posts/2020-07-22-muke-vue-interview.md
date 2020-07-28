---
layout: post
title: 慕课网-前端框架及项目面试 聚焦Vue/React/Webpack - 第5章 面试真题演练
tags:
- Interview
- imooc
- vue
categories: Framework
description: 慕课网-前端框架及项目面试 聚焦Vue/React/Webpack - 第5章 面试真题演练
---

[https://cn.vuejs.org/](https://cn.vuejs.org/)


# **v-show 和 v-if 的区别**

- v-show 通过 css display 控制显示和隐藏  
- v-if 组件真正的渲染和销毁，而不是显示和隐藏  
- 频繁切换显示状态用 v-show，否则用 v-if  

# **为何在 v-for 中用 key**

- 必须用 key,且不能是 index 和 random  
- diff 算法中 通过 tag 和 key 来判断，是否是 sameNode  
- 减少渲染次数，提升渲染性能  

# **描述 Vue 组件生命周期（父子组件）**

- 单组件生命周期图  
- 父子组件生命周期关系  

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

# **Vue 组件如何通讯（常见）**

- 父子组件 props 和 this.$emit  
- 自定义事件 `event.$on` | `event.$off`  | `event.$emit`  
- vuex  

# **双向数据绑定 v-model 的实现原理**

- input 元素的 value = this.name  
- 绑定 input 事件 this.name = $event.target.value  
-  data 更新触发 re-render

# **对 MVVM 的理解**

![http://pengyouyi.site/assets/images/2016/7-8-9/9-21-7.png](http://pengyouyi.site/assets/images/2016/7-8-9/9-21-7.png)

# **computed 有何特点**

- 缓存，data 不变不会重新计算  
- 提高性能  

# **为何组件 data 必须是一个函数**

定义的组件 `export default { data(){} }` 是一个 Class，组件被引用的时候，组件实例化，data不是函数的话会造成数据共享

# **ajax 请求应该放在哪个生命周期**

- mounted  
- JS 是单线程的；ajax 异步获取数据，不会影响页面的渲染  
- 放在 mounted 之前没有用，vue 逻辑走完才能走 ajax 的回调  

另外一种观点：

- 接口不复杂会放 created 里面,接口多复杂的话会放在 mounted 里面.  
- created 和 mounted一般相差多少毫秒？这点延迟用户是否能感知到？  
- 官方也没有强制说明绑定在哪里。  

# **如何将组件所有 props 传递给子组件 ？**

- $props  
- `<User v-bind="$props" />`  
- 细节知识点，优先级不高  

# **如何自己实现 v-model**

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


# **多个组件有相同的逻辑，how如何抽离？**

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


# **when何时使用异步组件？** 

- import() 函数  
- 路由异步加载 
- 按需加载，异步加载大文件（如:编辑器、图表） 

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
            return import('../BaseUse/FormDemo2')
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


# **何时需要使用 keep-alive ?**

- 缓存组件,不需要重复渲染  
- 频繁切换, 如多个静态 tab 页的切换  
- 可以优化性能 


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

因为 Keep-alive 会将组件保存在内存中，并不会销毁以及重新创建，所以不会重新调用组件的 created 等方法 

keep-alive 控制显示隐藏是 vue 层级的，
v-show 是 css 层级

# **何时需要使用 beforeDestroy**

- 解绑自定义事件 event.$off  
- 清除定时器  
- 解绑自定义的 DOM 事件，如 window scroll 等  

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

# **Vuex 中 action 和 mutation 有何区别**

- action 中处理异步，mutation 不可以  
- mutation 做原子操作（每次做一个操作）  
- action 可以整合多个 mutation  

# **Vue-router 常用的路由模式**

- hash 默认  
- H5 history （需要服务端支持）  
- hash - window.onhashchange  
- H5 history - history.pushState 和 window.onpopsate  

# **如何配置 Vue-router 异步加载**

动态 import()

# **请用 vnode 描述一个 DOM 结构**

```html
<div id="div1" class="container">
	<p>vdom</p>
	<ul style="font-size:20px">
		<li>a</li>
	</ul>
</div>
```

```js
{
    tag: 'div',
    props: {
        className: 'container',
        id: 'div1'
    },
    children: [
        {
            tag: 'p',
            children: 'vdom'

        },
        {
            tag: 'ul',
            props: { style: 'font-size: 20px'},
            children: [
                {
                    tag: 'li',
                    children: 'a'
                },
                // ...
            ]

        }
    ]
}
```

# **监听 data 变化的核心 API**

- Object.defineProperty  
- 以及深度监听、监听数组  
- 有何缺点  

**Object.defineProperty 基本用法**

```js
const data = {}
const name = 'zhangsan'
Object.defineProperty(data, 'name', {
    get: function() {
        console.log('get')
        return name
    },
    set: function(newVal) {
        console.log('set')
        name = newVal
    }
})

// 测试
console.log(data.name) // get zhangsan
data.name = 'lisi' // set
```

**监听 data 变化 - 简版**

```js
// 触发更新视图
function updateView() {
    console.log('视图更新')
}

// 重新定义属性，监听起来
function defineReactive(target, key, value) {

    // 核心 API
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newValue) {
            if (newValue !== value) {

                // 设置新值
                // 注意，value 一直在闭包中，此处设置完之后，再 get 时也是会获取最新的值
                value = newValue

                // 触发更新视图
                updateView()
            }
        }
    })
}

// 监听对象属性
function observer(target) {
    if (typeof target !== 'object' || target === null) {
        // 不是对象或数组
        return target
    }

    // 重新定义各个属性（for in 也可以遍历数组）
    for (let key in target) {
        defineReactive(target, key, target[key])
    }
}

// 准备数据
const data = {
    name: 'zhangsan',
    age: 20,
}

// 监听数据
observer(data)

// 测试
data.name = 'lisi'
data.age = 21
console.log('age', data.age)
```

**监听 data 变化 - 深度监听**

```js
// 触发更新视图
function updateView() {
    console.log('视图更新')
}

// 重新定义属性，监听起来
function defineReactive(target, key, value) {
    // 深度监听
    observer(value)
    // 核心 API
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newValue) {
            if (newValue !== value) {
                // 深度监听
                observer(newValue)
                // 设置新值
                // 注意，value 一直在闭包中，此处设置完之后，再 get 时也是会获取最新的值
                value = newValue

                // 触发更新视图
                updateView()
            }
        }
    })
}

// 监听对象属性
function observer(target) {
    if (typeof target !== 'object' || target === null) {
        // 不是对象或数组
        return target
    }

    // 重新定义各个属性（for in 也可以遍历数组）
    for (let key in target) {
        defineReactive(target, key, target[key])
    }
}

// 准备数据
const data = {
    name: 'zhangsan',
    age: 20,
    info: {
        address: '北京' // 需要深度监听
    },
}

// 监听数据
observer(data)

// 测试
data.info.address = '上海' // 深度监听
data.age = {num: 22}  // set 的时候也需要深度监听 newVal
data.age.num = 24

// data.x = '100' // 新增属性，监听不到 —— 所以有 Vue.set
// delete data.name // 删除属性，监听不到 —— 所有已 Vue.delete
```

**Object.defineProperty 缺点**

- 深度监听，需要递归到底，一次性计算量大  
- 无法监听新增属性/删除属性 （Vue.set Vue.delete）  
- 无法原生监听数组，需要特殊处理  

# **Vue 如何监听数组变化**

- Object.defineProperty 不能监听数组变化  
- 重新定义原型，重写 push pop 等方法，实现监听    
- proxy 可以原生支持监听数组变化  

```js
// 触发更新视图
function updateView() {
    console.log('视图更新')
}

// 重新定义数组原型
const oldArrayProperty = Array.prototype
// 创建新对象，原型指向 oldArrayProperty ，再扩展新的方法不会影响原型
const arrProto = Object.create(oldArrayProperty);
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName => {
    arrProto[methodName] = function () {
        updateView() // 触发视图更新
        oldArrayProperty[methodName].call(this, ...arguments)
        // Array.prototype.push.call(this, ...arguments)  ，同上
    }
})

// 重新定义属性，监听起来
function defineReactive(target, key, value) {
    // 深度监听
    observer(value)

    // 核心 API
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newValue) {
            if (newValue !== value) {
                // 深度监听
                observer(newValue)

                // 设置新值
                // 注意，value 一直在闭包中，此处设置完之后，再 get 时也是会获取最新的值
                value = newValue

                // 触发更新视图
                updateView()
            }
        }
    })
}

// 监听对象属性
function observer(target) {
    if (typeof target !== 'object' || target === null) {
        // 不是对象或数组
        return target
    }

    // 污染全局的 Array 原型
    // Array.prototype.push = function () {
    //     updateView()
    //     ...
    // }
    
    // 监听数组
    if (Array.isArray(target)) {
        target.__proto__ = arrProto
    }

    // 重新定义各个属性（for in 也可以遍历数组）
    for (let key in target) {
        defineReactive(target, key, target[key])
    }
}

// 准备数据
const data = {
    name: 'zhangsan',
    age: 20,
    info: {
        address: '北京' // 需要深度监听
    },
    nums: [10, 20, 30]
}

// 监听数据
observer(data)

// 测试
// data.name = 'lisi'
// data.age = 21
// console.log('age', data.age)
// data.x = '100' // 新增属性，监听不到 —— 所以有 Vue.set
// delete data.name // 删除属性，监听不到 —— 所有已 Vue.delete
// data.info.address = '上海' // 深度监听
data.nums.push(4) // 监听数组
```


# **please请描述响应式原理**

- 监听 data 变化  
- 组件渲染和更新的流程  

**初次渲染过程**

❶ 解析模板为 render 函数（或在开发环境已完成，vue-loader）  
❷ 触发响应式，监听 data 属性 getter setter  
❸ 执行 render 函数，生成 vnode，  
❹ patch(elem, vnode)  

**更新过程**

❺ 修改 data,触发 setter （此前在 getter 中已被监听）  
❻ 重新执行 render 函数，生成 newVnode  
❼ patch(vnode, newVnode) 【diff 算法上场】

# **diff 算法的时间复杂度**

- O(n)  
- 在 O(n^3) 基础上做了一些调整  

# **简述 diff 算法过程**
 
- patch(elem,vnode) 和 patch(vnode,newVnode)  
- patchVnode 和 addVnodes 和 removeVnodes  
- updateChildren (key 的重要性)  

# **Vue 为何是异步渲染， $nextTick 何用？**

- 异步渲染（以及合并 data 修改），以提高渲染性能  
- $nextTick 在 DOM 更新完之后，触发回调  

# **Vue 常见性能优化方式**

- 合理使用 v-show 和 v-if  
- 合理使用 computed  
- v-for 时加 key，以及避免和 v-if 同时使用  
- 自定义事件、DOM 事件及时销毁  
- 合理使用异步组件  
- 合理使用 keep-alive  
- data 层级不要太深  
- 使用 vue-loader 在开发环境做模板编译（预编译）  
- webpack 层面的优化  
- 前端通用的性能优化，如图片懒加载  
- 使用 SSR  
