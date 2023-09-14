---
layout: post
title: HTMLCollection 和 NodeList 有什么区别
tags:
- standard
categories: HTML
description: HTMLCollection 和 NodeList 有什么区别
---
# HTMLCollection 和 NodeList 有什么区别

**Node 和 Element**

- DOM 是一棵树，所有节点都是 Node  
- Node 是 Element 的父类  
- Element 是其他 HTML 元素的父类，如 HTMLDivElement  

<div class="rd">
    <img src="/assets/images/2023/7-8-9/node.png" alt="">
</div>

**HTMLCollection 和 NodeList**

- HTMLCollection 是 Element 的集合
- NodeList 是 Node 集合

```html

	<div id="outer"><p>hello</p><b>world</b><!--注释--></div>

<script>
const ele = document.getElementById('outer');
console.log(ele.children)  // HTMLCollection(2) [p, b]
console.log(ele.childNodes)  // NodeList(3) [p, b, comment]
</script>
```

总结

`NodeList 会包含 Text、Comment 节点 和 HTMLCollection`