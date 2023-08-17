---
layout: post
title: 慕课网-前端框架及项目面试 聚焦Vue/React/Webpack - 第6章 Vue3（新）
tags:
- Interview
- imooc
- vue
categories: Framework
description: 慕课网-前端框架及项目面试 聚焦Vue/React/Webpack - 第6章 Vue3学习(新)
---

[https://cn.vuejs.org/](https://cn.vuejs.org/)

# 第6章 Vue3 学习（新）

## 6-1 章介绍

**章介绍**

对 vue3 进行全面讲解。包括 Vue3 升级的变动，Vue3 核心知识点，Composition API 如何使用，以及 Vue3 一些基础的原理。

**主要内容**

	•	Vue3 基本使用
	•	Vue3 相比于 Vue2 的升级
	•	ref 相关的知识点（比较难理解）
	•	Composition API
	•	Vue3 原理讲解

**关键字**

	•	Vue3
	•	ref
	•	Composition API
	•	Proxy

## 6-2 vue3 考点概述

### ㊀ vue3 新功能

❶ createApp
❷ emits 属性
❸ 多事件处理
❹ Fragment
❺ 移除 .sync 改为 v-model 参数
❻ 异步组件的引用方式
❼ 移除 filter
❽ Teleport
❾ Suspense

#### ❿ Composition API【重点】

① reactive
② ref toRef toRefs
③ readonly
④ computed
⑤ watch watchEffect
⑥ 钩子函数生命周期

### ㊁ vue3 原理

#### ❶ Proxy 实现响应式

#### ❷ 编译优化

① PatchFlag 静态标记
② hoistStaic 静态提升
③ cacheHandler 缓存事件
④ SSR 优化
⑤ Tree-shaking 优化


### ㊂ Vite -- ES6 module

### 面试题

- Vue3 比 Vue2 有什么优势？  
- 描述 Vue3 生命周期  
- 如何看待 Composition API 和 Options API?  
- 如何理解 ref toRef 和 toRefs?  
- Vue3 升级了哪些重要的功能？  
- Composition API 如何实现代码逻辑复用？  
- Vue3 如何实现响应式？  
- watch 和 watchEffect 的区别是什么？  
- setup 中如何获取组件实例？  
- Vue3 为何比 Vue2 快？  
- Vite 是什么？  
- Composition API 和 React Hooks 的对比  

## 6-3 vue3 对 vue2 有什么优势

- 性能更好★  
- 体积更小  
- 更好的 ts 支持★（vue3就是ts开发的）  
- 更好的代码组织★  
- 更好的逻辑抽离★  
- 更多新功能（vue2也能实现）

## 6-4 vue3 和 vue2 的生命周期有什么区别

Vue3 生命周期

- Options API 生命周期
- Composition API  生命周期

**Options API 生命周期**

- beforeDestroy 改为 beforeUnmount  
- destroyed 改为 unmounted  
- 其他沿用 Vue2 的生命周期  

*Options API 生命周期例子 - LifeCycles.vue*

```vue
 <template>
 </template>
 <script>
 export default {
   name: 'LifeCycle',
   
   beforeCrete() {},
   created() {},
   beforeMount() {},
   mounted() {},
   beforeUpdate() {},
   updated() {},
   beforeUnmounted() {},  // beforeDestroy 改名
   unmounted() {}  // destroyed 改名
 }
  </script>
```

**Composition API  生命周期**

*Composition API  生命周期例子-LifeCycles2.vue*

```vue
 <template>
 </template>
 <script>
 // 需要引用
 import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount,onunmounted} from 'vue';
 export default {
   name: 'LifeCycle2',
   
   // setup 等于 beforeCrete + created
   setup() {
     onBeforeMount(()=>{}),
     onMounted(()=>{}),
     onBeforeUpdate(()=>{}),
     onUpdated(()=>{}),
     onBeforeUnmount(()=>{}),
     onunmounted(()=>{})
   }
 }
  </script>
```


**总结 Composition API  生命周期对比vue2生命周期 ：**

- vue3 的钩子函数基本是在 vue2 的基础上加了一个 on, 

- Vue3.x 生命周期在调用前需要先进行引入 import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount,onunmounted} from 'vue';

