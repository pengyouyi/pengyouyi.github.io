---
layout: post
title: vue 面试题集合
tags:
- Interview
- vue
categories: Framework
description: vue 面试题集合
---

# vue 面试题集合

# vue2 双向数据绑定的原理是什么？

1. 举一个双向数据绑定的例子，当你在输入框输入文字的时候，vue 会检测到数据的变化，然后更新对应的视图。反过来也一样，如果你通过代码修改了数据，vue 也会自动更新视图。  

2. 双向数据绑定的原理是通过数据劫持 和 发布订阅模式实现的。首先 vue 通过 Object.defineProperty() 方法对数据进行劫持，在数据变动的时候进行拦截，调用 getter 和 setter 方法。其次，当监听到数据变动时，vue 就会触发发布订阅模式，vue 会通知所有的订阅者进行更新。因此，当用户在页面上进行修改的时候，vue 会更新对应的数据，并通知所有订阅者更新视图；同时，当数据发生改变的时候，vue 也会更新对应的视图。通过这样的机制，vue 实现了双向数据绑定，使得数据和视图的变化可以互相影响。  

3. 补充：订阅者是 vue 中的一个概念，它是用于管理更新视图的对象，当数据发生变化时，vue 会通知所有的订阅者进行更新。发布者就是变动的数据，订阅者就是在页面中使用到该变量的地方，对此进行数据更新。【一个发布者多个订阅者】。  

4. vue3 中用 ES6 的 proxy 对象替换了 Object.defineProperty()，因为 Object.defineProperty() 只能劫持一个属性，而 proxy 可以劫持对象的所有属性

# vue2 和 vue3 的区别？

1. vue2和vue3双向数据绑定原理发生了改变。
vue2 的双向数据绑定是利用 ES5 的一个 API Object.definePropert() 对数据进行劫持 ，结合发布订阅模式的方式来实现的。vue3 中使用了 es6 的 ProxyAPI 对数据代理。

2. Vue3 支持碎片(Fragments)，就是说在组件中可以拥有多个根节点。  

3. Vue2 与Vue3 最大的区别 — Vue2 使用选项类型 API，Vue3 合成型API。旧的选项型 API 在代码里分割了不同的属性: data,computed 属性，methods，等等。新的合成型 API 能让我们用方法（function）stup(){} 来分割，相比于旧的 API 使用属性来分组，这样代码会更加简便和整洁。  

4. 建立数据 data。Vue2 把数据放在 data 中，在 Vue3 中，我们就需要使用一个新的 setup() 方法，此方法在组件初始化构造的时候触发。  

5. 使用以下三步来建立反应性数据：  

① 从 vue 引入 reactive  
② 使用 reactive() 方法来声名我们的数据为响应性数据  
③ 使用 setup() 方法来返回我们的响应性数据，从而我们的 template 可以获取这些响应性数据  

# 什么是虚拟 DOM?

1. 在 Vue 中，虚拟 DOM（Virtual DOM）是一个轻量级的 JavaScript 对象，用于描述真实 DOM 的层次结构和属性。每当 Vue 组件的数据发生变化时，Vue 会先对虚拟 DOM 进行操作，然后再将变化的部分同步到真实 DOM 中，从而避免了直接操作真实 DOM 时的性能问题。  

2. 虚拟 DOM 的出现是为了解决传统前端开发中频繁操作真实 DOM 的问题。由于真实 DOM 的操作往往非常消耗性能，因此频繁操作会导致页面的性能问题。而虚拟 DOM 可以在内存中对 DOM 进行操作，只有在必要的时候才将变化同步到真实 DOM，从而避免了频繁操作真实 DOM 的性能问题。  

3. 具体来说，当 Vue 组件的数据发生变化时，Vue 会通过比较新旧虚拟 DOM 树的差异来确定需要更新的部分，并将这些部分同步到真实 DOM 中。这样就避免了不必要的 DOM 操作，从而提高了页面的性能和响应速度。  

4. 此外，虚拟 DOM 还可以方便地实现一些高级特性，例如组件的复用和动画效果。虚拟 DOM 使得 Vue 可以在不操作真实 DOM 的情况下实现这些功能，从而提高了开发效率。

# vue 组件之间的通信

❶ 父传子：父组件通过自定义属性传递给子组件，子组件中通过 props 接收父组件中的绑定的属性.  

❷ 子传父：子组件通过广播的方式 $emit 发送自定义事件，将值传递给父组件，父组件监听事件，触发一个函数去接收子组件中传递过来的值.  

❸ 兄弟间传值： 

(1) 通过父组件中转来传值，即 A 和 B 是兄弟组件，可以 A 传给父组件，由父组件再传给 B.  
(2) new 一个 Bus 实例，在需要发送数据的组件中自定义方法，通过 $emit 传递数据，在需要接收数据的组件生命周期 created 中，通过 $on 监听获取数据。  
(3) 使用 vuex 状态管理，可以实现数据的随意存储和获取。  

> 兄弟间传值,小项目少页面用 eventBus，大项目多页面使用 vuex

