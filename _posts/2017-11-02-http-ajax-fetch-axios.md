---
layout: post
title: Ajax-Fetch-Axios 三者有什么区别
tags:
- Interview
- BOM
- JS-use
categories: HTTP
description: Ajax-Fetch-Axios 三者有什么区别

---

# Ajax-Fetch-Axios 三者有什么区别

三者都用于网络请求，但是不同维度

- Ajax(Asyncchronous Javascript and XML),一种技术统称  
- Fetch,一个具体的 API  
- Axios,第三方库  

库里面的方法是通过API去实现的

**手写 Ajax**

```js
function ajax1(url, successFn) {
	var xhr = new XMLHttpRequest();
	
	xhr.open('GET', '/api', true);
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				successFn(xhr.responseText)
			}
		}
	}
	
	xhr.send(null);
}
```

**Fetch**

- Fetch 浏览器原生 API，用于网络请求  
- 和 XMLHttpRequest 一个级别  
- Fetch 语法更加简洁、易用，支持 Promise  

```js
function ajax2(url) {
  return fetch(url).then(res => res.json)
}
```

**Axios**

- 最常用的网络请求lib(随着Vue火爆起来)  
- 内部可用 XMLHttpRequest 和 Fetch 来实现  

