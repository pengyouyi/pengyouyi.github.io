---
layout: post
title: 慕课网-前端框架及项目面试 聚焦Vue/React/Webpack - 第11章 项目设计
tags:
- Interview
- imooc
- vue
- react
categories: Framework
description: 慕课网-前端框架及项目面试 聚焦Vue/React/Webpack - 第11章 项目设计
---

# 项目设计 - Project design

## why面试为何会考察组件和状态设计

**组件和状态设计**

- 框架（vue React）的使用和高级特性是必要条件  
- 能独立负责项目？还是需要别人带着？ - 考察设计能力  
- 面试必考（二面、三面），场景题  

**考察重点**

- 数据驱动视图  
- 状态：数据结构设计（React-state,Vue-data）  
- 视图：组件结构和拆分  

**回顾面试题**

- React 设计 todolist （组件结构，redux state 数据结构）  
- vue 设计购物车（组件结构，vuex state 数据结构）  

# React 实现 todolist

<div class="rd">
    <img src="/assets/images/2020/7-8-9/8-28-1.png" alt="">
</div>

- state 数据结构设计  
- 组件设计（拆分、组合）和组件通讯  

## 状态设计的思路和要点-state

**state 数据结构设计**

- 用数据描述所有内容（而不是功能）  
- 数据要结构化，易于程序操作（遍历、查找）  
- 数据要可扩展，可以增加新的功能  

```js
this.state = {
    list: [
        {
            id: 1,
            title: '标题1',
            completed: false
        },
        // 
    ]
}
```

## 组件设计的思路和要点-component

**组件设计**

- 从功能上拆分层次  
- 尽量让组件原子化  
- 容器组件（只管理数据、事件）& UI 组件 （显示视图、交互）

<div class="rd">
    <img src="/assets/images/2020/7-8-9/8-28-2.png" alt="">
</div>

最外层的红色框是容器组件，蓝色和绿色是 UI 组件

```js
<App> {/* 只负责管理数据 */}
    <InputItem/> {/* 只负责输入，将数据结果给父组件 */}
    <List> {/* 只负责显示列表，从父组件获取数据 */}
        <ListItem/> {/* 显示单条数据，删除、切换完成状态 */}
        <ListItem/>
        <ListItem/>
    </List>
</App>
```

## React实现TodoList代码演示

**项目结构**

+ TodoList
     - UI
         + CheckBox.js
         + Input.js
     - index.js
     - InputItem
     - List.js
     - ListItem.js

 
index.js
 
```js
import React from 'react'
import List from './List'
import InputItem from './InputItem'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                {
                    id: 1,
                    title: '标题1',
                    completed: false
                },
                {
                    id: 2,
                    title: '标题2',
                    completed: false
                },
                {
                    id: 3,
                    title: '标题3',
                    completed: false
                }
            ]
        }
    }
    render() {
        return <div>
            <InputItem addItem={this.addItem}/>
            <List
                list={this.state.list}
                deleteItem={this.deleteItem}
                toggleCompleted={this.toggleCompleted}
            />
        </div>
    }
    // 新增一项
    addItem = (title) => {
        const list = this.state.list
        this.setState({
            // 使用 concat 返回不可变值
            list: list.concat({
                id: Math.random().toString().slice(-5), // id 累加
                title,
                completed: false
            })
        })
    }
    // 删除一项
    deleteItem = (id) => {
        this.setState({
            // 使用 filter 返回不可变值
            list: this.state.list.filter(item => item.id !== id)
        })
    }
    // 切换完成状态
    toggleCompleted = (id) => {
        this.setState({
            // 使用 map 返回不可变值
            list: this.state.list.map(item => {
                const completed = item.id === id
                    ? !item.completed
                    : item.completed // 切换完成状态
                // 返回新对象
                return {
                    ...item,
                    completed
                }
            })
        })
    }
}

export default App
```
 
InputItem.js
 
```js
import React from 'react'
import Input from './UI/Input'

class InputItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: ''
        }
    }
    render() {
        return <div>
            <Input value={this.state.title} onChange={this.changeHandler}/>
            <button onClick={this.clickHandler}>新增</button>
        </div>
    }
    changeHandler = (newTitle) => {
        this.setState({
            title: newTitle
        })
    }
    clickHandler = () => {
        const { addItem } = this.props
        addItem(this.state.title)

        this.setState({
            title: ''
        })
    }
}

export default InputItem
```
 
