---
layout: post
title: 慕课网-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第7章 组件化和 React
tags:
- Interview
- imooc
categories: JS
description: 慕课网-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第7章 组件化和 React
---

慕课网学习笔记-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第7章 组件化和 React

# begin

```js
hello
    我是4个中文空格
        我是8个中文空格
    我是4个英文空格
        我是8个英文空格
  一个英文tab
    2个英文tab
  一个中文tab
    2个中文tab
  2英文空格
  2中文空格
        4个英文tab
        4个中文tab   
```

1、 说一下对组件化的理解

2、 jsx本质是什么

3、 jsx和vdom的关系

4、 说一下setState的过程

5、 阐述自己对react和vue的认识

# todolist-demo

```js
sudo cnpm i create-react-app -g

create-react-app react-test-me

npm start
```

src/index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
```

src/App.js

```js
import Todo from './components/todo/index.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Todo/>
      </div>
    );
  }
}

export default App;
```

src/components/index.js
```js
import React , { Component } from 'react';
import List  from './list/index.js';
import Input from './input/index.js';

class Todo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: []
		}
	};
	render() {
		return (
              <div>
                <Input addTitle={this.addTitle.bind(this)}/>
                <List data={this.state.list}/>
              </div>
			)
	};
	addTitle(title) {
	    const currentList = this.state.list;
	    this.setState({
	        list: currentList.concat(title)
	    })
	}
}

export default Todo;
```

src/components/input/index.js

```js
import React , { Component } from 'react';

class Input extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: ''
		}
	};
	render() {
		return (
              <div>
                <input value={this.state.title} onChange={this.changeHandle.bind(this)}/>
                <button onClick={this.clickHandle.bind(this)}>submit</button>
              </div>
			)
	};
	changeHandle(e) {
	    this.setState({
     	    title: e.target.value
	    })
	};
	clickHandle() {
		const title = this.state.title;
		const addTitle = this.props.addTitle;
		addTitle(title);
		// 把title添加进列表
		this.setState({
			title: ''
		})
	}
}

export default Input;
```

src/components/list/index.js

```js
import React , { Component } from 'react';

class List extends Component {
	constructor(props) {
		super(props);
	};
	render() {
		const list = this.props.data;
		return (
              <div>
                <ul>
                  {
                  	list.map((item,index) => {
                      return <li key={index}>{item}</li>
                  	})
                  }
                </ul>
              </div>
			)
	}
}

export default List;
```

# 组件化-Component-based

说一下对组件化的理解

- 组件的封装

- 组件的复用

## 组件封装-component-package

**组件的封装**

- 视图

- 数据

- 变化逻辑（数据驱动视图变化）


```js
class Todo extends Component {
	constructor(props) {
		super(props);
		//数据封装-start
		this.state = {
			list: []
		}
		//数据封装-end
	};
	render() {
		return (
		         /*视图封装-start*/
              <div>
                <Input addTitle={this.addTitle.bind(this)}/>
                <List data={this.state.list}/>
              </div>
              /*视图封装-end*/
			)
	};
	addTitle(title) {
       const currentList = this.state.list;
       // 变化逻辑封装-start
       this.setState({  
       	  list: currentList.concat(title)
       })
       // 变化逻辑封装-end
	}
}
```

## 组件复用-reuse

**组件的复用：props传递、复用**

```js
<div>
	<Input addTitle={this.addTitle.bind(this)}/>
	<List data={this.state.list}/>
	<List data={this.state.list}/>
	<List data={this.state.list}/>
</div>
```

```js
class List extends Component {
	render() {
		const list = this.props.data;
		return (
              <div>
                <ul>
                  {
                  	list.map((item,index) => {
                      return <li key={index}>{item}</li>
                  	})
                  }
                </ul>
              </div>
			)
	}
}
```

# JSX本质

jsx语法

jsx解析成JS

独立的标准

## JSX语法演示

- HTML形式

- 引入JS变量和表达式

- if..else...

- 循环

- style和className

- 事件

```js
render() {
  const name="zhangsan";
  const show = true;
  const list = [];
  const styleConfig = {
    color: 'blue',
    fontSize: '40px'
  }
  
  return (
    <div  className="container">
       {/*注释*/}
       <p>{name}</p>
       <p>{name ? 1 : 0}</p>
       <p>{(name === '').toString()}</p>
       <p>{name || 'lisi'}</p>
       
       {show ?  <img src=''/>:" "}
       
       <ul>
          {list.map((item,index) => {
            return <li key={index}>{item}</li>
          })}
       </ul>
       
       <p style={styleConfig}>hello</p>
    </div>
	)
};
```

## JSX解析成JS

jsx语法根本无法被浏览器所解析

那么它如何在浏览器运行

```js
React.createElement('div', {id: 'div1'}, child1,child2,child3)
React.createElement('div', {id: 'div1'}, [...])
```

jsx其实是语法糖

开发环境会将jsx编译成JS代码

jsx的写法大大降低了学习成本和编码工作量

## JSX标准

jsx独立的标准

- jsx 是React引入的，但不是React独有的

- React 已经将它作为一个独立标准开放，其他项目也可用

- React.createElement 是可以自定义修改的

- 说明：本身功能已经完备；和其他标准兼容和扩展性没问题

# JSX和vdom

分析：为何需要vdom

React.createElement 和 h

何时 patch ?

自定义组件的解析

## vdom回顾

**为何需要vdom**

- vdom 是React 初次推广开来的，结合jsx

- jsx就是模板，最终要渲染成 html

- 初次渲染 + 修改 state 后的 re-render

- 正好符合vdom 的应用场景

## 何时patch

- 初次渲染 - ReactDOM.render(<APP/>, container)

- 会触发patch(container,vnode)

- re-render-setState

- 会触发patch(vnode, newVnode)

```js
// patch(container,vnode)
ReactDOM.render(<App />, document.getElementById('root'));

