---
layout: post
title: GCIP 项目中的权限逻辑
tags:
- vue
categories: Framework
description: GCIP 项目中的权限逻辑
---

# one 简化登录逻辑

用户是否有权限访问某个页面

❶ 用户点击登录的时候，就要给他分配权限

❷ 发送用户名和密码之后，再次请求这个人的用户分组 axios.get(url.groups) ，返回一个数组，将 groups 存放到 state 和 cookie 中

❸ 全局 router 前，hasPermission(store.getters.groups, to.meta.groups) 判断是否有权限进入。

# 与登录相关的文件and详细登录逻辑

更加完整的代码，参见前一章登录逻辑

```js
// utils.js
// 登录前流程，获取groups和user
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
groupsRes.data.groups = [
	{id: 1, name: "dev"},
	{id: 2, name: "project"},
	{id: 3, name: "news"},
	{id: 4, name: "invest"},
	{id: 5, name: "all"},
	{id: 6, name: "report"}
]
```

① 发送用户名和密码之后，再次请求这个人的用户分组 `axios.get(url.groups)` ，返回一个数组，将 groups 存放到 state 和 cookie 中

```js
// main.js
// 权限判断
function hasPermission(groups, permissionGroups) {
	if (groups.indexOf('dev') >= 0 || groups.indexOf('all') >= 0 || groups.indexOf('test-user') >= 0) return true; // dev all 直接通过
	if (!permissionGroups) return true; //目标没有分组限定
	return groups.some(group => permissionGroups.indexOf(group) >= 0);
}

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

```js
// router.js
{
	path: `/${lang}/project`,
	redirect: `/${lang}/project/library/1`,
	component: Layout,
	children: [{
		path: 'library/:page',
		name: lang === 'english' ? 'Project Library' : '项目库',
		component: Project,
		meta: {
			id: 'project library',
			groups: ['project'],
			search: true,
			lang
		}
	}, {
		path: 'information/:id',
		name: lang === 'english' ? 'Project Information' : '项目详情',
		component: ProjectInfo,
		meta: {
			id: 'project information',
			groups: ['project'],
			bread: true,
			lang
		}
	}]
}
```

② 全局 router 前，`router.beforeEach((to, from, next))` 时，`hasPermission(store.getters.groups, to.meta.groups)` 判断是否有权限进入。


# more

- 权限逻辑伪代码请看github, 项目 [v-permission](https://github.com/pengyouyi/Framework_test/tree/master/vue-test/vue%E5%AE%9E%E7%94%A8%E7%BB%84%E4%BB%B6/%E6%9D%83%E9%99%90%E4%BC%AA%E4%BB%A3%E7%A0%81)