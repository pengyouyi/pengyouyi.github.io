---
layout: post
title: js运算符优先级
tags:
- 
categories: JS
description: js运算符优先级
---

# js运算符优先级

|优先级  |运算符  |  运算类型	|关联性	
|----|----|----|----|
|19	| ( … ) |  圆括号	|n/a|
|18	|.| 成员访问 |L|
|| … [ … ] |需计算的成员访问	| L |
||new … ( … )| new (带参数列表)	|n/a	|
|17	|… ( … )函数调用|L|		
||new …| new (无参数列表)|R|
|<hr>|<hr>|<hr>|<hr>|
|16|… `++`|后置递增(运算符在后)|n/a|		
||… --|后置递减(运算符在后)|n/a|
|15| `!` … | 逻辑非 | R |
|| ~ … | 按位非 | R |
||`+` …|一元加法| R |
||- …|一元减法| R |
||`++` …|前置递增| R |
||-- …|前置递减| R |
||`typeof` …|返回数据类型| R |
|<hr>|<hr>|<hr>|<hr>|
|14| * |乘法| L |
|| / |除法| L |
|| % |取模| L |
|13| + |加法| L |
|| - |减法| L |
|<hr>|<hr>|<hr>|<hr>|
|11| < |小于| L |
|| <= |小于等于| L |
|| > |大于| L |
|| >= |大于等于| L |
||… in …| |L |
||… instanceof …|| L |
|<hr>|<hr>|<hr>|<hr>|
|10|==|相等| L |
||！=|不相等| L |
||===|全等 |L |
||！===|不全等| L |
|<hr>|<hr>|<hr>|<hr>|
|6|&&|逻辑与| L |
|5| 逻辑或 |逻辑或| L |
|4|… ? … : …|`条件运算符`| R |
|3|… = …|`赋值`| R |
|| += || R |
|| -= || R |
|| *= ||R |
|| /= || R |
|| %= || R |


# 更多-more
- [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)





