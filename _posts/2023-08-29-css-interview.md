---
layout: post
title: CSS 面试题集合 -- CSS 基础
tags:
- Interview
- CSS-basic
categories: CSS
description: CSS 面试题集合
---

# CSS选择器、display:block/inline、隐藏元素

<div class="rd">
    <img src="/assets/images/2023/7-8-9/css.png" alt="">
</div>



# selector 选择器
★★★★

## CSS 选择器有哪些？

|选择器|格式|优先级权重|
|---|---|---|
|id选择器|# myid|100|
|类选择器|.myclassname|10|
|伪类选择器|a:hover, li:nth-child|10|
|属性选择器|a[target = "_blank"]|10|
|标签选择器|div, h1, p|1|
|伪元素选择器|div::after|1|
|相邻兄弟选择器|h1 + p|0|
|子选择器|ul >li|0|
|后代选择器|li a|0|
|通配符选择器|*|0|

## 选择器 priority 优先级
★★★★

!important > 行内样式 > ID选择器 > 类选择器 > 标签选择器 > 通配符 > 继承 > 浏览器默认属性

1. 第一优先级：!important 会覆盖页面内任何位置的元素样式，权值为无穷大  
2. 行内（内联）样式，如 style="color: green"，权值为 1000  
3. ID 选择器，如 #app，权值为 100  
4. 类、伪类、属性选择器，如 .foo, :first-child, div[class="foo"]，权值为 10  
5. 标签、伪元素选择器，如 div::first-line，权值为 1  
6. 通用选择器（*）、子选择器（>）和相邻同胞选择器（+），权值为 0  
7. 继承的样式没有权值，优先级最低  

**注意事项：**

```html
行内（内联）样式：<div style="color:red;">
内部（内嵌）样式：<style> 中嵌入代码 </style>
外部样式：<link> 或 @import引入.css文件
```

- ❶ CSS 的 3 种样式表的权重（优先级）：行内 > 内部 > 外部 
- ❷ 使用不同的选择器修饰同一个元素的时候，考虑选择器的权重值，权重值相加，权重值大的样式保留。
- ❸ 权重相同的情况下，位于后面的样式会覆盖前面的样式

## 选择器权重计算 count

```html
/*权重为 100+1=101 */  
#id1 div {...}

/*权重为 10+1=11 */  
.class1 div {...}

/*权重为 10+10+1=21 */
.class1 .class2 div {...}
```

## 浏览器是怎样解析CSS选择器的？

CSS 选择器的解析是 `从右向左` 解析的。

- 若从左向右的匹配，发现不符合规则，需要进行回溯，会损失很多性能。  
- 若从右向左匹配，先找到所有的最右节点，对于每一个节点，向上寻找其父节点直到找到根元素或满足条件的匹配规则，则结束这个分支的遍历。两种匹配规则的性能差别很大，是因为从右向左的匹配在第一步就筛选掉了大量的不符合条件的最右节点（叶子节点），而从左向右的匹配规则的性能都浪费在了失败的查找上面。  

而在 CSS 解析完毕后，需要将解析的结果与 DOM Tree 的内容一起进行分析建立一棵 Render Tree，最终用来进行绘图。在建立 Render Tree 时，浏览器就要为每个 DOM Tree 中的元素根据 CSS 的解析结果（Style Rules）来确定生成怎样的 Render Tree。


# CSS中可继承与不可继承属性有哪些
★★★

- 可继承的样式： font-size font-family color, ul li dl dd dt（字体属性，列表相关）;  
- 不可继承的样式：border padding margin width height (盒模型相关的属性);  

# display

## display常用的属性值及其作用
★★★★

|属性值|	作用|
|---|---|
|none|	元素不显示，并且会从文档流中移除|。
|block|	块级元素。默认宽度为父元素宽度，可设置宽高，换行显示。|
|inline|	行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。|
|inline-block|	默认宽度为内容宽度，可以设置宽高，同行显示。|
|list-item|	像块类型元素一样显示，并添加样式列表标记。|
|table|	此元素会作为块级表格来显示。|
|inherit|	规定应该从父元素继承 display 属性的值。|


