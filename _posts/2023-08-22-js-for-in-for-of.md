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

- for...in 遍历得到 key  
- for...of 遍历得到 value  

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


# 可枚举 VS 可迭代

- for...in 用于**可枚举**数据，比如对象、数组、字符串
- for...of 用于**可迭代**数据，比如数组、字符串、Map、Set


# for await ...of 有什么作用

for await ...of 用于遍历多个 Promise  

```js
function createPromise(val) {
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve(val)
      }, 1000)
  })
}

(async function() {
    const p1 = createPromise(100);
    const p2 = createPromise(200);
    const p3 = createPromise(300);

    // const res1 = await p1;
    // console.log(res1);  // 100
    // const res2 = await p2;
    // console.log(res2);  //200
    // const res3 = await p3;
    // console.log(res3);  //300

    const list = [p1, p2, p3];

    // Promise.all(list).then(res => console.log(res));  // [100, 200, 3000]

    // 和上面的 Promise.all() 方法等价
    for await (let res of list) {
      console.log(res)
    }
})()
```