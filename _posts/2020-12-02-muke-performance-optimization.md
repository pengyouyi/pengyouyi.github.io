---
layout: post
title: 慕课网-前端性能优化企业级解决方案 6大角度+大厂视野实现项目全面优化
tags:
- Interview
- imooc
- optimize
categories: other
description: 慕课网-前端性能优化企业级解决方案 6大角度+大厂视野实现项目全面优化
---

# 第2章 性能优化的指标和工具-two

## why 为什么要进行Web性能优化【企业刚需】

性能 - Web 网站和应用的支柱

流量 - 搜索 - 转换率 - 用户体验

阅读：Amazon 发现每 100ms 延迟导致 1% 的销量损失

**寻找性能瓶颈**

- 了解性能指标 - 多快才算快  
- 利用测量工具和APIs  
- 优化问题，重新测量（迭代）  

**移动端挑战多**

- 设备硬件，网速，屏幕尺寸，交互方式  
- 用户缺少耐心，>3秒加载导致53%的跳出率（bounce rate）  
- 持续增长的移动用户和移动电商业务  

## 性能指标和优化目标-index【了解行业标准】

chrome 浏览器 检查中的 `Network、Lighthouse 、Performace`

优化所有的异步请求在1秒内返回，可以做压缩，如果还不行，就需要前端交互，比如做加载动画。


性能优化 - 加载

- 理解加载瀑布图【Network-Waterfall】  
- 基于 HAR 存储于重建性能信息  
- 速度指数（Lighthouse - Speed Index）【4s】  
- 重要测量指标  


性能优化 - 加载

- Speed Index【Lighthouse - Speed Index (4s)】  
- TTFB【Waterfall-Waiting】  
- 页面加载时间【Waterfall-Load 红线】  
- 首次渲染【Lighthouse - First Contentful Paint】  

性能优化 - 响应

- 交互动作的反馈时间  
- 动画帧率 FPS  
- 异步请求的完成时间  

## RAIL 测量模型【黄金指南】

**什么是 RAIL ？**

- Response 响应【网站给用户的响应体验】 
- Animation 动画   
- Idle 空闲【让浏览器有足够的空闲时间】  
- Load 加载【用户白屏时间】

**RAIL 的目标**

让良好的用户体验成为性能优化的目标  

**RAIL 评估标准**

- 响应：处理事件应在50ms以内完成  
- 动画：每10ms产生一帧  
- 空闲：尽可能增加空闲时间  
- 加载：在5s内完成内容加载并可以交互  

**性能测量工具**

- Chrome DevTools 开发调试、性能评测  
- Lighthouse 网站整体质量评估  
- WebPageTest 多测试地点、全面性能报告  

## WebPageTest 多测试地点、全面性能报告【快捷好用的在线分析工具】