- 但也有两个钩子函数发生了变化。BeforeDestroy 变成了 onBeforeUnmount，destroyed 变成了onUnmounted。

- setup() = beforeCrete + created，创建的是 data 和 method。


Options API 生命周期  和 Composition API  生命周期任选一种用即可。

**生命周期钩子函数使用场景**

- beforecreate：初始化加载动画  
- created：做一些数据data初始化，实现函数method自执行  
- mounted： 调用后台接口进行网络请求，拿回数据，配合路由钩子做一些事情  
- destoryed：当前组件已被删除，清空相关内容  


## 6-5 如何理解 Composition API 和 Options API


Composition API 对比 Options API

- Composition API 带来了什么？  
- Composition API 和 Options API 如何选择？  
- 别误解 Composition API  

### Composition API 带来了什么？

- 更好的代码组织  
- 更好的逻辑复用★（有一道专门的面试题）  
- 更好的类型推导  

更好的类型推导 --之前的使用方式

```js
{
  data() {
    return {
      a: 10
    }
  },
  methods: {
    fn1() {
      const a = this.a;
    }
  },
  mounted() {
    this.fn1();
  }
}
```

更好的类型推导 --现在把业务逻辑抽离成函数，在setup() 里调用函数，可以实现逻辑复用，也更符合js使用规范。

### Composition API 和 Options API 如何选择？

- 不建议共用，会引起混乱  
- 小型项目、业务逻辑简单，用 Options API   
- 中大型项目、逻辑复杂，用 Composition API   

### 别误解 Composition API

- Composition API 属于高阶技巧，不是基础必会。  
- Composition API 是为解决复杂业务逻辑而设计。  
- Composition API 就像 Hooks 在 React 中的地位。  

## 6-6 如何理解 ref toRef 和 toRefs★

- 是什么  
- 最佳使用方式  
- 进阶，深入理解  

**ref 是什么**

- 生成值类型的响应式数据  
- 可用于模板和 reactive  
- 通过 .value 修改值  

Ref.vue -- ref 使用

```vue
 <template>
   <p>{{ageRef}}{{state.name}}</p>
 </template>
 <script>
 import { ref,reactive } from 'vue';
 export default {
   name: 'Ref',
   
   setup() {
     // 建议 Ref 后缀命名
     // 值类型的响应式用 ref
     const ageRef = ref(20); 
     const nameRef = ref('youyi');
     // 引用类型的响应式数据一般使用 reactive
     const state = reactive({
       name: nameRef
     });
     
     setTimeout(() => {
       console.log(ageRef.value);
       ageRef.value = 25;  // .value 修改
       nameRef.value = 'pyy';
     },1500);
     
     return {
       ageRef,
       state
     };
     
     
   }
 }
  </script>
```



```vue
 <template>
 </template>
 <script>
 import {  } from 'vue';
 export default {
   name: '',
   
   setup() {
  
   }
 }
  </script>
```


Ref2.vue -- ref 获取DOM元素

```vue
 <template>
   <p ref="elemRef">我是一行文字</p>
 </template>
 <script>
 import { ref, onMounted } from 'vue';
 export default {
   name: '',
   
   setup() {
     const elemRef = ref(null);
     onMounted(() => {
       console.log(elemRef.value.innerHTML)
     })
   }
 }
  </script>
```

## 6-7 toRef 和 toRefs 如何使用


**toRef**

- 针对一个响应式对象（reactive 封装）的 prop  
- 创建一个 ref,具有响应式  
- 两者保持引用关系  

toRef.vue 示例

