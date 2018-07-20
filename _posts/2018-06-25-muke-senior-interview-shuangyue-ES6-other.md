---
layout: post
title: 慕课网-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第2章 ES6 语法 - ES6其他常用功能
tags:
- Interview
- imooc
categories: JS
description: 慕课网-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第2章 ES6 语法 - ES6其他常用功能
---

慕课网学习笔记-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第2章 ES6 语法 - ES6其他常用功能

# let/const

```js
// js
var i = 10;
i = 100;

//ES6
let i = 10;
i = 100; // right
const j = 20;
j = 200; // error
```

# 多行字符串、模板变量-String

```js
// js
var name = 'zhangsan', age = 20, html = '';
html += '<div>';
html += ' <p>' + name + '</p>';
html += ' <p>' + age + '</p>';
html += '</div>';

//ES6
const name = 'zhangsan', age = 20;
const html = `
<div>
  <p>${name}</p>
  <p>${age}</p>
</div>
`
console.log(html);
```

# 解构赋值-Destructuring-assignment

```js
// js
var obj = {a: 100, b: 200}
var a = obj.a;
var b = obj.b;

var arr = [1,2,3];
var x = arr[0];

// es6
const obj = {a:10, b:20, c:30}
const {a, c} = obj
console.log(a);
console.log(c);

const arr = [1,2,3];
const [x,y,z] = arr;
console.log(x)
console.log(y)
console.log(z)
```

# 块级作用域-let

```js
//js
var obj = {a:100, b:200}
for(var item in obj){
  console.log(item)
}
console.log(item) // 'b'

// es6
const obj = {a: 100, b: 200};
for(let item in obj) {
  console.log(item);
}
console.log(item); //undefined
```

# 函数默认参数-Default
```js
// js
function (a, b) {
 if (b == null) {
   b = 0
 }
}

// es6
function (a, b=0){

}
```

# 箭头函数-arrow

```js
// js
var arr = [1,2,3];
arr.map(function(item){
  return item + 1
})

// es6
const arr = [1,2,3];

arr.map((item) => item + 1);

arr.map((item, index) => {
  console.log(index);
  return item + 1;
})
```

```js
function fn(){
  console.log('real', this); // {a: 100}
  var arr = [1,2,3];
  // js
  arr.map(function(item){
    console.log('js', this) // window
    return item + 1
  })
	
	//es6
  arr.map((item, index) => {
	  console.log('es6', this); // {a: 100}
	  return item + 1;
	})
}
fn.call({a: 100})
```

# ES6常用功能-总结

- let/const

- 多行字符串、模板变量

- 解构赋值

- 块级作用域

- 函数默认参数

- 箭头函数

- 模块化

- class类

- Promise






# 更多-more

[揭秘一线互联网企业 前端JavaScript高级面试](https://coding.imooc.com/learn/list/190.html)

[ECMAScript 6 入门-阮一峰](http://es6.ruanyifeng.com/)

