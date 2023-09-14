---
layout: post
title: offsetHeight、scrollHeight、clientHeight有什么区别
tags:
- CSS-Basic
categories: CSS
description: offsetHeight-scrollHeight-clientHeight有什么区别
---

# offsetHeight、scrollHeight、clientHeight有什么区别

- offsetHeight = content + padding + border  
- clientheight = content + padding  
- scrollHeight = 内容实际尺寸 + padding  

**clientheight 和 scrollHeight 区别**

当未出现滚动条时，content = 内容实际尺寸  
当子元素的宽高比父元素的宽高大，就会出现滚动条，此时内容实际尺寸比content大。  