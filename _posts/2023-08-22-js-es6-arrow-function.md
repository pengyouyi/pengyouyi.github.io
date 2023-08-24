---
layout: post
title: ES6箭头函数和普通函数的区别
tags:
- Interview
- JS
- ES6
categories: JS
description: ES6箭头函数和普通函数的区别
---

# ES6箭头函数和普通函数的区别

## Summary 箭头函数和普通函数的区别

❶ 声明方式不同：普通函数可以是声明式的，也可以是赋值式；而箭头函数只能是赋值式的；  
❷ `this 指向不同`：普通函数有原型 prototype，this 指向不确定；箭头函数本身没有 this ，因为没有原型，this 指向确定，`指向他父级作用域`；  
❸ 改变 this: 普通函数的 this 指向可以通过call、apply、bind改变；箭头函数的 this 永远不会变，call、apply、bind 也无法改变；  
❹ 箭头函数没有原型 prototype；  
❺ new 不同：普通函数可以 new;箭头函数不能 new;  
❻ 是否可以当构造函数：`箭头函数不可以当作构造函数`；  
❼ 传参方式：普通函数可以获取 arguments 对象，箭头函数不能获取，可以通过 ...rest, 用 rest 对象代替  

## more 更多详细例子等待补充...