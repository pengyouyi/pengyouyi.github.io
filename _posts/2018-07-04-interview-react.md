---
layout: post
title: React面试题汇总
tags:
- Interview
- react
categories: JS
description: React面试题汇总
---

## React中调用setState之后发生了什么事情?

- React会将当前传入的参数对象与组件当前的状态合并,然后触发调和过程,在调和的过程中,React会以相对高效的方式根据新的状态构建React元素树并且`重新渲染整个UI界面`.

- 	React得到的元素树之后,React会自动计算出新的树与老的树的节点的差异,然后根据`差异对界面进行最小化的渲染`,在React的差异算法中,React能够精确的知道在哪些位置发生看改变以及应该如何去改变,这样就保证了UI是按需更新的而不是重新渲染整个界面.


## React中Element与Component的区别?

- ReactElement是描述屏幕上所见的内容的数据结构,是对于UI的对象的表述.典型的ReactElement就是利用JSX构建的声明式代码片段,然后被转化为createElement的调用组合.

- ReactComponent则是可以接收参数输入并且返回某个ReactElement的函数或者类


## 在什么情况下会优先选择使用ClassComponent而不是FunctionalComponent?

组件需要包含内部状态或者使用到生命周期函数的时候使用ClassComponent,否则使用函数式组件


## React中的refs属性的作用是什么?

Refs是React提供给我们安全的访问DOM元素或者某个组件实例的句柄,我们可以为元素添加ref属性然后在回调函数中接收该元素在DOM树中的句柄,该值会作为回调函数的第一个参数的返回.

```js
class CustomerForm extends Component{
    handleSubmit = () => {
        console.log('Input Value:'+this.input.value);
    }
    render(){
        return (
            <form onSubmit = {this.handleSubmit}>
                <input type="text" ref={(input)=> this.input = input } />
                <button type="submit">Submit</botton>
            </form>
        )
    }
}
```

Input域中包含了一个ref属性,该属性的声明的回调函数会接收inout对应的DOM元素,我们将其绑定到this指针以便在其他的类函数中使用,refs并不是类组件的专属,函数式组件同样可以利用闭包的方式暂时存储其值.

```js
function CustomerForm(handleSubmit){
    let inputElement ;
    return (
        <form onSubmit = {()=>handleSubmit(inputElement.value)}>
        <input type='text' ref={(input) => 
            inputElement = input 
        } />
        <button type="submit">Submit</botton>
        </form>
    )
}
```

## React中keys的作用是什么?

Keys 是React在操作列表中元素被修改,添加,或者删除的辅助标识.

```js
render(){
    return (
        <ul>
            {this.state.todoItems.map(({task,uid})=>{
                return <li key={uid}>{task}</li>
            })}
        </ul>
    )
}
```

在开发过程中,我们需要保证某个元素的key 在其同级元素中具有唯一性,在`ReactDiff`算法中React会借助元素的`Key`值来判断该元素是新创建的还是被移动而来的元素,React会保存这个辅助状态,从而`减少不必要的元素渲染`.
此外,React还需要借助Key值来判断元素与本地状态的关联干洗,因此我们在开发中不可忽视Key值的使用.



## 如果你创建了类似于下面的Twitter元素，那么它相关的类定义是啥样子的

```js
<Twitter username='tylermcginnis33'>
  {(user) => user === null
    ? <Loading />
    : <Badge info={user} />}
</Twitter>
```


```js
import React, { Component, PropTypes } from 'react'
import fetchUser from 'twitter'
// fetchUser take in a username returns a promise
// which will resolve with that username's data.
class Twitter extends Component {
  // finish this
}
```

`回调渲染模式(Render Callback Pattern)`,在这种模式中,组件会接收某个函数作为子组件,然后在渲染函数中以`props.children`进行调用.

```js
import React, { Component, PropTypes } from 'react'
import fetchUser from 'twitter'
class Twitter extends Component {
  state = {
    user: null,
  }
  static propTypes = {
    username: PropTypes.string.isRequired,
  }
  componentDidMount () {
    fetchUser(this.props.username)
      .then((user) => this.setState({user}))
  }
  render () {
    return this.props.children(this.state.user)
  }
}
```

