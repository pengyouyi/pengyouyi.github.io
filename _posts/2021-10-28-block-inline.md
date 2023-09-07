---
layout: post
title: block & inline 元素区别
tags:
- CSS-Basic
- layout
categories: CSS
description: block & inline 元素区别
---

block & inline 元素区别

# block元素特性
总是独占一行，表现为另起一行开始，而且其后的元素也必须另起一行显示;  
宽度(width)、高度(height)、内边距(padding)和外边距(margin)都可设置;

块级元素其高度为其内容高度，宽度会扩展到与父元素同宽；  
修改 width 后，并不会使得其下面的行内元素向上移动。

# inline元素特性
行内元素其高度为其内容高度，宽度会收缩包裹其内容。

和相邻的内联元素在同一行;  
宽度(width)、高度(height)、
内边距的 (padding-top/padding-bottom) 和
外边距的 (margin-top/margin-bottom) 都不可设置，

行内元素不能包含块级元素，只能容纳文字或图片或者其他行内元素;

内联元素的 margin-left / margin-right 及 padding-left / padding-rigtht 是可以控制的，所以可以通过这4个属性来控制内联元素的宽度。

可以通过 line-height 来设置占位高度；
设置 padding 只有左右 padding 有效，上下则无效。注意元素范围是增大了，但是对元素周围的内容是没影响的。

【总结：】

> 块级元素，独占一行，宽高可设置，margin、padding 生效。
> 行内元素，不独占一行，宽高不可设，margin 和 padding 左右有效，上下无效。

以下demo-1得以验证上面的inline元素特征

{% highlight html linenos %}
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
.demo{
	width: 100px;
	height: 100px;
	line-height: 100px;
	border: 1px solid red;
}
.a,.b{
	width: 200px;
	height: 200px;
	margin: 10px;
	padding: 10px;
	/*line-height: 20px;*/  /*line-height超过inline内容所占高度会挤压下面的元素下移*/
	border: 10px solid green;
}
</style>
<body>
	<div class="demo">a</div>
	<span class="a">1</span>
	<span class="b">2</span>
	<div class="demo">b</div>
</body>
</html>
{% endhighlight %}

**_result display_**
<div class="rd">
    <img src="/assets/images/2016/10-11-12/inline-margin.png" alt="">
</div>

demo-2
{% highlight html linenos %}
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
.demo{
	width: 100px;
	height: 100px;
	line-height: 100px;
	border: 1px solid red;
}
.a,.b{
	margin: 0;
	padding: 0;
	border: 10px solid green;
}
</style>
<body>
	<div class="demo">a</div>
	<span class="a">1</span>
	<span class="b">2</span>
	<div class="demo">b</div>
</body>
</html>
{% endhighlight %}
**_result display_**
<div class="rd">
    <img src="/assets/images/2016/10-11-12/inline-border.png" alt="">
</div>

说明：  
1.给inline元素设置border,可见，垂直边框并不占据文档流，并不会导致下面元素的向下移动（与block元素不同），但是对左右相连的元素却有影响。    
2.两个span标签之间有空隙，解决办法写法<span class="a">1</span><span class="b">2</span>相连，或者用注释等办法，或下面的方法。    
3.给span设置margin:0;padding:0;两个span元素中间仍有空隙。

思考，display:inline的元素之间的空隙是如何产生的，enter换行符？待研究。。。

# 替换元素与非替换元素-replaceable
从元素本身的特点来讲，可以分为替换和不可替换元素。

## 替换元素-Replacement element
几乎所有替换元素都是行内元素。   
替换元素就是浏览器根据元素的标签和属性，来决定元素的具体显示内容。  
例如浏览器会根据\<img\>标签的src属性的值来读取图片信息并显示出来，而如果查看(X)HTML代码，则看不到图片的实际内容；  
又例如根据\<input\>标签的type属性来决定是显示输入框，还是单选按钮等。  
(X)HTML中的\<img\>、\<input\>、\<textarea\>、\<select\>、\<object\>都是替换元素。这些元素往往没有实际的内容，即是一个空元素

替换元素元素表现特殊。display:inline; 但是可是设置margin、paddding

替换元素一般有内在尺寸，所以具有width和height，可以设定。例如你不指定img的width和height时，就按其内在尺寸显示，也就是图片被保存的时候的宽度和高度。  
对于表单元素，浏览器也有默认的样式，包括宽度和高度。

