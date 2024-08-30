---
layout: post
title: Sass、Less 以及 CSS工程化、CSS优化
tags:
- Interview
- CSS-basic
- optimize
categories: CSS
description: Sass、Less 以及 CSS工程化、CSS优化
---

# Sass、Less 以及 CSS工程化、CSS优化

# less、sass，postCss 处理器
★★★
**CSS预处理器/后处理器是什么？为什么要使用它们？**

> `预处理器`， 如：sass，less，stylus，用来预编译 Sass 或 less，增强了 css 代码的复用性，还有层级、mixin、变量、循环、函数等，具有很方便的 UI 组件模块化开发能力，极大的提高工作效率。    

> `后处理器`， 如： postCss，通常是在完成的样式表中根据 css 规范处理 css，让其更加有效。目前最常做的是给 css 属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。  

css 预处理器为 css 增加一些编程特性，无需考虑浏览器的兼容问题，可以在 CSS 中使用变量，简单的逻辑程序，函数等在编程语言中的一些基本的性能，可以让 css 更加的简洁，增加适应性以及可读性，可维护性等。

其它 css 预处理器语言：Sass（Scss）, Less, Stylus, Turbine, Swithch css, CSS Cacheer, DT Css。

**使用原因：**

- 结构清晰， 便于扩展  
- 可以很方便的屏蔽浏览器私有语法的差异  
- 可以轻松实现多重继承  
- 完美的兼容了 CSS 代码，可以应用到老项目中  

# 对 CSS 工程化的理解
★★
CSS 工程化是为了解决以下问题：

1. **宏观设计：**CSS 代码如何组织、如何拆分、模块结构怎样设计？  
2. **编码优化：**怎样写出更好的 CSS？  
3. **构建：**如何处理我的 CSS，才能让它的打包结果最优？  
4. **可维护性：**代码写完了，如何最小化它后续的变更成本？如何确保任何一个同事都能轻松接手？  

以下三个方向都是时下比较流行的、普适性非常好的 CSS 工程化实践：

> ❶ 预处理器：Less、 Sass 等；  

> ❷ 重要的工程化插件： PostCss；  

> ❸ Webpack loader 等 。  

基于这三个方向，可以衍生出一些具有典型意义的子问题，这里我们逐个来看：

## 预处理器 Sass、Less

**（1）预处理器：为什么要用预处理器？它的出现是为了解决什么问题？**

预处理器，其实就是 CSS 世界的“轮子”。预处理器支持我们写一种类似 CSS、但实际并不是 CSS 的语言，然后把它编译成 CSS 代码：

> 类 CSS 代码  ->  预处理器  ->  CSS 代码

那为什么写 CSS 代码写得好好的，偏偏要转去写“类 CSS”呢？这就和本来用 JS 也可以实现所有功能，但最后却写 React 的 jsx 或者 Vue 的模板语法一样——为了爽！要想知道有了预处理器有多爽，首先要知道的是传统 CSS 有多不爽。随着前端业务复杂度的提高，前端工程中对 CSS 提出了以下的诉求：

1. 宏观设计上：我们希望能优化 CSS 文件的目录结构，对现有的 CSS 文件实现复用；  
2. 编码优化上：我们希望能写出结构清晰、简明易懂的 CSS，需要它具有一目了然的嵌套层级关系，而不是无差别的一铺到底写法；我们希望它具有变量特征、计算能力、循环能力等等更强的可编程性，这样我们可以少写一些无用的代码；  
3. 可维护性上：更强的可编程性意味着更优质的代码结构，实现复用意味着更简单的目录结构和更强的拓展能力，这两点如果能做到，自然会带来更强的可维护性。  

这三点是传统 CSS 所做不到的，也正是预处理器所解决掉的问题。预处理器普遍会具备这样的特性：

- 嵌套代码的能力，通过嵌套来反映不同 css 属性之间的层级关系；  
- 支持定义 css 变量；  
- 提供计算函数；  
- 允许对代码片段进行 extend 和 mixin；  
- 支持循环语句的使用；  
- 支持将 CSS 文件模块化，实现复用。  

## 后处理器 PostCss

**（2）PostCss：PostCss 是如何工作的？我们在什么场景下会使用 PostCss？**

> 旧的 CSS 代码  ->  PostCss  ->  新的 CSS 代码

它和预处理器的不同就在于，预处理器处理的是 类CSS，而 PostCss 处理的就是 CSS 本身。Babel 可以将高版本的 JS 代码转换为低版本的 JS 代码。PostCss 做的是类似的事情：它可以编译尚未被浏览器广泛支持的先进的 CSS 语法，还可以自动为一些需要额外兼容的语法增加前缀。更强的是，由于 PostCss 有着强大的插件机制，支持各种各样的扩展，极大地强化了 CSS 的能力。

