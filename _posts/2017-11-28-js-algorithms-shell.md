---
layout: post
title: 排序算法-希尔排序
tags:
- 面试题
- 算法
categories: JS
description: 排序算法algorithm-希尔排序
---

# 希尔排序-shell sort

**算法描述**

希尔排序，也称递减增量排序算法，是插入排序的一种更高效的改进版本。但希尔排序是非稳定排序算法。

希尔排序是基于插入排序的以下两点性质而提出改进方法的：

- 插入排序在对几乎已经排好序的数据操作时，效率高，即可以达到线性排序的效率；

- 但插入排序一般来说是低效的，因为插入排序每次只能将数据移动一位；

**希尔排序的基本思想是：**

先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录基本有序时，再对全体记录进行依次直接插入排序。

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-28-1.jpeg" alt="">
</div>

**算法步骤**

- 选择一个增量序列 t1，t2，……，tk，其中 ti > tj, tk = 1；

- 按增量序列个数 k，对序列进行 k 趟排序；

- 每趟排序，根据对应的增量 ti，将待排序列分割成若干长度为 m 的子序列，分别对各子表进行直接插入排序。仅增量因子为 1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

**算法实现**

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>

<script>  

var arr = [8, 6, 2, 3, 1, 5, 7, 4];

function shellSort(arr) {
    var len = arr.length,
        temp,
        gap = 1;

    while(gap < len/3) {          //动态定义间隔序列
        gap = gap * 3 + 1;
    }
    
    for (gap; gap > 0; gap = Math.floor(gap/3)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i-gap; j >= 0 && arr[j] > temp; j -= gap) {
                arr[j+gap] = arr[j];
            }
            arr[j+gap] = temp;
        }
    }
    return arr;
}
console.log(shellSort(arr));

</script>
</body>
</html>
```

# 更多-more

- [https://segmentfault.com/a/1190000009461832](https://segmentfault.com/a/1190000009461832)

- [http://blog.csdn.net/liusaint1992/article/details/51345887](http://blog.csdn.net/liusaint1992/article/details/51345887)
