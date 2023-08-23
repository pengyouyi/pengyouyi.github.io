---
layout: post
title: JSON.stringify() 有什么缺点
tags:
- Interview
- js
categories: JS
description: JSON.stringify() 有什么缺点
---

# JSON.stringify() 有什么缺点

JSON.parse(JSON.stringify(obj)) 用 JSON 实现深拷贝，然而这个方法还有弊端。

1. 如果 obj 里面有时间对象，则 JSON.stringify 后再 JSON.parse 的结果，时间将是字符串的形式，而不是对象的形式。  
2. 如果 obj 里有 RegExp(正则表达式的缩写)、Error对象，则序列化的结果将只得到空对象。  
3. 如果 obj 里有函数、undefined、Symbol，则序列化的结果会把函数或 undefined 丢失。  
4. 如果 obj 里有 NaN、Infinity 和 -Infinity，则序列化的结果会变成 null。  
5. JSON.stringify() 只能序列化对象的可枚举的自有属性，例如 如果 obj 中的对象是有构造函数生成的， 则使用 JSON.parse(JSON.stringify(obj)) 深拷贝后，会丢弃对象的constructor。  
6. 如果对象中存在循环引用的情况也无法正确实现深拷贝。  

# more


[利用 JSON.stringify 深拷贝的弊端](http://www.taodudu.cc/news/show-3403780.html?action=onClick)   
[JS中JSON序列化JSON.stringify的坑点和处理](https://blog.csdn.net/jason_renyu/article/details/123640102)  