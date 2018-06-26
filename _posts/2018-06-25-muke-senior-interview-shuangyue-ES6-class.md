---
layout: post
title: 慕课网-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第2章 ES6 语法 - Class
tags:
- Interview
- imooc
- ES6
categories: JS
description: 慕课网-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第2章 ES6 语法 - Class
---

慕课网学习笔记-前端跳槽面试必备技巧（快乐动起来呀）- 第2章 ES6 语法 - Class

# Class和普通构造函数有何区别

[Class 的基本语法](http://es6.ruanyifeng.com/#docs/class)

- js构造函数

- class基本语法

- 语法糖

- 继承

# JS构造函数

```js
function MathHandle(x, y) {
  this.x = x;
  this.y = y;
}

MathHandle.prototype.add = function() {
  return this.x + this.y;
}

var m = new MathHandle(1, 2);
console.log(m.add())
```

# Class-基本语法

```js
class MathHandle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add() {
    return this.x + this.y;
  }
}

const m = new MathHandle(1, 2);
console.log(m.add())
```

“类”的方法之间不需要逗号分隔，加了会报错。

this关键字代表实例对象

## Class语法糖

```js
calss MathHandle {

}

typeof MathHandle // function
MathHandle === MathHandle.prototype.constructor // true
m.__proto__ === MathHandle.prototype //true
```

## Class的constructor 方法

constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。

一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。

```js
class Point {
}

// 等同于
class Point {
  constructor() {}
}
```

## Class的prototype属性

类的所有方法都定义在类的prototype属性上面。

```js
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
```

# Class与构造函数的区别

❶ 类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。

❷ 类不存在变量提升（hoist），这一点与 ES5 完全不同。

❸ 类的内部所有定义的方法，都是不可枚举的（non-enumerable）。这一点与 ES5 的行为不一致。

⓵
```js
class Point {
  // ...
}

// 报错
var point = Point(2, 3);

// 正确
var point = new Point(2, 3);
```
⓶
```js
new Foo(); // ReferenceError
class Foo {}
```
⓷
```js
class Point {
  constructor(x, y) {
    // ...
  }

  toString() {
    // ...
  }
}

Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```

```js
var Point = function (x, y) {
  // ...
};

Point.prototype.toString = function() {
  // ...
};

Object.keys(Point.prototype)
// ["toString"]
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```

[构造函数是否有new的区别](https://blog.csdn.net/juzipchy/article/details/55508328)

# 继承-JS

[Class 的继承](http://es6.ruanyifeng.com/#docs/class-extends)

```js
// 动物
function Animal() {
  this.eat = function(){
    console.log('animal eat')
  }
}
// 狗
function Dog() {
  this.bark = function(){
    console.log('dog bark')
  }
}

Dog.prototype = new Animal();
var hashiqi = new Dog();
hashiqi.eat();
```

# 继承-Class 
```js
class Animal {
  constructor(name){
    this.name = name;
  }
  eat(){
    console.log(`${this.name} eat`);
  }
}

class Dog extends Animal{
  constructor(name) {
    super(name);  
    this.name = name;
  }
  say() {
    console.log(`${this.name} say`)
  }
}

const dog = new Dog('hashiqi');
dog.eat();
dog.say();
```

super(name);有extends时，它是必须写的。

将Dog的name传给Animal的constructor(name)

## Object.getPrototypeOf()

```js
Object.getPrototypeOf(Child) === Parent
// true
```

可以使用这个方法判断，一个类是否继承了另一个类。


## super 关键字

❶ super作为函数调用时，代表父类的构造函数。

```js
class A {}

class B extends A {
  constructor() {
    super();
  }
}
```

super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B，因此super()在这里相当于A.prototype.constructor.call(this)。

❷ super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

```js
class A {
  p() {
    return 2;
  }
}

class B extends A {
  constructor() {
    super();
    console.log(super.p()); // 2
  }
}

let b = new B();
```

super在普通方法之中，指向A.prototype，所以super.p()就相当于A.prototype.p()。

# Class-summary

**Class和普通构造函数有何区别?**

- class在语法上更加贴合面向对象的写法
- class实现继承更加易读、易理解
- 更易于写Java等后端语言的使用
- 本质还是语法糖，使用 prototype


# 更多-more

[揭秘一线互联网企业 前端JavaScript高级面试](https://coding.imooc.com/learn/list/190.html)

[ECMAScript 6 入门-阮一峰](http://es6.ruanyifeng.com/)

