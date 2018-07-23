---
layout: post
title: React中Redux的示例
tags:
- Interview
- react
categories: JS
description: React面试题汇总
---

# Redux简单demo

```js
import { createStore } from 'redux';

export default function fn() {
    // 定义计算规则，即 reducer
    function counter(state = 0, action) {
      switch (action.type){
        case 'INCREMENT':
          return state + 1;
        case 'DECREMENT':
          return state - 1;
        default:
          return state;
      }
    }

    // 根据计算规则生成 store
    let store = createStore(counter);

    // 定义数据（即 state）变化之后的派发规则
    store.subscribe(() =>
      console.log(store.getState())
    );

    // 触发数据变化
    store.dispatch({type: 'INCREMENT'});
    store.dispatch({type: 'INCREMENT'});
    store.dispatch({type: 'DECREMENT'});

}
```

[http://cn.redux.js.org/](http://cn.redux.js.org/)

# redux简介

redux重要关注的几点：Actions，Reducers，Store

**Action**: 我们不用纠结它定义个一个函数形式还是其它，最终它就是一个对象。包含type、data或者还有其他元素的对象。

**Reducer**: 对不同action做出不同操作的函数；

在没有任何操作情况下，我们返回初始的state；

我们不直接去改变state的值，而是返回一个新的对象，保持state的唯一性。缓存可以在这里做。


**Store**: 真的就是数据分发的地方，store→view，他就这么一个作用，把数据给view，展示页面。功能：

1. 维护整个应用的state
2. store.getState()：获取state
3. store.dispatch(action)：更新state
4. store.subscribe(listener)：监听变化，当state发生更新时，就可以在这个函数的回调中监听。

<div class="rd">
    <img src="/assets/images/2018/7-8-9/7-20-1.png" alt="">
</div>


[Redux 关系图解](https://segmentfault.com/a/1190000011473973)

[react+redux官方实例TODO从最简单的入门](https://www.cnblogs.com/heigehe/articles/6237362.html)

# 存储城市到 Redux

大众点评-存储城市到 Redux 示例

文件结构

app
  - actions
      - userinfo.js
  - constants
      - userinfo.js
  - reducers
      - index.js
  - store
      - configureStore.js
  - containers
      - index.jsx
  - config
      - localStoreKey.js
  - index.jsx


# index.jsx
app/index.jsx
```js
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { hashHistory } from 'react-router'
import configureStore from './store/configureStore'

import './static/css/common.less'

// 创建 Redux 的 store 对象
const store = configureStore()

import RouteMap from './router/routeMap'

render(
    <Provider store={store}>
        <RouteMap history={hashHistory}/>
    </Provider>,
    document.getElementById('root')
)
```
# containers
app/containers/index.jsx
```js
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import LocalStore from '../util/localStore.js'
import {CITYNAME} from '../config/localStoreKey.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userInfoActionsFormOtherFile from '../actions/userinfo.js'

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone: false
        }
    }
    render() {
        return (
            <div>
                <h1>header</h1>
                {
                    this.state.initDone ?
                    this.props.children :
                    <div>'加载中...dd'</div>
                }
            </div>
        )
    }
    componentDidMount() {
        let cityName = LocalStore.getItem(CITYNAME);
        if (cityName == null) {
            cityName = '北京';
        }
        console.log(cityName);
        // 将城市信息存储到redux中
        this.props.userInfoActions.update({
            cityName: cityName,
        })

        this.setState(
            {initDone : true}
        )
    }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    userInfoActions: bindActionCreators(userInfoActionsFormOtherFile, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
```

# store
app/store/configureStore.js

```js
import { createStore } from 'redux'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState,
        // 触发 redux-devtools
        window.devToolsExtension ? window.devToolsExtension() : undefined
    )
    return store
}
```
# reducers
app/reducers/index.js
```js
import { combineReducers } from 'redux'
import userinfo from './userinfo'

export default combineReducers({
    userinfo
})
```
app/reducers/userinfo.js
```js
import * as actionTypes from '../constants/userinfo'

const initialState = {}

export default function userinfo (state = initialState, action) {
    switch (action.type) {
        case actionTypes.USERINFO_UPDATE:
            return action.data
        default:
            return state
    }
}
```
# actions
app/actions/userinfo.js
```js
import * as actionTypes from '../constants/userinfo'

export function update(data) {
    return {
        type: actionTypes.USERINFO_UPDATE,
        data
    }
}
```
# constants
app/constants/userinfo.js
```js
export const USERINFO_UPDATE = 'USERINFO_UPDATE'
```
# config
app/config/localStoreKey.js
```js
export const CITYNAME = 'USER_CURRENT_CITY_NAME'
```


# redux和vuex的区别对比

```js
vuex的流向：view——>commit——>mutations——>state变化——>view变化（同步操作）
          view——>dispatch——>actions——>mutations——>state变化——>view变化（异步操作）

redux的流向：view——>actions——>reducer——>state变化——>view变化（同步异步一样）
```