#  vuex 状态管理工具的五个核心属性？

vuex 中的 state 数据不允许直接赋值修改，所以 vuex 创建了 mutations 用于定义方法来修改 state 中的数据，但是只能同步修改。如果异步修改会造成调试工具跟实际数据不对应，所以vuex 又提供了 actions，用于异步触发 mutations 中的方法。

- state: 用来存储公共数据的（变量），类似于组件中的 data。  
- mutations：数据修改的逻辑，也是唯一修改 state 数据的地方。(提交更新数据的方法),它必须是同步操作，如果有异步操作的话，那么就需要 actions。  
- actions：它也是用来改变数据的，但是它无法直接修改 state，actions 提交的是 mutations，在 mutations 里面更改数据，actions 支持异步操作。  
- getters：从基本数据，派生过来的数据，相当于组件里的计算属性 computed。  
- modules：是用来模块化 vuex 的，可以让每一个模块拥有自己的 state、mutation、actions、getters 使得结构更加清晰，方便管理。  

流程图：

**如果只有同步**

相应视图 -> 视觉触发 Mutation  ->  修改 state 中的数据

**如果有异步操作**

相应视图 -> 视觉触发 Action  -> Action 再触发 Mutation 里的方法  ->  修改 state 中的数据

## 直接调用 mutations 里的方法

vuex 定义：

```js
export default new Vuex.Store({
	state: {
		// 展示数据
		data: {},
	},
    mutations: {
            //方法名字自定义（）
            changeDetail(state, data) {
                // 信息
                this.data = data
            }
        }
    }
```

直接调用 mutaions 里的方法：

```js
//使用state里的数据
this.$store.state.data

//修改sate里的数据
this.$store.commit('changeDetail',data)
```

## 使用 action 里的方法间接调用 mutations 方法

actions 是放全局可以调用的函数,修改 state 里的变量, 但 actions 里不能直接修改 state 的变量，里面还是需要通过 mutations 里定义的函数来修改。比如：commit('change', 1); 同时在 mutations 里有一个 change(state, value)方法，其实它就是个“中介”。


```js
export default new Vuex.Store({
	state: {
		//定义数据
		data: {},
	},
    mutations: {
        //真正修改state里的数据
        change(state,data){
            state.data = data
        }
    }
    actions: {
          //中介，修改数据
		changeDetail({ commit }, data) {
		    commit('change',data)  // 这里就是调用了以上 mutations 里定义的 change 方法
	    },
          // fetchData 这个方法有异步操作
        // async fetchData({ commit }) {
        //     const response = await fetch('https://api.example.com/data')
        //     const data = await response.json()
        //     commit('change', data);
        // }
	}
}
```

直接调用 actions 里的方法：

```js
this.$store.dispatch('changeDetail',data)
```

总结：

> `mutations 同步`, 通过 **this.$store.dispatch(‘mutations方法名’,值)** 直接修改 state 中的值。  
> `actions 异步`，通过 **this.$store.commit(‘mutations方法名’,值)** 提交 mutations 中的方法，间接修改 state 中的值；并且执行异步操作。  


# 如何实现图片懒加载？lazy

懒加载是一种在页面加载时，延迟加载一些非关键资源的技术，换句话说，就是按需要加载。当我们碰到长网页有很多图片时，我们先加载出现在视口内的几张图片，当滚动条滚动到对应图片的位置时，再去加载别的图片。这种延迟加载的方式就是懒加载。(卷出去的高度 + 屏幕的高度 = 文档的高度)  

**图片懒加载是怎么实现的？**

就是我们先设置图片的 data-set 属性 (当然也可以是其他任意的，只要不会发送 http 请求就行了，作用就是为了存取值)值为其图片路径，由于不是 src，所以不会发送 http 请求。然后我们计算出页面 scrolITop 的高度和浏览器的高度之和，如果图片距离页面顶端的坐标 Y (相对于整个页面，而不是浏览器窗口)小于前两者之和，就说明图片就要显示出来了 (合适的时机，当然也可以是其他情况) ，这时候我们再将 data-set 属性替换为 src 属性即可。

**vue 中使用 vue 异步组件 和 ES 中的 import 实现懒加载。**

1. 异步组件使用路由懒加载,方法如下：component：resolve => (require([‘需要加载的路由的地址’])，resolve)

```js
// 代码如下:
import Vue from 'vue'
import Router from 'vue-router'/* 此处省去之前导入的HelloWorld模块 */
Vue.use(Router)
export default new Router({routes: [
    {
        path: '/',
        name: 'HelloWorld',
        component: resolve => (require(["@/components/HelloWorld"], resolve))
    }
    ]
})
```

2. ES 提出的 import 方法，（----最常用----）

```js
// 方法如下：const HelloWorld = （）=> import('需要加载的模块地址')（不加 { } ，表示直接return）
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const HelloWorld = () => import("@/components/HelloWorld")
export default new Router({
    routes: [{
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    }]
})
```

