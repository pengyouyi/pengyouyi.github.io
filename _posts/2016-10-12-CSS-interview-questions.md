---
layout: post
title: CSS面试题
tags:
- 面试题
categories: CSS
description: CSS面试题
---

# CSS面试题

# box model
- 介绍一下标准的CSS的盒子模型？低版本IE的盒子模型有什么不同的？

（1）有两种， IE 盒子模型、W3C 盒子模型；
（2）盒模型： 内容(content)、填充(padding)、边界(margin)、 边框(border)；
（3）区  别： IE的content部分把 border 和 padding计算了进去;

解决IE8及更早版本不兼容问题可以在HTML页面声明 \<!DOCTYPE html\>即可。

在 CSS 中定义的宽和高，其实都是内容区域的宽和高，padding，border 和 margin 被排除在盒子尺寸之外。

所以对于一个定义了宽度的盒子来说，其尺寸的计算方式：

实际宽度 = margin(left+right) + border(left+right) + padding(left+right) + width(定义的值)

实际高度 = margin(top+bottom) + border(top+bottom) + padding(top+bottom) + height(定义的值)

可以利用 margin 调整两个元素之间的距离，用 padding 调整内容与元素边框之间的距离（留白）。这是标准的盒模型

# selector
- CSS选择符有哪些？哪些属性可以继承？

1.id选择器（ # myid）
2.类选择器（.myclassname）
3.标签选择器（div, h1, p）
4.相邻选择器（h1 + p）
5.子选择器（ul > li）
6.后代选择器（li a）
7.通配符选择器（ * ）
8.属性选择器（a[rel = "external"]）
9.伪类选择器（a:hover, li:nth-child）

可继承的样式： font-size font-family color, ul li dl dd dt（字体属性，列表相关）;

不可继承的样式：border padding margin width height (盒模型相关的属性);

# Selector priority
- CSS优先级算法如何计算？
优先级就近原则，同权重情况下样式定义最近者为准;

载入样式以最后载入的定位为准;

优先级为:
   !important >  id > class > tag
    important 比 内联优先级高

# Pseudo class
- CSS3新增伪类有那些？

举例：
```
p:first-of-type 选择属于其父元素的首个 <p> 元素的每个 <p> 元素。
p:last-of-type  选择属于其父元素的最后 <p> 元素的每个 <p> 元素。
p:only-of-type  选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。
p:only-child        选择属于其父元素的唯一子元素的每个 <p> 元素。
p:nth-child(2)  选择属于其父元素的第二个子元素的每个 <p> 元素。

:after          在元素之前添加内容,也可以用来做清除浮动。
:before         在元素之后添加内容
:enabled        
:disabled       控制表单控件的禁用状态。
:checked        单选框或复选框被选中。
```

# div center
- 如何居中div？

水平居中：给div设置一个宽度，然后添加margin:0 auto属性
```css
div{
    width:200px;
    margin:0 auto;
 }
 ```
 让绝对定位的div居中
 ```css
 div {
    position: absolute;
    width: 300px;
    height: 300px;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: pink;     /* 方便看效果 */
}
```
水平垂直居中一
```css
确定容器的宽高 宽500 高 300 的层
设置层的外边距
//div的父元素需要设定高度，否则top无效
div {
    position: relative;     /* 相对定位或绝对定位均可 */
    width:500px; 
    height:300px;
    top: 50%;
    left: 50%;
    margin: -150px 0 0 -250px;      /* 外边距为自身宽高的一半 */
    background-color: pink;     /* 方便看效果 */
 }
 ```
 水平垂直居中二
 ```css
 未知容器的宽高，利用 `transform` 属性

div {
    position: absolute;     /* 相对定位或绝对定位均可 */
    width:500px; 
    height:300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: pink;     /* 方便看效果 */

}
```

水平垂直居中三
```css
利用 flex 布局
实际使用时应考虑兼容性

.container {
    display: flex; 
    align-items: center;        /* 垂直居中 */
    justify-content: center;    /* 水平居中 */

}
.container div {
    width: 100px;
    height: 100px;
    background-color: pink;     /* 方便看效果 */
}  
```

