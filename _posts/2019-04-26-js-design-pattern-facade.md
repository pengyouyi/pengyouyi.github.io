---
layout: post
title: js设计原则-外观模式
tags:
- design-pattern
categories: JS
description: js设计原则-外观模式
---

# 外观模式-Facade

# Facade 介绍

**外观模式（ Facade ）：**为一组复杂的子系统接口提供一个更高级的统一接口，通过这个接口使得对子系统接口的访问更容易。

<div class="rd">
    <img src="/assets/images/2019/4-5-6/4-26-1.png" alt="">
</div>

# Facade 示例 & UML

⓵ 去医院看病，接待员去挂号、门诊、划价、取药

⓶ 去餐厅点菜，“套餐服务”。

⓷ 浏览器兼容

<div class="rd">
    <img src="/assets/images/2019/4-5-6/4-26-2.png" alt="">
</div>

# Facade 使用场景

外观模式可以简化底层接口复杂性，也可以解决浏览器兼容性问题。

```js
// 外观模式实现，浏览器绑定事件
function addEvent(dom, type, fn) {
    if (dom.addEventListener) {
        dom.addEventListener(type, fn, false);
    } else if (dom.attachEvent) {
        dom.attachEvent('on' + type, fn);
    } else  {
        dom['on' + type] = fn;
    }
}

// 
var btn = document.getElementById('btn);
addEvent(btn, 'click', function() {
    console.log('绑定第一个事件')
})
```

```js
function bindEvent(elem, type, selector, fn) {
    if (fn == null) {
        fn = selector;
        selector = null
    }
    // ***
}

// 调用
bindEvent(elem, 'click', '#demo', fn);
bindEvent(elem, 'click', fn);
```

# Facade 设计原则验证

- 不符合单一职责原则和开放封闭原则，因此谨慎使用，不可滥用