# 为什么 token 要同时存在 vuex 和 localStorage 中?

1. vuex 存储数据的特点：数据统一全局管理，一旦数据在某组件更新，其他所有组件数据都会更新，也就是说它是响应式的，但是如果数据只存在 vuex 中，`刷新页面 vuex 里的数据会重新初始化`，导致数据丢失，恢复到原来的状态。

2. localStorage (本地存储)存储数据的特点: 永久性存储，但不是响应式的，当某个组件数据修改时，其他组件无法同步更新。

3. 另外，vuex 是存储在内存中，localStorage 本地存储是存储到磁盘里，从内存中读取数据，速度是远高于磁盘的，所以把数据存在 vuex 中可以提高获取 token 速度，提高性能。

4. 结论: 所以我们在项目中通常是结合这两者使用，拿到 token 后，把 token 存储到 localStorage 和 vuex 中，vuex 保证数据在各组件间同步更新，如果刷新页面数据丢失，我们可以从localStorage 获取，通过结合 vuex 和 localStorage 本地存储，实现数据的持久化。

# vue 中请求到底写在 created 中还是 mounted 中？

- created: 中文意思创建完成，这时候已经初始化了某些属性值，Vue 实例中的 data 和 methods 已经可以使用了。但是，还没有挂载到页面上。  
- mounted: 中文意思挂载完成，这时候初始化页面完成，此时页面已经渲染出来了，可以进行 dom 操作。  

在实际开发中请求不论放在 created 还是 mounted 大多时候是没有区别的，因为 created 和 mounted 都是同步的，而请求是异步的，不会堵塞页面渲染的主线程，我们也不能控制请求回来的时间。主要是看个人习惯吧。  

但是如果是需要操作 dom 相关的请求，就要在 mounted 中执行，因为这时候页面才挂载完成，才可以进行 dom 操作。  

另外需要补充一点，官方文档上给大家提的一个醒，就是 mounted 阶段不保证所有的子组件也都被挂载完成，这时候如果我们希望等到整个视图都渲染完毕再做操作，那就需要使用到 this.$nextTick方法。

# 后端返回十万条数据，前端怎么处理？thousand

1. 触底加载  

只要滚动一次就要判断一次加载时机，当滚动上去的高度 + 屏幕的高度 >= 页面的高度，需要加载下一页数据。
我们需要获取到滚动上去的高度，窗口的高度，文档的高度。
获取页面滚动上去的高度：document.documentElement.scrollTop/document.body.scrollTop

获取当前元素的宽度和高度：ele.offsetHeight/ele.offsetWidth
获取窗口的宽度和高度：window.innerHeight
获取文档的宽度和高度：document.documentElement.scrollHeight

2. 虚拟列表  

由于最终效果需要是一个长列表的形式，那么常规的分页渲染，显然是不符合要求的。这个时候我们可以考虑用虚拟列表来实现需求。  

什么是虚拟列表？  

虚拟列表就是只对可见区域进行渲染，对非可见区域中的数据不渲染或部分渲染，以实现减少消耗，提高用户体验的技术。它是长列表的一种优化方案，性能良好。

实现思路：  

（1）写一个代表可视区域的 div，固定其高度，通过 overflow 使其允许纵向 Y 轴滚动。  
（2）第二步，计算区域中可以显示的数据条数。这个可以用可视区域的高度除以单条数据高度得到。  
（3）监听滚动，当滚动条变化时，计算出被卷起的数据的高度。  
（4）计算区域内数据的起始索引，也就是区域内的第一条数据：这个用卷起的高度除以单条数据高度可以拿到。  
（5）计算区域内数据的结束索引。通过起始索引+可显示的数据的条数可以拿到。  
（6）取起始索引和结束索引中间的数据，渲染到可视区域。  
（7）计算起始索引对应的数据在整个列表中的偏移位置并设置到列表上。  

整个步骤下来，最终的效果是：不论怎么滚动，我们改变的只是滚动条的高度和可视区的元素内容。每次只会渲染一个固定的条数，不会增加多余元素。

