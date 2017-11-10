---
layout: post
title: js继承
tags:
- 原型链
categories: JS
description: js继承
---

# 原型链继承-Prototype chain

借助原型链实现继承, 引起`引用类型的原型属性会被所有实例共享`

```js
function Parent2() {
	this.name = 'parent2';
}

Parent2.prototype.say = function() {
	alert(this.name);
}

function Child2() {
	this.type = 'child2';
}

Child2.prototype = new Parent2();  // 缺点是父类构造函数执行两次

console.log(new Child2().say())
```

# 借助构造函数继承-constructed function

借助构造函数实现继承,`子类不能继承父类prototype上的方法`

```js

function Parent1() {
	this.name = 'parent1';
}
Parent1.prototype.say = function() {
	alert(this.name);
}

function Child1() {
	this.type = 'child1';
	Parent1.call(this);
}

console.log(new Child1());
```

# 组合继承-combination

```js
function Parent3() {
	this.name = 'parent3';
	this.play = [1, 2, 3];
}

Parent3.prototype.say = function() {
	alert(this.name);
}

function Child3() {
	this.type = 'child3';
	Parent3.call(this);
}

Child3.prototype = new Parent3();

var s3 = new Child3();
var s4 = new Child3();

s3.play.push(4);

console.log(s3.play, s4.play)
```

## 组合继承优化-optimize

`Child.prototype = Parent.prototype`

```js
// 组合继承，优化1
function Parent4() {
	this.name = 'parent4';
	this.play = [1, 2, 3];
}

Parent4.prototype.say = function() {
	alert(this.name);
}

function Child4() {
	this.type = 'child4';
	Parent4.call(this);
}

Child4.prototype = Parent4.prototype;  // 缺点是，子类指向的构造函数与父类是一个
// Child4.prototype.constructor = Parent4;  // 这样无法区分父类的原型对象了

var s5 = new Child4();
var s6 = new Child4();

console.log(s5, s6);

console.log(s5 instanceof Child4,s5 instanceof Parent4);  // true, true
console.log(s5.constructor)  // Parent4
```

##  组合继承优化2-optimize

`Child.prototype = Object.create(Parent.prototype)`

```js
function Parent5() {
	this.name = 'parent5';
	this.play = [1, 2, 3];
}

function Child5() {
	this.type = 'child5';
	Parent5.call(this);
}

Child5.prototype = Object.create(Parent5.prototype);
Child5.prototype.constructor = Child5;

var s7 = new Child5();

console.log(s7 instanceof Child5, s7 instanceof Parent5); // true, true
console.log(s7.constructor);  // Child5
```

# 使用 class 关键字

```js
class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

class Square extends Polygon {
  constructor(sideLength) {
    super(sideLength, sideLength);
  }
  get area() {
    return this.height * this.width;
  }
  set sideLength(newLength) {
    this.height = newLength;
    this.width = newLength;
  }
}

var square = new Square(2);
```

# 写一个贴近实际开发原型链继承的例子-demo

写一个封装DOM查询的例子

```js
function Elem(id) {
	this.elem = document.getElementById(id);
}
Elem.prototype.html = function(val) {
  var elem = this.elem;
  if (val) {
  	elem.innerHTML = val;
  	console.log(this)
  	return this; // 链式操作
  } else {
  	return elem.innerHTML;
  }
}
Elem.prototype.on = function(type, fn) {
	var elem = this.elem;
	if(elem.addEventListener) {
		elem.addEventListener('type', fn, false);
	} else if(elem.attachEvent) {
		elem.attachEvent('on' + type, fn);
	} else {
		elem['on' + type] = fn;
	}
    return this;
}

var div1 = new Elem('div1');
div1.html('有');
div1.on('click', alert('click')).html('youyi');
```

# 更多-more
[mozilla.org/Inheritance_and_the_prototype_chain](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
