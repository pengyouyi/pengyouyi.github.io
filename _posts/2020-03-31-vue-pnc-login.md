---
layout: post
title: GCIP 项目中的登录逻辑
tags:
- vue
- GCIP
categories: Framework
description: GCIP 项目中的登录逻辑
---

# one 简化登录逻辑


① 点击登录按钮

② 前端验证输入格式

③ 后端验证用户名和密码是否匹配，返回token

④ state 和 cookie 存储 token

⑤ axios 获取 user 信息，存储 user 信息在 state 和 cookie 中

⑥ 路由跳转到  /english/  ，router.js 重定向成 /english/home

⑦ router.beforeEach((to, from, next) 有判断 token ，next(`/${to.path.split(‘/‘)[1]}/news`) 跳转到新闻页面

# two 与登录相关的文件

login.vue

```html
<template>
<div class="login-container">
	<el-row class="login-form">
		<pncInput class="username" :placeholder="$t('common.username') | capitalize" v-model="form.username" :validator="validator.username"></pncInput>
		<pncInput class="password" type="password" :placeholder="$t('common.password') | capitalize" v-model="form.password" :validator="validator.password" @enter="onLogin"></pncInput>
		<el-row class="login-row">
			<pncCheck v-model="check">{{i18n[$lang].label}}</pncCheck>
			<router-link class="href" :to="`/${$route.meta.lang}/reset`">{{i18n[$lang].reset}}?</router-link>
		</el-row>
	</el-row>
	<el-row class="button-sec">
		<pncButton @click="onLogin" :loading="loading">{{$t('common.signin') | upperCase}}</pncButton>
	</el-row>
</div>
</template>

<script>
	export default {
		data() {
			return {
				i18n: {
					en: {
						reset: 'Forget Password',
						label: 'Remember me',
						question: {
							question: 'No account',
							jumper: 'Register'
						}
					},
					cn: {
						reset: '忘记密码',
						label: '记住密码',
						question: {
							question: '没有账号',
							jumper: '注册'
						}
					}
				},
				loading: false,
				form: {
					username: '',
					password: ''
				},
				check: true,
				source: this.$axios.CancelToken.source()
			};
		},
		computed: {
			validator() {
				return {
					username: {
						rule: this.form.username.length > 0,
						tip: this.$i18n.messages[this.$i18n.locale].common.form.tip.username
					},
					password: {
						rule: this.$utils.passwordValid(this.form.password),
						tip: this.$i18n.messages[this.$i18n.locale].common.form.tip.password1
					}
				};
			}
		},
		methods: {
			//登录完了保存token
			onLogin() {
				if (this.$utils.isValid(this.validator)) {
					this.loading = true;
					this.$axios.post(this.$url.login, this.form, {
						cancelToken: this.source.token
					}).then(res => {
						this.goSetToken(res.data.token);
					}).catch(err => {
						this.loading = false;
						this.$error(err, {
							400: {
								en: 'The username or password is wrong, please retry or find your password',
								cn: '用户名或密码有误，请重新输入或找回密码'
							}
						});
					});
				} else {
					this.$message.error(this.$i18n.messages[this.$i18n.locale].common.form.tip.invalid);
				}
			},
			//保存完token去获取user信息
			goSetToken(token) {
				this.$store.dispatch('SetToken', token).then(() => {
					this.getUserData(this.form.password);
				}).catch(err => {
					this.loading = false;
					this.$message.error('login failed,please retry');
				});
			},
			//获取并保存user信息
			getUserData(password) {
				this.$utils.getUserData(password).then(() => {
					this.$router.push(`/${this.$route.meta.lang}/`);
				}).catch(err => {
					this.loading = false;
					this.$error(err);
				});
			}
		},
		beforeDestroy() {
			this.source.cancel();
			this.loading = false;
		}
	};

</script>
```

pncInput.vue

```html
<template>
<div class="pncInput">
	<input :class="{disabled:disabled,padding:padding}" :type="type" :value="value" :name="name" :style="style" :placeholder="placeholder" :disabled="disabled | isDisabled" @keyup.enter="$emit('enter')" @blur="onTest" @input="onInput">
	<div :class="['tip',{'is-wrong':isWrong}]" v-if="validator">{{validator.tip}}</div>
</div>
</template>

<script>
	export default {
		props: {
			type: {
				type: String,
				default: 'text'
			},
			placeholder: String,
			value: [String, Number],
			name: String,
			disabled: {
				type: Boolean,
				default: false
			},
			validator: Object,
			padding: {
				type: Boolean,
				default: true
			},
			direction: {
				type: String,
				default: 'left'
			}
		},
		data() {
			return {
				currentValue: this.value,
				isWrong: false,
				style: {
					'text-align': this.direction
				}
			};
		},
		watch: {
			'value' (val, oldValue) {
				this.currentValue = val;
				this.onTest();
			},
			'currentValue' (val) {
				this.$emit('input', val);
				this.$emit('change', val);
			}
		},
		methods: {
			onInput(event) {
				this.currentValue = event.target.value;
			},
			onTest() {
				this.validator ? this.isWrong = !this.validator.rule : null;
			}
		}
	};

</script>
```

子组件在传值的时候，选用input，如this.$emit(‘input’,val)，在父组件直接用v-model绑定，就可以获取到了

store/user.js

```js
import {
	loginByEmail,
	logout,
	getInfo
} from 'api/login';
import Cookies from 'js-cookie';
import axios from 'axios';
import url from '@/url.js';
import Vue from 'vue';

const user = {
	state: {
		token: Cookies.get('Token'),
		groups: Cookies.get('Groups') ? JSON.parse(Cookies.get('Groups')) : [],
		username: Cookies.get('UserInfo') ? JSON.parse(Cookies.get('UserInfo')).username : '',
		password: Cookies.get('UserInfo') ? JSON.parse(Cookies.get('UserInfo')).password : '',
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token;
			token ? Cookies.set('Token', token) : Cookies.remove('Token');
		},
		SET_GROUPS: (state, groups) => {
			state.groups = groups;
			groups.length ? Cookies.set('Groups', groups) : Cookies.remove('Groups');
		},
		SET_USERNAME: (state, username) => {
			state.username = username;
		},
	},

	actions: {
		// 设置token
		SetToken({
			commit
		}, token) {
			return new Promise((resolve, reject) => {
				commit('SET_TOKEN', token);
				resolve();
			}).catch(err => {
				console.log(err);
			});
		},
		//设置groups
		SetGroups({
			commit
		}, groups) {
			return new Promise((resolve, reject) => {
				if (groups.length) {
					let temp = [];
					for (let group of groups) {
						temp.push(group.name);
					}
					commit('SET_GROUPS', temp);
					resolve(temp);
				} else {
					commit('SET_GROUPS', ['none']);
					resolve(['none']);
				}
			}).catch(err => {
				console.log(err);
			});
		},
		//保存个人信息
		SetUserInfo({
			commit
		}, userInfo) {
			return new Promise((resolve, reject) => {
				let user = {
					id: userInfo.pk,
					username: userInfo.username,
					password: userInfo.password,
					firstname: userInfo.first_name,
					lastname: userInfo.last_name,
					email: userInfo.email,
					city: userInfo.city,
					company: userInfo.company_name,
					position: userInfo.position,
					photo: userInfo.photo,
					birthdate: userInfo.birthdate,
					gender: userInfo.gender,
					addres: userInfo.addres
				};
				Cookies.set('UserInfo', user);
				commit('SET_ID', user.id);
				commit('SET_USERNAME', user.username);
				commit('SET_PASSWORD', user.password);
				commit('SET_FIRSTNAME', user.firstname);
				commit('SET_LASTNAME', user.lastname);
				commit('SET_EMAIL', user.email);
				commit('SET_CITY', user.city);
				commit('SET_COMPANY', user.company);
				commit('SET_POSITION', user.position);
				commit('SET_PHOTO', user.photo);
				commit('SET_BIRTHDATE', user.birthdate);
				commit('SET_GENDER', user.gender);
				commit('SET_ADDRES', user.addres);
				resolve();
			}).catch(err => {
				console.log(err);
			});
		},

	}
};
export default user;
```

utils.js

```js
//登录前流程，获取groups和user
export function getUserData(password) {
	return new Promise((resolve, reject) => {
		//获取groups
		axios.get(url.groups).then(groupsRes => {
			//保存groups
			store.dispatch('SetGroups', groupsRes.data.groups).then(() => {
				//获取user信息
				axios.get(url.user).then(userRes => {
					//保存user信息
					password ? userRes.data.password = password : null
					store.dispatch('SetUserInfo', userRes.data).then(() => {
						resolve();
					}).catch(err => {
						reject(err);
					});
				}).catch(err => {
					reject(err);
				});
			}).catch(err => {
				reject(err);
			});
		}).catch(err => {
			reject(err);
		});
	}).catch(err => {
		console.log(err);
	});
}
```

router.js

```js
/*多语言constantRouter生成函数，所有权限都可以访问*/
const constantRouterGenerator = function (lang) {
	let constantRouter = [{
		path: '/',
		redirect: '/english/'
	}, {
		path: `/${lang}/`,
		redirect: `/${lang}/home`,
		component: Layout,
		children: [{}]
	}
}
```

main.js

```js
//刷新token
setInterval(function () {
	let token = Cookies.get('Token') || '';
	token ? refreshToken(token) : null;
}, 420000);

//刷新失败则再次刷新
function refreshToken(token) {
	axios.post(url.refreshToken, {
		token
	}).then(res => {
		store.dispatch('SetToken', res.data.token).then(res2 => {}).catch(err2 => {});
	}).catch(err => {
		login().then(() => {
			axios(err.config);
		});
	});
}

//login的多种种方式
function loginMethod() {
	return [url.login, {
		username: store.getters.username,
		password: store.getters.password
	}];
}

//重新登录
function login() {
	return new Promise((resolve, reject) => {
		axios.post(loginMethod()[0], loginMethod()[1], {
			headers: {
				Authorization: ''
			}
		}).then(res => {
			store.dispatch('SetToken', res.data.token).then(() => {
				resolve();
			}).catch(err => {
				reject(err);
			});
		}).catch(err => {
			reject(err);
		});
	}).catch(err => {
		console.log(err);
	});
}

//axios的请求拦截器，用来在每次发送请求前，如果存在token则加到headers里
axios.interceptors.request.use(function (config) {
	let AUTH_TOKEN = store.getters.token;
	let csrfToken = Cookies.get('csrftoken');
	if (csrfToken) {
		config.headers['X-CSRFToken'] = csrfToken;
	}
	if (AUTH_TOKEN && config.headers['Authorization'] !== '') {
		config.headers['Authorization'] = `JWT ${AUTH_TOKEN}`;
	}
	return config;
}, function (err) {
	return Promise.reject(err);
});

//axios的响应拦截器，可以用来处理错误信息
axios.interceptors.response.use(function (res) {
	return res;
}, function (err) {
	let config = err.config;
	if (axios.isCancel(err)) { //被取消的axios
		return Promise.reject('canceled');
	}
	console.log('error:', err.response ? err.response : err.message);
	if (err.response) {
		switch (err.response.status) {
			case 401: //如果错误是401则直接重登陆,登录后再重试
				console.log('去重登陆');
				return login().then(() => {
					console.log('重登成功');
					return axios(config);
				});
				break;
			case 404:
			case 400: //404和400错误直接reject，不需要重试
				return Promise.reject(err);
				break;
			default:
				break;
		}
	}
	if (!config || !config.retry) return Promise.reject(err);
	config.__retryCount = config.__retryCount || 0;
	if (config.__retryCount >= config.retry) {
		return Promise.reject(err);
	}
	config.__retryCount += 1;
	var backoff = new Promise(function (resolve) {
		setTimeout(function () {
			resolve();
		}, config.retryDelay || 1000);
	});
	return backoff.then(function () {
		return axios(config);
	});
});

// 权限判断
function hasPermission(groups, permissionGroups) {
	if (groups.indexOf('dev') >= 0 || groups.indexOf('all') >= 0 || groups.indexOf('test-user') >= 0) return true; // dev all 直接通过
	if (!permissionGroups) return true; //目标没有分组限定
	return groups.some(group => permissionGroups.indexOf(group) >= 0);
}

//多语言路由生成器
function langRouterGenerator(routers) {
	let temp = [];
	for (let lang of langs) {
		for (let router of routers) {
			temp.push(`/${lang}${router}`)
		}
	}
	return temp;
}
const noReturn = ['/login', '/home']; //登陆后不能回到的页面
//router前
router.beforeEach((to, from, next) => {
	NProgress.start(); //开启Progress
	from ? store.dispatch('SetLastRoute', from).then().catch(err => {
		console.log(err);
	}) : null;
	if (store.getters.token) { //判断是否有token
		if (langRouterGenerator(noReturn).indexOf(to.path) !== -1) { //有token则不能再回到login页面了
			next(`/${to.path.split('/')[1]}/news`);
			NProgress.done();
		} else if (hasPermission(store.getters.groups, to.meta.groups)) { //判断是否有权限进入
			if (to.meta.source) { //来源受限路由
				if (to.meta.source.indexOf(from.meta.id) >= 0 || to.meta.id === from.meta.id || from.name === null) { //控制某个路由只能由某个路由进入
					next();
				} else { //如果不是在source来源内的路由，则回退
					next(false);
					NProgress.done();
				}
			} else { //正常路由
				next();
			}
		} else { //无权进入
			next(`/${to.meta.lang}/401`);
			NProgress.done();
		}
	} else if (langRouterGenerator(noLoginList).indexOf(to.path) >= 0 || to.path.indexOf('english/phone')) { //在免登录白名单，直接进入
		next();
	} else { //否则全部重定向到登录页
		next(`/${to.path.split('/')[1]}/login`);
		NProgress.done();
	}
});

//router后
router.afterEach(() => {
	window.scrollTo(0, 0); //跳转后回到页面顶部
	Vue.prototype.$lang = utils.langSwitch(router.currentRoute.meta.lang); //简写的lang
	i18n.locale = router.currentRoute.meta.lang; //全称的lang
	axios.defaults.baseURL = url.base; //设置axios的根请求路径
	document.title = `${router.currentRoute.name}-China Investor Market-Boutique Firm-Global Cloud Investment Platform-GCIP`;
	NProgress.done(); // 结束Progress
});
```

# three 详细登录逻辑

```html
// login.vue
<pncButton @click="onLogin" :loading="loading">{{$t('common.signin') | upperCase}}</pncButton>
```


```js
// login.vue
//登录完了保存token
onLogin() {
    if (this.$utils.isValid(this.validator)) {
        this.loading = true;
        this.$axios.post(this.$url.login, this.form, {
            cancelToken: this.source.token
        }).then(res => {
            this.goSetToken(res.data.token);
        }).catch(err => {
            this.loading = false;
            this.$error(err, {
                400: {
                    en: 'The username or password is wrong, please retry or find your password',
                    cn: '用户名或密码有误，请重新输入或找回密码'
                }
            });
        });
    } else {
        this.$message.error(this.$i18n.messages[this.$i18n.locale].common.form.tip.invalid);
    }
},
```

① 点击登录按钮，执行 onLogin() 方法，

② 前端首先验证用户名和密码的格式 `this.$utils.isValid(this.validator)`，若格式不正确弹出错误提示框“输入内容有误或未填写”，若格式正确，

③ 则 `this.$axios.post(this.$url.login, this.form)` 将用户名和密码发送给服务器，如果没有通过提示“用户名或密码有误，请重新输入或找回密码”，用户名和密码正确，后端会返回用户的token，然后执行 goSetToken(res.data.token) 方法，

```js
// login.vue
// 保存完token去获取user信息
goSetToken(token) {
    this.$store.dispatch('SetToken', token).then(() => {
        this.getUserData(this.form.password);
    }).catch(err => {
        this.loading = false;
        this.$message.error('login failed,please retry');
    });
},
```

```js
// store/user.js
state: {
    token: Cookies.get('Token'),
},

mutations: {
    SET_TOKEN: (state, token) => {
        state.token = token;
        token ? Cookies.set('Token', token) : Cookies.remove('Token');
    },
},

actions: {
    // 设置token
    SetToken({
        commit
    }, token) {
        return new Promise((resolve, reject) => {
            commit('SET_TOKEN', token);
            resolve();
        }).catch(err => {
            console.log(err);
        });
    },
}
```

④ goSetToken 方法 `this.$store.dispatch('SetToken', token)`, mutations  中 SET_TOKEN 方法，将token保存在 vuex 的 state 中，并且 Cookies.set('Token', token) 浏览器设置 cookie

```js
// login.vue
//获取并保存user信息
getUserData(password) {
    this.$utils.getUserData(password).then(() => {
        this.$router.push(`/${this.$route.meta.lang}/`);
    }).catch(err => {
        this.loading = false;
        this.$error(err);
    });
}
```

⑤ goSetToken 方法保存完 token 后去获取 user 信息，执行 getUserData(this.form.password) 方法 this.$utils.getUserData(password)，

```js
// utils.js
//登录前流程，获取groups和user
export function getUserData(password) {
	return new Promise((resolve, reject) => {
		//获取groups
		axios.get(url.groups).then(groupsRes => {
			//保存groups
			store.dispatch('SetGroups', groupsRes.data.groups).then(() => {
				//获取user信息
				axios.get(url.user).then(userRes => {
					//保存user信息
					password ? userRes.data.password = password : null
					store.dispatch('SetUserInfo', userRes.data).then(() => {
						resolve();
					}).catch(err => {
						reject(err);
					});
				}).catch(err => {
					reject(err);
				});
			}).catch(err => {
				reject(err);
			});
		}).catch(err => {
			reject(err);
		});
	}).catch(err => {
		console.log(err);
	});
}
```

```js
// store/user.js
state: {
    groups: Cookies.get('Groups') ? JSON.parse(Cookies.get('Groups')) : [],
},

mutations: {
    SET_GROUPS: (state, groups) => {
        state.groups = groups;
        groups.length ? Cookies.set('Groups', groups) : Cookies.remove('Groups');
    },
},

actions: {
    //设置groups
    SetGroups({
        commit
    }, groups) {
        return new Promise((resolve, reject) => {
            if (groups.length) {
                let temp = [];
                for (let group of groups) {
                    temp.push(group.name);
                }
                commit('SET_GROUPS', temp);
                resolve(temp);
            } else {
                commit('SET_GROUPS', ['none']);
                resolve(['none']);
            }
        }).catch(err => {
            console.log(err);
        });
    },
}
```

```js
// store/user.js

const user = {

state: {
    username: Cookies.get('UserInfo') ? JSON.parse(Cookies.get('UserInfo')).username : '',
    password: Cookies.get('UserInfo') ? JSON.parse(Cookies.get('UserInfo')).password : '',
    ......
},

mutations: {
    SET_USERNAME: (state, username) => {
        state.username = username;
    },
    ......
},

actions: {
    //保存个人信息
    SetUserInfo({
        commit
    }, userInfo) {
        return new Promise((resolve, reject) => {
            let user = {
                id: userInfo.pk,
                username: userInfo.username,
                password: userInfo.password,
                firstname: userInfo.first_name,
                lastname: userInfo.last_name,
                email: userInfo.email,
                city: userInfo.city,
                company: userInfo.company_name,
                position: userInfo.position,
                photo: userInfo.photo,
                birthdate: userInfo.birthdate,
                gender: userInfo.gender,
                addres: userInfo.addres
            };
            Cookies.set('UserInfo', user);
            commit('SET_ID', user.id);
            commit('SET_USERNAME', user.username);
            commit('SET_PASSWORD', user.password);
            commit('SET_FIRSTNAME', user.firstname);
            commit('SET_LASTNAME', user.lastname);
            commit('SET_EMAIL', user.email);
            commit('SET_CITY', user.city);
            commit('SET_COMPANY', user.company);
            commit('SET_POSITION', user.position);
            commit('SET_PHOTO', user.photo);
            commit('SET_BIRTHDATE', user.birthdate);
            commit('SET_GENDER', user.gender);
            commit('SET_ADDRES', user.addres);
            resolve();
        }).catch(err => {
            console.log(err);
        });
    },
}
};
```

⑥ getUserData(password) 方法为登录前流程，获取 groups 和 user，axios.get(url.groups) 获取权限集合 ，`store.dispatch('SetGroups', groupsRes.data.groups)` 将用户权限存在 state 和 cookie 中，然后

⑦ axios.get(url.user) 获取user信息, `store.dispatch('SetUserInfo', userRes.data)` 将user 的各种信息存到state中，并且 Cookies.set(‘UserInfo', user);

```js
//获取并保存user信息
getUserData(password) {
    this.$utils.getUserData(password).then(() => {
        this.$router.push(`/${this.$route.meta.lang}/`);
    }).catch(err => {
        this.loading = false;
        this.$error(err);
    });
}
```

⑧ getUserData 方法成功之后 `this.$router.push(/english/)`;

```js
// main.js
//axios的请求拦截器，用来在每次发送请求前，如果存在token则加到headers里
axios.interceptors.request.use(function (config) {
	let AUTH_TOKEN = store.getters.token;
	let csrfToken = Cookies.get('csrftoken');
	if (csrfToken) {
		config.headers['X-CSRFToken'] = csrfToken;
	}
	if (AUTH_TOKEN && config.headers['Authorization'] !== '') {
		config.headers['Authorization'] = `JWT ${AUTH_TOKEN}`;
	}
	return config;
}, function (err) {
	return Promise.reject(err);
});
```

⑨ 然后全局 axios.interceptors.request.use() , axios的请求拦截器，用来在每次发送请求前，如果存在token则加到headers里, config.headers['Authorization'] = `JWT ${store.getters.token}`;

```js
// main.js
//router前
router.beforeEach((to, from, next) => {
	NProgress.start(); //开启Progress
	from ? store.dispatch('SetLastRoute', from).then().catch(err => {
		console.log(err);
	}) : null;
	if (store.getters.token) { //判断是否有token
		if (langRouterGenerator(noReturn).indexOf(to.path) !== -1) { //有token则不能再回到login页面了
			next(`/${to.path.split('/')[1]}/news`);
			NProgress.done();
		} else if (hasPermission(store.getters.groups, to.meta.groups)) { //判断是否有权限进入
			if (to.meta.source) { //来源受限路由
				if (to.meta.source.indexOf(from.meta.id) >= 0 || to.meta.id === from.meta.id || from.name === null) { //控制某个路由只能由某个路由进入
					next();
				} else { //如果不是在source来源内的路由，则回退
					next(false);
					NProgress.done();
				}
			} else { //正常路由
				next();
			}
		} else { //无权进入
			next(`/${to.meta.lang}/401`);
			NProgress.done();
		}
	} else if (langRouterGenerator(noLoginList).indexOf(to.path) >= 0 || to.path.indexOf('english/phone')) { //在免登录白名单，直接进入
		next();
	} else { //否则全部重定向到登录页
		next(`/${to.path.split('/')[1]}/login`);
		NProgress.done();
	}
});
```

⑩ 全局router前，`router.beforeEach((to, from, next)`

⑪ 登录之后 store.getters.token 有 token，

```js
// router.js
/*多语言constantRouter生成函数，所有权限都可以访问*/
const constantRouterGenerator = function (lang) {
	let constantRouter = [{
		path: '/',
		redirect: '/english/'
	}, {
		path: `/${lang}/`,
		redirect: `/${lang}/home`,
		component: Layout,
		children: [{}]
	}
}
```

⑫ router.js 中 { path: `/${lang}/`, redirect: `/${lang}/home`} ， /english/  会 重定向成 /english/home ,

⑬ “/english/home” 在 ["/english/login", "/english/home", "/chinese/login", “/chinese/home"]

⑭ 有token则不能再回到login页面了 ，执行 next(`/${to.path.split(‘/‘)[1]}/news`);

⑮ 这样正确登录之后就来到了news 页面

# 前端通用登陆流程 common

❶ 在登录页点击登录的时候，前端会带着用户名和密码去调用后端的登录接口。  
❷ 后端收到请求，验证用户名和密码，验证失败，会返回错误信息，前端提示相应错误信息，如果验证成功，就会给前端返回一个 token。  
❸ 前端拿到 token，将 token 储存到 Vuex 和 localStorage 中，并跳转页面，即登录成功。  
❹ 前端每次跳转至需要具备登录状态的页面时，都需要判断当前 token 是否存在，不存在就跳转到登录页，存在则正常跳转(通常封装在路由守卫中)。  
❺ 另外，在向后端发送其他请求时，需要在请求头中带上 token (项目中通常封装在请求拦截器中)，后端判断请求头中有无 token，有则验证该 token，验证成功就正常返回数据，验证失败(如已过期)则返回相应错误码。前端拿到错误信息，清除 token 并回退至登录页。  

# more

- 登录逻辑伪代码请看 github, 项目 [v-login](https://github.com/pengyouyi/Framework_test/tree/master/vue-test/vue-practical-components/v-login)

