---
layout: post
title: js中的匿名函数
tags:
- JS-Function
categories: JS
description: js中的匿名函数
---

# js中的匿名函数

# what is anonymous function
第一种方式，创建匿名函数，形如以下：
```js
(function(){
//代码
})();
``` 
匿名函数例子
```js
(function(x, y){ 
  alert(x + y); 
})(2, 3);
```
这里创建了一个匿名函数(在第一个括号内)，第二个括号用于调用该匿名函数，并传入参数。括号是表达式，是表达式就有返回值，所以可以在后面加一对括号让它们执行.

第二种方式，创建匿名函数，函数表达式的右侧。
```js
var double = function(x) { return 2* x; }
```
右边的函数就是一个匿名函数，创造完毕函数后，又将该函数赋给了变量double。

## self-executing anonymous function
为什么(function {// code})();可以被执行, 而function {// code}();却会报错?
// SyntaxError: Unexpected token (

分析：  
(1). 首先, 要清楚两者的区别:  
(function {// code})是表达式, function {// code}是函数声明.

(2). 其次, js"预编译"的特点:  
js在"预编译"阶段, 会解释函数声明, 但却会忽略表式.

(3). 当js执行到function() {//code}();时, 由于function() {//code}在"预编译"阶段已经被解释过, js会跳过function(){//code}, 试图去执行();, 故会报错;  
在解析器解析全局的function或者function内部function关键字的时候，默认是认为function声明，而不是function表达式，如果你不显示告诉编译器，它默认会声明成一个缺少名字的function，并且抛出一个语法错误信息，因为function声明需要一个名字。

当js执行到(function {// code})();时, 由于(function {// code})是表达式, js会去对它求解得到返回值, 由于返回值是一 个函数, 故而遇到();时, 便会被执行.

另外， 函数转换为表达式的方法并不一定要靠分组操作符()，我们还可以用void操作符，~操作符，!操作符

```js
~(function(){ 
alert('water'); 
})();//写法有点酷~
 
void function(){ 
alert('water'); 
}();//据说效率最高~
 
+function(){ 
alert('water'); 
}();
 
-function(){ 
alert('water'); 
}();
 
!function(){ 
alert('water'); 
}();
```

# anonymous function好处

1.避免占用全局变量名  
2.参数保护,函数是独立作用域,传递参数可以保护临时变量,闭包可以保存循环中需要保留的临时变量,还有组件开发时将命名空间传递到函数中用闭包保护起来,即使命名空间被后面的代码重置,原变量被闭包保护将仍然生存  
3.降低风险,因为没有变量名,中间代码又被闭包保护,js注入无法访问,减少被攻击风险

1.

```js
(function(){
	var a = "a";
	b = "b";
	function c(){
		return c;
	}
})()
console.log(a);    // a is not defined(…)
console.log(b);
console.log(c());  // c is not defined(…)
```

# anonymous function使用场景
一是回调函数，二是直接执行函数。

# anonymous function & closure


# 更多-more



















































