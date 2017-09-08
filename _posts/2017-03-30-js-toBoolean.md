---
layout: post
title: js显示、隐式转为布尔值
tags:
- 
categories: JS
description: js显示、隐式转为布尔值
---

# js显示、隐式转为布尔值

# js显示转为布尔值

> Boolean()
> !!

天生为假值的有：`undefined`、`null`、`0`、`NaN`、`""`

# js隐式转为布尔值

> if(..)语句中的条件判断表达式  
> for(..;..;..)语句中的条件判断表达式（第二个）  
> while(..) 和 do..while(..)循环语句中的条件判断表达式  
> ? : 中的条件判断表达式  
> 逻辑运算符或|| 和 逻辑与&& [左边的操作数，作为条件判断表达式]

## while语句

```js
var arr = ["test",9,1];
var a;
while(a=arr.pop()){
	console.log(a); //1,9,test
}
```
等价于
```js
var arr = ["test",0,null,1,undefined,1,3];
var a=arr.pop();
while(a){
	console.log(a);  //3,1
	a=arr.pop()
}
```








