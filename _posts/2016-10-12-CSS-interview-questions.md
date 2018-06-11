---
layout: post
title: CSS面试题
tags:
- Interview
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

同权重: 内联样式表（标签内部）> 嵌入样式表（当前文件中）> 外部样式表（外部文件中）。

!important >  id > class > tag

important 比 内联优先级高

# Pseudo class
- CSS3新增伪类有那些？

举例：

{% highlight html linenos %}
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
{% endhighlight %}

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

# Flexbox
- 请解释一下CSS3的Flexbox（弹性盒布局模型）,以及适用场景？

一个用于页面布局的全新CSS3功能，Flexbox可以把列表放在同一个方向（从上到下排列，从左到右），并让列表能延伸到占用可用的空间。

较为复杂的布局还可以通过嵌套一个伸缩容器（flex container）来实现。

采用Flex布局的元素，称为Flex容器（flex container），简称"容器"。

它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称"项目"。

常规布局是基于块和内联流方向，而Flex布局是基于flex-flow流可以很方便的用来做局中，能对不同屏幕大小自适应。

在布局上有了比以前更加灵活的空间。

[具体](http://www.w3cplus.com/css3/flexbox-basics.html)

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

# layout-PING
- 一个满屏 品 字布局 如何设计?

上面的div宽100%，

下面的两个div分别宽50%，

然后用float或者inline使其不换行即可

# layout-Equal-height
- css多列等高如何实现？

利用padding-bottom|margin-bottom正负值相抵；

设置父容器设置超出隐藏（overflow:hidden），这样子父容器的高度就还是它里面的列没有设定

padding-bottom时的高度，当它里面的任一列高度增加了，则父容器的高度被撑到里面最高那列的高度，

其他比这列矮的列会用它们的padding-bottom补偿这部分高度差。

```css
#parentDiv {
	overflow: hidden;
}
.left,.right {
	float: left;
	margin-bottom: -10000px;
	padding-bottom: 10000px;
}
```

[css等高布局](http://pengyouyi.site/css/2017/03/22/css-layout)

# 12px
- Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,

可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决

# hover
- 超链接访问过后hover样式就不出现了 

被点击访问过的超链接样式不在具有hover和active了解决方法是改变CSS属性的排列顺序:

L-V-H-A :  a:link {} a:visited {} a:hover {} a:active {}  
记忆顺序：喜欢（L-o-V-e），讨厌（H-A-t-e）

# li 
- li与li之间有看不见的空白间隔是什么原因引起的？有什么解决办法？

行框的排列会受到中间空白（回车\空格）等的影响，因为空格也属于字符,这些空白也会被应用样式，占据空间，所以会有间隔，把字符大小设为0，就没有空格了。

[display:inline-block 空隙问题解决](http://pengyouyi.site/css/2016/10/28/block-inline#displayinline-block-%E7%A9%BA%E9%9A%99%E9%97%AE%E9%A2%98%E8%A7%A3%E5%86%B3)

# css init
- 为什么要初始化CSS样式。

因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异。

当然，初始化样式会对SEO有一定的影响，但鱼和熊掌不可兼得，但力求影响最小的情况下初始化。

最简单的初始化方法： * {padding: 0; margin: 0;} （强烈不建议）

淘宝的样式初始化代码：
{% highlight html linenos %}
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
{% endhighlight %}

# visibility-collapse
- CSS里的visibility属性有个collapse属性值是干嘛用的？在不同浏览器下以后什么区别？

对于普通元素visibility:collapse;会将元素完全隐藏,不占据页面布局空间,与display:none;表现相同.

如果目标元素为table,visibility:collapse;将table隐藏,但是会占据页面布局空间.

仅在Firefox下起作用,IE会显示元素,Chrome会将元素隐藏,但是占据空间.


# display
- position跟display、margin collapse、overflow、float这些特性相互叠加后会怎么样？

如果元素的display为none,那么元素不被渲染,position,float不起作用,

如果元素拥有position:absolute;或者position:fixed;属性那么元素将为绝对定位,float不起作用.

如果元素float属性不是none,元素会脱离文档流,根据float属性值来显示.

有浮动,绝对定位,inline-block属性的元素,margin不会和垂直方向上的其他元素margin折叠.

# float
- 请解释一下为什么需要清除浮动？清除浮动的方式

清除浮动是为了清除使用浮动元素产生的影响。浮动的元素，高度会塌陷，而高度的塌陷使我们页面后面的布局不能正常显示。

1、父级div定义height；

2、父级div 也一起浮动；

3、常规的使用一个class；

```css
.clearfix:before, .clearfix:after {
   content: " ";
   display: table;
}
.clearfix:after {
   clear: both;
}
.clearfix {
   *zoom: 1;
}
```

4、SASS编译的时候，浮动元素的父级div定义伪类:after

```css
&:after,&:before{
   content: " ";
   visibility: hidden;
   display: block;
   height: 0;
   clear: both;
}
```

解析原理：

1) display:block 使生成的元素以块级元素显示,占满剩余空间;

2) height:0 避免生成内容破坏原有布局的高度。

3) visibility:hidden 使生成的内容不可见，并允许可能被生成内容盖住的内容可以进行点击和交互;

