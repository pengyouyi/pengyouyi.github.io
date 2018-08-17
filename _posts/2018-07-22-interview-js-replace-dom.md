---
layout: post
title: 替换dom中的占位符
tags:
- JS-Basic
categories: JS
description: 替换dom中的占位符
---

描述：html中写了 一段带占位符的dom结构，需要你把真实数据填充进去。（下 面仅仅是 一个例 子）

test.html

```html
<div id="template-dom" class="{{m.className}}">
    <div class="user-profile">
        <div class="user-avatar">
            <img src='{{user.avatar}}'> 
        <div>
        {{m.user.name}}
    <div>
</div>

<script> // your lib code here,should exports a `render` function	</script>

<script>

var m = {
    className:"user",
    user:{
	    name:"wscn",
	    avatar:"http://notfound.com/img/notfound.png"
    }
}

render(document.getElementById('template-dom'),m) </script>
```

要求：不使 用第三 方库和框架；不允许使 用 innerHTML 和 eval ；不允许替换原始dom；只需要在chrome下运 行正确即可（不正确的也可以show code）

加分项 ：

1  支持指令 if ,  repeat 等指令

2 开发时使 用 es6

3 良好的代码 风格，优秀的测试 用例