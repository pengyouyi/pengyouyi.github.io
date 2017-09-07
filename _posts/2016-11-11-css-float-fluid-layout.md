---
layout: post
title: css布局之float流体布局
tags:
- 布局
categories: CSS
description: css布局之float流体布局
---

# css布局之float与流体布局

# float的滥用
典型的浮动砌砖头方法来布局，固定尺寸+float。

# float 固定布局

但这种布局带来的问题较多。比如：

1.容错性比较槽糕，容易出现问题，牵一发而动全身；  
2.砌砖布局需要元素固定尺寸，难以重复使用；  
3.在低版本的IE下会有很多问题。

demo- 固定布局

{% highlight html linenos %}
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>test</title>
<style>
*{
    margin: 0;
    padding: 0;
}
.wrap{
  overflow: hidden;
  width: 600px;
  margin: 20px auto;
  line-height: 30px;
  border:1px solid red;
}
h3 {
  text-align: center;
  line-height: 40px;
}
.box1 {
  float: left;
  width: 150px;
  height: 200px;
  background-color: #ccc;
}
/* 固定布局写法 */
.box2 {
  float: right;
  width: 400px;
  height: 200px;
  background-color: #eaeaea;
}
/*清除浮动造成的影响*/
.clearfix:after{content: '';display: table;clear: both;}
.clearfix{*zoom:1;}
</style>
</head>
<body>

    <div class="wrap">
      <h3>固定布局</h3>
      <div class="box1">
          <p>box1</p>
          <p>float:left</p>
          <p>设置width值</p>
      </div>
      <div class="box2">
        <p>box2</p>
        <p>float:right</p>
        <p>设置width值</p>
      </div>
    </div>

</body>
</html>
{% endhighlight %}

**_result display_**
<div class="rd">
    <img src="/assets/images/2016/10-11-12/11-11-1.png" alt="">
</div>

# float与流体布局

## float与单侧尺寸固定的流体布局

demo

{% highlight html linenos %}
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>浮动与单侧尺寸固定的流体布局</title>
<style>
*{
    margin: 0;
    padding: 0;
}
.wrap {
    width: 600px;
    margin: 20px auto;
    line-height: 30px;
    border: 1px solid red;
}
h3 {
  text-align: center;
  line-height: 40px;
}
.box1 {
    float: left;
    width: 200px;
    height: 200px;
    background: #f93;
}
/* 流体布局写法 */
.box2 {
    height: 300px;
    margin-left: 220px;
    background: #f39;
}
/*清除浮动造成的影响*/
.clearfix:after{content: '';display: table;clear: both;}
.clearfix{*zoom:1;}
</style>
</head>
<body>
  <div class="wrap">
    <h3>左侧固定的流体布局</h3>
    <div class="box1">
      <p>box1</p>
      <p>float:left</p>
      <p>设置width值</p>
    </div>
    <div class="box2">
      <p>box2</p>
      <p>margin-left:box1.width</p>
    </div>
  </div> 
   
</body>
</html>
{% endhighlight %}

**_result display_**
<div class="rd">
    <img src="/assets/images/2016/10-11-12/11-11-2.png" alt="">
</div>

## float与浮动与两侧皆自适应的流体布局

{% highlight html linenos %}
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>浮动与两侧皆自适应的流体布局</title>
<style>
.wrap {
	width: 600px;
	overflow: hidden;
	margin: 20px auto; 
	border: 1px solid red;
}
h3 {
	text-align: center;
}
/* 浮动与两侧皆自适应的流体布局写法*/
.box1 {
	float: left;
	height: 200px;
	margin-right:20px;
	background: #39f;
}
.box2 {
	display: table-cell; 
	*display: inline-block; /*兼容IE6、7*/
	width: 2000px; 
	*width: auto;
	height:300px;
	background: #93f; 
}
/*清除浮动造成的影响*/
.clearfix:after{content: '';display: table;clear: both;}
.clearfix{*zoom:1;}

</style>
</head>
<body>

<div class="wrap">
	<h3>浮动与两侧皆自适应的流体布局</h3>
	<div class="box1">
		<p>box1</p>
		<p>float:left</p>
		<p>margin-right:Xpx</p>
	</div>
	<div class="box2">
		<p>box2</p>
		<p>display:teble-cell</p>
		<p>display:inline-block/*兼容IE6、7*/</p>
		<p>width:auto</p>
	</div>
</div>

</body>
</html>
{% endhighlight %}

**_result display_**
<div class="rd">
    <img src="/assets/images/2016/10-11-12/11-11-3.png" alt="">
</div>




































