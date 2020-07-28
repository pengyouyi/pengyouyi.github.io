---
layout: post
title: 慕课网-前端框架及项目面试 聚焦Vue/React/Webpack - 第4章 Vue 原理
tags:
- Interview
- imooc
- vue
categories: Framework
description: 慕课网-前端框架及项目面试 聚焦Vue/React/Webpack - 第4章 Vue 原理
---

[https://cn.vuejs.org/](https://cn.vuejs.org/)

**Vue 原理**

- 组件化  
- 响应式  
- vdom 和 diff  
- 模板编译  
- 渲染过程  
- 前端路由 

# MVVM & 组件化

如何理解MVVM

**组件化基础**

- “很久以前” 就有组件化  
- 数据驱动视图（MVVM，setState）  

**"很久以前" 的组件化**

- asp、jsp、php 已经有组件化了  
- nodejs 中也有类似的组件化  


**数据驱动视图**

- 传统组件，只是静态渲染，更新还要依赖于操作 DOM  
- 数据驱动视图 - Vue MVVM
- 数据驱动视图 - React setState

**Vue MVVM**

![http://pengyouyi.site/assets/images/2016/7-8-9/9-21-7.png](http://pengyouyi.site/assets/images/2016/7-8-9/9-21-7.png)

```html
<template>
    <div id="app">
        <p @click="changeName">{{name}}</p>
        <ul>
            <li v-for="(item, index) in list" :key="index">{{item}}</li>
        </ul>
        <button @click="addItem">添加一项</button>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            name: 'vue',
            list: ['a', 'b', 'c']
        }
    },
    methods: {
    	changeName() {
            this.name = 'youyi'
        },
        addItem() {
            this.list.push(`${Date.now()}`)
        }
    }
};
</script>
```

- M 就是数据，data里面的数据  
- V 是视图， template 模板渲染的  
- VM 包括 视图里定义的 click 事件，以及 methods 中的方法  

# 响应式 & Object.defineProperty

监听data变化的核心API是什么

**Vue 响应式**

- 组件 data 的数据一旦变化，立刻触发视图的更新  
- 实现数据驱动视图的第一步  
- 考察 Vue 原理的第一题  
- 核心 API - Object.defineProperty  
- 如何实现响应式，代码演示  
- Object.defineProperty 的一些缺点 （Vue 3.0 启用 Proxy）  


**Proxy 有兼容性问题**

- Proxy 兼容性不好，且无法 polyfill  
- Vue 2.x 还会存在一段时间，所以都得学  


## Object.defineProperty 基本用法

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

**Object.defineProperty 实现响应式**

- 监听对象，监听数组  
- 复杂对象，深度监听  
- 几个缺点  

## 如何深度监听data变化

### 监听 data 变化 - 简版

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

// 测试----------------------------
data.name = 'lisi'
data.age = 21
console.log('age', data.age)
```

### 监听 data 变化 - 深度监听

**递归**

```js
// 触发更新视图
function updateView() {
    console.log('视图更新')
}

// 重新定义属性，监听起来
function defineReactive(target, key, value) {
    // 深度监听 ！！！！！！！！！！！！！！！！！！
    observer(value)
    // 核心 API
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newValue) {
            if (newValue !== value) {
                // 深度监听  ！！！！！！！！！！！！！！！！！！
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

## Object.defineProperty 缺点

- 深度监听，需要递归到底，一次性计算量大  
- 无法监听新增属性/删除属性 （Vue.set Vue.delete）  
- 无法原生监听数组，需要特殊处理  

## vue如何监听数组变化

**重新定义数组原型**

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

# 虚拟 DOM & diff 算法

**虚拟DOM-面试里的网红**

- vdom 是实现 vue 和 React 的重要基石  
- diff 算法是 vdom 中最核心、最关键的部分  
- vdom 是一个热门话题，也是面试中的热门话题  

**为何会出现虚拟DOM**

- DOM 操作非常耗费性能  
- 以前用 jQuery ，可以自行控制 DOM 操作的时机，手动调整  
- Vue 和 React 是数据驱动视图，如何有效控制视图  

**解决方案 - vdom**

- 有了一定复杂度，想减少计算次数比较难  
- 能不能把计算，更多的转移为 JS 计算？ 因为 JS 执行速度很快  
- vdom - 用 JS 模拟 DOM 结构，计算出最小的变更，操作 DOM   


## 用 JS 模拟 DOM结构

```html
<div id="div1" class="container">
	<p>vdom</p>
	<ul style="font-size:20px">
		<li>a</li>
	</ul>
</div>
```

JS 模拟以上 DOM结构

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

**通过 snabbdom 学习 vdom**

- 简洁强大的 vdom 库易学易用  
- Vue 参考它实现 vdom 和 diff
- [https://github.com/snabbdom/snabbdom](https://github.com/snabbdom/snabbdom)  
- Vue 3.0 重写了 vdom 的代码，优化了性能  
- 但是 vdom 的基本理念不变，面试考点也不变  
- React vdom 具体实现和 Vue 也不同，但不妨碍统一学习  


## snabbdom example

```js
import { init } from 'snabbdom/init'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import { h } from 'snabbdom/h' // helper function for creating vnodes

var patch = init([ // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
])

var container = document.getElementById('container')

var vnode = h('div#container.two.classes', { on: { click: someFn } }, [
  h('span', { style: { fontWeight: 'bold' } }, 'This is bold'),
  ' and this is just normal text',
  h('a', { props: { href: '/foo' } }, 'I\'ll take you places!')
])
// Patch into empty DOM element – this modifies the DOM as a side effect
patch(container, vnode)

var newVnode = h('div#container.two.classes', { on: { click: anotherEventHandler } }, [
  h('span', { style: { fontWeight: 'normal', fontStyle: 'italic' } }, 'This is now italic type'),
  ' and this is still just normal text',
  h('a', { props: { href: '/bar' } }, 'I\'ll take you places!')
])
// Second `patch` invocation
patch(vnode, newVnode) // Snabbdom efficiently updates the old view to the new state
```

- h 函数生成 vnode  
- vnode 数据结构    
- patch 函数用法，初次渲染；dom再次更新

**VNode 本质上来说就是一个普通的JavaScript对象**

```js
export function h (sel: any, b?: any, c?: any): VNode {
  var data: VNodeData = {}, children: any, text: any, i: number;
  if (c !== undefined) {
    if (b !== null) { data = b; }
    if (is.array(c)) {
      children = c;
    } else if (is.primitive(c)) {
      text = c;
    } else if (c && c.sel) {
      children = [c];
    }
  } else if (b !== undefined && b !== null) {
    if (is.array(b)) {
      children = b;
    } else if (is.primitive(b)) {
      text = b;
    } else if (b && b.sel) {
      children = [b];
    } else { data = b; }
  }
  if (children !== undefined) {
    for (i = 0; i < children.length; ++i) {
      if (is.primitive(children[i])) children[i] = vnode(undefined, undefined, undefined, children[i], undefined);
    }
  }
  if (
    sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&
    (sel.length === 3 || sel[3] === '.' || sel[3] === '#')
  ) {
    addNS(data, children, sel);
  }

  // 返回 vnode
  return vnode(sel, data, children, text, undefined);
};

export function vnode (
  sel: string | undefined,
  data: any | undefined,
  children: Array<VNode | string> | undefined,
  text: string | undefined,
  elm: Element | Text | undefined): VNode {
  let key = data === undefined ? undefined : data.key;
  return { sel, data, children, text, elm, key };
}

export interface VNode {
  sel: string | undefined;
  data: VNodeData | undefined;
  children: Array<VNode | string> | undefined;
  elm: Node | undefined;
  text: string | undefined;
  key: Key | undefined;
}
```

**vdom 总结**

- 用 JS 模拟 DOM 结构（vnode）  
- 新旧 vdom 对比，得出最小的更新范围，最后更新 DOM  
- 数据驱动视图的模式下，有效控制 DOM 操作  

## diff算法

**diff算法重要性**

- diff 算法是 vdom 中最核心、最关键的部分  
- diff 算法能在日常使用 vue React 中体现出来（如 key）  
- diff 算法是前端热门话题，面试“宠儿”  

**diff算法概述**

- diff 即对比，是一个广泛的概念，如 linux diff 命令、git diff 等  
- 两个 js 对象也可以做 diff，[https://github.com/cujojs/jiff](https://github.com/cujojs/jiff)  
- 两棵树做 diff，如这里的 vdom diff


## diff 算法时间复杂度

**树 diff 的时间复杂度 O(n^3)**

- 第一，遍历 tree1 ; 第二，遍历 tree2  
- 第三，排序  
- 1000 个节点，要计算 1亿次，算法不可用  

**优化时间复杂度 O(n)**

- 只比较同一层级，不跨级比较  
- tag 不相同，则直接删除重建，不再深度比较  
- tag 和 key ，两者都相同，则认为是相同，不再深度比较  

## 深入diff算法源码-生成vnode

snabbdom - 源码解读

vdom 核心概念很重要： h、vnode、patch、diff、key 等。

vdom 存在的价值更加重要：数据驱动视图、控制 dom 操作


# 模板编译compiler

## 模板编译前置知识点-with语法

- 模板是 vue 开发中最常用的部分，即与使用相关的原理  
- 他不是 html ，有指令、插值、js 表达式，到底是什么？  
- 面试不会直接问，但是会通过“组件渲染和更新过程考察”  


**模板编译**

- 前置知识： JS 的 with 语法  
- vue template compiler 将模板编译成 Render 函数  
- 执行 Render 函数生成 vnode  

**with 语法**

```js
const obj = {a: 100, b: 200}

console.log(obj.a)
console.log(obj.b)
console.log(obj.c)  // undefined
```

```js
// 使用 with, 能改变 {} 内自由变量的查找方式
// 将{} 内自由变量，当做 obj 的属性来查找
with() {
    console.log(a)
    console.log(b)
    console.log(c) // 会报错！！！
}
```

- 改变 {} 内自由变量的查找规则，当做 obj 属性来查找  
- 如果找不到匹配的 obj 属性，就会报错  
- with 要慎用，它打破了作用域规则，易读性变差  


## vue模板被编译成什么

**模板编译**

- 模板不是 HTML，有指令、插值、js表达式，能实现循环、判断  
- HTML 是标签语言，只有 JS 才能实现判断、循环（图灵完备的）   
- 因此，模板一定时转换为某种 JS 代码，即模板编译                 

```js
const compiler = require('vue-template-compiler')

// 插值
const template = `<p>{{message}}</p>`
with(this){return createElement('p',[createTextVNode(toString(message))])}
// h -> vnode  !!!!!!!!!!!!!!!!!
// createElement -> vnode  !!!!!!!!!!!!!!!!!

// 表达式
const template = `<p>{{flag ? message : 'no message found'}}</p>`
with(this){return _c('p',[_v(_s(flag ? message : 'no message found'))])}

// 属性和动态属性
const template = `
    <div id="div1" class="container">
        <img :src="imgUrl"/>
    </div>
`
with(this){return _c('div',
     {staticClass:"container",attrs:{"id":"div1"}},
     [
         _c('img',{attrs:{"src":imgUrl}})])}

// 条件
const template = `
    <div>
        <p v-if="flag === 'a'">A</p>
        <p v-else>B</p>
    </div>
`
with(this){return _c('div',[(flag === 'a')?_c('p',[_v("A")]):_c('p',[_v("B")])])}

// 循环
const template = `
    <ul>
        <li v-for="item in list" :key="item.id">{{item.title}}</li>
    </ul>
`
with(this){return _c('ul',_l((list),function(item){return _c('li',{key:item.id},[_v(_s(item.title))])}),0)}

// 事件
const template = `
    <button @click="clickHandler">submit</button>
`
with(this){return _c('button',{on:{"click":clickHandler}},[_v("submit")])}

// v-model
const template = `<input type="text" v-model="name">`
// 主要看 input 事件
with(this){return _c('input',{directives:[{name:"model",rawName:"v-model",value:(name),expression:"name"}],attrs:{"type":"text"},domProps:{"value":(name)},on:{"input":function($event){if($event.target.composing)return;name=$event.target.value}}})}

// render 函数
// 返回 vnode
// patch

// 编译
const res = compiler.compile(template)
console.log(res.render)

// ---------------分割线--------------

// // 从 vue 源码中找到缩写函数的含义
// function installRenderHelpers (target) {
//     target._o = markOnce;
//     target._n = toNumber;
//     target._s = toString;
//     target._l = renderList;
//     target._t = renderSlot;
//     target._q = looseEqual;
//     target._i = looseIndexOf;
//     target._m = renderStatic;
//     target._f = resolveFilter;
//     target._k = checkKeyCodes;
//     target._b = bindObjectProps;
//     target._v = createTextVNode;
//     target._e = createEmptyVNode;
//     target._u = resolveScopedSlots;
//     target._g = bindObjectListeners;
//     target._d = bindDynamicKeys;
//     target._p = prependModifier;
// }
``` 

- `模板编译为 render 函数，执行 render 函数返回 vnode`  
- 基于 vnode 再执行 patch 和 diff  
- 使用 webpack vue-loader,会在开发环境下编译模板（重要）  

## vue组件可用render代替template

- 在有些复杂情况中，不能用 template，可以考虑用 Render  
- React 一直都用 Render（没有模板），和这里一样  

**总结**

- with 语法  
- 模板到 Render 函数，再到 vnode，再到渲染和更新  
- vue 组件可以用 Render 代替 template   

# 渲染 Render

## 组件渲染 and 更新的过程

❶ 响应式：监听 data 属性，getter setter （包括数组）  
❷ 模板编译：模板到 render 函数，再到 vnode  
❸ vdom: patch(elem, vnode) 和 patch(vnode, newVnode)  

① 初次渲染  
② 更新过程  
③ 异步渲染  


## vue组件是如何渲染和更新的

**初次渲染过程**

- 解析模板为 render 函数（或在开发环境已完成，vue-loader）  
- 触发响应式，监听 data 属性 getter setter  
- 执行 render 函数，生成 vnode，patch(elem, vnode)  

**执行 Render 函数会触发 getter**

```html
<p>{{message}}</p>

<script>
export default {
    data() {
        return {
            message: 'hello', // 会触发 get
            city: '北京' // 不会触发get,因为模板没有用到，和视图没有关系
        }
    }
}
</script>
```

**更新过程**

- 修改 data,触发 setter （此前在 getter 中已被监听）  
- 重新执行 render 函数，生成 newVnode  
- patch(vnode, newVnode) 【diff 算法上场】  

## vue组件是异步渲染的

**异步渲染**

- 回顾 $nextTick   
- 汇总 data 的修改，一次性更新视图  
- 减少 DOM 操作次数，提高性能  

# 路由 Router

## 如何用JS实现hash路由

**前端路由原理**

- 稍微复杂一点的 SPA, 都需要路由  
- vue-router 也是 vue 全家桶的标配之一  
- 属于“和日常使用相关联的原理”， 面试常考  
- 回顾  vue-router 的路由模式：hash、H5 history  

**hash 的特点**

❶ hash 变化会触发网页跳转，即浏览器的前进、后退  
❷ hash 变化不会刷新页面， SPA 必需的特点  
❸ hash 永远不会提交到 server 端（前端自生自灭）  

*hash 变化包括：*

- a. js 修改 url  
- b. 手动修改 url 的 hash  
- c. 浏览器前进、后退  

**hash 路由 demo**

```html
<body>
    <p>hash test</p>
    <button id="btn1">修改 hash</button>

    <script>
        // hash 变化，包括：
        // a. JS 修改 url
        // b. 手动修改 url 的 hash
        // c. 浏览器前进、后退
        window.onhashchange = (event) => {
            console.log('old url', event.oldURL)
            console.log('new url', event.newURL)

            console.log('hash:', location.hash)
        }

        // 页面初次加载，获取 hash
        document.addEventListener('DOMContentLoaded', () => {
            console.log('hash:', location.hash)
        })

        // JS 修改 url
        document.getElementById('btn1').addEventListener('click', () => {
            location.href = '#/user'
        })
    </script>
</body>
```


## 如何用JS实现H5 history路由

**H5 history** 

- 用 url 规范的路由，但跳转时不刷新页面 
- history.pushState  
- window.onpopstate  

**正常页面浏览**

https://github.com/xxx    刷新页面  
https://github.com/xxx/yyy    刷新页面

**改造成 H5 history 模式**

https://github.com/xxx    刷新页面  
https://github.com/xxx/yyy   前端跳转，不刷新页面  

**H5 history 路由 demo**

```html
<body>
    <p>history API test</p>
    <button id="btn1">修改 url</button>

    <script>
        // 页面初次加载，获取 path
        document.addEventListener('DOMContentLoaded', () => {
            console.log('load', location.pathname)
        })

        // 打开一个新的路由
        // 【注意】用 pushState 方式，浏览器不会刷新页面
        document.getElementById('btn1').addEventListener('click', () => {
            const state = { name: 'page1' }
            console.log('切换路由到', 'page1')
            history.pushState(state, '', 'page1') // 重要！！
        })

        // 监听浏览器前进、后退
        window.onpopstate = (event) => { // 重要！！
            console.log('onpopstate', event.state, location.pathname)
        }

        // 需要 server 端配合，可参考
        // https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90
    </script>
</body>
```

**总结**

- hash - window.onhashchange  
- H5 history - history.pushState 和 window.onpopsate  
- H5 history 需要后端支持  

**两者选择**

- to B (后台管理系统) 的系统推荐用 hash，简单易用，对 url 规范不敏感  
- to C 的系统，可以考虑选择 H5 history ，但需要服务端支持【SEO、搜索引擎优化需要 H5 history】  
- 能选择简单的，就别用复杂的，要考虑成本和收益    

