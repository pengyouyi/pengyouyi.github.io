---
layout: post
title: js设计原则-观察者模式
tags:
- design-pattern
categories: JS
description: js设计原则-观察者模式
---

# 观察者模式-Observer

# Observer 介绍

**观察者模式（ Observer ）：**又被称作发布-订阅者模式或消息机制，定义了一种依赖关系，解决了主体对象与观察者之间功能的耦合。

- 一对多

观察者模式在前端中使用是最多的。重点学习.

# Observer 示例 & UML

- 点咖啡，点好之后坐等被叫

<div class="rd">
    <img src="/assets/images/2019/4-5-6/5-2-1.png" alt="">
</div>


# Observer 代码

```js
// 主体，保存状态，状态变化之后触发所有观察者对象
class Subject {
    constructor() {
    	this.state = 0;
    	this.observers = [];
    }
    getState() {
    	return this.state;
    }
    setState(state) {
    	this.state = state;
    	this.notifyAllObservers();
    }
    notifyAllObservers() {
    	this.observers.forEach(item => {
    		item.update();
    	})
    }
    attach(observer) {
    	this.observers.push(observer);
    }
}

// 观察者
class Observer {
	constructor(name, subject) {
		this.name = name;
		this.subject = subject;
		this.subject.attach(this);
	}
	update() {
		console.log(`${this.name} update, state ${this.subject.getState()}`);
	}
}

// test
let subject = new Subject();
let o1 = new Observer('o1', subject);
let o2 = new Observer('o2', subject);

subject.setState(1);
subject.setState(2);
```


# Observer 场景

➊ 网页事件绑定

➋ Promise

➌ jQuery callbacks

➍ nodejs 自定义事件

## 网页事件绑定-Event binding

网页事件监听机制：点击、拖拽都是观察者模式。

```js
<button id="btn1">btn</button>

<script>
    $('#btn1').click(function() {
        console.log(1);
    });
    $('#btn1').click(function() {
        console.log(2);
    });
    $('#btn1').click(function() {
        console.log(3);
    });
</script>
```

## Promise

```js
// 加载图片
function loadImg(src) {
    var promise = new Promise(function(resolve, reject) {
        var img = document.createElement('img');
        img.onload = function() {
            resolve(img);
        }
        img.onerror = function() {
            reject('图片加载失败')
        }
        img.src = src;
    })
    return promise
}

var src = 'https://www.imooc.com/static/img/index/logo.png';
var result = loadImg(src);

result.then(function(img) {
    console.log('img.width', img.width);
    return img;
}).then(function(img) {
    console.log('img.height', img.height);
}).catch(function(ex) {
    console.log(ex)
});
```

.then也是观察者，监听Promise的resolve变为成功状态或者reject失败状态。 

## jQuery callbacks

```js
var callbacks = $.Callbacks(); // 注意大小写

callbacks.add(function(info) {
    console.log('fn1', info)
});
callbacks.add(function(info) {
    console.log('fn2', info)
});
callbacks.add(function(info) {
    console.log('fn3', info)
});

callbacks.fire('gogogo');
callbacks.fire('fire');
```

运行结果：

```js
fn1 gogogo
fn2 gogogo
fn3 gogogo
fn1 fire
fn2 fire
fn3 fire
```

## 场景2-NodeJs自定义事件

```js
const EventEmitter = require('events').EventEmitter;

const emitter1 = new EventEmitter();

emitter1.on('some', () => {
	// 监听some事件
	console.log('some event is occured 1')
})

emitter1.on('some', () => {
	// 监听some事件
	console.log('some event is occured 2')
})

emitter1.emit('some');
```

### 继承 EventEmitter

```js
const EventEmitter = require('events').EventEmitter;

// 任何构造函数都可以继承 EventEmitter 的方法 on emit
class Dog extends EventEmitter {
	constructor(name) {
		super();
		this.name = name;
	}
}

var simon = new Dog('simon');
simon.on('bark', function() {
	console.log(this.name, ' barked');
})

setInterval(() => {
	simon.emit('bark')
}, 2000)
```

### 统计文件有多少个字符-character

```js
// Stream 用到了自定义事件
const fs = require('fs');
const readStream = fs.createReadStream('./data/file.txt'); // 读取文件的 Stream

let length = 0;

readStream.on('data', function(chunk) {
	let len = chunk.toString().length;
	console.log('len', len);
	length += len;
})

readStream.on('end', function() {
	console.log(length);
})
```

### 统计文件有多少行-row

```js
const readline = require('readline');
const fs = require('fs');

let rl = readline.createInterface({
	input: fs.createReadStream('./data/file.txt')
})

let lineNum = 0;

rl.on('line', function(line) {
	lineNum++;
})

rl.on('close',function() {
	console.log('lineNum', lineNum)
})
```

## 其他场景-other

- nodejs 中：处理 http 请求；多进程通讯

- vue 和 React 组件生命周期触发

- vue watch data的变化


# Observer 设计原则验证

- 主体和观察者分离，不是主动触发而是被动监听，两者解耦

 符合开放封闭原则