这种模式的优势在于将父组件与子组件`解耦和`，父组件可以直接访问子组件的内部状态而不需要再通过Props传递，这样父组件能够更为方便地控制子组件展示的UI界面。譬如产品经理让我们将原本展示的Badge替换为Profile，我们可以轻易地修改下回调函数即可：

```js
<Twitter username='tylermcginnis33'>
  {(user) => user === null
    ? <Loading />
    : <Profile info={user} />}
</Twitter>
```

## Controlled Component 与 Uncontrolled Component 之间的区别是什么？

React 的核心组成之一就是能够维持内部状态的自治组件，不过当我们引入原生的HTML表单元素时（input,select,textarea 等），我们是否应该将所有的数据托管到 React 组件中还是将其仍然保留在 DOM 元素中呢？这个问题的答案就是受控组件与非受控组件的定义分割。

受控组件（Controlled Component）代指那些交由 React 控制并且所有的表单数据统一存放的组件。

譬如下面这段代码中username变量值并没有存放到DOM元素中，而是存放在组件状态数据中。任何时候我们需要改变username变量值时，我们应当调用setState函数进行修改。

```js
class ControlledForm extends Component {
  state = {
    username: ''
  }
  updateUsername = (e) => {
    this.setState({
      username: e.target.value,
    })
  }
  handleSubmit = () => {}
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          value={this.state.username}
          onChange={this.updateUsername} />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}
```

而非受控组件（Uncontrolled Component）则是由DOM存放表单数据，并非存放在 React 组件中。我们可以使用 refs 来操控DOM元素：

```js
class UnControlledForm extends Component {
  handleSubmit = () => {
    console.log("Input Value: ", this.input.value)
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          ref={(input) => this.input = input} />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}
```

竟然非受控组件看上去更好实现，我们可以直接从 DOM 中抓取数据，而不需要添加额外的代码。

不过实际开发中我们并`不提倡使用非受控组件`，因为实际情况下我们需要更多的考虑表单验证、选择性的开启或者关闭按钮点击、强制输入格式等功能支持，而此时我们将数据托管到 React 中有助于我们更好地`以声明式的方式完成这些功能`。

引入 React 或者其他 MVVM 框架最初的原因就是为了将我们从繁重的`直接操作 DOM 中解放`出来。

### 箭头函数

```js
x => x * x

function (x) {
    return x * x;
}
```

箭头函数相当于匿名函数，并且简化了函数定义。箭头函数有两种格式，一种像上面的，只包含一个表达式，连`{ ... }`和`return`都省略掉了。

还有一种可以包含多条语句，这时候就不能省略`{ ... }`和`return`：

```js
x => {
    if (x > 0) {
        return x * x;
    }
    else {
        return - x * x;
    }
}
```


[更多箭头函数](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001438565969057627e5435793645b7acaee3b6869d1374000)

## 在生命周期中的哪一步你应该发起 AJAX 请求？

我们应当将AJAX 请求放到 componentDidMount 函数中执行，主要原因有下：

- React 下一代调和算法 Fiber 会通过开始或停止渲染的方式优化应用性能，其会影响到 componentWillMount 的触发次数。对于 componentWillMount 这个生命周期函数的调用次数会变得不确定，React 可能会多次频繁调用 componentWillMount。如果我们将 AJAX 请求放到 componentWillMount 函数中，那么显而易见其会被触发多次，自然也就不是好的选择。 
- 如果我们将 AJAX 请求放置在生命周期的其他函数中，我们并不能保证请求仅在组件挂载完毕后才会要求响应。如果我们的数据请求在组件挂载之前就完成，并且调用了setState函数将数据添加到组件状态中，对于未挂载的组件则会报错。而在 componentDidMount 函数中进行 AJAX 请求则能有效避免这个问题。 

## shouldComponentUpdate 的作用是啥以及为何它这么重要

shouldComponentUpdate 允许我们手动地判断是否要进行组件更新，根据组件的应用场景设置函数的合理返回值能够帮我们避免不必要的更新。

## 如何告诉 React 它应该编译生产环境版本？