// patch(vnode, newVnode)
this.setState({
  list: currentList.concat(title)
})
```

## 自定义组件的处理-Custom

```js
<div>
    <List data={this.state.list}/>
</div>
```
```js
React.createElement('div',null,
  React.createElement(Input,{data:this.state.list})
)
// var list = new List({data: this.state.list});
// var vnode = list.render()
```


自定义组件创建


'div' - 直接渲染 <div> 即可，vdom可以做到 

Input 和 List ，是自定义组件（class），vdom 默认不认识

因此 Input 和 List 定义的时候必须声明render函数

根据props初始化实例，然后执行实例的render函数

## JSX和vdom-总结

- 为何需要vdom: JSX 需要渲染成HTML，数据驱动视图

- React.createElement 和 h, 都生成 vnode 

- 何时patch：ReactDOM.render()和setState

- 自定义组件的解析：初始化实例，然后执行render

# setState

说一下 setState的过程

- setState 的异步

- vue修改属性也是异步

- setState的过程

## setState-异步

**setState为何需要异步？**

- 可能会一次执行多次setState

- 你无法规定、限制用户用户如何使用setState

- 没必要每次setState都重新渲染，考虑性能

- 即便是每次重新渲染，用户也看不到中间的效果

```js
addTitle(title) {
  const currentList = this.state.list;       
  console.log(this.state.list); // ['a','b']
  this.setState({
  	  list: currentList.concat(title)
  }); // 'c'
  console.log(this.state.list); // ['a','b']
}
```

```js
addTitle(title) {
  const currentList = this.state.list;   
  this.setState({
  	  list: currentList.concat(title)
  }); 
  this.setState({
  	  list: currentList.concat(title + 1)
  });
  this.setState({
  	  list: currentList.concat(title + 2)
  });  // 只执行最后这一个，之前的不执行
} 
```

## 回顾vue修改属性

第四步：data 属性变化

- 修改属性，被响应式的set监听到

- set中执行updateComponent  // 这里是异步的

- updateComponen 重新执行vm._render()

- 生成的vnode和prevVnode,通过patch进行对比

- 渲染到HTML中

## setState过程

每个组件实例，都有renderComponent方法

执行renderComponent会重新执行实例的render

render函数返回newVnode,然后拿到preVnode

执行patch(preVnode,newVnode)

# React 和 Vue对比

- 两者的本质区别

- 看模板和组件化的区别

- 两者共同点

- 总结问题答案

**两者的本质区别**

- vue - 本质是MVVM框架，由MVC发展而来

- React - 本质是前端组件化框架，由后端发展而来

- 但这并不妨碍他们两者都能实现相同的功能

**看模板和组件化的区别**

- vue - 使用模板（最初由angular）

- React - 使用JSX

- 模板语法上，更倾向于JSX

- 模板分离上，更倾向于vue


||Vue|React|
|---|---|---|
|框架类型|mvvm|mvc|
|构建工具|vue-cli|flux|
|编写方式|模板|JSX|
|状态管理|vuex|redux|
|移动端|Weex|React Native|


*模板的区别一*

vue
```html
<div>
    <h1 v-if="ok">Yes</h1>
    <h1 v-else>No</h1>
</div>
```

react
```html
<div>
  {ok ? <h1>Yes</h1> : <h1>No</h1>}
</div>
```

vue
```html
<ul id="example-1">
  <li v-for="item in items">
    {{item.message}}
  </li>
</ul>
```

react
```html
<ul id="example-1">
  {
    items.map((item, index) => {
      return <li key={key}>{item.message}</li>
    })
  }
</ul>
```

jsx {大括号} 里面放JS变量或者表达式

*模板的区别二*

react 的模板和JS混在一起，未分离
```html
<div>
  <Input addTitle={this.addTitle.bind(this)}/>
  <List data={this.state.list}/>
</div>
```

模板应该和JS逻辑分离，回顾“开放封闭原则”

**组件化的区别**

React本身就是组件化，没有组件化就不是React

vue也支持组件化，不过是在MVVM上的扩展

对于组件化，更倾向于React，做的彻底而清晰

**两者共同点**

- 都支持组件化

- 都是数据驱动视图

相似之处：都是javascript框架，有路由、状态管理、构建工具等、组件式开发。都用到了Virtual DOM。

Virtual DOM是一个映射真实DOM的javascript对象，如果需要改变任何元素的状态，则先在virtual DOM上改变，而不是直接改变真实的DOM。当有变化产生时，一个新的虚拟节点便会被创建，同时计算新旧虚拟结点之间的差别，最后映射真实的dom节点。


**问题解答**

国内使用，首推vue。文档更易读、易学、社区够大

如果团队水平较高，推荐使用React。组件化和JSX做的更好

[React 还是 Vue: 你应该选择哪一个Web前端框架？](https://blog.csdn.net/HTX_HelloWorld/article/details/75402938)


# 更多-more

[揭秘一线互联网企业 前端JavaScript高级面试](https://coding.imooc.com/learn/list/190.html)

