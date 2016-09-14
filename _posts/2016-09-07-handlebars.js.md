---
layout: post
title: handlebars.js初学
tags:
- handlebars
- js
categories: Js
description: handlebars.js初学
---
# handlebars.js初学

**a.简介-introduction**
Handlebars 是 JavaScript 一个语义模板库，通过对view和data的分离来快速构建web模板。它采用"Logic-less template"（无逻辑模版）的思路，在加载时被预编译，而不是到了客户端执行到代码时再去编译，这样可以保证模板加载和运行的速度。
利用Handlebars处理HTML模板时，一般步骤如下：
1. 获取模板内容
2. 预编译模板
3. 模板数据填充
4. 将结果追加到页面中

Handlebars兼容Mustache，你可以在Handlebars中导入Mustache模板。

**b.安装-install**
去handlebarsjs官方网站http://handlebarsjs.com/ 直接下载handlebars.js,用\<script\>标签引入, 也可通过NPM和Bower安装,详见[http://handlebarsjs.com/installation.html](http://handlebarsjs.com/installation.html)
# Getting Started
Handlebars expressions 是handlebars模板中最基本的单元，使用方法是加两个花括号{% raw %}{{value}}{% endraw %}, handlebars模板会自动匹配相应的数值，对象甚至是函数
例如:
```html
<div class="entry">
  <h1>{% raw %}{{title}}{% endraw %}</h1>
  <div class="body">
    {% raw %}{{body}}{% endraw %}
  </div>
</div>
```
你可以使用"script"标签引入handlebars模板：
```html
<script id="entry-template" type="text/x-handlebars-template">
  <div class="entry">
    <h1>{% raw %}{{title}}{% endraw %}</h1>
    <div class="body">
      {% raw %}{{body}}{% endraw %}
    </div>
  </div>
</script>
```
在javascript中使用Handlebars.compile编译模板
```html
var source   = $("#entry-template").html();
var template = Handlebars.compile(source);
```
你也可以预编译你的模板，然后只需引入更小的运行时库（handlebars.runtime.js），避免在浏览器中编译，提高性能，这在移动设备中显得更重要。
**完整例子-直接在HTML中渲染**
{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>创建第一个 handlebars 应用</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.min.js"></script>
</head>
<body>
<div id="entry">
  <h1>{% raw %}{{title}}{% endraw %}</h1>
  <div class="body">
    {% raw %}{{body}}{% endraw %}
  </div>
</div>
<script type="text/javascript">
var context = {title: "My New Post", body: "This is my first post!"};
//1.获取模板内容
var source   = document.getElementById("entry").innerHTML;
//2.预编译模板
var template = Handlebars.compile(source);
//3.模板数据填充
var html    = template(context);
//4.将结果追加到页面
document.getElementById("entry").innerHTML = html;
</script>
</body>
</html>
{% endhighlight %}
**完整例子-借用"script"标签**
{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>创建第一个 handlebars 应用</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.min.js"></script>
</head>
<body>
<div id="demo">
    <script id="entry-template" type="text/x-handlebars-template">
        <div class="entry">
            <h1>{% raw %}{{title}}{% endraw %}</h1>
            <div class="body">
              {% raw %}{{body}}{% endraw %}
            </div>
        </div>
    </script>
</div>
<script type="text/javascript">
var context = {title: "My New Post", body: "This is my first post!"};
//1.获取模板内容
var source   = $("#entry-template").html();
//2.预编译模板
var template = Handlebars.compile(source);
//3.模板数据填充
var html    = template(context);
//4.将结果追加到页面
$("#demo").html(html);
</script>
</body>
</html>
{% endhighlight %}
**results in**
```html
<div id="entry">
  <h1>My New Post</h1>
  <div class="body">
    This is my first post!
  </div>
</div>
```
# HTML编码
在handlebars里，{% raw %}{{expression}}{% endraw %}会返回一个经过编码的HTML，也就是说，如果取出的内容中包含html标签，会被转码成纯文本，不会被当成html解析，实际上就是做了类似这样的操作：把`<`用 `&lt;` 替代。如果你不希望被编码，可以使用{% raw %}{{{{% endraw %}
{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>handlebars-html编码</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.min.js"></script>
</head>
<body>
    <div id="entry">
        <h1>{% raw %}{{title}}{% endraw %}</h1>
        <div class="body">
          {% raw %}{{{body}}}{% endraw %}
        </div>
    </div>
<script type="text/javascript">
var context = {
  title: "All about <p> Tags",
  body: "<p>This is a post about &lt;p&gt; tags</p>"
};
var source   = $("#entry").html();
var template = Handlebars.compile(source);
var html = template(context);
$("#entry").html(html);
</script>
</body>
</html>
{% endhighlight %}
**results in**
```html
<div id="entry">
  <h1>All About &lt;p&gt; Tags</h1>
  <div class="body">
    <p>This is a post about &lt;p&gt; tags</p>
  </div>
</div>
```
handlebars不会编码Handlebars.SafeString。如果你自定义一个helper，返回一段HTML代码，你需要返回new Handlebars.SafeString(result)。此时，你需要手动对内容进行编码：
```html
Handlebars.registerHelper('link', function(text, url) {
  text = Handlebars.Utils.escapeExpression(text);
  url  = Handlebars.Utils.escapeExpression(url);

  var result = '<a href="' + url + '">' + text + '</a>';

  return new Handlebars.SafeString(result);
});
```
这里将会对传入的参数进行编码，返回值是“安全的”，所以就算你不使用{% raw %}{{{{% endraw %}，handlebars也不会再次编码了。
# 块表达式-Block Expressions

块表达式在Handlebars中由一个代码块，一个开标志\{\{#\}\}，一个闭合标志\{\{/\}\}组成。
{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>handlebars-块表达式</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.min.js"></script>
</head>
<body>
<div id="demo">
{% raw %}
{{#list people}} {{firstName}} {{lastName}} {{/list}}
{% endraw %}
</div>
<script type="text/javascript">
var data = {
  people: [
    {firstName: "Yehuda", lastName: "Katz"},
    {firstName: "Carl", lastName: "Lerche"},
    {firstName: "Alan", lastName: "Johnson"}
  ]
};
/**我们创建一个叫list的helper来生成列表，helper接受people作为第一个参数，一个option对象（hash）作为第二个参数。
option包含一个属性fn，他可以调用一个context就像普通模板一样。**/
Handlebars.registerHelper('list',function(items,options){ //true
    //console.log('items:',items === data.people);
    //console.log('this:',this === data);  //true
    //console.log('options.fn(this):',options.fn(items[0]));
  var out = "<ul>";
  for(var i=0,l=items.length;i<l;i++){
    out += "<li>" + options.fn(items[i]) + "</li>";
  }
  return out + "</ul>";
})

var tpl = $("#demo").html();
var template = Handlebars.compile(tpl);
var html = template(data);
$("#demo").html(html);
</script>
</body>
</html>
{% endhighlight %}
**results in**
```html
<ul>
  <li>Yehuda Katz</li>
  <li>Carl Lerche</li>
  <li>Alan Johnson</li>
</ul>
```
当我们注册了一个自定义块辅助函数时，Handlebars自动在回调函数中添加了一个可选择对象作为最后一个参数。这个可选择对象拥有一个fn方法，一个hash对象，以及一个inverse方法

options.fn方法：

fn方法接收一个对象（你的数据）作为它在自定义辅助函数块模板中作为上下文来使用的参数。你可以传递任何数据对象，或者如果你想使用引用模板的同样的上下文
# 路径-paths
**Handlebars支持简单的路径,也支持嵌套路径，可以查找下一级的属性**
{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>handlebars-路径</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.min.js"></script>
</head>
<body>

<div class="entry">
  <h1>{{title}}</h1>
  <h2>By {% raw %}{{author.name}}{% endraw %}</h2>
  <div class="body">
    {% raw %}{{body}}{% endraw %}
  </div>
</div>

<script type="text/javascript">
var context = {
  title: "My First Blog Post!",
  author: {
    id: 47,
    name: "Yehuda Katz"
  },
  body: "My first post. Wheeeee!"
};

var tpl = $(".entry").html();
var template = Handlebars.compile(tpl);
var html = template(context);
$(".entry").html(html);
</script>
</body>
</html>
{% endhighlight %}
**嵌套路径同样支持../**
{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>handlebars-路径</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.min.js"></script>
</head>
<body>

<div class="entry">
    <div id="comments">
      {% raw %}
      {{#each comments}}
      <h2><a href="/posts/{{../permalink}}#{{id}}">{{title}}</a></h2>
      <div>{{body}}</div>
      {{/each}}
      {% endraw %}
    </div>
</div>

<script type="text/javascript">
var data = {
  permalink:'http://keenwon.com',
  comments: [
    {id:1,title:'链接1',body:'链接1'},
    {id:2,title:'链接2',body:'链接2'}
  ]
};

var tpl = $(".entry").html();
var template = Handlebars.compile(tpl);
var html = template(data);
$(".entry").html(html);
</script>
</body>
</html>
{% endhighlight %}
# 模板注释 \{\{! \}\} or \{\{!-- --\}\}
```html
<div class="entry">
{% raw %}
    {{! 我是单行注释 }}

    {{msg}}

    {{!-- 我是
          多行注释
    --}}
{% endraw %}
</div>
```
# each循环
{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>each循环</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.min.js"></script>
</head>
<body>
<table id="tableList">
    <script id="table-template" type="text/x-handlebars-template">
    {% raw %}{{#each student}}
        <tr>
          <td>{{name}}</td>
          <td>{{sex}}</td>
          <td>{{age}}</td>
        </tr>
    {{/each}} {% endraw %}
</script>
</table>
<script type="text/javascript">
$(document).ready(function() {
        //模拟的json对象
        var data = {
                    "student": [
                        {
                            "name": "张三",
                            "sex": "0",
                            "age": 18
                        },
                        {
                            "name": "李四",
                            "sex": "0",
                            "age": 22
                        },
                        {
                            "name": "妞妞",
                            "sex": "1",
                            "age": 18
                        }
                    ]
                };
        //注册一个Handlebars模版，通过id找到某一个模版，获取模版的html框架
        var myTemplate = Handlebars.compile($("#table-template").html());
        //将json对象用刚刚注册的Handlebars模版封装，得到最终的html，插入到基础table中。
        $('#tableList').html(myTemplate(data));
      });
</script>
</body>
</html>
{% endhighlight %}
# 指定上下文:with
with指令可以转移上下文环境，让当前的上下文进入到一个属性中
{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>with</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.min.js"></script>
</head>
<body>
<table id="tableList">
  <script id="table-template" type="text/x-handlebars-template">
  {% raw %}
    {{#each this}}
      <tr>
        <td>{{name}}</td>
        <td>{{sex}}</td>
        <td>{{age}}</td>
        <td>
          {{#with favorite}}
            {{#each this}}
              <p>{{name}}</p>
            {{/each}}
          {{/with}}
        </td>
      </tr>
    {{/each}}
    {% endraw %}
  </script>
</table>
<script type="text/javascript">
$(document).ready(function() {

  var data = [
                {
                    "name": "张三",
                    "sex": "0",
                    "age": 18,
                    "favorite":
                    [
                      {
                        "name":"唱歌"
                      },{
                        "name":"篮球"
                      }
                    ]
                },
                {
                    "name": "李四",
                    "sex": "0",
                    "age": 22,
                    "favorite":
                    [
                      {
                        "name":"上网"
                      },{
                        "name":"足球"
                      }
                    ]
                },
            ];

var tpl = $("#table-template").html();
var template = Handlebars.compile(tpl);
var html = template(data);
$("#tableList").html(html);
});
</script>
</body>
</html>
{% endhighlight %}
\{\{#with favorite\}\}表示进入到favorite属性的上下文中，而favorite属性中又是一个list，因此可以用\{\{#each this\}\}进行遍历，表示遍历当前上下文环境，对于每次遍历，都是map结构，取name属性，最终拿到所有兴趣爱好。
with可以结合handlebars的路径访问一起使用。Handlebars提供了.来访问属性也可以使用../来访问父级属性。
```html
{% raw %}
{{#with person}}
    <h1>{{../company.name}}</h1>
{{/with}}
//对应的json数据
{
    "person": { "name": "Alan" },
     company: {"name": "Rad, Inc." }
}
{% endraw %}
```
# this的使用
this表示当前的上下文
{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>with</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.min.js"></script>
</head>
<body>
<div id="tableList">
    <script id="table-template" type="text/x-handlebars-template">
    {% raw %}
    {{#each this}}
        <p>{{this}}</p>
    {{/each}}
    {% endraw %}
</script>
</div>
<script type="text/javascript">
$(document).ready(function() {
        var data = {

                    "name": "张三",
                    "sex": "0",
                    "age": 18

                };
        var myTemplate = Handlebars.compile($("#table-template").html());
        $('#tableList').html(myTemplate(data));
      });
</script>
</body>
</html>
{% endhighlight %}
# if、unless
{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>with</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.min.js"></script>
</head>
<body>
<div id="demo">
  <script id="table-template" type="text/x-handlebars-template">
  {% raw %}
    {{#if list}}
      <ul id="list">
        {{#each list}}
          <li>{{this}}</li>
        {{/each}}
      </ul>
    {{else}}
      <p>{{err}}</p>
    {{/if}}
    {% endraw %}
  </script>
</div>
<script type="text/javascript">
$(document).ready(function() {

var data = {
    list: ['HTML5','CSS3',"WebGL"],
    err: "数据取出错误",
    list2: [ ],
    list3: { }
}

var tpl = $("#table-template").html();
var template = Handlebars.compile(tpl);
var html = template(data);
$("#demo").html(html);
});
</script>
</body>
</html>
{% endhighlight %}
对于if指令，如果返回的为undefined、null、""、[ ]、{ }、false任意一个，都会导致最终结果为假。
unless则是和if指令相反，当判断的值为false时他会渲染DOM
# 自定义函数辅助函数（function helper）
{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>自定义函数</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.min.js"></script>
</head>
<body>
<div id="demo">
  <script id="table-template" type="text/x-handlebars-template">
    {% raw %}{{theNameOfTheHelper score}}{% endraw %}
  </script>
</div>
<script type="text/javascript">
$(document).ready(function() {

var data = {score:85, userName:"Mike"};

Handlebars.registerHelper ("theNameOfTheHelper", function (theScore) {
    console.log("Grade: " + theScore );

   if (theScore >= 90) {
       return "A" ;
   }
   else if (theScore >= 80 && theScore < 90) {
       return "B" ;
   }
   else if (theScore >= 70 && theScore < 80) {
       return "C" ;
   }
   else {
       return "D" ;
   }

});

var tpl = $("#table-template").html();
var template = Handlebars.compile(tpl);
var html = template(data);
$("#demo").html(html);
});
</script>
</body>
</html>
{% endhighlight %}


# 更多-more
* [http://handlebarsjs.com/](http://handlebarsjs.com/)
* [http://www.ido321.com/1629.html](http://www.ido321.com/1629.html)
* [http://www.html-js.com/article/The-Javascript-template-of-Handlebarsjs-junior-tutorial-learning-Javascript-template-Handlebarsjs-two](http://www.html-js.com/article/The-Javascript-template-of-Handlebarsjs-junior-tutorial-learning-Javascript-template-Handlebarsjs-two)




