4）通过 content:"."生成内容作为最后一个元素，至于content里面是点还是其他都是可以的，例如oocss里面就有经典的 content:".",有些版本可能content 里面内容为空,一丝冰凉是不推荐这样做的,firefox直到7.0 content:”" 仍然会产生额外的空隙；

5）zoom：1 触发IE hasLayout。

通过分析发现，除了clear：both用来闭合浮动的，其他代码无非都是为了隐藏掉content生成的内容，这也就是其他版本的闭合浮动为什么会有font-size：0，line-height：0。

[清除浮动带来的影响](http://pengyouyi.site/css/2016/11/16/css-clear-float)

# margin
- 什么是外边距合并？

外边距合并指的是，当两个垂直外边距相遇时，它们将形成一个外边距。

合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。

[w3school介绍网址：](http://www.w3school.com.cn/css/css_margin_collapsing.asp)

# zoom
- zoom:1的清除浮动原理?

清除浮动，触发hasLayout；
Zoom属性是IE浏览器的专有属性，它可以设置或检索对象的缩放比例。解决ie下比较奇葩的bug。
譬如外边距（margin）的重叠，浮动清除，触发ie的haslayout属性等。

来龙去脉大概如下：
当设置了zoom的值之后，所设置的元素就会就会扩大或者缩小，高度宽度就会重新计算了，这里一旦改变zoom值时其实也会发生重新渲染，运用这个原理，也就解决了ie下子元素浮动时候父元素不随着自动扩大的问题。

Zoom属是IE浏览器的专有属性，火狐和老版本的webkit核心的浏览器都不支持这个属性。然而，zoom现在已经被逐步标准化，出现在 CSS 3.0 规范草案中。

目前非ie由于不支持这个属性，它们又是通过什么属性来实现元素的缩放呢？
可以通过css3里面的动画属性scale进行缩放。


# @media
- 移动端的布局用过媒体查询吗？

1) link元素中的CSS媒体查询

```html
<link rel="stylesheet" media="(max-width: 800px)" href="example.css" />
```

当媒体查询为真时，相关的样式表或样式规则会按照正常的级联规被应用。

当媒体查询返回假， <link> 标签上带有媒体查询的样式表仍将被下载 （只不过不会被应用）。

2) 样式表中的CSS媒体查询

```html
<style>
    @media (min-width: 700px) and (orientation: landscape){
      .sidebar {
        display: none;
      }
    }
</style>
```

包含了一个媒体类型和至少一个使用宽度、高度和颜色等媒体属性来限制样式表范围的表达式。

