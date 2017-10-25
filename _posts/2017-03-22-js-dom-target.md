---
layout: post
title: js事件中target和currentTarget的区别
tags:
- js事件
categories: JS
description: js事件中target和currentTarget的区别
---

# js事件中target和currentTarget的区别

target **事件目标**

> 触发事件的那个具体对象


`event.target` 相当于 IE事件对象中的 `window.event.srcElement`

currentTarget **某事件处理程序当前正在处理事件的那个元素**

> 绑定事件的对象

# js事件中target和currentTarget各指的是什么

{% highlight html linenos %}
<div id="demo">
	父亲
	<p id="son">儿子
		<a id="sun">孙子</a>
	</p>
</div>
{% endhighlight %}

```js
demo.onclick = function(e) {
	console.log("e.target",e.target);
	console.log("e.currentTarget",e.currentTarget);
	console.log("this",this);
	console.log("this === e.target", this === e.target);
	console.log("this === e.currentTarget", this === e.currentTarget);
}
```
当点击孙子节点时
<div class="rd">
    <img src="/assets/images/2017/1-2-3/03-24-1.png" alt="">
</div>

**_result display_**
<div class="rd">
    <img src="/assets/images/2017/1-2-3/03-24-2.png" alt="">
</div>

当点击父亲节点时
<div class="rd">
    <img src="/assets/images/2017/1-2-3/03-24-3.png" alt="">
</div>

**_result display_**
<div class="rd">
    <img src="/assets/images/2017/1-2-3/03-24-4.png" alt="">
</div>


# target、currentTarget 和 this 的渊源

`this === e.currentTarget`
但是 this 不一定等于 e.target

target只包含事件的实际目标










