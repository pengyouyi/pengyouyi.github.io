---
layout: post
title: $(function{}) 与window.onload区别
tags:
- jQuery
categories: JS
description: $(function{}) 与window.onload区别
---

# $(function{}) 与window.onload区别

window.onload是js原生的事件

$(function(){})是jQuery的方法

$(function(){...}) 是 $(document).ready(function(){...}) 的缩写

$(function(){}) 类似于原生js中的 DOMContentLoaded事件


## one：执行时机不一样
$(function() { ...}) 是在`dom结构加载完`毕后就触发, dom里的内容不一定都已经加载完成。比如说一个页面有好多图片，而加载这些图片需要一定的时间。

window.onload 是在`整个页面加载完成`之后（包括页面上的资源，比如图片）才执行。

所以：`$(function(){...}) 会比 window.onload 先执行`

## two：执行次数不一样：
$(function() { } )不管你jsp引入的js里定义了几个，会按照顺序依次执行;
window.onload只会执行最后一个，之前的会被覆盖掉。

```js
window.onload = function() {
	console.log("onload go")
}
window.onload = function() {
	console.log("onload go")
}

$(function(){
	console.log("ready")
})
$(function(){
	console.log("ready go")
})
```

执行结果：
<div class="rd">
    <img src="/assets/images/2017/1-2-3/03-03-1.png" alt="">
</div>


# DOM文档加载步骤：

(1) 解析HTML结构  
(2) 加载外部脚本和样式表文件  
(3) 解析并执行脚本代码  
(4) 构造HTML  DOM模型  //ready  
(5) 加载图片等外部文件  
(6) 页面加载完毕  //load




















