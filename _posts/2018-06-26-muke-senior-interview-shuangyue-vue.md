---
layout: post
title: 慕课网-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第6章 MVVM 和 vue
tags:
- Interview
- imooc
- vue
categories: JS
description: 慕课网-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第6章 MVVM 和 vue
---

慕课网学习笔记-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第6章 MVVM 和 vue

# MVVM 和 vue

- 说一下使用jQuery和使用框架的区别

- 说一下对MVVM的理解 

- 如何实现MVVM 

- vue中如何实现响应式

- vue中如何解析模板

- vue的整个实现流程

# 从jQuery到框架

jQuery实现todo-list

vue实现todo-list

jquery和框架的区别

## jQuery实现todo-list

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>
    <input type="text" name="" id="txt-title">
	<button id="btn-submit">submit</button>
    <ul id="ul-list"></ul>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>  
  var $txtTitle = $('#txt-title');
  var $ulList = $('#ul-list');
  var $btnSubmit = $('#btn-submit');
  $btnSubmit.click(function() {
    var title = $txtTitle.val();
    var $li = $('<li>' + title + '</li>');
    $ulList.append($li);
    $txtTitle.val('')
  })
</script>
</body>
</html>
```

## vue实现todo-list

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>
<div id="app">
  <input v-model="title">
  <button v-on:click="add">submit</button>
  <ul>
    <li v-for="item in list">{{item}}</li>
  </ul>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.16/vue.min.js"></script>
<script>  
var vm = new Vue({
  el: '#app',
  data: {
    title: '',
    list: []
  },
  methods: {
    add: function() {
      this.list.push(this.title);
      this.title = ''
    }
  }
})
</script>
</body>
</html>
```

## jquery和框架的区别

- 数据和视图的分离

- 以数据驱动视图

jQuery 数据和视图没有分开，直接操作DOM

vue 数据和视图分开，解耦（开放封闭原则）

vue 以数据驱动视图，只关心数据变化，DOM操作被封闭

# MVVM

