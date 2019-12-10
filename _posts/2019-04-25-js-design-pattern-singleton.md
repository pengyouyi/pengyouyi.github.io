---
layout: post
title: js设计原则-单例模式
tags:
- design-pattern
categories: JS
description: js设计原则-单例模式
---

# 单例模式-Singleton

# Singleton 介绍

**单例模式（ Singleton ）：**又被称为单体模式，是`只允许实例化一次的对象类`。

- 系统中被唯一使用

- 一个类只要一个实例

# Singleton 示例 & UML

- 登录框

- 购物车

<div class="rd">
    <img src="/assets/images/2019/4-5-6/4-25-1.png" alt="">
</div>

**说明**

- 单例模式需要用到Java的特性（private）

- ES6 中没有（typescript除外）

- 只能用Java代码来演示UML图的内容

# Singleton 代码

```js
// JS使用单例模式
class SingleObject {
    login() {
        console.log('login...')
    }
}

SingleObject.getInstance = (function() {
    let instance
    return function() {
        if (!instance) {
           instance = new SingleObject(); 
        }
        return instance
    }
})()
```

# Singleton 使用场景

单例模式常用来定义`命名空间`，单例模式还可以`管理代码库的各个模块`。

**命名空间解决这么一类问题：**为了让代码更易懂，人们常常用单词或者拼音定义变量或者方法，但由于人们可用的单词或者汉字拼音是有限的，所以不同的人定义的变量使用的单词名称很有可能重复，此时就需要用命名空间来约束每个人定义的变量来解决这类问题。

➊ jQuery 只有一个 $

➋ 模拟登录框、购物车（和登录框类似）

➌ vuex 和 redux 中的 store、state

## jQuery 只有一个 $

```js
if (window.jQuery != null) {
    return window.jQuery;
} else {
    // 初始化
}
```

### 自定义 namespace

```js
var Peng = {
    g: function(id) {
        return document.getElementById(id);
    },
    css: function(id, key, value) {
        return this.g(id).style[key] = value;
    }
   //  ...
}
```

## 模拟login

```js
class LoginForm {
    constructor() {
    	this.state = 'hide';
    }
    show() {
    	if (this.state === 'show') {
    		alert('已经显示');
    		return;
    	}
    	this.state = 'show';
    	console.log('登录框已显示');
    }
    hide() {
    	if (this.state === 'hide') {
    		alert('已经隐藏');
    		return;
    	}
    	this.state = 'hide';
    	console.log('登录框已隐藏');
    }
}

LoginForm.getInstance = (function() {
    let instance;
    return function() {
    	if (!instance) {
            instance = new LoginForm();
    	}
    	return instance;
    }
})()

// 一个页面中调用登录框
let login1 = LoginForm.getInstance();
login1.show();

// 另一个页面中调用登录框
let login2 = LoginForm.getInstance();
login2.hide();

console.log('login1 === login2', login1 === login2)
```

## vuex和redux中的store、state

# Singleton 设计原则验证

- 符合单一职责原则，只实例化唯一的对象

- 没法具体开放封闭原则，但绝不违反开放封闭原则