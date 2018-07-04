---
layout: post
title: Vue生命周期
tags:
- Interview
- vue
categories: JS
description: Vue生命周期
---


# vue生命周期

![https://cn.vuejs.org/images/lifecycle.png](https://cn.vuejs.org/images/lifecycle.png)

[vue生命周期图示](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)

## 什么是vue生命周期？

Vue 实例从创建到销毁的过程，就是生命周期。

也就是从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。

## vue生命周期的作用是什么？

它的生命周期中有多个事件钩子，让我们在控制整个Vue实例的过程时更容易形成好的逻辑。


## 请详细说下你对vue生命周期的理解？

总共分为8个阶段:

beforeCreate（创建前）, created（创建后） 

beforeMount（载入前）, mounted（载入后） 

beforeUpdate（更新前）, updated（更新后） 

beforeDestroy（销毁前）, destroyed（销毁后）


### beforeCreate（创建前）/ created（创建后）：

+ beforeCreate: vue实例的挂载元素 \$el 和 数据对象data 都没有初始化 全部为 undefined 

+ created: data 初始化完成，但 $el 没有初始化 

### beforeMount（载入前）/ mounted（载入后）：

+ beforeMount: vue实例的$el和data都初始化了，但还是挂载之前为虚拟的dom节点，eg： `<div>{{message}}</div>` 

+ mounted: vue实例挂载完成(DOM 加载完成)，data.message成功渲染。

### beforeUpdate（更新前）/ updated（更新后）：

当data变化时，会触发beforeUpdate和updated方法。

+ beforeUpdate: 渲染完成，并监测到data发生变化，在变化的数据重新渲染视图之前会触发，这也是重新渲染之前最后修改数据的机会 

+ updated: 监测到data发生变化，并完成渲染更新视图之后触发

### beforeDestroy（销毁前）/ destroyed（销毁后）：

在执行destroy方法后，对data的改变不会再触发周期函数，说明此时vue实例已经解除了事件监听以及和dom的绑定，但是dom结构依然存在

+ beforeDestory: 实例销毁之前调用 ， 实例仍然完全可用。 

+ destroyed: 实例销毁后调用。调用后，对data的改变不会再触发周期函数，说明此时vue实例已经解除了事件监听以及和dom的绑定，但是dom结构依然存在

## 第一次页面加载会触发哪几个钩子？

第一次页面加载时会触发 beforeCreate, created, beforeMount, mounted 这几个钩子

## DOM 渲染在 哪个周期中就已经完成？

DOM 渲染在 mounted 中就已经完成了


## 简单描述每个周期具体适合哪些场景-scene？ 

- beforeCreate: 可以在此时加一些loading效果，在created时进行移除

- created : (可以调用实例的数据和实例的方法). 初始化完成时的事件写在这里，如在这结束loading事件，需要异步请求数据的方法可以在此时执行

- mounted : 用于初始数据的dom渲染,获取到DOM节点（需要操作dom的方法放这里）

- updated : 用于对数据更新做统一处理 （如果想分别区分不同的数据更新，同时进行dom操作就使用 $nextTick）

- beforeDestroy : 可以做一个确认停止事件的确认框 


[vue 生命周期 应用场景 概述](https://blog.csdn.net/m0_37805167/article/details/79655346)

[vue 生命周期使用场景](https://www.cnblogs.com/Breaveleon/p/6664503.html)


