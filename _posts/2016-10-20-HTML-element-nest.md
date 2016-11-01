---
layout: post
title: HTML元素嵌套规范
tags:
- HTML
categories: HTML
description: HTML元素嵌套规范
---
# HTML元素嵌套规范

HTML元素按功能分类
https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element

1、块级元素
一般用来搭建网站架构、布局、承载内容……它包括以下这些标签： 
address、blockquote、center、dir、div、dl、dt、dd、fieldset、form、h1~h6、hr、isindex、menu、noframes、noscript、ol、p、pre、table、ul 
[https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements)

2、内嵌元素
一般用在网站内容之中的某些细节或部位，用以“强调、区分样式、上标、下标、锚点”等等，下面这些标签都属于内嵌元素： 
a、abbr、acronym、b、bdo、big、br、cite、code、dfn、em、font、i、img、input、kbd、label、q、s、samp、select、small、span、strike、strong、sub、sup、textarea、tt、u、var 
[https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements)



# HTML 标签的嵌套规则 
1.块元素可以包含内联元素或某些块元素，但内联元素却不能包含块元素，它只能包含其它的内联元素：
```
[div][h1][/h1][p][/p][/div] —— 对
[a href=”#”][span][/span][/a] —— 对
[span][div][/div][/span] —— 错
```

2.块级元素不能放在[p]里面：
```
[p][ol][li][/li][/ol][/p] —— 错
[p][div][/div][/p] —— 错
```

3.有几个特殊的块级元素只能包含内嵌元素，不能再包含块级元素，这几个特殊的标签是：
```
h1、h2、h3、h4、h5、h6、p、dt
```

4.li 内可以包含 div 标签 
这一条其实不必单独列出来的，但是网上许多人对此有些疑惑，就在这里略加说明：
li 和 div 标签都是装载内容的容器，地位平等，没有级别之分（例如：h1、h2 这样森严的等级制度^_^），要知道，li 标签连它的父级 ul 或者是 ol 都可以容纳的，为什么有人会觉得 li 偏偏容纳不下一个 div 呢？别把 li 看得那么小气嘛，别看 li 长得挺瘦小，其实 li 的胸襟很大滴……

5.块级元素与块级元素并列、内嵌元素与内嵌元素并列：
```
[div][h2][/h2][p][/p][/div] —— 对
[div][a href=”#”][/a][span][/span][/div] —— 对
[div][h2][/h2][span][/span][/div] —— 错
```
```
a元素里不可以嵌套交互式元素(<a>、<button>、<select>等)
[pre]标签不能包含[img],[object],[big],[samll],[sub]和[sup]标签
[button]标签不能包 含[input],[select],[textarea],[label],[button],[form],[fieldset],[iframe] 和[isindex]标签
[label]标签不能包含其他[label]标签
[form]标签不能包含其他[form]标签
```

# HTML5的元素嵌套规则
元素的分类不再是块元素或内联元素这样来分类（其实从来就没有这样分） 而是按照如下分类来分：
Flow（流式元素）、Heading（标题元素）、Sectioning（章节元素）、Phrasing（段落元素）、
Embedded（嵌入元素）、Interactive（交互元素）、Metadata（元数据元素）

<img src="/assets/images/2016/10-11-12/html5-nesting.png" alt="html5-nesting.png">

**Flow（流式元素）**

所有可以放在body标签内，构成文档内容的元素均属于Flow元素。
因此，除了base, link, meta, style, title等只能放在head标签内的元素外，剩下的所有元素均属于Flow元素。

a， abbr， address， area（如果它是map元素的后裔）， article， aside， audio， b， bdi， bdo， blockquote， br， button， canvas， cite， code， command， datalist， del， details， dfn， div， dl，em， embed， fieldset， figure， footer， form， h1， h2， h3， h4， h5， h6， header， hgroup， hr， i， iframe， img， input， ins， kbd， keygen， label， map， mark， math， menu， meter，nav， noscript， object， ol， output， p， pre， progress， q， ruby， s， samp， script， section， select， small， span， strong， style（如果该元素设置了scoped属性）， sub， sup， svg， table，textarea， time， u， ul， var， video， wbr， text

**Heading（标题元素）**

标题式元素定义一个区块/章节（section）（无论是明确的使用章节式内容的元素标记，或者标题式内容自身所隐含的）的标题。

h1， h2， h3， h4， h5， h6， hgroup

**Sectioning（章节元素）**

章节式元素是用于定义标题及页脚范围的元素。

article， aside， nav， section

**Phrasing（段落元素）**

段落式元素是文档中的文本、标记段落级文本的元素。

a（如果其只包含段落式元素）， abbr， area（如果它是map元素的后裔）， audio， b， bdi， bdo， br， button， canvas， cite， code， command， datalist， del（如果其只包含段落式元素）， dfn， em， embed， i，iframe， img， input， ins（如果其只包含段落式元素）， kbd， keygen， label， map（如果其只包含段落式元素）， mark， math， meter， noscript， object， output， progress， q， ruby， s， samp， script，select， small， span， strong， sub， sup， svg， textarea， time， u， var， video， wbr， text

一个不太精确的类比是：HTML5中的Phrasing元素大致就是HTML4中所定义的inline元素。

**Embedded（嵌入元素）**

嵌入式元素是引用或插入到文档中其他资源的元素。

audio， canvas， embed， iframe， img， math， object， svg， video

**Interactive（交互元素）**

交互式元素是专门用于与用户交互的元素。

a， audio（如果设置了controls属性）， button， details， embed， iframe， img（如果设置了usemap属性）， input（如果type属性不为hidden状态）， keygen， label， menu（如果type属性为toolbar状态），object（如果设置了usemap属性）， select， textarea， video（如果设置了controls属性）

**Metadata（元数据元素）**

元数据元素是可以被用于说明其他内容的表现或行为，或者在当前文档和其他文档之间建立联系的元素

base，command，link，meta，noscript，script，style，title

**详细Elements** Categories	、Parents†、Children
https://www.w3.org/TR/html5/index.html#elements-1




# 更多-more
* [W3C国际站](http://www.w3.org/)
* [W3C中国](http://www.chinaw3c.org/)
* [W3C HTML5](http://www.w3.org/TR/html5/)
* [W3C CSS21](http://www.w3.org/TR/CSS21/)
* [W3C标准聚合](http://www.w3.org/TR/)
* [whatwg]   (http://www.whatwg.org/specs/web-apps/current-work/multipage/)
* [csswg](http://dev.w3.org/csswg/)

