---
layout: post
title: MVVM设计模式-观察者模式
tags:
- design-pattern
- vue
categories: Framework
description: MVVM设计模式
---

# MVVM设计模式

MVVM框架采用的设计模式是“观察者模式”

<div class="rd">
    <img src="/assets/images/2018/7-8-9/7-23-1.png" alt="">
</div>

# vue和MVVM

Vue.js 关于双向绑定的一些实现细节：

Vue.js 是采用 Object.defineProperty 的 getter 和 setter，并结合观察者模式来实现数据绑定的。当把一个普通 Javascript 对象传给 Vue 实例来作为它的 data 选项时，Vue 将遍历它的属性，用 Object.defineProperty 将它们转为 getter/setter。用户看不到 getter/setter，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化。


<div class="rd">
    <img src="/assets/images/2018/7-8-9/7-23-2.png" alt="">
</div>

> Observer 数据监听器，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者，内部采用Object.defineProperty的getter和setter来实现。

> Dep 消息订阅器，内部维护了一个数组，用来收集订阅者（Watcher），数据变动触发notify 函数，再调用订阅者的 update 方法。

> Watcher 订阅者， 作为连接 Observer 和 Compile 的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数。

> Compile 指令解析器，它的作用对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数。


当执行 new Vue() 时，Vue 就进入了初始化阶段，一方面Vue 会遍历 data 选项中的属性，并用 Object.defineProperty 将它们转为 getter/setter，实现数据变化监听功能；

另一方面，Vue 的指令编译器Compile 对元素节点的指令进行扫描和解析，初始化视图，并订阅 Watcher 来更新视图， 此时 Watcher 会将自己添加到消息订阅器中(Dep), 初始化完毕。

当数据发生变化时，Observer 中的 setter 方法被触发，setter 会立即调用Dep.notify()，Dep 开始遍历所有的订阅者，并调用订阅者的 update 方法，订阅者收到通知后对视图进行相应的更新。

# mvvm 源码分析

mvvm
  - index.html
  - js
      - index.js
      - watcher.js
      - observer.js
      - compile.js


## mvvm/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>源码分析</title>
</head>
<style>
    #app {
        text-align: center;
    }
</style>
<body>
    <div id="app">
        <h2>{{title}}</h2>
        <input v-model="name">
        <h1>{{name}}</h1>
        <button v-on:click="clickMe">click me!</button>
    </div>
</body>
<script src="js/observer.js"></script>
<script src="js/watcher.js"></script>
<script src="js/compile.js"></script>
<script src="js/index.js"></script>
<script type="text/javascript">

     new Vue({
         el: '#app',
         data: {
             title: 'vue code',
             name: 'imooc',
         },
         methods: {
             clickMe: function () {
                 this.title = 'vue code click';
             },
         },
         mounted: function () {
             window.setTimeout(() => {
                 this.title = 'timeout 1000';
             }, 1000);
         },
});


</script>
</html>
```

## mvvm/js/index.js

```js
function Vue (options) {
    var self = this;
    this.data = options.data;
    this.methods = options.methods;

    Object.keys(this.data).forEach(function (key) {
        self.proxyKeys(key);
    });

    observe(this.data);
    new Compile(options.el, this);
    options.mounted.call(this); // 所有事情处理好后执行mounted函数
}

Vue.prototype = {
    proxyKeys: function (key) {
        var self = this;
        // this指Vue实例vm, 即实现将data的属性代理到vm上
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get: function () {
                return self.data[key];
            },
            set: function (newVal) {
                self.data[key] = newVal;
            },
        });
    },
};
```

## mvvm/js/observe.js

```js
function Observer (data) {
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    walk: function (data) {
        var self = this;
        Object.keys(data).forEach(function (key) {
            self.defineReactive(data, key, data[key]);
        });
    },
    defineReactive: function (data, key, val) {
        var dep = new Dep();
        var childObj = observe(val);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function getter () {
                if (Dep.target) {  // Dep.target是指观察者实例 Watcher
                    dep.addSub(Dep.target);
                }
                return val;
            },
            set: function setter (newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                dep.notify();
            },
        });
    },
};

function observe (value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
}

