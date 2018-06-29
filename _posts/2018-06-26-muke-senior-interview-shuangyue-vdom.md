---
layout: post
title: 慕课网-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第5章 虚拟 DOM
tags:
- Interview
- imooc
categories: JS
description: 慕课网-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第5章 虚拟 DOM
---

慕课网学习笔记-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第5章 虚拟 DOM

# 第5章 虚拟 DOM

- vdom 是 vue 和 react 的核心

- vdom 比较独立，使用也比较简单

# 开始-virtual-dom

- vdom是什么？为何会存在vdom

- vdom的如何应用，核心API是什么

- 介绍一下diff算法

## 什么是vdom-开始

- 什么是 vdom

- 设计一个需求场景

- 用jQuery实现

- 遇到的问题

**什么是 vdom**

- 用JS模拟DOM结构

- DOM变化的对比，放在JS层来做（图灵完备语言）

- 提高重绘性能

```html
<ul id="list">
	<li class="item">item1</li>
	<li class="item">item2</li>
</ul>
```

```js
{
	tag: 'ul',
	attrs: {
		id: 'list'
	},
	children: [
      {
      	tag: 'li',
      	attrs: {className: 'item'},
      	children: ['item1']
      },
      {
      	tag: 'li',
      	attrs: {className: 'item'},
      	children: ['item2']
      }
	]
}
```

## 什么是vdom-jquery

设计一个需求场景

1. 将该数据展示成表格

2. 随便修改一个信息，表格也跟着修改

```js
[
  {
  	name: '张三',
  	age: '20',
  	address: '北京'
  },
  {
  	name: '李四',
  	age: '21',
  	address: '上海'
  },
  {
  	name: '王五',
  	age: '22',
  	address: '广州'
  }
]
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<div id="container"></div>
<button id="btn-change">change</button>
<script>  
var data = 
[
  {
  	name: '张三',
  	age: '20',
  	address: '北京'
  },
  {
  	name: '李四',
  	age: '21',
  	address: '上海'
  },
  {
  	name: '王五',
  	age: '22',
  	address: '广州'
  }
]

function render(data) {
  var $container =$('#container');
  $container.html('');
  var $table = $('<table>');
  $table.append($('<tr><td>name</td><td>age</td><td>addredd</td></tr>'));
  data.forEach(function(item) {
    $table.append($('<tr><td>' + item.name + '</td><td>' + item.age + '</td><td>' + item.address + '</td></tr>'))
  });
  $container.append($table);
}
$('#btn-change').click(function() {
  data[1].age = 30;
  data[2].address = '深圳';
  render(data);
})
render(data);

</script>
</body>
</html>
```

## 什么是vdom-总结

遇到的问题

```js
var div = document.createElement('div');
var item, result = '';
for (item in div) {
  result += ' | ' + item;
}
console.log(result);
```

- Dom 操作是昂贵的，js运行效率高

- 尽量减少DOM操作，而不是“推到重来”

- 项目越复杂，影响就越严重

- 将DOM对比操作放在JS层，提高效率

# 使用vdom-snabbdom

vdom的如何使用，核心API是什么

[介绍snabbdom](https://github.com/snabbdom/snabbdom)

```js
var container = document.getElementById('container');

var vnode = h('div#container.two.classes', {on: {click: someFn}}, [
  h('span', {style: {fontWeight: 'bold'}}, 'This is bold'),
  ' and this is just normal text',
  h('a', {props: {href: '/foo'}}, 'I\'ll take you places!')
]);
// Patch into empty DOM element – this modifies the DOM as a side effect
patch(container, vnode);

var newVnode = h('div#container.two.classes', {on: {click: anotherEventHandler}}, [
  h('span', {style: {fontWeight: 'normal', fontStyle: 'italic'}}, 'This is now italic type'),
  ' and this is still just normal text',
  h('a', {props: {href: '/bar'}}, 'I\'ll take you places!')
]);
// Second `patch` invocation
patch(vnode, newVnode); // Snabbdom efficiently updates the old view to the new state
```

snabbdom 的核心函数是 h()、patch()

```js
<ul id="list">
	<li class="item">item1</li>
	<li class="item">item2</li>
</ul>
```
以上的dom结构可以用h函数这么表示
```js
var vnode = h('ul#list', {}, [
  h('li.item', {}, 'Item1'),
  h('li.item', {}, 'Item1')
])
```

## snabbdom实例

snabbdom实例1

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/snabbdom/0.7.1/snabbdom.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/snabbdom/0.7.1/snabbdom-class.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/snabbdom/0.7.1/snabbdom-props.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/snabbdom/0.7.1/snabbdom-style.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/snabbdom/0.7.1/snabbdom-eventlisteners.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/snabbdom/0.7.1/h.min.js"></script>

<div id="container"></div>
<button id="btn-change">change</button>
<script>  

var snabbdom = window.snabbdom;
var patch  = snabbdom.init([
    snabbdom_class,
    snabbdom_props,
    snabbdom_style,
    snabbdom_eventlisteners
  ])

var h = snabbdom.h;

var vnode = h('ul#list', {}, [
  h('li.item', {}, 'Item1'),
  h('li.item', {}, 'Item2')
]);
var container = document.getElementById('container');
patch(container,vnode);

var btnChange = document.getElementById('btn-change');
btnChange.addEventListener('click', function() {
  var newVnode = h('ul#list', {}, [
      h('li.item', {}, 'Item1'),
      h('li.item', {}, 'Item2'),
      h('li.item', {}, 'Item3')
  ]);
  patch(vnode,newVnode)
})
</script>
</body>
</html>
```

snabbdom实例2

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/snabbdom/0.7.1/snabbdom.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/snabbdom/0.7.1/snabbdom-class.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/snabbdom/0.7.1/snabbdom-props.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/snabbdom/0.7.1/snabbdom-style.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/snabbdom/0.7.1/snabbdom-eventlisteners.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/snabbdom/0.7.1/h.min.js"></script>

<div id="container"></div>
<button id="btn-change">change</button>
<script>  
var data = 
[
  {
    name: '张三',
    age: '20',
    address: '北京'
  },
  {
    name: '李四',
    age: '21',
    address: '上海'
  },
  {
    name: '王五',
    age: '22',
    address: '广州'
  }
] 
data.unshift({
  name: '姓名',
  age: '年龄',
  address: '地址'
});

var snabbdom = window.snabbdom;
var patch  = snabbdom.init([
    snabbdom_class,
    snabbdom_props,
    snabbdom_style,
    snabbdom_eventlisteners
  ])

var h = snabbdom.h;

var vnode;
var container = document.getElementById('container');

function render(data){
  var newVnode = h('table', {}, data.map(function(item) {
    var tds = [];
    var i;
    for(i in item) {
      if (item.hasOwnProperty(i)) {
        tds.push(h('td', {}, item[i] + ''))
      }
    }
    return h('tr', {}, tds)
  }))
  if (vnode) {
    patch(vnode,newVnode)
  } else {
    patch(container,newVnode)
  }
  vnode = newVnode
}
render(data);

var btnChange = document.getElementById('btn-change');
btnChange.addEventListener('click', function() {
      data[1].age = 30;
      data[2].address = '深圳',
      render(data)
    })

</script>
</body>
</html>
```

## 使用vdom-总结

核心API

- h('<标签名>',{...属性...}, [...子元素...])

- h('<标签名>',{...属性...}, '...')

- patch(container, vnode)

- patch(vnode, newVnode)

# Diff算法 

To be built

# 更多-more

[揭秘一线互联网企业 前端JavaScript高级面试](https://coding.imooc.com/learn/list/190.html)

