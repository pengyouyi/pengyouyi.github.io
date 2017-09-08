---
layout: post
title: css等高布局
tags:
- 布局
categories: CSS
description: css等高布局
---

# 左右no等高布局

```css
#demo1 {
	margin:20px auto;
	width:500px;
	border:1px solid red;
}
.left {
	width: 200px;
	background: pink;
}
.right {
	width: 300px;
	background: green;
}
.left,.right {
	float: left;
}
.right p{
	line-height: 40px;
}
.clear {
	clear: both;
}
```

{% highlight html linenos %}
<div id="demo1">
	<div class="left">left</div>
	<div class="right">
		<p>1</p>
		<p>2</p>
		<p>3</p>
		<p>4</p>
	</div>
	<div class="clear"></div>
</div>
{% endhighlight %}

**_result display_**
<div class="rd">
    <img src="/assets/images/2017/1-2-3/03-22-1.png" alt="">
</div>

# padding补偿法两列等高布局

浏览器兼容最好最简便的应该是padding补偿法。  
思路：
首先把列的padding-bottom设为一个足够大的值，再把列的margin-bottom设一个与前面的padding-bottom的正值相抵消的负值，父容器设置超出隐藏，这样子父容器的高度就还是它里面的列没有设定padding-bottom时的高度，当它里面的任一列高度增加了，则父容器的高度被撑到它里面最高那列的高度，其他比这列矮的列则会用它们的padding-bottom来补偿这部分高度差。因为背景是可以用在padding占用的空间里的，而且边框也是跟随padding变化的，所以就成功的完成了一个障眼法。

核心代码：
```css
main {
    overflow: hidden;
}
.left,.right {
	float: left;
	margin-bottom: -10000px;
	padding-bottom: 10000px;
}
```

完整例子
```css
#demo1 {
	overflow: hidden;
	width:500px;
	margin:20px auto;
	border:1px solid red;
}
.left {
	width: 200px;
	background: pink;
}
.right {
	width: 300px;
	background: green;
}
.left,.right {
	float: left;
	margin-bottom: -10000px;
	padding-bottom: 10000px;
}
.right p{
	line-height: 40px;
}
```

{% highlight html linenos %}
<div id="demo1">
	<div class="left">left</div>
	<div class="right">
		<p>12</p>
		<p>12</p>
		<p>12</p>
		<p>12</p>
	</div>
</div>
{% endhighlight %}

**_result display_**
<div class="rd">
    <img src="/assets/images/2017/1-2-3/03-22-2.png" alt="">
</div>

# 左右两列要求有最小height，
例如：200px;（当内容超出200时，会自动以等高的方式增高）。

在以上基础上增加

```css
.left,.right {
	min-height: 200px;
	height: auto !important;
	height: 200px;
}
```











