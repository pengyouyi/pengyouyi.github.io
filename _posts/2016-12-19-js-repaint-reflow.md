---
layout: post
title: 浏览器重排与重绘
tags:
- 性能
categories: CSS
description: 浏览器重排与重绘
---

# repaints & reflows

# what is repaint and reflows
什么是重排和重绘 ？
浏览器下载完页面中的所有组件——HTML标记、JavaScript、CSS、图片之后会解析生成两个内部数据结构:
**DOM树**
> 表示页面结构

**渲染树**
> 表示DOM节点如何显示

DOM树中的每一个需要显示的节点在渲染树种至少存在一个对应的节点（隐藏的DOM元素disply值为none 在渲染树中没有对应的节点）。渲染树中的节点被称为“帧(frames)”或“盒(boxes)",符合CSS模型的定义，理解页面元素为一个具有内边距(padding)，外边距(margins)，边框(borders)和位置(position)的盒子。一旦DOM和渲染树构建完成，浏览器就开始显示（绘制(paint)）页面元素。

当DOM的变化影响了元素的几何属性（宽或高），浏览器需要重新计算元素的几何属性，同样其他元素的几何属性和位置也会因此受到影响。浏览器会使渲染树中受到影响的部分失效，并重新构造渲染树。这个过程称为**`重排`**。完成重排后，浏览器会重新绘制受影响的部分到屏幕，该过程称为**`重绘`**。

由于浏览器的流布局，对渲染树的计算通常只需要遍历一次就可以完成。但table及其内部元素除外，它可能需要多次计算才能确定好其在渲染树中节点的属性值，比同等元素要多花两倍时间，这就是我们尽量避免使用table布局页面的原因之一。

**通俗理解：**

> `重排`是DOM元素的几何属性变化，或者页面布局发生变化，渲染树需要重新计算。

> `重绘`是一个元素外观的改变所触发的浏览器行为，例如改变visibility、outline、背景色等属性。浏览器会根据元素的新属性重新绘制，使元素呈现新的外观。重绘不会带来重新布局，并不一定伴随重排。

# The relationship between repaint and reflow
重绘不会引起重排，但重排一定会引起重绘，一个元素的重排通常会带来一系列的反应，甚至触发整个文档的重排和重绘，性能代价是高昂的。

并不是所有的DOM变化都会影响几何属性，比如改变一个元素的背景色并不会影响元素的宽和高，这种情况下只会发生重绘。

# DOM访问与修改
重排和重绘的代价究竟多大

ECMAScript每次访问DOM元素，需交纳“过桥费”。修改元素更昂贵，它会导致浏览器重新计算页面的几何变化（重排和重绘）。

每次过桥+重排+重绘
```js
function innerHTMLLoop(){
    var demo = document.getElementById("demo");
    var times = 15000;
    for(var i = 0; i < times; i++){
        demo.innerHTML += "a";
    }

}
console.time(1);
innerHTMLLoop();
console.timeEnd(1);   //  1: 1008.557ms
```
只过桥
```js
var str = "";
function innerHTMLLoop2(){
    var times = 15000;
    for(var i = 0; i < times; i++){
        var tmp = document.getElementById("demo2").innerHTML;
        str += "a";
    }
    document.getElementById("demo2").innerHTML = str;

}
console.time(2);
innerHTMLLoop2();
console.timeEnd(2);   //  2: 10.318ms
```
高效率，访问一次DOM
```js
var str = "";
function innerHTMLLoop3(){
    var times = 15000;
    for(var i = 0; i < times; i++){
        str += "a";
    }
    document.getElementById("demo3").innerHTML = str;

}
console.time(3);
innerHTMLLoop3();
console.timeEnd(3);  //  3: 1.190ms
```
访问DOM的次数越多，代码的运行速度越慢。因此，能减少DOM访问的次数则尽量减少，尽量留在ECMAScript这端处理。

# when dose a reflow happen
当页面布局和几何属性改变时就需要“重排”。下述情况中会发生重排。

1、添加或者删除可见的DOM元素
2、元素位置改变
3、元素尺寸改变（包括：width height margin border padding 等属性改变）
4、元素内容改变（例如：一个文本被另一个不同尺寸的图片替代）
5、页面渲染初始化（这个无法避免）
6、浏览器窗口尺寸改变

根据改变的范围和程度，渲染树中或大或小的对应部分也需要重新计算。有些改变会触发整个页面的重排：例如，当滚动条出现时。

# Queuing and Flushing Render Tree Changes
渲染树变化的排队与刷新

由于每次重排都会产生计算消耗，大多数浏览器通过队列化修改并批量执行来优化重排过程。
```js
var ele = document.getElementById('myDiv');
ele.style.borderLeft = '1px';
ele.style.borderRight = '2px';
ele.style.padding = '5px';
```
乍一想，元素的样式改变了三次，每次改变都会引起重排和重绘，所以总共有三次重排重绘过程，但是浏览器并不会这么笨，它会把三次修改“保存”起来，一次完成！

