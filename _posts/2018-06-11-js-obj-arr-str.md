---
layout: post
title: JavaScript原生对象常用方法总结
tags:
- Interview
categories: JS
description: JavaScript原生对象常用方法总结
---

# Array

Array属性：

- Array.length

Array方法：

- Array.isArray()  检测数组

转换方法：

- Array.join()  数组转换成字符串

栈方法：

- Array.pop()  移除数组末尾的元素

- Array.push()  数组末尾添加元素

队列方法：

- Array.shift()  数组前端移除项

- Array.unshift()  数组前端添加项

> 栈方法、队列方法操作的是原数组对象，不会创建副本

重排序方法：

- Array.reverse()  反转数组项的顺序

- Array.sort()  字符串按英文字母的ASC码升序排列；

- Array.sort(fn); -1，数字从小到大排列 ，1，数字降序排列

操作方法：

- Array.concat()  连接，创建新数组，原数组不变

- Array.slice(start,end)  复制从start到end位置的新数组，原数组不变

- Array.splice(start,deleteCount,newItem1)    最强大的数组方法，可以删除、插入、替换，当然会修改原数组

位置方法：

- Array.indexOf(searchElement,fromIndex
)  查找项在数组中的位置	。

- Array.lastIndexOf()

> 迭代方法：

-	Array.some()  该函数对任一项返回true，则返回true

- Array.every()  该函数对每一项都返回true，才返回true

- Array.map()  返回新数组

- 	Array.forEach()  对数组中的每一项运行给定函数，没有返回值

- 	Array.filter()  返回true的项组成的数组

迭代方法都不能改变原数组的值

归并方法：

- Array.reduce()

- Array.reduceRight()

```js
var values = [1,2,3,4,5];
var sum = values.reduce(function(prev, cur, index, array){
  return prev + cur;
})
alert(sum) // 15
```

> 总结：直接操作原数组的方法有：pop、push、shift、unshift、splice