PostCss 在业务中的使用场景非常多：

- 提高 CSS 代码的可读性：PostCss 其实可以做类似预处理器能做的工作；  
- 当我们的 CSS 代码需要适配低版本浏览器时，PostCss 的 Autoprefixer 插件可以帮助我们自动增加浏览器前缀；  
- 允许我们编写面向未来的 CSS：PostCss 能够帮助我们编译 CSS next 代码；  

## Webpack 处理 CSS

**（3）Webpack 能处理 CSS 吗？如何实现？**

**Webpack 能处理 CSS 吗：**

Webpack 在裸奔的状态下，是不能处理 CSS 的，Webpack 本身是一个面向 JavaScript 且只能处理 JavaScript 代码的模块化打包工具；
Webpack 在 loader 的辅助下，是可以处理 CSS 的。

**如何用 Webpack 实现对 CSS 的处理：**

- Webpack 中操作 CSS 需要使用的两个关键的 loader：css-loader 和 style-loader
- 注意，答出“用什么”有时候可能还不够，面试官会怀疑你是不是在背答案，所以你还需要了解每个 loader 都做了什么事情：

    + css-loader：导入 CSS 模块，对 CSS 代码进行编译处理；
    + style-loader：创建 style 标签，把 CSS 内容写入标签。

在实际使用中，css-loader 的执行顺序一定要安排在 style-loader 的前面。因为只有完成了编译过程，才可以对 css 代码进行插入；若提前插入了未编译的代码，那么 webpack 是无法理解这坨东西的，它会无情报错。

# CSS 优化和提高性能的方法有哪些？
★★

**加载性能：**

（1）css 压缩：将写好的 css 进行打包压缩，可以减小文件体积。  
（2）css 单一样式：当需要下边距和左边距的时候，很多时候会选择使用 margin:top 0 bottom 0；但 margin-bottom:bottom; margin-left:left;执行效率会更高。  
（3）减少使用 @import，建议使用 link，因为后者在页面加载时一起加载，前者是等待页面加载完成之后再进行加载。  

**选择器性能：**

（1）关键选择器（key selector）。选择器的最后面的部分为关键选择器（即用来匹配目标元素的部分）。CSS选择符是从右到左进行匹配的。当使用后代选择器的时候，浏览器会遍历所有子元素来确定是否是指定的元素等等；  
（2）如果规则拥有 ID 选择器作为其关键选择器，则不要为规则增加标签。过滤掉无关的规则（这样样式系统就不会浪费时间去匹配它们了）。  
（3）避免使用通配规则，如 *{} 计算次数惊人，只对需要用到的元素进行选择。  
（4）尽量少的去对标签进行选择，而是用 class。  
（5）尽量少的去使用后代选择器，降低选择器的权重值。后代选择器的开销是最高的，尽量将选择器的深度降到最低，最高不要超过三层，更多的使用类来关联每一个标签元素。  
（6）了解哪些属性是可以通过继承而来的，然后避免对这些属性重复指定规则。  

**渲染性能：**

（1）慎重使用高性能属性：浮动、定位。  
（2）尽量减少页面重排、重绘。  
（3）去除空规则：｛｝。空规则的产生原因一般来说是为了预留样式。去除这些空规则无疑能减少 css 文档体积。  
（4）属性值为0时，不加单位。  
（5）属性值为浮动小数0.**，可以省略小数点之前的0。  
（6）标准化各种浏览器前缀：带浏览器前缀的在前。标准属性在后。  
（7）不使用 @import 前缀，它会影响 css 的加载速度。  
（8）选择器优化嵌套，尽量避免层级过深。  
（9）css 雪碧图，同一页面相近部分的小图标，方便使用，减少页面的请求次数，但是同时图片本身会变大，使用时，优劣考虑清楚，再使用。  
（10）正确使用 display 的属性，由于 display 的作用，某些样式组合会无效，徒增样式体积的同时也影响解析性能。  
（11）不滥用 web 字体。对于中文网站来说 WebFonts 可能很陌生，国外却很流行。web fonts 通常体积庞大，而且一些浏览器在下载 web fonts 时会阻塞页面渲染损伤性能。  

**可维护性、健壮性：** 

（1）将具有相同属性的样式抽离出来，整合并通过 class 在页面中进行使用，提高 css 的可维护性。  
（2）样式与内容分离：将 css 代码定义到外部 css 中。  
