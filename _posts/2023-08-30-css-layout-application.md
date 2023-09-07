---
layout: post
title: CSS CSS 场景应用-画三角形、解决1px
tags:
- Interview
- layout
categories: CSS
description: CSS 面试题集合
---

# CSS 场景应用-画三角形、解决1px

# Triangle 三角形

用纯CSS创建一个三角形的原理是什么？

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
# square 正方形

实现一个宽高自适应的正方形

利用vw来实现：
```css
.square {
  width: 10%;
  height: 10vw;
  background: tomato;
}
```

利用元素的 margin/padding 百分比是相对父元素 width 的性质来实现：

```css
.square {
  width: 20%;
  height: 0;
  padding-top: 20%;
  background: orange;
}
```

利用子元素的 margin-top 的值来实现:
```css
.square {
  width: 30%;
  overflow: hidden;
  background: yellow;
}
.square::after {
  content: '';
  display: block;
  margin-top: 100%;
}
```

# 画一条 0.5px 的线

采用 transform: scale() 的方式，该方法用来定义元素的 2D 缩放转换：✔

```css
transform: scale(0.5,0.5);
```
采用 meta viewport 的方式 ✘

```html
<meta name="viewport" content="width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5"/>
```

这样就能缩放到原来的0.5倍，如果是1px那么就会变成0.5px。viewport 只针对于移动端，只在移动端上才能看到效果

# 设置小于12px的字体

在谷歌下css设置字体大小为12px及以下时，显示都是一样大小，都是默认12px。

**解决办法：**

① 使用 css3 的 transform 缩放属性 -webkit-transform:scale(0.5); 注意 -webkit-transform:scale(0.75); 收缩的是整个元素的大小，这时候，如果是内联元素，必须要将内联元素转换成块元素，可以使用 display：block/inline-block/…；  ✔

② 使用 Webkit 的内核的 -webkit-text-size-adjust 的私有CSS属性来解决，只要加了 -webkit-text-size-adjust:none; 字体大小就不受限制了。但是 chrome 更新到27版本之后就不可以用了。所以高版本 chrome 谷歌浏览器已经不再支持 -webkit-text-size-adjust 样式，所以要使用时候慎用。 ✘

③ 使用图片：如果是内容固定不变情况下，使用将小于12px文字内容切出做图片，这样不影响兼容也不影响美观。 ✘

# 如何解决 1px 问题？

1px 问题指的是：在一些 Retina屏幕 的机型上，移动端页面的 1px 会变得很粗，呈现出不止 1px 的效果。原因很简单——CSS 中的 1px 并不能和移动设备上的 1px 划等号。它们之间的比例关系有一个专门的属性来描述：

```css
window.devi
cePixelRatio = 设备的物理像素 / CSS像素。
```
打开 Chrome 浏览器，启动移动端调试模式，在控制台去输出这个 devicePixelRatio 的值。这里选中 iPhone6/7/8 这系列的机型，输出的结果就是2：
这就意味着设置的 1px CSS 像素，在这个设备上实际会用 2 个物理像素单元来进行渲染，所以实际看到的一定会比 1px 粗一些。

**解决1px 问题的三种思路：**

**<u>思路一：直接写 0.5px</u>**

如果之前 1px 的样式这样写：
```
border:1px solid #333
```
可以先在 JS 中拿到 window.devicePixelRatio 的值，然后把这个值通过 JSX 或者模板语法给到 CSS 的 data 里，达到这样的效果（这里用 JSX 语法做示范）：
```html
<div id="container" data-device={{window.devicePixelRatio}}></div>
```
然后就可以在 CSS 中用属性选择器来命中 devicePixelRatio 为某一值的情况，比如说这里尝试命中 devicePixelRatio 为2的情况：

```css
#container[data-device="2"] {
  border:0.5px solid #333
}
```
直接把 1px 改成 1/devicePixelRatio 后的值，这是目前为止最简单的一种方法。这种方法的缺陷在于兼容性不行，IOS 系统需要8及以上的版本，安卓系统则直接不兼容。

**<u>思路二：伪元素先放大后缩小</u>**

这个方法的可行性会更高，兼容性也更好。唯一的缺点是代码会变多。

思路是先放大、后缩小：在目标元素的后面追加一个 ::after 伪元素，让这个元素布局为 absolute 之后、整个伸展开铺在目标元素上，然后把它的宽和高都设置为目标元素的两倍，border 值设为 1px。接着借助 CSS 动画特效中的放缩能力，把整个伪元素缩小为原来的 50%。此时，伪元素的宽高刚好可以和原有的目标元素对齐，而 border 也缩小为了 1px 的二分之一，间接地实现了 0.5px 的效果。

```css
#container[data-device="2"] {
    position: relative;
}
#container[data-device="2"]::after{
      position:absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 200%;
      content:"";
      transform: scale(0.5);
      transform-origin: left top;
      box-sizing: border-box;
      border: 1px solid #333;
    }
}
```
**<u>思路三：viewport 缩放来解决</u>**
【不推荐使用】

这个思路就是对 meta 标签里几个关键属性下手：

```html
<meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">
```

这里针对像素比为2的页面，把整个页面缩放为了原来的1/2大小。这样，本来占用2个物理像素的 1px 样式，现在占用的就是标准的一个物理像素。根据像素比的不同，这个缩放比例可以被计算为不同的值，用 js 代码实现如下：
```js
const scale = 1 / window.devicePixelRatio;
// 这里 metaEl 指的是 meta 标签对应的 Dom
metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`);
```

这样解决了，但这样做的副作用也很大，整个页面被缩放了。这时 1px 已经被处理成物理像素大小，这样的大小在手机上显示边框很合适。但是，一些原本不需要被缩小的内容，比如文字、图片等，也被无差别缩小掉了。





