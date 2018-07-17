---
layout: post
title: css布局position属性
tags:
- CSS-Basic
categories: CSS
description: css布局position属性
---

# css布局position属性

position属性值  
/* Keyword values */
```css
position: static;
position: relative;
position: absolute;
position: fixed;
position: sticky;
```

/* Global values */
```css
position: inherit;
position: initial;
position: unset;
```

# position: static
默认值。  
一般不设置position属性时，会按照正常的文档流进行排列。  
没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。

# position: relative
生成相对定位的元素，相对于本身的正常位置进行定位。  
没有脱离文档流的,元素仍保持其未定位前的形状，它原本所占的空间仍保留。  
对父亲和兄弟盒子都没有任何影响,但偏移会覆盖在相邻元素上面。  

demo-1

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
.box1{
	float: left;
	width: 100px;
	height: 100px;
	background: #f60;
}
.box2{
	position: relative;
	left:-20px;
	top: 20px;
	float: left;
	width: 120px;
	height: 100px;
	background: #9f3;
}
.box3{
	float: left;
	width: 100px;
	height: 100px;
	background: #39f;
}
</style>
<body>

	<div class="box1">box1</div>
	<div class="box2">box2</div>
	<div class="box3">box3</div>
	
</body>
</html>
{% endhighlight %}

**_result display_**
<div class="rd">
    <img src="/assets/images/2016/10-11-12/position-relative.png" alt="">
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
.wrap{
	position: absolute;
	margin: 30px;
	padding: 30px;
	border: 1px solid #ccc;
}
.box1{
	position: relative;
	margin-left: 100px;
	width: 100px;
	height: 100px;
	background: #f60;
}
.box2{
	position: relative;
	z-index: 2;
	left:-20px;
	top: 20px;
	width: 100px;
	height: 100px;
	background: #9f3;
}
.box3{
	width: 100px;
	height: 100px;
	background: #39f;
}
</style>
<body>
<div class="wrap">
	<div class="box1">box1</div>
	<div class="box2">box2</div>
	<div class="box3">box3</div>
</div>	
</body>
</html>
{% endhighlight %}

**_result display_**
<div class="rd">
    <img src="/assets/images/2016/10-11-12/position-relative-2.png" alt="">
</div>

补充说明：

1.如果设定TRBL，并且父级（wrap）没有设定position属性，box1以父级的左上角为原点进行定位(和absolute不同)  
2.如果设定TRBL，并且父级（wrap）设定position属性(无论是absolute还是relative)，box1仍旧以父级的左上角为原点进行定位，位置由TRBL决定(前半段和absolute一样)。  
3.如果父级（wrap）有Padding属性，那么box1就以内容区域的左上角为原点，进行定位(后半段和absolute不同)。  
4.相对定位（比如：box1）总是以父级（这里是wrap）左上角为原点进行定位的，如果父级不存在，则以浏览器左上角进行定位。


demo-3

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
.wrap{
	position: relative;
	margin: 30px;
	padding: 30px;
	border: 10px solid #ccc;
}
.box1{
	position: relative;
	top: 0;
	left: 0;
	width: 100px;
	height: 100px;
	background: #f60;
}
.box2{
	position: relative;
	left:-20px;
	top: 20px;
	width: 100px;
	height: 100px;
	background: #9f3;
}
.box3{
	position: relative;
	z-index: 1;
	width: 100px;
	height: 100px;
	background: #39f;
}
</style>
<body>

    <div class="wrap">
        <div class="box1">box1</div>
        <div class="box2">box2</div>
        <div class="box3">box3</div>
    </div>	

</body>
</html>
{% endhighlight %}

**_result display_**
<div class="rd">
    <img src="/assets/images/2016/10-11-12/position-relative-3.png" alt="">
</div>

说明：

1.position:relative会保留自己在z-index:0层的占位，box3提升z-index大于0后覆盖在box2默认的z-index：0上。  

2.当父元素（wrap）有padding属性时，box1设置position: relative;top: 0;left: 0;后，左上的位置仍旧能保留空白padding

# position: absolute

