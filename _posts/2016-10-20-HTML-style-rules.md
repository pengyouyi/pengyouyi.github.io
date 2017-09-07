---
layout: post
title: HTML5编码规范
tags:
- HTML
categories: HTML
description: HTML编码规范
---
# google的HTML5编码规范

# General Style Rules
- 协议protocol

省略图片、样式、脚本以及其他媒体文件 URL 的协议部分（http:,https:），除非文件在两种协议下都不可用。这种方案称为 protocol-relative URL，好处是无论你是使用 HTTPS 还是 HTTP 访问页面，浏览器都会以相同的协议请求页面中的资源，同时可以节省一部分字节。

{% highlight html linenos %}
<!-- Not recommended -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<!-- Recommended -->
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<!-- Not recommended -->
.example {
  background: url(https://www.google.com/images/example);
}

<!-- Recommended -->
.example {
  background: url(//www.google.com/images/example);
}
{% endhighlight %}

# General Formatting Rules

- Indentation

Indent by 2 spaces at a time.

Don’t use tabs or mix tabs and spaces for indentation.

{% highlight html linenos %}
<ul>
  <li>Fantastic
  <li>Great
</ul>
{% endhighlight %}

```CSS
.example {
  color: blue;
}
```

[建议] 每行不得超过 120 个字符

> 疑问，使用 4 个空格做为一个缩进层级真的是错误的？？？

- Capitalization

Use only lowercase.

[强制] 以下都应该用小写：HTML 元素名称，属性，属性值（除非 text/CDATA），CSS 选择器，属性，属性值。  
[强制] class 必须单词全字母小写，单词间以 - 分隔  
[强制] 同一页面，应避免使用相同的 name 与 id  

{% highlight html linenos %}
<!-- Not recommended -->
<A HREF="/">Home</A>
<table cellSpacing="0">...</table>

<!-- Recommended -->
<img src="google.png" alt="Google">
<table cellspacing="0">...</table>

/* Not recommended */
color: #E5E5E5;

/* Recommended */
color: #e5e5e5;
{% endhighlight %}

- 结尾空格-Trailing Whitespace

Remove trailing white spaces.

{% highlight html linenos %}
<!-- Not recommended -->
<p>What?_
<!-- Recommended -->
<p>Yes please.
{% endhighlight %}

# General Meta Rules
- Encoding

Use UTF-8 (no BOM).

在 HTML 中通过 <meta charset="utf-8"> 指定编码方式，CSS 中不需要指定，因为默认是 UTF-8。

[强制] 页面必须使用精简形式，明确指定字符编码。指定字符编码的 meta 必须是 head 的第一个直接子元素。

- lang

[建议] 在 html 标签上设置正确的 lang 属性

有助于提高页面的可访问性，如：让语音合成工具确定其所应该采用的发音，令翻译工具确定其翻译语言等。

{% highlight html linenos %}
<html lang="en"> 
<html lang="zh-CN">
{% endhighlight %}

- meta IE

[建议] 启用 IE Edge 模式

{% highlight html linenos %}
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
{% endhighlight %}

更多定义文档兼容性参考

[https://msdn.microsoft.com/zh-cn/library/cc288325(v=vs.85).aspx](https://msdn.microsoft.com/zh-cn/library/cc288325(v=vs.85).aspx)

- 注释-Comments

使用注释来解释代码：包含的模块，功能以及优点。

- 任务项-Action Items

Highlight todos by using the keyword TODO only, not other common formats like @@.

{% highlight html linenos %}
{# TODO(john.doe): revisit centering #}
<center>Test</center>

<!-- TODO: remove optional tags -->
<ul>
  <li>Apples</li>
  <li>Oranges</li>
</ul>
{% endhighlight %}

# HTML Style Rules

- Document Type

[强制]Use HTML5.

HTML5 (HTML syntax) is preferred for all HTML documents: \<\!DOCTYPE html\>.

- HTML Validity

尽可能使用正确的 HTML

{% highlight html linenos %}
<!-- Not recommended -->
<title>Test</title>
<article>This is only a test.

<!-- Recommended -->
<!DOCTYPE html>
<meta charset="utf-8">
<title>Test</title>
<article>This is only a test.</article>
{% endhighlight %}

- Semantics

根据使用场景选择正确的 HTML 元素（有时被错误的称为“标签”）。例如，使用 h1 元素创建标题，p 元素创建段落，a 元素创建链接等等。正确的使用 HTML 元素对于可访问性、可重用性以及编码效率都很重要。

{% highlight html linenos %}
<!-- Not recommended -->
<div onclick="goToRecommendations();">All recommendations</div>

<!-- Recommended -->
<a href="recommendations/">All recommendations</a>
{% endhighlight %}

- 孤立标签void elements

[强制] 对 HTML5 中规定允许省略的闭合标签，不允许省略闭合标签

最知名的空元素是：

{% highlight html linenos %}
<meta> <link>  <br> <hr> <img> <input> 
{% endhighlight %}

鲜为人知的是：

{% highlight html linenos %}
<area> <base> <col> <command> <embed> <keygen> <param> <source> <track> <wbr>
{% endhighlight %}

[强制] 对于无需自闭合的标签，不允许自闭合

{% highlight html linenos %}
<!-- good -->
<input type="text" name="title">

<!-- bad -->
<input type="text" name="title" />
{% endhighlight %}

更多空标签

[http://ourjs.com/detail/531b2ce89144f4934f00000b](http://ourjs.com/detail/531b2ce89144f4934f00000b)

- can omit endtag

可以省略结束标记的元素：

{% highlight html linenos %}
li、dt、dd、p、rt、rp、optgroup、option、colgroup、thead、tbody、tfoot、tr、td、th
{% endhighlight %}

{% highlight html linenos %}
<!-- good -->
<ul>
    <li>first</li>
    <li>second</li>
</ul>

<!-- bad -->
<ul>
    <li>first
    <li>second
</ul>
{% endhighlight %}

- can omit alltag

可以省略全部标记的元素有

{% highlight html linenos %}
html、head、body、colgroup、tbody
{% endhighlight %}

- Multimedia Fallback

多媒体元素降级

对于像图片、视频、canvas 动画等多媒体元素，确保提供其他可访问的内容。图片可以使用替代文本（alt），视频和音频可以使用文字版本。

{% highlight html linenos %}
<!-- Not recommended -->
<img src="spreadsheet.png">

<!-- Recommended -->
<img src="spreadsheet.png" alt="Spreadsheet screenshot.">
{% endhighlight %}

- Separation of Concerns

关注分离

标记、样式和脚本分离，确保相互耦合最小化。

- Entity References

实体引用

如果团队中文件和编辑器使用同样的编码方式，就没必要使用实体引用，如 &mdash;， &rdquo;，&#x263a;，除了一些在 HTML 中有特殊含义的字符（如 < 和 &）以及不可见的字符（如空格）。

{% highlight html linenos %}
<!-- Not recommended -->
The currency symbol for the Euro is &ldquo;&eur;&rdquo;.

<!-- Recommended -->
The currency symbol for the Euro is “€”.
{% endhighlight %}

- type Attributes

[建议] 在引用样式表和脚本时，不要指定 type 属性，除非不是 CSS 或 JavaScript。因为 HTML5 中已经默认指定样式变的 type 是 text/css，脚本的type 是 text/javascript。

[强制] 引入 CSS 时必须指明 rel="stylesheet"

{% highlight html linenos %}
<!-- Not recommended -->
<link rel="stylesheet" href="//www.google.com/css/maia.css" type="text/css">

<!-- Recommended -->
<link rel="stylesheet" href="//www.google.com/css/maia.css">

<!-- Not recommended -->
<script src="//www.google.com/js/gweb/analytics/autotrack.js" type="text/javascript"></script>

<!-- Recommended -->
<script src="//www.google.com/js/gweb/analytics/autotrack.js"></script>
{% endhighlight %}

[建议] 在 head 中引入页面需要的所有 CSS 资源。

在页面渲染的过程中，新的CSS可能导致元素的样式重新计算和绘制，页面闪烁。

[建议] JavaScript 应当放在页面末尾，或采用异步加载。

将 script 放在页面中间将阻断页面的渲染。出于性能方面的考虑，如非必要，请遵守此条建议。

# HTML Formatting Rules

- HTML Quotation Marks

属性值用双引号【强制】

{% highlight html linenos %}
<!-- Not recommended -->
<a class='maia-button maia-button-secondary'>Sign in</a>
<script src='esl.js'></script>
<script src=esl.js></script>

<!-- Recommended -->
<a class="maia-button maia-button-secondary">Sign in</a>
<script src="esl.js"></script>
{% endhighlight %}

思考

URL()中有用引号的必要吗?

```css
/* Example #1: */ background-image: url(image.png);
/* Example #2: */ background-image: url("image.png");
/* Example #3: */ background-image: url('image.png');
```

解决方案1:  
最好是加上。html标签的属性也同理。

解决方案2:  
最好还是加上引号

解决方案3:  
我个人一直不加，但是firebug里显示加上引号的，so，不知道哪个效率更高一点

解决方案4:  
vs写asp.net加了会报错

解决方案5:  
w3c下 加不加无所谓~

解决方案6:  
如果路径里面有空格，老IE是认不出来的，所以我一般都加上，单引号。

解决方案7:  
从安全角度来讲是要加上的...  
否则容易被xss  
因为""意味着是字符串...但是不加引号的话..传过来的万一是);url("http://www.xss.xss")  就把cookie什么的可能泄露出去了...  

**CSS3推荐**不要在url()里对引用资源加引号

HTML属性顺序推荐写法
 >-  class
 >- id, name
 >- data-*
 >- src, for, type, href
 >- title, alt
 >- aria-*, role

class 用于标识高度可复用组件，因此应该排在首位。id 用于标识具体组件，应当谨慎使用（例如，页面内的书签），因此排在第二位

{% highlight html linenos %}
<a class="..." id="..." data-modal="toggle" href="#">
  Example link
</a>

<input class="form-control" type="text">

<img src="..." alt="...">
{% endhighlight %}

- General Formatting

为每个块级元素或表格元素标签新起一行，并且对每个子元素进行缩进

{% highlight html linenos %}
<blockquote>
  <p><em>Space</em>, the final frontier.</p>
</blockquote>
<ul>
  <li>Moe
  <li>Larry
  <li>Curly
</ul>
<table>
  <thead>
    <tr>
      <th scope="col">Income
      <th scope="col">Taxes
  <tbody>
    <tr>
      <td>$ 5.00
      <td>$ 4.50
</table>
{% endhighlight %}

优化标签。有些标签是不需要用到的，能少就少。哪些标签是必须的，哪些又是多余的。

更多可以省略的标签

https://html.spec.whatwg.org/multipage/syntax.html#syntax-tag-omission

- boolean Attributes

布尔（boolean）型属性

布尔型属性可以在声明时不赋值。XHTML 规范要求为其赋值，但是 HTML5 规范不需要。

{% highlight html linenos %}
<!-- Not recommended -->
<input type="text" readonly="readonly" />
<input type="text" disabled="disabled" />

<!-- Recommended -->
<input type="text" disabled>
<input type="checkbox" value="1" checked>
<select>
  <option value="1" selected>1</option>
</select>
{% endhighlight %}

# Elements Semantics

**结构性元素**

- p 表示段落. 只能包含内联元素, 不能包含块级元素;
- div 本身无特殊含义, 可用于布局. 几乎可以包含任何元素;
- br 表示换行符;
- hr 表示水平分割线;
- h1-h6 表示标题. 其中 h1 用于表示当前页面最重要的内容的标题;
- blockquote 表示引用, 可以包含多个段落. 请勿纯粹为了缩进而使用 blockquote, 大部分浏览器默认将 blockquote 渲染为带有左右缩进;
- pre 表示一段格式化好的文本;

[强制] 标签使用必须符合标签嵌套规则。

HTML5: [嵌套规则](https://www.w3.org/TR/html5/)

- 不推荐inline元素包含block元素；
- 不允许交叉嵌套；
- 不允许非法的子元素嵌套

**头部元素**
- title 每个页面必须有且仅有一个 title 元素;--[强制]
- base 可用场景：首页、频道等大部分链接都为新窗口打开的页面;
- link用于引入 css 资源时, 可省去 media(默认为all) 和 type(默认为text/css) 属性;--[强制] 引入 CSS 时必须指明 rel="stylesheet"
- style type 默认为 text/css, 可以省去;
- script type 属性可以省去; 不赞成使用lang属性; 不要使用古老的<!– //–>这种hack脚本, 它用于阻止第一代浏览器(Netscape 1和Mosaic)将脚本显示成文字;
- noscript 在用户代理不支持 JavaScript 的情况下提供说明；

**文本元素**
- a a 存在 href 属性时表示链接, 无 href 属性但有 name 属性表示锚点;
- em,strong em 表示句意强调, 加与不加会引起语义变化, 可用于表示不同的心情或语调; strong 表示重要性强调, 可用于局部或全局, strong强调的是重要性, 不会改变句意;
- abbr 表示缩写;
- sub,sup 主要用于数学和化学公式, sup还可用于脚注;
- span 本身无特殊含义;
- ins,del 分别表示从文档中增加(插入)和删除

**媒体元素**  
img 请勿将img元素作为定位布局的工具, 不要用他显示空白图片; 给img元素增加alt属性;

[强制] 禁止 img 的 src 取值为空。延迟加载的图片也要增加默认的 src。

src 取值为空，会导致部分浏览器重新加载一次当前页面

[建议] 为重要图片添加 alt 属性。  
可以提高图片加载失败时的用户体验。

[建议] 避免为 img 添加不必要的 title 属性。  
多余的 title 影响看图体验，并且增加了页面尺寸

[建议] 添加 width 和 height 属性，以避免页面抖动。

[建议] 有下载需求的图片采用 img 标签实现，无下载需求的图片采用 CSS 背景图实现。  
1,产品 logo、用户头像、用户产生的图片等有潜在下载需求的图片，以 img 形式实现，能方便用户下载。  
2,无下载需求的图片，比如：icon、背景、代码使用的图片等，尽可能采用 css 背景图实现。

object 可以用来插入Flash;

**列表元素**
- dl 表示关联列表, dd是对dt的解释; dt和dd的对应关系比较随意： 一个dt对应多个dd、多个dt对应一个dd、多个dt对应多个dd, 都合法; 可用于名词/单词解释、日程列表、站点目录;
- ul 表示无序列表;
- ol 表示有序列表, 可用于排行榜等;
- li 表示列表项, 必须是ul/ol的子元素;

**表单元素**
- 推荐使用 button 代替 input, 但必须声明 type;
- 推荐使用 fieldset, legend 组织表单
- 表单元素的 name 不能设定为 action, enctype, method, novalidate, target, submit 会导致表单提交混乱

form  
[强制] 有文本标题的控件必须使用 label 标签将其与其标题相关联。  
有两种方式：  
1,将控件置于 label 内。  
2,label 的 for 属性指向控件的 id。  

推荐使用第一种，减少不必要的 id。如果 DOM 结构不允许直接嵌套，则应使用第二种。

示例：

{% highlight html linenos %}
<label><input type="checkbox" name="confirm" value="on"> 我已确认上述条款</label>

<label for="username">用户名：</label> <input type="textbox" name="username" id="username">
{% endhighlight %}

button

[强制] 使用 button 元素时必须指明 type 属性值。

button 元素的默认 type 为 submit，如果被置于 form 元素中，点击后将导致表单提交。为显示区分其作用方便理解，必须给出 type 属性。

示例：

{% highlight html linenos %}
<button type="submit">提交</button>
<button type="button">取消</button>
{% endhighlight html linenos %}

[建议] 尽量不要使用按钮类元素的 name 属性。

由于浏览器兼容性问题，使用按钮的 name 属性会带来许多难以发现的问题。详见[http://w3help.org/zh-cn/causes/CM2001](http://w3help.org/zh-cn/causes/CM2001)

**文档模板**

{% highlight html linenos %}
<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Sample page</title>
        <link rel="stylesheet" href="css_example_url" />
    </head>
    <body>
        <div id="page">
            <div id="header">
                页头
            </div>
            <div id="content">
                主体
            </div>
            <div id="footer">
                页尾
            </div>
        </div>
        <script src="js_example_url"></script>
        <script>
        // 你的代码
        </script>
    </body>
</html>
{% endhighlight %}



# 更多-more
* [https://validator.w3.org/](https://validator.w3.org/)
* [w3在线代码检测](https://validator.w3.org/nu/#textarea)
* [https://google.github.io/styleguide/htmlcssguide.xml](https://google.github.io/styleguide/htmlcssguide.xml)
* [https://www.kancloud.cn/chandler/css-code-guide/51276](https://www.kancloud.cn/chandler/css-code-guide/51276)