通常情况下我们会使用 Webpack 的 DefinePlugin 方法来将 NODE_ENV 变量值设置为 production。编译版本中 React 会忽略 propType 验证以及其他的告警信息，同时还会降低代码库的大小，React 使用了 Uglify 插件来移除生产环境下不必要的注释等信息


## 为什么我们需要使用 React 提供的 Children API 而不是 JavaScript 的 map？

props.children并不一定是数组类型，譬如下面这个元素：

```js
<Parent>
  <h1>Welcome.</h1>
</Parent>
```

如果我们使用props.children.map函数来遍历时会受到异常提示，因为在这种情况下props.children是对象（object）而不是数组（array）。

React 当且仅当超过一个子元素的情况下会将props.children设置为数组，就像下面这个代码片：

```js
<Parent>
  <h1>Welcome.</h1>
  <h2>props.children will now be an array</h2>
</Parent>
```

这也就是我们优先选择使用React.Children.map函数的原因，其已经将props.children不同类型的情况考虑在内了。

## 概述下 React 中的事件处理逻辑

为了解决跨浏览器兼容性问题，React 会将浏览器原生事件（Browser Native Event）封装为合成事件（SyntheticEvent）传入设置的事件处理器中。这里的合成事件提供了与原生事件相同的接口，不过它们屏蔽了底层浏览器的细节差异，保证了行为的一致性。

另外有意思的是，React 并没有直接将事件附着到子元素上，而是以单一事件监听器的方式将所有的事件发送到顶层进行处理。这样 React 在更新 DOM 的时候就不需要考虑如何去处理附着在 DOM 上的事件监听器，最终达到优化性能的目的。

## createElement 与 cloneElement 的区别是什么？

createElement 函数是 JSX 编译之后使用的创建 React Element 的函数，

而 cloneElement 则是用于复制某个元素并传入新的 Props。

## 传入 setState 函数的第二个参数的作用是什么？

```js
this.setState(
  { username: 'tylermcginnis33' },
  () => console.log('setState has finished and the component has re-rendered.')
)
```

## 下述代码有错吗？

```js
this.setState((prevState, props) => {
  return {
    streak: prevState.streak + props.count
  }
})
```

这段代码没啥问题，不过只是不太常用罢了，详细可以参考[React中setState同步更新策略](https://zhuanlan.zhihu.com/p/24781259?refer=wxyyxc1992)

## React 使用场景？

逻辑复杂单页应用，偏中后台管理系统，纯展示性的UI页面不合适、

## 描述一下React 生命周期

渲染过程调用到的生命周期函数，主要几个要知道；

* constructor

* getInitialState

* getDefaultProps

* componentWillMount

* render

* componentDidMount

更新过程

* componentWillReceiveProps

* shouldComponentUpdate

* componentWillUpdate

* render

* componentDidUpdate


卸载过程

componentWillUnmount

## 实现组件有哪些方式？

React.createClass 使用API来定义组件

React ES6 class component 用 ES6 的class 来定义组件

Functional stateless component 通过函数定义无状态组件

## 什么时候应该选择用class实现一个组件，什么时候用一个函数实现一个组件？

组件用到了state或者用了生命周期函数，那么就该使用Class component。其他情况下，应使用Functional component。

## 什么是HoC（Higher-Order Component）？适用于什么场景？

高阶组件就是一个 React 组件包裹着另外一个 React 组件

## 并不是父子关系的组件，如何实现相互的数据通信？

使用父组件，通过props将变量传入子组件 （如通过refs，父组件获取一个子组件的方法，简单包装后，将包装后的方法通过props传入另一个子组件 ）

### React-router 路由的实现原理？

### 说说React Native,Weex框架的实现原理？

### 用过 React 技术栈中哪些数据流管理库？

### Redux是如何做到可预测呢？

### Redux将React组件划分为哪两种？

### Redux是如何将state注入到React组件上的？

### 请描述一次完整的 Redux 数据流

### React的批量更新机制 BatchUpdates？

### React与Vue，各自的组件更新进行对比，它们有哪些区别？

### react-router 路由系统的实现原理？

### React中如何解决第三方类库的问题?


