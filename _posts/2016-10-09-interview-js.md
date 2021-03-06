---
layout: post
title: js基础面试题及答案
tags:
- Interview
- JS-Basic
categories: JS
description: js基础面试题及答案
---

# js面试题及答案

knowledge points
{% highlight html linenos %}
HTML&CSS：
    对Web标准的理解、浏览器内核差异、兼容性、hack、CSS基本功：布局、盒子模型、选择器优先级、
    HTML5、CSS3、Flexbox

JavaScript：
    数据类型、运算、对象、Function、继承、闭包、作用域、原型链、事件、RegExp、JSON、Ajax、
    DOM、BOM、内存泄漏、跨域、异步装载、模板引擎、前端MVC、路由、模块化、Canvas、ECMAScript 6、Nodejs

其他：
    移动端、响应式、自动化构建、HTTP、离线存储、WEB安全、优化、重构、团队协作、可维护、易用性、SEO、UED、架构、职业生涯、快速学习能力
{% endhighlight %}

# js数据类型相关

## js基本数据类型

- 介绍js的基本数据类型。

Undefined、Null、Boolean、Number、String、

ECMAScript 2015 新增:Symbol(创建后独一无二且不可变的数据类型 )

## js内置对象

- 介绍js有哪些内置对象？

Object 是 JavaScript 中所有对象的父对象

数据封装类对象：Object、Array、Boolean、Number 和 String

其他对象：Function、Arguments、Math、Date、RegExp、Error

