---
layout: post
title: CSS 面试题集合 -- 页面布局
tags:
- Interview
- layout
categories: CSS
description: CSS 面试题集合
---

# CSS 面试题集合 -- 页面布局

# @dedia

- 什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的IE？

**什么是响应式设计？**

响应式网页设计就是一个网站能够兼容多个终端，而不是为每个终端做一个特定的版本。这样，我们就可以不必为不断到来的新设备做专门的版本设计和开发了。

页面的设计和开发应当根据用户行为以及设备环境（系统平台、屏幕尺寸、屏幕定向等）进行相应的响应和调整。具体的实践方式由多方面组成，包括弹性网格和布局、图片、css media query 的使用等。无论用户正在使用笔记本还是 iPad，我们的页面都应该能够自动切换分辨率、图片尺寸及相关脚本功能等，以适应不同设备；换句话说，页面应该有能力去自动响应用户的设备环境。

**响应式设计的基本原理**

响应式设计的基本原理是通过媒体查询 @media 检测不同的设备屏幕尺寸做处理。

**兼容：**

页面头部必须有 meta 声明 viewport：

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no”>
```
兼容IE可以使用JS辅助一下来解决

[浏览器兼容与响应式布局](https://www.cnblogs.com/baiyygynui/p/5903749.html)

[什么是响应式设计？为什么要做响应式设计？响应式设计的基本原理是什么？](https://www.cnblogs.com/luckyXcc/p/5772274.html)

# margin 重叠

**什么是 margin 重叠问题？**

两个块级元素的上外边距和下外边距可能会合并（折叠）为一个外边距，其大小会取其中外边距值大的那个，这种行为就是外边距折叠。需要注意的是，浮动的元素和绝对定位这种脱离文档流的元素的外边距不会折叠。重叠只会出现在垂直方向。

**计算原则：**
折叠合并后外边距的计算原则如下：

- 如果两者都是正数，那么就去最大者  
- 如果是一正一负，就会正值减去负值的绝对值  
- 两个都是负值时，用0减去两个中绝对值大的那个  

**margin 重叠,解决办法：**

对于折叠的情况，主要有两种：兄弟之间重叠和父子之间重叠

**（1）兄弟之间重叠**

- 底部元素变为行内盒子：display: inline-block  
- 底部元素设置浮动：float  
- 底部元素的 position 的值为 absolute/fixed  

**（2）父子之间重叠**

- 父元素加入：overflow: hidden  
- 父元素添加透明边框：border:1px solid transparent  
- 子元素变为行内盒子：display: inline-block  
- 子元素加入浮动属性或定位  


# stacking order 层叠顺序

层叠顺序，英文称作 stacking order，表示元素发生层叠时有着特定的垂直显示顺序。下面是盒模型的层叠规则：

<div class="rd">
    <img src="/assets/images/2023/7-8-9/z-index.png" alt="">
</div>

对于上图，由上到下分别是：

（1）背景和边框：建立当前层叠上下文元素的背景和边框。  
（2）负的 z-index：当前层叠上下文中，z-index 属性值为负的元素。  
（3）块级盒：文档流内非行内级非定位后代元素。  
（4）浮动盒：非定位浮动元素。  
（5）行内盒：文档流内行内级非定位后代元素。  
（6）z-index:0：层叠级数为0的定位元素。  
（7）正z-index：z-index 属性值为正的定位元素。  

注意: 当定位元素z-index:auto，生成盒在当前层叠上下文中的层级为 0，不会建立新的层叠上下文，除非是根元素。

# display、float、position的关系

（1）首先判断 display 属性是否为 none，如果为 none，则 position 和 float 属性的值不影响元素最后的表现。  
（2）然后判断 position 的值是否为 absolute 或者 fixed，如果是，则 float 属性失效，并且 display 的值应该被设置为 table 或者 block，具体转换需要看初始转换值。  
（3）如果 position 的值不为 absolute 或者 fixed，则判断 float 属性的值是否为 none，如果不是，则 display 的值则按上面的规则转换。注意，如果 position 的值为 relative 并且 float 属性的值存在，则 relative 相对于浮动后的最终位置定位。  
（4）如果 float 的值为 none，则判断元素是否为根元素，如果是根元素则 display 属性按照上面的规则转换，如果不是，则保持指定的 display 属性值不变。  

display: none  》 position: absolute/fixed  》 float

# absolute与fixed共同点与不同点

**共同点：**

- 改变行内元素的呈现方式，将 display 置为 inline-block  
- 使元素脱离普通文档流，不再占据文档物理空间  
- 覆盖非定位文档元素  

**不同点：**

- absolute 与 fixed 的根元素不同，absolute 的根元素可以设置，fixed 根元素是浏览器。  
- 在有滚动条的页面中，absolute 会跟着父元素进行移动，fixed 固定在页面的具体位置。  