```vue
 <template>
   <p>{{ageRef}}-{{state.name}}{{state.age}}</p>
 </template>
 <script>
 import { ref, toRef, reactive } from 'vue';
 export default {
   name: 'ToRef',
   
   setup() {
     const state = reactive({
       age: 20,
       name: 'pyy'
     });
     
     // toRef 如果用于普通对象（非reactive响应式对象），产出的结果不具备响应式
     // const state ={
     //   age: 20,
     //   name: 'pyy'
     // };
     const ageRef = toRef(state, 'age');
     
     setTimeout(() => {
       state.age = 25
     },1500);
     
     setTimeout(() => {
       ageRef.value = 30  // .value 来修改值
     },3000);
     
     return {
       state,
       ageRef
     }
   }
 }
  </script>
```

**toRefs**

- 将响应式对象（reactive 封装）转换为普通对象★  
- 对象的每个 prop 都是对应的 ref  
- 两者保持引用关系  

toRefs.vue 示例


```vue
 <template>
   <p>{{age}}{{name}}</p>
 </template>
 <script>
 import { ref, toRef, toRefs, reactive } from 'vue';
 export default {
   name: 'toRefs',
   
   setup() {
     const state = reactive({
       age: 20,
       name: 'pyy'
     });
     const stateAsRefs = toRefs(state);
     
     return {
       ...stateAsRefs
     }
     
     // return stateAsRefs
   }
 }
  </script>
```

为何要绕一圈使用toRefs，因为不reactive，解构出来没有响应式。

## 6-8 ref toRef 和 toRefs 的最佳使用方式

合成函数返回响应式对象

```js
function useFeatureX() {
  const state = reactive({
    x: 1,
    y: 2
  })
  //...
  //返回时转换为 ref
  return toRefs(state)
},
	
export default {
	
	setup() {
	    // 可以在不丢失响应式的情况下破坏解构
	    const {x, y} = useFeatureX()；
	    return {
	        x,
	        y
	    }
	}
}
```

- ① 用 reactive 做对象的响应式， 用 ref 做值类型响应式  
- ② setup 中返回 toRefs(state), 或者 toRef(state, 'xxx')  
- ③ 合成函数返回响应式，使用 toRefs  
- ④ ref 的变量命名都用 xxxRef 

## 6-9 为什么需要用 ref

- 为何需要 ref ?  
- 为何需要.value?  
- 为何需要 toRef toRefs?  

### 为何需要 ref ?

- ① 返回值类型，会丢失响应式  
- ② 如在 setup、computed、合成函数，都有可能返回值类型  
- ③ Vue 如不定义 ref ,用户将自造 ref,反而混乱  


```js
import {ref, reactive} from 'vue'
export default {
  setup() {
    const nameRef = ref('pyy');
    const ageRef = ref(20);
  }
}
```

能被下面的方式代替吗？

```js
export default {
  setup() {
    const state = reactive({
      name: 'pyy',
      age: 20
    })
  }
}
```

答案：不行。原因如上 ② ③

```vue
 <template>
   <p>{{age}}</p>
 </template>
 <script>
 import {  } from 'vue';
 export default {
   name: 'WhyRef',
   
   setup() {
     let age = 20;
     setTimeout(() => {
       console.log(123);
       age = 25;
     },1000);
     
     return {
       age
     }
   }
 }
  </script>
```

值类型，会丢失响应式。上述例子中，通过 setTimeout 改变了 age 的值，但是页面上并未随着改变。

Vue3 的响应式是通过 Proxy 来实现的，Proxy 不能干预值类型的响应式，所以才产生 ref 来解决值类型的响应式。


## 6-10 为何 ref 需要 value 属性

- ref 是一个对象（不丢失响应式），value 存储值  
- 通过 .value 属性的 get 和 set 实现响应式  
- 用于模板、reactive 时，不需要 .value，其他情况都需要  


```js
// 错误
function computed(getter) {
  let value  = 100;
  setTimeout(() => {
    value = getter()
  },1000);
  return value;
}

// 测试
let a = 2;
a = computed(() => 100)

// 此时 a 依然等于2，并没有改变成 100。返回的value 是值类型，与a无关。

// 以上情况可以比喻为下例
let aa = 100;
let bb = aa;
aa = 200;
bb // 100
```

