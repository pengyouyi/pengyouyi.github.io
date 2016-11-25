---
layout: post
title: css水平垂直居中的方法总结
tags:
- 布局
categories: CSS
description: css水平垂直居中的方法总结
---

# css水平垂直居中的方法总结

# inline元素水平居中

## 单行水平居中- text-align:center;

这种方法只适合单行文字的水平垂直居中;

## Flex布局

设置display:flex;justify-content:center;(灵活运用,支持Chrome，Firefox，IE10+)

# inline元素垂直居中

## 父元素高度确定的单行文本（inline element）

> 设置line-height = height;

```css
.vertical {
	height: 100px;
	line-height: 100px;/*值等于元素高度的值*/
}
```

```html
<div class="vertical">content</div>
```
优点：
适合在所有浏览器，没有足够空间时，内容不会被切掉。

缺点：
仅适合应用在文本和图片上，并且这种方法，当你文本不是单行时，效果极差。
这种方法对运用在小元素上是非常有用的，比如说让一个button、图片或者单行文本字段。

## 父元素高度确定的多行文本（inline element）

> 父级display:table；子级display:table-cell; vertical-align:middle

# block元素水平垂直居中

## 宽度高度固定DIV水平垂直居中

### [绝对定位居中(Absolute Centering)技术](https://www.smashingmagazine.com/2013/08/absolute-horizontal-vertical-centering-css/)
```css
.wrap {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid red;
}
.content {
  overflow: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 200px;
  height: 200px;
  margin: auto;
  border: 1px solid green;
}
```
```html
<div class="wrap">
  <div class="content">center me</div>
</div>
```
必须设置width、height;
设置overflow:auto来防止内容越界溢出;
考虑多浏览器兼容性的话 display: table or display: inline-block;
[https://www.w3.org/TR/CSS21/visudet.html#Computing_widths_and_margins](https://www.w3.org/TR/CSS21/visudet.html#Computing_widths_and_margins)

### 负margin方法
```css
.wrap {
	position: relative;
	width: 800px;
	height: 400px;
	border: 1px solid red;
}
.content {
	position: absolute;
	width: 100px;
	height: 100px;
	left: 50%;
	top: 50%;
	margin-top: -50px;
    /* margin-top: -content.height/2; */
	margin-left: -50px;
	background: #eee;
}
```
```html
<div class="wrap">
	<div class="content">center me</div>
</div>
```
优点：
能在各浏览器下工作，结构简单明了，不需增加额外的标签

缺点：
由于固定死元素的高度，致使没有足哆的空间，当内容超过容器的大小时，要么会被裁掉，要么会出现滚动条。
边距大小与padding,和是否定义box-sizing: border-box有关，计算需要根据不同情况。

### padding填充
```css
.wrap {
	width: 400px;
	height: 400px;
	border: 1px solid red;
}
.content {
	width: 100px;
	height: 100px;
	padding: 150px;
    /* padding: calc((100% - 100px) / 2); */
	background: #eee;
	background-clip:content-box;
}
```
```html
<div class="wrap">
  <div class="content"></div>
</div>
```
也可以用css3的calc()动态计算:

缺点：父级元素和子集元素的宽高都需固定。

### relative方法
```css
.wrap {
	position: relative;
	width: 100%;
	height: 200px;
	border: 1px solid red;
}
.relative {
	position: absolute;
    left: 50%;
    top: 50%;
	width: 150px;
	height: 100px;
	background: transparent;
	border: 1px solid green;
}
.content {
	position: relative;
	left: -50%;
	top: -50%;
	width: 100%;
	height: 100%;
	background: #eee;
}
```
```html
<div class="wrap">
	<div class="relative">
		<div class="content">123</div>
	</div>
</div>
```

## 宽度高度不固定DIV水平居中

### margin: 0 auto
CSS3的fit-content的属性值，可以动态计算元素的宽度。

```css
.content {
    width: -webkit-fit-content;
    width: fit-content;
	margin: 0 auto;
	background: #eee;	
}
```
```html
<div class="wrap">
	<div class="content">123</div>
</div>
```

## 宽度高度不固定DIV水平垂直居中

### transform方法
translate(-50%,-50%)，百分比计算不是以父元素为基准，而是以自己为基准。
```css
.wrap {
	position: relative;
	width: 800px;
	height: 400px;
	border: 1px solid red;
}
.content {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
	background: #eee;
}
```
```html
<div class="wrap">
	<div class="content">center me</div>
</div>
```
优点：
1.内容可变高度
2.代码量少

缺点：
1.[IE6,7,8不支持](http://caniuse.com/#search=transform)；
2.属性需要写浏览器厂商前缀；
3.外部容器需要设置height；
4.如果内容包含文字，现在的浏览器合成技术会使文字模糊不清。

# table布局上下文下的水平垂直居中

宽度高度都无需固定

```css
.wrap {
  display: table;
  width: 400px;
  height: 200px;
  border: 1px solid green;
}
.content{
  display: table-cell;
  text-align:center;
  vertical-align: middle;
  background-color: #ccc;
}
```
```html
<div class="wrap">
  <div class='content'>test</div>
</div>
```
优点：
width和height的值只能作为最小值，内容总是会扩大单元格、行以及表格的高度。元素的内容不会因为没足够的空间而被切断或者出现难看的滚动条。

缺点：
这种方法只适合现代浏览器，ie7和ie6都不能识别 display: table ,display: table-cell。
[http://quirksmode.org/css/css2/display.html](http://quirksmode.org/css/css2/display.html)

demo- table-cell在IE6-7工作(未验证)
```css
.wrap {
  position: relative;
  display: table;
  width: 200px;
  height: 200px;
  border: 1px solid red;
}
.tableCell {
  display: table-cell;
  text-align:center;
  vertical-align: middle;
   _position:absolute; 
   _top:50%; 
   _left:50%;
}
.content{
  width: 100px;
  margin: 0 auto;
  display: inline-block;
  _position:relative; 
  _top:-50%; 
  _left:-50%;
}
/* .content{_display:inline;} */   /*针对ie6 hack*/
```
```html
<div class="wrap">
  <div class="tableCell">
    <div class="content">content</div>
  </div>
</div>
```
hack解决方法类似上面的relative方法

# 行内块法inline-block
影子元素 ::before ,宽度高度都无需固定
```css
.wrap {
  position: relative;
  width: 400px;
  height: 400px;
  text-align: center;
  white-space: nowrap;
  border: 1px solid red;
}
.wrap:before {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  margin-right: -0.25em; 
}
.content {
  display: inline-block;
  vertical-align: middle;
  border: 1px solid green;
}
```
```html
<div class="wrap">
  <div class="content">center me</div>
</div>
```

# [Flex布局居中](http://www.w3cplus.com/css3/a-visual-guide-to-css3-flexbox-properties.html)

宽度高度都无需固定，[兼容IE10+](http://caniuse.com/#search=flex)

demo- 1
```css
.wrap {
  display: flex;
  /* 水平居中 */
  justify-content: center;
  /* 垂直居中 */
  align-items: center;
  width: 200px;
  height: 200px;
  border: 1px solid red;
}
```
```html
<div class="wrap">
  <div class="content">content</div>
</div>
```

demo- 2
```css
.wrap {
  display: flex;
  width: 200px;
  height: 200px;
  border: 1px solid red;
}
.content{
  margin: auto;
}
```
```html
<div class="wrap">
  <div class="content">content</div>
</div>
```

[demo- 3](https://www.smashingmagazine.com/2013/05/centering-elements-with-flexbox/)
```css
.wrap {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    /* 水平居中 */
    -webkit-box-align: center;
    -moz-box-align: center;
    -ms-flex-pack:center;
    -webkit-justify-content: center;
    -moz-justify-content: center;
    justify-content: center;
    /* 垂直居中 */
    -webkit-box-pack: center;
    -moz-box-pack: center;
    -ms-flex-align:center;
    -webkit-align-items: center;
    -moz-align-items: center;
    align-items: center;
}
```
```html
<div class="wrap">
  <div class="content">content</div>
</div>
```

# 视口居中-Within Viewport
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<style>
*{
	margin:0;
	padding: 0;
}
body {
  position: relative;

}
.mask {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,.5);
}
.pop {
  display: none;
  width: 300px;
  height: auto;
  margin: auto;
  overflow: auto;
  z-index: 20;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.content {
  position: relative;
  padding: 20px;
  border: 1px solid green;
  background: #fff;
}
#wrap {
  height: 400px;
  background: #f93;
}
#wrap2 {
  height: 800px;
  background: #f39;
}
</style>
<body>
<div class="mask"></div>
<div class="pop">
  <div class="content">
    <h2>center me</h2>
    <input type="button" value="close me" id="btn-close">
  </div>
</div>

<div id="wrap">
  <input type="button" value="show me" id="btn1">
</div> 
<div id="wrap2">
  <input type="button" value="click me" id="btn2">
</div>	
<script>
  var btn1 = document.getElementById("btn1");
  var btn2 = document.getElementById("btn2");
  var btnClose = document.getElementById("btn-close");

  var mask = document.getElementsByClassName("mask")[0];
  var pop = document.getElementsByClassName("pop")[0];

  btn1.onclick = function(){
    mask.style.display = "block";
    pop.style.display = "table";
  }
  btn2.onclick = function(){
    mask.style.display = "block";
    pop.style.display = "table";
  }
  btnClose.onclick = function(){
    pop.style.display = "none";
    mask.style.display = "none"; 
  }
</script>
</body>
</html>
```



# 更多-more
- [http://codepen.io/shshaw/full/gEiDt](http://codepen.io/shshaw/full/gEiDt)
- [How to Center Anything With CSS](How to Center Anything With CSS)
- [https://css-tricks.com/centering-in-the-unknown/](https://css-tricks.com/centering-in-the-unknown/)





















