行内非替换元素：其宽高设置无效， 对于内外边距，边框，可以设置，但是垂直方向的设置并不会影响文档流布局，所以设置垂直内外边距是没有效果的，垂直边框，我们是看得见，但是垂直边框并不占据文档流 。所以上面的行内元素设置了宽度为10px的边框，并不会导致下面元素的向下移动。

行内替换元素设置高度等同于设置行高，会垂直居中。

demo-input

{% highlight html linenos %}
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
.demo{
	width: 100px;
	height: 50px;
	border: 1px solid red;
}
input{
	height:80px;
	line-height: 100px;
	border: 10px solid #eaeaea;
}
</style>
<body>
	<div class="demo">a</div>
	<input type="text">
	<span>123</span>
	<input type="text">
	<div class="demo">b</div>
</body>
</html>
{% endhighlight %}

**_result display_**
<div class="rd">
    <img src="/assets/images/2016/10-11-12/inline-input.png" alt="">
</div>

## 不可替换元素-Non replaceable element

(X)HTML 的大多数元素是不可替换元素，即其内容直接表现给用户端（例如浏览器），如p a span div这些。
margin 行内元素的边距，不会合并（替换非替换）。不同于块级元素，会合并上下，左右边距。

more替换元素和非替换元素  
[http://blog.csdn.net/jlds123/article/details/8647448](http://blog.csdn.net/jlds123/article/details/8647448)

# display:inline-block 空隙问题解决
{% highlight html linenos %}
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
{% endhighlight %}

# 行内元素与块级元素的转换-transformation
## display
块级元素默认display:block;  
行内非替换元素(a,span)默认为display:inline;  
行内替换元素(input)默认为display:inline-block;  

- display:none;不显示该元素，也不会保留该元素原先占有的文档流位置。
- display:block;转换为块级元素。
- display:inline;转换为行内元素。
- display:inline-block;转换为行内块级元素。

display more  
[http://www.w3school.com.cn/cssref/pr_class_display.asp](http://www.w3school.com.cn/cssref/pr_class_display.asp)

## float
当把行内元素设置完float:left/right后，该行内元素的display属性会被赋予block值，且拥有浮动特性。行内元素去除了之间的莫名空白  
demo-span

{% highlight html linenos %}
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
.demo{
	border:2px solid #9f3;
}
.test{
	float: left;
	width: 60px;
	height: 60px;
	/*margin: 10px;*/
	padding: 10px;
	border: 10px solid #f39;
	background: #ccc;
}
.demo2{
	clear: both;
	border:2px solid #9f3;
}
</style>
<body>
<div class="demo">a</div>
<span class="test">1</span>	
<span class="test">2</span>	
<div class="demo2">b</div>
</body>
</html>
{% endhighlight %}

**_result display_**
<div class="rd">
    <img src="/assets/images/2016/10-11-12/span-float.png" alt="">
</div>

## position
当为行内元素进行定位时，position:absolute，与position:fixed（position: relative不会），都会使原先的行内元素变为块级元素。

demo-inline-position

{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<style>
span{
	width: 100px;
	height: 100px;
}
.test{
	position: relative;
	background: #3f9;
}
.test2{
	position: absolute;
	background: #f60;
}
.test3{
	position: fixed;
	top: 100px;
	background: #39f;
}
</style>
<body>
	<span class="test">1</span>	
	<span class="test2">2</span>	
	<span class="test3">3</span>		
</body>
</html>
{% endhighlight %}

**_result display_**
<div class="rd">
    <img src="/assets/images/2016/10-11-12/span-position-fixed.png" alt="">
</div>

**_notice_**  
通过以上的设置，可以实现为行内非替换元素设置宽高及内外边距。但是替换时，还需要注意转换为块级元素只是，float与position的副作用，他们本身的作用还会干扰布局效果。

之前介绍块级元素时，会说，块级元素的宽度会继承其父元素。但是，只有为行内元素设置display:block;才会有这样的效果，其他转换之后并不会默认带来这个效果。



# 更多-more
+ [https://developer.mozilla.org/zh-CN/docs/Web/HTML/Block-level_elements](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Block-level_elements)
+ [https://developer.mozilla.org/zh-CN/docs/Web/HTML/Inline_elemente](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Inline_elemente)











































