---
layout: post
title: 慕课网-前端JavaScript面试技巧(双越)-第8章 运行环境
tags:
- Interview
- imooc
- BOM
- optimize
categories: JS
description: 慕课网-前端JavaScript面试技巧(双越)-运行环境
---

慕课网学习笔记-前端JavaScript面试技巧(双越)- 第8章 运行环境

# question

**题目：**

- 浏览器就可以通过访问连接来得到页面的内容

- 通过绘制和渲染，显示出页面的最终的样子

- 整个过程中，我们需要考虑什么问题？

# Knowledge-point

**知识点：**

- 页面加载过程

- 性能优化

- 安全性

## 页面加载-Page-load

**加载资源的形式**

1. 输入URL（或跳转页面）加载HTML
2. 加载HTML中的静态资源,比如 `<script src='/static/'>`


**加载一个资源的过程**

1. 浏览器根据DNS服务器得到域名的IP地址
2. 向这个IP的机器发送HTTP请求
3. 服务器收到、处理并返回HTTP请求
4. 浏览器得到返回内容

**浏览器渲染页面的过程**

1. 根据HTML结构生成 DOM树
2. 根据CSS生成cssOM
3. 将DOM和CSSOM整合成render树
4. 根据render树开始渲染和展示
5. 遇到 `<script>` 时，会执行并阻塞渲染

**为何要把css放到head中？**

- 用户体验差，卡顿、抖动；

- 性能差，如果css放head里渲染DOM的元素的时候知道规则，一次渲染成功，否则DOM元素先按照默认的样式渲染，再按规定它样式的CSS渲染。

**window.onload 和 DOMContentLoaded 的区别**

- window.onload  页面的全部资源加载完成才会执行，包括图片、视频

- DOMContentLoaded DOM渲染完即可执行，此时图片、视频可能没有加载完

## 性能优化-performance-optimization

- 性能优化 - 优化策略

**原则** 

- 多使用内存、缓存或者其他方法

- 减少CPU计算、减少网络

**从哪里入手**

1. 加载页面和静态资源
2. 页面渲染

### one-加载资源优化

1. 静态资源的压缩合并
2. 静态资源缓存
3. 使用CDN让资源加载更快
4. 使用SSR（server side render）后端渲染，数据直接输出到HTML中

*静态资源缓存*

- 通过连接名称控制缓存，<script src="abc_1.js"></script>

- 只有内容改变的时候，链接名称才会改变，<script src="abc_2.js"></script>

*使用SSR（server side render）后端渲染*

- 现在 Vue 、React 提出了这样的概念

- 其实 jsp 、php 、 asp 都属于后端渲染

> 服务端渲染：将网页和数据一起加载，一起渲染

> 非SSR（前后端分离）：先加载网页，再加载数据，再渲染数据

### two-渲染优化

1. css放前面，js放后面
2. 懒加载（图片懒加载、下拉加载更多）
3. 减少DOM查询，对DOM查询做缓存
4. 减少DOM操作，多个操作尽量合并在一起执行
5. 事件节流 throttle、防抖 debounce
6. 尽早执行操作（如DOMContentLoaded）


*图片懒加载*

```js
<img id="img1" src="preview.png" data-realsrc="abc.png" />
<script>
  var img1 = document.getElementById('img1');
  img1.src = img1.getAttribute('data-realsrc');
</script>
```

*缓存DOM查询*

```js
// 不缓存 DOM 查询结果
for(let i = 0; i < document.getElementsByTagName('p').length; i++) {
  // 每次循环，都会计算 length,频繁进行 DOM 查询
}

// 缓存 DOM 查询结果
const pList = document.getElementsByTagName('p').length;
for (let i = 0; i < pList; i++) {
	// 缓存 length，只进行一次 DOM 查询
}
```

*多个 DOM 操作一起插入到 DOM 结构*

```js
let outter = document.getElementById('outter')

// 创建一个文档片段，此时还没有插入到DOM树中
let frag = document.createDocumentFragment()
// 执行插入
for( let i = 0; i < 10000; i++) {
	let oLi = document.createElement('li')
	oLi.innerHTML = i
	frag.appendChild(oLi)
}
// 都完成之后，再插入到DOM树中
outter.appendChild(frag)
```

在前端开发的过程中，我们经常会需要绑定一些持续触发的事件，如 resize、scroll、mousemove 等等，但有些时候我们并不希望在事件持续触发的过程中那么频繁地去执行函数。

通常这种情况下我们怎么去解决的呢？一般来讲，防抖和节流是比较好的解决方案。

*事件防抖*

```js
var textarea = document.getElementById('text');
var timeoutId = null;
textarea.addEventListener('keyup', function() {
	if (timeoutId) {
		clearTimeout(timeoutId);
	}
	timeoutId = setTimeout(function() {
		// 触发change事件
		console.log(textarea.value)
		// 清空定时器
		timeoutId = null
	}， 500)；
});
```

- 监听一个输入框，文字变化后触发 change 事件

- 直接用 keyup 事件，则会频繁触发 change 事件

- 防抖：用户输入结束或暂停时，才会触发 change 事件

```js
// 封装通用的防抖函数
function debounce(fn, delay = 500) {
	let timer = null;
	return function() {
		if(timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			fn.apply(this, arguments)
			// fn() // 错误，调用的时候不能接收到e参数
			timer = null
		},delay)
	}
}

// 如何使用防抖函数
const input1 = document.getElementById('input1')
input1.addEventListener('keyup',debounce(function(e) {
	console.log(e.target)
	console.log(input1.value)
}), 1000)
```

*事件节流*

```js
const div1 = document.getElementById('div1')
let timer = null
div1.addEventListener('drag', function(e) {
	if (timer) {
		return
	}
	timer = setTimeout(function() {
		console.log(e.offsetX,e.offsetY)
		timer = null
	}, 1000)
})
```

- 拖拽一个元素时，要随时拿到该元素被拖拽的位置

- 直接用 drag 事件，则会频繁触发，很容易导致卡顿

- 节流：无论拖拽速度多快，都会每隔 100ms 触发一次

```js
// 封装通用的节流函数
function throttle(fn, delay = 100) {
	let timer = null
	return function() {
		if (timer) {
		    return
		}
		timer = setTimeout(() => {
			fn.apply(this, arguments)
			// fn() // 错误，调用的时候不能接收到event参数
			timer = null
		}, delay)
	}
}
  
// 如何使用节流函数
const div1 = document.getElementById('div1')
div1.addEventListener('drag',throttle(function(e){
	console.log(e.offsetX, e.offsetY)
}, 200))
```

节流的其他应用场景：

1. 抢购的时候，无数人快速的点击按钮，如果每次点击都发送请求，就会给服务器造成巨大的压力，但是我们进行节流后，就会大大减少请求的次数。  
2. 防止表单提交按钮被多次触发，我们应该选择使用节流而不是防抖。  
3. 滚动加载，加载更多或滚到底部监听。  

> 防抖和节流的区别：防抖是将多次执行变为最后一次执行，节流是将多次执行变为每隔一段时间执行

*尽早执行操作*
```js
window.addEventListener('load', function(){
  // 页面的全部资源加载完才会执行，包括图片、视频等
});
document.addEventListener('DOMContentLoaded', function() {
  // DOM渲染完即可执行，此时图片、视频还可能没有加载完
})
```

## 安全性 - XSS

- xss 跨站请求攻击

- XSRF 跨站请求伪造

# 更多-more

[前端JavaScript面试技巧](https://coding.imooc.com/learn/list/115.html)