[https://webpagetest.org/](https://webpagetest.org/)

**解读 WebpageTest 的报告**

- waterfall chart 请求瀑布图  
- first view 首次访问  
- repeat view 二次访问  

**WebPageTest**

- 在线进行网站性能分析, WebPageTest 多测试地点、全面性能报告  
- 如何本地部署 WebPageTest 工具  

## Lighthouse 网站整体质量评估【一站式全面呈现性能指标】

## 使用 Chrome DevTools 分析性能【最大法宝】

 Network
 Performace
 
 
## 常用的性能测量 APIs【不可不知，打开精细化、自定义测量的大门】 

```js
<body>
  <div></div>
  <script>
    // 计算一些关键的性能指标
    // load 事件后触发
    window.addEventListener('load',() => {
        // Time to Interactive 可交互时间
        let timing = performance.getEntriesByType('navigation')[0];
        let tti = timing.domInteractive - timing.fetchStart;
        console.log("TTI: " + diff);
    })
  <script/>
</body>
</html>
```

**更多的性能指标如何计算**

```js
DNS 解析耗时: domainLookupEnd - domainLookupStart
TCP 连接耗时: connectEnd - connectStart
SSL 安全连接耗时: connectEnd - secureConnectionStart
网络请求耗时 (TTFB): responseStart - requestStart
数据传输耗时: responseEnd - responseStart
DOM 解析耗时: domInteractive - responseEnd
资源加载耗时: loadEventStart - domContentLoadedEventEnd
First Byte时间: responseStart - domainLookupStart
白屏时间: responseEnd - fetchStart
首次可交互时间: domInteractive - fetchStart
DOM Ready 时间: domContentLoadEventEnd - fetchStart
页面完全加载时间: loadEventStart - fetchStart
http 头部大小： transferSize - encodedBodySize
重定向次数：performance.navigation.redirectCount
重定向耗时: redirectEnd - redirectStart
```

```js
// 观察长任务
const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        console.log(entry)
    }
})

observer.observe({entryTypes: ['longtask']})
```

```js
// 见面可见性的状态监听
let vEvent = 'visibilitychange';
if (document.webkitHidden != undefined) {
    // webkit prefix detected
    vEvent = 'webkitvisibilitychange';
}

function visibilityChanged() {
    if (document.hidden || document.webkitHidden) {
        console.log("Web page is hidden.")
    } else {
        console.log("Web page is visible.")
    }
}

document.addEventListener(vEvent, visibilityChanged, false);
```


```js
// 网络状态
var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
var type = connection.effectiveType;

function updateConnectionStatus() {
  console.log("Connection type changed from " + type + " to " + connection.effectiveType);
  type = connection.effectiveType;
}

connection.addEventListener('change', updateConnectionStatus);
```

# 第3章 渲染优化-three (与浏览器为友，共进退)

## 浏览器渲染原理和关键渲染路径-principle【大厂前端面试必考】

**浏览器的渲染流程**

JavaScript -> Style -> Layout -> Paint -> Composite

构建 DOM 对象
HTML -> DOM

构建 CSSOM 对象
CSS -> CSSOM

浏览器构建渲染树
DOM + CSSOM = Render Tree

## 回流与重绘, 如何避免布局抖动-thrashing

**布局（layouts）与绘制（paint）**

- 渲染树只包含网页需要的节点  
- 布局计算每个节点精确的位置和大小-“盒模型”  
- 绘制是像素化每个节点的过程  

**影响回流的操作**

- 添加/删除元素
- display:none  
- 移动元素位置  
- 操作 styles  
- offsetLeft,scrollLeft,clientWidth  
- 修改浏览器大小，字体  

**避免 layout thrashing 布局抖动**

- 避免回流  
- 读写分离

## 使用 FastDom【防止布局抖动的利器】

[https://github.com/wilsonpage/fastdom](https://github.com/wilsonpage/fastdom)

使用 FastDOM 批量对 DOM 的读写操作 

- 什么是 FastDom  
- 如何使用 FastDom 的 APIs 【measure读、mutate写】

```js
// 读
fastdom.measure(() => {
  console.log('measure');
});
// 写
fastdom.mutate(() => {
  console.log('mutate');
});

fastdom.measure(() => {
  console.log('measure');
});

fastdom.mutate(() => {
  console.log('mutate');
});
```

结果

```js
measure
measure
mutate
mutate
```

## 复合线程与图层-layers【深入渲染流水线的最后一站】

复合线程（compositor thread）与图层（layers）

**复合线程做什么？**

- 将页面拆分图层进行绘制再进行复合  
- 利用 DevTools 了解网页的图层拆分情况  
- 哪些样式仅影响复合  

**只触发复合，不触发布局和重绘 transform、opacity**

```
Position  transform: translate(npx, npx)
Scale     transform: scale(n)
Rotation  transform: ratate(ndeg)
Opacity   opacity: 0...1
```

## 避免重绘-repaint【必学，加速页面呈现】

**减少重绘的方案**

- 利用 DevTools 识别 paint 的瓶颈  
- 利用 CSS 的 `will-change` 属性 创造新的图层  
- 做动画的时候尽量使用 transform 而不是使用影响布局的 width 等  

## 高频事件防抖-debounce【解救页面卡顿的秘药】

```js
// 利用 Chrome DevTllos 打开时可以复现抖动的问题（pointer events）
window.addEventListener('pointermove', (e) => {
    let pos = e.clientX;
    console.log(pos)
})
```

防抖之后

```js
let ticking = false;
window.addEventListener('pointermove', (e) => {
    let pos = e.clientX;
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
        console.log(pos);
        ticking = false;
    }) 
})
```

# 第4章 代码优化-four (快来看看怎样写出真正高性能的代码)

## JS 开销和如何缩短解析时间-parsing【为什么我的JS运行慢】

**JS 开销在哪里？**

- 加载  
- 解析 & 编译  
- 执行    

**解决方案**

- Code splitting 代码拆分，按需加载  
- Tree shaking 代码减重  

**减少主线程工作量**

- 避免长任务  
- 避免超过 1kb 的行间脚本  
- 使用 RAF 和 rIC（requestIdleCallback） 进行时间调度  

★ 让用户知道开始访问网站的过程，减少白屏时间；  
★ 内容是不是有用的，加载一些文字或者图片；  
★ 什么时候可以开始交互了。  

## 配合 V8 有效优化代码【路走对了才能快】

**v8 编译原理**

拿到JS代码 -> 解析 -> 抽象语法树 -> 解释器 -> 优化编译

**抽象语法树**

- 源码 => 抽象语法树 => 字节码 Bytecode => 机器码  
- 编译过程会进行优化  
- 运行时可能发生反优化  

**V8 优化机制**

- 脚本流（正常流程是先下载，解析，执行；优化：脚本大的时候，下载的过程中同时解析）  
- 字节码缓存（使用频率高的缓存）  
- 懒解析（函数声明了，但是没有马上用，用的时候浏览器才会去解析）  


保存文件，在Node环境下运行
```
const {performance, PerformanceObserver} = require('perf_hooks');

const add = (a, b) => a+b;

const num1 = 1;
const num2 = 2;

performance.mark('start');

for(let i = 0; i < 10000000; i++) {
	add(num1, num2);
}

add(num1, 's');

for(let i = 0; i < 10000000; i++) {
	add(num1, num2);
}

performance.mark('end');

const observer = new PerformanceObserver((list) => {
	console.log(list.getEntries()[0]);
})
observer.observe({entryTypes: ['measure']});

performance.measure('测量1', 'start', 'end');
```

## 函数优化-Function optimization【必会】

**函数的解析方式**

- lazy parsing 懒解析 VS eager parsing 饥饿解析  
- 利用 [Optimize.js](https://github.com/nolanlawson/optimize-js) 优化初次加载时间  

test.js

```js
export default () => {
  const add = (a, b) => a + b;  // lazy parsing
  // const add = ((a, b) => a + b);  // 变成 饥饿解析的函数
  const num1 = 1;
  const num2 = 2;
  add(num1, num2);
}
```

## 对象优化-Object optimization【JS对象避坑地图】

**对象优化可以做哪些**

❶ 以相同顺序初始化对象成员，避免隐藏类的调整  
❷ 实例化后避免添加新属性  
❸ 尽量使用 Array 代替 array-like 对象  
❹ 避免读取超过数组从长度  
❺ 避免元素类型转换  

**以相同顺序初始化对象成员，避免隐藏类的调整**

good

```js
class RectArea { // HC0 
    constructor(l, w) {
        this.l = l; // HC1
        this.w = w; // HC2
    }
}

const rect1 = new RectArea(3,4); // 创建了隐藏类HC0, HC1, HC2
const rect2 = new RectArea(5,6); // 相同的对象结构，可复用之前的所有隐藏类
```

bad

```js
const car1 = {color: 'red'}; // HC0
car1.seats = 4; // HC1

const car2 = {seats: 2}; // 没有可复用的隐藏类，创建HC2
car2.color = 'blue'; // 没有可复用的隐藏类，创建HC3
```

**实例化后避免添加新属性**

bad

```js
const car1 = {color: 'red'}; // In-object 属性
car1.seats = 4; // Normal/Fast 属性，存储在property store里，需要通过描述数组间接查找 
```

**尽量使用 Array 代替 array-like 对象**

```js
Array.prototype.forEach.call(arrObj, (value, index) => { // 不如在真实数组上效率高
  console.log(`${ index }: ${ value }`);
});

const arr = Array.prototype.slice.call(arrObj, 0); // 转换的代价比影响优化小
arr.forEach((value, index) => {
  console.log(`${ index }: ${ value }`);
});
```

**避免读取超过数组的长度**

bad

```js
function foo(array) {
  for (let i = 0; i <= array.length; i++) { // 越界比较
    if(array[i] > 1000) { //  1.造成undefined与数进行比较 2.沿原型链的查找
        console.log(array[i]); // 业务上无效、出错
    }    
  }
}
```

**避免元素类型转换**

```js
const array = [3, 2, 1]; // PACKED_SMI_ELEMENTS

array.push(4.4); // PACKED_DOUBLE_ELEMENTS
```

## HTML 优化【必会】

**HTML 优化也重要**

- 减少 iframes 使用  
- 压缩空白符  
- 避免节点深层次级嵌套  
- 避免 table 布局  
- 删除注释  
- css & js 尽量外链  
- 删除元素默认属性  

**借助工具**

html-minifier  

## CSS 对性能的影响 【必会】

- 降低 CSS 对渲染的阻塞  
- 利用 GPU 进行完成动画  
- 使用 contain 属性  `contain: layout`  
- 字体使用 font-display 属性  

# 第5章 资源优化-five (经典性能优化解决方案)

## 资源的压缩与合并-compress【见效最明显的优化方法】

**为什么要压缩 & 合并**

- 减少 HTTP 请求数量  
- 减少请求资源的大小  

**HTML 压缩**

- 使用在线工具进行压缩  
- 使用 html-minifier 等 npm 工具  

**CSS 压缩**

- 使用在线工具进行压缩  
- 使用 clean-css 等 npm 工具  

**JS 压缩与混淆**

- 使用在线工具进行压缩  
- 使用 webpack 对 JS 在构建时压缩  

**css js 文件合并**

- 若干小文件，maybe。。。  
- 无冲突，服务相同的模块，OK  
- 优化加载，NO  

## 图片格式优化-image【多种图片格式，哪种最合适】

**图片优化方案**

- 图片格式  
- 图片大小  
- 适配不同屏幕的尺寸  
- 压缩  
- 资源优先级  
- 延迟加载  

**图片格式**

**jpeg/jpg**

- jpeg/jpg 的优点：压缩比高、画质保存好 
- jpeg/jpg 的使用场景：大图、色彩丰富的图  
- jpeg/jpg 的缺点：纹理、边缘锯齿

[jpeg/jpg 优化工具 https://github.com/imagemin/imagemin](https://github.com/imagemin/imagemin)

**PNG**

- PNG 的优点：做透明背景  
- PNG 的使用场景：logo
- PNG 缺陷：保留了很好的线条、纹理、边缘等细腻,所以体积较大

[PNG 图片优化工具](https://github.com/imagemin/imagemin-pngquant)

65%~80%

**WebP**

- WebP 的优点：跟 png 同样的质量，但压缩比率高
- 支持 WebP 的浏览器，兼容性不是很好  

## 图片加载优化-load【突破大型网站图片加载的瓶颈】

**图片的懒加载**

- 原生的图片懒加载方案 `<img loading="lazy">`  
- 第三方图片懒加载方案  
- verlok/lazyload
- yall.js
- Blazy

[https://github.com/Aljullu/react-lazy-load-image-component](https://github.com/Aljullu/react-lazy-load-image-component)

**使用渐进式图片**

- baseline JPEG : 图片加载一行显示一行
- progressive JPEG: 图片逐渐变清楚,低像素到高像素【用户体验更好】

**渐进式图片的解决方案**

- progressive-image  
- libjpeg  
- jpeg-recompress  
- ImageMagick  
- jpegtran  
- imagemin

**使用响应式图片**

- srcset 属性的使用  
- sizes 属性的使用  
- picture 的使用  

## 字体优化-font-family【千万不可忽略】

**什么是 FOIT 和 FOUT**

- 字体未下载完成时，浏览器隐藏或自动降级，导致字体闪烁  
- Flash Of Invisible Text  
- Flash Of UNstyled Text  

**使用 font-display【推荐】**

- auto  
- swap【尽早用默认字体展示出来，新字体下载完了替换，】  
- optional【100ms下载时间内，一旦浏览器做出选择，不会再替换】【手机端使用，推荐】  
- block【3s内不显示，再使用默认字体，字体下载成功后再替换】  
- fallback【block的优化;100ms内不显示，再使用默认字体，字体下载成功后再替换】【推荐】

```css
@font--face {
    font-family: ;
    font-style: normal;
    font-weight: 400;
    font-display: ballback
    src: ;
}
```

**使用 AJAX + Base64【图推荐】**

- 解决兼容性问题  
- 缺点：缓存问题

# 第6章 构建优化-six(揭开webpack性能优化的内幕)

## webpack 的优化配置【了解这些优化配置才敢说会用webpack】 

**Tree-shaking**

- 上下文未用到的代码（dead code）  
- 基于 ES6 import export  
- package.json 中配置 sideEffects  
- 注意 Babel 默认配置的影响  

**JS 压缩**

- webpack 4 后引入 uglifyjs-webpack-plugin  
- 支持 ES6 替换为 terser-webpack-plugin  
- 减小 JS 文件体积  

**作用域提升**

- 代码体积减小  
- 提高执行效率  
- 同样注意 babel 的 modules 配置  

**babel7 优化配置**

- 在需要的地方引入 pofyfill 【useBuiltIns: usage】 
- 辅助函数的按需引入【"@babel/plugin-transform-runtime"】  
- 根据目标浏览器按需转换代码  

## webpack 的依赖优化-dependency【小改动，大作用】

**noParse**

- 提高构建速度  
- 直接通知 webpack 忽略较大的库  
- 被忽略的库不能有 import 、require、define 的引入方式  

**DllPlugin**

- 避免打包时对不变的库重复构建  
- 提高构建速度  

## 基于 webpack 的代码拆分-splitting【让网站按需加载】

**code splitting 代码拆分做什么**

- 把单个 bundle 文件拆分成若干小 bundles/chunks  
- 缩短首屏加载时间  

**webpack 代码拆分的方法**

- 手工定义入口  
- splitChunds 提取公有代码，拆分业务代码与第三方库  

## 手把手教你做 webpack 的资源压缩-minification

**基于 webpack 的资源压缩（minification）**

- Terser 压缩 JS  
- mini-css-extract-plugin 压缩 CSS  
- HtmlWebpackPlugin-minify 压缩 HTML  

## 基于 webpack 的持久化缓存-cache

**持久化缓存方案**

- 每个打包的资源文件有唯一的 hash 值  
- 修改后只有受影响的文件 hash 变化  
- 充分利用浏览器缓存【推荐 contenthash】  

## 基于 webpack 的应用大小监测与分析-stats

**检测与分析**

- stats 分析与可视化图  
- webpack-bundle-analyzer 进行体积分析  
- speed-measure-webpack-plugin 速度分析  

[Webpack Chart](https://alexkuz.github.io/webpack-chart/)

source-map-explorer

```json
"scripts": {
  "analyze": "source-map-explorer 'build/*.js'"
}
```

# 第7章 传输加载优化-seven（前沿技术解决高访问量网站性能优化问题）

## 启用压缩 Gzip【必会的传输压缩方案】

**Gzip**

- 对传输资源进行体积压缩，可高达 90%  
- 如何配置 Nginx 启动 Gzip  

## 启用 Keep Alive【通过一个参数提速连接】

http1.1 默认开启 Keep Aliv

Network -> Headers

Connection: keep-alive

nginx 配置文件中
```js
# keepalive_timeout  0;
keepalive_timeout  65;  // 超过多长时间关闭连接
keepalive_requests  100;  // 一直持续连接的次数
```

**Keep Alive**

- 一个持久的TCP连接，节省了连接创建时间  
- Nginx 默认开启 keep alive  

## HTTP 资源缓存【必会的HTTP缓存方法】

**HTTP 缓存**

提高重复访问时资源加载的速度

- Cache-Control/Expires  
- Last-Modified + if-Modified-Since  
- Etag + If-None-Match

## 一次性理解 Service workers 技术，给网站提速

**Service Workers 作用**

- 加速重复访问  
- 离线支持  

**Service Works 注意**

- 延长了首屏时间，但页面总加载时间减少  
- 兼容性  
- 只能在 localhost 或 https 下使用  

## HTTP 2 的性能提升

**HTTP 2的性能提升**

- 二进制传输  
- 请求响应多路复用  
- server push  

**浏览器页面不安全的时候**

直接在页面输入`thisisunsafe`可以绕过

**搭建 HTTP2 服务**

- HTTPS  
- 适合较高的请求量  

## 用流行的 SSR 技术给前端减负

**SSR 的好处**

- 加速首屏加载  
- 更好的 SEO  

# 第8章 前沿优化解决方案-eight

## 拯救移动端图标 SVG【拯救移动端图标】

**从 PNG 到 IconFont**

**优点**

- 多个图标 -- > 一套字体，减少获取时的请求数量和体积  
- 矢量图标，可伸缩  
- 直接通过 CSS 修改样式（颜色，大小）  

**缺点**

- 只有一种颜色  
- 搜索引擎优化不友好  
- 要用就需要引入一整套

**从 IconFont 到 SVG**

优点

- 保持了图片的能力，支持多色彩  
- 独立的矢量图形  
- XML 语法，搜索引擎 SEO 和无障碍读屏软件读取  

## 使用 Flexbox 优化布局（上）

**Flexbox 的优势**

- 更高效的实现方案  
- 容器有能力决定子元素的大小，顺序，对其，间隔等  
- 双向布局  

**Flexbox 的使用**

- Flex container 容器  
- Flex items 元素  

## 优化资源加载的顺序-preload【给资源设置优先级】

**资源优先级**

- 浏览器默认安排资源优先加载优先级  
- 使用 preload, prefetch 调整优先级  

**preload, prefetch 使用场景**

- preload: 提前加载较晚出现，但对当前页面非常重要的资源  
- prefetch: 提前加载后继路由需要的资源，优先级低【当前页面资源加载完了之后才 prefetch】  

**preload 示例**

```html
<head>
  <link rel="preload" href="img/.svg" as="image">
</head>
```

```html
<head>
  <link rel="stylesheet" href=".css">
  <link rel="preload" href=".woff2" as="font" type="font/woff2" crossorigin="anonymous">
</head>
```

**prefetch 示例**

```html
<head>
  <link rel="stylesheet" href=".css">
  <link rel="prefetch" href=".css" as="style" >
</head>
```

## 预渲染页面-SSR【提前完成任务的意义】

**预渲染的作用**

- 大型单页应用的性能瓶颈：JS下载+解析+执行  
- SSR 的主要问题：牺牲 TTFB 来补救 First Paint；实现复杂  
- pre-rendering 打包时提前渲染页面，没有服务器参与  

**使用 react-snap**

- 配置 postbuild  
- 使用 ReactDOM.hydrate()  
- 首屏内联样式，避免明显的 FOUC（样式闪动）  

## Windowing 提高列表性能【开源节流，用什么画什么】

Windowing（窗口化）提高列表性能

react-window 插件

**windowing 的作用**

- 加载大列表、大表单的每一行严重影响性能  
- lazy loading 仍然会让 DOM 变得过大  
- windowing 只渲染可见的行，渲染和滚动的性能都会提升  

**使用 react-window**

- 配置一个一维列表 List  
- 配置一个二维列表 Grid  
- 配置滚动到指定元素  

## 使用骨架组件减少布局移动-Placeholder【论占位置的重要性】

使用骨架组件减少布局移动（layout shift）

**Skeleton/Placeholder 的作用**

- 占位  
- 提升用户感知性能  

**react-placerholder**

- 预置的 placeholders  
- 自定义 placeholder  

# 第9章 性能优化问题面试指南-nine

## Web加载&渲染基本原理

**从输入URL 到页面加载显示完成都发生了什么？**  

*网络线程*

DNS 查找 IP -> 如果是https 需要建立TLS 连接 -> 设置UA等信息，发送 GET 请求 -> web server 上的应用处理请求 -> 读取response，分析数据类型 -> 安全检查 -> 通知 UI 数据准备就绪  

*渲染线程*

解析文本，构建 DOM
边解析 DOM 边加载子资源  
JS 阻塞解析 async/defer  


解析 CSS ，计算 computed styles
构造布局树 & 大小

## 首屏加载优化-First screen

**什么是首屏加载？怎么优化？**

**测量指标**

First Contentful Paint (FCP)【让用户知道访问的请求成功了，0~2s】

Largest Contentful Paint (LCP)【网站有没有用，0~2.5s】

Time to Interactive (TTI)【什么时候用户可以交互，0~3.8s】

**❶ 资源体积太大？**

- 资源压缩，  
- 传输压缩，  
- 代码拆分，  
- tree shaking，  
- HTTP2，  
- 缓存  

**❷ 首页内容太多？**

- 路由/组件/内容 lazy-loading,   
- 预渲染/SSR,   
- 首屏 Inline CSS  

**❸ 加载顺序不合适**

prefetch, preload

## JavaScript 内存管理

**JS 是怎样管理内存的？什么情况会造成内存泄露？**

- 内存泄露严重影响性能  
- 高级语言 != 不需要管理内存  

变量创建时自动分配内存，不使用时“自动”释放内存-GC

- 内存释放的主要问题是如何确定不再需要使用的内存  
- 所有的GC都是近似实现，只能通过判断变量是否还能再次访问到  

- 局部变量，函数执行完，没有闭包引用，就会被标记回收  
- 全局变量，直到浏览器卸载页面时释放  

**GC 实现机制**

- 引用计数 - 无法解决循环引用的问题  
- 标记清除【常用】

**如何避免内存泄露**

- 避免意外的全局变量产生  
- 避免反复运行引发大量闭包  
- 避免脱离的 DOM 元素  

