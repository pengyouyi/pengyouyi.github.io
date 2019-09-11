---
layout: post
title: js设计原则-迭代器模式
tags:
- design-pattern
categories: JS
description: js设计原则-迭代器模式
---

# 迭代器模式-Iterator

# Iterator 介绍

**迭代器模式（ Iterator ）：**在不暴露对象内部结构的同时，可以顺序地访问聚合对象内部的元素。

# Iterator 示例 & UML

- 没有合适的示例，用常用的 jQuery 演示一下

<div class="rd">
    <img src="/assets/images/2019/4-5-6/4-30-1.png" alt="">
</div>

# Iterator 代码

```js
<p> item </p>
<p> item </p>
<p> item </p>

<script src="jquery"></script>
<script>
// 数组遍历
var arr = [1, 2, 3];
arr.forEach(function(item) {
    console.log(item);
});

// 原生节点遍历
var nodeList = document.getElementsByTagName('p');
var i;
var length = nodeList.length;
for (i = 0; i < length; i++) {
    console.log(nodeList[i])
}

// jquery遍历
var $p = $('p');
$p.each(function(key, p) {
    console.log(key, p);
})

</script>
```

需求：封装一个函数，能同时遍历以上3种数据结构。

```js
var arr = [1, 2, 3];
var nodeList = document.getElementsByTagName('p');
var $p = $('p');

function each(data) {

}

each(arr);
each(nodeList);
each($p);
```

```js
var arr = [1, 2, 3];
var nodeList = document.getElementsByTagName('p');
var $p = $('p');

function each(data) {
    var $data = $(data); // 生成迭代器
    $data.each(function(key, val) {
        console.log(key, val);
    });
}

each(arr);
each(nodeList);
each($p);
```

# Iterator 演示

```js
class Iterator {
    constructor(container) {
    	this.list = container.list;
    	this.index = 0;
    }
    next() {
        if (this.hasNext()) {
        	return this.list[this.index++]
        }
        return null;
    }
    hasNext() {
    	if (this.index >= this.list.length) {
    		return false;
    	}
    	return true;
    }
}

class Container {
	constructor(list) {
		this.list = list;
	}
	// 生成遍历器
	getIterator() {
        return new Iterator(this);
	}
}

// test
let arr = [1,2,3];

let container = new Container(arr);
let iterator = container.getIterator(container);

while(iterator.hasNext()) {
	console.log(iterator.next());
}
```

# Iterator 场景

① jQuery each

② ES6 Iterator

## jQuery each

```js
var arr = [1, 2, 3];
var nodeList = document.getElementsByTagName('p');
var $p = $('p');

// 如何能写出一个方法来遍历这三种对象
function each(data) {
    var $data = $(data); // 生成迭代器
    $data.each(function(key, val) {
        console.log(key, val);
    });
}

each(arr);
each(nodeList);
each($p);
```

## ES6 Iterator

**ES6 Iterator 为何存在？**

- ES6 语法中，有序集合的数据类型已经有很多

- Array 、Map Set 、String 、TypedArray 、arguments 、NodeList

- 需要有一个统一的遍历接口来遍历所有数据类型

- （注意，Object 不是有序集合，可以用 Map 代替）

**ES6 Iterator 是什么？**

- 以上数据类型，都有 [Symbol.iterator] 属性

- 属性值是函数，执行函数返回一个迭代器

- 这个迭代器就有 next 方法可顺序迭代子元素

- 可运行 Array.prototype[Symbol.iterator] 来测试

```js
Array.prototype[Symbol.iterator]
// ƒ values() { [native code] }

Array.prototype[Symbol.iterator]()
// Array Iterator {}

Array.prototype[Symbol.iterator]().next();
// {value: undefined, done: true}
```

**ES6 Iterator示例**

```js
let data = [1, 2];

function each(data) {
	// 生成遍历器
	let iterator = data[Symbol.iterator]();

	// console.log(iterator.next()) // 有数据时返回 {value: 1, done: false}
	// console.log(iterator.next()) 
	// console.log(iterator.next()) // 没有有数据时返回 {value: undefined, done: true}

	let item = {done: false};
	while(!item.done) {
		item = iterator.next();
		if (!item.done) {
			console.log(item.value)
		}
	}
}

each(data);
```

```js
// Symbol.iterator 并不是人人都知道的方法
// 也不是每个人都需要封装一个 each 方法
// 因此有了 for...of 语法

function each(data) {
    for(let item of data) {
        console.log(item);
    }
}
```

**ES6 Iterator 与 Generator**

- Iterator 的价值不限于上述几个类型的遍历

- 还有 Generator 函数的使用

- 即只要返回的数据符合 Iterator 接口的要求

- 即可使用 Iterator 语法，这就是迭代器模式

```js
function * testGenerator() {
    yield '1';
    yield '2';
    return 'end';
}

let test = testGenerator();
test[Symbol.iterator]
// f [Symbol.iterator]() { [native code] }
// 可以看到， Generator 函数返回的结果，也实现了 Iterator 接口
```

注：Generator 现在应用不广泛

# Iterator 设计原则验证

- 迭代器对象和目标对象分离

- 迭代器将使用者与目标对象隔离开

- 符合开放封闭原则