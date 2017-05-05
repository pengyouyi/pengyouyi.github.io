---
layout: post
title: ES6-Generators
tags:
- ES6
categories: JS
description: ES6新特性Generators
---

# 什么是生成器Generators？

我们从一个示例开始：
```js
function* quips(name) {
  yield "你好 " + name + "!";
  yield "希望你能喜欢这篇介绍ES6的译文";
  if (name.startsWith("X")) {
    yield "你的名字 " + name + "  首字母是X，这很酷！";
  }
  yield "我们下次再见！";
}
```
[会说话的猫](http://people.mozilla.org/~jorendorff/demos/meow.html)
它与普通函数有很多共同点，但是二者有如下区别：
> + 普通函数使用function声明，而生成器函数使用function*声明。
> + 在生成器函数内部，有一种类似return的语法：关键字yield。二者的区别是，普通函数只可以return一次，而生成器函数可以yield多次（当然也可以只yield一次）。在生成器的执行过程中，遇到yield表达式立即暂停，后续可恢复执行状态。

这就是普通函数和生成器函数之间最大的区别，普通函数不能自暂停，生成器函数可以。




# 更多-more
+ [http://www.infoq.com/cn/articles/es6-in-depth-generators/](http://www.infoq.com/cn/articles/es6-in-depth-generators/)
+ [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield)
+ [http://www.tuicool.com/articles/ZJBfmuN](http://www.tuicool.com/articles/ZJBfmuN)