function Dep () {
    this.subs = [];
}
Dep.prototype = {
    addSub: function (sub) {
        this.subs.push(sub);
    },
    notify: function () {
        this.subs.forEach(function (sub) {
            sub.update();
        });
    },
};
Dep.target = null;
```

observe()在vue实例化的时候被调用。

- Observer 把所有的data遍历一遍，调用Object.defineProperty()；

- 识别子对象是否嵌套，如果是就递归处理，如果不是就直接定义这个对象；

- get 数据读取的时候，它来判断是不是要给 Dep【观察者列表】 添加一个观察者 【Watcher】，

- set 数据改变，通知 Dep。执行dep.notify()，Dep里面每一个 Watcher 执行 update()回调函数。

## mvvm/js/watcher.js

```js
function Watcher (vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.value = this.get();  // 将自己添加到订阅器的操作
}

Watcher.prototype = {
    update: function () {
        this.run();
    },
    run: function () {
        var value = this.vm.data[this.exp];
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    get: function () {
        Dep.target = this;  // 缓存自己
        var value = this.vm.data[this.exp];  // 强制执行监听器里的get函数
        Dep.target = null;  // 释放自己
        return value;
    },
};
```

## mvvm/js/compile.js

```js
function Compile (el, vm) {
    this.vm = vm;
    this.el = document.querySelector(el);
    this.fragment = null;
    this.init();
}

Compile.prototype = {
    init: function () {
        if (this.el) {
            this.fragment = this.nodeToFragment(this.el);
            this.compileElement(this.fragment);
            this.el.appendChild(this.fragment);
        } else {
            console.log('Dom元素不存在');
        }
    },
    nodeToFragment: function (el) {
        var fragment = document.createDocumentFragment();
        var child = el.firstChild;
        while (child) {
            // 将Dom元素移入fragment中
            fragment.appendChild(child);
            child = el.firstChild;
        }
        return fragment;
    },
    compileElement: function (el) {
        var childNodes = el.childNodes;
        var self = this;
        [].slice.call(childNodes).forEach(function (node) {
            var reg = /\{\{(.*)\}\}/;
            var text = node.textContent;

            if (self.isElementNode(node)) {
                self.compile(node);
            } else if (self.isTextNode(node) && reg.test(text)) {
                self.compileText(node, reg.exec(text)[1]);
            }

            if (node.childNodes && node.childNodes.length) {
                self.compileElement(node);
            }
        });
    },
    compile: function (node) {
        var nodeAttrs = node.attributes;
        var self = this;
        Array.prototype.forEach.call(nodeAttrs, function (attr) {
            var attrName = attr.name;
            if (self.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);
                if (self.isEventDirective(dir)) {  // 事件指令
                    self.compileEvent(node, self.vm, exp, dir);
                } else {  // v-model 指令
                    self.compileModel(node, self.vm, exp, dir);
                }
                node.removeAttribute(attrName);
            }
        });
    },
    compileText: function (node, exp) {
        var self = this;
        var initText = this.vm[exp];
        this.updateText(node, initText);
        new Watcher(this.vm, exp, function (value) {
            self.updateText(node, value);
        });
    },
    compileEvent: function (node, vm, exp, dir) {
        var eventType = dir.split(':')[1];
        var cb = vm.methods && vm.methods[exp];

        if (eventType && cb) {
            node.addEventListener(eventType, cb.bind(vm), false);
        }
    },
    compileModel: function (node, vm, exp, dir) {
        var self = this;
        var val = this.vm[exp];
        this.modelUpdater(node, val);
        new Watcher(this.vm, exp, function (value) {
            self.modelUpdater(node, value);
        });

        node.addEventListener('input', function (e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }
            self.vm[exp] = newValue;
            val = newValue;
        });
    },
    updateText: function (node, value) {
        node.textContent = typeof value === 'undefined' ? '' : value;
    },
    modelUpdater: function (node, value, oldValue) {
        node.value = typeof value === 'undefined' ? '' : value;
    },
    isDirective: function (attr) {
        return attr.indexOf('v-') == 0;
    },
    isEventDirective: function (dir) {
        return dir.indexOf('on:') === 0;
    },
    isElementNode: function (node) {
        return node.nodeType == 1;
    },
    isTextNode: function (node) {
        return node.nodeType == 3;
    },
};
```

# 更多-more

- [Vue.js 和 MVVM 小细节](https://www.cnblogs.com/onepixel/p/6034307.html)

- [从vue源码看观察者模式](https://blog.csdn.net/github_36369819/article/details/79201314)