List.js
 
```js
import React from 'react'
import ListItem from './ListItem'

function List({ list = [], deleteItem, toggleCompleted }) {
    return <div>
        {list.map(item => <ListItem
            item={item}
            key={item.id}
            deleteItem={deleteItem}
            toggleCompleted={toggleCompleted}
        />)}
    </div>
}

export default List
```
 
ListItem.js
 
```js
import React from 'react'
import CheckBox from './UI/CheckBox'

class ListItem extends React.Component {
    render() {
        const { item } = this.props

        return <div style={{ marginTop: '10px' }}>
            <CheckBox onChange={this.completedChangeHandler}/>
            <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                {item.title}
            </span>
            <button onClick={this.deleteHandler}>删除</button>
        </div>
    }
    completedChangeHandler = (checked) => {
        console.log('checked', checked)
        const { item, toggleCompleted } = this.props
        toggleCompleted(item.id)
    }
    deleteHandler = () => {
        const { item, deleteItem } = this.props
        deleteItem(item.id)
    }
}

export default ListItem
```
 
UI/CheckBox.js
 
```js
import React from 'react'

class CheckBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false
        }
    }
    render() {
        return <input type="checkbox" checked={this.state.checked} onChange={this.onCheckboxChange}/>
    }
    onCheckboxChange = () => {
        const newVal = !this.state.checked
        this.setState({
            checked: newVal
        })

        // 传给父组件
        this.props.onChange(newVal)
    }
}

export default CheckBox
```
 
UI/Input.js
 
```js
import React from 'react'

class Input extends React.Component {
    render() {
        return <input value={this.props.value} onChange={this.onChange}/>
    }
    onChange = (e) => {
        // 传给父组件
        const newVal = e.target.value
        this.props.onChange(newVal)
    }
}

export default Input
```
 
# Vue实现购物车

- data 数据结构设计  
- 组件设计和组件通讯  

<div class="rd">
    <img src="/assets/images/2020/7-8-9/8-28-3.png" alt="">
</div>

## Vue实现购物车data如何设计

**data 数据结构设计**

```js
productionList: [
    {
        id: 1,
        title: '商品1',
        price: 10
    },
    // ...
],
cartList: [
    {
        id: 1,
        quantity: 1
    },
    // ...
]
```

注意：总价是功能，不是内容，是通过计算出来，类似的还有均价、最低最高价等。
通过 id 引用可以解决数据冗余问题，扩展性好，可以只修改 productionList 一处的信息

## Vue实现购物车-组件设计和代码演示

<div class="rd">
    <img src="/assets/images/2020/7-8-9/8-28-4.png" alt="">
</div>

项目结构

- Cart
    - CartList
        + CartItem.vue
        + index.vue
        + TotalPrice.vue
    - ProductionList
        + index.vue
        + ProductionItem.vue
    - event.js
    - index.js

Cart/index.vue

```js
<template>
    <div>
        <ProductionList :list="productionList"/>
        <hr>
        <CartList
            :productionList="productionList"
            :cartList="cartList"
        />
    </div>
</template>

<script>
import ProductionList from './ProductionList/index'
import CartList from './CartList/index'
import event from './event'

export default {
    components: {
        ProductionList,
        CartList
    },
    data() {
        return {
            productionList: [
                {
                    id: 1,
                    title: '商品A',
                    price: 10
                },
                {
                    id: 2,
                    title: '商品B',
                    price: 15
                },
                {
                    id: 3,
                    title: '商品C',
                    price: 20
                }
            ],
            cartList: [
                {
                    id: 1,
                    quantity: 1 // 购物数量
                }
            ]
        }
    },
    methods: {
        // 加入购物车
        addToCart(id) {
            // 先看购物车中是否有该商品
            const prd = this.cartList.find(item => item.id === id)
            if (prd) {
                // 数量加一
                prd.quantity++
                return
            }
            // 购物车没有该商品
            this.cartList.push({
                id,
                quantity: 1 // 默认购物数量 1
            })
        },
        // 从购物车删除一个（即购物数量减一）
        delFromCart(id) {
            // 从购物车中找出该商品
            const prd = this.cartList.find(item => item.id === id)
            if (prd == null) {
                return
            }

            // 数量减一
            prd.quantity--

            // 如果数量减少到了 0
            if (prd.quantity <= 0) {
                this.cartList = this.cartList.filter(
                    item => item.id !== id
                )
            }
        }
    },
    mounted() {
        event.$on('addToCart', this.addToCart)
        event.$on('delFromCart', this.delFromCart)
    }
}
</script>
```

