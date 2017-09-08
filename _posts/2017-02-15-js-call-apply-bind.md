---
layout: post
title: js中的call 、apply 、bind
tags:
- js函数
categories: JS
description: js中的call 、apply 、bind
---

# call/apply/bind方法的来源
call，apply，bind这三个方法其实都是继承自Function.prototype中的，属于实例方法。

```js
console.log(Function.prototype.hasOwnProperty('call')) //true
console.log(Function.prototype.hasOwnProperty('apply')) //true
console.log(Function.prototype.hasOwnProperty('bind')) //true
```
上面代码中，都返回了true，表明三种方法都是继承自Function.prototype的。当然，普通的对象，函数，数组都继承了Function.prototype对象中的三个方法，所以这三个方法都可以在对象，数组，函数中使用。

# apply、call 
在 javascript 中，call 和 apply 都是为了改变某个函数运行时的上下文（context）而存在的，换句话说，就是为了改变函数体内部 this 的指向。

- call() 方法在使用一个指定的this值和若干个指定的参数值的前提下调用某个函数或方法.

语法：
```js
fun.call(thisArg[, arg1[, arg2[, ...]]])
```

- apply() 方法在指定 this 值和参数（参数以数组或类数组对象的形式存在）的情况下调用某个函数。

语法：
```js
fun.apply(thisArg[, argsArray])
```

# apply、call 的区别
对于 apply、call 二者而言，作用完全一样，只是接受参数的方式不太一样。  
call()方法接受的是若干个参数的列表，而apply()方法接受的是一个包含多个参数的数组。

```js
var func = function(arg1, arg2) {
     
};
```
通过如下方式来调用：
```js
func.call(this, arg1, arg2);
func.apply(this, [arg1, arg2])
```
当你的参数是明确知道数量时用 call ，而不确定的时候用 apply，然后把参数 push 进数组传递进去。当参数数量不确定时，函数内部也可以通过 arguments 这个伪数组来遍历所有的参数。

## 使用call方法调用函数并且指定上下文的'this'

```js
function fruits() {}
  
fruits.prototype = {
    color: "red",
    say: function() {
        console.log("My color is " + this.color);
    }
}
  
var apple = new fruits;
apple.say();    //My color is red
```

使用call 和 apply 改变 this 指向
```js
banana = {
    color: "yellow"
}
apple.say.call(banana);     //My color is yellow
apple.say.apply(banana);    //My color is yellow
```

## 使用call方法调用父构造函数
在一个子构造函数中，你可以通过调用父构造函数的 call 方法来实现继承，。下例中，使用 Food 构造函数创建的对象实例都会拥有在 Product 构造函数中添加的 name 属性和 price 属性,但 category 属性是在Food构造函数中定义的。

```js
function Product(name, price) {
  this.name = name;
  this.price = price;

  if (price < 0) {
    throw RangeError('Cannot create product ' +
                      this.name + ' with a negative price');
  }
}

function Food(name, price) {
  Product.call(this, name, price); 
  this.category = 'food';
}

//等同于
function Food(name, price) { 
    this.name = name;
    this.price = price;
    if (price < 0) {
        throw RangeError('Cannot create product ' +
                this.name + ' with a negative price');
    }

    this.category = 'food'; 
}
var cheese = new Food('feta', 5);
```

## 使用call方法调用匿名函数

```js
var animals = [
  {species: 'Lion', name: 'King'},
  {species: 'Whale', name: 'Fail'}
];

for (var i = 0; i < animals.length; i++) {
  (function (i) { 
    this.print = function () { 
      console.log('#' + i  + ' ' + this.species + ': ' + this.name); 
    } 
    this.print();
  }).call(animals[i], i);
}

result:
#0 Lion: King
VM695:9 #1 Whale: Fail
```

# apply、call 的常见使用

## Array之间追加
```js
var array1 = [12 , "foo" , {name "Joe"} , -2458]; 
var array2 = ["Doe" , 555 , 100]; 
Array.prototype.push.apply(array1, array2); 
/* array1 值为  [12 , "foo" , {name "Joe"} , -2458 , "Doe" , 555 , 100] */
```