1.绝对定位的框从标准流中脱离，这意味着他们对其后的兄弟盒子的定位没有影响，其他的盒子好像就好像这个盒子不存在一样;  
2.元素设置成absolute后会脱离文档流，并且不占有原本的空间，后面的元素会顶替上去，  
3.而且不论元素是行内元素还是块级元素，都会生成一个块级框，也就是例如行内元素span设置了absolute后就可以设置height和width属性了。  
4.如果父级（无限）没有设定position属性，那么当前的absolute则结合TRBL属性以浏览器左上角为原始点进行定位;  
5.如果父级（无限）设定position属性，那么当前的absolute则结合TRBL属性以父级（最近）的左上角为原始点进行定位。

demo-1

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
.wrap{
	margin: 30px;
	padding: 30px;
	border: 10px solid #ccc;
}
.box1{
	position: absolute;
	left: 0;
	top: 0;
	width: 100px;
	height: 100px;
	background: #f60;
}
.box2{
	position: relative;
	left: 0;
	top: 0;
	width: 100px;
	height: 100px;
	background: #9f3;
}
</style>
<body>
	<div class="wrap">
		<div class="box1">box1</div>
		<div class="box2">box2</div>
	</div>	
</body>
</html>
{% endhighlight %}

**_result display_**
<div class="rd">
    <img src="/assets/images/2016/10-11-12/position-absoulte.png" alt="">
</div>

说明：

1.如果设定TRBL，并且父级（wrap）没有设定position属性，那么当前（box1）的absolute则以浏览器左上角为原始点进行定位，位置将由TRBL决定。  

2.当两个元素的position值为relative或者absoulte或者fixed，且位置发生重叠，都没有设置z-index属性，后面的元素会覆盖在前面的元素上。

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
.wrap{
	position: relative;
	margin: 30px;
	padding: 30px;
	border: 10px solid #ccc;
}
.box1{
	position: absolute;
	left: 0;
	top: 0;
	width: 100px;
	height: 100px;
	background: #f60;
}
</style>
<body>
	<div class="wrap">
		<span class="box1">box1</span>
	</div>
		
</body>
</html>
{% endhighlight %}

**_result display_**
<div class="rd">
    <img src="/assets/images/2016/10-11-12/position-absoulte-2.png" alt="">
</div>

说明：

1.如果设定TRBL，并且父级设定position属性(无论是absolute还是relative或者fixed)，则以父级的左上角为原点进行定位，位置由TRBL决定；  

2.当父级元素有padding属性时，	设置position: absolute;left: 0;top: 0;会忽略padding如上。  

3.span设置position:absoulte属性后变成块级联，能设置width,height，而且不占有原本的空间。

# position: fixed
fixed就是相对于浏览器窗口进行偏移  
其包含块是视窗本身。即便页面滚动，它还是会停留在相同的位置。


# summary 

TRBL属性（TOP、RIGHT、BOTTOM、LEFT）只有当设定了position属性才有效

position:relative和position:absolute都可以改变元素在文档中的位置，都能激活元素的left、top、right、bottom和z-index属性。（默认这些属性未激活，设置了也无效）

**当父元素有padding时，子元素设置position:relative和position:absolute，子元素定位会忽略掉父元素的padding吗？**

☣ position:relative

- 子元素设置position:relative, 总是以父级左上角为原点进行定位的, 无论父级是否设定position属性(absolute、relative)，

- 如果父级有padding属性，子元素以内容区域的左上角为原点（保留空白padding）。

☣ position:absolute

- 子元素设置position:absolute，是相对于【父级包含块】来定位的，即距离最近的设置position属性(absolute、relative)那个元素，

- 当【父级包含块】有padding属性时，子元素设置position: absolute;left: 0;top: 0;会忽略padding。


**设置position:relative和position:absolute都会让元素浮起来，会改变正常情况下的文档流???**

不同：

position:relative会保留自己在z-index:0层的占位，left、top、right、bottom值是相对于自己在z-index层的位置。

position:absolute会完全脱离文档流，不再z-index:0层保留占位符，其left、top、right、bottom值是相对于自己最近的一个设置了position:relative或position:absolute或position:fixed的祖先元素的，如果祖先元素全都没有设置，那么就相对于body元素




# 更多-more
- [http://www.w3school.com.cn/cssref/pr_class_position.asp](http://www.w3school.com.cn/cssref/pr_class_position.asp)
- [https://developer.mozilla.org/en/docs/Web/CSS/position#Sticky_positioning](https://developer.mozilla.org/en/docs/Web/CSS/position#Sticky_positioning)
- [http://learnlayout.com/position.html](http://learnlayout.com/position.html)









