上述，所以如果 ref 是值类型，会丢失响应式。

```js
// 正确
function computed(getter) {
  let ref = {
    value: null
  };
  setTimeout(() => {
   ref.value = getter()
  },1000);
  return ref;
}

// 测试
let a = {};
a = computed(() => 100)

// 此时 a 为对象 {value: 100}，

// 以上情况可以比喻为下例
let obj1 = {x: 100},
let obj2 = obj1;
obj1.x = 200;
obj2  // 200
```

## 6-11 为什么需要 toRef 和 toRefs

- 初衷：不丢失响应式的情况下，把对象数据 `分解/扩散`  
- 前提：针对的是响应式对象（reactive封装的），非普通对象  
- 注意：不创造响应式，而是延续响应式  

### ref、toRef、toRefs 的区别

- 1、ref 是对元数据的拷贝，修改响应式数据时不会影响之前的数据，视图会更新  
- 2、toRef 和 toRefs 是对元数据的引用，修改响应式数据时，元数据也会改变，但是视图不会更新，toRef 修改的是对象的某个属性，toRefs 修改的是整个对象  
- 3、toRefs 的使用场景：如果想让响应式数据和原来的数据关联起来同步更新，并且不更新视图，那么就可以使用 toRefs  

[Vue3全家桶升级指南二ref、toRef、toRefs的区别](https://www.cnblogs.com/webwuyou/p/14976933.html)

## 6-12 vue3升级了哪些重要功能

- createApp  
- emits 属性  
- 生命周期  
- 多事件  
- Fragment  
- 移除.sync  
- 异步组件的写法  
- 移除 filter  
- Teleport  
- Suspense  
- Composition API  


### createApp

```js
// vue2.x
const app = new Vue({/*...*/})

// vue3
const app = Vue.createApp({/*...*/})
```

```js
// vue2.x
Vue.use(/*...*/)
Vue.mixin(/*...*/)
Vue.component(/*...*/)
Vue.directive(/*...*/)

// vue3
app.use(/*...*/)
app.mixin(/*...*/)
app.component(/*...*/)
app.directive(/*...*/)
```


### emits 属性  

父组件

```js
<HelloWorld :msg="msg" @onSayHello="sayHello"></HelloWorld>
```

子组件

```js
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  emits: ['onSayHello'],
  setup(props, {emit}) {
    emit('onSayHello', 'bbb')
  }
}
```

### 生命周期
  
### 多事件  

```js
<!-- 在methods 里定义 one two 两个函数 -->
<button @click="one($event), two($event)">Submit</button>
```


### Fragment  

Vue 需要一个根div包裹住

```js
<!--  vue2.x 组件模板 -->
<template>
  <div class="blog-post">
    <h3>{{ title }}</h3>
    <div v-html="content"></div>
  </div>
</template>
```

```js
<!--  vue3 组件模板 -->
<template>
    <h3>{{ title }}</h3>
    <div v-html="content"></div>
</template>
```


### 移除.sync  

```js
<!-- vue2 -->
<MyComponent v-bind:title.sync="title" />

<!-- vue3 -->
<MyComponent v-model:title="title" />
```

### 异步组件的写法 Asynchronous component  

vue3 需要引入 defineAsyncComponent 方法

```js
// vue2
new Vue({
  //...
  components: {
    'my-component': () => import('./my-async-component.vue')
  }
})
```

```js
// vue3
import {createApp, defineAsyncComponent } from 'vue'

createApp({
  // ...
  components: {
    AsyncComponent: defineAsComponent(() => import('./my-async-component.vue'))
  }
})
```

### 移除 filter  

以下 filter 在 vue3 中不可用了

```js
<!-- 在双花括号中 -->
{{message | capitalize}}

<!-- 在 v-bind 中 -->
<div v-bind:id="rawId | formatId"></div>
```


### Teleport  

```js
<!-- data 中设置 modalOpen:false -->
<button @click="modalOpen = true"></button>

<teleport to="body">
  <div v-if="modalOpen" class="modal">
    <div>
      <button @click="modalOpen = false">close</button>
    </div>
  </div>
</teleport>
```

### Suspense 

```js
<Suspense>
  <template>
    <Test1/>  <!-- 这是一个异步组件 -->
  </template>
  
  <template #fallback>
    Loading...
  </template>
</Suspense>
``` 

### Composition API  

- reactive  
- ref 相关  
- readonly  
- watch 和 watchEffect  
- setup  
- 生命周期钩子函数  

### 6-13 Composition API 如何实现逻辑复用

- 抽离逻辑代码到一个函数  
- 函数命名约定为 useXxxx 格式（react hooks 也是）  
- 在 setup 中引用 useXxx 函数  

**示例：获取鼠标定位，ref 方式**

把通用逻辑写在一个js文件的函数里，可以在多个vue文件里调用这个函数，达到逻辑复用的效果。

App.vue

```html
<template>
  <mousePosition/>
</template>
```

index.vue

```html
<template>
  <p>mouse position{{x}}{{y}}</p>
</template>

<script>
import { reactive} from 'vue';
import useMousePosition from './useMousePosition'
export default {
  name: 'MousePosition',
  setup() {
    const {x, y} = useMousePosition();
    
    return {
      x,
      y
    }
  }
}
</script>
```

useMousePosition.js

```js
import { ref, onMounted, onUnmounted } from 'vue'

function useMousePosition() {
  const x = ref(0);
  const y = ref(0);
  function update(e) {
    x.value = e.pageX;
    y.value = e.pageY;
  }
  onMounted(() => {
    window.addEventListenner('mousemove', update)
  });
  onUnMounted(() => {
    window.removeEventListenner('mousemove', update)
  });
  
  return {
    x,
    y
  }
}
export default useMousePosition
```

**示例2：获取鼠标定位，reactive 方式**

App.vue

```html
<template>
  <mousePosition/>
</template>
```

index.vue

```html
<template>
  <p>mouse position{{state.x}}{{state.y}}</p>
</template>

<script>
import { reactive} from 'vue';
import useMousePosition2 from './useMousePosition'
export default {
  name: 'MousePosition2',
  setup() {
  
    const state = useMousePosition();
    // 注意：不能像下面这样解构，这样会丢失响应式。★★★★★★
    // const {x, y} = useMousePosition();
    
    return {
      state    
    }
  }
}
</script>
```

useMousePosition.js

```js
import { ref, onMounted, onUnmounted } from 'vue'

function useMousePosition2() {
  const state = reactive({
    x: 0,
    y: 0
  })
  function update(e) {
    state.x = e.pageX;
    state.y = e.pageY;
  }
  onMounted(() => {
    window.addEventListenner('mousemove', update)
  });
  onUnMounted(() => {
    window.removeEventListenner('mousemove', update)
  });
  
  return state
}
export default useMousePosition2
```

**reactive 方式和 ref 方式对比。**

❶ 如果用 reactive ，需要把整个 reactive 对象返回，接收的时候也要整个接收，不能解构。

❷ 不能解构，不能解构，否则会丢失响应式。

❸ 在模板中用的时候，也需要 state.x 这样用

所以用 ref 方式更加灵活，除了修改的时候需要 .value 方式

## 6-14 Vue3如何实现响应式

- 回顾 vue2 的 Object.defineProperty  
- 学习 Proxy 语法  
- Vue3 如何用 Proxy 实现响应式  

### 回顾 vue2 的 Object.defineProperty

**监听 data 变化 - 简版**

```js
// 触发更新视图
function updateView() {
    console.log('视图更新')
}

// 重新定义属性，监听起来
function defineReactive(target, key, value) {

    // 核心 API
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newValue) {
            if (newValue !== value) {

                // 设置新值
                // 注意，value 一直在闭包中，此处设置完之后，再 get 时也是会获取最新的值
                value = newValue

                // 触发更新视图
                updateView()
            }
        }
    })
}

// 监听对象属性
function observer(target) {
    if (typeof target !== 'object' || target === null) {
        // 不是对象或数组
        return target
    }

    // 重新定义各个属性（for in 也可以遍历数组）
    for (let key in target) {
        defineReactive(target, key, target[key])
    }
}

// 准备数据
const data = {
    name: 'zhangsan',
    age: 20,
}

// 监听数据
observer(data)

// 测试
data.name = 'lisi'
data.age = 21
console.log('age', data.age)
```

**监听 data 变化 - 深度监听**

```js
// 触发更新视图
function updateView() {
    console.log('视图更新')
}

// 重新定义属性，监听起来
function defineReactive(target, key, value) {
    // 深度监听
    observer(value)
    // 核心 API
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newValue) {
            if (newValue !== value) {
                // 深度监听
                observer(newValue)
                // 设置新值
                // 注意，value 一直在闭包中，此处设置完之后，再 get 时也是会获取最新的值
                value = newValue

                // 触发更新视图
                updateView()
            }
        }
    })
}

// 监听对象属性
function observer(target) {
    if (typeof target !== 'object' || target === null) {
        // 不是对象或数组
        return target
    }

    // 重新定义各个属性（for in 也可以遍历数组）
    for (let key in target) {
        defineReactive(target, key, target[key])
    }
}

// 准备数据
const data = {
    name: 'zhangsan',
    age: 20,
    info: {
        address: '北京' // 需要深度监听
    },
}

// 监听数据
observer(data)

// 测试
data.info.address = '上海' // 深度监听
data.age = {num: 22}  // set 的时候也需要深度监听 newVal
data.age.num = 24

// data.x = '100' // 新增属性，监听不到 —— 所以有 Vue.set
// delete data.name // 删除属性，监听不到 —— 所有已 Vue.delete

```

Object.defineProperty 缺点

	•	深度监听，需要递归到底，一次性计算量大
	•	无法监听新增属性/删除属性 （Vue.set Vue.delete）
	•	无法原生监听数组，需要特殊处理


## 6-15 Proxy 基本使用

## 6-16 vue3 用Proxy 实现响应式

## 6-17 v-model 参数的用法



[.sync 修饰符](https://cn.vuejs.org/v2/guide/components.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6)

vue3 的语法糖

[v-model 参数](https://v3.cn.vuejs.org/guide/component-custom-events.html#v-model-%E5%8F%82%E6%95%B0)

## 6-18 watch 和 watchEffect 的区别

- 两者都可监听 data 属性变化  
- watch 需要明确监听哪个属性  
- watchEffect 会根据其中的属性，自动监听其变化  

### watch

[watch](https://v3.cn.vuejs.org/api/computed-watch-api.html#watch)

watch 监听 ref 和 reactive 时第一个参数的写法不同，reactive 时第一个参数需要写函数

```js
// 直接侦听一个 ref
const count = ref(0)
watch(count, (count, prevCount) => {
  /* ... */
})


// 侦听一个 getter
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)
```

watch 默认初始化的时候不执行

### watchEffect

watchEffect 默认初始化的时候执行一次（收集要监听的数据）

```js
watchEffect(() => {
    console.log('state.name', state.name);
    console.log('state.age', state.age);
})
```

watchEffect 似乎用起来比较灵活吧。缺点呢


## 6-19 setup中如何获取组件实例

- 在 setup 和其他 Composition API 中没有 this  
- 可通过 getCurrentInstance 获取当前实例  
- 若使用 Options API 可照常使用 this  

```js
<template>

</template>

<script>
export default {
  name: 'GetInstance',
  data() {
    return {
      x: 1,
      y: 2
    }
  },

  setup() {
    console.log('this1', this);  // undefined
    onMounted(() => {
      console.log('this in onMounted', this);  // undefined
      console.log('x', instance.data.x)  // 这里可以取出x的值
    });
    
    const instance = getCurrentInstance();
    console.log('instance', instance);  // 可以打印出组件
    console.log('x', instance.data.x)  // undefined
  },
  mounted() {
    console.log('this2', this);  // this 可以取出
    console.log('y', this.y);  // y 可以取出
  }
}
</script>
```


## 6-20 什么是 PatchFlag

Vue3 为何比 Vue2 快

- Proxy 响应式  
- PatchFlag  
- hoistStatic  
- cacheHandler  
- SSR 优化  
- tree-shaking  

### PatchFlag 动态节点做标记

- 编译模板时，动态节点做标记  
- 标记，分为不同的类型，如 TEXT PROPS  
- diff 算法时，可以区分静态节点，以及不同类型的动态节点 

<div class="rd">
    <img src="/assets/images/2023/7-8-9/patchFlag.png" alt="">
</div>
 
Vue3 diff算法对比Vue2 diff算法 可以不用对比没有变化的静态节点。


### 6-21 什么是 HoistStatic 和 CacheHandler 


#### hoistStatic静态提升 

- `将静态节点的定义，提升到父作用域，缓存起来`  
- 多个相邻的静态节点，会被合并起来  
- 典型的拿空间换时间的优化策略  

#### cacheHandler 缓存事件

- 缓存事件  

## 6-22 SSR和Tree-shaking的优化

### SSR 优化

- 静态节点直接输出，绕过 vdom  
- 动态节点，还是需要动态渲染  


### Tree-shaking

- 编译时，根据不同的情况，引入不同的API  


## 6-23 Vite 为什么启动非常快

### Vite 是什么

Vite 是一个 web 开发构建工具，由于其原生ES模块导入方式，可以实现闪电般的冷服务器启动

- Vite 是一个前端打包工具，vue作者发起的项目  
- 借助 Vue 的影响力，发展叫快，和 webpack 竞争    
- 优势：开发环境下无需打包，启动快  


Vite 启动快的原因

- 开发环境使用 ES6 Module  ，无需打包--非常快  
- 生产环境使用 rollup ,并不会快很多  

例子

```js
<script type="module">
  import add from './src/add.js'
  const res = add(1,2);
  console.log('add res',res)
</script>
```

## 6-24 ES Module 在浏览器中的应用

## 6-25 Composition API 和 React Hooks 的对比

- 前者 `setup 只会被调用一次`，而后者函数会被多次调用  
- 前者无需 useMemo useCallback,因为 setup 只调用一次  
- 前者无需顾虑调用顺序，而后者需要保证 hooks 的顺序一致  
- 前者 reactive + ref 比后者 useState ，要难理解  

## 6-26 vue3考点总结

vue3

- vue3新功能
   + createApp
   + emits 属性
   + 多事件处理
   + Fragment
   + 移除.sync 改为v-model 参数
   + 异步组件的引用方式
   + Teleport
   + Suspense
   + Composition API
     - reactive
     - **ref toRef toRefs**
     - readonly
     - computed
     - watch watchEffect
     - **钩子函数生命周期**
- vue原理
  + Proxy实现响应式
  + 编译优化
     - PatchFlag 静态标记
     - hoistStatic 静态提升
     - cacheHandler 缓存事件
     - SSR 优化
     - Tree-shaking 优化
- Vite - ES6 module


vue3面试题

- Vue3 比 Vue2 有什么优势？  
- 描述Vue3生命周期（Composition、options）  
- 如何看待 Composition API 和 Options API?   
- 如何理解  ref toRef 和 toRefs ?(重要)  
- Vue3 升级了哪些重要的功能？  
- Vue3 如何实现代码逻辑复用？  
- Vue3 如何实现响应式？  
- watch 和 watchEffect 的区别是什么？  
- setup 中如何获取组件实例？  
- Vue 3为何比vue2 快？  
- Vite 是什么？
- Composition API 和 ReactHooks 的对比  



