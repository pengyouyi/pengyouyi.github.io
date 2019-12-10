---
layout: post
title: js设计原则-工厂模式
tags:
- design-pattern
categories: JS
description: js设计原则-工厂模式
---

# 工厂模式-Factory

# Factory 介绍

**简单工厂模式（ Simple Factory ）：**又叫静态工厂方法，由一个工厂对象决定创造某一种产品对象的实例。主要用来创造同一类对象。

- 将 new 操作单独封装

- 遇到 new 时，就要考虑是否该使用工厂模式

# Factory 示例 & UML

## 示例 one

- 你去购买汉堡，直接点餐、取餐，不会自己亲手做

- 商店要“封装”做汉堡的工作，做好直接给买者

## 示例 two

比如说体育商品店卖体育器材，里面有很多体育用品，及其相关介绍等。

当你来到体育用品店买一个篮球及其相关介绍时，

你只需要问售货员，他会帮你找到你所想要的东西。

<div class="rd">
    <img src="/assets/images/2019/4-5-6/4-24-1.png" alt="">
</div>

# Factory 代码

## 代码 one

```js
class Product {
	constructor(name) {
		this.name = name;
	}
	init() {
        console.log('init');
	}
	fn1() {
        console.log('fn1');
	}
	fn2() {

	}
}
// 工厂函数，返回 Product 实例
class Creator {
	create(name) {
		return new Product(name);
	}
}

// 测试

let creator = new Creator();
let p = creator.create('peng');

p.init();
```

## 代码 two

```js
// 篮球基类
var Basketball = function() {
    this.intro = '篮球盛行于美国';
}
Basketball.prototype = {
    getMember: function() {
        console.log('每个队伍需要5名队员');
    },
    getBallSize: function() {
        console.log('篮球很大');
    }
}

// 足球基类
var Football = function() {
    this.intro = '足球在世界范围内很流行';
}
Football.prototype = {
    getMember: function() {
        console.log('每个队伍需要11名队员');
    },
    getBallSize: function() {
        console.log('足球很大');
    }
}

// 网球基类
var Tennis = function() {
    this.intro = '每年有很多网球系列赛';
}
Tennis.prototype = {
    getMember: function() {
        console.log('每个队伍需要1名队员');
    },
    getBallSize: function() {
        console.log('足球很小');
    }
}

// 运动工厂
var SportsFactory = function(name) {
    switch(name) {
        case 'NBA':
            return new Basketball();
        case 'wordCup':
            return new Football();
        case 'FrenchOpen':
            return new Tennis();
    }
}

// 当你想踢足球时，只需要告诉店员我要买个足球即可。
// 你使用这个商店工厂时仅仅需要记住 SportsFactory 这个工厂对象就好了。

var football = SportsFactory('wordCup');
console.log(football);
console.log(football.intro);
football.getMember();
```

# Factory 使用场景

① jQuery - $('div')

② React.createElement 创建虚拟dom

③ vue 异步组件

## Factory - jQuery

```js
class jQuery {
    constructor(selector){
        let slice = Array.prototype.slice;
        let dom = slice.call(document.querySelectorAll(selector));
        let len = dom ? dom.length : 0;
        for (let i = 0; i < len; i++) {
            this[i] = dom[i];
        }
        this.length = len;
        this.selector = selector || "";
    }
    append(node) {
    
    }
    addClass(name) {
    
    }
    html(data) {
    
    }
    // 此处省略若干API
}
// 工厂函数
window.$ = function(selector) {
    // 工厂模式
    return new jQuery(selector)
}

var $p = $('p');
console.log($p);
console.log($p.addClass)
```

- $('div') 和 new $('div') 有何区别 ？

- 第一：书写麻烦，jQuery 的链式操作将成为噩梦

- 第二：一旦 jQuery 名字变化，将是灾难性的

## Factory - React.createElement

**jsx模板**

```js
var profile = <div>
    <img src="avator.png" className="profile"/>
    <h3>{[user.firstName, user.lastName].join(' ')}</h3>
</div>;
```

**编译完成后**

```
var profile = React.createElement('div', null, 
  React.createElement('img', {src: "avator.png", className: "profile"}); 
  React.createElement('h3', null, [user.firstName, user.lastName].join(" "));  
);
```

React.createElement 函数`创建虚拟dom`

```js
class Vnode(tag, attrs, children) {
    // ....
}

React.createElement = function(tag, attrs, children) {
    // 工厂模式
    return new Vnode(tag, attrs, children)
}
```

## Factory - vue 异步组件

```js
Vue.component('async-example', function(resolve, reject) {
    setTimeout(function() {
        resolve({
            template: '<div> I am async! </div>'
        })
    }, 1000)
})
```

# Factory 设计原则验证

- 构造函数和创建者分离

- 符合开放封闭原则