[MVVM - MVC](http://pengyouyi.site/js/2016/09/21/MVC&MVVM)

# Vue三要素

MVVM 框架的三大要素

- 响应式：vue如何监听到data的每个属性变化？

- 模板引擎：vue的模板如何被解析，指令如何处理？

- 渲染：vue的模板如何被渲染成HTML？以及渲染过程


# 响应式-responsive-mode

vue中如何实现响应式

- 什么是响应式

- Object.defineProperty(obj,key,{get: fn,set: fn})

- 模拟

## 响应式-introduce

**什么是响应式？**
 
- 修改data属性之后，vue立刻监听到

- data属性被代理到vm上

```js
var vm = new Vue({
  el: '#app',
  data: {
    name: '张三',
    age: 20
  }
})
```

在页面上修改 vm.name = '李四' 就有效果

data里面的属性怎么代理到vm上的

## 响应式-defineProperty演示

Object.defineProperty

```js
var obj = {
  name: 'zhangsan',
  age: 25
}
console.log(obj.name); // 获取属性的时候，如何监听到
obj.age = 26; // 赋值属性的时候，如何监听到
```

**使用 Object.defineProperty(obj, shuxing, {})**

```js
var obj ={};
var name = 'zhangsan';
Object.defineProperty(obj, 'name', {
  get: function() {
    console.log('get');
    return name
  },
  set: function(newVal) {
    console.log('set');
    name = newVal;
  }
});
console.log(obj.name); // 可以监听到
obj.name = 'lisi'; // 可以监听到
```

## 响应式模拟-imitate

```js
var vm ={};
var data = {
    name: '张三',
    age: 20
};
for(var key in data) {

  (function(key) {
    Object.defineProperty(vm, key, {
      get: function() {
        console.log('get');
        return data[key]
      },
      set: function(newVal) {
        console.log('set');
        data[key] = newVal;
      }
    });
  })(key)
}
console.log(vm.name); // 可以监听到
vm.name = 'lisi'; // 可以监听到
```

# 模板引擎-template-engine

## 模板解析begin

模板是什么

render函数

render函数与vdom

## 模板是什么what

- 本质：字符串

- 有逻辑，如 v-if v-for 等

- 与HTML格式很像，但有很大区别

- 最终还是要转换为HTML来显示


*模板最终必须转换成JS代码，因为：*

1. 有逻辑（v-if v-for），必须用JS才能实现（图灵完备）

2. 转化为HTML渲染页面，必须用JS才能实现

3. 因此，模板最重要转换成一个JS函数（render）


```js
<div id="app">
  <input v-model="title">
  <button v-on:click="add">submit</button>
  <ul>
    <li v-for="item in list">{{item}}</li>
  </ul>
</div>
```

#  渲染-render函数

## render函数-with的用法

```js
var obj = {
  name: 'zhangsan',
  age: 20,
  getAddress: function() {
    alert('beijing')
  }
}
// 不用with
function fn() {
  alert(obj.name);
  alert(obj.age);
  obj.getAddress()
}
fn()

// 使用with
function fn1() {
  with (obj) {
    alert(name)
    alert(age)
    getAddress()
  }
}
fn1()
```

## render函数-讲解1

```js
<div id="app">
  <p>{{name}}</p>
</div>
```

```js
with(this) {
  return _c(
    'div',
    {
      attrs: {"id": "app"}
    },
    [
      _c('p', [_v(_s(price))])
    ]
  )
}
```

- 模板中所有信息都包含在了render函数中

- this 即 vm

- price 即 this.price 即 vm.price, 即 data 中的 price

- _c 即 this._c 即 vm._c

## render函数-讲解2

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>test</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.16/vue.js"></script>
</head>
<body>
<div id="app">
  <p>{{name}}</p>
</div>

<script>  
var vm = new Vue({
  el: '#app',
  data: {
    name: '张三'
  }
})

// 以下是手写的PPT中的render函数
function render() {
  with(this) { // this 就是 vm
    return _c(
      'div',
      {
        attrs: {"id": "app"}
      },
      [
        _c('p', [_v(_s(price))])
      ]
    )
  }
}

// 不使用with
function render1() {
  return vm._c(
      'div',
      {
        attrs: {"id": "app"}
      },
      [
        vm._c('p', [vm._v(vm._s(vm.price))])
      ]
    )
}

</script>
</body>
</html>
```

## render函数-讲解3


从哪里可以看到render函数

复杂一点的例子，render函数是什么样子的？

v-if v-for v-on 都是怎么处理的


在源码中搜索code.render，并打印出来

```js
<div id="app">
  <input v-model="title">
  <button v-on:click="add">submit</button>
  <ul>
    <li v-for="item in list">{{item}}</li>
  </ul>
</div>
```

```js
with(this) {
    return _c('div', {
        attrs: {
            "id": "app"
        }
    },
    [_c('input', {
        directives: [{
            name: "model",
            rawName: "v-model",
            value: (title),
            expression: "title"
        }],
        domProps: {
            "value": (title)
        },
        on: {
            "input": function($event) {
                if ($event.target.composing) return;
                title = $event.target.value
            }
        }
    }), _v(" "), _c('button', {
        on: {
            "click": add
        }
    },
    [_v("submit")]), _v(" "), _c('ul', _l((list),
    function(item) {
        return _c('li', [_v(_s(item))])
    }))])
}
```

## render函数-讲解6

剩下模板生成HTML的问题

另外，vm._c是什么？ render函数返回了什么

- vm._c 其实就相当于snabbdom 中的h函数

- render函数执行之后，返回的是vnode

## render函数-讲解7

- updateComponent中实现了vdom 的patch

- 页面首次渲染执行updateComponent

- data中每次修改属性，执行updateComponent


```js
vm._update(vnode) {
	const prevVnode = vm._vnode;
	vm._vnode = vnode;
	if(!prevVnode) {
	  vm.$el = vm.__patch__(vm.$el,vnode)
	} else {
	  vm.$el = vm.__patch__(prevVnode, vnode)
	}
}

function updateComponent() {
	vm._update(vm.render())
}
```

## render总结

- 模板：字符串，有逻辑。嵌入JS变量

- 模板必须转换为JS代码（有逻辑、渲染HTML、JS变量）

- render函数是什么样子的

- render函数执行是返回vnode

- updateComponent

# vue整体流程

**vue的整个实现流程**

- 第一步：解析模板成render函数

- 第二步：响应式开始监听

- 第三步：首次渲染，显示页面，且绑定依赖

- 第四步：data属性变化，触发rerender


## 解析模板成render函数

- with的用法

- 模板中所有信息都被render函数包含

- 模板中用到的data中的属性，都变成了JS变量

- 模板中的v-model v-for v-on 都变成了JS逻辑

- render函数返回vnode


## 响应式开始监听-Monitor

- Object.defineProperty

- 将data的属性代理到vm上


## 首次渲染，显示页面，and绑定依赖

- 初次渲染，执行updateComponent，执行vm._render()

- 执行render函数，会访问到 vm.list 和 vm.title

- 会被响应式的get方法监听到

- 执行updateComponent，会走到vdom的patch方法

- patch将vnode渲染成DOM，初次渲染完成

```js
vm._update(vnode) {
	const prevVnode = vm._vnode;
	vm._vnode = vnode;
	if(!prevVnode) {
	  vm.$el = vm.__patch__(vm.$el,vnode)
	} else {
	  vm.$el = vm.__patch__(prevVnode, vnode)
	}
}

function updateComponent() {
	vm._update(vm.render())
}
```

*为何要监听GET，直接监听set不行吗？*

- data中有很多属性，有些被用到，有些可能不被用到

- 被用到的会走GET，不被用到的不会走GET

- 未走到GET中的属性，set的时候我们也无需关心

- 避免不必要的重复渲染

## data属性变化

- 修改属性，被响应式的set监听到

- set中执行updateComponent

- updateComponent重新执行vm._render()

- 生成vnode和prevVnode,通过patch进行对比

- 渲染到HTML中




# 更多-more

[揭秘一线互联网企业 前端JavaScript高级面试](https://coding.imooc.com/learn/list/190.html)

