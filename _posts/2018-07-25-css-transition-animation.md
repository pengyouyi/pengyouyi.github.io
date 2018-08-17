---
layout: post
title: 【CSS3】transform转换、transition过渡和animation动画
tags:
- animation
categories: CSS
description: 【CSS3】transform转换、transition过渡和animation动画
---


# transform转换、transition过渡和animation动画

# transform：转换

[transform 属性](http://www.w3school.com.cn/cssref/pr_transform.asp)

transform 属性向元素应用 2D 或 3D 转换。

对元素进行旋转、缩放、移动或倾斜。

## 2D 转换

✮ translate(x,y) 平移是一种利用x和y坐标值（单位为px）定位元素的方式，注意这个跟position的定位不一样，它参照的位置是它本身，但position参照的是父级。 

✮ rotate() 元素顺时针旋转给定的角度。允许负值，元素将逆时针旋转。单位为度数（deg）

✮ scale() 放大或缩小的倍数

✮ skew(x,y) 元素翻转或倾斜给定的角度。（单位为deg）

✮ matrix() 把所有 2D 转换方法组合在一起

```css
transform: rotate(45deg); /*顺时针旋转45度*/
transform: rotate(-45deg); /*逆时针旋转45度*/

transform: skew(30deg,10deg); /*在x轴方向逆时针偏斜30度，在y轴方向顺时针偏斜10度*/

transform: translate(10px,15px); /*向左移动10px，向下移动15px*/


/*多个transform类型的设置可以写一起的，之间用空格分隔，例如上面的可以这样写：*/
transform:rotate(45deg) skew(30deg,10deg) translate(10px,15px);

transform: scale(1.5, 0.8); /*宽度变为原来的1.5倍，高度变为原来的0.8倍*/
```

transform需要加浏览器前缀

```css
div {
    transform: rotate(30deg);
    -ms-transform: rotate(30deg);		/* IE 9 */
    -webkit-transform: rotate(30deg);	/* Safari and Chrome */
    -o-transform: rotate(30deg);		/* Opera */
    -moz-transform: rotate(30deg);		/* Firefox */
}
```

## 2D、3D转换浏览器支持

Internet Explorer 10、Firefox、Opera 支持 transform 属性。

Internet Explorer 9 支持替代的 -ms-transform 属性（仅适用于 2D 转换）。

Safari 和 Chrome 支持替代的 -webkit-transform 属性（3D 和 2D 转换）。

Opera 只支持 2D 转换。



# transition:过渡

[transition](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)

元素从一种样式逐渐改变为另一种的效果

## transition属性

[CSS3 transition 属性](http://www.w3school.com.cn/cssref/pr_transition.asp)

`transition: property duration timing-function delay;`

transiton: 过渡属性、 过渡所需要时间、 过渡动画函数、 过渡延迟时间；

|值|描述|
|---|---|
|transition-property|	规定设置过渡效果的 CSS 属性的名称。|
|transition-duration|	规定完成过渡效果需要多少秒或毫秒。|
|transition-timing-function|	规定速度效果的速度曲线。|
|transition-delay|	定义过渡效果何时开始。|

## transition示例

图片的宽高本来都是15px，想要让它1秒的时间内过渡到宽高为450px，通过：hover来触发。

```css
img{
    height:15px;
    width:15px;
    transition: 1s 1s height ease;/*合在一起*/
}
或者：
img{
    height：15px;
    width: 15px;
    transition-property: height;
    transition-duration: 1s;
    transition-delay: 1s;
    transition-timing-function: ease;/*属性分开写*/
}
img:hover{
    height: 450px;
    width: 450px;
}
```

### transition-property

不是所有属性都能过渡，只有属性具有一个中间点值才具备过渡效果。

[CSS animatable properties 完整列表](http://oli.jp/2010/css-animatable-properties/)

[具体效果](http://leaverou.github.io/animatable/)

### transition-duration

指定从一个属性到另一个属性过渡所要花费的时间。默认值为 0，为 0 时，表示变化是瞬时的，看不到过渡效果。

### transiton-timing-function

❀ liner ：匀速 

❀ ease ：慢速开始，然后变快，然后慢速结束的过渡效果

❀ ease-in：先慢后快

❀ ease-out：先快后慢 

❀ ease-in-out：先慢后快再慢

❀ cubic-bezier(n,n,n,n)：三次贝塞尔曲线, n 可能的值是 0 至 1 之间的数值。[可以定制](http://cubic-bezier.com/#.06,.88,.84,.24)

## transition触发过渡

单纯的代码不会触发任何过渡操作，需要通过用户的行为（如点击，悬浮等）触发，可触发的方式有： 

✩ :hoever 

✩ :focus 

✩ :checked 

✩ 媒体查询触发 

✩ JavaScript触发

## transition浏览器支持

Internet Explorer 10、Firefox、Opera 和 Chrome 支持 transition 属性。

Safari 支持替代的 -webkit-transition 属性。

注释：Internet Explorer 9 以及更早版本的浏览器不支持 transition 属性。

## transition优缺点

✔ 优点：

（1）简单易用

（2）与javascript的交互。animation与js的交互不是很紧密。tranistion和js的结合更强大。js设定要变化的样式，transition负责动画效果，天作之合，比之前只能用js时爽太多。

✘ 缺点：

（1）transition 需要事件触发，所以没法在网页加载时自动发生。 

（2）transition 是一次性的，不能重复发生，除非一再触发。 

（3）transition 只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态。

CSS Animation就是为了解决这些问题而提出的。


# animation

CSS3的animation属性可以像Flash制作动画一样，通过控制关键帧来控制动画的每一步，实现更为复杂的动画效果。ainimation实现动画效果主要由两部分组成： 

1）@keyframes 规则用于创建动画。在 @keyframes 中规定某项 CSS 样式，就能创建由当前样式逐渐改为新样式的动画效果。； 

2）在 animation 属性中调用关键帧声明的动画。

## @keyframes 规则

[@keyframes 规则](http://www.w3school.com.cn/css3/css3_animation.asp)

用百分比来规定变化发生的时间，可以在这个规则上创建多个百分比。

0% 是动画的开始，100% 是动画的完成。

为了得到最佳的浏览器支持，建议`始终定义 0% 和 100% 选择器`。

示例: 改变背景色和位置

```css
@keyframes myfirst {
    0%   { background: red; left:0px; top:0px;}
    25%  { background: yellow; left:200px; top:0px;}
    50%  { background: blue; left:200px; top:200px;}
    75%  { background: green; left:0px; top:200px;}
    100% { background: red; left:0px; top:0px;}
}
```
@keyframes必须要加浏览器前缀 -webkit-,-o-,-ms-,-moz-
```css
@-moz-keyframes myfirst /* Firefox */
{
    0%   {background: red; left:0px; top:0px;}
    25%  {background: yellow; left:200px; top:0px;}
    50%  {background: blue; left:200px; top:200px;}
    75%  {background: green; left:0px; top:200px;}
    100% {background: red; left:0px; top:0px;}
}

@-webkit-keyframes myfirst /* Safari 和 Chrome */
{
    0%   {background: red; left:0px; top:0px;}
    25%  {background: yellow; left:200px; top:0px;}
    50%  {background: blue; left:200px; top:200px;}
    75%  {background: green; left:0px; top:200px;}
    100% {background: red; left:0px; top:0px;}
}

@-o-keyframes myfirst /* Opera */
{
    0%   {background: red; left:0px; top:0px;}
    25%  {background: yellow; left:200px; top:0px;}
    50%  {background: blue; left:200px; top:200px;}
    75%  {background: green; left:0px; top:200px;}
    100% {background: red; left:0px; top:0px;}
}
```

## animation 属性

[animation 属性](http://www.w3school.com.cn/cssref/pr_animation.asp)

`animation: name duration timing-function delay iteration-count direction;`

默认值: none 0 ease 0 1 normal

animation 属性是一个简写属性，用于设置六个动画属性：

|值|描述|默认值|
|---|---|---|
|animation-name|	规定需要绑定到选择器的 keyframe 名称。|none|
|animation-duration|	规定完成动画所花费的时间，以秒或毫秒计。|0|
|animation-timing-function|	规定动画的速度曲线。|ease|
|animation-delay|	规定在动画开始之前的延迟。|0|
|animation-iteration-count|	规定动画应该播放的次数。|1|
|animation-direction|	规定是否应该轮流反向播放动画|normal|
|animation-play-state|	规定动画是否正在运行或暂停。|running|
|animation-fill-mode|	规定对象动画时间之外的状态。|none|

实例：把 "myfirst" 动画捆绑到 div 元素，时长：5 秒：

```css
div {
    animation: myfirst 5s;
    -moz-animation: myfirst 5s;	/* Firefox */
    -webkit-animation: myfirst 5s;	/* Safari 和 Chrome */
    -o-animation: myfirst 5s;	/* Opera */
}
```

注释：必须规定 `动画的名称` 和 `动画的时长` animation-duration 属性，否则时长为 0，就不会播放动画了。

```css
div {
    animation: myfirst 5s linear 2s infinite alternate;
    /* Firefox: */
    -moz-animation: myfirst 5s linear 2s infinite alternate;
    /* Safari 和 Chrome: */
    -webkit-animation: myfirst 5s linear 2s infinite alternate;
    /* Opera: */
    -o-animation: myfirst 5s linear 2s infinite alternate;
}
```

## @keyframes和animation浏览器支持

Internet Explorer 10、Firefox 以及 Opera 支持  @keyframes 规则和 animation 属性。

Safari 和 Chrome 支持替代的 -webkit-animation 属性。

注释：Internet Explorer 9 以及更早的版本不支持 @keyframe 规则或 animation 属性。

# transform和transition区别

transform 属性只对元素进行变换，不会产生过渡效果。

# animation和transition的区别

1. 触发条件不同。transition通常和hover等事件配合使用，由事件触发。animation则和gif动态图差不多，立即播放。

2. 循环。 animation可以设定循环次数。

3. 精确性。 animation可以设定每一帧的样式和时间。tranistion 只能设定头尾。 animation中可以设置每一帧需要单独变化的样式属性， transition中所有样式属性都要一起变化。

4. 与javascript的交互。animation与js的交互不是很紧密。tranistion和js的结合更强大。js设定要变化的样式，transition负责动画效果，天作之合，比之前只能用js时爽太多。

# transform, transition, animation使用场景

CSS3 有3种和动画相关的属性：transform, transition, animation。

其中 transform 描述了元素静态样式。而transition 和 animation 却都能实现动画效果。

所以三者之中transform 常常配合后两者使用，在页面实现酷炫的五毛（或五元）特效。

1. 如果要灵活定制多个帧以及循环，用animation.

2. 如果要简单的过渡效果，用 transition.

3. 如果要使用js灵活设定动画属性，用transition.

变换元素transform和过渡元素transition混合使用:

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css">
		.pic{
			width: 400px;
			margin:80px auto;
			background: #d8effe;
			padding: 10px;
		}
		.pic img{
			margin:5px;
			padding: 5px;
			width: 135px;
			border:1px solid black;
			background: white;
			transition: all 1s;
		}
		.pic img:hover{
			transform: scale(2.2) rotate(20deg);
		}
 
	</style>
</head>
<body>
	<div class="pic">
		<img src="one.jpg">
		<img src="two.jpg">
		<img src="three.jpg">
		<img src="four.jpg">
		<img src="five.jpg">
	</div>
</body>

```


# 更多-more

[【CSS3】transition过渡和animation动画](https://blog.csdn.net/XIAOZHUXMEN/article/details/52003135)

[css3动画模块transform transition animation属性解释](https://www.cnblogs.com/mofish/archive/2013/01/14/2860212.html)

[transform, transition, animation区别和使用场景](https://blog.csdn.net/jdk137/article/details/50474129)
