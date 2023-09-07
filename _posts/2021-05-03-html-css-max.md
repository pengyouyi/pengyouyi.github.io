---
layout: post
title: CSS 的 min() 、max() 、clamp() 函数
tags:
- CSS-basic
categories: CSS
description: CSS 的 min() 、max() 、clamp() 函数
---

# CSS 的 min() 、max() 、clamp() 函数

和 calc() 函数类似，任何可以使用 `<length>，<frequency>，<angle>，<time>，<percentage>，<number>或者<integer>数据类型`的地方都可以使用min()、max()、clamp() 这3个函数。

# min()

[https://developer.mozilla.org/zh-CN/docs/Web/CSS/min](https://developer.mozilla.org/zh-CN/docs/Web/CSS/min)

```html
<style>
	body {
	  font-size: 16px;
	}
	#demo {
	  width: min(10vw, 6em, 200px);
	  height: 200px;
	  background: #ececec;
	}
</style>
<body>
	<div id="demo">this is demo</div>
	<div >浏览器宽度：<span id="viewport"></span></div>
	<div >最小宽度：200px</div>
	<div >字体宽度：16px * 6 = 96px</div>
<script>
	var demo = document.getElementById('demo')
	var viewport = document.getElementById('viewport')
	if(window.ResizeObserver) {
	  var objResizeObserver = new ResizeObserver(function() {
	    demo.textContent = demo.offsetWidth + 'px'
	    viewport.textContent = document.documentElement.clientWidth + 'px'
	  })
	  objResizeObserver.observe(demo)
	}
</script>
```

- 浏览器视口宽度 ?px * 10% = 10vm  
- 根元素 font-size ?px * 6em = 6em，【这里 1em = 16px】  
- 计算出的三个值，取最小值

过去我们希望网页在桌面端浏览器 1024 像素，在移动端100%宽度是这么实现的：

```css
.constr {
    width: 1024px;
    max-width: 100%;
}
```
现在有了 min()，我们只需要一句 CSS 声明就可以实现了：

```css
.constr {
    width: min(1024px, 100%);
}
```

# max()

[https://developer.mozilla.org/zh-CN/docs/Web/CSS/max](https://developer.mozilla.org/zh-CN/docs/Web/CSS/max)

```css
width: max(10vw, 4em, 80px);
```

# clamp()

[https://developer.mozilla.org/zh-CN/docs/Web/CSS/clamp](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clamp)

clamp(MIN, VAL, MAX) 实际上等同于 `max(MIN, min(VAL, MAX))`。

```css
width: clamp(10px, 4em, 80px);
```

```css
/* given 1em = 16px, 4em = (16px * 4) = 64px */
width: clamp(10px, 64px, 80px);
/* clamp(MIN, VAL, MAX) is resolved as max(MIN, min(VAL, MAX))) */
width: max(10px, min(64px, 80px))
width: max(10px, 64px);
width: 64px;
```
