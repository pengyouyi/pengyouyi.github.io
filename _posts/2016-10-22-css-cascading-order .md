---
layout: post
title: CSS选择器层叠顺序优先级
tags:
- CSS
categories: CSS
description: CSS选择器层叠顺序优先级
---
# CSS选择器层叠顺序优先级

## 选择器类型-CSS Selectors

下列是一份 优先级逐级增加的 选择器列表：

### 1.元素(类型)选择器（type selectors）和伪元素选择器（pseudo-elements）

**元素(类型)选择器**
html {color:black;}
h1 {color:blue;}
h2 {color:silver;}
**伪元素选择器(常见6个,常用4个)**
1）[::after](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::after)
2）[::before](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::before)
3）[::first-letter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-letter)
4）::first-line
[::selection](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::selection)
::backdrop

更详细的伪元素介绍
[https://www.w3.org/TR/selectors/#pseudo-elements](https://www.w3.org/TR/selectors/#pseudo-elements)
[https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements)

### 2.类选择器（class selectors） ，属性选择器（attributes selectors），伪类选择器（pseudo-classes）

**类选择器**
.example
span.demo
**属性选择器**
[attr]
[attr=value]
[attr~=value]
[attr|=value]
[attr^=value]
[attr$=value]
[attr*=value]
[attr operator value i]

(例如：
h1[title]
input[type="radio"]
a[href^="#"] {background-color:gold}
span[class="example"]
)
更详细的伪元素介绍
[https://www.w3.org/TR/selectors/#attribute-selectors](https://www.w3.org/TR/selectors/#attribute-selectors)
[https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors)
**伪类选择器**
(例如:
a:link { color: blue } /* 未访问链接 */
a:visited { color: purple } /* 已访问链接 */
a:hover { font-weight: bold } /* 用户鼠标悬停 */
a:active { color: lime } /* 激活链接 */

input[type="radio"]:checked { margin-left: 25px; }
input[type="text"]:disabled { background: #ccc; }
.last-name:focus { color: lime; }

li:first-child { color:green; }
tr:nth-child(2n)
)
更详细的伪类介绍
[https://www.w3.org/TR/selectors/#pseudo-classes](https://www.w3.org/TR/selectors/#pseudo-classes)

### 3.ID选择器

（例如：#example）

### 4.通用选择器（universal selector）( * ),组合符合（combinators） (+, >, ~, ' ')  和 否定伪类（negation pseudo-class）(:not()) **不会影响优先级**（但是，在 :not() 内部声明的选择器是会影响优先级的）。

**通用选择器**
(例如：
*[lang^=en]{color:green;}
*.warning {color:red;}
）
note：不推荐使用通配选择器,因为它是性能最低的一个CSS选择器
**组合符合**
[相邻兄弟选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Adjacent_sibling_selectors) +
li + li {
  color: red;
}
h1 + p {
  margin-top: 50px;
}
[通用兄弟选择器-General sibling selectors](https://developer.mozilla.org/zh-CN/docs/Web/CSS/General_sibling_selectors) ~
p ~ span {
  color: red;
}
[子选择器-Child selectors](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Child_selectors) >
div > span {
  background-color: DodgerBlue;
}
[后代选择器-Descendant selectors](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Descendant_selectors)
div span { 
  background-color: DodgerBlue; 
}
[否定伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/%3Anot) :not()
p:not(.classy) { 
  color: red; 
}
body :not(p) { 
  color: green; 
}


### 5.给元素添加的内联样式 

(例如, style="font-weight:bold") 总会覆盖外部样式表的任何样式 ，因此可看作是具有最高的优先级。

## !important 规则例外

当在一个样式声明上使用 !important 规则时，该样式声明会覆盖CSS中任何其他的声明；
使用 !important 是一个坏习惯，应该尽量避免。

## :not 伪类例外

:not 否定伪类在优先级计算中不会被看作是伪类. 事实上, 在计算选择器数量时还是会把其中的选择器当做普通选择器进行计数.

## Form-based specificity
基于形式的优先级
优先级是基于选择器的形式进行计算的。在下面的例子中，尽管选择器*[id="foo"] 选择了一个ID，但是它还是作为一个属性选择器来计算自身的优先级。
html
```html
<p id="foo">I am a sample text.</p>
```
CSS
```css
* #foo {
  color: green;
}
*[id="foo"] {
  color: purple;
}
```
result：show green
reason：虽然匹配了相同的元素，但是 ID 选择器拥有更高的优先级。所以第一条样式声明生效。

## 无视DOM树中的距离
html
```html
<html>
<body>
  <h1>Here is a title!</h1>
</body>
</html>
```
CSS
```css
body h1 {
  color: green;
}
html h1 {
  color: purple;
}
```
result:show purple

## css定义权重
**_a : 1000_**
内联样式 （ style="color:#f60;"）
**_b : 100_**
ID选择器  id 
**_c : 10_**
类选择器 （ .demo ）
伪类选择器  （  :hover ）
属性选择器  （  input[type="radio"]）
**_d : 1_**
元素（类型） （ 选择器  p , h1）
伪元素选择器  （  p::before）

## css优先级
!important > id > class > tag
!important > （内联样式）Inline style > （内部样式）Internal style sheet > （外部样式）External style sheet 

note：
`<style></style> 同 <link /> 同级，应用取决于<style>标签和<link /> 标签的先后顺序`

有个例外的情况，就是如果外部样式放在内部样式的后面，则外部样式将覆盖内部样式。
```html
<head>
    <style type="text/css">
      /* 内部样式 */
      h3{color:green;}
    </style>
 
    <!-- 外部样式 style.css -->
    <link rel="stylesheet" type="text/css" href="style.css"/>
    <!-- 设置：h3{color:blue;} -->
</head>
<body>
    <h3>测试！</h3>
</body>
```

## example
```html
<!DOCTYPE HTML>
<style type="text/css">
    div {
        width: 100px;
        height: 100px;
    }
    #c1 #c2 div.con {     /* a=0 b=2 c=1 d=1 -> specificity = 0,2,1,1 */
        background-color: yellow;
    }
    div {                 /* a=0 b=0 c=0 d=1 -> specificity = 0,0,0,1 */
        background-color: black;
    }
    #c2 div {             /* a=0 b=1 c=0 d=1 -> specificity = 0,1,0,1 */
        background-color: blue;
    }
    #c2 #content {        /* a=0 b=2 c=0 d=0 -> specificity = 0,2,0,0 */
        background-color: red;
    }
</style>
<div id="c1">
    <div id="c2">
        <div id="content" class="con"></div>
    </div>
</div>
```
result: '#c1 #c2 div.con" 的特殊性( [0,2,1,1] )最高，是背景色应该是黄色。

## W3C 官方给出的例子：
```html
*             {}  /* a=0 b=0 c=0 d=0 -> specificity = 0,0,0,0 */
li            {}  /* a=0 b=0 c=0 d=1 -> specificity = 0,0,0,1 */
li:first-line {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
ul li         {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
ul ol+li      {}  /* a=0 b=0 c=0 d=3 -> specificity = 0,0,0,3 */
h1 + *[rel=up]{}  /* a=0 b=0 c=1 d=1 -> specificity = 0,0,1,1 */
ul ol li.red  {}  /* a=0 b=0 c=1 d=3 -> specificity = 0,0,1,3 */
li.red.level  {}  /* a=0 b=0 c=2 d=1 -> specificity = 0,0,2,1 */
#x34y         {}  /* a=0 b=1 c=0 d=0 -> specificity = 0,1,0,0 */
style=""          /* a=1 b=0 c=0 d=0 -> specificity = 1,0,0,0 */
------------------------------------------------------------------------
<HEAD>
<STYLE type="text/css">
 #x97z { color: red }
</STYLE>
</HEAD>
<BODY>
<P ID=x97z style="color: green">
</BODY>
```


# 更多-more
* [https://www.w3.org/TR/selectors/#specificity](https://www.w3.org/TR/selectors/#specificity)
* [https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)
* [http://www.w3help.org/zh-cn/kb/](http://www.w3help.org/zh-cn/kb/)
* [http://www.cnblogs.com/xugang/archive/2010/09/24/1833760.html](http://www.cnblogs.com/xugang/archive/2010/09/24/1833760.html)