CSS3加入的媒体查询使得无需修改内容便可以使样式应用于某些特定的设备范围。

# CSS优化
- CSS优化、提高性能的方法有哪些？

关键选择器（key selector）。选择器的最后面的部分为关键选择器（即用来匹配目标元素的部分）；

如果规则拥有 ID 选择器作为其关键选择器，则不要为规则增加标签。过滤掉无关的规则（这样样式系统就不会浪费时间去匹配它们了）；

提取项目的通用公有样式，增强可复用性，按模块编写组件；增强项目的协同开发性、可维护性和可扩展性;

使用预处理工具或构建工具（gulp对css进行语法检查、自动补前缀、打包压缩、自动优雅降级）；

# ::before
- ::before 和 :after中双冒号和单冒号 有什么区别？解释一下这2个伪元素的作用。

单冒号(:)用于CSS3伪类，双冒号(::)用于CSS3伪元素。（伪元素由双冒号和伪元素名称组成）

双冒号是在当前规范中引入的，用于区分伪类和伪元素。不过浏览器需要同时支持旧的已经存在的伪元素写法，

比如:first-line、:first-letter、:before、:after等，

而新的在CSS3中引入的伪元素则不允许再支持旧的单冒号的写法。

想让插入的内容出现在其它内容前，使用::before，否则，使用::after；

在代码顺序上，::after生成的内容也比::before生成的内容靠后。

如果按堆栈视角，::after生成的内容会在::before生成的内容之上

# input:-webkit-autofill
- 如何修改chrome记住密码后自动填充表单的黄色背景 ？

```css
input:-webkit-autofill, 
textarea:-webkit-autofill, 
select:-webkit-autofill {
  background-color: rgb(250, 255, 189); /* #FAFFBD; */
  background-image: none;
  color: rgb(0, 0, 0);
}
```

# -webkit-text-size-adjust:none
- 怎么让Chrome支持小于12px 的文字？

1、用图片：如果是内容固定不变情况下，使用将小于12px文字内容切出做图片，这样不影响兼容也不影响美观。

2、使用12px及12px以上字体大小：为了兼容各大主流浏览器，建议设计美工图时候设置大于或等于12px的字体大小，如果是接单的这个时候就需要给客户讲解小于12px浏览器不兼容等事宜。

3、继续使用小于12px字体大小样式设置：如果不考虑chrome可以不用考虑兼容，同时在设置小于12px对象设置-webkit-text-size-adjust:none，做到最大兼容考虑。

# -webkit-font-smoothing
- 让页面里的字体变清晰，变细用CSS怎么做？

```css
-webkit-font-smoothing: antialiased;
```

# font-style:oblique;
- ## font-style属性可以让它赋值为“oblique” oblique是什么意思？

