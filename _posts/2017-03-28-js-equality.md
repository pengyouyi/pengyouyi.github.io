---
layout: post
title: js相等的判断
tags:
- JS-Basic
categories: JS
description: js相等的判断
---

# js全等的判断

**_result display_**
<div class="rd">
    <img src="/assets/images/2017/1-2-3/03-28-1.png" alt="">
</div>


# js相等的判断
**_result display_**
<div class="rd">
    <img src="/assets/images/2017/1-2-3/03-28-2.png" alt="">
</div>

# summery==运算的规则：

> undefined == null，结果是true。且它俩与所有其他值比较的结果都是false。  
> String == Boolean，需要两个操作数同时转为Number。  
> String/Boolean == Number，需要String/Boolean转为Number。  
> Object == Primitive，需要Object转为Primitive(具体通过valueOf和toString方法)。


# ==compare

```js
"0" ==  null;
"0" ==  undefined;
"0" ==  false;  //true
"0" ==  NaN;
"0" ==  0;  //true
"0" ==  "";
```

```js
false == null;
false == undefined;
false == NaN;
false == 0;   //true
false == "";  //true
false == [ ]; //true
false == { };
```

```js
"" == null;
"" == undefined;
"" == NaN;
"" == 0;   // true
"" == [ ]; //true
"" == { };
```

```js
0 == null;
0 == undefined;
0 == NaN;
0 == [ ];  //true
0 == { };
```

观察上面可以知，从 `false`、`0`、`""`、`[ ]` 4个值中任选两个都是相等的。
等号比较时，false和true分别可以转化为0、1


# 更多-more
- [https://dorey.github.io/JavaScript-Equality-Table/](https://dorey.github.io/JavaScript-Equality-Table/)
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
- [https://zhuanlan.zhihu.com/p/21650547](https://zhuanlan.zhihu.com/p/21650547)






