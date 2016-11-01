---
layout: post
title: block & inline 元素区别
tags:
- 布局
categories: CSS
description: block & inline 元素区别
---

block & inline 元素区别

# block元素特性
总是独占一行，表现为另起一行开始，而且其后的元素也必须另起一行显示;
宽度(width)、高度(height)、内边距(padding)和外边距(margin)都可控制;

# inline元素特性
和相邻的内联元素在同一行;
宽度(width)、高度(height)、
内边距的top/bottom(padding-top/padding-bottom)和
外边距的top/bottom(margin-top/margin-bottom)都不可改变，
就是里面文字或图片的大小;

内联元素的margin-left / margin-right及padding-left / padding-rigtht是可以控制的，所以可以通过这4个属性来控制内联元素的宽度。
可以通过line-height来设置占位高度；
设置padding 只有左右padding有效，上下则无效。注意元素范围是增大了，但是对元素周围的内容是没影响的。

# img input
以上这两个元素表现特殊。display:inline; 但是可是设置margin、paddding

# display:inline-block 空隙问题解决
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
<style>
*{
	margin:0;
	padding: 0;
}
ul{
	width: 400px;
	height: 60px;
	letter-spacing: -4px;/*根据不同字体字号或许需要做一定的调整*/
  	word-spacing: -4px;
	font-size: 0;
	background: #999;
}
li{
	display: inline-block;
	*display:inline;
	zoom:1;
	width: 80px;
	height: 40px;
	font-size: 12px;
	letter-spacing: normal;
  	word-spacing: normal;
	background: #f60;
}
</style>
</head>
<body>
<ul>
	<li>1</li>
	<li>2</li>
	<li>3</li>
	<li>4</li>
</ul>
</body>
</html>
```



# 更多-more
+ [https://developer.mozilla.org/zh-CN/docs/Web/HTML/Block-level_elements](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Block-level_elements)
+ [https://developer.mozilla.org/zh-CN/docs/Web/HTML/Inline_elemente](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Inline_elemente)











































