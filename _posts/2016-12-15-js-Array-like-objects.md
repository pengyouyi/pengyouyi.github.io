---
layout: post
title: js中的伪数组
tags:
- JS-Basic
categories: JS
description: js中的伪数组
---

# js中的伪数组

## 原始数据-primitive data
原始数据 （原始值、原始数据类型）不是一种 object 类型并且没有自己的方法的。  
在 JavaScript 中，有六种原始数据类型：string，number，boolean，null，undefined，symbol (new in ECMAScript 2015)。

除此之外其他所有的都是对象，包括函数(Function)  
引用数据类型：Object(Array,Date,RegExp,Function)

所有的原始数据都是不变的（即不能被改变）。

## JavaScript 中的原始值会包装为对象
除了 null 和 undefined，所有的原始值都可以有等价的、由对象包装原始值的形式表达：

- String for the string primitive.
- Number for the number primitive.
- Boolean for the Boolean primitive.
- Symbol for the Symbol primitive.

这个包裹对象的 valueOf() 方法返回原始值。
# what is Array-like objects
定义：

1、拥有length属性；  
2、按索引方式存储数据，也即其它属性（索引）为非负整数(对象中的索引会被当做字符串来处理，这里你可以当做是个非负整数串来理解)；  
3、不具有数组所具有的方法,如push()、pop()等方法。但仍可以对真正数组遍历方法来遍历它们。

伪数组，就是像数组一样有 length 属性，也有 0、1、2、3 等属性的对象，看起来就像数组一样，但不是数组，比如

```js
var fakeArray = {
    length: 3,
    "0": "first",
    "1": "second",
    "2": "third"
};
 
for (var i = 0; i < fakeArray.length; i++) {
    console.log(fakeArray[i]);
}
 
// console.log(Array.prototype.join.call(fakeArray,'+'));
```

伪数组是一个 Object，而真实的数组是一个 Array。

```js
fakeArray instanceof Array === false;
Object.prototype.toString.call(fakeArray) === "[object Object]";
 
var arr = [1,2,3,4,6];
arr instanceof Array === true;
Object.prototype.toString.call(arr) === "[object Array]"
```

《javascript权威指南》上给出了代码用来判断一个对象是否属于“类数组”。如下：
{% highlight js linenos %}
// 判断o是否是一个类数组对象.
// 字符串和函数有length属性，但是它们
// 可以用typeof检测将其排除。在客户端JavaScript中，DOM文本节点
// 也有length属性，需要用额外判断o.nodeType != 3 将其排除
function isArrayLike(o) {   
    if (o &&                                // o 非null、undefined 等
            typeof o === 'object' &&              // o 是对象
            isFinite(o.length) &&                 // o.length 是有限数值
            o.length >= 0 &&                      // o.length 非负数
            o.length === Math.floor(o.length) &&  // o.length 是整数
            o.length < 4294967296)                // o.length < 2^32
            return true;                          // o是类数组对象
    else
            return false;                       // 否则它不是
}
{% endhighlight %}

更简单的办法来判断，用 Array.isArray

```js
Array.isArray(fakeArray) === false;
Array.isArray(arr) === true;
```

# Common array-like object

- function内的arguments对象

```js
(function() {
  console.log(typeof arguments); // 输出 object，它并不是一个数组
}());
```

- 调用 getElementsByTagName ，document.childNodes之类 获得的元素集合（NodeList）

```js
console.log(typeof document.body.childNodes); // 输出 object
```


# Converting an array-like object to an array
```js
var fakeArray01 = {0:'a',1:'b',length:2};//这是一个标准的有伪数组对象 

var arr01 = Array.prototype.slice.call(fakeArray01); 
//var arr01 = Array.prototype.slice.call(fakeArray01,0);  也可
console.log(arr01[0]);//a 

var arr02 = [].slice.call(fakeArray01); 
console.log(arr02[0]);//a 
```

slice 可以用来获取数组片段，它返回新数组，不会修改原数组。 

fakeArray01被成功的转换成了Array对象。通过[].slice.call这种形式实现同样的效果,但以prototype的形式执行程序效率更高，同样代码也更加优美。 

# slice
```js
var fakeArray01 = {a:'a',b:'b',length:2};//没有length下标对应的值 

var arr01 = Array.prototype.slice.call(fakeArray01); 
alert(arr01[0]);//undefined 


var fakeArray02 = {0:'a',1:'b',length:'num'};//length不是数值 

var arr02 = Array.prototype.slice.call(fakeArray02); 
alert(arr02[1]);//undefined 
```

同样fakeArray01和fakeArray02被转换成了真正的数组，但是数组中的值都为undefined 
查看 V8 引擎 array.js  的源码，可以将 slice 的内部实现简化为： 

```js
function slice(start, end) { 
var len = ToUint32(this.length), result = []; 
for(var i = start; i < end; i++) { 
  result.push(this[i]); 
} 
return result; 
}
```

可以看出，slice 并不需要 this 为 array 类型，只需要有 length 属性即可。并且 length 属性可以不为 number 类型，当不能转换为数值时，ToUnit32(this.length) 返回 0. 

根据以上结论可以得出：fakeArray01被转换成了lenth为2的数组，其值都被初始化为undefined,fakeArray02被转换成了length为0的数组，自然访问下标为1的元素返回undefined 

# IE的问题
针对于标准浏览器slice实现已经可以解释所有的问题，但是IE在处理NodeList时出现了问题。IE中无法将NodeList转换为真正的数组，会出错。这又是为什么呢？严格说，在IE内部定义了一个抽象类Arraioid，Array和Arguments都继承与此，所以可以用slice。但DOM对象是通过COM接入到JScript的，slice检测的时候失效。
```js
// 伪数组转化成数组
var makeArray = function(obj) {   
    var arr = [];
    try {
        arr = Array.prototype.slice.call(obj);
        return arr;
    }
    catch (e) {
        var length = obj.length;
        if (!length) return false;
        for (var i = 0; i < length; i++) {
            arr.push(obj[i]);
        }

        return arr;
    }
};
```

# demo
```js
var fakeArray = {
    length: 3,
    "0": "first",
    //"1": "second",
    "2": "third",
    "3": "four",
    "five": "five"
};
console.log(isArrayLike(fakeArray));  // true

var arr01 = Array.prototype.slice.call(fakeArray,0);

console.log(Array.isArray(arr01));  // true

console.log(arr01);  // ["first", 2: "third"]
console.log(arr01[0]);  // five
console.log(arr01[1]);  // undefined
console.log(arr01[2]);  // third
console.log(arr01[3]);  // undefined
```

```js
var fakeArray = {
    length: "num",
    "0": "first",
    "1": "second"
};
console.log(isArrayLike(fakeArray)); // false

var arr01 = Array.prototype.slice.call(fakeArray,0);
console.log(Array.isArray(arr01)); // ture
console.log(arr01); // []
```

# Jquery与伪数组

[http://www.cnblogs.com/fool/archive/2010/10/09/1846966.html](http://www.cnblogs.com/fool/archive/2010/10/09/1846966.html)














































