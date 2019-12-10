---
layout: post
title: js设计原则-适配器模式
tags:
- design-pattern
categories: JS
description: js设计原则-适配器模式
---

# 适配器模式-Adapter

# Adapter 介绍

**适配器模式（ Adapter ）：**将一个类（对象）的接口（属性或者方法）转化成另外一个接口，以满足用户需求，使类（对象）之间的`接口不兼容`问题通过适配器得以解决。

# Adapter 示例 & UML

➊ 电源插头转换器

➋ 电源电压转换器

<div class="rd">
    <img src="/assets/images/2019/4-5-6/4-27-1.png" alt="">
</div>

# Adapter 代码

```js
// 不能使用的插头
class Adapte {
	specificRequest() {
		return '德国标准的插头';
	}
}

// 中间转换器
class Target {
	constructor() {
		this.adapte = new Adapte();
	}
	request() {
		let info = this.adapte.specificRequest();
		return `${info} -> 转换器 -> 中国标准的插头`
	}
}

// 测试
let target = new Target();
let res = target.request();
console.log(res);
```

# Adapter 使用场景

① 封装旧接口
② vue computed

在传统设计模式中，适配器模式往往是适配两个类接口不兼容的问题，然而在 JS 中，适配器的应用更广，比如适配两个代码库、适配参数对象、适配前后端数据等等。

## ajax封装

```js
// 自己封装的 ajax ,使用方法如下：
ajax({
    url: '/getData',
    type: 'Post',
    dataType: 'json',
    data: {
        id: '123'
    }
})
.done(function() {})

// 但是因为历史原因，代码中全是：
// $.ajax({})
```

```js
// 做一层适配器
var $ = {
    ajax: function(options) {
        return ajax(options);
    }
}
```

## vue computed

```html
<div id="example">
    <p> Original message : "{{message}}"</p>
    <p>Computed reversed message : "{{reversedMessage}}"</p>
</div>
```

```js
var vm = new Vue({
    el: '#example',
    data: {
        message: 'Hello'
    },
    computed: {
        // 计算属性的 getter
        reversedMessage: function() {
        // this 指向 vm 实例
        return this.message.split('').reverse().join('');
        }
    }
})
```


# Adapter 设计原则验证

- 将旧接口和使用者进行分离

- 符合开放封闭原则