---
layout: post
title: js事件委托
tags:
- DOM
- optimize
categories: JS
description: js事件委托
---

# js事件委托

# what is Event Delegation
事件就是onclick，onmouseover，onmouseout，等就是事件。  
事件委托是指目标元素将自身的响应事件委托给其父级元素来响应。  
事件委托的工作原理基于浏览器的冒泡机制。

# why use Event Delegation
1. 在JavaScript中，添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能，因为需要不断的与dom节点进行交互，访问dom的次数越多，引起浏览器重绘与重排的次数也就越多，就会延长整个页面的交互就绪时间，这就是为什么性能优化的主要思想之一就是减少DOM操作的原因；如果要用事件委托，就会将所有的操作放到js程序里面，与dom的操作就只需要交互一次，这样就能大大的减少与dom的交互次数，提高性能；

2. 每个函数都是一个对象，是对象就会占用内存，对象越多，内存占用率就越大，自然性能就越差了，比如有100个li，就要占用100个内存空间，如果是1000个，10000个呢？？？如果用事件委托，那么我们就可以只对它的父级（如果只有一个父级）这一个对象进行操作，这样我们就需要一个内存空间就够了，省了很多，自然性能就会更好。

# how to realize Event Delegation
比如要实现，点击每个li，弹出里面的内容

{% highlight html linenos %}
<ul id="list">
	<li id="item1">item 1</li>
	<li id="item2">item 2</li>
	<li id="item3">item 3</li>
	<li id="item4">item 4</li>
</ul>
{% endhighlight %}

一般做法
```js
window.onload = function(){
	var oLi = document.getElementsByTagName("li");

	for(var i = 0; i < oLi.length; i++) {
		oLi[i].onclick = function(){
			alert(this.innerHTML);
		}
	}
}
```
用事件代理方式
```js
var oUl = document.getElementById("list");

oUl.addEventListener("click",function(e){
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if(target.nodeName.toLowerCase() == "li"){
        alert(target.innerHTML);
    }
},false);
```

现在讲的都是document加载完成的现有dom节点下的操作，那么如果是新增的节点，新增的节点会有事件吗？
正常的添加节点的方法：

{% highlight html linenos %}
<input type="button" id="btn" value="新增">
<ul id="list">
	<li id="item1">item 1</li>
	<li id="item2">item 2</li>
	<li id="item3">item 3</li>
	<li id="item4">item 4</li>
</ul>
{% endhighlight %}

一般的做法

```js
window.onload = function(){
	var oUl = document.getElementById("list");
	var oBtn = document.getElementById("btn");
	var oLi = document.getElementsByTagName("li");
	var iNow = 4;

	//添加新节点
	oBtn.onclick = function(){
		iNow++;
		var aLi = document.createElement("li");
		aLi.innerHTML = "item " + iNow;
		oUl.appendChild(aLi);
	}

	//鼠标移入背景变橙色，移出变白
	for(var i = 0; i < oLi.length; i++){
		oLi[i].onmouseover = function(){
			this.style.background = "#f60";
		}
		oLi[i].onmouseout = function(){
			this.style.background = "";
		}
	}
}   
```

新增的li是没有事件的，说明添加子节点的时候，事件没有一起添加进去
一般的解决方案会是这样，将for循环用一个函数包起来，命名为mHover，如下：

```js
var oUl = document.getElementById("list");
var oBtn = document.getElementById("btn");
var oLi = document.getElementsByTagName("li");
var iNow = 4;

//添加新节点
oBtn.onclick = function(){
    iNow++;
    var aLi = document.createElement("li");
    aLi.innerHTML = "item " + iNow;
    oUl.appendChild(aLi);
    mHover();
}
function mHover(){
    for(var i = 0; i < oLi.length; i++){
        oLi[i].onmouseover = function(){
            this.style.background = "#f60";
        }
        oLi[i].onmouseout = function(){
            this.style.background = "";
        }
    }
}
mHover();
```

虽然功能实现了，但又增加了一个dom操作，在优化性能方面是不可取的。

```js
var oUl = document.getElementById("list");
var oBtn = document.getElementById("btn");
var oLi = document.getElementsByTagName("li");
var iNow = 4;

//添加新节点
oBtn.onclick = function(){
    iNow++;
    var aLi = document.createElement("li");
    aLi.innerHTML = "item " + iNow;
    oUl.appendChild(aLi);
}

oUl.addEventListener("mouseover",function(e){
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if(target.nodeName.toLowerCase() == "li"){
        target.style.background = "#f60";
    }
},false);

oUl.addEventListener("mouseout",function(e){
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if(target.nodeName.toLowerCase() == "li"){
        target.style.background = "";
    }
},false);
```

事件委托的方式，新添加的元素还会有之前的事件。

# The benefits of using event delegation

- 1.管理的函数变少，不需要为每个元素都添加事件监听函数。

- 2.可以动态的增加和修改元素，无需因为元素的改动而修改事件绑定。

- 3.Javascript和DOM节点之间的关联变少，降低了循环引用的导致内存泄漏的可能性。

# The Shortcomings of using event delegation
如果绑定监听器的父元素和目标元素的层级相距较远，那么在冒泡过程中会消耗一定的时间。

# 更多-more











































