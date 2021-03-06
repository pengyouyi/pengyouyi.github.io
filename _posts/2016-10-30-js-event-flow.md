---
layout: post
title: DOM事件流
tags:
- DOM
categories: JS
description: DOM事件流
---

# DOM事件流
DOM事件流

DOM2级事件规定事件包括三个阶段：

① 事件捕获阶段

② 处于目标阶段

③ 事件冒泡阶段

{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>
	<div id="myDiv"></div>		
</body>
</html>
{% endhighlight %}

# 事件捕获event capturing
如果点击div元素，事件捕获的传播顺序  

**  window对象  
(1) document对象  
(2) html  
(3) body  
(4) div  

尽管“DOM2级事件”规范要求事件应该从document对象开始传播和结束，但大部分兼容标准的浏览器会继续将事件的捕获和冒泡延伸到window对象。  

由于老版本的浏览器（such as: IE8及以下版本）不支持事件流，所以很少有人使用事件捕获。

# 事件冒泡event bubbling
如果点击div元素，事件冒泡的传播顺序  
(1) div  
(2) body  
(3) html  
(4) document  
**  window对象  

注：【IE9、Firefox、chrome、Safari 会将事件冒泡到window对象】

所有现代浏览器都支持事件冒泡，可以放心用。

我们在注册事件的时候，通常使用的是 捕获 或者 冒泡 的 一种：

{% highlight js linenos %}
obj.addEventListener("click", func, true); // 捕获方式
obj.addEventListener("click", func, false); // 冒泡方式
{% endhighlight %}

事件只会因为捕获或者冒泡触发一次。

example-1

{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
<style type="text/css">
   #p { width: 300px; height: 300px; padding: 10px;  border: 1px solid black; }
   #c { width: 100px; height: 100px; border: 1px solid red; }
</style>
</head>
<body>
	<div id="p">
        parent
        <div id="c">
            child
        </div>
    </div>	
    <script>
    	window.onload = function(){
    		var p = document.getElementById("p"),
    			c = document.getElementById("c");
    		c.addEventListener("click",function(){
    			console.log('子节点捕获');
    		},true);
    		c.addEventListener("click",function(){
    			console.log('子节点冒泡');
    		},false);
    	}
    </script>
</body>
</html>
{% endhighlight %}

**_result display_**
<div class="rd">
<img src="/assets/images/2016/10-11-12/event-bubbling.png" alt="">
</div>

example-2

{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
<style type="text/css">
   #p { width: 100px; height: 100px; padding: 10px;  border: 1px solid black; }
   #c { width: 60px; height: 60px; border: 1px solid red; }
</style>
</head>
<body>
	<div id="p">
        parent
        <div id="c">
            child
        </div>
    </div>	
    <script>
    	window.onload = function(){
    		var p = document.getElementById("p"),
    			c = document.getElementById("c");
    		p.addEventListener("click",function(){
    			console.log('父节点捕获');
    		},true);
    		c.addEventListener("click",function(){
    			console.log('子节点捕获');
    		},true);
    		c.addEventListener("click",function(){
    			console.log('子节点冒泡');
    		},false);
    		p.addEventListener("click",function(){
    			console.log('父节点冒泡');
    		},false);
    	}
    </script>
</body>
</html>
{% endhighlight %}

**_result display_**
<div class="rd">
<img src="/assets/images/2016/10-11-12/event-capturing.png" alt="">
</div>

# event capturing 完整例子

{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>
	
	<div id="myDiv">click me, 事件捕获完整阶段</div>	

<script>
    var myDiv = document.getElementById("myDiv");

    myDiv.addEventListener("click", function() {
    	console.log("div 事件捕获");
    },true);
    
    myDiv.addEventListener("click", function() {
    	console.log("div 事件捕获，once again");
    },true);

    myDiv.addEventListener("click", function() {
    	console.log("div 事件冒泡");
    },false);
	
    window.addEventListener("click", function() {
    	console.log("window 事件捕获");
    },true);

    document.addEventListener("click", function() {
    	console.log("document 事件捕获");
    },true);

    document.documentElement.addEventListener("click", function() {
    	console.log("html 事件捕获");
    },true);

    document.body.addEventListener("click", function() {
    	console.log("body 事件捕获");
    },true);
</script>		
</body>
</html>
{% endhighlight %}

在div事件捕获阶段注册的两个事件按照注册顺序执行

**_result display_**
<div class="rd">
    <img src="/assets/images/2016/10-11-12/10-30-1.png" alt="">
</div>

# 给一个dom同时绑定两个点击事件

- 我们给一个dom同时绑定两个点击事件，一个用捕获，一个用冒泡。会执行几次事件，会先执行冒泡还是捕获？

> 如果点击的为目标元素，`目标元素`的事情按`事件定义的顺序`从上到下顺序执行，

> 而`其他元素`根据W3C的标准执行，即`先捕获后冒泡`。

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
<style>

</style>
</head>
  <div id="p">
    parent
    <div id="c">
      child
    </div>
  </div>
<body>
<script>

window.onload = function(){
    var p = document.getElementById('p'),
        c = document.getElementById('c');
    p.addEventListener('click', function (e) {
      alert('父节点冒泡')
    }, false);
    c.addEventListener('click', function (e) {
      alert('子节点捕获')
    }, true);
    c.addEventListener('click', function (e) {
      alert('子节点冒泡')
    }, false);
    p.addEventListener('click', function (e) {
      alert('父节点捕获')
    }, true);
}
</script>
</body>
</html>
```

如果点击parent: 父节点冒泡, 父节点捕获;

如果点击child: 父节点捕获, 子节点捕获, 子节点冒泡, 父节点冒泡

[W3C下的冒泡和捕获机制。到底是冒泡呢。还是捕获呢。一个DOM元素绑定多个事件时如何执行。](https://blog.csdn.net/u011719449/article/details/23787627)

# 更多-more










