## 获取Array中的最大值和最小值
```js
var  numbers = [5, 458 , 120 , -215 ]; 
var maxInNumbers = Math.max.apply(Math, numbers),   //458
    maxInNumbers = Math.max.call(Math,5, 458 , 120 , -215); //458
```
number 本身没有 max 方法，但是 Math 有，我们就可以借助 call 或者 apply 使用其方法。

## 验证是否是数组（前提是toString()方法没有被重写过）
```js
functionisArray(obj){ 
    return Object.prototype.toString.call(obj) === '[object Array]' ;
}
```

## 类（伪）数组使用Array方法
```js
var domNodes = Array.prototype.slice.call(document.getElementsByTagName("*"));
```
# notice
如果call和apply的第一个参数写的是null，那么this指向的是window对象

# bind()

- bind()方法会创建一个新函数。当这个新函数被调用时，bind()的第一个参数将作为它运行时的 this, 之后的一序列参数将会在传递的实参前传入作为它的参数。

语法：
```js
fun.bind(thisArg[, arg1[, arg2[, ...]]])
```

## 创建绑定函数bind
```js
his.x = 9; 
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 返回 81

var retrieveX = module.getX;
retrieveX(); // 返回 9, 在这种情况下，"this"指向全局作用域

// 创建一个新函数，将"this"绑定到module对象
// 新手可能会被全局的x变量和module里的属性x所迷惑
var boundGetX = retrieveX.bind(module);
boundGetX(); // 返回 81
```

## bind()的优雅使用
在常见的单体模式中，通常我们会使用 _this , that , self 等保存 this
```js
var foo = {
    bar : 1,
    eventBind: function(){
        var _this = this;
        $('.someClass').on('click',function(event) {
            /* Act on the event */
            console.log(_this.bar);     //1
        });
    }
}
```

使用 bind() 可以更加优雅的解决这个问题：

```js
var foo = {
    bar : 1,
    eventBind: function(){
        $('.someClass').on('click',function(event) {
            /* Act on the event */
            console.log(this.bar);      //1
        }.bind(this));
    }
}
```
## 多次调用bind()

```js
var bar = function(){
    console.log(this.x);
}
var foo = {
    x:3
}
var sed = {
    x:4
}
var func = bar.bind(foo).bind(sed);
func(); //?
 
var fiv = {
    x:5
}
var func = bar.bind(foo).bind(sed).bind(fiv);
func(); //?
```

答案是，两次都仍将输出 3 ，而非期待中的 4 和 5 。原因是，在Javascript中，多次 bind() 是无效的。更深层次的原因， bind() 的实现，相当于使用函数在内部包了一个 call / apply ，第二次 bind() 相当于再包住第一次 bind() ,故第二次以后的 bind 是无法生效的。

## Polyfill（兼容旧浏览器）

bind 函数在 ECMA-262 第五版才被加入；它可能无法在所有浏览器上运行。你可以部份地在脚本开头加入以下代码，就能使它运作，让不支持的浏览器也能使用 bind() 功能。

```js
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP
                                 ? this
                                 : oThis || this,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
```

# apply、call、bind比较

```js
var obj = {
    x: 81,
};
  
var foo = {
    getX: function() {
        return this.x;
    }
}
  
console.log(foo.getX.bind(obj)());  //81
console.log(foo.getX.call(obj));    //81
console.log(foo.getX.apply(obj));   //81
```

当你希望改变上下文环境之后并非立即执行，而是回调执行的时候，使用 bind() 方法。而 apply/call 则会立即执行函数。

# Summary
apply 、 call 、bind 三者都是用来改变函数的this对象的指向的；  
apply 、 call 、bind 三者第一个参数都是this要指向的对象，也就是想指定的上下文；  
apply 、 call 、bind 三者都可以利用后续参数传参；  
bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。

# 更多-more
- [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
- [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)








































