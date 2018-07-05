---
layout: post
title: requirejs和seajs的区别
tags:
- requirejs
- seajs
categories: Framework
description: requirejs和seajs的区别
---
# requirejs和seajs的区别

**语法**: AMD 推崇依赖前置, CMD 推崇依赖就近
```js
// AMD 默认推荐的是  
define(['./a', './b'], function(a, b) { // 依赖必须一开始就写好  
    a.doSomething()  
    // 此处略去 100 行  
    b.doSomething()  
    ...  
})

// CMD  
define(function(require, exports, module) {  
    var a = require('./a')  
    a.doSomething()  
    // 此处略去 100 行  
    var b = require('./b') // 依赖可以就近书写  
    b.doSomething()  
    // ...   
})
```


|区别| RequireJS(除了是模块加载器，还是文件加载器) | seaJS|
|----------------------------------------|-------|-----|
|**遵循的规范不同**|遵循 AMD（异步模块定义）规范，预执行，相对来讲解析模块时间短，停顿次数少。也就是RequireJS会`先尽早地执行(依赖)模块`, 相当于所有的require都被提前了, 而且模块执行的顺序也不一定100%按照代码中出现的顺序。|遵循 CMD （通用模块定义）规范，可以像   Node.js  一般书写模块代码 ，可以说是浏览器端的node.js懒执行，解析模块时间长，停顿次数多，但是，执行模块的顺序也是严格按照模块在代码中`出现(require)的顺序`|
|**定位**|想成为浏览器端的模块加载器，同时也想成为 Rhino / Node 等环境的模块加载器|则专注于 Web 浏览器端，同时通过 Node 扩展的方式可以很方便跑在 Node 环境中|
|**推广理念**|RequireJS 在尝试让第三方类库修改自身来支持 RequireJS，目前只有少数社区采纳|Sea.js 不强推，采用自主封装的方式来“海纳百川”，目前已有较成熟的封装策略|
|**代码质量有差异**|RequireJS 是没有明显的 bug，|SeaJS 是明显没有 bug
|**插件机制**|RequireJS 采取的是在源码中预留接口的形式，插件类型比较单一|Sea.js 采取的是通用事件机制，具有丰富的可扩展接口，插件类型更丰富|



# 更多-more
[http://zccst.iteye.com/blog/2084545](http://zccst.iteye.com/blog/2084545)

























