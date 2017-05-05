---
layout: post
title: js中的函数定义
tags:
- js函数
categories: JS
description: js中的函数定义
---

# js中的函数定义

## 函数声明-declaration
```js
function double(x){
    return 2 * x;   
}
```
## 函数表达式-expression
```js
var double = function(x) { 
    return 2* x; 
}
```

## Functiona构造函数
```js
var sum = new Function("num1","num2","return num1 + num2"); // 不推荐使用
```

## declaretion & expression
the differcence between a function declaretion and a function expression

函数声明作为一种声明，当然会在预编译阶级有所动作（声明提前），而函数表达式则不会。
另一个区别是，函数声明不能直接加一对括号让它们执行。
第三个区别，表达式还可以继续细分，表达式是由常量，变量，操作符，函数等组合而成，计算以后返回一个结果值，至少也会返回一个undefined。



















































