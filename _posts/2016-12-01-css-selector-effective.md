---
layout: post
title: 编写高效的CSS选择器
tags:
- standard
- optimize
categories: CSS
description: 编写高效的CSS选择器
---

# CSS渲染规则、CSS选择器的效率

# [浏览器对css选择器的渲染规则](https://css-tricks.com/efficiently-rendering-css/)

[样式系统从最右边的选择符开始向左进行匹配规则（右->左）](http://stackoverflow.com/questions/5797014/why-do-browsers-match-CSS-selectors-from-right-to-left)。

只要当前选择符的左边还有其他选择符，样式系统就会继续向左移动，直到找到和规则匹配的元素，或者因为不匹配而退出。

{% highlight html linenos %}
div.nav > ul li a[title]
{% endhighlight %}

上述例子，浏览器首先会尝试在你的HTML标签中寻找“a[title]”元素，接着在匹配“li和ul”，最后在去匹配“div.nav”。

选择器的最后一部分，也就是选择器的最右边（在这个例子中就是a[title]部分）部分被称为“关键选择器”，它将决定你的选择器的效率如何？是高还是低。

# 决定css选择器性能的关键点

- 1.首先选择器对性能的影响源于**浏览器匹配选择器和文档元素时所消耗的时间**，所以优化选择器的原则是应尽量避免使用消耗更多匹配时间的选择器。

- 2.最右侧的选择器对于性能就起着**关键性的作用**，它是最先开始查找的，如果最右侧是#id选择器那么性能就很高，如果是标签选择器那么性能就会大打折扣。

# [CSS选择器的效率（从高到低）](http://csswizardry.com/2011/09/writing-efficient-css-selectors/)
Google 资深web开发工程师 Steve Souders 对 CSS 选择器的执行效率从高到低做了一个排序：

1.id选择器（#myid）  
2.类选择器（.myclassname）  
3.标签选择器（div,h1,p）  
4.相邻选择器（h1+p）  
5.子选择器（ul > li）  
6.后代选择器（li a）  
7.通配符选择器（*）  
8.属性选择器（a[rel="external"]）  
9.伪类选择器（a:hover, li:nth-child）  

id选择器的性能是最高的，但是id具有唯一性

class选择器次之，具有共性，常使用之

如果你非常在意页面的性能那千万别使用CSS3选择器。实际上，在所有浏览器中，用 class 和 id 来渲染，比那些使用同胞，后代选择器，子选择器（sibling, descendant and child selectors）对页面性能的改善更值得关注。

# Guidelines for efficient CSS

## Avoid universal rules

Make sure a rule doesn’t end up in the universal category!

{% highlight html linenos %}
#content * {..}
{% endhighlight %}

## Don’t qualify ID rules with tag names or classes

<div class="show">
  <div class="incorrect">BAD</div>
    button#backButton {…}
  <div class="incorrect">BAD</div>
    .menu-left#newMenuIcon {…}
  <div class="correct">GOOD</div>
    #backButton {…}
  <div class="correct">GOOD</div>
    #newMenuIcon {…}
</div>

id在HTML中是唯一的，也就是说一个HTML页面只限定有一个id为“XX”的元素，而不限制拥有这个ID元素的标签名，所以,在button#backButton {…}中,button标签完全是无意义的，可以，而且应该去掉，button#backButton {…}与#backButton {…}是等价的。在#backButton前多写了button,只会引起样式系统向左移动，继续查找页面元素，损耗页面性能，延长页面渲染时间。

## Don’t qualify class rules with tag names

<div class="show">
  <div class="incorrect">BAD</div>
    treecell.indented {…}
  <div class="correct">GOOD</div>
    .treecell-indented {…}
  <div class="correct">BEST</div>
    .hierarchy-deep {…}
</div>


## Use the most specific category possible

<div class="show">
  <div class="incorrect">BAD</div>
  treeitem[mailfolder="true"] > treerow > treecell {…}
  <div class="correct">GOOD</div>
  .treecell-mailfolder {…}
</div>
尽量选择最具体的方式,避免使用多层标签选择器。使用 class 选择器替换，减少css查找

## Avoid the descendant selector
后代选择器在CSS中是最昂贵的选择器。贵得要命——尤其是把它和标签或通配符放在一起！

<div class="show">
  <div class="incorrect">BAD</div>
  treeitem[mailfolder="true"] > treerow > treecell {…}
  <div class="correct">GOOD</div>
  .treecell-mailfolder {…}
</div>

## Tag category rules should never contain a child selector

<div class="show">
  <div class="incorrect">BAD</div>
  treehead > treerow > treecell {…}
  <div class="correct">GOOD</div>
  .treecell-header {…}
</div>

## Question all usages of the child selector

<div class="show">
  <div class="incorrect">BAD</div>
  treeitem[IsImapServer=”true”] > treerow > .tree-folderpane-icon {…}
  <div class="correct">GOOD</div>
  .tree-folderpane-icon[IsImapServer=”true”] {…}
</div>

## Rely on inheritance

<div class="show">
  <div class="incorrect">BAD</div>
  #bookmarkMenuItem > .menu-left { list-style-image: url(blah) }
  <div class="correct">GOOD</div>
  #bookmarkMenuItem { list-style-image: url(blah) }
</div>

## Use -moz-image-region!

## Use scoped stylesheets

## Avoid vendor-specific features unless necessary

**summary：**

1.避免使用通配符  
2.不使用标签名或类名修饰ID规则：如果规则使用ID选择器作为关键选择器，不要给规则添加标签名。因为ID本身就是唯一的，添加标签名会不必要地降低匹配效率。  
3.不使用标签名修饰类：相较于标签，类更具独特性。  
4.尽量选择最具体的方式：造成低效的最简单粗暴的原因就是在标签上使用太多规则。给元素添加类可以更快细分到类方式，可以减少规则去匹配标签的时间。  
5.关于后代选择器和子选择器：避免使用后代选择器，非要用的话建议用子选择器代替，但子选择器也要慎用，标签规则永远不要包含子选择器。  
6.利用可继承性：没必要在一般内容上声明样式。

# 更多-more
- [https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Writing_efficient_CSS](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Writing_efficient_CSS)
- [https://css-tricks.com/efficiently-rendering-css/](https://css-tricks.com/efficiently-rendering-css/)
- [http://csswizardry.com/2011/09/writing-efficient-css-selectors/](http://csswizardry.com/2011/09/writing-efficient-css-selectors/)














































