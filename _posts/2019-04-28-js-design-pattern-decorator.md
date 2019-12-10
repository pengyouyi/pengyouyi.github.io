---
layout: post
title: js设计原则-装饰器模式
tags:
- design-pattern
categories: JS
description: js设计原则-装饰器模式
---

# 装饰器模式-Decorator

# Decorator 介绍

**装饰器模式（ Decorator ）：**在不改变原对象的结构和功能上，通过对其进行包装拓展（添加属性或者方法）使原有对象可以满足用户更复杂的需求。

# Decorator 示例 & UML

⓵ 手机壳

⓶ 房子装修

<div class="rd">
    <img src="/assets/images/2019/4-5-6/4-28-1.png" alt="">
</div>

# Decorator 代码

```js
class Circle {
	draw() {
		console.log('画一个圆形')
	}
}

// 装饰器
class Decoractor {
	constructor(circle) {
		this.circle = circle;
	}
	draw() {
		this.circle.draw();
		this.setRedBorder(circle);
	}
	setRedBorder(circle) {
        console.log('设置红色边框');
	}
}

// 测试代码
let circle = new Circle();
circle.draw();

console.log('-----分割线-----')

let dec = new Decoractor(circle);
dec.draw();
```

# Decorator 场景

① ES7 装饰器

② core-decorators

## ES7 装饰器

- 配置环境

- 装饰类

- 装饰方法

### ES7配置环境

1. 安装 babel-plugin-transform-decorators-legacy

```shell
cnpm i babel-plugin-transform-decorators-legacy --save-dev
```

2. 修改.babelrc

```js
{
	"presets": ["es2015", "latest"],
	"plugins": ["babel-plugin-transform-decorators-legacy"]
}
```

3. 测试ES7环境是否安装成功

```js
@testDec
class Demo {

}

function testDec(target) {
	target.isDec = true;
}

alert(Demo.isDec)
```

### 装饰类-Class

```js
@testDec
class Demo {

}

function testDec(target) {
	target.isDec = true;
}

alert(Demo.isDec) // true
```

```js
// 装饰器的原理
@decorator
class A {}

// 等同于
class A {}
A = decorator(A) || A;
```

```js
// 可以加参数
function testDec(isDec) {
    return function(target) {
        target.isDec = isDec;
    }
}

@testDec(true)
class Demo {}

alert(Demo.isDec);
```

### 装饰方法-Method

```js
class Person {
  constructor() {
      this.first = 'A';
      this.last = 'B';
  }
  // 装饰方法
  @readonly
  name() {
      return `${this.first} ${this.last}`
  }
}

function readonly(target,name, descriptor) {
	// descriptor 属性描述对象 （Object.defineProperty 中会用到），原来的值如下

	// {
	// 	value: specifiedFunction,
	// 	enumerable: false,
	// 	configurable: true,
	// 	writable: true
	// }
	
    descriptor.writable = false
    return descriptor;
}

var p = new Person();
console.log(p.name());

// p.name = function() {} // 这里会报错，因为name 是只读属性
```

```js
// 实例2
class Math {
  // 装饰方法
  @log
  add(a, b) {
      return a + b;
  }
}

function log(target, name, descriptor) {
    var oldValue = descriptor.value;

    descriptor.value = function() {
        console.log(`Calling ${name} with`, arguments);
        return oldValue.apply(this, arguments);
    }
    return descriptor;
}

const math = new Math();
const result = math.add(2, 4); // 执行add时会自动打印日志，因为有@log装饰器
console.log(result);
```

## core-decorators

1. 安装 core-decorators

```shell
cnpm i core-decorators --save
```

```js
import { readonly } from 'core-decorators';

class Person {
  constructor() {
      this.first = 'A';
      this.last = 'B';
  }
  // 装饰方法
  @readonly
  name() {
      return `${this.first} ${this.last}`
  }
}

var p = new Person();
console.log(p.name());

// p.name = function() {} // 这里会报错，因为name 是只读属性
```


# Decorator 设计原则验证

- 将现有对象和装饰器进行分离，两者独立存在

- 符合开放封闭原则