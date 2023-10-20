---
layout: post
title: 前端常用的设计模式和使用场景
tags:
- design-pattern
categories: JS
description: 前端常用的设计模式和使用场景
---

# 前端常用的设计模式和使用场景use

设计原则：

`开放封闭原则`，对扩展开放，对修改封闭。

❶ 工厂模式

- 用一个工厂函数，来创建实例，隐藏 new  
- 如 jQuery $ 函数
- 如 React creatElement 函数

❷ 单例模式

- 全局唯一的实例（无法生成第二个）  
- 如 Vuex Redux 的 store  
- 如全局唯一的 dialog modal  

❸ 代理模式

- 使用者不能直接访问对象，而是访问一个代理层  
- 在代理层可以监听 get set 做很多事情  
- 如 ES6 Proxy 实现 Vue3 响应式  

❹ 观察者模式

```js
btn.addEventListener('click', () => {...})
```

❺ 发布订阅模式

```js
// 绑定
event.on('event-key',  () => {
    // 事件1
})
event.on('event-key',  () => {
    // 事件2
})

// 触发执行
event.emit('event-key')
```

❻ 装饰器模式

- 原功能不变，增加一些新功能（AOP面向切面编程）  
- ES 和 typescript 的 Decorator 语法  
- 类装饰器，方法装饰器  

# 观察者模式and发布订阅模式的区别

观察者模式

- Subject 和 Observer 直接绑定，没有中间媒介  
- 如 addEventlistener 绑定事件  

发布订阅模式

- publisher 和 Observer 互不认识，需要中间媒介 Event channel  
- 如 EventBus 自定义事件  