```html
<template>
    <div :style="{height: `${contentHeight}px`}" class="content_box" @scroll="scroll">
        <!--这层div是为了把高度撑开，让滚动条出现，height值为所有数据总高-->
        <div :style="{'height': `${itemHeight*(listAll.length)}px`, 'position': 'relative'}"><!--可视区域里所有数据的渲染区域-->
            <div :style="{'position': 'absolute', 'top': `${top}px`}"><!--单条数据渲染区域-->
                <div v-for="(item,index) in showList" :key="index" class="item">{{item}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "list",
    data(){
        return {
            listAll: [],  //所有数据showList: [],  //可视区域显示的数据
            contentHeight: 500,  //可视区域高度itemHeight: 30,      //每条数据所占高度
            showNum: 0,  //可是区域显示的最大条数top: 0, //偏移量
            scrollTop: 0,  //卷起的高度
            startIndex: 0,  //可视区域第一条数据的索引
            endIndex: 0,  //可视区域最后一条数据后面那条数据的的索引，因为后面要用slice(start,end)方法取需要的数据，但是slice规定end对应数据不包含在里面
        }},
    methods:{//构造10万条数据
    getList(){for(let i=0;i<100000;i++){this.listAll.push(`我是第${i}条数据呀`)}},//计算可视区域数据
    getShowList(){this.showNum = Math.ceil(this.contentHeight/this.itemHeight);  
    //可视区域最多出现的数据条数，值是小数的话往上取整，因为极端情况是第一条和最后一条都只显示一部分this.startIndex = Math.floor(this.scrollTop/this.itemHeight);   
    //可视区域第一条数据的索引this.endIndex = this.startIndex + this.showNum;   
    //可视区域最后一条数据的后面那条数据的索引this.showList = this.listAll.slice(this.startIndex, this.endIndex)  
    //可视区域显示的数据，即最后要渲染的数据。实际的数据索引是从this.startIndex到this.endIndex-1const offsetY = this.scrollTop - (this.scrollTop % this.itemHeight);  
    //在这需要获得一个可以被itemHeight整除的数来作为item的偏移量，这样随机滑动时第一条数据都是完整显示的this.top = offsetY;},
    //监听滚动事件，实时计算scrollTopscroll(){this.scrollTop = document.querySelector('.content_box').scrollTop; 
    //element.scrollTop方法可以获取到卷起的高度this.getShowList();}
     },
    mounted() {this.getList();this.scroll();}
}
</script>
<style scoped>
.content_box {overflow: auto;  /*只有这行代码写了，内容超出高度才会出现滚动条*/width: 700px;border: 1px solid red;
}
/*每条数据的样式*/
.item {height:30px;padding: 5px;color: #666;box-sizing: border-box;}
</style>
```

# 插槽是什么？插槽如何使用？slot

Vue 实现了一套内容分发的 API，将元素作为承载分发内容的出口。

通过插槽可以动态指定某一个组件模板部分的渲染, 我们在调用组件的时候, 在组件的调用标签中间传递了什么样的标签结构, 那么该组件就会把我们传递的标签结构放在他的模板部分进行渲染。
举一个例子，如果你在一个自定义组件标签中又加入了一段 HTML，默认情况下它里面的 DOM 元素是不会渲染出来的，但是如果你在子组件模板中写上插槽的话，这个标签内容会自动放在你写的插槽标签那个位置。

vue 的 slot 主要分三种：默认插槽，具名插槽，作用域插槽。

具名插槽：有名字的插槽，如果一个组件中有多个插槽，就可以写成具名插槽，给插槽提供的内容放在对应名字的的位置上。

```html
<div id="app">// 子组件 
    <Child>// 给插槽提供的内容
        <template v-slot:default><button>按钮</button><a href="https://huawei.com">跳转华为</a></template>
        <template v-slot:header><h1>标题</h1><p>内容，21231215456454</p></template>
    </Child>
</div>

<Child>子组件的模板中:
<div>
    <h1>这是子组件的内容</h1><slot></slot>   	// 给插槽提供的内容将会被放在这个位置，这是默认插槽
</div>
```

使用插槽是在存在父子关系的组件，可以在子组件中决定插槽的位置，同时子组件也可以给这些插槽的默认信息，当父组件中没有需要给子组件插槽插入信息时，显示的是子组件插槽定义的默认信息。

# 什么是 SPA？

SPA(Single Page Application), 单页面应用程序, 使用 vue, react, angular ,创建的项目都属于 SPA。

单页面应用，只在 web 页面初始化时，加载相应的 HTML、js、css，一旦页面加载完成，就不会因为用户的操作而进行页面的重新加载或者跳转。简单说，SPA 它只有一个 web 页面，例如：vue项目只有一个 index.html，但是我们为什么我们能看到不同的页面呢，这是因为 vue 的路由机制，通过监听路由的变化，实现 HTML 内容的变换，从而动态实现 UI 与用户的交互，就像我们在vue 项目中，从一个菜单项切换到另外一个菜单项，页面的内容虽然变了，但是并没有去请求一个新的 html 的动作，而是通过变化的路由，去找到当前路由对应的页面。

**SPA的优点：**

1. 由于页面初始化的时候，项目依赖的资源就统一加载了，所以后面切换页面就不用再向服务器请求，因此，切换速度快且流畅，用户体验性会更好，在一定程度上也会减小服务器的压力。  
2. 前后端职责更加的清晰，前端就负责页面相关，以及调后端接口拿数据的工作；后端则负责数据相关的处理。  

**SPA的缺点：**

1. 首屏加载慢，因为是单页面应用，初次加载的时候资源会统一全部加载。当然，作为优化时的一种方案，部分页面也是可以按需加载的。  
2. 另外，由于所有的内容都在一个页面中动态替换显示所以在 SEO 上有着天然的弱势，不利于搜索引擎优化。  


# 你怎么理解 vue 的单向数据流？

单项数据流是从上到下的，但是它不能从下到上。