## display的block、inline和inline-block的区别
★★★★

**display 的 block、inline 和 inline-block 的区别：**

（1）block： 会独占一行，多个元素会另起一行，可以设置 width、height、margin 和 padding 属性；  

（2）inline： 元素不会独占一行，设置 width、height 属性无效。但可以设置水平方向的 margin 和 padding 属性，不能设置垂直方向的 padding 和 margin；  

（3）inline-block： 在内联和块之间提供了一个中间状态，使用之后生成一个内联块元素，该元素 width 和 height 属性会生效，padding，margin，以及 border 会推开其他元素。但是，它不会跳转到新行。  

**对于块级元素和行内元素，其特点如下：**

*（1）块级元素*

- 可以设置宽高；  
- 设置 margin 和 padding 都有效；  
- 可以自动换行；  
- 多个块状，默认排列从上到下。  

*（2）行内元素*

- 设置宽高无效；  
- 可以设置水平方向的 margin 和 padding 属性，不能设置垂直方向的 padding 和 margin；  
- 不会自动换行；  

# hide 隐藏元素的方式有哪些
★★★★

- ① 设置 display: none；样式。这个样式会让元素在页面上彻底消失。元素本来占有的空间，也会被其他元素占有，所以，他会导致浏览器的重排和重绘。  
- ② 设置 visibilty：hidden；的样式。它和 display: none；的区别在于，元素在页面消失之后，它原本占有的空间依然会保留，所以，他只会导致浏览器的重绘，而不会重排。  
- ③ 设置 opacity：0；透明度为0。元素在页面中仍然占据空间。如果该元素已经绑定一些事件，如 click 事件，那么点击该区域，也能触发点击事件的。  
- ④ position: absolute; 通过使用绝对定位将元素移除可视区域内，以此来实现元素的隐藏。
- ⑤ z-index: 负值; 来使其他元素遮盖住该元素，以此来实现隐藏。
- ⑥ transform: scale(0,0); 将元素缩放为 0，来实现元素的隐藏。这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。
- ⑦ clip/clip-path; 使用元素裁剪的方法来实现元素的隐藏，这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。

常用的是 ①②③ 这三种方法。

# display:none与visibility:hidden的区别
★★★★

这两个属性都是让元素隐藏，不可见。两者区别如下：

（1）在渲染树中  
- display:none 会让元素完全从渲染树中消失，渲染时不会占据任何空间；  
- visibility:hidden 不会让元素从渲染树中消失，渲染的元素还会占据相应的空间，只是内容不可见。  

（2）是否是继承属性

- display:none 是非继承属性，子孙节点会随着父节点从渲染树消失，通过修改子孙节点的属性也无法显示；  
- visibility:hidden 是继承属性，子孙节点消失是由于继承了 hidden，通过设置 visibility:visible 可以让子孙节点显示；  

（3）修改常规文档流中元素的 display 通常会造成文档的重排，但是修改 visibility 属性只会造成本元素的重绘；

（4）如果使用读屏器，设置为 display:none 的内容不会被读取，设置为 visibility:hidden 的内容会被读取。

# transition 和 animation 的区别
★★

- transition 是过度属性，强调过度，它的实现需要触发一个事件（比如鼠标移动上去，焦点，点击等）才执行动画。tranistion 只能设定头尾, transition 中所有样式属性都要一起变化。  
- animation 是动画属性，它的实现不需要触发事件，设定好时间之后可以自己执行，且可以设定循环次数。animation 可以设定每一帧的样式和时间,且可以设置每一帧需要单独变化的样式属性。 

# 为什么有时候⽤translate来改变位置⽽不是定位？
★