[Array-API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

# String

字符方法：

- String.charAt(index)  返回指定位置的字符

- String.charCodeAt(index)  返回指定字符的ASCII码

字符串操作方法：

- String.concat(str1,str2,str3) 拼接两个或多个字符串,返回拼接得到的新字符串

- String.slice(beginIndex,endIndex
)  返回被操作字符串的一个子字符串

- String.substring(indexStart, indexEnd)  同上

- String.substr(start,length)  同上

字符串的操作方法都是返回一个基本类型的字符串值，对原始字符串没有任何影响

字符串位置方法：

- String.indexOf(searchValue[, fromIndex]
)  返回指定字符在字符串中第一次出现的索引

- String.lastIndexOf()  返回指定字符在字符串中第一次出现的索引，不过是从最后面一个字符开始查找。

trim()方法:

- String.trim()  返回删除前置、后缀所有空格的字符串副本，原字符串不变，空格还在。

- String.trimLeft()

- String.trimRight()

字符串大小写转换方法：

- String.toUpperCase()  把字符串转换成大写,原字符串不变

- String.toLowerCase()  把字符串转换成小写

字符串的模式匹配方法：

- String.match(regexp)  用于检索与指定正则匹配的子串，如果开启了全局检索模式，且有多个符合条件的子串，那么
返回的是一个数组。

- String.search(pattern)  用于返回指定子串或符合指定正则表达式的子串在原字符串中第一次出现的索引,

- String.replace(regexp|substr, newSubstr|function)  用于字符串替换操作，接收两个参数。

第一个参数：表示待替换的字符串，或者是替换的正则表达式

第二个参数：替换文本，也可以是一个function的返回值

> replace方法不会改变原字符串对象，而是返回新字符串对象

- String.split(separator)  以指定的分割字符或正则表达式的匹配字符来分割原字符串，返回结果以数组形式表示。

[支持正则表达式的String对象的方法（4个）](http://pengyouyi.site/js/2017/02/27/js-regexp#%E6%94%AF%E6%8C%81%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E7%9A%84string%E5%AF%B9%E8%B1%A1%E7%9A%84%E6%96%B9%E6%B3%954%E4%B8%AA)

[String-API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

转换为字符串：

- anyone.toString()  null和undefined值没有这个方法

- String()  将任意类型的值转换为字符串


> 字符串的特点: 字符串是不可变的。

总结出：字符串执行用以上方法，都不会改变原字符串对象，都是返回新的字符串对象

改变某个变量保存的字符串:

```js
var lang = 'Java';
lang = lang + ' Script';
```


# Number

Number属性:

- Number.MAX_VALUE

- Number.MIN_VALUE

- Number.MAX_SAFE_INTEGER = 2^53 - 1

- Number.MIN_SAFE_INTEGER = -(2^53 - 1)

Number.MAX_SAFE_INTEGER 是 js 里整数的安全的最大值

Number.MAX_VALUE 则表示 js 里最大的数值约1.79E+308，比这更大的表示 Infinity

[javascript中Number的MAX_SAFE_INTEGER 和 MAX_VALUE？](https://www.zhihu.com/question/36680964?from=profile_question_card)

数值转换方法：

- Number.parseInt(string,[ radix ])  转为radix进制的整数

```js
Number.parseInt === parseInt; // true
```

- 	Number.parseFloat(string)  转为浮点数

> 待补充：Number()、parseInt()、parseFloat() 转化规则

数值范围判断：

- Number.isNaN()  判断是否为数字

- Number.isFinite()  判定是否是有限数字

- Number.isInteger()  判断是否为整数

- Number.isSafeInteger()

保留Number位数:

- Number.toFixed(digits)  将数字四舍五入为指定小数位数的数字

参数值范围为[0,20],表示四舍五入后保留的小数位数，如果没有传入参数，默认参数值等于0

- Number.toPrecision()  将数字精确到指定长度.

方法接收参数一个参数，参数的范围为[0,21] , 参数表示数字的位数，如果数字总位数大于参数值且数字是小数，那么会进行四舍五入，如果数字总位数小于参数值且数字是小数，那么多出的小数位会自动补零。如果数字总位数小于参数值且数字为整数，那么会改用科学计数法表示。

- Number.toExponential(i)  科学计数形式

- Number.toString([radix])  radix取值必须为2~36

> toFixed()、toPrecision()、toExponential(i)、toString() 这4个方法返回的是字符串类型的值，原来的数字类型还是数字
 
> Number中的NaN、Infinity 为全局属性

> Number中的parseInt()、parseFloat()、isNaN()、isFinite()也为全局方法

[全局属性、全局方法](https://www.cnblogs.com/susufufu/p/5853342.html)

番外篇：《js高级程序设计》5.7节单体内置对象：Global对象、Math对象

[Number-API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

# Object

Object属性：

- obj.constructor

Object方法：

- object.valueOf()

- obj.toString()

- obj.toLocaleString()

Object原型相关：

- obj.hasOwnProperty(propName)  检测给定的属性在当前对象实例中（而不是在实例的原型中）

- prototypeObj.isPrototypeOf(object)  用于检测传入的对象是否是传入对象的原型

- Object.getPrototypeOf(obj)  获取obj的原型

- Object.assign(target, ...sources
)

- Object.create(proto[, propertiesObject]
)  使用指定的原型对象和其属性创建了一个新的对象。

[Object属性相关：](https://www.cnblogs.com/snandy/p/5278474.html)

- Object.defineProperty(obj, prop, descriptor)

- Object.seal(obj)  密封对象

- Object.freeze(obj)  冻结对象

- Object.preventExtensions(obj)  扩展对象

Object 其他方法：

- Object.is(value1, value2);  跟"\=="和"===" 都不同


[Object-API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

# Date

```js
new Date();
new Date(value);  // 距1970-01-01的毫秒数
new Date(dateString);
```

dateString格式如下：
```js
yyyy/m/d
yyyy/MM/d
yyyy/m/d HH:mm:ss
yyyy/MM/d HH:mm:ss
m/d/yyyy
MM/dd/yyyy
m/d/yyyy HH:mm:ss
MM/dd/yyyy HH:mm:ss
```

获取毫秒数：

返回距离1970年1月1日午夜（零时）之间的毫秒数的3个方法

- Date.parse(dateString)  将符合规定的日期字符串转换成日期，并返回该日期至1970-01-01的毫秒数

- Date.UTC(year, month[, day[, hour[, minute[, second[, millisecond]]]]])
  两个参数（年和月）是必须的

Date.parse() 和 Date.UTC() 方法返回的毫秒数可以传递给Date()构造函数

```js
var someDate = new Date(Date.parse("May 25, 2004"));

var otherDate = new Date(Date.UTC("2018, 5"))
```

- Date.now()  调用这个方法时的日期和时间的毫秒数，Date对象的时间戳

获取和设置dateObj的时间/日期：

```js
var dateObj = new Date();
```

- dateObj.getTime()  返回表示日期的毫秒数，同valueOf()

- dateObj.getFullYear()  年

- dateObj.getMonth()  月，0~11

- dateObj.getDate()  日

- dateObj.getHours()  时

- dateObj.getMinutes()  分

- dateObj.getSeconds()  秒

- dateObj.getDay()  星期几（0表示星期日，6表示星期六）

set方法对应以上get方法

- dateObj.setTime(毫秒)

- dateObj.setFullYear(年)

```js
var theBigDay = new Date();
theBigDay.setFullYear(1997);

```

继承的方法：

- 	dateObj.valueOf()

- 	dateObj.toString()

- 	dateObj.toLocaleString()


日期格式化方法：

- dateObj.toUTCString()

- dateObj.toDateString()

- dateObj.toTimeString()


[Date-API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

# Math

Math对象的属性：

- Math.PI  ∏

- Math.E  自然对数的底数e

数值最大最小方法：

- Math.max(val1,val2,val3...)  返回一组数值中的最大值
 
```js
var max = Math.max(3, 54, 32, 16) ;// 54

var values = [1, 2, 3, 4];
var maxVal = Math.max.apply(Math, values);
```

- Math.min()  返回一组数值中的最小值

舍入方法：

- 	Math.floor(x)  向下取整

- 	Math.ceil(x)  向上取整

- 	Math.round(x)  四舍五入

随机方法:

- Math.random()  [0,1)之间的随机数

值 = Math.floor(Math.random() * 可能值的总数 + 第一个可能的值)

其他方法：

- Math.abs(num)  取绝对值

- Math.pow(num, power)  num的power次幂

- Math.sqrt(num)  num的平方根

- Math.sin(x)  x的正弦值
 
[Math-API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)

# RegExp

```
/pattern/flags

new RegExp(patternStr[, flags])
```

RegExp对象属性：

- global  RegExp对象是否具有标志 g 全局模式。

- ignoreCase  RegExp对象是否具有标志 i 不区分大小写。

- multiline  RegExp 对象是否具有标志 m 多行模式

- lastIndex  一个整数，标示开始下一次匹配的字符位置。

RegExp实例方法：

- RegExp.test  检索字符串中指定的值。返回 true 或 false。

- RegExp.exec  检索字符串中指定的值。返回找到的值，并确定其位置。

[RegExp对象属性、方法（3个）](http://pengyouyi.site/js/2017/02/27/js-regexp#regexp%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7)

[RegExp-API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

# 更多-more

[JavaScript原生对象常用方法总结](https://blog.csdn.net/panruifang/article/details/42290303)


