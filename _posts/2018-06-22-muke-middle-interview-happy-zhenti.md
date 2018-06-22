---
layout: post
title: 慕课网-前端跳槽面试必备技巧（快乐动起来呀）- 第7章 2017真题解析
tags:
- Interview
- imooc
categories: JS
description: 慕课网-前端跳槽面试必备技巧（快乐动起来呀）- 第7章 2017真题解析
---

慕课网学习笔记-前端跳槽面试必备技巧（快乐动起来呀）- 第7章 2017真题解析

# 从“九宫格”考CSS综合实力

<div class="rd">
    <img src="/assets/images/2018/4-5-6/6-22-1.png" alt="">
</div>

**✍ 考察知识点：**

- flex布局
- box-sizing
- css选择器
- z-index
- 负边距

**✍ 答题步骤：**

① 首先引入'reset.css';

② 标签结构：ul、li，标签语义化 

③ 布局：

- position:absolute【不行】
- display:inline、block【方法土，笨】
- display:table-cell【兼容性最好，不错的选择】
- float:left
- display:flex【挺好】
- grid【good】

**flex布局父元素设置高度后，子元素margin-top无效？？**

解决方法：去掉父元素的高度

④ li设置box-sizing: border-box;

⑤ **新问题，两个li的border重合变宽了，怎样消重**

子元素设置：

```css
#grid li {
	margin-left: -4px;
	margin-top: -4px;
}
#grid li:nth-child(3n+1) {
	margin-left: 0;
}
```

⑥ **负边距导致hover效果边出现的不全**

hover的时候提升z-index

[CSS实现列表li边框重合问题](https://blog.csdn.net/m0_38099607/article/details/70162083)

## Answer

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
<style>
* {
	margin: 0;
	padding: 0;
}
ul {
	list-style: none;
}
#grid {
	display: flex;
	flex-wrap: wrap; /*换行*/
	width: 300px;
	/*height:300px;*/
	margin: 50px auto;
}
#grid li {
	width: 100px;
	height: 100px;
	margin-left: -4px;
	margin-top: -4px;
	box-sizing: border-box;
	line-height: 100px;
	text-align: center;
	border: 4px solid #999;
	z-index: 0;
}
#grid li:nth-child(3n+1) {
	margin-left: 0;
}
#grid li:hover {
	z-index:1;
	border: 4px solid red;
}
</style>
</head>
<body>
<ul id="grid">
	<li>1</li>
	<li>2</li>
	<li>3</li>
	<li>4</li>
	<li>5</li>
	<li>6</li>
	<li>7</li>
	<li>8</li>
	<li>9</li>
</ul>
<script>  
</script>
</body>
</html>
```

# 一个函数考察js基本功


```js
function Foo() {
	getName = function() {
		console.log(1);
	}
	return this;
}
Foo.getName = function() {
	console.log(2);
}
Foo.prototype.getName = function() {
	console.log(3);
}
var getName = function() {
	console.log(4);
}
function getName() {
	console.log(5)
}

//请写出以下输出结果：

Foo.getName();  
getName();  
Foo().getName();  
getName(); 
new Foo.getName()   
new Foo().getName()  
new new Foo().getName()  
```

**✍ 考察知识点：**

- 函数和类
- 原型链
- 运算符优先级
- 作用域
- 变量提升

## Answer

```js
function Foo() {
	getName = function() {
		console.log(1);
	}
	return this;
}
Foo.getName = function() {
	console.log(2);
}
Foo.prototype.getName = function() {
	console.log(3);
}
var getName = function() {
	console.log(4);
}
function getName() {
	console.log(5)
}

// 答案：
Foo.getName();  // 2, 访问Foo函数上存储的静态属性

getName();  // 4 ,变量声明、函数声明提升

Foo().getName();  // 1, this = window,即执行vwindow.getName() 

getName(); // 1 ，同上

new Foo.getName()  = new (Foo.getName)(); // 2 , 成员访问（点.）的优先级高于new操作，将getName函数作为了构造函数来执行

new Foo().getName() = (new Foo()).getName() // 3 , 返回this，Foo函数的实例化对象。去原型对象（prototype）中寻找getName

new new Foo().getName()  = new ((new Foo()).getName)() = new foo.getName()// 3 ，先初始化Foo的实例化对象，然后将其原型上的getName函数作为构造函数再次new

