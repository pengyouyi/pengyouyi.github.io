---
layout: post
title: 清除浮动带来的影响
tags:
- 布局
categories: CSS
description: 清除浮动带来的影响，以及清除浮动应用的原理
---

# 清除浮动带来的影响，以及清除浮动各自应用的原理

# 浮动工作原理
浮动的框可以左右移动，直至它的外边缘遇到包含框或者另一个浮动框的边缘。浮动框不属于文档中的普通流，当一个元素浮动之后，不会影响到块级框的布局而只会影响内联框（通常是文本）的排列，文档中的普通流就会表现得和浮动框不存在一样，当浮动框高度超出包含框的时候，也就会出现包含框不会自动伸高来闭合浮动元素（“高度塌陷”现象）。顾名思义，就是漂浮于普通流之上，像浮云一样，但是只能左右浮动。

# 为什么要清除浮动
当元素设置浮动属性后，会对相邻的元素产生影响，相邻元素特指紧邻后面的元素，紧邻其后的元素会受到浮动元素的影响；
浮动的元素脱离了普通流，这样使得包含它的父元素并不会因为这个浮动元素的存在而自动撑高，这样就会造成高度塌陷；
这样可能
影响兄弟元素还是高度塌陷的问题，会使布局错乱，所以我们需要想办法来清除浮动带来的额外影响。

# 清除浮动的方法
清除浮动的实质包括三种：CSS clear、BFC特性和触发haslayout。

## 1，父级div定义 height 

原理：父级div手动定义height，就解决了父级div无法自动获取到高度的问题。 

优点：简单、代码少、容易掌握 

缺点：只适合高度固定的布局，要给出精确的高度，如果高度和父级div不一样时，会产生问题 

建议：不推荐使用，只建议高度固定的布局时使用 

##  CSS clear清除浮动

清除浮动的属性有clear:left | right | both；

在浮动元素末尾添加一个新标签，例如：

{% highlight html linenos %}
<div style=”clear:both;”></div> (清除float:left 和 float:right的影响)
<div style=”clear:left;”></div> (清除float:left的影响，如果是float:right造成的浮动影响这样写无用)
<div style=”clear:right;”></div> (清除float:right的影响，如果是float:left造成的浮动影响这样写无用)
{% endhighlight %}

### 2，结尾处加空div标签 clear:both 

css

```css
/*清除浮动代码*/ 
.clearfloat { clear:both } 
```

html

{% highlight html linenos %}
<div class="div1"> 
	<div class="float-left">Left</div> 
	<div class="float-right">Right</div> 
	<div class="clearfloat"></div> 
</div> 
{% endhighlight %}

原理：添加一个空div，利用css提高的clear:both清除浮动，让父级div能自动获取到高度 

优点：简单、代码少、浏览器支持好、不容易出现怪问题 

缺点：添加无意义的空标签，有违结构与表现的分离

建议：不推荐使用，但此方法是以前主要使用的一种清除浮动方法 

### 3，使用br标签及自身html属性

html

{% highlight html linenos %}
<div class="wrap">
    <div class="box1 left">box1   float:left;</div>
    <div class="box2 left">box2   float:left;</div>
    <br clear="all" />
    <!-- <br clear="left " />
    <br clear="right" /> --> 
</div>
{% endhighlight %}

原理：br 有 clear=“all | left | right | none” 属性

优点：比空标签方式语义稍强，代码量较少

缺点：同样有违结构与表现的分离

建议：不推荐使用



## 触发浮动元素父元素的BFC来闭合浮动

BFC（Block formatting contexts），块级格式上下文，是页面上的一个隔离的独立容器，容器里面的子元素与容器外部元素不会相互影响，即BFC阻止外边距叠加、不重叠浮动并且可以包含浮动。因此我们常利用这点来闭合浮动，以达到消除浮动的副作用。

触发 BFC 的条件如下：  
1.根元素(整个页面就是一个大的BFC)；  
2.float为 left | right；  
3.overflow为 hidden | auto | scroll；  
4.display为 inline-block | table-cell | table-caption | flex | inline-flex；  
5.position为 absolute | fixed；  

### 4，父级div定义 overflow:hidden 

css

```css
.clear{
    overflow:hidden; 
    *zoom:1;
}
```

html

{% highlight html linenos %}
<div class="wrap clear"  >
    <div class="float-left">box1   float:left;</div>
    <div class="float-left">box2   float:left;</div>
