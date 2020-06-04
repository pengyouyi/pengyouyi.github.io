---
layout: post
title: CSS 中 width，min-width 和 max-width 之间的联系
tags:
- CSS-basic
categories: CSS
description: CSS 中 width，min-width 和 max-width 之间的联系
---

# CSS 中 width，min-width 和 max-width 之间的联系

# 若同时设置了 width 和 max-width 两个属性

```html
<style>
.container {
  width: 100px;
  max-width: 50px;
}
</style>
<div class="container"></div>
```

以上宽度显示为 50px

```html
<style>
.container {
  width: 100px;
  max-width: 150px;
}
</style>
<div class="container"></div>
```

以上宽度显示为 100px

> width 和 max-width 谁的值小，那么就显示为谁的宽度

# 若同时设置了 width 和 min-width 两个属性

> width 和 min-width 谁的值大，那么就显示为谁的宽度


# 若同时设置了 width 、 min-width 、min-width 三个属性

```html
<style>
#demo {
  width: 100px;
  max-width: 50px;
  min-width: 120px;
}
</style>
<body>

<div id="demo"></div>
```

以上宽度显示为 120px

```html
<style>
#demo {
  width: 100px;
  max-width: 50px;
  min-width: 120px;
}
</style>
<body>

<div id="demo"></div>
```

以上宽度显示为 20px

- width、max-width、min-width 三者书写顺序和宽度计算结果无关，

- 1、width 先和 max-width 计算，取其中较小的值得到一个新的 width；

- 2、新的width 再和 min-width 计算，取其中较大的值得到最终的宽度。

> 当三个属性都设置时，相当于取Math.max(min-width, Math.min(width, max-width))，
