---
layout: post
title: js显示类型转换&隐式类型转换
tags:
- JS-Basic 
categories: JS
description: js显示类型转换&隐式类型转换
---

# 数据类型data-type

7种数据类型

**原始类型：**

Undefined、Null、Boolean、String、Number、Symbol、

**对象：**

Object

# 显式类型转换-Explicit

js高程p26~p34

## Boolean函数

> Boolean()

> !!

天生为假值的有：`undefined`、`null`、`0`、`NaN`、`""`

[js显示、隐式转为布尔值](http://pengyouyi.site/js/2017/03/30/js-toBoolean)

## Number函数

有3个函数可以把非数值转换为数值：Number()、parseInt()、parseFloat()

> Number()可以用于任何数据类型

> parseInt()、parseFloat() 专门用于把字符串转换成数值

### **Number()转换规则**

**❀ 原始类型转换**

- 数值：转换后还是原来的值
- 布尔值：true转成1, false转成0
- null: 转成0
- undefined: 转成 NaN
- 字符串：如果可以被解析为数值，则转换为相应的数值，否则得到NaN。空字符串转为0。

**❀ 对象类型转换**

❶ 先调用对象的valueOf()方法，如果该方法返回原始类型的值（数值、字符串、布尔），则直接对该值使用Number()方法，不再进行后续步骤。

❷ 如果valueOf()方法返回复合类型的值，再调用对象自身的toString()方法，如果toString()方法返回原始类型的值，则对该值使用Number()方法，不再进行后续步骤。

❸ 如果toString()方法返回的是复合类型的值，则报错。


### **parseInt()转换规则**

Number()函数在转换字符串时比较复杂而且不够合理，因此在处理整数的时候更常用的是parseInt()函数。

❶ parseInt()在转换字符串时，更多的是看其是否符合数值模式。它会忽略字符串前面的空格，直到找到第一个非空格字符。

❷ 如果第一个字符不是数字字符或者负号，parseInt()就会返回NaN。比如：parseInt('')返回NaN

❸ 如果第一个字符是数字字符，parseInt()会继续解析第二个字符，直到解析完所有的后续字符或者遇到了一个非数字字符。

```js
Number('') // 0
parseInt('')  // NaN

parseInt(22.5)  // 22
```

**Number()和parseInt()的区别**

> Number函数比parseInt函数转换更为严格，只有纯数字形式的字符串才能被转换成数字，否则为NaN

```js
Number("1234blue");  // NaN
parseInt("1234blue")  // 1234
```

parseInt()在解析八进制字面量的字符串【字符串以“0”开头且后跟数字字符】时，ECMAScript 3 和 5存在分歧。

```js
parseInt('070')  // ECMAScript 3 认为是 56【八进制】
parseInt('070')  // ECMAScript 5 认为是 70 十进制】
```

因此推荐parseInt()无论在什么情况下都应明确指定基数

```js
parseInt('0xA')  // 10
parseInt('10', 2)  // 2
parseInt('10', 8)  // 8
parseInt('10', 10) // 10
parseInt('10', 16) // 16
```

[parseInt(string, radix)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)

ES6推荐小写的`0b`二进制、`0o`八进制、`0x`十六进制

### **parseFloat()转换规则**

❶ parseFloat() 也会忽略字符串前面的空格。

❷ 一直解析到字符串末尾，或者解析到遇见一个无效的浮点数字字符为止。i.e.字符串的第一个小数点是有效的，而第二个小数点就是无效的了。

**parseInt() 和parseFloat()的区别**

- parseFloat()只解析十进制值，因此它没有第二个参数指定基数

- parseFloat()始终都会忽略前导的零，而不会像Number()可能转换成八进制数。但十六进制格式的字符串则始终被转换成0.

```js
parseFloat('1234blue')  // 1234
parseFloat('0xA')  // 0
parseFloat('22.5')  // 22.5
parseFloat('22.34.5')  // 22.34
parseFloat('070')  // 70
```

[parseFloat(value)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat)

## String函数

> String() 能将任何类型的值转换为字符串

> toString() 数值、布尔值、对象和字符串值都有toString() 方法。但是null和undefined值没有这个方法。

### **String()转换规则**

**❀ 原始类型转换**

- 数值：转为相应的字符串
- 字符串：返回字符串的一个副本，还是原来的值
- 布尔：true转为"true",false转为"false"
- undefined: 转为"undefined"
- null: 转为"null"

**❀ 对象类型转换**

❶ 先调用toString()方法，如果toString方法返回的是原始类型的值，则对该值使用String()方法，不再进行以下步骤。

❷ 如果toString()方法返回的是复合类型的值，再调用valueOf()方法，如果valueOf()方法返回的是原始类型的值，则对该值使用String()方法，不再进行以下步骤。

❸ 如果valueOf()方法返回的是复合类型的值，则报错。

```js
String([]);  // ""
String([1,2]);  // "1,2"
String({a:2});  // "[object Object]"
```

# 隐式类型转换-Implicit

✯ 四则运算

✯ 判断语句

✯ Native调用（console.log、alert自动转换成字符串类型）

**常见题目**

```js
[] + []  // ""

[] + {}  // "[object Object]"

{} + [] == + []  // 0,{}被当做代码块，不执行

{} + {}  // chrome:"[object Object][object Object]"  ; firefox: NaN

true + true  // 2

1 + {a: 1} // "1[object Object]"
```

(https://segmentfault.com/a/1190000008038678)

 

# 更多-more