</div>
{% endhighlight %}

原理：触发父元素生成BFC，包含浮动元素，且浮动元素的高度也纳入父元素计算。

优点：简单，代码少，浏览器支持好

缺点：超出的尺寸的会被隐藏

建议：在确定不会有什么被剪裁的情况下，放心使用。

### 4，父级div定义 overflow:auto

原理：同上overflow:hidden

优点：简单、代码少、浏览器支持好 

缺点：内部宽高超过父级div时，会出现滚动条。 

建议：不推荐使用，如果你需要出现滚动条或者确保你的代码不会出现滚动条就使用吧。 

### 5，父级div 也一起浮动 

原理：也是利用父元素形成BFC。 

优点：没有优点 

缺点：会产生新的浮动问题。 

建议：不推荐使用

### 6，父元素设置display:table

原理：display:table 本身并不会创建BFC，但是它会产生匿名框(anonymous boxes)，而匿名框中的display:table-cell可以创建新的BFC，换句话说，触发块级格式化上下文的是匿名框，而不是display:table。所以通过display:table和display:table-cell创建的BFC效果是不一样的。

优点：结构语义化完全正确，代码量极少

缺点：盒模型属性已经改变，由此造成的一系列问题

建议：不推荐使用

##  触发haslayout来闭合浮动

### 7，:after+clear+zoom:1

给浮动元素添加伪元素after，并为伪元素定义clear:both；对于不支持:after伪元素的浏览器如IE6~7，可以通过触发haslayout来达到闭合浮动的目的。

css

```css
.clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
.clearfix { 
    *zoom: 1;     /* zoom:1是为了触发IE6~7中的haslayout */
}
```

html

{% highlight html linenos %}
<div class="wrap clearfix"  >
    <div class="float-left">float:left;</div>
    <div class="float-left">float:left;</div>
</div>
{% endhighlight %}

1) display:block 使生成的元素以块级元素显示,占满剩余空间;  
2) height:0 避免生成内容破坏原有布局的高度。  
3) visibility:hidden 使生成的内容不可见，并允许可能被生成内容盖住的内容可以进行点击和交互;  
4）通过 content:”.”生成内容作为最后一个元素，至于content里面是点还是看不见的空格"020"(content: "020";   content: " "; )抑或其他都是可以的，例如oocss里面就有经典的 content:”XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX”,有些版本可能content 里面内容为空,不推荐这样做的,firefox直到7.0 content:”” 仍然会产生额外的空隙；  
5）zoom：1 触发IE hasLayout。

上述，除了clear：both用来闭合浮动的，其他代码无非都是为了隐藏掉content生成的内容，这也就是其他版本的闭合浮动为什么会有font-size：0，line-height：0。

[http://www.positioniseverything.net/easyclearing.html](http://www.positioniseverything.net/easyclearing.html)

[http://stackoverflow.com/questions/211383/what-methods-of-clearfix-can-i-use](http://stackoverflow.com/questions/211383/what-methods-of-clearfix-can-i-use)

优点：结构和语义化完全正确,代码量居中

缺点：复用方式不当会造成代码量增加

### 8，大师手笔

```css
.clearfix::after{
    content:" ";
    display:table;
    clear:both;
}
.clearfix { 
    *zoom: 1;   
}
```

Note that you should always use the double colon, ::, for before and after, unless you need to support IE8. A double colon is standard for pseudo-elements, and the single-colon implementation is deprecated and support could well be dropped in the future.

[http://nicolasgallagher.com/micro-clearfix-hack/](http://nicolasgallagher.com/micro-clearfix-hack/)

[完整例子参见](http://jsfiddle.net/necolas/K538S/)

Nicolas Gallagher原文中还有:before是为了处理margin边距重叠,如下。

```css
.cf:before,
.cf:after {
    content: " "; 
    display: table; 
}
.cf:after {
    clear: both;
}
.cf {
    *zoom: 1;
}
```

This “micro clearfix” generates pseudo-elements and sets their display to table. This creates an anonymous table-cell and a new block formatting context that means the :before pseudo-element prevents top-margin collapse. The :after pseudo-element is used to clear the floats. As a result, there is no need to hide any generated content and the total amount of code needed is reduced.

Including the :before selector is not necessary to clear the floats, but it prevents top-margins from collapsing in modern browsers. 

## 更多-more
- [http://w3help.org/zh-cn/casestudies/001](http://w3help.org/zh-cn/casestudies/001)





















































