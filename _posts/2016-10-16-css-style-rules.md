---
layout: post
title: CSS书写规范、顺序
tags:
- standard
categories: CSS
description: CSS书写规范、顺序
---
# CSS书写规范、顺序推荐

# 一、CSS书写顺序

1. 位置属性(position, top, right, z-index, display, float等)  
2. box大小(width, height, padding, margin)  
3. 文字系列(font, line-height, letter-spacing, color- text-align等)  
4. 背景(background, border等)  
5. 其他(animation, transition等)  

# 二、CSS书写规范 
**♍ 1. 使用CSS缩写属性**

CSS有些属性是可以缩写的，比如padding,margin,font等等，这样精简代码同时又能提高用户的阅读体验。

**♍ 2. 去掉小数点前的“0”**

**♍ 3. 简写命名**  
很多用户都喜欢简写类名，但前提是要让人看懂你的命名才能简写哦！

**♍ 4. 16进制颜色代码缩写**  
有些颜色代码是可以缩写的，我们就尽量缩写吧，提高用户体验为主。

**♍ 5. 连字符CSS选择器命名规范**  
1）长名称或词组可以使用中横线来为选择器命名。  
2）不建议使用“_”下划线来命名CSS选择器，为什么呢？  
输入的时候少按一个shift键； 浏览器兼容问题 （比如使用_tips的选择器命名，在IE6是无效的）   能良好区分JavaScript变量命名（JS变量命名是用“_”）  

**♍ 6. 不要随意使用id**  
id在JS是唯一的，不能多次使用，而使用class类选择器却可以重复使用，另外id的优先级优先与class，所以id应该按需使用，而不能滥用。

**♍ 7. 为选择器添加状态前缀**  
有时候可以给选择器添加一个表示状态的前缀，让语义更明了，比如下图是添加了“.is-”前缀。

**♍ 8. 块级内容缩进**  
为了反映层级关系和提高可读性，块级内容都应缩进
```css
@media screen, projection {

  html {
    background: #fff;
    color: #444;
  }

}
```

**♍ 9. 声明结束**

每行 CSS 都应以分号结尾。

<pre class="badcode">
/* Not recommended */
.test {
  display: block;
  height: 100px
}
</pre>

<pre class="goodcode">
/* Recommended */
.test {
  display: block;
  height: 100px;
}
</pre>

**♍ 10. 属性名结尾**

属性名和值之间都应有一个空格。

<pre class="badcode">
/* Not recommended */
h3 {
  font-weight:bold;
}
</pre>

<pre class="goodcode">
/* Recommended */
h3 {
  font-weight: bold;
}
</pre>

**♍ 11. 声明样式块的分隔**

在选择器和 {} 之间用空格隔开。

<pre class="badcode">
/* Not recommended: missing space */
#video{
  margin-top: 1em;
}

/* Not recommended: unnecessary line break */
#video
{
  margin-top: 1em;
}
</pre>

<pre class="goodcode">
/* Recommended */
#video {
  margin-top: 1em;
}
</pre>

**♍ 12. 选择器分隔**

每个选择器都另起一行。

<pre class="badcode">
/* Not recommended */
a:focus, a:active {
  position: relative; top: 1px;
}
</pre>

<pre class="goodcode">
/* Recommended */
h1,
h2,
h3 {
  font-weight: normal;
  line-height: 1.2;
}
</pre>

**♍ 13. CSS 引号**

尽可能的不用引号，迫不得已时使用单引号.

属性选择器和属性值用单引号，URI 的值不需要引号。

<pre class="badcode">
/* Not recommended */
@import url("//www.google.com/css/maia.css");

html {
  font-family: "open sans", arial, sans-serif;
}
</pre>

<pre class="goodcode">
/* Recommended */
@import url(//www.google.com/css/maia.css);

html {
  font-family: 'open sans', arial, sans-serif;
}
</pre>

**♍ 14. 分段注释**

用注释把 CSS 分成各个部分

<pre class="goodcode">
/* Header */
#adw-header {}

/* Footer */
#adw-footer {}

/* Gallery */
.adw-gallery {}
</pre>

**♍ 15. 单行规则声明**
<pre class="goodcode">
/* Single declarations on one line */
.span1 { width: 60px; }
.span2 { width: 140px; }
</pre>

**♍ 16. 选择器**

除非需要，否则不要在 id 或 class 前加元素名

<pre class="badcode">
/* Not recommended */
ul#example {}
div.error {}
</pre>

<pre class="goodcode">
/* Recommended */
#example {}
.error {}
</pre>

**♍ 17. 避免多id选择器**

建议不要超过 3

<pre class="badcode">
/* Bad example */
span { ... }
.page-container #stream .stream-item .tweet .tweet-header .username { ... }
.avatar { ... }
</pre>

<pre class="goodcode">
/* Good example */
.avatar { ... }
.tweet-header .username { ... }
.tweet .avatar { ... }
</pre>


# 更多-more
* [css属性在线重排工具](http://csscomb.com/online)
* [css在线校验](http://jigsaw.w3.org/css-validator/)
* [https://google.github.io/styleguide/htmlcssguide.xml#Protocol](https://google.github.io/styleguide/htmlcssguide.xml#Protocol)
* [http://codeguide.bootcss.com/](http://codeguide.bootcss.com/)
* [http://www.h-ui.net/Hui-notes-htmlStructure.shtml](http://www.h-ui.net/Hui-notes-htmlStructure.shtml)