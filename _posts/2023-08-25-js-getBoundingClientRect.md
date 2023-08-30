---
layout: post
title: JS 判断一个元素是否在可视区域中
tags:
- Interview
- BOM
categories: JS
description: JS 判断一个元素是否在可视区域中
---

# JS 判断一个元素是否在可视区域中

# 用途 use

在日常开发中，我们经常需要判断目标元素是否在视窗之内或者和视窗的距离小于一个值（例如 100 px），从而实现一些常用的功能。比如：

- 图片的懒加载  
- 列表的无限滚动  
- 计算广告元素的曝光情况  
- 可点击链接的预加载  

# 实现方式 method

判断一个元素是否在可视区域，我们常用的有三种办法：

❶ getBoundingClientRect  
❷ offsetTop、scrollTop  
❸ Intersection Observer  

# getBoundingClientRect

## getBoundingClientRect() 简介

[Element.getBoundingClientRect()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect) 方法返回一个 DOMRect 对象，其提供了元素的大小及其相对于视口的位置。

![https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect/element-box-diagram.png](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect/element-box-diagram.png)

**返回值**

返回值是一个 DOMRect 对象，是包含整个元素的最小矩形（包括 padding 和 border-width）。该对象使用 left、top、right、bottom、x、y、width 和 height 这几个以像素为单位的只读属性描述整个矩形的位置和大小。除了 width 和 height 以外的属性是`相对于视图窗口的左上角`来计算的。

```html
<style>
div {
  width: 400px;
  height: 200px;
  padding: 20px;
  margin: 50px auto;
  background: purple;
}
</style>
<script>
let elem = document.querySelector("div");
let rect = elem.getBoundingClientRect();
console.log(rect);

// {
//     x: 123,
//     y: 50,
//     width: 440,
//     height: 240,
//     top: 50,
//     right: 563,
//     bottom: 290,
//     left: 123 
// }
</script>
```

## getBoundingClientRect() 判断元素是否在可视区域

如果一个元素在视窗之内的话，那么它一定满足下面四个条件：

- top 大于等于 0
- left 大于等于 0
- bottom 小于等于视窗高度
- right 小于等于视窗宽度

```js
function isInViewPort(element) {
  const {
    top,
    right,
    bottom,
    left,
  } = element.getBoundingClientRect();
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  // const viewWidth = (window.innerWidth || document.documentElement.clientWidth) + 100;
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  // const viewHeight = (window.innerHeight || document.documentElement.clientHeight) + 100;

  return (
    top >= 0 &&
    left >= 0 &&
    right <= viewWidth &&
    bottom <= viewHeight
  );
}
```

# offsetTop、scrollTop

scrollTop 是一个属性，表示元素滚动条向下滚动的距离。offsetTop 是一个属性，表示元素相对于其最近的定位父元素的顶部偏移量。


content.offsetHeight：元素的高度。
content.offsetTop：元素顶部距离父容器顶部的高度。
document.documentElement.clientHeight：浏览器可见区域高度。
document.documentElement.scrollTop：浏览器滚动条滚动的距离。

元素进入可视区域,需要满足以下2个条件：

- ❶ content.offsetTop + content.offsetHeight > scrollTop
- ❷ content.offsetTop < scrollTop + clientHeight

❶

<div class="rd">
    <img src="/assets/images/2023/7-8-9/offset1.jpg" alt="">
</div>

❷

<div class="rd">
    <img src="/assets/images/2023/7-8-9/offset2.jpg" alt="">
</div>

```js
function isView(element) {
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    let isVisible1 = element.offsetTop + element.offsetHeight > scrollTop;
    let isVisible2 = element.offsetTop < scrollTop + clientHeight;
    return isVisible1 && isVisible2;
}
```

# Intersection Observer

待学习。。。