```

[一道常被人轻视的前端JS面试题](http://www.cnblogs.com/xxcanghai/p/5189353.html)

[构造函数是否有new的区别](https://blog.csdn.net/juzipchy/article/details/55508328)

[运算符优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

# 面向对象的方式维护一个list

使用面向对象的方式维护一个列表，每个列表有一个删除按钮，点击删除按钮移除当前行。

<div class="rd">
    <img src="/assets/images/2018/4-5-6/6-22-2.png" alt="">
</div>

**✍ 考察知识点：**

- 复用性设计
- 事件代理
- 事件绑定
- 渲染机制
- 递归

## Answer

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
<style>
.del {
	padding: 10px;
}
</style>
</head>
<body>
<ul class="list">
	<li>~~~~~~~~~第1行<span class="del">X</span></li>
	<li>~~~~~~~~~第2行<span class="del">X</span></li>
	<li>~~~~~~~~~第3行<span class="del">X</span></li>
	<li>~~~~~~~~~第4行<span class="del">X</span></li>
	<li>~~~~~~~~~第5行<span class="del">X</span></li>
</ul>

<ul class="list">
	<li>*********第1行<span class="del">X</span></li>
	<li>*********第2行<span class="del">X</span></li>
	<li>*********第3行<span class="del">X</span></li>
	<li>*********第4行<span class="del">X</span></li>
	<li>*********第5行<span class="del">X</span></li>
</ul>

<script>  
class List {
	constructor(sel) {
		this.el = Array.from(document.querySelectorAll(sel));
		let self = this;
		this.el.forEach((item) => {
			item.addEventListener('click', function(e) {
				if (e.target.className.indexOf('del') > -1) {
                    self.removeItem.call(self,e.target)
				}
			})
		})
	}

	removeItem(target) {
		let self = this;
		let findParent = function(node) {
			let parent = node.parentNode;
			let root = self.el.find(item => item === parent);
			if (root) {
				root.removeChild(node);
			} else {
				findParent(parent);
			}
		}
		findParent(target)
	}
}

window.addEventListener('DOMContentLoaded', function() {
	new List('.list')
})

</script>
</body>
</html>
```

# 一道“js算法”提升软实力

将数组 arr = ['a',['b','c',['x']],2,['d','e','f'],'g',3,4]

转换成字符串  a,b,c,x,2,d,e,f,g,3,4

**✍ 考察知识点：**

- 递归
- 隐式类型转换
- 遍历器

## Answer

法一：递归
```js
var arr = ['a',['b','c',['x']],2,['d','e','f'],'g',3,4];

function flat(arr) {
	var temp = [];
	function digui(arr) {
		for(var i = 0; i < arr.length; i++) {
			if (arr[i] instanceof Array) {
	         digui(arr[i]);
			} else {
				temp.push(arr[i]);
			}
		}
	}
	digui(arr)
	
	return temp.join(',')
}

console.log(flat(arr))
```

法二：toString(格式转换)

原理：隐式类型转换
```js
var flag = function() {
	let toString = Array.prototype.toString();
	Array.prototype.toString = function() {
		return this.join(',');
	}
	let result = arr + '';
	Array.prototype.toString = toString;
	return result;
}

console.log(flag(arr));
```

在Array原型链上新增方法
```js
var arr = ['a',['b','c',['x']],2,['d','e','f'],'g',3,4];

Array.prototype.ArrToString = function(arr) {
	return this.join(',');
}

console.log(arr.ArrToString());
```

法三：valueOf方法同样可以,不严谨的写法：

```js
Array.prototype.valueOf = function() {
	return this.join(',')
}

var flat = function(arr) {
	return arr + ''
}

console.log(flat(arr))
```

```js
console.log(arr.toString())
```

法四：ES6的Iterator遍历自定义结构的数据

```js
Array.prototype[Symbol.iterator] = function() {
	let = arr = [].concat(this);
	let getFirst = function(array) {
		let first = array.shift();
		return first
	};
	return {
		next: function() {
			let item = getFirst(arr);
			if(item) {
				return {
					value:item,
					done: false
				}
			} else {
				return {done: true}
			}
		}
	}
}

var flat = function(arr) {
    let r = [];
    for(let i of arr) {
    	r.push(i);
    }
    return r.join(',')
}

console.log(flat(arr))
```

# 更多-more

[前端跳槽面试必备技巧](https://coding.imooc.com/learn/list/129.html)