[倾斜的字体样式](http://www.runoob.com/cssref/pr-font-font-style.html)

```css
p.normal {font-style:normal}
p.italic {font-style:italic}
p.oblique {font-style:oblique}
```

Italic是使用文字的斜体，Oblique是让没有斜体属性的文字倾斜！

[CSS中font-style的属性有Italic oblique的区别](https://zhidao.baidu.com/question/85429500.html)

# meta
- position:fixed;在android下无效怎么处理？

fixed的元素是相对整个页面固定位置的，你在屏幕上滑动只是在移动这个所谓的viewport，

原来的网页还好好的在那，fixed的内容也没有变过位置，

所以说并不是iOS不支持fixed，只是fixed的元素不是相对手机屏幕固定的。

\<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>

# animation-time
- 如果需要手动写动画，你认为最小时间间隔是多久，为什么？（阿里）

多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60＊1000ms ＝ 16.7ms

# Cookie隔离
- 什么是Cookie 隔离？（或者说：请求资源的时候不要让它带cookie怎么做）

如果静态文件都放在主域名下，那静态文件请求的时候都带有的cookie的数据提交给server的，非常浪费流量，所以不如隔离开。

因为cookie有域的限制，因此不能跨域提交请求，故使用非主要域名的时候，请求头中就不会带有cookie数据，这样可以降低请求头的大小，降低请求时间，从而达到降低整体请求延时的目的。

同时这种方式不会将cookie传入Web Server，也减少了Web Server对cookie的处理分析环节，提高了web server的http请求的解析速度。

# LESS-Sass-Stylus

- 什么是CSS 预处理器 / 后处理器？

- 预处理器例如：LESS、Sass、Stylus，用来预编译Sass或less，增强了css代码的复用性，还有层级、mixin、变量、循环、函数等，具有很方便的UI组件模块化开发能力，极大的提高工作效率。

- 后处理器例如：PostCSS，通常被视为在完成的样式表中根据CSS规范处理CSS，让其更有效；目前最常做的是给CSS属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。

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

# font-size
- 在网页中的应该使用奇数还是偶数的字体？为什么呢？

网页中使用偶数居多

1. 比例关系:在使用移动端布局，和百分比布局的时候，换算单位和数值更加的方便精准

2. UI设计师的缘故:大多数设计师用的软件如ps提供的字号是偶数，自然到了 前端那边也是用的是偶数。

3. 浏览器缘故:低版本的浏览器ie6会把奇数字体强制转化为偶数、为了平分字体

4. 系统差别:字体点阵

也可以使用奇数！！！

使用奇数号字体不好的地方是，文本段落无法对齐。

[谈谈网页中使用奇数字体和偶数字体](https://blog.csdn.net/jian_xi/article/details/79346477)

# height-margin-top
- 元素竖向的百分比设定是相对于容器的高度吗？

对于height属性取值百分比，是现对于容器高度的

对于margin-top、margin-bottom、padding-top、padding-bottom这些竖直方向的内外边距属性的百分比取值，参考的其实是容器的宽度而不是高低。

[元素竖向的百分比设定是相对于容器的高度吗?](https://blog.csdn.net/qq_34099161/article/details/51505782)

# Full-screen-rolling
- 全屏滚动的原理是什么？用到了CSS的那些属性？

图片轮播原理，只不过图片宽高100%、超出隐藏、调整比例适应屏幕大小

一种是整体的元素一直排列下去，假设有五个需要展示的全屏页面，那么高度是500%，只是展示100%，剩下的可以通过transform进行Y轴定位，也可以通过margin-top实现，

切换的属性变化，可以有2种：

1. transform:translateX/translateY的值

2. left/top的值；

[CSS-页面滑屏滚动原理](https://www.cnblogs.com/xiaofeixiang/p/5042324.html)

# @dedia
- 什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的IE？

页面的设计和开发应当根据用户行为以及设备环境（系统平台、屏幕尺寸、屏幕定向等）进行相应的响应和调整。具体的实践方式由多方面组成，包括弹性网格和布局、图片、css media query的使用等。无论用户正在使用笔记本还是iPad，我们的页面都应该能够自动切换分辨率、图片尺寸及相关脚本功能等，以适应不同设备；换句话说，页面应该有能力去自动响应用户的设备环境。

响应式网页设计就是一个网站能够兼容多个终端——而不是为每个终端做一个特定的版本。这样，我们就可以不必为不断到来的新设备做专门的版本设计和开发了。

响应式设计的基本原理是通过媒体查询@media检测不同的设备屏幕尺寸做处理。页面头部必须有meta声明viewport：

\<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no”>

兼容IE可以使用JS辅助一下来解决

[浏览器兼容与响应式布局](https://www.cnblogs.com/baiyygynui/p/5903749.html)

[什么是响应式设计？为什么要做响应式设计？响应式设计的基本原理是什么？](https://www.cnblogs.com/luckyXcc/p/5772274.html)

# screen-rolling
- 视差滚动效果，如何给每页做不同的动画？（回到顶部，向下滑动要再次出现，和只出现一次分别怎么做？）

视差滚动（Parallax Scrolling）就是这样的效果之一。这种技术通过在网页向下滚动的时候，控制背景的移动速度比前景的移动速度慢来创建出令人惊叹的3D效果。

原理：

（1）CSS3实现
优点：开发时间短、性能和开发效率比较好，缺点是不能兼容到低版本的浏览器

（2）jquery实现
通过控制不同层滚动速度，计算每一层的时间，控制滚动效果。

优点：能兼容到各个版本的，效果可控性好

缺点：开发起来对制作者要求高

（3）插件实现方式
例如：parallax-scrolling，兼容性十分好

# line-height
- 你对line-height是如何理解的？

* line-height只影响行内元素，并不能直接应用于块级元素。

* line-height 具有可继承性，块级元素的子元素会继承该特性，并且在行内元素上生效。

撑开div高度的是line-height不是文字内容。

line-height指的是在同一个元素中，两个文本行基线间的距离

[css行高line-height的一些深入理解及应用](http://www.zhangxinxu.com/wordpress/2009/11/css%E8%A1%8C%E9%AB%98line-height%E7%9A%84%E4%B8%80%E4%BA%9B%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E5%8F%8A%E5%BA%94%E7%94%A8/)

[对于行高(line-height)的一些理解](http://www.html-js.com/article/3465)

# -webkit-overflow-scrolling
- overflow: scroll时不能平滑滚动的问题怎么处理？

如果你对某个div或模块使用了overflow: scroll属性，在iOS系统的手机上浏览时，则会出现明显的卡顿现象。但是在android系统的手机上则不会出现该问题。

解决这种卡顿:

```css
-webkit-overflow-scrolling: touch;
```

CSS的属性-webkit-overflow-scrolling是真的创建了带有硬件加速的系统级控件，所以效率很高。

推荐一些相关插件：[iScroll](http://www.360doc.com/content/14/0724/11/16276861_396699901.shtml)、[jRoll(中文名：酸萝卜) ](http://www.chjtx.com/JRoll/#todo/go?do=use)。

[解决页面使用overflow: scroll在iOS上滑动卡顿的问题](https://www.jianshu.com/p/1f4693d0ad2d)

# layout-self-adaption
- 有一个高度自适应的div，里面有两个div，一个高度100px，希望另一个填满剩下的高度。


css3弹性盒子(Flex Box)解法：

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
<style>
.box {
    display: flex;
    flex-direction: column; // 纵向从上往下排列（顶对齐）
    width:200px;
    height:300px;
    background:red;
}
.a {
	height:100px;
	background:green;
}
.b {
	flex: 1;
	background:blue;
}
</style>
</head>
<body>
     <div class="box">
         <div class="a">a</div>
         <div class="b">b</div>
     </div>
</body>
</html>
```

**position absolute 方案**

1.	外层position: relative；

2.	百分百自适应元素直接position: absolute; top: 100px; bottom: 0; left: 0

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
<style>
.box {
    position: relative;
    width:200px;
    height:300px;
    background:red;
}
.a {
	height:100px;
	background:green;
}
.b {
	position: absolute;
	top: 100px;
	left: 0;
	bottom: 0;
	width: 100%;
	background:blue;
}
</style>
</head>
<body>
     <div class="box">
         <div class="a">a</div>
         <div class="b">b</div>
     </div>
</body>
</html>
```

**box-sizing: border-box方案**

1.	外层box-sizing: border-box; 同时设置padding: 100px 0 0；

2.	内层100像素高的元素向上移动100像素，或使用absolute定位防止占据空间；

3.	另一个元素直接height: 100%;

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
<style>
.box {
    box-sizing: border-box;
    padding: 100px 0 0 0;
    /*position: relative;*/
    width:200px;
    height:300px;
    background:red;
}
.a {
	margin-top: -100px;
	/*position: absolute;
	top:0;*/
	width: 100%;
	height:100px;
	background:green;
}
.b {
	height: 100%;
	background:blue;
}
</style>
</head>
<body>
     <div class="box">
         <div class="a">a</div>
         <div class="b">b</div>
     </div>
</body>
</html>
```


[简书](https://www.jianshu.com/p/46dd9274bef8)

[segmentfault](https://segmentfault.com/q/1010000000762512/a-1020000000762933)

# Webp
- png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过webp？

**JPG（JPEG）：**

jpg是一种有损压缩的方式，它会放弃图片的某些细节。所以要是对图片质量的要求不是很高，可以采用jpg的保存方式。jpg是最普遍在万维网上被用来储存和传输照片的格式

> 优点：支持百万种色彩、压缩比高（180：1）

> 缺点：有损压缩、不支持图形渐进、不支持背景透明、不支持动画

> 适用：色彩丰富的照片适合jpg的保存方式

**PNG：**

采用的是无损压缩，其目的是为了取代gif。

按存储方式不同，PNG可分为：PNG8、PNG24、PNG32

> 优点：无损压缩、支持间隔渐进显示（但会造成图片过大）、PNG24和PNG32支持颜色很多、能保留透明与半透明区域

> 缺点：不支持动画、PNG24和PNG32对IE6支持不好、很多网站不支持PNG上传

> 适用：小图标、平铺背景等色彩比较少的小型图片。


**GIF：**

Gif是使用了一种叫作LZW的算法进行压缩的，水平压缩（像素由上到下水平压缩），这也意味着同等条件下，横向的gif图片比竖向的gif图片更加小。例如500\*10的图片比10\*500的图片更加小。

> 优点：无损压缩、支持背景透明、支持动画、支持图形渐进

> 缺点：只有256种颜色，对于色彩丰富的图片压缩效果不好

> 适用：小图标、线条、图纸、色彩不丰富的图片

**Webp格式：**

Google开发的一种旨在加快图片加载速度的图片格式。图片压缩体积大约只有JPEG的2/3，并能节省大量的服务器带宽资源和数据空间。Facebook Ebay等知名网站已经开始测试并使用WebP格式。

目前所知道的只有高版本的W3C浏览器才支持这种格式，比如chorme39+，safari7+等等。

> 优点：体积小

> 缺点：有损压缩、兼容性不好（android高版本、W3C高版本浏览器支持这种格式、ios不支持）

> 适用：展望未来

**总结：**

GIF/PNG和JPG这三种格式的图片被广泛应用在现今的互联网中,gif曾在过去互联网初期慢速的情况下几乎是做到了大一统的地位,而现如今随着互联网技术应用和硬件条件的提高,png和jpg格式的图片越来越多的被应用,gif昔日的辉煌一去不复, webp图片格式现在还不普及：

**体积比较：**

webp<JGP<PNG


[Gif,png,jpg,webp几种图片格式整理](https://blog.csdn.net/playboyanta123/article/details/44655749)

[gif、jpg、png、webp图片格式比较](http://www.sohu.com/a/111891781_165433)

# FOUC
- style标签写在body后与body前有什么区别？

写在head标签中利于浏览器逐步渲染（resources downloading->CSSOM+DOM->RenderTree(composite)->Layout->paint）。

写在body标签后由于浏览器以逐行方式对html文档进行解析，当解析到写在尾部的样式表（外联或写在style标签）会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后重新渲染，在windows的IE下可能会出现FOUC现象（即样式失效导致的页面闪烁问题）

建议：一般样式都放在 head 之间


# 更多-more

* [https://github.com/markyun/My-blog/tree/master/Front-end-Developer-Questions/Questions-and-Answers](https://github.com/markyun/My-blog/tree/master/Front-end-Developer-Questions/Questions-and-Answers)

* [https://blog.csdn.net/qq_30325409/article/details/71084423](https://blog.csdn.net/qq_30325409/article/details/71084423)