Vue 中单向数据流指的是父组件可以传值给子组件，子组件不能直接修改父组件传的值。  
prop 也就是父组件传过来的数据，如果我们试图通过子组件的 v-model 去改变这个 prop，也就是试图通过子组件直接去改变父组件的数据，而不是通过发送事件的方式，这是不允许的。

# 在什么阶段下才可以访问操作 DOM？

在 mounted 中可以访问操作 DOM。

因为在钩子函数 mounted 被调用之前，Vue 已经将编译好的模板挂载到页面上。

# 什么是微前端？micro

微前端是一种类似于微服务的架构，它将微服务的理念应用于浏览器端，即将 Web 应用由单一的单体应用转变为多个小型前端应用聚合为一的应用。各个前端应用可以独立运行、独立开发、独立部署。（建议先了解微服务）

（1）微服务就是一种架构风格  
（2）微服务就是把一个项目拆分成独立的多个服务，并且多个服务是可以独立运行的，而每个服务都会占用线程。  

# 如何解决 Jquery 版本泄露问题？

正确解决方法：升级版本。

# vue 生命周期有哪些?

- 创建阶段: 只执行一次。  
    + beforeCreate (开始进行一些数据和方法的初始化的操作, data 中的数据和 methods 中的方法还不能用)。  
    + created (已经完成数据和方法的初始化, data 中的数据和 methods 中的方法可以使用了)。  
- 挂载阶段：  
    + beforeMount (开始渲染虚拟 DOM)。  
    + mounted (已经完成了虚拟 DOM 的渲染, 可以操作 DOM 了, 只执行一次)。  
- 更新阶段: 执行多次  
    + beforeUpdate (data 中的数据即将被更新, 会执行多次)。  
    + updated (data 中的数据已经更新完毕, 会执行多次)。  
- 销毁阶段: 只执行一次  
    + beforeDestroy (vue 实例即将销毁, 此时 data 中的数据和 methods 中的方法依然处于可用状态)。  
    + destroyed (vue 实例已经销毁, 此时 data 中的数据和 methods 中的方法已经不可用)。  

# computed 和 watch的区别？

1. computed 是计算属性, 所依赖得数据发生改变，就会重新计算结果那么就需要用到 computed。

最典型的例子就是购物车结算时候的总金额，就是依赖数量和单价来进行计算的；另外 computed 支持缓存，只有依赖的数据发生改变的时候，才会重新进行计算，否则，会直接从缓存中读取。使用的时候和 data 中的数据的使用方式基本上是一致的，而且计算属性它不支持异步，当 computed 内有异步操作时，是无效的，无法监听到数据的变化。 （计算属性的函数必须有返回值）

2. watch 是监视器, 当一个数据的变化，会影响其他一个或多个数据的时候，就需要监听这个数据，watch 不支持缓存，监听的数据发生变化就会触发相应的操作。重视过程。不用返回值，同步异步都可以。  

另外，watch 支持异步，而且我们监听的数据必须是 data 中声明过的数据，或者是从父组件中传递过来的 props 中的数据，另外，每个监听数据有两个可选的属性，分别是 immediate 和 deep。immediate 是组件加载是否立即触发回调函数执行，如果它的值是 true，组件加载就会立即触发一次；如果是 false，首次是不会执行这个监听逻辑的，只有当数据改变的时候才会监听。deep 是深度监听，为了监听对象内部值的变化，适合用在复杂类型的数据中。（楼层导航，切换楼层时，监听楼层索引的变化，调整滚动条位置）


# Data 为什么是一个函数？

因为对象是一种引用数据类型,在内存中只有一份. 如果 data 的值直接是一个对象的话, 那么后期组件在不同的地方多次调用的时候, 会相互产生影响, 因为每一次调用操作的 data 对象是一样的。使用函数的方式返回对象, 可以保证组件的每一次调用都会创建一个新对象，这样组件的每一次调用不会相互产生影响。

# v-if 和 v-show

**共同点是：**

v-if 和 v-show 都能实现元素的显示隐藏。

**v-if 和 v-show 的区别**

1. v-show 只是简单的控制元素的 display 属性，而 v-if 才是条件渲染（条件为真，元素会被渲染，条件为假，元素会被销毁）；
2. v-show 有更高的首次渲染开销，而 v-if 的首次渲染开销要小的多；
3. v-if 有更高的切换开销，v-show 切换开销小；
4. v-if 有配套的 v-else-if 和 v-else，而 v-show 没有。
5. v-if 可以搭配 template 使用，而 v-show 不能。

**v-show 与 v-if的使用场景**

v-if 相比 v-show 开销更大（直接操作 dom 节点增加与删除），如果需要非常频繁地切换，则使用 v-show 较好。如果在运行时条件很少改变，则使用 v-if 比较好。

# v-for 中的 key

为什么 vue 中循环遍历的时候，尽量不要用索引值作为动态绑定的 key 值？

1. 在 Vue 中，循环遍历通常使用 v-for 指令来实现。v-for 指令通常需要绑定一个 key值，帮助 Vue 跟踪每个列表项的身份，以便在列表中发生变化时进行高效的更新。

