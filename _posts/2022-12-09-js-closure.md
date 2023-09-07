---
layout: post
title: js中的闭包
tags:
- JS-Function
- JS-Basic
categories: JS
description: js中的闭包
---

# what is闭包，闭包的应用场景

# what is closure

**闭包的定义：** 闭包是指有权访问另一个函数作用域中的变量的函数。  

**创建闭包的常见方式：**就是在一个函数内部创建另一个函数。

通俗解释：
Javascript允许使用内部函数---即函数定义和函数表达式位于另一个函数的函数体内。而且，这些内部函数可以访问它们所在的外部函数中声明的所有局部变量、参数和声明的其他内部函数。当其中一个这样的内部函数在包含它们的外部函数之外被调用时，就会形成闭包。

# variable scope
   
Javascript语言的特殊之处，就在于函数内部可以直接读取全局变量。

```js
var n = 999;
function f1(){
　　alert(n);
}
f1(); // 999
```

另一方面，在函数外部自然无法读取函数内的局部变量。

```js
function f1(){
　　var n = 999;
}
alert(n); // error
```

这里有一个地方需要注意，函数内部声明变量的时候，一定要使用var命令。如果不用的话，你实际上声明了一个全局变量！

```js
function f1(){
　　n = 999;
}
f1();
alert(n); // 999
```

# Access to outer variables

在函数的内部，再定义一个函数。

```js
function f1(){
　　var n = 999;
　　function f2(){
　　　　alert(n); // 999
　　}
}
```

在上面的代码中，函数f2就被包括在函数f1内部，这时f1内部的所有局部变量，对f2都是可见的。但是反过来就不行，f2内部的局部变量，对f1就是不可见的。这就是Javascript语言特有的"链式作用域"结构（chain scope），子对象会一级一级地向上寻找所有父对象的变量。所以，父对象的所有变量，对子对象都是可见的，反之则不成立。

既然f2可以读取f1中的局部变量，那么只要把f2作为返回值，我们不就可以在f1外部读取它的内部变量了吗！

```js
function f1(){
　　var n = 999;
　　function f2(){
　　　　alert(n); 
　　}
　　return f2;
}
var result = f1();
result(); // 999
```

此处f2函数，就是闭包。

# Benefits of using closures

**使用闭包的好处:**

1. 希望一个变量长期驻扎在内存中  
2. 避免全局变量的污染  
3. 私有成员的存在  

# The Uses of Closures

## one：可以读取函数内部的变量，

## two：让这些变量的值始终保持在内存中。

```js
function f1() {
    var i = 1;  
    function f2(){
        return i++
    }; 
    return f2 
}         
var fun = f1();  
fun();　　　　// 1 执行后 i++，，然后i还在~  
fun();　　　　// 2   
fun = null;　　// i被回收！！
```

在这段代码中，fun实际上就是闭包f2函数。它一共运行了两次，第一次的值是1，第二次的值是2。这证明了，函数f1中的局部变量i一直保存在内存中，并没有在f1调用后被自动清除。

## three: 代码封装、模块化

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

# 闭包的应用场景scenario

## one-setTimeout

```js
//原生的setTimeout传递的第一个函数不能带参数
setTimeout(function(param){
    alert(param)
},1000)

//通过闭包可以实现传参效果
function func(param){
    return function(){
        alert(param)
    }
}
var f1 = func(1);
setTimeout(f1,1000);
```

## two-网页事件【如：click、focus】需要传值时

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <link rel="stylesheet" href="">
</head>
<style>
    body{
        font-size: 12px;
    }
    h1{
        font-size: 1.5rem;
    }
    h2{
        font-size: 1.2rem;
    }
</style>
<body>

    <p>哈哈哈哈哈哈</p>
    <h1>hhhhhhhhh</h1>
    <h2>qqqqqqqqq</h2>

    <a href="#" id="size-12">12</a>
    <a href="#" id="size-14">14</a>
    <a href="#" id="size-16">16</a>

<script>
    function changeSize(size){
        return function(){
            document.body.style.fontSize = size + 'px';
        };
    }

    var size12 = changeSize(12);
    var size14 = changeSize(14);
    var size16 = changeSize(16);

    document.getElementById('size-12').onclick = size12;
    document.getElementById('size-14').onclick = size14;
    document.getElementById('size-16').onclick = size16;
    //我们定义行为，然后把它关联到某个用户事件上（点击或者按键）。我们的代码通常会作为一个回调（事件触发时调用的函数）绑定到事件上

</script>
</body>
</html>
```

## three-用闭包模拟私有方法

```js
var makeCounter = function () {
    var privateCounter = 0;
    function changeBy(val){
        privateCounter += val;
    };
    return {
        increment: function(){
            changeBy(1);
        },
        decrement: function(){
            changeBy(-1);
        },
        value: function(){
            return privateCounter;
        }
    }
};
var Counter1 = makeCounter();
var Counter2 = makeCounter();
Counter1.increment();
console.log(Counter1.value()); //1
console.log(Counter2.value()); //0
```

名为 privateCounter 的变量和名为 changeBy 的函数。这两项都无法在这个匿名函数外部直接访问。必须通过匿名函数返回的三个公共函数访问。

以这种方式使用闭包，提供了许多与面向对象编程相关的好处 —— 特别是数据隐藏和封装。

## four-在循环中创建闭包,找到对应的索引

```js
function createFunctions(){ 
  var result = new Array(); 
  for (var i = 0; i < 10; i++){ 
    result[i] = function(){ 
      return i; 
    }; 
  } 
  return result; 
} 
var funcs = createFunctions(); 
for (var i = 0; i < funcs.length; i++){ 
  console.log(funcs[i]()); 
}
```

上面代码输出 10 个 10

上面的代码相当于

```js
var result = new Array(), i; 
result[0] = function(){ return i; }; //没执行函数，函数内部不变，不能将函数内的i替换！ 
result[1] = function(){ return i; }; //没执行函数，函数内部不变，不能将函数内的i替换！ 
... 
result[9] = function(){ return i; }; //没执行函数，函数内部不变，不能将函数内的i替换！ 
i = 10; 

funcs = result; 
result = null; 

console.log(i); // funcs[0]()就是执行 return i 语句，就是返回10 
console.log(i); // funcs[1]()就是执行 return i 语句，就是返回10 
... 
console.log(i); // funcs[9]()就是执行 return i 语句，就是返回10
```

## five-Ajax请求成功回调

# 闭包原理

# 闭包与this

# 闭包and内存泄露

```js
function f1() {  
    var i = 1;  
    function f2(){
        return i++
    }; 
    return f2 
}         
var fun = f1();  
fun();　　　　// 1 执行后 i++，，然后i还在~  
fun();　　　　// 2   
fun = null;　　// i被回收！！
```

**JS垃圾回收机制:** 局部变量在函数执行完成之后就被回收，而全局变量不会被回收直到窗口关闭

闭包导致内存泄露， f1、i、f2 不被回收

为什么会这样呢？原因就在于f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收。

# more
- [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)
- [http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)
- [https://www.sitepoint.com/demystifying-javascript-closures-callbacks-iifes/](https://www.sitepoint.com/demystifying-javascript-closures-callbacks-iifes/)
- [https://medium.freecodecamp.com/lets-learn-javascript-closures-66feb44f6a44#.3k2l1ktm2](https://medium.freecodecamp.com/lets-learn-javascript-closures-66feb44f6a44#.3k2l1ktm2)















































