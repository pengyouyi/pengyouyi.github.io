---
layout: post
title: ES6箭头函数和普通函数的区别
tags:
- Interview
- JS
- ES6
categories: JS
description: ES6箭头函数和普通函数的区别
---

# ES6箭头函数和普通函数的区别

❶ 声明方式不同：普通函数可以是声明式的，也可以是赋值式；而箭头函数只能是赋值式的；  
❷ `this 指向不同`：普通函数有原型 prototype，this 指向不确定；箭头函数本身没有 this ，因为没有原型，this 指向确定，`指向他父级作用域`；  
❸ 改变 this: 普通函数的 this 指向可以通过call、apply、bind改变；箭头函数的 this 永远不会变，call、apply、bind 也无法改变；  
❹ 箭头函数没有原型 prototype；  
❺ new 不同：普通函数可以 new;箭头函数不能 new;  
❻ 是否可以当构造函数：`箭头函数不可以当作构造函数`；  
❼ 传参方式：普通函数可以获取 arguments 对象，箭头函数不能获取，可以通过 ...rest, 用 rest 对象代替  

# more 更多详细例子等待补充...

# 箭头函数有什么缺点？disadvantage

- 没有 arguments

```js
const fn = () => {
    console.log('arguments', arguments)
}

function fn1() {
    console.log('arguments', arguments)
}
fn1(100, 200)
```

- 无法通过 apply、call、bind 改变 this 

```js
const fn3 = () => {
    console.log('this', this)
}

function fn2() {
    console.log('this', this)
}
fn2.call({x: 100})
```
# when 什么时候不能使用箭头函数

不适用1 - 对象方法

```js
const obj = {
    name: 'pyy',
    getName: () => {
        return this.name;
    }
    
}
console.log(obj.getName())
```

不适用2 - 原型方法

```js
const obj = {
    name: 'pyy'
}
obj.__proto__.getName = () => {
    return this.name;
}

console.log(obj.getName())
```

不适用3 - 构造函数

```js
const Foo = (name,age) => {
    this.name = name;
    this.age = age;
}
const f = new Foo('pyy', 20)  // 报错 Foo is not a constructor
```

不适用4 - 动态上下文中的回调函数

```js
const btn1 = document.getElementById('btn1');
btn1.addEventListener('click',() => {
    console.log(this === window);
    this.innerHTML = 'clicked';
})
```

不适用5 - Vue 生命周期和method

```js
{
    data(){ return {name: 'pyy'}},
    method: {
        getName: () => {
            return this.name;  // 报错
        },
        // getName(){
        //    return this.name  // 正常
        // }
    },
    mounted: () => {
        console.log('msg',this.name)  // 报错
    },
    // mounted() {
    //     console.log('msg',this.name)  // 正常
    // }
}
```

传统 Vue 组件是 JS 对象，传统 React 组件是 class，两者不同