2. 使用索引值作为 key 值可能会导致一些问题。例如，如果您的列表项在循环过程中被重新排序或过滤，则可能会出现问题。由于索引值是按顺序分配的，因此如果您在列表的中间插入或删除项目，则所有后续项目的索引值都会发生更改，从而导致 Vue 进行不必要的重新渲染。

3. 此外，使用索引值作为 key 值还可能导致性能问题。在处理大型列表时，Vue 可能需要在每次更新时对整个列表进行重新渲染，这可能会导致性能瓶颈。

4. 为了避免这些问题，建议使用列表项中具有唯一标识符的属性作为 key 值。这可以确保每个项具有唯一的身份，并且在列表中进行排序或过滤时仍然能够正确更新。如果您的列表项没有唯一标识符，则可以考虑创建一个。

# nextTick

在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

```js
// 修改数据
vm.msg ='Hello'  // DOM 还没有更新
Vue.nextTick(function(){
    // DOM 更新了
})
this.$nextTick()
```

# keep-alive

说一下 keep-alive 标签的作用，以及它的使用场景？

**keep-alive 标签的作用**

1. 在 Vue 中，keep-alive 标签可以用来缓存组件，当一个组件被包裹在 keep-alive 标签中时，离开当前页面时，这个组件不会被销毁，而是被缓存起来，当这个组件再次被使用时，Vue 会从缓存中提取组件实例，并重新挂载，而不是重新渲染。

**keep-alive 的使用场景**

2. 这个功能可以提高应用的性能，特别是在需要频繁切换组件的场景下，就比如 Tab 切换或者路由切换，因为不需要每一次切换时都重新创建和销毁组件，而是直接从缓存中获取，这样可以避免重复的初始化和渲染，从而提高应用的响应速度和性能。

3. 举个应用场景，有个员工列表，现在我们点击某条数据，查看员工详情后，再返回到员工列表，这个时候我们就希望这个列表能够保持刚才的状态，这时候就可以使用 keep-alive 把这个列表所在的组件包裹起来。

# 组件化和模块化一样吗？com

- 模块化, 是从代码逻辑角度进行划分的，保证每个模块的职能单一，比如登录页的登录功能，就是一个模块，注册功能又算是一个模块。
- 组件化，是从 UI 界面的角度划分的；页面上每个独立的区域，都可以视为一个组件，前端组件化开发，便于 UI 组件的复用，减少代码量。

区别是：划分角度不同，组件化是从 UI 界面角度来划分的，模块化是从代码逻辑角度来划分的。

# data 和 props 的区别？

在实际 vue 项目中，我们经常会在子组件里看到 data 和 props 属性，这两者里面的数据使用方式基本是一致的。但是还是有一定的区别。

- data 不需要父组件传值，自身进行维护；而 props 需要父组件传值。
- data 上的数据都是可读可写的；而 props 的数据都是父组件传递过来的，而且由于它是单向数据流，因此数据只可读，无法重新修改。


如果传递的 props 值是基本类型(像 Number，Boolean，String)子组件直接修改,控制台肯定会报错的，但是如果传递的是引用类型，像 Object，数组结构，子组件修改里面的属性值或者某一数组元素，控制台是不会报错的。因为对于引用类型改的只是值，而不是引用地址。
不过，不管传递什么形式的数据，我们都是不建议在子组件中直接修改 Props 的值的，因为这样会破坏单一数据流，可能会导致数据的变化无法追踪。

**问：那在子组件中修改 props 的正确操作又是什么呢?**

答：如果子组件只是想修改后自己使用，不想影响到父组件的数据，那么我们可以在子组件中的 data 里定义一个变量，让这个变量的初始值等于父组件传过来的 props 值，相当于 copy 一份这个props 值，后面需要修改的话就改自己 data 里的这个值。这样就不会影响到父组件了。如果处理后想同步修改父组件的值，那么可以通过 `this.$emit` 事件触发父组件去修改。

# 白屏时间和首屏时间的区别？First Paint

- 白屏时间(First Paint)：是指用户输入内容回车，到浏览器开始出现第一个字符，即开始显示内容的时间。所以，白屏时间 = 页面开始展示的时间点 - 开始请求的时间点。
- 首屏时间(First Contentful Paint)：是指浏览器从响应用户输入网络地址，到首屏内容渲染完成的时间。所以，首屏时间=首屏内容渲染结束时间点 - 开始请求的时间点。

通过刚刚的两个概念，我们知道，首屏时间一定比白屏时间长，因为首屏时间的另一种计算是：首屏时间 = 白屏时间 + 首屏开始渲染至渲染结束的时间。

# 说三种刷新页面的方式？refresh

1. 原生js方式：location.reload()，我们只需要在需要刷新的地方加这么一行代码即可做到刷新。

2. 借助 Vue 中的路由跳转方式：如果需要刷新，则写入 this.$router.go(0)，这个方法解释一下，就是我们要跳转路由，而需要跳转的页面就是本页面，所以是 go(0)，这样就可以做到页面的重新加载。

