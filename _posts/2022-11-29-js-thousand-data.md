---
layout: post
title: 后端一次性返回10w 条数据，你该如何渲染
tags:
- JS-use
categories: JS
description: 后端一次性返回10w 条数据，你该如何渲染
---

# 后端一次性返回10w 条数据，你该如何渲染

**设计不合理**

- 后端返回 10w 条数据，本身技术方案设计就不合理。

**浏览器能否处理10w 条数据**

- JS 处理没问题  
- 一次性渲染到 DOM 会非常卡顿  

【解决方案：】

❶ 自定义中间层

- 自定义 nodejs 中间层，获取并拆分 10w 条数据  
- 前端对接 nodejs 中间层，而不是服务器  
- 成本比较高  

❷ 虚拟列表

- 只渲染可视区 DOM  
- 其他隐藏区域不显示，只用 \<div\> 撑起高度  
- 随着浏览器滚动，创建和销毁 DOM  

**虚拟列表 - 第三方 lib**  

- 虚拟列表实现起来非常复杂，可借用第三方 lib  
- Vue-virtual-scroll-list  
- React-virtualiszed  

❸ 懒加载

实现原理：通过监听父级元素的 scroll 事件，当然也可以通过 IntersectionObserver 或 getBoundingClientRect 等 API 实现

❹ 通过 setTimeout 进行分页渲染/requestAnimationFrame  


❺ 文档片段 + requestAnimationFrame 

# more 

实现具体方法，待添加。。。