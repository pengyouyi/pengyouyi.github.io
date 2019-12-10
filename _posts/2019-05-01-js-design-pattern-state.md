---
layout: post
title: js设计原则-状态模式
tags:
- design-pattern
categories: JS
description: js设计原则-状态模式
---

# 状态模式-State

# State 介绍

**状态模式（ State ）：**当一个对象状态发生改变时，会导致其行为的改变，这看起来像是改变了对象。

- 一个对象有状态变化

- 每次状态变化都会触发一个逻辑

- 不能总是用 if...else... 来控制

# State 示例 & UML

- 红黄绿灯

<div class="rd">
    <img src="/assets/images/2019/4-5-6/5-1-1.png" alt="">
</div>


# State 代码

```js
// 状态（红灯、黄灯、绿灯）
class State {
    constructor(color) {
    	this.color = color;
    }
    handle(context) {
    	console.log(`turn to ${this.color} light`);
    	context.setState(this);
    }
}

// 主体
class Context {
    constructor() {
    	this.state = null;
    }
    // 获取状态
    getState() {
        return this.state;
    }
    setState(state) {
        this.state = state;
    }
}


let context = new Context();

let red = new State('red');
let yellow = new State('yellow');
let green = new State('green');

// 红灯亮了
red.handle(context);
console.log(context.getState());
// 黄灯亮了
yellow.handle(context);
console.log(context.getState());
// 绿灯亮了
green.handle(context);
console.log(context.getState());
```

状态的获取和主体改变状态是分离的。

# State 场景

➊ 有限状态机

➋ 写一个简单的 Promise

➌ 超级玛丽

## 有限状态机-state

- 有限个状态、以及在这些状态之间的变化

- 如交通信号灯

- 使用开源 lib : javascript-state-matchine

https://github.com/jakesgordon/javascript-state-machine

```shell
npm i javascript-state-machine --save
```

```js
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <p>有限状态机</p>
    <button id="btn"></button>
    
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
    <script src="./03-javascript-state-machine.js"></script>
    <script>
        // 状态机模型
        var fsm = new StateMachine({
            init: '收藏',  // 初始状态，待收藏
            transitions: [
                {
                    name: 'doStore', 
                    from: '收藏',
                    to: '取消收藏'
                },
                {
                    name: 'deleteStore',
                    from: '取消收藏',
                    to: '收藏'
                }
            ],
            methods: {
                // 执行收藏
                onDoStore: function () {
                    alert('收藏成功')
                    updateText()
                },
                // 取消收藏
                onDeleteStore: function () {
                    alert('已取消收藏')
                    updateText()
                }
            }
        })

        var $btn = $('#btn')

        // 点击事件
        $btn.click(function () {
            if (fsm.is('收藏')) {
                fsm.doStore(1)
            } else {
                fsm.deleteStore()
            }
        })

        // 更新文案
        function updateText() {
            $btn.text(fsm.state)
        }

        // 初始化文案
        updateText()
    </script>
</body>
</html>
```

fsm.doStore() 执行时，
改变 transitions 中 name 的 state 的状态从 from 到 to，
同时执行 methods 中命名的函数 onDoStore。

## 写一个 Promise

- 回顾 Promise 的语法

- 分析： Promise 就是一个有限状态机

- Promise 三种状态：pending 、fullfilled、rejected

```js
import StateMachine  from 'javascript-state-machine';

// 定义 Promise
class MyPromise {
    constructor(fn) {
        this.successList = [];
        this.failList = [];

        fn(() => {
            // resolve 函数
            fsm.resolve(this);
        }, () => {
            // reject函数
            fsm.reject(this);
        })
    }
    then(successFn,failFn) {
        this.successList.push(successFn);
        this.failList.push(failFn);
    }
}

// 模型
var fsm = new StateMachine({
    init: 'pending',
    transitions: [
        {
            name: 'resolve',
            from: 'pending',
            to: 'fullfilled'
        },
        {
            name: 'reject',
            from: 'pending',
            to: 'rejected'
        }
    ],
    methods: {
        // 成功
        onResolve: function(state, data) {
            // state - 当前状态机实例
            // data - fsm.resolve(XXX) 传递的参数
            data.successList.forEach(fn => fn())
        },
        // 失败
        onReject: function(state, data) {
            data.failList.forEach(fn => fn())
        }
    }
})

// test
function loadImg(src) {
    const promise = new Promise((resolve,reject) => {
        var img = document.createElement('img');
        img.onload = function() {
            resolve(img);
        }
        img.onerror = function() {
            reject('图片加载失败')
        }
        img.src = src;
    })
    return promise;
}

var src = 'https://www.imooc.com/static/img/index/logo.png';
var result = loadImg(src);

result.then(function(img) {
    console.log('ok1');
    return img;
}, function() {

})

result.then(function(img) {
    console.log('ok2');
})
```

## 超级玛丽-state

**状态模式目的：**

将条件判断的不同结果转化为状态对象的内部状态，既然是状态对象的内部状态，所以一般作为状态对象内部的私有变量，然后提供一个能够调用状态对象内部状态的接口方法对象。

**状态模式思路：**

首相创建一个状态对象，内部保存状态变量，然后内部封装好每种动作对应的状态，最后状态对象返回一个接口对象，它可以对内部状态修改或者调用。

```js
// 创建超级玛丽状态类
var MarryState = function() {
    // 内部状态私有变量
    var _currentState = {},
        // 动作与状态方法映射 
        states = {
            jump: function() {
                console.log('jump');
            },
            move: function() {
                console.log('move');
            },
            shoot: function() {
                console.log('shoot');
            },
            squat: function() {
                console.log('squat');
            }
        };

    // 动作控制类
    var Action = {
        // 改变状态方法
        changeState: function() {
            // 组合动作通过传递多个参数实现
            var arg = arguments;
            // 重置内部状态
            _currentState = {};
            // 如果有动作则添加动作
            if (arg.length) {
                // 遍历动作
                for (var i = 0; i < arg.length; i++) {
                    // 向内部状态中添加动作
                    _currentState[arg[i]] = true;
                }
            }
            // 返回动作控制类
            return this;
        },
        // 执行动作
        goes: function() {
            console.log('触发一次动作');
            // 遍历内部状态保存的动作
            for (var i in _currentState) {
                // 如果该动作存在则执行
                states[i] && states[i]()
            }
            return this;
        }
    }

    // 返回接口方法 change、goes
    return {
        change: Action.changeState,
        goes: Action.goes
    }
}

// 创建一个超级玛丽
var marry = new MarryState();
marry.change('jump', 'shoot')
     .goes()
     .goes()
     .change('shoot')
     .goes()

```

结果显示：

```js
触发一次动作
jump
shoot
触发一次动作
jump
shoot
触发一次动作
shoot
```

# State 设计原则验证

- 将状态对象和主题2对象分离，状态呢的变化逻辑单独处理

- 符合开放封闭原则

状态模式既是解决程序中臃肿的分支判断语句问题，将每个分支转化为一种状态独立出来，方便每种状态的管理又不至于每次执行时遍历所有分支。最终目的是简化分支判断流程。

