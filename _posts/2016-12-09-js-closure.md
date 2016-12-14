---
layout: post
title: js中的闭包
tags:
- js函数
categories: Js
description: js中的闭包
---

# what is闭包，闭包的应用场景

# what is closure
闭包是指有权访问另一个函数作用域中的变量。
创建闭包的常见方式，就是在一个函数内部创建另一个函数。

通俗解释：
Javascript允许使用内部函数---即函数定义和函数表达式位于另一个函数的函数体内。而且，这些内部函数可以访问它们所在的外部函数中声明的所有局部变量、参数和声明的其他内部函数。当其中一个这样的内部函数在包含它们的外部函数之外被调用时，就会形成闭包。

# variable scope
JavaScript中是没有块级作用域的。
变量的作用域无非就是两种：全局变量和局部变量。 
Javascript语言的特殊之处，就在于函数内部可以直接读取全局变量。
```js
var n=999;
function f1(){
　　alert(n);
}
f1(); // 999
```
另一方面，在函数外部自然无法读取函数内的局部变量。
```js
function f1(){
　　var n=999;
}
alert(n); // error
```
这里有一个地方需要注意，函数内部声明变量的时候，一定要使用var命令。如果不用的话，你实际上声明了一个全局变量！
```js
function f1(){
　　n=999;
}
f1();
alert(n); // 999
```
# Access to outer variables
在函数的内部，再定义一个函数。
```js
function f1(){
　　var n=999;
　　function f2(){
　　　　alert(n); // 999
　　}
}
```
在上面的代码中，函数f2就被包括在函数f1内部，这时f1内部的所有局部变量，对f2都是可见的。但是反过来就不行，f2内部的局部变量，对f1就是不可见的。这就是Javascript语言特有的"链式作用域"结构（chain scope），子对象会一级一级地向上寻找所有父对象的变量。所以，父对象的所有变量，对子对象都是可见的，反之则不成立。

既然f2可以读取f1中的局部变量，那么只要把f2作为返回值，我们不就可以在f1外部读取它的内部变量了吗！
```js
function f1(){
　　var n=999;
　　function f2(){
　　　　alert(n); 
　　}
　　return f2;
}
var result=f1();
result(); // 999
```
此处f2函数，就是闭包。

# 闭包的几种写法和用法

// ## 给函数添加一些属性
// ```js
// function Circle(r) { 
//   this.r = r; 
// } 
// Circle.PI = 3.14159; 
// Circle.prototype.area = function() { 
//   return Circle.PI * this.r * this.r; 
// } 
// var c = new Circle(1.0); 
// alert(c.area()); //3.14159
// ```
// ## 是声明一个变量，将一个函数当作值赋给变量
// ```js
// var Circle = function() { 
//   var obj = new Object(); 
//   obj.PI = 3.14159; 

//   obj.area = function( r ) { 
//     return this.PI * r * r; 
//   } 
//   return obj; 
// } 
// var c = new Circle(); 
// alert( c.area( 1.0 ) ); //3.14159
// ```
// ## 这种方法使用较多，也最为方便。var obj = {}就是声明一个空的对象
// ```js
// var Circle={ 
//   "PI":3.14159, 
//   "area":function(r){ 
//     return this.PI * r * r; 
//   } 
// }; 
// alert( Circle.area(1.0) );//3.14159
// ```
# The Uses of Closures

## one：可以读取函数内部的变量，
## two：让这些变量的值始终保持在内存中。
```js
function f1(){
　　var n=999;
　　nAdd=function(){n+=1}
　　function f2(){
　　　　alert(n);
　　}
　　return f2;
}
var result=f1();
result(); // 999
nAdd();
result(); // 1000
```
在这段代码中，result实际上就是闭包f2函数。它一共运行了两次，第一次的值是999，第二次的值是1000。这证明了，函数f1中的局部变量n一直保存在内存中，并没有在f1调用后被自动清除。

为什么会这样呢？原因就在于f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收。

这段代码中另一个值得注意的地方，就是“nAdd=function(){n+=1}”这一行，首先在nAdd前面没有使用var关键字，因此 nAdd是一个全局变量，而不是局部变量。其次，nAdd的值是一个匿名函数（anonymous function），而这个

匿名函数本身也是一个闭包，所以nAdd相当于是一个setter，可以在函数外部对函数内部的局部变量进行操作。
```js
function a(){
  var n = 0;
  function inc(){
    n++; 
    console.log(n);
  }
  return inc;
}
var c = a();
c();  //控制台输出1
c();  //控制台输出2
```

# Note the use of closure points
1）由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。

2）闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。

// # 闭包的应用场景
// # 闭包原理
// # 闭包与this
// # 垃圾回收机制

# more
- [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)
- [http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)
- [https://www.sitepoint.com/demystifying-javascript-closures-callbacks-iifes/](https://www.sitepoint.com/demystifying-javascript-closures-callbacks-iifes/)
- [https://medium.freecodecamp.com/lets-learn-javascript-closures-66feb44f6a44#.3k2l1ktm2](https://medium.freecodecamp.com/lets-learn-javascript-closures-66feb44f6a44#.3k2l1ktm2)















