[了解 JavaScript 中的内置对象](http://www.ibm.com/developerworks/cn/web/wa-objectsinjs-v1b/index.html)

## stack-heap

- JavaScript有几种类型的值？，你能画一下他们的内存图吗？

栈：原始数据类型（Undefined，Null，Boolean，Number、String）

堆：引用数据类型（对象、数组和函数）

两种类型的区别是：存储位置不同；

原始数据类型直接存储在栈(stack)中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；

引用数据类型存储在堆(heap)中的对象,占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体

![http://www.w3school.com.cn/i/ct_js_value.gif](http://www.w3school.com.cn/i/ct_js_value.gif)

## null & undefined

- null，undefined 的区别？

> null        表示一个对象是“没有值”的值，也就是值为“空”；  

> undefined   表示一个变量没有被声明，不存在这个值，或者被声明了但没有被赋值；

undefined不是一个有效的JSON，而null是；  

```js
typeof undefined  //"undefined"
```

undefined :是一个表示"无"的原始值或者说表示"缺少值"，就是此处应该有一个值，但是还没有定义。当尝试读取时会返回 undefined；   

```js
typeof null  //"object"
```

null : 是一个对象(空对象, 没有任何属性和方法)；例如作为函数的参数，表示该函数的参数不是对象；  

注意：在验证null时，一定要使用　=== ，因为 == 无法分别 null 和　undefined  

```js
null == undefined // true  
null === undefined // false  
```

[js的null，undefined或undeclared的区别](http://pengyouyi.site/js/2017/03/02/js-null-undefined)

## Js standard

- 说几条写JavaScript的基本规范？

1. 不要在同一行声明多个变量。

2. 请使用 ===/!==来比较true/false或者数值

3. 使用对象字面量替代new Array这种形式

4. 不要使用全局函数。

5. Switch语句必须带有default分支

6. 函数不应该有时候有返回值，有时候没有返回值。

7. For循环必须使用大括号

8. If语句必须使用大括号

9. for-in循环中的变量 应该使用var关键字明确限定作用域，从而避免作用域污染。

[编写高质量JavaScript代码的68个有效方法](https://www.cnblogs.com/luohaoran/p/6031437.html)

编写高质量代码-改善JavaScript程序的188个建议

# js原型相关

## js原型

- JavaScript原型，原型链 ? 有什么特点？

每个对象都会在其内部初始化一个属性，就是`prototype(原型)`，

当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么他就会去prototype里找这个属性，这个prototype又会有自己的prototype，于是就这样一直找下去，也就是我们平时所说的`原型链`的概念。

关系：

所有的引用类型（数组、对象、函数）， \_\_proto\_\_ 属性值指向它的构造函数的 “prototype” 属性值

instance.constructor.prototype = instance.\_\_proto\_\_

特点：

JavaScript对象是通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。当我们修改原型时，与之相关的对象也会继承这一改变。

[js中的prototype和\_\_proto\_\_](http://pengyouyi.site/js/2017/03/01/js-prototype)

## instanceof

- 如何判断一个对象是否属于某个类？

JavaScript中判断一个对象 是否为一个类的实例主要有两种方法，即instanceof和constructor，前者的用法是：

`result = object instanceof class`

返回一个boolean值，指出对象是否为特定类的一个实例。后者的用法是：

`object.constructor`

表示创建对象的函数

```js
var a = [1, 2, 3];
￼alert(a instanceof Array);  //返回true
￼alert(a instanceof Object);  //返回true
￼
￼alert(a.constructor == Array);  //返回true
￼alert(a.constructor == Object);  //返回false
```

constructor更加精确地指向对象所属的类，

instanceof即使是父类也会返回true。

## hasOwnProperty

- Javascript中，有一个函数，执行时对象查找时，永远不会去查找原型，这个函数是？

hasOwnProperty

javaScript中hasOwnProperty函数方法是返回一个布尔值，指出一个对象是否具有指定名称的属性。此方法无法检查该对象的原型链中是否具有该属性；该属性必须是对象本身的一个成员。

使用方法：

`object.hasOwnProperty(proName)`

其中参数object是必选项。一个对象的实例。
proName是必选项。一个属性名称的字符串值。

如果 object 具有指定名称的属性，那么JavaScript中hasOwnProperty函数方法返回 true，反之则返回 false。

# 变量、function、object

## chain-scope

- Javascript作用链域?

全局函数无法查看局部函数的内部细节，但局部函数可以查看其上层的函数细节，直至全局细节。

当需要从局部函数查找某一属性或方法时，如果当前作用域没有找到，就会上溯到上层作用域查找，直至全局函数，这种组织形式就是作用域链。

## scope-hoisting

- 解释JavaScript中的作用域与变量声明提升？

变量作用域分为局部作用域和全局作用域。

**局部变量（处于函数级别的作用域）**

javascript没有块级作用域（被花括号包围的）；当是，javascript有拥有函数级别的作用域，也就是说，在一个函数内定义的变量只能在函数内部访问或者这个函数内部的函数访问

局部变量优先级大于全局变量

setTimeout中的函数是在全局作用域中执行的

**变量提升（Variable Hoisting）**

所以的变量声明都会提升到函数的开头（如果这个变量在这个函数里面）或者全局作用域的开头（如果这个变量是一个全局变量）。

`所有声明变量或声明函数都会被提升到当前函数的顶部。`

```js
console.log(x);//输出：function x(){}
var x=1;
function x(){}
```

以上代码，实际执行的代码为:
```js
var x;
function x(){}
console.log(x);
x=1;
```

**函数声明会覆盖变量声明**

如果存在函数声明和变量声明（注意：仅仅是声明，还没有被赋值），而且变量名跟函数名是相同的，那么，它们都会被提示到外部作用域的开头，但是，`函数的优先级更高`，所以变量的值会被函数覆盖掉。

```js
var a;
function a(){...} 

// a = function a(){...}
```

```js
function a(){...} 
var a;

// a = function a(){...}
```

但是，如果这个变量或者函数其中是赋值了的，那么另外一个将无法覆盖它

**变量赋值会覆盖函数声明**

```js
var a = 1;
function a(){} 

// a = 1
```

```js
function a(){} 
var a = 1;

// a = 1
```

[javascript中的变量作用域以及变量提升](https://www.cnblogs.com/MockingBirdHome/p/3385152.html)

[javascript变量声明 及作用域](https://www.cnblogs.com/silentjesse/p/4024536.html)

## new

- new操作符具体干了什么呢?

1、创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。

2、属性和方法被加入到 this 引用的对象中。

3、新创建的对象由 this 所引用，并且最后隐式的返回 this 。

## 闭包（closure）

- 什么是闭包（closure），为什么要用它？

闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量,利用闭包可以突破作用链域，将函数内部的变量和方法传递到外部。

闭包的特性：

1.函数内再嵌套函数

2.内部函数可以引用外层的参数和变量

3.参数和变量不会被垃圾回收机制回收

法一：
{% highlight html linenos %}
<ul id="demo">
	<li> index = 1</li>
	<li> index = 2</li>
	<li> index = 3</li>
	<li> index = 4</li>
	<li> index = 5</li>
</ul>
<script type="text/javascript">
window.onload = function(){
	var ulEle = document.getElementById("demo");
	var liEle = ulEle.getElementsByTagName("li");
	var len = liEle.length;
	for (var i = 0 ;i < len ; i++){
		liEle[i].onclick = (function(num){
			return function(){
				alert(num)
			}
		})(i)
	}
}
	
</script>
{% endhighlight %}
法二：
{% highlight html linenos %}
<ul id="demo">
	<li> index = 1</li>
	<li> index = 2</li>
	<li> index = 3</li>
	<li> index = 4</li>
	<li> index = 5</li>
</ul>
<script type="text/javascript">
window.onload = function(){
  var ulEle = document.getElementById("demo");
  var liEle = ulEle.getElementsByTagName("li");
  var len = liEle.length;
  for (var i = 0 ;i < len ; i++){
    liEle[i].index = i; //给每个li定义一个属性索引值
    liEle[i].onclick = function() {
      alert(this.index)
    }
  }
}
</script>
{% endhighlight %}

法三：
{% highlight html linenos %}
<ul id="demo">
  <li> index = 1</li>
  <li> index = 2</li>
  <li> index = 3</li>
  <li> index = 4</li>
  <li> index = 5</li>
</ul>

<script>
window.onload = function(){
  var ulEle = document.getElementById("demo");
  var liEle = ulEle.getElementsByTagName("li");
  var len = liEle.length;
  for (var i = 0 ;i < len ; i++){
    (function(i) {
      liEle[i].onclick = function() {
        alert(i);
      }
    })(i)
  }
}
</script>
{% endhighlight %}

[JS中for循环出现的问题：如何给li元素绑定事件，点击每个li元素弹出对应的索引？](https://blog.csdn.net/clh386/article/details/78560002?locationNum=3&fps=1)

## this

```js
var User = {
  count: 1,
 
  getCount: function() {
    return this.count;
  }
};
 
console.log(User.getCount());  // 1
 
var func = User.getCount;
console.log(func());  // undefined
```

* this总是指向函数的直接调用者（而非间接调用者）；

* 如果有new关键字，this指向new出来的那个对象；

* 在事件中，this指向触发这个事件的对象，特殊的是，IE中的attachEvent中的this总是指向全局对象Window；

[js中的this](http://pengyouyi.site/js/2016/11/30/js-this)

## class

- JS 怎么实现一个类。怎么实例化这个类


# parseFloat

- 如何将字符串转化为数字，例如’12.3b’?

parseFloat('12.3b'); // 12.3

# [“1”, “2”, “3”].map(parseInt)

- [“1”, “2”, “3”].map(parseInt) 答案是多少？

parseInt(string, radix)函数可解析一个字符串，并返回一个radix进制的整数。

【radix该值介于 2 ~ 36 之间，并且字符串中的数字不能大于radix才能正确返回数字结果值】;

相当于解以下题：
```js
parseInt('1',0); // 1
parseInt('2',1); // NaN
parseInt('3',2); // NaN
```

[为什么 ["1", "2", "3"].map(parseInt) 返回 [1,NaN,NaN]？](http://blog.csdn.net/justjavac/article/details/19473199)

# use-strict

- javascript 代码中的”use strict”;是什么意思 ? 使用它区别是什么？

use strict是一种ECMAscript 5 添加的（严格）运行模式,这种模式使得 Javascript 在更严格的条件下运行,

**严格模式影响范围**

- 变量：  var、delete、变量关键字

- 对象： 只读属性、 对象字面量属性重复申明

- 函数：参数重名、arguments对象、申明

- 其他：this、eval、关键字...

**变量：**

不允许使用未声明的变量

不允许意外创建的全局变量

不允许删除变量、对象、函数

变量名不能使用 "arguments" 字符串 、"eval" 字符串、未来保留关键字

**对象：**

不允许对只读属性赋值 Object.defineProperty

不允许变量、函数参数、对象属性重名

**函数：**

不允许修改函数内的arguments对象的成员的值

无法在语句或块中声明函数

**其他：**

不允许使用八进制

不允许使用“with”语句

不允许使用arguments.callee

禁止this关键字指向全局对象。使用构造函数时，如果忘了加new，this不再指向全局对象，而是报错。

eval() 创建的变量不能在此函数外部被调用


**设立"严格模式"的目的**

主要有以下几个：错误检测、规范、效率、安全、面向未来

- 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;

- 消除代码运行的一些不安全之处，保证代码运行的安全；

- 提高编译器效率，增加运行速度；

- 为未来新版本的Javascript做好铺垫。

[严格模式 (JavaScript)](https://msdn.microsoft.com/zh-cn/library/br230269(v=vs.94).aspx)

[JavaScript 严格模式(use strict)](http://www.runoob.com/js/js-strict.html)

[JS中的“use strict” 严格模式](https://www.cnblogs.com/liaojie970/p/7154144.html)

# about性能优化

## load faster

- 请说出三种减低页面加载时间的方法

1、压缩css、js文件  
2、合并js、css文件，减少http请求  
3、外部js、css文件放在最底下  
4、减少dom操作，尽可能用变量替代不必要的dom操作 

## put-script-bottom

-把 Script 标签 放在页面的最底部的body封闭之前 和封闭之后有什么区别？浏览器会如何解析它们？

1. 脚本会阻塞页面渲染，直到它们全部下载并执行完成后，页面的渲染才会继续；

2. 浏览器允许`并行下载`js文件，但是js下载过程仍然会阻塞其后面其他资源的下载,比如图片。

把脚本放在顶部会导致明显的延迟，通常表现为空白页面，用户无法浏览内容，也无法与页面进行交互。

脚本引起的问题是它们阻塞了并行下载。HTTP1.1规范建议浏览器每个域名下不要一次下载超过2个组件。如果你的图片分散在不同服务器，那么你能并行下载多个图片。但当脚本在下载，浏览器不会再下载其它组件，即使在不同域名下。

[JS 一定要放在 Body 的最底部么？聊聊浏览器的渲染机制](https://blog.csdn.net/u012251421/article/details/50536265)

## js-defer

- js延迟加载的方式有哪些？

- defer和async

- 动态创建DOM方式（用得最多）

- 使用jQuery的getScript()方法

- 使用setTimeout延迟方法

- 让JS最后加载

- 按需异步载入js

**延迟的脚本：defer和async**

HTML4 为 \<script> 标签扩展的属性 defer，IE4+和FireFox3.5+ 的浏览器支持。

```html
<script type='text/javascript' src='' defer></script>
```

HTML5引入async

```html
<script async src="script.js"></script>
```

defer和async的区别：async是加载完成后自动执行，而defer需要等待页面完成后执行。

**动态创建DOM方式：**

```js
var element = document.createElement("script");  
element.src = "defer.js";  
document.getElementByTagName('head')[0].appendChild(element);
// document.body.appendChild(element);
```

**使用jQuery的getScript()方法:**

```js
$.getScript("outer.js",function(){//回调函数，成功获取文件后执行的函数  
      console.log("脚本加载完成")  
}); 
```

**使用setTimeout延迟方法：**

```js
<script type="text/javascript" >
    function A(){
        $.post("/lord/login",{name:username,pwd:password},function(){
            alert("Hello");
        });
    }
    $(function (){
        setTimeout('A()', 1000); //延迟1秒
    })
</script>
```

[JS延迟加载的几种方式](https://blog.csdn.net/meijory/article/details/76389762)

## 如何编写高性能的Javascript？

## documen.write-innerHTML

- documen.write和 innerHTML的区别

document.write只能重绘整个页面

innerHTML可以重绘页面的一部分

# DOM

- DOM操作——怎样添加、移除、移动、复制、创建和查找节点?

（1）创建新节点

```js
createDocumentFragment()    //创建一个DOM片段
createElement()   //创建一个具体的元素
createTextNode()   //创建一个文本节点
```
（2）添加、移除、替换、插入

```js
appendChild()
removeChild()
replaceChild()
insertBefore() //在已有的子节点前插入一个新的子节点
```
（3）查找

```js
getElementsByTagName()    //通过标签名称
getElementsByName()    //通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)
getElementById()    //通过元素Id，唯一性
getElementByClassName()
```

# eval

- eval是做什么的？

它的功能是把对应的字符串解析成JS代码并运行；

应该避免使用eval，不安全，非常耗性能（2次，一次解析成js语句，一次执行）。

由JSON字符串转换为JSON对象的时候可以用eval，var obj =eval('('+ str +')');

# JSON

**什么是JSON？**

- json 是一种数据格式，本质是一段字符串。

- json 格式和 JS 对象结构一致，对 JS 语言更友好

- window.JSON 是一个全局对象：JSON.parse、JSON.stringify

**JSON字符串转换为JSON对象:**

{% highlight js linenos %}
var obj = eval('('+ str +')');
var obj = str.parseJSON();
var obj = JSON.parse(str);
{% endhighlight %}

**JSON对象转换为JSON字符串：**

{% highlight js linenos %}
var last = obj.toJSONString();
var last = JSON.stringify(obj);
{% endhighlight %}

# about浏览器

## navigator.userAgent

- 检测浏览器版本版本有哪些方式？

使用navigator.userAgent的值来判断。userAgent是JavaScript的内置对象navigator的属性。

[JS 获得浏览器类型和版本](https://segmentfault.com/a/1190000007640795)

## ev.stopPropagation()

- 事件是？IE与火狐的事件机制有什么区别？ 如何阻止冒泡？

1. 我们在网页中的某个操作（有的操作对应多个事件）。例如：当我们点击一个按钮就会产生一个事件。是可以被 JavaScript 侦测到的行为。

2. 事件处理机制：IE是事件冒泡、Firefox同时支持两种事件模型，也就是：捕获型事件和冒泡型事件；

3. ev.stopPropagation();（旧ie的方法 ev.cancelBubble = true;）

## FF & IE 

- 说出3条以上ff(firefox)和ie的脚本兼容问题  

**1.event**

IE下是window.event,FF下的event只能在事件发生的现场使用，Firefox必须从源处添加参数传递，IE忽略这个参数。  
解决方法：`event=event||window.event;`

**2.事件源问题**

IE下event对象有srcElement属性，但是没有target属性，Firefox下有target属性，但是没有srcElement属性

**3.绑定事件、移除事件**

IE下是 element.attachEvent (“onclick”,function);event.detachEvent(“onclick”,function);Firefox下是

element.addEventListener(“click”,function,true);element.removeEventListener(“click”,function,true);

**4.阻止冒泡事件**

其他浏览器 e.stopPropagation()，IE下是 e.cancelBubble = true;

**5.阻止默认事件**

其他浏览器 e.preventDefault()，IE下是 e.returnValue = false;

**6.滤镜问题**

IE下是filter.alpha.opacity,firefox下是style.opacity

**7.鼠标源事件**

iE下event有x,y属性，firefox下没有，firefox有pageX，pageY属性，解决方法:mx=event.pageX?event.pageX:event.x;

**8.父节点获取：**

IE中支持使用parentElement和parentNode获取父节点。而Firefox只可以使用parentNode。 

解决方法：因为firefox与IE都支持DOM，因此统一使用parentNode来访问父节点。

## 跨浏览器事件处理event

- 写一个通用的事件侦听器函数

```js
function addEvent(elem, type, handler){
　　if(elem.addEventListener){
　　　　elem.addEventListener(type, handler, false);
　　}else if(elem.attachEvent){
           elem.attachEvent('on' + type, handler);
　　}else{
　　     elem['on' + type] = handler;
      }
}
```

```js
// event(事件)工具集，来源：github.com/markyun
    markyun.Event = {
        // 页面加载完成后
        readyEvent : function(fn) {
            if (fn==null) {
                fn=document;
            }
            var oldonload = window.onload;
            if (typeof window.onload != 'function') {
                window.onload = fn;
            } else {
                window.onload = function() {
                    oldonload();
                    fn();
                };
            }
        },
        // 视能力分别使用dom0||dom2||IE方式 来绑定事件
        // 参数： 操作的元素,事件名称 ,事件处理程序
        addEvent : function(element, type, handler) {
            if (element.addEventListener) {
                //事件类型、需要执行的函数、是否捕捉
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + type, function() {
                    handler.call(element);
                });
            } else {
                element['on' + type] = handler;
            }
        },
        // 移除事件
        removeEvent : function(element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.datachEvent) {
                element.detachEvent('on' + type, handler);
            } else {
                element['on' + type] = null;
            }
        },
        // 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
        stopPropagation : function(ev) {
            if (ev.stopPropagation) {
                ev.stopPropagation();
            } else {
                ev.cancelBubble = true;
            }
        },
        // 取消事件的默认行为
        preventDefault : function(event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },
        // 获取事件目标
        getTarget : function(event) {
            return event.target || event.srcElement;
        },
        // 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
        getEvent : function(e) {
            var ev = e || window.event;
            if (!ev) {
                var c = this.getEvent.caller;
                while (c) {
                    ev = c.arguments[0];
                    if (ev && Event == ev.constructor) {
                        break;
                    }
                    c = c.caller;
                }
            }
            return ev;
        }
    };
```

## synchronize-async

- 同步和异步的区别?

同步：浏览器访问服务器请求，用户看得到页面刷新，重新发请求,等请求完，页面刷新，新内容出现，用户看到新内容,进行下一步操作。

异步：浏览器访问服务器请求，用户正常操作，浏览器后端进行请求。等请求完，页面不刷新，新内容也会出现，用户看到新内容。

## window-node

- 如何判断当前脚本运行在浏览器还是node环境中？

this === window ? 'browser' : 'node';

通过判断Global对象是否为window，如果不为window，当前脚本没有运行在浏览器中

## window-document

- 什么是window对象? 什么是document对象?

window对象是指浏览器打开的窗口。

document对象是Documentd对象（HTML 文档对象）的一个只读引用，

document对象是window对象的一个属性。window.document

## 如何控制alert中的换行

```js
alert("hello \n world")
``` 

## iframe的优缺点

iframe也称作嵌入式框架，嵌入式框架和框架网页类似，它可以把一个网页的框架和内容嵌入在现有的网页中。

**优点：**

- 解决加载缓慢的第三方内容如图标和广告等的加载问题

- Security sandbox

- 并行加载脚本

- 方便制作导航栏


**缺点：**

- iframe会阻塞主页面的Onload事件

- 即时内容为空，加载也需要时间

- 没有语意



# about跨域、AJAX

## AJAX

- 请尽可能详尽的解释AJAX的工作原理

创建ajax对象（XMLHttpRequest/ActiveXObject(Microsoft.XMLHttp)）  

判断数据传输方式(GET/POST)

打开链接 open()

发送 send()

当ajax对象完成第四步（onreadystatechange）数据接收完成，判断http响应状态（status）200-300之间或者304（缓存）执行回调函数


## 手写AJAX

- Ajax 是什么? 如何创建一个Ajax？

ajax的全称：Asynchronous Javascript And XML。

异步传输+js+xml。

所谓异步，在这里简单地解释就是：向服务器发送请求的时候，我们不必等待结果，而是可以同时做其他的事情，等到有了结果它自己会根据设定进行后续操作，与此同时，页面是不会发生整页刷新的，提高了用户体验。

(1)创建XMLHttpRequest对象,也就是创建一个异步调用对象

(2)创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息

(3)设置响应HTTP请求状态变化的函数

(4)发送HTTP请求

(5)获取异步调用返回的数据

(6)使用JavaScript和DOM实现局部刷新

**get**

```js
var xhr = new XMLHttpRequest();

xhr.open('GET', '/api', true);

xhr.onreadystatechange = function() {
	if (xhr.readyState === 4) {
		if (xhr.status === 200) {
			alert(xhr.responseText)
		}
	}
}

xhr.send(null);
```

**post**

```js
var xhr = new XMLHttpRequest();

xhr.open('POST', '/api', true);

xhr.onreadystatechange = function() {
	if (xhr.readyState === 4) {
		if (xhr.status === 200) {
			console.log(JSON.parse(xhr.responseText))
		}
	}
}

const postData = {
    userName: 'zhangsan',
    password: 'xxx'
}
xhr.send(JSON.stringify(postData));
```

readyState

- 0 - (未初始化) 还没有调用send()方法

- 1 - (载入) 已调用send()方法，正在发送请求

- 2 - (载入完成) send() 方法执行完成，已接收到全部响应内容

- 3 - (交互) 正在解析响应内容

- 4 - (完成) 响应内容解析完成，可以在客户端调用了

status

- 2XX - 表示成功处理请求。比如 200

- 3XX - 需要重定向，浏览器直接跳转

- 4XX - 客户端请求错误，比如 404

- 5XX - 服务器端错误

第三个参数：

- true 表示异步,就是不等待,直接返回，异步获取数据！

- false 表示同步,等待有返回数据的时候再继续往下走，还没有得到数据的时候就会卡在那里，直到获取数据为止。

## 手写一个简易的axios请求

```js
function myAxios(config) {
    return new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest()
        const { data = null, url, method = 'get', headers} = config
        xhr.open(method, url, true)
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(
                        JSON.parse(xhr.responseText)  
                    )
                } else {
                    reject(new Error(`Request failed with status code ${xhr.status}`))
                }
            }
        }
        xhr.send(data)
    })
}

// 使用
const url = '/data/test.json'
myAxios({
    method: 'get',
    url: url,
    params: {
      foo: 'bar'
    }
}).then((res) => {
    console.log(res)
}).catch((err) => {
    console.error(err)
})
```

## ajax的常用插件

1、 jQuery.ajax()方法，指定dataType为jsonp

```js
$.ajax({
  url: 'http://www.b.com/getdata?callback=?', //不指定回调名，可省略callback参数，会由jQuery自动生成
  dataType: 'jsonp',
  jsonpCallback: 'demo', //可省略
  success: function(data) {
    console.log(data.msg);
  }
});
```

2、 [fetch()](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)

```js
fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });
```

3、 [axios](http://axios-js.com/zh-cn/docs/)

axios(config)

```js
// 发送 POST 请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```

执行 GET 请求

```js
// 为给定 ID 的 user 创建请求
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

## Ajax-cache

- Ajax 解决浏览器缓存问题？

1. 在ajax发送请求前加上 anyAjaxObj.setRequestHeader("If-Modified-Since","0")。

2. 在ajax发送请求前加上 anyAjaxObj.setRequestHeader("Cache-Control","no-cache")。

3. 在URL后面加上一个随机数： "fresh=" + Math.random();。

4. 在URL后面加上时间搓："nowtime=" + new Date().getTime();。

5. 如果是使用jQuery，直接这样就可以了 $.ajaxSetup({cache:false})。这样页面的所有ajax都会执行这条语句就是不需要保存缓存记录。


## Cross-domain

- 如何解决跨域问题?

jsonp、 iframe、window.name、window.postMessage、服务器上设置代理页面

[同源策略及限制](http://pengyouyi.site/http/2017/11/07/http-Communication)

# AMD-CMD

- AMD（Modules/Asynchronous-Definition）、CMD（Common Module Definition）规范区别？

Asynchronous Module Definition，异步模块定义，所有的模块将被异步加载，模块加载不影响后面语句运行。所有依赖某些模块的语句均放置在回调函数中。

区别：

1. 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible.
 
2. CMD 推崇依赖就近，AMD 推崇依赖前置。看代码：

```js
// CMD
define(function(require, exports, module) {
    var a = require('./a')
    a.doSomething()
    // 此处略去 100 行
    var b = require('./b') // 依赖可以就近书写
    b.doSomething()
    // ...
})
```
```js
// AMD 默认推荐
define(['./a', './b'], function(a, b) { // 依赖必须一开始就写好
    a.doSomething()
    // 此处略去 100 行
    b.doSomething()
    // ...
})
```

[requirejs初学](http://pengyouyi.site/js/2016/09/29/requirejs)

[seajs初学](http://pengyouyi.site/js/2016/09/30/seajs)

[requirejs和seajs的区别](http://pengyouyi.site/js/2016/10/03/requirejs&&seajs)

[AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)

[CMD](https://github.com/seajs/seajs/issues/242)

# Object.is()

- Object.is() 与原来的比较操作符“ ===”、“ ==”的区别？

两等号判等，会在比较时进行类型转换；

三等号判等(判断严格)，比较时不进行隐式类型转换,（类型不同则会返回false）；

Object.is 在三等号判等的基础上特别处理了 NaN 、-0 和 +0 ，保证 -0 和 +0 不再相同，
但 Object.is(NaN, NaN) 会返回 true.

Object.is 应被认为有其特殊的用途，而不能用它认为它比其它的相等对比更宽松或严格。

# 更多-more
+ [https://github.com/markyun/My-blog/tree/master/Front-end-Developer-Questions/Questions-and-Answers](https://github.com/markyun/My-blog/tree/master/Front-end-Developer-Questions/Questions-and-Answers)
+ [https://leohxj.gitbooks.io/front-end-database/content/interview/interview-exercises-with-JavaScript.html](https://leohxj.gitbooks.io/front-end-database/content/interview/interview-exercises-with-JavaScript.html)
















