3. provide / inject 组合方式。前两种方法都是强制刷新，页面会出现短暂空白，而 provide/inject 是普通刷新，不会使页面出现空白。这个方法，允许一个祖先组件通过 provide 向其所有子孙后代提供数据，不论组件层次有多深，子组件都可以通过 inject 来注入，接收这个数据。

具体实现：在项目的 app.vue 文件中定义一个布尔类型的数据，通过 v-if 来控制 router-view 是否展示，同时定义一个刷新函数，函数内部逻辑主要是将展示设为 false，等 nextTick 执行后再将展示设为 true，实现页面的重新加载；写好刷新函数后，在需要刷新的组件中通过 inject 注入刚刚 app.vue 中 provide 提供的依赖，也就是那个刷新函数，然后直接调用这个函数即可实现刷新。

总结刷新函数做的事情就是，想要刷新的时候，我们就调用刷新函数，结合 v-if 的作用，先将组件是否展示设为 false 让组件先销毁，再将是否展示设为 true 让组件创建。除了以上方式，还有 this.$forceUpdate() 等刷新方式。

# vue 中如何单独更改某个页面的背景颜色？

【需求】全局页面背景色是白色，现需要更改某个页面的背景色为灰色。  
【无效】尝试直接改 body 标签的样式，但是设置后，发现所有页面背景色都变成灰色了。  
【原因】vue 是一个单页面应用，只有一个 index.html，牵一发而动全身。  
【正确做法】在这个页面创建前，也就是 beforeCreate 生命周期函数里把 body 背景色改成我们想要的颜色，同时在这个页面销毁前，也就是 beforeDestroy 生命周期钩子中，移除我们刚加的背景色样式。这样跳到其他页面时，刚在那个页面加的 body 背景色就会移除，继续使用全局的那个背景样式。  

具体代码是:

```js
beforeCreate(){
    document.querySelector('body').setAttribute('style','background-color:#fff')
},
beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
},
```

除了在需要修改的页面上里改 body 的背景样式外，我们也可以把这块逻辑封在路由守卫中，当进入需要更改的页面路由时，做刚刚的样式操作。离开这个路由时移除。

# ref 的作用以及使用场景？

ref 可以用来获取 dom 元素。如果我们给一个元素绑定 ref=“test”，那么我们就可以通过 this.$refs.test 获取 dom，然后做一些我们需要的操作。

ref 也可以获取子组件中的方法或者 data 等。如果给子组件上绑定一个 ref，值依然假设为 test，那么在父组件中通过 this.$refs.test ，就可以拿到一个 VueComponent 对象，这个对象里面有这个子组件的各个属性，打印出来会发现里面有个 $el 属性，这就是这个子组件的 dom 对象。如果子组件的 data 中有个 msg 属性，那么在父组件内我们就可以通过 this.$refs.test.msg 拿到子组件的这个 msg 值；再假设子组件有一个 getData 方法，那么父组件内通过 this.$refs.test.getDgta() 也可以调用子组件的 getData 方法。  

# 静态资源放在哪里？assets 和 static 的区别？

vue 项目的目录结构通常在 src 目录下有个 assets 文件夹，和 src 同级的地方有个 static 文件夹。

【相同点】

两个文件夹下都可以用于存储项目中所需的静态资源，像图片，样式文件等等。

【区别】

- assets 下存放的静态资源文件在项目打包时，也就是执行 npm run build 指令时，会走 webpack 的打包流程，做压缩代码体积、代码格式化这种操作；  
- static 中存放的资源文件不会走打包流程，而是直接复制进最终的 dist 目录里。

【总结】

由于第三方类库资源一般都已经经过处理了，所以我们可以在 static 里放一些外部的第三方资源文件; assets 放我们自己项目中的图片等资源，让这些资源走打包流程，减少最终包的体积。但是实际开发中情况肯定是多变的，还是要根据实际情况来看把静态资源文件放在哪里更合适。

# vue 中 route 和 router 的区别？

- this.$router 是 VueRouter 的一个实例，是一个全局路由对象，它可以用来操作路由，项目中比较常用的就是拿来做路由跳转，比如经常我们需要跳转到另一个页面时，就会写 this.$router.push( )，  
- this.$route 是当前激活的路由对象，通过它我们可以拿到当前路由的一些信息比如 path,，query，meta 等属性。

比如我们希望查看某条数据的详情，点击详情时需要跳转路由到详情页面，这里就可以通过 this.$router.push 来做跳转，并且我们可以给即将跳转到的详情路由对象的 query 对象里传个该条数据的 id，为的是希望路由跳转后，通过这个 id 去获取数据的详情并展示，跳转后怎么拿 id 呢，我们就可以通过 this.$route 先拿到当前路由的所有信息，然后去 query 对象里拿刚刚在上一页面跳转前放进去的 id 属性，这样拿到 id 后再去查详情数据。完整的就是 this$route.query.id。