但是，有些时候你可能会（经常是不知不觉）强制刷新队列并要求计划任务立即执行。
```js
var ele = document.getElementById('myDiv');
ele.style.borderLeft = '1px';
ele.style.borderRight = '2px';

var eleOffsetTop = ele.offsetTop; 
var eleOffsetLeft = ele.offsetLeft; 

ele.style.padding = '5px';
```
上面的代码，前两次的操作会缓存在渲染队列中待处理，但是一旦offsetHeight属性被请求了，队列就会立即执行，所以总共有两次重排与重绘。

**获取布局信息的操作**会导致列队刷新，比如以下方法：
- offsetTop, offsetLeft, offsetWidth, offsetHeight
- scrollTop, scrollLeft, scrollWidth, scrollHeight
- clientTop, clientLeft, clientWidth, clientHeight
- getComputedStyle() (currentStyle in IE)

以上属性和方法需要返回最新的布局信息，因此浏览器不得不执行渲染队列中的“待处理变化”并触发重排以返回正确的值。

> **因此在修改样式的过程中，最好避免使用上面列出的属性。** 它们都会刷新渲染列队，即使队列中改变的样式属性和想要获取的属性值并没有什么关系。

一个更有效的方法是不要在布局信息改变时查询它。可以将查询代码放到尾末
```js
var ele = document.getElementById('myDiv');
ele.style.borderLeft = '1px';
ele.style.borderRight = '2px';
ele.style.padding = '5px';

var eleOffsetTop = ele.offsetTop; 
var eleOffsetLeft = ele.offsetLeft; 
```

# Minimizing Repaints and Reflows
```js
var ele = document.getElementById('myDiv');
ele.style.borderLeft = '1px';
ele.style.borderRight = '2px';
ele.style.padding = '5px';
```
三个样式属性被改变，每一个都会影响元素的几何结构，虽然大部分现代浏览器都做了优化，只会引起一次重排，但是像上文一样，如果一个及时的属性被请求，那么就会强制刷新队列，而且这段代码四次访问DOM。

一个很显然的优化策略就是把它们的操作合成一次，这样只会修改DOM一次。使用cssText属性可以实现：
```js
var ele = document.getElementById('myDiv');

// 1. 重写style
ele.style.cssText = 'border-left: 1px; border-right: 2px; padding: 5px;';

// 2. add style
ele.style.cssText += 'border-;eft: 1px;'

// 3. use class
ele.className = 'active';
```

# 批量修改DOM
当需要对DOM元素进行一系列操作时，可以通过以下步骤来减少重绘和重排的次数：
1.使元素脱离文档流。
2.对其应用多重改变。
3.把元素带回文档中。

有三种基本方法可以使DOM脱离文档：
- 隐藏元素，应用修改，重新显示。
- 使用文档片段（document fragment）在当前DOM之外构建一个子树，再把它拷贝回文档。
- 将原始元素拷贝到一个脱离文档的节点中，修改副本，完成后再替换原始元素。

# Caching Layout Information
缓存布局信息

# Take Elements Out of the Flow for Animations
让元素脱离动画流

用展开/折叠的方式来显示和隐藏部分页面是一种常见的交互模式。它通常包括展开区域的几何动画，并将页面其他部分推向下方。

一般来说，重排只影响渲染树中的一小部分，但也可能影响很大的部分，甚至整个渲染树。浏览器所需要重排的次数越少，应用程序的响应速度就越快。因此当页面顶部的一个动画推移页面整个余下的部分时，会导致一次代价昂贵的大规模重排，让用户感到页面一顿一顿的。渲染树中需要重新计算的节点越多，情况就会越糟。

使用以下步骤可以避免页面中的大部分重排：
1.使用绝对位置定位页面上的动画元素，将其脱离文档流
2.让元素动起来。当它扩大时，会临时覆盖部分页面。但这只是页面一个小区域的重绘过程，不会产生重排并重绘页面的大部分内容。
3.当动画结束时恢复定位，从而只会下移一次文档的其他元素

# Summary
重排优化有如下五种方法

(1)将多次改变样式属性的操作合并成一次操作，减少DOM访问。

(2)如果要批量添加DOM，可以先让元素脱离文档流，操作完后再带入文档流，这样只会触发一次重排。（fragment元素的应用）

(3)将需要多次重排的元素，position属性设为absolute或fixed，这样此元素就脱离了文档流，它的变化不会影响到其他元素。例如有动画效果的元素就最好设置为绝对定位。

(4)由于display属性为none的元素不在渲染树中，对隐藏的元素操作不会引发其他元素的重排。如果要对一个元素进行复杂的操作时，可以先隐藏它，操作完成后再显示。这样只在隐藏和显示时触发两次重排。

(5)在内存中多次操作节点，完成后再添加到文档中去。例如要异步获取表格数据，渲染到页面。可以先取得数据后在内存中构建整个表格的html片段，再一次性添加到文档中去，而不是循环添加每一行。









































