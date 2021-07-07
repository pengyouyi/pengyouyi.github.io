---
layout: post
title: JavaScript面试题-小code
tags:
- Interview
categories: JS
description: JavaScript面试题-小code
---


# String

## 字节length

- 编写一个方法求一个字符串的字节长度

方法1:

```js
function GetBytes(str){
  var len = str.length;
  var bytes = len;
  for(var i = 0;i < len;i++){
    if(str.charCodeAt(i) > 255){
      bytes++;
    }
  }
  return bytes;
}
var s ="j你";
console.log(GetBytes(s));  //中文字占2个字节 
```

方法2:

```js
function getLeng(str){
  if(!arguments.length || !str){
    return null;
  }
  var len = str.length;
  var newlen = 0;
  for(var i = 0; i < len; i++){
    if(str.charCodeAt(i) > 255){
      newlen += 2;
    }else{
      newlen++;
    }
  }
  return newlen;
}

var s =" ";
console.log(getLeng(s));
```

## substr-slice

- 截取字符串abcdefg的efg

```js
str = "hello world";

var slice = str.slice(3,7)  // 第二个参数位置

var substring = str.substring(3,7) // 第二个参数位置，同上slice方法

var substr = str.substr(3,7) // 第二个参数个数

console.log(slice); // "lo w" ，array也有这个方法，array最强大的方法splice，改变原数组

console.log(str); // "hello world"  不改变原字符串

console.log(substring); // "lo w"

console.log(substr); // "lo worl"
```


## 字符串出现最多的char

- 判断一个字符串中出现次数最多的字符，统计这个次数

```js
str = "abcaba";
	
function getMost(str){
	var obj = {};
	for(var i = 0; i < str.length; i++){

		if(!obj[str.charAt(i)]){
			obj[str.charAt(i)] = 1;
		}else{
			obj[str.charAt(i)] ++ ;
		}
	}
	var max = 0; // 字符出现最多的次数
	var index = ""; //出现次数最多的是哪个字符
	for(var j in obj){
		if(obj[j] > max ){
			max = obj[j];
			index = j; 
		}
	}
	var newObj = {
		maxvalue: index,
		maxnum: max
	}
	return newObj;
}
console.log(getMost(str).index);
```

## 获取随机String

- 获取随机数，要求是长度一致的字符串格式

```js
var random = Math.random();
random = random + '00000000';
random = random.slice(0,10);
console.log(random);
```

## 按照格式showTime 

- xxxx年xx月xx日xx时xx分xx秒动态显示时间 要求不足10的补0 

```html
<div id="demo"></div>
<script type="text/javascript">

	function f(str){
		return str > 9 ? str : "0" + str;
	}

	function getTime(){
		var time = new Date();
		
		var year = time.getFullYear();
		var month = f(time.getMonth()+1);
		var day = f(time.getDate());
		var hour = f(time.getHours());
		var minutes = f(time.getMinutes());
		var second = f(time.getSeconds());

		var mytime = year+ "-" + month + "-" + day + " " + hour +":"+ minutes + ":" +second;
		return mytime;

	}

	function intext(){
		document.getElementById("demo").innerHTML = getTime()
	}
	setInterval(intext,1000);
</script>
```

## qian-fen-wei

- 如何将浮点数点左边的数每三位添加一个逗号，如 12000000.11转化为 12,000,000.11 ?

法一：正则匹配

```js
function myNum(num) {
	var xs = num.toString().split('.')[1]; // 判断是否有小数部分
	if (xs) {
	return num && num
		.toString()
		.replace(/(\d)(?=(\d{3})+\.)/g, function($1, $2){
			return $2 + ',';
		});
	}
	return num.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,');
}

console.log(myNum(num));
```

法二：借用数组

```js
var num = 12345678.90;

function turnQFW(num) { 
	var str = parseInt(num).toString();
	var zsLength = parseInt(num).toString().length;
	// 小数
	var xs = num.toString().split(".")[1];

	var iNum = str.length % 3; //余数 
	var prev = ''; 
	var arr = []; 
	var iNow = 0; 
	var tmp = ''; 

	if (iNum !=0) { 
		prev = str.substring(0,iNum); //将余数截取出来 
		arr.push(prev); 
	} 
    // 剩下规则的3个数为一组，str长度为0、3、6、9、3n
    str = str.substring(iNum); 

    for (var i=0;i<str.length;i++) { 
		iNow++; 
		tmp +=str[i]; 
		if(iNow ==3 && tmp) { 
			arr.push(tmp); 
			tmp = ''; 
			iNow = 0; 
	    } 
    } 
    // 把整数部分变成千分位格式
    var zsStr = arr.join(',');
    
    if (zsLength <= 3) {
      return num;
	} else {
	   // 如果存在小数位
		if (xs) { 
			return zsStr + '.' + xs ;
		}
		return zsStr; 
	}
} 

console.log(turnQFW(num));
```

法三：用正则匹配

```js
	function comdify(num) {
		var re=/\d{1,3}(?=(\d{3})+$)/g;
		var n1=num.toString().replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2;});

		return n1;
	}
	console.log(comdify(num));
```

[为整数添加千分位-正则方法](https://blog.csdn.net/xuyunfei_2012/article/details/54628981)

[利用JS实现为数字添加千分位的操作](https://blog.csdn.net/krenyelang/article/details/6895755)

[为整数添加千分位](http://www.jb51.net/article/89799.htm)

[为浮点数添加、移除千分位](https://blog.csdn.net/u013558749/article/details/79422903)

# Array

## isArray

- js如何判断一个对象是不是Array

方法1:

```js
function isArray(obj){
		return Object.prototype.toString.call(obj) === "[object Array]"
	}
var	arr = "12";
console.log(isArray(arr));
```

ES6新增数组api,方法2:

```js
Array.isArray(arr);
```

## 数组unique

- 编写一个方法 去掉一个数组的重复元素 

方法1:

```js
var arr = [ 1,2,3,"1"];

function getArrUnique(arr){
	var newArr = [ ];
	for (var i = 0; i < arr.length; i++){

		if(newArr.indexOf(arr[i]) == -1)
			newArr.push(arr[i]);	
	}
	return newArr;
}
```

方法2,不完善：

```js	
function getArrUnique2(arr){
	var newArr = [];
	var obj = {};
	for(var i = 0; i < arr.length; i++){
		if(!obj[arr[i]]){
			obj[arr[i]] = true;
			newArr.push(arr[i]);
		}
	}
	return newArr;
}
console.log(getArrUnique2(arr));  //[1,2,3]  error result
```

改进以上方法,方法2:

```js
function getArrUnique3(arr){
	var newArr = [];
	var obj ={};
	for(var i=0;i<arr.length;i++){
		if(!obj[ typeof (arr[i]) + arr[i] ]){
			obj[ typeof (arr[i]) + arr[i] ] = true;
			newArr.push(arr[i]);
		}

	}
	return newArr;
}
console.log(getArrUnique3(arr));  //[1,2,3,"1"]
```

方法3: 使用 Set

```js
function getArrUnique(arr){
	const set = new Set(arr)
	return [...set]
}
```

## Random-ordering

- 如何实现数组的随机排序？

方法一：

```js
var arr = [1,2,3,4,5,6,7,8,9,10];
function randSort1(arr){
	for(var i = 0,len = arr.length;i < len; i++ ){
		var rand = parseInt(Math.random()*len);
		var temp = arr[rand];
		arr[rand] = arr[i];
		arr[i] = temp;
	}
	return arr;
}
console.log(randSort1(arr));
```

方法二：

```js
var arr = [1,2,3,4,5,6,7,8,9,10];
function randSort2(arr){
	var mixedArray = [];
	while(arr.length > 0){
		var randomIndex = parseInt(Math.random()*arr.length);
		mixedArray.push(arr[randomIndex]);
		arr.splice(randomIndex, 1);
	}
	return mixedArray;
}
console.log(randSort2(arr));
```

方法三：

```js
var arr = [1,2,3,4,5,6,7,8,9,10];
arr.sort(function(){
	return Math.random() - 0.5;
})
console.log(arr);
```

# Object

## create object

- javascript创建对象的几种方式？

1、对象字面量的方式   

```js
person = {firstname:"Mark", lastname:"Yun", age:25, eyecolor:"black"};
```

2、用function来模拟无参的构造函数

```js
function Person(){}
var person = new Person();//定义一个function，如果使用new"实例化",该function可以看作是一个Class
person.name = "Mark";
person.age = "25";
person.work = function(){
    alert(person.name + " hello...");
}
person.work();
```

3、用function来模拟参构造函数来实现（用this关键字定义构造的上下文属性）

```js
function Pet(name, age, hobby){
    this.name = name;//this作用域：当前对象
    this.age = age;
    this.hobby = hobby;
    this.eat = function() {
        alert("我叫" + this.name + ",我喜欢" + this.hobby + ",是个程序员");
    }
}
var maidou = new Pet("麦兜", 25, "coding");//实例化、创建对象
maidou.eat();//调用eat方法
```

4、用工厂方式来创建（内置对象）

```js
var wcDog =n ew Object();
wcDog.name = "旺财";
wcDog.age = 3;
wcDog.work = function() {
    alert("我是" + wcDog.name + ",汪汪汪......");
}
wcDog.work();
```

5、用原型方式来创建

```js
function Dog(){

}
Dog.prototype.name = "旺财";
Dog.prototype.eat = function(){
    alert(this.name + "是个吃货");
}
var wangcai = new Dog();
wangcai.eat();
```

6、用混合方式来创建

```js
function Car(name,price){
    this.name = name;
    this.price = price; 
}
Car.prototype.sell = function(){
    alert("我是" + this.name + "，我现在卖" + this.price + "万元");
}
var camry = new Car("凯美瑞",27);
camry.sell(); 
```

## clone

**- 浅拷贝：**有两种方式，一种是把一个对象里面的所有的属性值和方法都复制给另一个对象，另一种是直接把一个对象赋给另一个对象，使得两个都指向同一个对象。

**- 深拷贝：**把一个对象的属性和方法一个个找出来，在另一个对象中开辟对应的空间，一个个存储到另一个对象中。

**- 两者就在于**，浅拷贝只是简单的复制，对对象里面的对象属性和数组属性只是复制了地址，并没有创建新的相同对象或者数组。而深拷贝是完完全全的复制一份，空间大小占用一样但是位置不同！！

**简单点来说**，就是假设B复制了A，当修改A时，看B是否会发生变化，如果B也跟着变了，说明这是浅拷贝，拿人手短，如果B没变，那就是深拷贝，自食其力。

[js浅拷贝与深拷贝的区别和实现方式](https://www.jianshu.com/p/1c142ec2ca45)

### 浅拷贝 shallow copy

法一：直接用=赋值

```js
let a = [0, 1, 2, 3, 4],
    b = a;
console.log(a === b);
a[0] = 1;
console.log(a, b);
```

法二： Object.assign 方法

```js
var obj = {
    a: 1,
    b: 2
}
var obj1 = Object.assign({},obj);
boj1.a = 3;
console.log(obj.a) // 3
```

法三： for···in只循环第一层

```js
var obj = { 
	a:1, 
	arr: [2,3] 
};
var shallowObj = shallowCopy(obj);

function shallowCopy(src) {
  var dst = {};
  for (var prop in src) {
    if (src.hasOwnProperty(prop)) {
      dst[prop] = src[prop];
    }
  }
  return dst;
}

//当一个对象属性的引用值改变时将导致另一个也改变
shallowObj.arr[1] = 5;
obj.arr[1]   // = 5
```

### 深拷贝 deep copy

- 深拷贝一个对象

```js
function deepClone(obj) {
	// obj 是 null, 或者不是对象和数组，直接返回
	if (typeof obj !== 'object' || obj == null) {
        return obj
	}

	// 初始化返回结果
	let result
	if (obj instanceof Array) {
		result = []
	} else {
		result = {}
	}

	for (let key in obj) {
		// 保证 key 不是原型的属性
		if (obj.hasOwnProperty(key)) {
			// 递归调用
			result[key] = deepClone(obj[key])
		}
	}

	return result
}

const obj1 = {
	age: 20,
	address: {
		city: 'chongqing'
	},
	arr: [1,2,3]
}

const obj2 = obj1

obj2.address.city = 'beijing'

console.log(obj1.address.city)
```

- 实现一个函数clone，可以对JavaScript中的5种主要的数据类型（包括Number、String、Object、Array、Boolean）进行值复制

法一：递归

```js
function deepClone(obj){
	var o;
	switch(typeof obj) {
		case "undefined":
			break;
		case "string":
			o = obj + "";
			break;
		case "number":
			o = obj - 0;
			break;
		case "boolean":
			o = obj;
			break;
		case "object":
			if(obj === null){
				o = null;
			}else if(obj instanceof Array){
				o = [];
				for(var k in obj){
					o[k] = clone(obj[k]);
				}
			}else{
				o = {};
				for(var k in obj){
					o[k] = clone(obj[k]);
				}
			}
			break;
		default :
			o = obj;
			break;

	}
	return o;
}
var s = {fd:"df",fde:{we:3}};
console.log(deepClone(s));
```

法二：JSON.parse(JSON.stringify(obj)) 用JSON实现深拷贝

```js
var test={
    a:"ss",
    b:"dd",
    c:[
        {dd:"css",ee:"cdd"},
        {mm:"ff",nn:"ee"}
    ]
};
var test1 = JSON.parse(JSON.stringify(test));//拷贝数组,注意这行的拷贝方法
console.log(test);
console.log(test1);
test1.c[0].dd="change"; //改变test1的c属性对象的d属性
console.log(test);  //不影响test
console.log(test1);
```

[使用JSON.parse(),JSON.stringify()实现对对象的深拷贝](https://www.cnblogs.com/baiyangyuanzi/p/6519612.html)

## isEqual

手写对象深度比较，模拟 lodash 的 isEqual

```js
function isObject(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]'
}

function isArray(arr) {
	return Object.prototype.toString.call(arr) === '[Object Array]'
}

function isEqual(obj1, obj2) {
	// 值类型
	if (obj1 === obj2) {
		return true
	}
	// 类型为对象并且元素个数相同
	if (isObject(obj1) && isObject(obj2) && Object.keys(obj1).length === Object.keys(obj2).length) {
        for (let key in obj1) {
        	if (obj1.hasOwnProperty(key)) {
        		// 递归
	            const res = isEqual(obj1[key], obj2[key])
			    if (!res) {
			    	return false
			    }
        	}
        	
        }
    // 类型为数组并且数组长度相同
	} else if(isArray(obj1) && isArray(obj2) && obj1.length === obj2.length) {
        for (let key in obj1) {
        	// 递归
        	const res = isEqual(obj1[key], obj2[key])
		    if (!res) {
		    	return false
		    }
        }
    // 其它类型,均返回false
	} else {
		return false
	}
	// 走到这里,说明数组或者对象中所有元素都相同,返回true
	return true
}

let obj1 = {
    a: 100,
    b: {x: 100},
    c: ['x', 'y']
}

let obj2 = {
	a: 10,
	b: {x: 100},
	c: {'0':'x','1':'y'}
}

console.log(isEqual(obj1, obj2))
```

## 继承的使用-inherit

```js
function Animal(name){
	this.name = name;
	this.colors = ["red","blue","green"];
	this.showName = function(){
		return this.name;
	}
}
```

第一种继承，原型链

```js
function Animal(name){...}

function Pig(){

}
Pig.prototype = new Animal();  //继承所有属性和方法，引起引用类型的原型属性会被所有实例共享

var pig1 = new Pig();
pig1.colors.push("black");
console.log(pig1.colors); // ["red", "blue", "green", "black"]

var pig2 = new Pig();
console.log(pig2.colors);  // ["red", "blue", "green", "black"]
```

第二种继承，借用构造函数

```js
function Animal(name){...}

function Cat(myname){
	Animal.call(this,"Tom"); // call不能继承对象原型上的方法
}
var cat = new Cat();
console.log(cat.name);  // Tom
console.log(cat.showName()); //Tom

function Dog(name,colors){
	Animal.apply(this,arguments) ;  //同上call
	//Animal.apply(this,[nam,colors]) ;
}
var dog = new Dog("fuwa");  // uwa
console.log(dog.name);
```	

第三种，组合继承

```js
function Super(name){
	this.name = name;
	this.colors = ["red","blue","green"];
}
Super.prototype.sayName = function(){
	console.log(this.name);
}
function Sub(myname,age){
	//继承属性
	Super.call(this,myname);
	this.age = age;
}

//继承方法
Sub.prototype = new Super();
Sub.prototype.constructor = Sub;
Sub.prototype.sayAge = function(){
	console.log(this.age);
}

var sub1 = new Sub("peng",23);
sub1.colors.push("black");  // ["red", "blue", "green", "black"]
console.log(sub1.colors);
sub1.sayName();
sub1.sayAge();

var sub2 = new Sub("youyi",50);
console.log(sub2.colors);  // ["red", "blue", "green"]
sub2.sayName();
sub2.sayAge();
```

[构造函数的继承](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html)

[非构造函数的继承](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance_continued.html)


## 重写forEach

- 写一个能遍历对象和数组的通用forEach函数

```js
function forEach(obj, fn) {
  var key;
  if (obj instanceof Array) {
  	// 准确判断是不是数组
  	obj.forEach(function(item, index) {
  		fn(index, item);
  	});
  } else {
  	// 不是数组就是对象
  	for (key in obj) {
  		fn(key, obj[key])
  	}
  }
}

var arr = [1, 2, 3];
forEach(arr, function(index, item) {
	console.log(index, item);
});

var obj = {
	x: 100,
	y: 200
}
forEach(obj, function(key, value) {
	console.log(key, value);
});
```



