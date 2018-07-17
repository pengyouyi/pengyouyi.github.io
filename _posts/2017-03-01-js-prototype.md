---
layout: post
title: js中的prototype和__proto__
tags:
- JS-Basic
categories: JS
description: js中的prototype和__proto__
---

# prototype的定义和用法

prototype 属性使您有能力向对象添加属性和方法。

```js
object.prototype.name=value
```

不是所有的对象都拥有prototype这一属性：

```js
var str1 = "hello";
console.log(str1.prototype) // undefined

var str2 = new String("test");
console.log(str2.prototype) // undefined

var obj = { };
console.log(obj.prototype) // undefined
```

我们在定义函数的时候，函数定义的时候函数本身就会默认有一个prototype的属性(还有一个length属性)，
而我们如果用new 运算符来生成一个对象的时候就没有prototype属性。
```js
function a(c){
    this.b = c;
}

console.log(a.prototype);// Object {} 或  Object { constructor: () , __proto__: Object }
console.log(typeof a.prototype);// object

var obj = new a('test');

console.log(obj.prototype);// undefined
console.log(typeof obj.prototype);// undefined
```


> 我们创建的每个函数都有一个 prototype（原型）属性，这个属性是一个指针，指向一个`对象`，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。

> 无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个prototype属性，这个属性指向函数的原型对象。

>在默认情况下，所有原型对象都会自动获得一个constructor（构造函数）属性，这个属性包含一个指向 prototype 属性所在函数的指针。

<div class="rd">
    <img src="/assets/images/2017/1-2-3/03-01-4.png" alt="">
</div>

**`prototype属性是函数所特有`**,准确来说是构造函数所特有。

## function.prototype
```js
function a(c){
    this.b = c;
}
```
**`a.prototype 包含了2个属性，一个是constructor ，另外一个是__proto__`**
<div class="rd">
    <img src="/assets/images/2017/1-2-3/03-01-1.png" alt="">
</div>

**`a.prototype.constructor` === a**
<div class="rd">
    <img src="/assets/images/2017/1-2-3/03-01-2.png" alt="">
</div>

**`a.prototype.__proto__` === Object.prototype**
<div class="rd">
    <img src="/assets/images/2017/1-2-3/03-01-3.png" alt="">
</div>

# \_\_proto\_\_

> 1.所有构造器/函数的\_\_proto\_\_都指向Function.prototype，它是一个空函数（Empty function）

> 2.所有对象的\_\_proto\_\_都指向其构造器的prototype

每个对象都会在其内部初始化一个属性，就是\_\_proto\_\_，当我们访问一个对象的属性 时，如果这个对象内部不存在这个属性，那么他就会去\_\_proto\_\_里找这个属性，这个\_\_proto\_\_又会有自己的\_\_proto\_\_，于是就这样 一直找下去。

<div class="rd">
    <img src="/assets/images/2017/1-2-3/03-01-5.png" alt="">
</div>

 \_\_proto\_\_:`每个对象都有一个名为__proto__的内部隐藏属性`，指向于它所对应的原型对象(chrome、firefox中名称为\_\_proto\_\_，并且可以被访问到)。原型链正是基于\_\_proto\_\_才得以形成(note：不是基于函数对象的属性prototype)。

 **Object.create(obj).\_\_proto\_\_ === obj**

 ```js
var a = {};
var a2 = Object.create(a);
a2.__proto__ === a;  // true
 ```

prototype本质上还是一个JavaScript对象。
```js
console.log(Array.prototype)
console.log(String.prototype)  // String {length: 0, [[PrimitiveValue]]: ""}
console.log(Object.prototype)  // Object {}
console.log(Number.prototype) // Number {[[PrimitiveValue]]: 0}
console.log(Boolean.prototype)
```
上述对数组操作的很多方法（比如concat、join、push），对字符串等的操作方法都是在prototype属性中定义的。 

```js
// 构造函数
function Person(name) {
    this.name = name;
}
// 定义Person的原型，原型中的属性可以被自定义对象引用
Person.prototype = {
    getName: function() {
        return this.name;
    }
}
var hao= new Person("haorooms");
console.log(hao.getName());  // "haorooms"
```
作为类比，我们考虑下JavaScript中的数据类型 - 字符串（String）、数字（Number）、数组（Array）、对象（Object）、日期（Date）等。

在JavaScript内部这些类型都是作为构造函数来实现的，比如：
```js
// 定义数组的构造函数，作为JavaScript的一种预定义类型
function Array() {
    // ...
}

// 初始化数组的实例
var arr1 = new Array(1, 56, 34, 12);
// 但是，我们更倾向于如下的语法定义：
var arr2 = [1, 56, 34, 12];
```

var a = {} 其实是 var a = new Object() 的语法糖
var a = [] 其实是 var a = new Array() 的语法糖
function Foo() {...} 其实是 var Foo = new Function(...)

```js
String.__proto__ === Function.prototype; // true
Number.__proto__ === Function.prototype; // true
Array.__proto__ === Function.prototype; // true
Object.__proto__ === Function.prototype; // true
Date.__proto__ === Function.prototype; // true
```

实际上，JavaScript所有的固有数据类型都具有只读的prototype属性 （这是可以理解的：因为如果修改了这些类型的prototype属性，则哪些预定义的方法就消失了）， 但是我们可以向其中添加自己的扩展方法。
```js
// 向JavaScript固有类型Array扩展一个获取最小值的方法
Array.prototype.min = function() {
    var min = this[0];
    for (var i = 1; i < this.length; i++) {
    if (this[i] < min) {
        min = this[i];
    }
    }
    return min;
};

// 在任意Array的实例上调用min方法
console.log([1, 56, 34, 12].min()); // 1
```

# 原型和原型链-rule

**原型和原型链的5个规则**

1. 所有的*引用类型*（数组、对象、函数），都具有**对象特性**，即可自由扩展属性（除了 'null' 意外）。    
2. 所有的`引用类型`（数组、对象、函数），都有一个 `__proto__` 属性【隐式原型】，属性值是一个普通的对象。  
3. 所有`函数`，都有一个`prototype` 属性【显式原型】，属性值也是一个普通的对象。  
4. 所有的`引用类型（数组、对象、函数） __proto__ 属性值指向它的构造函数的 “prototype” 属性值`  
5. 当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的 \_\_proto\_\_ （即它的构造函数的prototype）中寻找。  

 <div class="rd">
    <img src="/assets/images/2017/1-2-3/03-01-6.jpg" alt="">
</div>


# 更多-more
- [http://www.cnblogs.com/snandy/archive/2012/09/01/2664134.html](http://www.cnblogs.com/snandy/archive/2012/09/01/2664134.html)
- [http://www.imooc.com/article/3654](http://www.imooc.com/article/3654)

