translate 是 transform 属性的⼀个值。改变 transform 或 opacity 不会触发浏览器重新布局（reflow）或重绘（repaint），只会触发复合（compositions）。⽽改变绝对定位会触发重新布局，进⽽触发重绘和复合。transform 使浏览器为元素创建⼀个 GPU 图层，但改变绝对定位会使⽤到 CPU。 因此 translate() 更⾼效，可以缩短平滑动画的绘制时间。 ⽽ translate 改变位置时，元素依然会占据其原始空间，绝对定位就不会发⽣这种情况。

# li 空白间隔
★

**li 与 li 之间有看不见的空白间隔是什么原因引起的？如何解决？**

浏览器会把 inline 内联元素间的空白字符（空格、换行、Tab等）渲染成一个空格。为了美观，通常是一个\<li\>放在一行，这导致\<li\>换行后产生换行字符，它变成一个空格，占用了一个字符的宽度。

解决办法：

（1）为\<li\>设置 float:left。不足：有些容器是不能设置浮动，如左右切换的焦点图等。

（2）将所有\<li\>写在同一行。不足：代码不美观。

（3）将\<ul\>内的字符尺寸直接设为0，即 font-size:0。不足：\<ul\>中的其他字符尺寸也被设为0，需要额外重新设定其他字符尺寸，且在 Safari 浏览器依然会出现空白间隔。

（4）消除\<ul\>的字符间隔 letter-spacing:-8px，不足：这也设置了\<li\>内的字符间隔，因此需要将\<li\>内的字符间隔设为默认 letter-spacing:normal。

# 对line-height 的理解及其赋值方式
★
**（1）line-height的概念：**

- line-height 指一行文本的高度，包含了字间距，实际上是下一行基线到上一行基线距离；  
- 如果一个标签没有定义 height 属性，那么其最终表现的高度由 line-height 决定；  
- 一个容器没有设置高度，那么撑开容器高度的是 line-height，而不是容器内的文本内容；  
- 把 line-height 值设置为 height 一样大小的值可以实现单行文字的垂直居中；  
- line-height 和 height 都能撑开一个高度；

**（2）line-height 的赋值方式：**

- 带单位：px 是固定值，而 em 会参考父元素 font-size 值计算自身的行高  
- 纯数字：会把比例传递给后代。例如，父级行高为 1.5，子元素字体为 18px，则子元素行高为 1.5 * 18 = 27px  
- 百分比：将计算后的值传递给后代  

# text-overflow 溢出隐藏
**单行、多行文本溢出隐藏**
★★★★

单行文本溢出

```css
overflow: hidden;            // 溢出隐藏
text-overflow: ellipsis;      // 溢出用省略号显示
white-space: nowrap;         // 规定段落中的文本不进行换行
```

多行文本溢出

```css
overflow: hidden;            // 溢出隐藏
text-overflow: ellipsis;     // 溢出用省略号显示
display: -webkit-box;         // 作为弹性伸缩盒子模型显示。
-webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式：从上到下垂直排列
-webkit-line-clamp: 3;        // 显示的行数
```

注意：由于上面的三个属性都是 CSS3 的属性，没有浏览器可以兼容，所以要在前面加一个 -webkit- 来兼容一部分浏览器。

# z-index
**z-index 属性在什么情况下会失效**

通常 z-index 的使用是在有两个重叠的标签，在一定的情况下控制其中一个在另一个的上方或者下方出现。z-index 值越大就越是在上层。z-index 元素的 position 属性需要是 relative， absolute 或是 fixed。

**z-index属性在下列情况下会失效：**

- 父元素 position 为 relative 时，子元素的 z-index 失效。解决：父元素 position 改为 absolute 或 static；  
- 元素没有设置 position 属性为非 static 属性。解决：设置该元素的 position 属性为 relative，absolute 或是 fixed 中的一种；  
- 元素在设置 z-index 的同时还设置了 float 浮动。解决：float去除，改为 display：inline-block；  



# more

[高频前端面试题汇总之CSS篇](https://blog.csdn.net/weixin_45506717/article/details/131285712)


