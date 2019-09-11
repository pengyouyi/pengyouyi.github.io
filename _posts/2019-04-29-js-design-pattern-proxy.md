---
layout: post
title: js设计原则-代理模式
tags:
- design-pattern
categories: JS
description: js设计原则-代理模式
---

# 代理模式-Proxy

# Proxy 介绍

- 使用者`无权`访问目标对象

- 中间加代理，通过代理做授权和控制

# Proxy 示例 & UML

➊ 上网翻墙

➋ 公司内网代理

➌ 明星经纪人

<div class="rd">
    <img src="/assets/images/2019/4-5-6/4-29-1.png" alt="">
</div>

# Proxy 代码

```js
class RealImg {
	constructor(fileName) {
		this.fileName = fileName;
		this.loadFromDisk(); // 初始化即从硬盘中加载，模拟
	}
	display() {
        console.log('display...' + this.fileName);
	}
	loadFromDisk() {
		console.log('loading...' + this.fileName)
	}
}

class ProxyImg {
	constructor(fileName) {
		this.realImg = new RealImg(fileName);
	}
	display() {
		this.realImg.display();
	}
}

// 测试
let proxyImg = new ProxyImg('1.png');
proxyImg.display();
```

# Proxy 场景

➊ 网页事件代理

➋ jq 的 proxy

➌ ES6 Proxy

➍ 浏览器跨域

## 网页事件代理-Web Event

```js
<div id="demo">
	<a href="#">a1</a>
	<a href="#">a2</a>
	<a href="#">a3</a>
	<a href="#">a4</a>
</div>
<button>点击增加一个 a 标签</button>

<script>
	var demo = document.getElementById("demo");
	demo.addEventListener('click', function(e) {
		var target = e.target;
		if (target.nodeName === 'A') {
			alert(target.innerHTML);
		}
	})
</script>
```

## ES6 Proxy

```js
// 明星
let star = {
	name: '张XXX',
	age: 25,
	phone: '18300001111'
}

// 经纪人
let agent = new Proxy(star, {
	get: function(target,key) {
		if (key === 'phone') {
			// 返回经纪人自己的手机号
			return '18312341234'
		}
		if (key === 'price') {
			// 明星不报价，经纪人报价
			return 120000
		}
		return target[key];
	},
	set: function(target, key, val) {
		if (key === 'customPrice') {
			if (val < 100000) {
				// 最低 10W
				throw new Error('价格太低')
			} else {
				target[key] = val;
				return true
			}
		}
	}
})

console.log(agent.name);
console.log(agent.age);
console.log(agent.phone);
console.log(agent.price);

agent.customPrice = 150000;
console.log(agent.customPrice);
```

# Proxy 设计原则验证

- 代理类和目标类分离，隔离开目标类和使用者

- 符合开放封闭原则

# 代理 & 适配器 & 装饰器 对比-Contrast

## 代理模式 VS 适配器模式

> 适配器模式：提供一个不同的接口（如不同版本的插头）

> 代理模式：提供一模一样的接口

## 代理模式 VS 装饰器模式

> 装饰器模式：扩展功能，原有功能不变且可直接使用

> 代理模式：显示原有功能，但是经过限制或者阉割之后的