event.js

```js
import Vue from 'vue'

export default new Vue()
```

CartList/index.vue

```js
<template>
    <div>
        <CartItem
            v-for="item in list"
            :key="item.id"
            :item="item"
        />
        <p>总价 {{totalPrice}}</p>
    </div>
</template>

<script>
import CartItem from './CartItem'

export default {
    components: {
        CartItem,
    },
    props: {
        productionList: {
            type: Array,
            default() {
                return [
                    // {
                    //     id: 1,
                    //     title: '商品A',
                    //     price: 10
                    // }
                ]
            }
        },
        cartList: {
            type: Array,
            default() {
                return [
                    // {
                    //     id: 1,
                    //     quantity: 1
                    // }
                ]
            }
        }
    },
    computed: {
        // 购物车商品列表
        list() {
            return this.cartList.map(cartListItem => {
                // 找到对应的 productionItem
                const productionItem = this.productionList.find(
                    prdItem => prdItem.id === cartListItem.id
                )

                // 返回商品信息，外加购物数量
                return {
                    ...productionItem,
                    quantity: cartListItem.quantity
                }
                // 如：
                // {
                //     id: 1,
                //     title: '商品A',
                //     price: 10,
                //     quantity: 1 // 购物数量
                // }
            })
        },
        // 总价
        totalPrice() {
            return this.list.reduce(
                (total, curItem) => total + (curItem.quantity * curItem.price),
                0
            )
        }
    }
}
</script>
```

CartList/CartItem.vue

```js
<template>
    <div>
        <span>{{item.title}}</span>
        &nbsp;
        <span>(数量 {{item.quantity}})</span>
        &nbsp;
        <a href="#" @click="addClickHandler(item.id, $event)">增加</a>
        &nbsp;
        <a href="#" @click="delClickHandler(item.id, $event)">减少</a>
    </div>
</template>

<script>
import event from '../event'

export default {
    props: {
        item: {
            type: Object,
            default() {
                return {
                    // id: 1,
                    // title: '商品A',
                    // price: 10,
                    // quantity: 1 // 购物数量
                }
            }
        }
    },
    methods: {
        addClickHandler(id, e) {
            e.preventDefault()
            event.$emit('addToCart', id)
        },
        delClickHandler(id, e) {
            e.preventDefault()
            event.$emit('delFromCart', id)
        }
    }
}
</script>
```

CartList/TotalPrice.vue

```js
<template>
    <p>total price</p>
</template>

<script>
export default {
    data() {
        return {
        }
    }
}
</script>
```

ProductionList/index.vue

```js
<template>
    <div>
        <ProductionItem
            v-for="item in list"
            :key="item.id"
            :item="item"
        />
    </div>
</template>

<script>
import ProductionItem from './ProductionItem'

export default {
    components: {
        ProductionItem,
    },
    props: {
        list: {
            type: Array,
            default() {
                return [
                    // {
                    //     id: 1,
                    //     title: '商品A',
                    //     price: 10
                    // }
                ]
            }
        }
    }
}
</script>
```

ProductionList/ProductionItem.vue

```js
<template>
    <div>
        <span>{{item.title}}</span>
        &nbsp;
        <span>{{item.price}}元</span>
        &nbsp;
        <a href="#" @click="clickHandler(item.id, $event)">加入购物车</a>
    </div>
</template>

<script>
import event from '../event'

export default {
    props: {
        item: {
            type: Object,
            default() {
                return {
                    // id: 1,
                    // title: '商品A',
                    // price: 10
                }
            }
        }
    },
    methods: {
        clickHandler(id, e) {
            e.preventDefault()
            event.$emit('addToCart', id)
        }
    },
}
</script>
```

## 结合vuex实现购物车

https://github.com/vuejs/vuex/

https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart
