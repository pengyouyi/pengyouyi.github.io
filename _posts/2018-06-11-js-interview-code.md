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
  for(var i = 0;i<len;i++){
    if(str.charCodeAt(i)>255){
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
  for(var i=0; i<len; i++){
    if(str.charCodeAt(i)>255){
      newlen+=2;
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
	for(var i=0; i<str.length; i++){

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
		maxvalue:index,
		maxnum:max
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
		return str>9? str :"0"+ str
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
	var xs = num.toString().split(".")[1];

	var iNum = str.length%3; //余数 
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
		for (var i=0; i < arr.length;i++){

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
		var obj ={};
		for(var i=0;i<arr.length;i++){
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
person={firstname:"Mark",lastname:"Yun",age:25,eyecolor:"black"};
```

2、用function来模拟无参的构造函数

```js
function Person(){}
var person=new Person();//定义一个function，如果使用new"实例化",该function可以看作是一个Class
person.name="Mark";
person.age="25";
person.work=function(){
    alert(person.name+" hello...");
}
person.work();
```

3、用function来模拟参构造函数来实现（用this关键字定义构造的上下文属性）

```js
function Pet(name,age,hobby){
    this.name=name;//this作用域：当前对象
    this.age=age;
    this.hobby=hobby;
    this.eat=function(){
        alert("我叫"+this.name+",我喜欢"+this.hobby+",是个程序员");
    }
}
var maidou =new Pet("麦兜",25,"coding");//实例化、创建对象
maidou.eat();//调用eat方法
```

4、用工厂方式来创建（内置对象）

```js
var wcDog =new Object();
wcDog.name="旺财";
wcDog.age=3;
wcDog.work=function(){
    alert("我是"+wcDog.name+",汪汪汪......");
}
wcDog.work();
```

5、用原型方式来创建

```js
function Dog(){

}
Dog.prototype.name="旺财";
Dog.prototype.eat=function(){
    alert(this.name+"是个吃货");
}
var wangcai =new Dog();
wangcai.eat();
```

6、用混合方式来创建

```js
function Car(name,price){
    this.name=name;
    this.price=price; 
}
Car.prototype.sell=function(){
    alert("我是"+this.name+"，我现在卖"+this.price+"万元");
}
var camry =new Car("凯美瑞",27);
camry.sell(); 
```

## clone

- 实现一个函数clone，可以对JavaScript中的5种主要的数据类型（包括Number、String、Object、Array、Boolean）进行值复制

```js
function clone(obj){
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
				for(var i = 0; i < obj.length; i++){
					o.push(obj[i]);
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
console.log(clone(s));
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



