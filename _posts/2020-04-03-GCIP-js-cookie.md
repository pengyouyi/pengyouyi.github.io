---
layout: post
title: js-cookie 的使用
tags:
- BOM
- GCIP
categories: JS
description: js-cookie 的使用
---

# js-cookie 插件的用法

JavaScript Cookie: 是一个简单的，轻量级的处理 cookies 的 js API。

[https://www.npmjs.com/package/js-cookie](https://www.npmjs.com/package/js-cookie)

# Installation 安装

```js
<script src="/path/to/js.cookie.js"></script>
```

```js
<script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
```

```js
$ npm install js-cookie --save
```

# Cookies.set() 创建

```js
// 创建一个 cookie，在整个站点上都有效:
Cookies.set('name', 'value');
 
// 创建一个7天后过期的 cookie，在整个站点上都有效:
Cookies.set('name', 'value', { expires: 7 });
 
// 创建一个过期的 cookie，对当前页面的路径有效:
Cookies.set('name', 'value', { expires: 7, path: '' });
```

# Cookies.get() 读取

```js
Cookies.get('name'); // => 'value'
Cookies.get('nothing'); // => undefined
// 获取所有 cookie
Cookies.get(); // => { name: 'value', age: 20 }
```

# Cookies.remove() 删除

```js
Cookies.remove('name');
```

```js
// 如果值设置了路径或者域，那么不能用简单的 delete 方法删除值，需要在 delete 时指定路径或者域
Cookies.set('name', 'value', { path: '' });
Cookies.remove('name'); // 删除失败
Cookies.remove('name', { path: '' }); // 删除成功
```

注意，删除不存在的 cookie 不会报错也不会有返回

# JSON 相关

js-cookie 允许你向 cookie 中存储 json 信息。

如果你通过 set 方法，传入 Array 或类似对象，而不是简单的 string ，那么 js-cookie 会将你传入的数据用 JSON.stringify 转换为 string 保存。

```js
Cookies.set('name', { foo: 'bar' });
Cookies.get('name'); // => '{"foo":"bar"}'
Cookies.get(); // => { name: '{"foo":"bar"}' }
```

如果你用 getJSON 方法获取 cookie，那么 js-cookie 会用 JSON.parse 解析 string 并返回。

```js
Cookies.getJSON('name'); // => { foo: 'bar' }
Cookies.getJSON(); // => { name: { foo: 'bar' } }
```

# more

- [https://www.npmjs.com/package/js-cookie](https://www.npmjs.com/package/js-cookie)

- js-cookie demo 代码请看 github, 项目 [js-cookie](https://github.com/pengyouyi/Framework_test/tree/master/vue-test/vue-practical-components/js-cookie)