# display
- display有哪些值？说明他们的作用。
 
block         块类型。默认宽度为父元素宽度，可设置宽高，换行显示。
none          缺省值。象行内元素类型一样显示。
inline        行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。
inline-block  默认宽度为内容宽度，可以设置宽高，同行显示。
list-item     象块类型元素一样显示，并添加样式列表标记。
table         此元素会作为块级表格来显示。
inherit       规定应该从父元素继承 display 属性的值。

# position
- position的值relative和absolute定位原点是？

absolute
生成绝对定位的元素，相对于值不为 static的第一个父元素进行定位。
fixed （老IE不支持）
生成绝对定位的元素，相对于浏览器窗口进行定位。
relative
生成相对定位的元素，相对于其正常位置进行定位。
static
默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right z-index 声明）。
inherit
规定从父元素继承 position 属性的值。

# css3 new features
- CSS3有哪些新特性？

新增各种CSS选择器  （: not(.input)：所有 class 不是“input”的节点）
圆角           （border-radius:8px）
多列布局        （multi-column layout）
阴影和反射        （Shadow\Reflect）
文字特效      （text-shadow、）
文字渲染      （Text-decoration）
线性渐变      （gradient）
旋转          （transform）
增加了旋转,缩放,定位,倾斜,动画，多背景
transform:\scale(0.85,0.90)\ translate(0px,-30px)\ skew(-9deg,0deg)\Animation:

# Triangle
- 用纯CSS创建一个三角形的原理是什么？

把上、左、右三条边隐藏掉（颜色设为 transparent）
```css
#demo{
  width: 0; 
  height: 0;  
  border-width: 20px;  
  border-style: solid;  
  border-color: transparent transparent red transparent;
}
```

# 12px
- Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,

可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决

# hover
- 超链接访问过后hover样式就不出现了 被点击访问过的超链接样式不在具有hover和active了解决方法是改变CSS属性的排列顺序:

L-V-H-A :  a:link {} a:visited {} a:hover {} a:active {}
记忆顺序：喜欢（L-o-V-e），讨厌（H-A-t-e）

# li 
- li与li之间有看不见的空白间隔是什么原因引起的？有什么解决办法？

行框的排列会受到中间空白（回车\空格）等的影响，因为空格也属于字符,这些空白也会被应用样式，占据空间，所以会有间隔，把字符大小设为0，就没有空格了。

# css init
- 为什么要初始化CSS样式。

因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异。

当然，初始化样式会对SEO有一定的影响，但鱼和熊掌不可兼得，但力求影响最小的情况下初始化。

最简单的初始化方法： * {padding: 0; margin: 0;} （强烈不建议）

淘宝的样式初始化代码：
```
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; }
body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; }
h1, h2, h3, h4, h5, h6{ font-size:100%; }
address, cite, dfn, em, var { font-style:normal; }
code, kbd, pre, samp { font-family:couriernew, courier, monospace; }
small{ font-size:12px; }
ul, ol { list-style:none; }
a { text-decoration:none; }
a:hover { text-decoration:underline; }
sup { vertical-align:text-top; }
sub{ vertical-align:text-bottom; }
legend { color:#000; }
fieldset, img { border:0; }
button, input, select, textarea { font-size:100%; }
table { border-collapse:collapse; border-spacing:0; }
```

# css weight
- css定义的权重

/*权重为1*/
div{
}
/*权重为10*/
.class1{
}
/*权重为100*/
\#id1{
}
/*权重为100+1=101*/
\#id1 div{
}
/*权重为10+1=11*/
.class1 div{
}
/*权重为10+10+1=21*/
.class1 .class2 div{
}

如果权重相同，则最后定义的样式会起作用，但是应该避免这种情况出现

# 更多-more
* [https://github.com/markyun/My-blog/tree/master/Front-end-Developer-Questions/Questions-and-Answers](https://github.com/markyun/My-blog/tree/master/Front-end-Developer-Questions/Questions-and-Answers)






