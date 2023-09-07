---
layout: post
title: vuex 中引入 mapGetters、mapMutations
tags:
- vue
- GCIP
categories: Framework
description: vuex中引入mapGetters、mapMutations
---

# v-vuex

> A Vue.js project

## vue项目初始化

``` bash
vue init webpack Vue-ProjectName
npm install
npm run dev
```

## 安装 vuex

```bash
npm install vuex --save
```

# 项目中使用vuex

## 新建src下的store文件夹

- src
    + store
        - index.js
        - state.js
        - getters.js
        - mutation-types.js
        - actions
        - mutations.js
        

store/index.js

```js
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
	actions,
	getters,
	state,
	mutations,
	strict: debug,
    plugins: debug ? [createLogger()] : []
})
```

store/state.js

```js
const state = {
	isShowNav: false,
	// Add another one.
};

export default state;
```

store/getters.js

```js
export const isShowNav = state => state.isShowNav;
// Add another one.
```

store/mutation-types.js

```js
export const SET_NAV = 'SET_NAV';
// Add another one.
```

store/actions.js

```js
import * as types from './mutation-types';

export const setNav = function({commit}, isShowNav) {
	commit('SET_NAV', isShowNav);
};
// Add another one.
```

store/mutations.js

```js
import * as types from './mutation-types';

const mutations = {
	[types.SET_NAV](state, isShowNav) {
		state.isShowNav = isShowNav;
	},
	// Add another one.
};

export default mutations;
```

## main.js引入store入口文件

src/main.js

```js
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
```

## vue组件中获取和修改state中的值


- `mapGetters`: 获取state中的值
- `mapMutations`: 修改state中的值

src/components/pageB.vue

```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{isShowNav}}</p>
    <button @click="changeNav">change isShowNav</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
export default {
  data () {
    return {
      msg: 'Welcome to Page B'
    }
  },
  computed: {
  	// isShowNav() {
  	// 	return this.$store.getters.isShowNav;
  	// }
    ...mapGetters([
      'isShowNav'
    ])
  },
  methods: {
    changeNav() {
    	// this.$store.dispatch('setNav', !this.$store.getters.isShowNav);
      this.setNav(!this.isShowNav);
    },
    ...mapMutations({
      setNav: 'SET_NAV'
    })
  }
}
</script>

<style scoped>

</style>
```

# more

- [https://vuex.vuejs.org/](https://vuex.vuejs.org/)
- 完整项目请看 github, 项目 [v-vuex-mapgetters-mapmutations](https://github.com/pengyouyi/Framework_test/tree/master/vue-test/vue-practical-components/v-vuex-mapgetters-mapmutations)