概括来说就是，route 是用来获取当前路由信息的，也就是读路由信息，而 router 是用来操作路由的，是写路由的。


# 平时项目中怎么做跳转？go

1. 第一个方法就是标签，我们可以在标签里面添加 to 属性来配置需要跳转的路径，浏览器解析的时候会将其解析为类似于 a 标签的东西，

2. 第二种方案就是 this.$router.push() 方法，我们可以在某个函数里面要用路由的这个方法来实现跳转。  

3. 第三种方法是 this.$router.replace()，this.$router.push() 跳转到指定 url 路径的同时也会像 history 栈中添加一条记录，点击后退就会返回到上一个页面，this.$router.replace()方法跳转到指定URL 路径点击返回，他是跳转到你看到的上上个页面也就是说目标页面直接替换了，而不是添加一条记录，  

4. 第四种方法 this.$router.go(n)，我们可以利用这个方法向前或者向后跳转 n 个页面，比如说 n 是1，可以跳到下一页，如果是 -1，则回退到上一页，0 就是当前页面。

# 项目中如何做到 echarts 图表自适应？

【需求】浏览器窗口大小变化的时候，echarts 图表要随着浏览器窗口变化而变化。

【解决】window.addEventListener 方法监听窗口的变化，当窗口变化时，让需要自适应的 echarts 实例调用 echarts 官方给的自适应 resize方法，可以在 mounted 钩子函数中写下面的代码，这样就可以实现自适应了。

```js
window.addEventListener('resize',  () => {myEchart.resize();});
```

# 说几种图片懒加载的实现方式？lazy

**背景及原理**

在前端项目中，当页面有很多图片的时候，图片加载就需要一定的时间，这样是很耗费服务器性能的，不仅影响渲染速度还会浪费带宽，为了解决这个问题，提高用户体验，所以就出现了懒加载这种方式来减轻服务器的压力，就是优先加载可视区域的内容，其他部分的内容等进入了可视区域再进行加载，从而提高性能。

**实现思路**

图片都是根据 src 属性进行加载的，所以我们可以在图片没有进入可视区域前，先不给 src 赋值（或者可以先给一个很小的 loading 图的地址），等到图片进入可视区域再给 src 赋真正的值。图片的真实地址可以先存储在 data-src 中。了解了实现思路，那继续最关键的一步，那就是如何计算图片是否进入了可视区域？

**具体实现方式**
```html
<div>
    <h6>图片懒加载</h6>
    <img data-src="/static/images/login-bg-3.jpg" src="/static/images/login-bg-4.jpg"><br>
    <img data-src="/static/images/login-bg-1.jpg" src="/static/images/login-bg-4.jpg"><br>
    <img data-src="/static/images/login-bg.jpg" src="/static/images/login-bg-4.jpg"><br>
    <img data-src="/static/images/login-bg-3.jpg" src="/static/images/login-bg-4.jpg"><br>
    <img data-src="/static/images/login-bg-old.jpg" src="/static/images/login-bg-4.jpg"<br>
    <img data-src="/static/images/login-bg-1.jpg" src="/static/images/login-bg-4.jpg"><br>
    <img data-src="/static/images/login-bg.jpg" src="/static/images/login-bg-4.jpg"><br>
</div>
```
**第一种：vue-lazyload 插件实现**

(1) 安装插件
```js
npm install vue-lazyload --save-dev
```
(2) 在main.js文件中引入并使用
```js
import VueLazy from ‘vue-lazyload’
Vue.use(VueLazyload)
```
(3) 修改图片显示方式为懒加载即可。将:src=“xxx” 属性直接改为v-lazy=“xxx”

**第二种：IntersectionObserver API 实现。**

这个api可以自动"观察"元素是否可见，Chrome 51+ 已经支持。由于可见的本质是，目标元素与视口产生一个交叉区，所以这个 API 又叫做交叉观察器。

```js
created() {
    this.intersectionObserver();
},
methods:{
    intersectionObserver(){
        let images = document.getElementsByTagName('img');
        const observer = new IntersectionObserver((imgs) => {console.log('imgs===', imgs)
        // imgs: 目标元素集合imgs.forEach((img) => {
        // img.isIntersecting代表目标元素可见，可见的时候给src赋值if (img.isIntersecting) {const item = img.targetitem.src = item.dataset.srcobserver.unobserve(item);}})})
        //定时器和Array.from的目的是让images可遍历setTimeout(()=>{Array.from(images).forEach(item => {observer.observe(item);})},300)}
}
// isIntersecting 为true 代表该目标元素可见，可以加载；target 即对应页面中的真实img。
```

**第三种：元素的 offsetTop API 实现。**

判断进入可视区域的条件有变，通过下图，可以看出，这里进入可视区域的判断条件是某一元素e的 e.offsetTop < document.body.clientHeight + document.body.scrollTop
获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置 < 网页可视区域的高度 + 网页被卷去的高度

# more

文章抄写

[2023前端面试题汇总](http://www.taodudu.cc/news/show-5964710.html?action=onClick)