---
layout: post
title: for...in 和 for...of 的区别
tags:
- Interview
- JS
categories: JS
description: for...in 和 for...of 的区别
---

# for...in 和 for...of 的区别

# for...in

for...in 可以遍历对象和数组

## for...in 遍历对象

```js
Object.prototype.method = function() {
	console.log(this);
}
let obj = {
	name: '张三',
	age: 18
}

for(let key in obj) {
	console.log(key);
	console.log(obj[key]);
}
```

结果：

```js
name
张三
age
18
method
f(){console.log(this)}
```

## for...in 遍历数组

```js
Array.prototype.method = function() {
	return this.length;
}
let arr = ['a',5];
for(let key in arr) {
	console.log(key);
	console.log(typeof key);
	console.log(arr[key]);
}
```

结果：

```
0
string
a

1
string
5

method
string
f() {return this.length}
```

有上段代码可以总结出 for...in 遍历数组的特点：

- 遍历的索引为字符串类型;
- 遍历顺序可能不是按照数组顺序（随机顺序）;
- 使用 for in 会遍历数组所有的可枚举属性，包括原型。

# for...of

> for...of 不能遍历对象，  
> for...of 可以简单、正确的遍历数组（不遍历原型上的 name 和 method）

```js
let arr = ['a', 5];
arr.name = '数组';
arr.getName = function() {
	return this.name;
}
for(let value of arr) {
	console.log(value);
}
```

结果:

```
a
5
```

for...of 遍历数组得到的是数组的每一项值,不是索引。

# Javascript 中可迭代对象

- String  
- Array  
- Arguments  
- NodeList  
- Map  
- Set  

具有迭代器对象才可以使用 for...of，否则报错。

# 总结 Summary

> **`for...in 适合遍历对象，for...of 适合遍历数组`**  

>> **for...in 遍历的是数组的索引**  
>> **for...in 遍历的是对象的属性，以及原型链上的属性**  

> **for...of 遍历的是数组的值，不是索引**  